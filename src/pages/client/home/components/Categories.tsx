
import { Icon } from '@iconify/react';
import categorys from '../categorys.json';

export default function Categories() {
  return (
      <section className="bg-primary-7 w-full my-10 rounded-2xl" style={{background: "linear-gradient(to bottom, var(--color-primary-7) 60%, white 100%)"}}>
              <div className="max-w-6xl mx-auto text-center py-4 px-0 sm:p-6 ">
                <h2 className="text-xl font-semibold text-gray-800 mb-8">
                  Información por categoría
                </h2>
                <div className="flex gap-4 sm:gap-8 overflow-x-auto sm:flex-wrap sm:justify-center p-2 cursor-pointer">
                  {categorys.map((cat, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center bg-white rounded-full shadow-sm w-28 h-28 justify-center border border-gray-100 hover:shadow-md transition-all shrink-0 group"
                    >
                      <Icon
                        icon={cat.icon}
                        className="w-10 h-10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                      />
                      <span className="text-sm mt-2 text-gray-500">{cat.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
  )
  
}