import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import categorys from '../../../../pages/client/home/categorys.json';

interface MobileMenuProps {
  toggleMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ toggleMenu }) => {
  const [categoriesOpen, setCategoriesOpen] = useState(true);

  const toggleCategories = () => {
    setCategoriesOpen(!categoriesOpen);
  };

  return (
    <div className="lg:hidden fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white px-6 py-6 overflow-y-auto">
      <div className="flex items-center justify-between">
        <Link to="/" className="-m-1.5 p-1.5 flex">
          <img src="src/assets/img/logos/logo-infoabancay.webp" className="size-14" alt="Logo IA" />
          <img src="src/assets/img/logos/infoabancay2.webp" className="w-32" alt="Logo Info Abancay" />
        </Link>
        <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" onClick={toggleMenu}>
          <span className="sr-only">Cerrar menú</span>
          <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="mt-6 flow-root">
        <div className="-my-6 divide-y divide-gray-500/10">
          <div className="space-y-2 py-6">
            {/* Auth Buttons for Mobile */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <Link
                to="/login"
                className="w-full px-4 py-2 text-center rounded-md border font-medium text-primary border-primary hover:border-primary-dark hover:text-purple-700 transition">
                Iniciar sesión
              </Link>
              <Link to="/register" className="text-white bg-gradient-primary px-4 py-2 rounded w-full font-semibold text-center">
                Registrarse
              </Link>
            </div>

            {/* Navigation Links */}
            <Link to="/" className="flex gap-2 -mx-3 rounded-lg px-3 py-2 font-semibold text-gray-900 hover:bg-gray-50">
              <Icon icon="lucide:home" className="size-5" />
              Inicio
            </Link>

            {/* Categories Mobile */}
            <div className="-mx-3">
              <button
                type="button"
                className="flex items-center w-full rounded-lg font-semibold text-gray-900 hover:bg-gray-50 px-3 py-2 justify-between"
                aria-controls="disclosure-1"
                aria-expanded={categoriesOpen}
                onClick={toggleCategories} // Toggle only the categories section
              >
                <span className="flex items-center gap-2">
                  Categorías
                </span>
                <Icon icon="lucide:chevron-down" className={`size-5 flex-none ${categoriesOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Categories Container with scroll */}
              {categoriesOpen && (
                <div className="mt-2 space-y-2 max-h-[300px] overflow-y-auto" id="disclosure-1">
                  {categorys.map((category) => (
                    <div
                      key={category.idCategory}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm hover:bg-gray-50"
                    >
                      <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <Icon icon={category.icon} className="w-6 h-6" />
                      </div>
                      <div className="flex-auto">
                        <Link
                          to={`/category/${category.idCategory}`}
                          className="block font-semibold text-gray-600 cursor-pointer"
                          onClick={toggleMenu}
                        >
                          {category.name}
                          <span className="absolute inset-0"></span>
                        </Link>
                        <p className="mt-1 text-gray-600">{category.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;