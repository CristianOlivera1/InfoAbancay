import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = () => {
        console.log('Login submitted:', { email, password, rememberMe });
    };

    const handleGoogleSignIn = () => {
        console.log('Sign in with Google');
    };

    return (
        <div className="py-20 sm:py-30 flex bg-white">
            {/* Left side - Form */}
            <div className="w-full h-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
                <div className="w-full max-w-md">
                    <div className="mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Iniciar sesión</h1>
                        <p className="text-gray-600 text-lg">Por favor ingresa tus datos.</p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Ingresa tu email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <Icon icon="iconamoon:eye-light" width="24" height="24" />
                                    ) : (
                                        <Icon icon="uil:eye-slash" width="24" height="24" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember me & Forgot password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
                                />
                                <span className="ml-2 text-sm text-gray-700">Recordarme por 30 días</span>
                            </label>
                            <button className="text-sm transition-colors text-gray-700">
                                Has olvidado tu contraseña
                            </button>
                        </div>

                        {/* Sign in button */}
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-gradient-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Iniciar sesión
                        </button>

                        {/* Sign in with Google */}
                        <button
                            onClick={handleGoogleSignIn}
                            className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all flex items-center justify-center gap-3"
                        >
                            <Icon icon="material-icon-theme:google" width="24" height="24" />
                            Iniciar sesión con Google
                        </button>
                    </div>

                    {/* Sign up link */}
                    <p className="mt-8 text-center text-gray-600">
                        No tienes una cuenta?{' '}
                        <Link to="/registrarse" className="font-medium text-primary hover:text-primary-dark transition-colors hover:underline">
                            Regístrate
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right side - Image */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <img
                    src="https://muniabancay.gob.pe/web/wp-content/uploads/2023/04/fotoabc.jpg"
                    alt="Portrait"
                    className="absolute rounded-l-2xl inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 rounded-l-2xl bg-linear-to-br from-purple-600/20 to-transparent"></div>
            </div>
        </div>
    );
}