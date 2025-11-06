import { Icon } from "@iconify/react";
import categorys from '../../../../pages/client/home/categorys.json';

export default function ModalCategories() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-full z-10 mt-2 w-screen max-w-md rounded-3xl bg-white ring-1 ring-gray-900/5 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 max-h-150">
      <div className="p-4">
        {categorys.map((category) => (
          <div
            key={category.idCategory}
            className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm hover:bg-gray-50"
          >
            <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
              <Icon
                icon={category.icon}
                className="w-10 h-10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
            </div>
            <div className="flex-auto">
              <a
                className="block font-semibold text-gray-600 cursor-pointer"
                href="#"
              >
                {category.name}
                <span className="absolute inset-0"></span>
              </a>
              <p className="mt-1 text-gray-600 line-clamp-2">
                {category.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}