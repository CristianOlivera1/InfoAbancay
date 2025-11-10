import publications from '../publicationsWithImage.json';
import { timeAgo } from '../../../../utils/timeAgo.ts';
import { getInitials } from '../../../../utils/getInitials.ts';
import { usePostInteractions } from './PostInteractions.ts';
import PostInteractionButtons from './PostInteractionButtons';

export default function CardPost() {
    const postInteractions = usePostInteractions();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {publications.map((pub) => (
                <div key={pub.idPublication} className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300 hover:border hover:border-gray-300 group">
                    {/* Imagen principal */}
                    <div className="relative">
                        <img
                            src={pub.featuredImage}
                            alt={pub.title}
                            className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full font-semibold">+{' '}
                            {pub.images ? pub.images.length : 1}
                        </span>
                    </div>
                    
                    {/* Información del autor */}
                    <div className="p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-1 sm:gap-3">
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
                                    <h3
                                        className="text-sm font-medium text-gray-800 truncate w-40 sm:w-80 xl:w-60 overflow-hidden whitespace-nowrap mb-1"
                                        title={pub.userName}>
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
                        <div className="mb-5">
                            <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{pub.title}</h2>
                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{pub.description}</p>
                        </div>
                        
                        <div className="border-t border-gray-200 my-4"></div>
                        
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
                            onShare={postInteractions.handleShare}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}