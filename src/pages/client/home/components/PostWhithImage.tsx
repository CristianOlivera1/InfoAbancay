
// import publications from '../publicationsWithImage.json';
// import { timeAgo } from '../../../../utils/timeAgo.ts';
// import { getInitials } from '../../../../utils/getInitials.ts';
// import { useState } from 'react';
// import { animateButton } from './postAnimations.ts';
// import { Icon } from '@iconify/react';

// export default function PostWhithImage() {
//     const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
//     const [dislikedPosts, setDislikedPosts] = useState<Set<number>>(new Set());
//     const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set());
//     const [showFilledLike, setShowFilledLike] = useState<{[key:number]:boolean}>({});
//     const [showFilledDislike, setShowFilledDislike] = useState<{[key:number]:boolean}>({});


//     const handleLike = (pubId: number, event: React.MouseEvent<HTMLButtonElement>) => {
//         const button = event.currentTarget;
//         animateButton(button, 'like');

//         setTimeout(() => {
//             setShowFilledLike(prev => ({ ...prev, [pubId]: true }));
//         }, 350); // Wait for GSAP animation to finish

//         setLikedPosts(prev => {
//             const newSet = new Set(prev);
//             if (newSet.has(pubId)) {
//                 newSet.delete(pubId);
//                 setShowFilledLike(prev => ({ ...prev, [pubId]: false }));
//             } else {
//                 newSet.add(pubId);
//                 // Remove from disliked if it was disliked
//                 setDislikedPosts(prevDisliked => {
//                     const newDislikedSet = new Set(prevDisliked);
//                     newDislikedSet.delete(pubId);
//                     return newDislikedSet;
//                 });
//             }
//             return newSet;
//         });
//     };

//     const handleDislike = (pubId: number, event: React.MouseEvent<HTMLButtonElement>) => {
//         const button = event.currentTarget;
//         animateButton(button, 'dislike');

//         setTimeout(() => {
//             setShowFilledDislike(prev => ({ ...prev, [pubId]: true }));
//         }, 600); // Wait for GSAP animation to finish

//         setDislikedPosts(prev => {
//             const newSet = new Set(prev);
//             if (newSet.has(pubId)) {
//                 newSet.delete(pubId);
//                 setShowFilledDislike(prev => ({ ...prev, [pubId]: false }));
//             } else {
//                 newSet.add(pubId);
//                 // Remove from liked if it was liked
//                 setLikedPosts(prevLiked => {
//                     const newLikedSet = new Set(prevLiked);
//                     newLikedSet.delete(pubId);
//                     return newLikedSet;
//                 });
//             }
//             return newSet;
//         });
//     };

//     const handleComment = (event: React.MouseEvent<HTMLButtonElement>) => {
//         const button = event.currentTarget;
//         animateButton(button, 'comment');
//     };

//     const handleBookmark = (pubId: number, event: React.MouseEvent<HTMLButtonElement>) => {
//         const button = event.currentTarget;
//         animateButton(button, 'bookmark');

//         setSavedPosts(prev => {
//             const newSet = new Set(prev);
//             if (newSet.has(pubId)) {
//                 newSet.delete(pubId);
//             } else {
//                 newSet.add(pubId);
//             }
//             return newSet;
//         });
//     };

//     const handleShare = (pub: typeof publications[0], event: React.MouseEvent<HTMLButtonElement>) => {
//         const button = event.currentTarget;
//         animateButton(button, 'share');
//         navigator.share?.({ title: pub.title, url: window.location.href });
//     };
//     return (
//         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//             {publications.map((pub) => (

//                 <div key={pub.idPublication} className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300 hover:border hover:border-gray-300 group">
//                     {/* Imagen principal */}
//                     <div className="relative">
//                         <img
//                             src={pub.featuredImage}
//                             alt={pub.title}
//                             className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
//                         />
//                         <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full font-semibold">+{' '}
//                             {pub.images ? pub.images.length : 1}
//                         </span>

//                     </div>
//                     {/* Información del autor */}
//                     <div className="p-5">
//                         <div className="flex items-center justify-between mb-4">
//                             <div className="flex items-center gap-1 sm:gap-3">
//                                 {pub.userPhoto ? (
//                                     <img
//                                         src={pub.userPhoto}
//                                         alt={pub.userName}
//                                         className="size-10 rounded-full object-cover"
//                                     />
//                                 ) : (
//                                     <div className="size-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold text-sm uppercase">
//                                         {getInitials(pub.userName)}
//                                     </div>
//                                 )}

//                                 <div>
//                                     <h3
//                                         className="text-sm font-medium text-gray-800 truncate w-40 sm:w-80 xl:w-60 overflow-hidden whitespace-nowrap mb-1"
//                                         title={pub.userName}>
//                                         {pub.userName}
//                                     </h3>
//                                     <div className="flex items-center gap-2 text-xs text-gray-500">
//                                         <span className="bg-gray-100 px-3 py-0.5 rounded-full font-semibold">
//                                             {pub.categoryName}
//                                         </span>
//                                         <span>•</span>
//                                         <span>{pub.views} vistas</span>
//                                     </div>
//                                 </div>
//                             </div>
//                             <span className="text-xs text-gray-500">{timeAgo(pub.createdAt)}</span>
//                         </div>
//                         {/* Título y descripción */}
//                         <div className="mb-5">
//                             <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{pub.title}</h2>
//                             <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{pub.description}</p>
//                         </div>
//                         <div className="border-t border-gray-200 my-4"></div>
//                         {/* Botones de interacción */}
//                         <div className="flex items-center justify-between flex-wrap gap-4">
//                             <div className="flex items-center gap-2 text-gray-500">
//                                 {/* Likes */}
//                                 <button type="button" title="Me gusta" aria-label="Me gusta"
//                                     className={`flex items-center hover:bg-blue-50 p-1 hover:text-blue-500 hover:rounded-md gap-1 transition-colors ${likedPosts.has(pub.idPublication) ? 'text-blue-600 bg-blue-50 rounded-md' : 'text-gray-500'}`}
//                                     onClick={(e) => handleLike(pub.idPublication, e)}>
//                                     {likedPosts.has(pub.idPublication) && showFilledLike[pub.idPublication] ? (
//                                         <Icon icon="solar:like-bold-duotone" width="24" height="24" />
//                                     ) : (
//                                         <Icon icon="solar:like-line-duotone" width="24" height="24" />
//                                     )}
//                                     {(pub.totalLikes + (likedPosts.has(pub.idPublication) ? 1 : 0) - (dislikedPosts.has(pub.idPublication) ? 1 : 0)) > 0 &&
//                                         <span className="font-medium text-sm">{pub.totalLikes + (likedPosts.has(pub.idPublication) ? 1 : 0) - (dislikedPosts.has(pub.idPublication) ? 1 : 0)}</span>}
//                                 </button>

//                                 {/* Unlikes */}
//                                 <button type="button"
//                                     title="Ya no me gusta"
//                                     aria-label="Ya no me gusta"
//                                     className={`flex items-center hover:bg-red-50 p-1 hover:text-red-500 hover:rounded-md gap-1 transition-colors ${dislikedPosts.has(pub.idPublication) ? 'text-red-600 bg-red-50 rounded-md' : 'text-gray-500'}`}
//                                     onClick={(e) => handleDislike(pub.idPublication, e)}>
//                                     {dislikedPosts.has(pub.idPublication) && showFilledDislike[pub.idPublication] ? (
//                                         <Icon icon="solar:dislike-bold-duotone" width="24" height="24" />
//                                     ) : (
//                                         <Icon icon="solar:dislike-line-duotone" width="24" height="24" />
//                                     )}
//                                     {(pub.totalUnlikes + (dislikedPosts.has(pub.idPublication) ? 1 : 0)) > 0 &&
//                                         <span className="font-medium text-sm">{pub.totalUnlikes + (dislikedPosts.has(pub.idPublication) ? 1 : 0)}</span>}
//                                 </button>

//                                 {/* Comentarios */}
//                                 <button type="button"
//                                     title="Comentar publicación"
//                                     aria-label="Comentar publicación"
//                                     className="flex items-center hover:bg-yellow-50 p-1 hover:text-yellow-500 hover:rounded-md gap-1 text-gray-500 transition-colors"
//                                     onClick={handleComment}>
//                                     <Icon icon="iconamoon:comment" width="24" height="24" />
//                                     {pub.totalComments > 0 && <span className="font-medium text-sm">{pub.totalComments}</span>}
//                                 </button>
//                             </div>
//                             {/* Fijar */}
//                             <button
//                                 type="button"
//                                 title="Fijar publicación"
//                                 aria-label="Fijar publicación"
//                                 className={`flex items-center gap-2 hover:bg-amber-50 p-1 hover:text-amber-500 hover:rounded-md transition-colors text-sm font-medium ${savedPosts.has(pub.idPublication) ? 'text-amber-500' : 'text-gray-500'
//                                     } hover:text-amber-600`}
//                                 onClick={(e) => handleBookmark(pub.idPublication, e)}>
                                    
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={savedPosts.has(pub.idPublication) ? 'currentColor' : 'none'}> <path  stroke="currentColor" strokeWidth="2"
//                                         d="M4 9c0-2.828 0-4.243.879-5.121C5.757 3 7.172 3 10 3h4c2.828 0 4.243 0 5.121.879C20 4.757 20 6.172 20 9v6.828c0 2.683 0 4.024-.844 4.435c-.845.41-1.9-.419-4.01-2.076l-.675-.531c-1.186-.932-1.78-1.398-2.471-1.398s-1.285.466-2.471 1.398l-.676.53c-2.11 1.658-3.164 2.487-4.009 2.077C4 19.853 4 18.51 4 15.828z"
//                                     />
//                                 </svg>
//                             </button>

//                             {/* Compartir */}
//                             <button type="button"
//                                 title="Compartir publicación"
//                                 aria-label="Compartir publicación"
//                                 className="flex items-center gap-2 text-sm font-medium text-gray-500 text-gray-5 hover:bg-sky-50 p-1 hover:text-sky-500 hover:rounded-md transition-colors "
//                                 onClick={(e) => handleShare(pub, e)}>
//                                 <Icon icon="tabler:share" width="24" height="24" />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>

//     )
// }
