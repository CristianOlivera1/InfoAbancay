import { Icon } from '@iconify/react';
import type { Comment, Reply } from './CommentInteractions';

interface CommentInteractionButtonsProps {
    comment: Comment;
    likedComments: Set<number>;
    dislikedComments: Set<number>;
    showFilledLike: { [key: number]: boolean };
    showFilledDislike: { [key: number]: boolean };
    showReplyForm: { [key: number]: boolean };
    replyText: string;
    onLike: (commentId: number, event: React.MouseEvent<HTMLButtonElement>) => void;
    onDislike: (commentId: number, event: React.MouseEvent<HTMLButtonElement>) => void;
    onToggleReply: (commentId: number) => void;
    onReplyTextChange: (commentId: number, text: string) => void;
    onSubmitReply: (commentId: number) => void;
}

interface ReplyInteractionButtonsProps {
    reply: Reply;
    likedReplies: Set<number>;
    dislikedReplies: Set<number>;
    showFilledLike: { [key: number]: boolean };
    showFilledDislike: { [key: number]: boolean };
    onLike: (replyId: number, event: React.MouseEvent<HTMLButtonElement>) => void;
    onDislike: (replyId: number, event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function CommentInteractionButtons({
    comment,
    likedComments,
    dislikedComments,
    showFilledLike,
    showFilledDislike,
    showReplyForm,
    replyText,
    onLike,
    onDislike,
    onToggleReply,
    onReplyTextChange,
    onSubmitReply
}: CommentInteractionButtonsProps) {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-4">
                {/* Like */}
                <button
                    type="button"
                    title="Me gusta"
                    aria-label="Me gusta este comentario"
                    className={`flex items-center gap-1 hover:bg-blue-50 px-1 py-0.5 hover:text-blue-500 rounded transition-colors text-xs ${
                        likedComments.has(comment.id) ? 'text-blue-600' : 'text-gray-500'
                    }`}
                    onClick={(e) => onLike(comment.id, e)}
                >
                    {likedComments.has(comment.id) && showFilledLike[comment.id] ? (
                        <Icon icon="solar:like-bold-duotone" width="16" height="16" />
                    ) : (
                        <Icon icon="solar:like-line-duotone" width="16" height="16" />
                    )}
                    <span className="font-medium">
                        {comment.totalLikes + (likedComments.has(comment.id) ? 1 : 0) - (dislikedComments.has(comment.id) ? 1 : 0) || ''}
                    </span>
                </button>

                {/* Dislike */}
                <button
                    type="button"
                    title="No me gusta"
                    aria-label="No me gusta este comentario"
                    className={`flex items-center gap-1 hover:bg-red-50 px-1 py-0.5 hover:text-red-500 rounded transition-colors text-xs ${
                        dislikedComments.has(comment.id) ? 'text-red-600' : 'text-gray-500'
                    }`}
                    onClick={(e) => onDislike(comment.id, e)}
                >
                    {dislikedComments.has(comment.id) && showFilledDislike[comment.id] ? (
                        <Icon icon="solar:dislike-bold-duotone" width="16" height="16" />
                    ) : (
                        <Icon icon="solar:dislike-line-duotone" width="16" height="16" />
                    )}
                    <span className="font-medium">
                        {comment.totalUnlikes + (dislikedComments.has(comment.id) ? 1 : 0) || ''}
                    </span>
                </button>

                {/* Total de respuestas */}
                {comment.totalReplies > 0 && (
                    <span className="text-xs text-gray-500 font-medium">
                        {comment.totalReplies} {comment.totalReplies === 1 ? 'respuesta' : 'respuestas'}
                    </span>
                )}

                {/* Responder */}
                <button
                    type="button"
                    title="Responder"
                    aria-label="Responder a este comentario"
                    className="text-xs font-medium text-gray-500 hover:text-blue-600 transition-colors"
                    onClick={() => onToggleReply(comment.id)}
                >
                    Responder
                </button>
            </div>

            {/* Formulario de respuesta */}
            {showReplyForm[comment.id] && (
                <div className="mt-3 ml-4 border-l-2 border-gray-200 pl-2 sm:pl-4">
                    <div className="flex items-start gap-2">
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 shrink-0"
                            data-alt="Tu avatar"
                            style={{
                                backgroundImage:
                                    "url('https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg')",
                            }}
                        ></div>
                        <div className="flex-1">
                            <textarea
                                className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none shadow-sm transition"
                                placeholder={`Responder a ${comment.authorName}...`}
                                rows={2}
                                value={replyText}
                                onChange={(e) => onReplyTextChange(comment.id, e.target.value)}
                            />
                            <div className="flex justify-end gap-2 mt-2">
                                <button
                                    type="button"
                                    className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1 transition-colors"
                                    onClick={() => onToggleReply(comment.id)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    className="bg-blue-600 text-white text-sm px-4 py-1 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={!replyText.trim()}
                                    onClick={() => onSubmitReply(comment.id)}
                                >
                                    Responder
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export function ReplyInteractionButtons({
    reply,
    likedReplies,
    dislikedReplies,
    showFilledLike,
    showFilledDislike,
    onLike,
    onDislike
}: ReplyInteractionButtonsProps) {
    return (
        <div className="flex items-center gap-4 mt-2">
            {/* Like */}
            <button
                type="button"
                title="Me gusta"
                aria-label="Me gusta esta respuesta"
                className={`flex items-center gap-1 hover:bg-blue-50 px-1 py-0.5 hover:text-blue-500 rounded transition-colors text-xs ${
                    likedReplies.has(reply.id) ? 'text-blue-600' : 'text-gray-500'
                }`}
                onClick={(e) => onLike(reply.id, e)}
            >
                {likedReplies.has(reply.id) && showFilledLike[reply.id] ? (
                    <Icon icon="solar:like-bold-duotone" width="16" height="16" />
                ) : (
                    <Icon icon="solar:like-line-duotone" width="16" height="16" />
                )}
                <span className="font-medium">
                    {reply.totalLikes + (likedReplies.has(reply.id) ? 1 : 0) - (dislikedReplies.has(reply.id) ? 1 : 0) || ''}
                </span>
            </button>

            {/* Dislike */}
            <button
                type="button"
                title="No me gusta"
                aria-label="No me gusta esta respuesta"
                className={`flex items-center gap-1 hover:bg-red-50 px-1 py-0.5 hover:text-red-500 rounded transition-colors text-xs ${
                    dislikedReplies.has(reply.id) ? 'text-red-600' : 'text-gray-500'
                }`}
                onClick={(e) => onDislike(reply.id, e)}
            >
                {dislikedReplies.has(reply.id) && showFilledDislike[reply.id] ? (
                    <Icon icon="solar:dislike-bold-duotone" width="16" height="16" />
                ) : (
                    <Icon icon="solar:dislike-line-duotone" width="16" height="16" />
                )}
                <span className="font-medium">
                    {reply.totalUnlikes + (dislikedReplies.has(reply.id) ? 1 : 0) || ''}
                </span>
            </button>
        </div>
    );
}

export default CommentInteractionButtons;