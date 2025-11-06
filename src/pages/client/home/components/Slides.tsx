import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import slides from '../slides.json';
import { Icon } from '@iconify/react';

export default function Slides() {
    const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
      <section className='mt-24'>
        {/* Slides */}
        <div className="relative w-full">
          <div className="relative h-auto overflow-hidden rounded-lg">
            {slides.map((slide, index) => (
              <div
                key={slide.idPublication}
                className={`duration-700 ease-in-out transition-opacity ${index === currentSlide ? 'block' : 'hidden'
                  }`}
              >
                {/* Contenedor de imagen y navegación */}
                <div className="relative h-92 overflow-hidden rounded-t-lg">
                  <img
                    src={slide.image}
                    className="w-full h-full object-cover"
                    alt={slide.title}
                  />

                  {/* Dots centrados en la imagen */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
                    {slides.map((_, dotIndex) => (
                      <button
                        key={dotIndex}
                        type="button"
                        className={`w-3 h-3 rounded-full transition-colors ${dotIndex === currentSlide ? 'bg-primary' : 'bg-gray-300'
                          }`}
                        onClick={() => setCurrentSlide(dotIndex)}
                      />
                    ))}
                  </div>

                  {/* Botón anterior */}
                  <button
                    type="button"
                    className="absolute top-1/2 start-0 -translate-y-1/2 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    onClick={() =>
                      setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)
                    }
                  >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
                      <Icon icon="tabler:chevron-left" width="24" height="24" style={{ color: '#fff' }} />
                    </span>
                  </button>

                  {/* Botón siguiente */}
                  <button
                    type="button"
                    className="absolute top-1/2 end-0 -translate-y-1/2 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    onClick={() =>
                      setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)
                    }
                  >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
                      <Icon icon="tabler:chevron-right" width="24" height="24" style={{ color: '#fff' }} />
                    </span>
                  </button>
                </div>

                {/* Descripción debajo */}
                <div className="flex flex-col sm:flex-row items-start justify-center bg-primary-7 p-4 rounded-b-lg shadow-md gap-0 sm:gap-10">
                  <div className="flex flex-col sm:flex-row gap-1">
                    <h3 className="text-sm font-bold mb-2 text-black-primary">{slide.title}:</h3>
                    <p className="text-sm mb-4 text-black-secondary line-clamp-2 w-2xs sm:w-sm xl:w-xl">{slide.description}</p>
                  </div>
                  <Link
                    to={`/publication/${slide.idPublication}`}
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
                  >
                    Leer más
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
  
}