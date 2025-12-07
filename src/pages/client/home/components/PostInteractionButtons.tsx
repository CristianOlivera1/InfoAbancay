import { useState } from 'react';
import { Icon } from '@iconify/react';
import type { Publication } from './PostInteractions';
import Alert from '../../../../shared/client/alert/alert.tsx';
import { animateButton } from './postAnimations';

interface PostInteractionButtonsProps {
    publication: Publication;
    likedPosts: Set<number>;
    dislikedPosts: Set<number>;
    savedPosts: Set<number>;
    showFilledLike: { [key: number]: boolean };
    showFilledDislike: { [key: number]: boolean };
    onLike: (pubId: number, event: React.MouseEvent<HTMLButtonElement>) => void;
    onDislike: (pubId: number, event: React.MouseEvent<HTMLButtonElement>) => void;
    onComment: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onBookmark: (pubId: number, event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function PostInteractionButtons({
    publication,
    likedPosts,
    dislikedPosts,
    savedPosts,
    showFilledLike,
    showFilledDislike,
    onLike,
    onDislike,
    onComment,
    onBookmark
}: PostInteractionButtonsProps) {
    const [showAlert, setShowAlert] = useState(false);

    const handleCopyLink = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget;
        animateButton(button, 'copy');
        
        try {
            await navigator.clipboard.writeText(window.location.origin + '/publicacion/' + publication.idPublication);
            setShowAlert(true);
        } catch {
            // Si falla, podrías mostrar un alert de error
        }
    };

    return (
        <div className="relative">
            {showAlert && (
                <div className="fixed top-10 right-20 z-50">
                    <Alert
                        type="success"
                        title="Enlace copiado"
                        message="Puedes compartir el enlace de la publicación ahora"
                        visible={showAlert}
                        onClose={() => setShowAlert(false)}
                        duration={6000}
                    />
                </div>
            )}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-500">
                    {/* Likes */}
                    <button type="button" title="Me gusta" aria-label="Me gusta"
                        className={`flex items-center hover:bg-blue-50 p-1 hover:text-blue-500 hover:rounded-md gap-1 transition-colors ${likedPosts.has(publication.idPublication) ? 'text-blue-600 bg-blue-50 rounded-md' : 'text-gray-500'}`}
                        onClick={(e) => onLike(publication.idPublication, e)}>
                        {likedPosts.has(publication.idPublication) && showFilledLike[publication.idPublication] ? (
                            <Icon icon="solar:like-bold-duotone" width="24" height="24" />
                        ) : (
                            <Icon icon="solar:like-line-duotone" width="24" height="24" />
                        )}
                        {(publication.totalLikes + (likedPosts.has(publication.idPublication) ? 1 : 0) - (dislikedPosts.has(publication.idPublication) ? 1 : 0)) > 0 &&
                            <span className="font-medium text-sm">{publication.totalLikes + (likedPosts.has(publication.idPublication) ? 1 : 0) - (dislikedPosts.has(publication.idPublication) ? 1 : 0)}</span>}
                    </button>

                    {/* Unlikes */}
                    <button type="button"
                        title="Ya no me gusta"
                        aria-label="Ya no me gusta"
                        className={`flex items-center hover:bg-red-50 p-1 hover:text-red-500 hover:rounded-md gap-1 transition-colors ${dislikedPosts.has(publication.idPublication) ? 'text-red-600 bg-red-50 rounded-md' : 'text-gray-500'}`}
                        onClick={(e) => onDislike(publication.idPublication, e)}>
                        {dislikedPosts.has(publication.idPublication) && showFilledDislike[publication.idPublication] ? (
                            <Icon icon="solar:dislike-bold-duotone" width="24" height="24" />
                        ) : (
                            <Icon icon="solar:dislike-line-duotone" width="24" height="24" />
                        )}
                        {(publication.totalUnlikes + (dislikedPosts.has(publication.idPublication) ? 1 : 0)) > 0 &&
                            <span className="font-medium text-sm">{publication.totalUnlikes + (dislikedPosts.has(publication.idPublication) ? 1 : 0)}</span>}
                    </button>

                    {/* Comentarios */}
                    <button type="button"
                        title="Comentar publicación"
                        aria-label="Comentar publicación"
                        className="flex items-center hover:bg-yellow-50 p-1 hover:text-yellow-500 hover:rounded-md gap-1 text-gray-500 transition-colors"
                        onClick={onComment}>
                        <Icon icon="iconamoon:comment" width="24" height="24" />
                        {publication.totalComments > 0 && <span className="font-medium text-sm">{publication.totalComments}</span>}
                    </button>
                </div>

                {/* Fijar */}
                <div className="flex items-center gap-2 text-gray-500">
                    <button
                        type="button"
                        title="Fijar publicación"
                        aria-label="Fijar publicación"
                        className={`flex items-center gap-2 hover:bg-amber-50 p-1 hover:text-amber-500 hover:rounded-md transition-colors text-sm font-medium ${savedPosts.has(publication.idPublication) ? 'text-amber-500' : 'text-gray-500'
                            } hover:text-amber-600`}
                        onClick={(e) => onBookmark(publication.idPublication, e)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill={savedPosts.has(publication.idPublication) ? 'currentColor' : 'none'}
                        >
                            <path
                                stroke="currentColor"
                                strokeWidth="2"
                                d="M4 9c0-2.828 0-4.243.879-5.121C5.757 3 7.172 3 10 3h4c2.828 0 4.243 0 5.121.879C20 4.757 20 6.172 20 9v6.828c0 2.683 0 4.024-.844 4.435c-.845.41-1.9-.419-4.01-2.076l-.675-.531c-1.186-.932-1.78-1.398-2.471-1.398s-1.285.466-2.471 1.398l-.676.53c-2.11 1.658-3.164 2.487-4.009 2.077C4 19.853 4 18.51 4 15.828z"
                            />
                        </svg>
                    </button>

                    {/* Copiar enlace */}
                    <button
                        type="button"
                        title="Copiar enlace de publicación"
                        aria-label="Copiar enlace de publicación"
                        className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:bg-sky-50 p-1 hover:text-sky-500 hover:rounded-md transition-colors"
                        onClick={handleCopyLink}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeDasharray="28" strokeDashoffset="28" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 6l2 -2c1 -1 3 -1 4 0l1 1c1 1 1 3 0 4l-5 5c-1 1 -3 1 -4 0M11 18l-2 2c-1 1 -3 1 -4 0l-1 -1c-1 -1 -1 -3 0 -4l5 -5c1 -1 3 -1 4 0">
                                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="28;0" />
                            </path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}