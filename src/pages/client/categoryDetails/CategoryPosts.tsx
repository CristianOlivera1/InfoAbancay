import { useParams, Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useState, useEffect, useRef } from 'react';
import categorys from '../home/categorys.json';
import postWithoutImageData from '../home/postWithoutImage.json';
import publicationsWithImageData from '../home/publicationsWithImage.json';
import { timeAgo } from '../../../utils/timeAgo';
import { getInitials } from '../../../utils/getInitials';
import PostInteractionButtons from '../../../shared/client/components/post/PostInteractionButtons';
import { usePostInteractions } from '../../../shared/client/components/post/PostInteractions';

export default function CategoryPosts() {
    const { nameCategory } = useParams<{ nameCategory: string }>();
    const navigate = useNavigate();
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [showButtons, setShowButtons] = useState(false);
    const postInteractions = usePostInteractions();
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const currentCategory = categorys.find(cat =>
        cat.name.toLowerCase().replace(/\s+/g, '-') === nameCategory
    );

    const isAllCategories = nameCategory === 'todas';

    useEffect(() => {
        if (currentCategory) {
            setSelectedCategoryId(currentCategory.idCategory);
        } else if (isAllCategories) {
            setSelectedCategoryId(null);
        }
    }, [currentCategory, isAllCategories]);
    const filteredPostsWithoutImage = postWithoutImageData.filter(post =>
        selectedCategoryId ? post.idCategory === selectedCategoryId : true
    );

    const filteredPostsWithImage = publicationsWithImageData.filter(post => {
        const postCategory = categorys.find(cat => cat.name === post.categoryName);
        return selectedCategoryId ? postCategory?.idCategory === selectedCategoryId : true;
    });

    const handleCategorySelect = (categoryId: number) => {
        const category = categorys.find(cat => cat.idCategory === categoryId);
        if (category) {
            const categoryPath = category.name.toLowerCase().replace(/\s+/g, '-');
            navigate(`/categoria/${encodeURIComponent(categoryPath)}`);
        }
    };

    const handleAllCategoriesSelect = () => {
        navigate('/categoria/todas');
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current;
            const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
            scrollContainerRef.current.scrollTo({
                left: scrollLeft + scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    const canScrollLeft = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft } = scrollContainerRef.current;
            return scrollLeft > 0;
        }
        return false;
    };

    const canScrollRight = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            return scrollLeft < scrollWidth - clientWidth;
        }
        return false;
    };

    if (!currentCategory && !isAllCategories) {
        return (
            <div className="container mx-auto px-4 sm:px-6 xl:px-32 my-8">
                <div className="text-center py-20">
                    <h1 className="text-2xl font-bold text-gray-800">Categoría no encontrada</h1>
                    <Link to="/" className="text-primary hover:underline mt-4 inline-block">
                        Volver al inicio
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 xl:px-32 my-25">

            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-8">
                {/* Breadcrumbs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <Link className="text-sm font-medium text-gray-500 hover:underline" to="/">Inicio</Link>
                    <span className="text-sm font-medium text-gray-500">/</span>
                    <Link className="text-sm font-medium text-gray-500 hover:underline" to="/#loultimo">Categoría</Link>
                    <span className="text-sm font-medium text-gray-500">/</span>
                    <span className="text-sm font-medium text-[#111418]">
                        {isAllCategories ? 'Todas las categorías' : currentCategory?.name}
                    </span>
                </div>
                <div className="flex items-center gap-0">
                    <div className="p-0 sm:p-3 bg-primary-100 rounded-full">
                        <Icon
                            icon={isAllCategories ? 'material-symbols-light:border-all-rounded' : currentCategory?.icon || ''}
                            className="w-10 h-10 text-primary hidden sm:block"
                        />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                            {isAllCategories ? 'Todas las categorías' : currentCategory?.name}
                        </h1>
                        <p className="text-gray-600 text-md">
                            {isAllCategories
                                ? 'Explora publicaciones de todas las categorías disponibles'
                                : currentCategory?.description}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar - Categories */}
                <aside className="lg:col-span-1">
                    <div className='gap-6 scroll-hover p-4 mb-4 sm:mb-8 bg-white border border-gray-200 rounded-2xl sticky top-25'>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Categorías</h2>
                        <div className="flex gap-2 sm:flex-col sm:space-y-2">
                            <button
                                onClick={handleAllCategoriesSelect}
                                className={`shrink-0 text-left p-3 rounded-lg transition-colors ${isAllCategories
                                    ? 'bg-primary text-white'
                                    : 'hover:bg-gray-100 text-gray-700'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon icon="material-symbols-light:border-all-rounded" className="size-5" />
                                    <span className="font-medium">Todas</span>
                                </div>
                            </button>

                            {categorys.map(category => (
                                <button
                                    key={category.idCategory}
                                    onClick={() => handleCategorySelect(category.idCategory)}
                                    className={`shrink-0 text-left p-3 rounded-lg transition-colors ${selectedCategoryId === category.idCategory
                                        ? 'bg-primary text-white'
                                        : 'hover:bg-gray-100 text-gray-700'
                                        }`}
                                >
                                    <div className="flex items-center gap-3 group">
                                        <Icon
                                            icon={category.icon}
                                            className="size-5 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                                        />
                                        <span className="font-medium">{category.name}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="lg:col-span-3 space-y-8">
                    {/* Posts Without Image Section */}
                    <section>
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">Publicaciones recientes</h2>
                            <Link
                                to="/crear-publicacion"
                                className="border bg-white border-gray-200 text-gray-800 px-4 py-2 rounded hover:text-black transition-colors hover:shadow-xs hover:border-gray-300 mb-4"
                            >
                                Publicar
                            </Link>
                        </div>
                        <div
                            className="relative"
                            onMouseEnter={() => setShowButtons(true)}
                            onMouseLeave={() => setShowButtons(false)}
                        >
                            <div
                                ref={scrollContainerRef}
                                className='flex gap-6 scroll-hover pb-2 mb-6'
                            >
                                <div className="flex gap-6 p-2 bg-white border border-gray-200 rounded-2xl">
                                    {filteredPostsWithoutImage.map((publication, index) => (
                                        <div
                                            key={publication.idPublication}
                                            className="min-w-[250px] sm:min-w-[370px] overflow-hidden hover:bg-gray-50 hover:rounded-lg transition-shadow duration-300 group cursor-pointer relative">
                                            {index < filteredPostsWithoutImage.length - 1 && (
                                                <div className="absolute top-6 right-0 h-20 w-0.5 bg-gray-200 rounded-full group-hover:h-14 group-hover:bg-gray-400 transition-all duration-300"></div>
                                            )}

                                            <div className="p-2 sm:p-3">
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
                            {canScrollLeft() && (
                                <button
                                    type="button"
                                    className={`hidden sm:flex absolute top-1/2 left-0 -translate-y-1/2 z-30 items-center justify-center px-4 cursor-pointer group focus:outline-none transition-opacity duration-300 ${showButtons ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                        }`}
                                    onClick={() => scroll('left')}
                                >
                                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/90 shadow-xl border border-gray-100 backdrop-blur-sm group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                                        <Icon icon="tabler:chevron-left" width="24" height="24" style={{ color: '#374151' }} />
                                    </span>
                                </button>
                            )}

                            {/* Botón siguiente */}
                            {canScrollRight() && (
                                <button
                                    type="button"
                                    className={`hidden sm:flex absolute top-1/2 right-0 -translate-y-1/2 z-30 items-center justify-center px-4 cursor-pointer group focus:outline-none transition-opacity duration-300 ${showButtons ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                        }`}
                                    onClick={() => scroll('right')}
                                >
                                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/90 border border-gray-100 shadow-xl backdrop-blur-sm group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                                        <Icon icon="tabler:chevron-right" width="24" height="24" style={{ color: '#374151' }} />
                                    </span>
                                </button>
                            )}
                        </div>
                    </section>

                    {/* Posts With Image Section - 2 columns grid */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Publicaciones destacadas</h2>
                        {filteredPostsWithImage.length > 0 ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {filteredPostsWithImage.map((pub) => (
                                    <div key={pub.idPublication} className="bg-white rounded-2xl border border-gray-200 overflow-hidden cursor-pointer hover:shadow-sm transition-all duration-300 hover:border hover:border-gray-300 group">
                                        {/* Imagen principal */}
                                        <div className="relative">
                                            <img
                                                src={pub.featuredImage}
                                                alt={pub.title}
                                                className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            {pub.images && pub.images.length > 0 && (
                                                <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                                    + {pub.images.length}
                                                </span>
                                            )}
                                        </div>

                                        {/* Información del autor */}
                                        <div className="p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    {pub.userPhoto ? (
                                                        <img
                                                            src={pub.userPhoto}
                                                            alt={pub.userName}
                                                            className="size-10 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="size-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold text-sm uppercase">
                                                            {getInitials(pub.userName)}
                                                        </div>
                                                    )}

                                                    <div>
                                                        <h3 className="text-sm font-medium text-gray-800 line-clamp-1 w-40 sm:w-80 xl:w-60 overflow-hidden whitespace-nowrap mb-1">
                                                            {pub.userName}
                                                        </h3>
                                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                                            <span className="bg-gray-100 px-3 py-0.5 rounded-full font-semibold">
                                                                {pub.categoryName}
                                                            </span>
                                                            <span>•</span>
                                                            <span>{pub.views} vistas</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-xs text-gray-500">{timeAgo(pub.createdAt)}</span>
                                            </div>

                                            {/* Título y descripción */}
                                            <div className="mb-3">
                                                <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{pub.title}</h2>
                                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{pub.description}</p>
                                            </div>

                                            <div className="border-t border-gray-200 my-2"></div>

                                            {/* Botones de interacción */}
                                            <PostInteractionButtons
                                                publication={pub}
                                                likedPosts={postInteractions.likedPosts}
                                                dislikedPosts={postInteractions.dislikedPosts}
                                                savedPosts={postInteractions.savedPosts}
                                                showFilledLike={postInteractions.showFilledLike}
                                                showFilledDislike={postInteractions.showFilledDislike}
                                                onLike={postInteractions.handleLike}
                                                onDislike={postInteractions.handleDislike}
                                                onComment={postInteractions.handleComment}
                                                onBookmark={postInteractions.handleBookmark}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
                                <Icon icon="material-symbols:image-outline" className="w-12 h-12 mx-auto mb-2" />
                                <p>No hay publicaciones destacadas en esta categoría</p>
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
};