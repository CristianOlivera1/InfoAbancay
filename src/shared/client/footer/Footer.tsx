import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full">
      {/* Imagen de fondo con overlay radial */}
      <div className="relative h-auto xl:h-[32em] overflow-hidden sm:px-26 ">
        <div
          className="absolute inset-0 bg-cover bg-center "
          style={{
            backgroundImage: 'url("/src/assets/img/logos/footer.avif")',
          }}
        >
          {/* Overlay radial */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 90%, rgba(0,0,0,0.1) 100%, transparent 100%)',
            }}
          ></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 h-full flex flex-col justify-between py-18">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="text-white">
              <div className="flex items-center gap-3 mb-4 drop-shadow-xs drop-shadow-white">
                <Link to="/" className="flex text-xl font-bold text-purple-700 ">
                  <img src="/src/assets/img/logos/logo-infoabancay.webp" className="size-18 sm:size-22" alt="Logo IA" />
                  <img src="/src/assets/img/logos/infoabancay2.webp" className="w-46 sm:w-52" alt="Logo Info Abancay" />
                </Link>
              </div>
              <p className="text-white/90 text-md mb-6 max-w-md text-shadow-lg">
                Tu portal central para mantenerte informado y conectado con todo lo que sucede en nuestra ciudad.
              </p>
              <p className="text-white/90 text-sm mb-4 text-shadow-lg">
                Inicie Sesión o Regístrese para realizar su{' '}
                <span className="inline-block px-2 py-1 bg-white text-primary font-semibold text-shadow-none">
                  publicación!
                </span>
              </p>
              <div className="flex flex-col text-center sm:flex-row gap-4 mt-6">
                <Link
                  to="/login"
                  className="px-4 py-2 border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary transition-all duration-300 font-medium text-shadow-lg"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-primary text-white rounded-lg hover:bg-pink-600 transition-all duration-300 font-medium"
                >
                  Registrarse
                </Link>
              </div>
            </div>

            <div className="col-span-2 lg:col-span-2">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-6 text-white">
                {/* Navegación 1 */}
                <div className="flex-1">
                  <h3 className="text-md font-bold mb-4">Navegación</h3>
                  <nav className="flex flex-col gap-3">
                    <Link to="/noticias" className="text-white/90 hover:text-white hover:translate-x-2 transition-all duration-300 text-sm">Noticias</Link>
                    <Link to="/eventos" className="text-white/90 hover:text-white hover:translate-x-2 transition-all duration-300 text-sm">Eventos</Link>
                    <Link to="/empleos" className="text-white/90 hover:text-white hover:translate-x-2 transition-all duration-300 text-sm">Empleos</Link>
                    <Link to="/publicidad" className="text-white/90 hover:text-white hover:translate-x-2 transition-all duration-300 text-sm">Publicidad</Link>
                    <Link to="/reportes" className="text-white/90 hover:text-white hover:translate-x-2 transition-all duration-300 text-sm">Reportes ciudadano</Link>
                  </nav>
                </div>

                {/* Navegación 2 */}
                <div className="flex-1">
                  <h3 className="text-md font-bold mb-4">Navegación 2</h3>
                  <nav className="flex flex-col gap-3">
                    <Link to="/noticias" className="text-white/90 hover:text-white hover:translate-x-2 transition-all duration-300 text-sm">Noticias</Link>
                    <Link to="/eventos" className="text-white/90 hover:text-white hover:translate-x-2 transition-all duration-300 text-sm">Eventos</Link>
                    <Link to="/empleos" className="text-white/90 hover:text-white hover:translate-x-2 transition-all duration-300 text-sm">Empleos</Link>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <hr className="text-gray-300 mt-4 xl:pt-0" />
          <div className="text-center text-white text-sm text-shadow-lg pt-4 xl:pt-0">
            © 2025 INFOABANCAY. Todos los derechos reservados
          </div>
        </div>
      </div>
    </footer>
  )
}