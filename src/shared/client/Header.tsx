import { Link } from 'react-router-dom';
import { Icon } from "@iconify/react";
export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-gray-200 bg-white px-4 py-2 sm:px-8">
            <div className="mx-auto max-w-7xl">
                <nav className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/" className="flex text-xl font-bold text-purple-700">
                            <img src="src/assets/img/logos/logo-infoabancay.webp" className="size-14" alt="Logo IA" />
                            {/* <img src="src/assets/img/logos/infoabancay.webp" className="w-52 mt-3" alt="Logo Info Abancay" /> */}
                            <img src="src/assets/img/logos/infoabancay2.webp" className="w-36 hidden lg:block" alt="Logo Info Abancay" />

                        </Link>
                    </div>

                    <div className="flex items-center space-y-2 gap-4">
                        <div className="flex gap-4">
                            <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium">
                                Inicio
                            </Link>
                            <Link to="/categories" className="text-gray-700 hover:text-gray-900 font-medium">
                                Categorías
                            </Link>
                        </div>
                        <div className="flex items-center bg-gray-100 border border-gray-300 rounded-full px-4 py-2 w-[20rem]">
                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="flex-1 bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none px-2"
                            />
                            <button className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors">
                                <Icon icon="lucide:search" width="20" height="20" />
                            </button>
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <Link
                            to="/login"
                            className="px-4 py-2 rounded-md border text-sm font-medium text-primary border-primary hover:border-primary-dark hover:text-purple-700 transition">
                            Iniciar sesión
                        </Link>
                        <Link
                            to="/register"
                            className="px-4 py-2 rounded-md text-sm font-medium text-white border bg-gradient-primary">
                            Registrarse
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}