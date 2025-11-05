import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import slides from './slides.json';
import publicationsData from './publications.json';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const publications = publicationsData;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-32 mt-8">
      <section className="mb-12">
        {/* Slides */}
        <div className="relative w-full my-26">
          <div className="relative h-auto overflow-hidden rounded-lg">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`relative duration-700 ease-in-out transition-opacity ${index === currentSlide ? 'block' : 'hidden'
                  }`}
              >
                <img
                  src={slide.image}
                  className="w-full h-96 object-cover rounded-t-lg"
                  alt={slide.title}
                />

                <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
                  {slides.map((_, dotIndex) => (
                    <button
                      key={dotIndex}
                      type="button"
                      className={`w-3 h-3 rounded-full transition-colors ${dotIndex === currentSlide ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      aria-current={dotIndex === currentSlide}
                      aria-label={`Slide ${dotIndex + 1}`}
                      onClick={() => setCurrentSlide(dotIndex)}
                    />
                  ))}
                </div>

                <div className="flex flex-col items-start bg-primary-7 p-4 rounded-b-lg shadow-md text-center justify-center gap-10 sm:flex-row">
                  <div className='flex flex-col sm:flex-row'>
                    <h3 className="text-sm font-bold mb-2 text-black-primary">{slide.title}:</h3>
                    <p className="text-sm mb-4 text-black-secondary line-clamp-2 w-md ">{slide.description}</p>
                  </div>
                     <Link
                    to={`/publication/${slide.id}`}
                    className=" bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors">
                    Leer más
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            onClick={() =>
              setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)
            }>
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
              </svg>
            </span>
          </button>

          <button
            type="button"
            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            onClick={() =>
              setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)
            }
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
            </span>
          </button>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publications.map((publication) => (
            <div key={publication.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img
                src={publication.image}
                alt={publication.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{publication.title}</h3>
                <p className="text-gray-600 mb-4">{publication.description}</p>
                <Link
                  to={`/publication/${publication.id}`}
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Leer más
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}