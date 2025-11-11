import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

type AlertType = "success" | "error" | "info" | "alert";

interface AlertProps {
    type?: AlertType;
    title?: string;
    message: string;
    visible: boolean;
    onClose?: () => void;
    duration?: number;
}

const typeConfig: Record<AlertType, {
    bg: string;
    border: string;
    icon: string;
    iconColor: string;
    title: string;
    text: string;
    progressBg: string;
}> = {
    success: {
        bg: "bg-gradient-to-t from-white via-green-50 to-green-100",
        border: "border-green-200",
        icon: "line-md:check-all",
        iconColor: "text-green-600",
        title: "Éxito",
        text: "text-green-600",
        progressBg: "bg-green-500"
    },
    error: {
        bg: "bg-gradient-to-t from-white via-red-50 to-red-100",
        border: "border-red-200",
        icon: "line-md:alert-circle-loop",
        iconColor: "text-red-600",
        title: "Error",
        text: "text-red-600",
        progressBg: "bg-red-500"
    },
    info: {
        bg: "bg-gradient-to-t from-white via-blue-50 to-blue-100",
        border: "border-blue-200",
        icon: "material-symbols:info",
        iconColor: "text-white",
        title: "Información",
        text: "text-blue-700",
        progressBg: "bg-blue-500"
    },
    alert: {
        bg: "bg-gradient-to-t from-white via-yellow-50 to-yellow-100",
        border: "border-yellow-200",
        icon: "line-md:alert",
        iconColor: "text-yellow-600",
        title: "Alerta",
        text: "text-yellow-700",
        progressBg: "bg-yellow-400"
    }
};

export default function Alert({
    type = "info",
    title,
    message,
    visible,
    onClose,
    duration = 3000
}: AlertProps) {
    const config = typeConfig[type];
    const [isPaused, setIsPaused] = useState(false);
    const [progress, setProgress] = useState(100);
    const startTimeRef = useRef<number>(0);
    const elapsedBeforePauseRef = useRef<number>(0);
    const animationFrameRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        if (!visible) {
            setProgress(100);
            startTimeRef.current = 0;
            elapsedBeforePauseRef.current = 0;
            return;
        }

        // Iniciar el tiempo solo si no está pausado
        if (!isPaused) {
            startTimeRef.current = Date.now();

            const animate = () => {
                const currentElapsed = Date.now() - startTimeRef.current;
                const totalElapsed = elapsedBeforePauseRef.current + currentElapsed;
                const newProgress = Math.max(0, 100 - (totalElapsed / duration) * 100);

                setProgress(newProgress);

                if (newProgress > 0 && !isPaused) {
                    animationFrameRef.current = requestAnimationFrame(animate);
                } else if (newProgress <= 0 && onClose) {
                    onClose();
                }
            };

            animationFrameRef.current = requestAnimationFrame(animate);
        }

        return () => {
            if (animationFrameRef.current !== undefined) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [visible, isPaused, duration, onClose]);

    const handleMouseEnter = () => {
        // Cancelar la animación
        if (animationFrameRef.current !== undefined) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        // Guardar el tiempo transcurrido hasta ahora
        const currentElapsed = Date.now() - startTimeRef.current;
        elapsedBeforePauseRef.current += currentElapsed;

        setIsPaused(true);
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={`relative flex items-center gap-4 ${config.bg} ${config.border} rounded-xl p-4 w-full max-w-md shadow-sm overflow-hidden border`}
                >
                    {/* Barra de progreso con bordes redondeados */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/30 rounded-full overflow-hidden">
                        <motion.div
                            className={`h-full ${config.progressBg} rounded-full`}
                            style={{
                                width: `${progress}%`,
                                margin: '0 auto',
                            }}
                            transition={{ duration: 0 }}
                        />
                    </div>

                    {/* Ícono centrado */}
                    <div className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full">
                        <Icon icon={config.icon} width="24" height="24" className={config.iconColor} />
                    </div>

                    {/* Contenido */}
                    <div className="flex-1">
                        <div className="flex flex-col">
                            <p className="text-sm font-semibold text-gray-900">
                                {title || config.title}
                            </p>
                            <p className={`text-sm mt-1 ${config.text}`}>
                                {message}
                            </p>
                        </div>
                    </div>

                    {/* Botón de cierre */}
                    <div className="absolute top-2 right-2">
                        <button
                            type="button"
                            aria-label="Cerrar alerta"
                            onClick={onClose}
                            className={`${config.text} hover:opacity-80 transition-opacity`}
                        >
                            <Icon icon="material-symbols:close-rounded" width="24" height="24" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}