import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import slides from '../slides.json';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

export default function Slides() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const [direction, setDirection] = useState('next');
  const slideDuration = 5000;
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setDirection('next');
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setProgressKey((prev) => prev + 1);
    }, slideDuration);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setDirection('next');
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setProgressKey((prev) => prev + 1);
    }, slideDuration);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentSlide]);

  const handleSlideChange = (index: number) => {
    if (index > currentSlide) {
      setDirection('next');
    } else if (index < currentSlide) {
      setDirection('prev');
    }
    setCurrentSlide(index);
    setProgressKey((prev) => prev + 1);
  };

  const goToNextSlide = () => {
    setDirection('next');
    const newIndex = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    handleSlideChange(newIndex);
  };

  const goToPrevSlide = () => {
    setDirection('prev');
    const newIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    handleSlideChange(newIndex);
  };

  return (
    <section className='mt-24'>
      {/* Slides */}
      <div className="relative w-full">
        <div className="relative h-auto overflow-hidden rounded-lg">
          {slides.map((slide, index) => (
            <div
              key={slide.idPublication}
              className={`${index === currentSlide ? 'block' : 'hidden'}`}
            >
              {/* Contenedor de imagen y navegación */}
              <div className="relative h-92 overflow-hidden rounded-t-lg bg-black">
                <img
                  src={slide.image}
                  className={`w-full h-full object-cover ${index === currentSlide
                      ? direction === 'next'
                        ? styles.slideEnterNext
                        : styles.slideEnterPrev
                      : ''
                    }`}
                  alt={slide.title}
                />

                {/* Overlay gradient para mejor legibilidad */}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent"></div>

                {/* Dots centrados en la imagen con progreso */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
                  {slides.map((_, dotIndex) => (
                    <button
                      key={dotIndex}
                      type="button"
                      className={`rounded-full transition-all duration-300 ${dotIndex === currentSlide
                          ? `w-14 h-2 bg-white/50 ${styles.progressDot}`
                          : 'w-2 h-2 bg-white/50 hover:bg-white/70 hover:scale-125'
                        }`}
                      onClick={() => handleSlideChange(dotIndex)}
                    >
                      {dotIndex === currentSlide && (
                        <span
                          key={progressKey}
                          className={`absolute inset-0 rounded-full overflow-hidden ${styles.progressDotBar}`}
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Botón anterior */}
                <button
                  type="button"
                  className="absolute top-1/2 start-0 -translate-y-1/2 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                  onClick={goToPrevSlide}
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/40 group-hover:scale-110 transition-all duration-300">
                    <Icon icon="tabler:chevron-left" width="24" height="24" style={{ color: '#fff' }} />
                  </span>
                </button>

                {/* Botón siguiente */}
                <button
                  type="button"
                  className="absolute top-1/2 end-0 -translate-y-1/2 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                  onClick={goToNextSlide}
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/40 group-hover:scale-110 transition-all duration-300">
                    <Icon icon="tabler:chevron-right" width="24" height="24" style={{ color: '#fff' }} />
                  </span>
                </button>
              </div>

              {/* Descripción debajo con animación */}
              <div className={`flex flex-col sm:flex-row items-start justify-center bg-primary-7 p-4 rounded-b-lg shadow-md gap-0 sm:gap-10 ${index === currentSlide ? styles.fadeEnter : ''
                }`}>
                <div className="flex flex-col sm:flex-row gap-1">
                  <h3 className="text-md font-bold mb-2 text-gray-800">{slide.title}:</h3>
                  <p className="text-md mb-4 text-gray-700 line-clamp-2 w-2xs sm:w-sm xl:w-xl">
                    {slide.description}
                  </p>
                </div>
                <Link
                  to={`/publication/${slide.idPublication}`}
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors">
                  Leer más
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}