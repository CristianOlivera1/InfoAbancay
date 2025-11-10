import { Link } from 'react-router-dom';
import { Icon } from "@iconify/react";
import { useState } from 'react';
import ModalCategories from './components/ModalCategories';
import MobileMenu from './components/MobileMenu';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
    const [menuAbierto, setMenuAbierto] = useState(false);

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-gray-200 bg-white px-4 py-2 sm:px-8">
            <div className="mx-auto max-w-7xl">
                <nav className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/" className="flex text-xl font-bold text-purple-700">
                            <img src="/src/assets/img/logos/logo-infoabancay.webp" className="size-12 sm:size-14" alt="Logo IA" />
                            <img src="/src/assets/img/logos/infoabancay2.webp" className="w-36 hidden lg:block" alt="Logo Info Abancay" />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:block items-center space-y-2">
                        <div className="flex gap-4">
                            <Link to="/" className="text-gray-800 hover:text-gray-900">
                                Inicio
                            </Link>
                            <div className="relative group">
                                <Link
                                    to="/categories"
                                    className="flex items-center text-gray-800 hover:text-gray-900">
                                    Categorías
                                    <Icon
                                        icon="tabler:chevron-down"
                                        width="24"
                                        height="24"
                                        className="pt-1 ml-1 transition-transform duration-300 group-hover:rotate-180" />
                                </Link>
                                <ModalCategories />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center bg-gray-100 border border-gray-300 rounded-full px-2 py-1 sm:px-4 sm:py-2 w-56 sm:w-64 lg:w-96">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="flex-1 min-w-0 bg-transparent text-gray-600 placeholder-gray-400 outline-none px-2"
                        />
                        <button className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors shrink-0">
                            <Icon icon="lucide:search" width="20" height="20" />
                        </button>
                    </div>
                    {/* Desktop Auth Buttons */}
                    <div className="hidden lg:flex space-x-4">
                        <Link
                            to="/iniciarsesion"
                            className="px-4 py-2 rounded-md border font-medium text-primary border-primary hover:border-primary-dark hover:text-purple-700 transition text-shadow-md text-shadow-purple-100">
                            Iniciar sesión
                        </Link>
                        <Link
                            to="/registrarse"
                            className="px-4 py-2 rounded-md font-medium text-white border bg-gradient-primary">
                            Registrarse
                        </Link>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="flex lg:hidden justify-end">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
                            onClick={toggleMenu}
                        >
                            <span className="sr-only">Abrir menú</span>
                            {!menuAbierto ? (
                                <svg className="size-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            ) : (
                                <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {menuAbierto && (
                    <motion.div
                        className="lg:hidden fixed inset-0 z-50 bg-black/50"
                        onClick={toggleMenu}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                )}
            </AnimatePresence>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuAbierto && (
                    <motion.div
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.5 }}
                        className="fixed inset-y-0 right-0 z-50 w-full max-w-xs"
                        style={{ pointerEvents: 'auto' }}
                    >
                        <MobileMenu toggleMenu={toggleMenu} />
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}