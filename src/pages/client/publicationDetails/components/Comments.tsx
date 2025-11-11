import { useCommentInteractions, type Comment } from './CommentInteractions';
import { CommentInteractionButtons, ReplyInteractionButtons } from './CommentInteractionButtons';

// Datos de ejemplo - en una aplicación real, estos vendrían de una API
const mockComments: Comment[] = [
    {
        id: 1,
        authorName: "Sarah P.",
        authorAvatar: "https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png",
        content: "This was such a wonderful event! My kids had a blast. Can't wait for next year.",
        timeAgo: "1 day ago",
        totalLikes: 5,
        totalUnlikes: 0,
        totalReplies: 2,
        replies: [
            {
                id: 101,
                commentId: 1,
                authorName: "John Doe",
                authorAvatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
                content: "I totally agree! My family had an amazing time too.",
                timeAgo: "12 hours ago",
                totalLikes: 2,
                totalUnlikes: 0
            },
            {
                id: 102,
                commentId: 1,
                authorName: "Maria Garcia",
                authorAvatar: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
                content: "Same here! The organization was excellent.",
                timeAgo: "8 hours ago",
                totalLikes: 1,
                totalUnlikes: 0
            }
        ]
    },
    {
        id: 2,
        authorName: "Mark Chen",
        authorAvatar: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
        content: "The food was incredible. I tried the tacos from that new truck and they were the best I've ever had. Kudos to the organizers for bringing in such great vendors.",
        timeAgo: "2 days ago",
        totalLikes: 8,
        totalUnlikes: 1,
        totalReplies: 0,
        replies: []
    },
    {
        id: 3,
        authorName: "Lisa Rodriguez",
        authorAvatar: "https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png",
        content: "Great atmosphere and live music! The local bands were fantastic.",
        timeAgo: "3 days ago",
        totalLikes: 3,
        totalUnlikes: 0,
        totalReplies: 1,
        replies: [
            {
                id: 201,
                commentId: 3,
                authorName: "Alex Johnson",
                authorAvatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
                content: "The jazz band was my favorite! Do you know their name?",
                timeAgo: "2 days ago",
                totalLikes: 1,
                totalUnlikes: 0
            }
        ]
    }
];

export default function Comments() {
    const commentInteractions = useCommentInteractions();

    return (
        <div className="bg-white rounded-xl shadow-sm p-3 sm:p-6 md:p-8 mt-8">
            <h3 className="text-xl font-bold text-[#111418] mb-6">Comentarios ({mockComments.length})</h3>
            
            {/* Comment Input */}
            <div className="flex items-start gap-2 sm:gap-4 mb-8">
                <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 mt-1"
                    data-alt="User avatar image"
                    style={{
                        backgroundImage:
                            "url('https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg')",
                    }}
                ></div>

                <div className="flex-1">
                    <textarea
                        className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:border-gray-100 focus:ring-2 focus:ring-gray-300 focus:outline-none shadow-sm transition"
                        placeholder="Add a comment..."
                        rows={3}
                    ></textarea>

                    <div className="flex justify-end mt-2">
                        <button className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-semibold leading-normal tracking-[0.015em] hover:bg-primary-dark transition-colors shadow">
                            <span className="truncate">Comentar</span>
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Comment List */}
            <div className="space-y-6">
                {mockComments.map((comment) => (
                    <div key={comment.id} className="space-y-4">
                        {/* Comentario principal */}
                        <div className="flex items-start gap-2 sm:gap-4">
                            <div 
                                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0" 
                                data-alt={`Avatar of ${comment.authorName}`} 
                                style={{ backgroundImage: `url('${comment.authorAvatar}')` }}
                            ></div>
                            <div className="flex-1">
                                <div className="bg-gray-100 rounded-xl p-4">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="text-sm font-bold text-[#111418]">{comment.authorName}</p>
                                        <p className="text-xs text-gray-500">{comment.timeAgo}</p>
                                    </div>
                                    <p className="text-sm text-gray-700">{comment.content}</p>
                                </div>
                                
                                {/* Botones de interacción del comentario */}
                                <div className="mt-2 px-2">
                                    <CommentInteractionButtons
                                        comment={comment}
                                        likedComments={commentInteractions.likedComments}
                                        dislikedComments={commentInteractions.dislikedComments}
                                        showFilledLike={commentInteractions.showFilledLikeComment}
                                        showFilledDislike={commentInteractions.showFilledDislikeComment}
                                        showReplyForm={commentInteractions.showReplyForm}
                                        replyText={commentInteractions.replyTexts[comment.id] || ''}
                                        onLike={commentInteractions.handleLikeComment}
                                        onDislike={commentInteractions.handleDislikeComment}
                                        onToggleReply={commentInteractions.handleToggleReplyForm}
                                        onReplyTextChange={commentInteractions.handleReplyTextChange}
                                        onSubmitReply={commentInteractions.handleSubmitReply}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Respuestas al comentario */}
                        {comment.replies && comment.replies.length > 0 && (
                            <div className="ml-6 sm:ml-12 space-y-4 border-l-2 border-gray-100 pl-4">
                                {comment.replies.map((reply) => (
                                    <div key={reply.id} className="flex items-start gap-2 sm:gap-4">
                                        <div 
                                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 shrink-0" 
                                            data-alt={`Avatar of ${reply.authorName}`} 
                                            style={{ backgroundImage: `url('${reply.authorAvatar}')` }}
                                        ></div>
                                        <div className="flex-1">
                                            <div className="bg-gray-50 rounded-xl p-3">
                                                <div className="flex items-center justify-between mb-1">
                                                    <p className="text-sm font-bold text-[#111418]">{reply.authorName}</p>
                                                    <p className="text-xs text-gray-500">{reply.timeAgo}</p>
                                                </div>
                                                <p className="text-sm text-gray-700">{reply.content}</p>
                                            </div>
                                            
                                            {/* Botones de interacción de la respuesta */}
                                            <div className="px-2">
                                                <ReplyInteractionButtons
                                                    reply={reply}
                                                    likedReplies={commentInteractions.likedReplies}
                                                    dislikedReplies={commentInteractions.dislikedReplies}
                                                    showFilledLike={commentInteractions.showFilledLikeReply}
                                                    showFilledDislike={commentInteractions.showFilledDislikeReply}
                                                    onLike={commentInteractions.handleLikeReply}
                                                    onDislike={commentInteractions.handleDislikeReply}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}