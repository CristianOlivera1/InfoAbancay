import { useRef, useState, useEffect } from 'react';
import { timeAgo } from '../../../../utils/timeAgo.ts';
import publicationsData from '../postWithoutImage.json';
import styles from './styles.module.css';
import { Icon } from '@iconify/react';

export default function PostWhithoutImage() {
    const publications = publicationsData;
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showButtons, setShowButtons] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScrollPosition = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScrollPosition();
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollPosition);
            return () => container.removeEventListener('scroll', checkScrollPosition);
        }
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            const newScrollLeft = direction === 'left' 
                ? scrollContainerRef.current.scrollLeft - scrollAmount
                : scrollContainerRef.current.scrollLeft + scrollAmount;
            
            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Lo último</h2>
            <div 
                className="relative"
                onMouseEnter={() => setShowButtons(true)}
                onMouseLeave={() => setShowButtons(false)}
            >
                <div 
                    ref={scrollContainerRef}
                    className={`flex gap-6 ${styles['scroll-hover']} pb-2 mb-8`}
                >
                    <div className="flex gap-6 p-2 bg-white border border-gray-200 rounded-xl">
                        {publications.map((publication, index) => (
                            <div
                                key={publication.idPublication}
                                className="min-w-[250px] sm:min-w-[350px] overflow-hidden hover:bg-gray-50 hover:rounded-lg transition-shadow duration-300 group cursor-pointer relative">
                                {index < publications.length - 1 && (
                                    <div className="absolute top-6 right-0 h-20 w-0.5 bg-gray-200 rounded-full group-hover:h-14 group-hover:bg-gray-400 transition-all duration-300"></div>
                                )}

                                <div className="p-3">
                                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors line-clamp-3">
                                        {publication.title}
                                    </h3>
                                    <div className="flex items-center text-sm text-gray-500 gap-x-2">
                                        <span className="pr-1 sm:pr-2 py-1 text-xs font-medium">{publication.userName}</span>
                                        <span className="text-gray-400">•</span>
                                        <div className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-xs">
                                            {publication.views} vistas
                                        </div>
                                        <span className="ml-auto text-xs">{timeAgo(publication.createdAt)}</span>
                                    </div>
                                    <p className="text-sm mt-2 text-gray-700 line-clamp-3">{publication.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Botón anterior */}
                {canScrollLeft && (
                    <button
                        type="button"
                        className={`hidden sm:flex absolute top-1/2 left-0 -translate-y-1/2 z-30 items-center justify-center px-4 cursor-pointer group focus:outline-none transition-opacity duration-300 ${
                            showButtons ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                        onClick={() => scroll('left')}
                    >
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/90 shadow-xl border border-gray-100 backdrop-blur-sm group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                            <Icon icon="tabler:chevron-left" width="24" height="24" style={{ color: '#374151' }} />
                        </span>
                    </button>
                )}

                {/* Botón siguiente */}
                {canScrollRight && (
                    <button
                        type="button"
                        className={`hidden sm:flex absolute top-1/2 right-0 -translate-y-1/2 z-30 items-center justify-center px-4 cursor-pointer group focus:outline-none transition-opacity duration-300 ${
                            showButtons ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                        onClick={() => scroll('right')}
                    >
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/90 border border-gray-100 shadow-xl backdrop-blur-sm group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                            <Icon icon="tabler:chevron-right" width="24" height="24" style={{ color: '#374151' }} />
                        </span>
                    </button>
                )}
            </div>
        </div>
    )
}