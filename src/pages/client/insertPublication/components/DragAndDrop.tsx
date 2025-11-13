import { Icon } from '@iconify/react';
import { useState, useRef, type ChangeEvent, type DragEvent } from 'react';

interface FileWithPreview {
    file: File;
    preview: string;
    id: string;
}

interface FileUploadProps {
    maxFiles?: number;
    maxSizeInMB?: number;
    acceptedFormats?: string[];
    onFilesChange?: (files: File[]) => void;
}

export default function FileUpload({
    maxFiles = 4,
    maxSizeInMB = 1,
    acceptedFormats = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'video/mp4', 'video/webm'],
    onFilesChange
}: FileUploadProps) {
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    // Validar archivo
    const validateFile = (file: File): string | null => {
        // Validar tipo
        if (!acceptedFormats.includes(file.type)) {
            return `Formato no permitido. Solo se aceptan: ${acceptedFormats.map(f => f.split('/')[1].toUpperCase()).join(', ')}`;
        }

        // Validar tamaño
        if (file.size > maxSizeInBytes) {
            return `El archivo "${file.name}" excede el tamaño máximo de ${maxSizeInMB}MB`;
        }

        // Validar cantidad máxima
        if (files.length >= maxFiles) {
            return `Solo puedes subir hasta ${maxFiles} archivos`;
        }

        return null;
    };

    // Procesar archivos
    const processFiles = (fileList: FileList | null) => {
        if (!fileList) return;

        setError('');
        const newFiles: FileWithPreview[] = [];

        Array.from(fileList).forEach((file) => {
            // Validar si ya tenemos el máximo de archivos
            if (files.length + newFiles.length >= maxFiles) {
                setError(`Solo puedes subir hasta ${maxFiles} archivos`);
                return;
            }

            const validationError = validateFile(file);
            if (validationError) {
                setError(validationError);
                return;
            }

            // Crear preview
            const preview = URL.createObjectURL(file);
            newFiles.push({
                file,
                preview,
                id: `${Date.now()}-${Math.random()}`
            });
        });

        if (newFiles.length > 0) {
            const updatedFiles = [...files, ...newFiles];
            setFiles(updatedFiles);

            // Notificar cambios al padre
            if (onFilesChange) {
                onFilesChange(updatedFiles.map(f => f.file));
            }
        }
    };

    // Manejar click en el área de upload
    const handleClick = () => {
        fileInputRef.current?.click();
    };

    // Manejar cambio en input file
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        processFiles(e.target.files);
        // Resetear input para permitir subir el mismo archivo
        e.target.value = '';
    };

    // Manejar drag over
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    // Manejar drag leave
    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    // Manejar drop
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        processFiles(e.dataTransfer.files);
    };

    // Eliminar archivo
    const removeFile = (id: string) => {
        const fileToRemove = files.find(f => f.id === id);
        if (fileToRemove) {
            URL.revokeObjectURL(fileToRemove.preview);
        }

        const updatedFiles = files.filter(f => f.id !== id);
        setFiles(updatedFiles);

        if (onFilesChange) {
            onFilesChange(updatedFiles.map(f => f.file));
        }

        setError('');
    };

    // Obtener extensión de archivo
    const getFileExtension = (filename: string): string => {
        return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2).toUpperCase();
    };

    // Verificar si es video
    const isVideo = (file: File): boolean => {
        return file.type.startsWith('video/');
    };

    return (
        <div>
            <h3 className="text-gray-800 text-base font-medium leading-tight pb-2">
                Imágenes o videos{' '}
                <span className="text-gray-500 text-sm">
                    (Opcional, Máx {maxFiles} archivos de {maxSizeInMB}MB c/u)
                </span>
            </h3>

            {/* Área de upload */}
            <div
                onClick={handleClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${isDragging
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
            >
                <span className="material-symbols-outlined text-4xl text-gray-400">
                    <Icon icon="line-md:cloud-alt-upload-filled-loop" width="52" height="52" />
                </span>
                <p className="mt-2 text-sm text-gray-500">
                    <span className="font-semibold text-primary">Haz clic para subir</span> o
                    arrastra y suelta
                </p>
                <p className="text-xs text-gray-500">
                    PNG, JPG, GIF, MP4, WEBM hasta {maxSizeInMB}MB ({files.length}/{maxFiles})
                </p>
            </div>

            {/* Input file oculto */}
            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={acceptedFormats.join(',')}
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Mensaje de error */}
            {error && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                    <span className="material-symbols-outlined text-red-500 text-sm"> <Icon icon="line-md:alert-circle-loop" width="24" height="24" /></span>
                    <p className="text-sm text-red-600 flex-1">{error}</p>
                </div>
            )}

            {/* Preview de archivos */}
            {files.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {files.map((fileWithPreview) => (
                        <div key={fileWithPreview.id} className="relative group">
                            {/* Preview de imagen o video */}
                            {isVideo(fileWithPreview.file) ? (
                                <div className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden">
                                    <video
                                        src={fileWithPreview.preview}
                                        className="w-full h-full object-cover"
                                        muted
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                        <span className="material-symbols-outlined text-white text-4xl">
                                            <Icon icon="lets-icons:video-fill" width="42" height="42" />                    </span>
                                    </div>
                                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                        {getFileExtension(fileWithPreview.file.name)}
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="aspect-square bg-center bg-no-repeat bg-cover rounded-lg border border-gray-200"
                                    style={{ backgroundImage: `url("${fileWithPreview.preview}")` }}
                                />
                            )}

                            {/* Información del archivo */}
                            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black to-transparent p-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-white text-xs truncate">
                                    {fileWithPreview.file.name}
                                </p>
                                <p className="text-white/70 text-xs">
                                    {(fileWithPreview.file.size / 1024).toFixed(1)} KB
                                </p>
                            </div>

                            {/* Botón eliminar */}
                            <button
                                onClick={() => removeFile(fileWithPreview.id)}
                                className="absolute top-1.5 right-1.5 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                                type="button"
                            >
                                <span className="material-symbols-outlined text-sm"><Icon icon="material-symbols:close-rounded" width="24" height="24" /></span>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}