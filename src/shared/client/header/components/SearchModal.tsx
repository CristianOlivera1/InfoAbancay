import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import categorys from '../../../../pages/client/home/categorys.json';
import postWithoutImageData from '../../../../pages/client/home/postWithoutImage.json';
import publicationsWithImageData from '../../../../pages/client/home/publicationsWithImage.json';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPosts = searchQuery.trim()
        ? [
            ...postWithoutImageData.filter(post =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.description.toLowerCase().includes(searchQuery.toLowerCase())
            ),
            ...publicationsWithImageData.filter(post =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
        ].slice(0, 5)
        : [];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            console.log('Buscando:', searchQuery);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 flex justify-center items-start bg-black/70 overflow-auto"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="relative mb-10 mt-16 w-full max-w-3xl px-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="box-border min-w-0 overflow-hidden rounded-lg bg-white shadow-xl sm:rounded-[10px]">
                            <button
                                onClick={onClose}
                                className="group absolute -right-20 -top-6 z-40 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                                title="Cerrar"
                            >
                                <Icon icon="mdi:close" className="w-6 h-6 text-gray-700 group-hover:text-primary" />
                            </button>

                            <div className="box-border flex flex-col gap-4 p-6 pt-10 h-[80vh]">
                                <form onSubmit={handleSearch} className="flex flex-row items-center gap-2 border-b border-gray-200 pb-4">
                                    <Icon icon="lucide:search" className="w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        className="box-border h-6 w-full flex-1 appearance-none border-0 focus:outline-none text-gray-800 placeholder-gray-400"
                                        placeholder="Buscar publicaciones..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        autoFocus
                                    />
                                    <button type="submit" className="hover:opacity-70 transition-opacity">
                                        <Icon icon="carbon:send-alt-filled" className="w-6 h-6 text-gray-400 hover:text-primary" />
                                    </button>
                                </form>
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col gap-4">
                                        <div className="text-xs font-semibold text-gray-500 uppercase">
                                            Categorías populares
                                        </div>
                                        <div className="flex flex-row flex-wrap gap-2">
                                            {categorys.slice(0, 5).map((category) => (
                                                <Link
                                                    key={category.idCategory}
                                                    to={`/categoria/${encodeURIComponent(category.name.toLowerCase().replace(/\s+/g, '-'))}`}
                                                    onClick={onClose}
                                                    className="hover:opacity-70 transition-opacity"
                                                >
                                                    <div className="text-xs font-semibold text-gray-600 flex h-8 items-center whitespace-nowrap rounded-lg bg-indigo-50 px-4 hover:bg-indigo-100">
                                                        {category.name}
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {searchQuery.trim() && (
                                    <div className="flex flex-col gap-4 max-h-96 overflow-y-auto">
                                        <div className="text-xs font-semibold text-gray-500 uppercase">
                                            Resultados de búsqueda ({filteredPosts.length})
                                        </div>
                                        {filteredPosts.length > 0 ? (
                                            <div className="flex flex-col gap-2">
                                                {filteredPosts.map((post) => (
                                                    <Link
                                                        key={post.idPublication}
                                                        to={`/publicacion/${post.idPublication}`}
                                                        onClick={onClose}
                                                        className="p-3 rounded-lg border border-gray-200 hover:border-primary hover:bg-gray-50 transition-all"
                                                    >
                                                        <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
                                                            {post.title}
                                                        </h3>
                                                        <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                                                            {post.description}
                                                        </p>
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8 text-gray-500">
                                                <Icon icon="material-symbols:search-off" className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                                                <p>No se encontraron publicaciones</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
