
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import categorys from '../categorys.json';

export default function Categories() {
  return (
<section 
  className="w-full my-10 rounded-2xl bg-cover bg-center bg-[url('/src/assets/svg/mesh-gradient-category.svg')]">
      <div className="max-w-6xl mx-auto text-center py-4 px-0 sm:p-6 ">
        <h2 className="text-xl font-semibold text-gray-800 mb-8">
          Información por categoría
        </h2>
        <div className="flex gap-4 sm:gap-8 overflow-x-auto sm:flex-wrap sm:justify-center p-2 cursor-pointer">
          {categorys.map((cat, index) => (
            <Link
              key={index}
              to={`/categoria/${encodeURIComponent(cat.name.toLowerCase().replace(/\s+/g, '-'))}`}
              className="flex flex-col items-center bg-white rounded-full w-28 h-28 justify-center border border-gray-200 hover:shadow-sm transition-all shrink-0 group"
            >
              <Icon
                icon={cat.icon}
                className="w-10 h-10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
              />
              <span className="text-sm mt-2 text-gray-500">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )

}