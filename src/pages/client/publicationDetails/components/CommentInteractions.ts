import { useRef, useState, useCallback } from 'react';
import { animateButton, type AnimationType } from '../../../../shared/client/components/post/postAnimations';

export interface Comment {
    id: number;
    authorName: string;
    authorAvatar: string;
    content: string;
    timeAgo: string;
    totalLikes: number;
    totalUnlikes: number;
    totalReplies: number;
    replies?: Reply[];
}

export interface Reply {
    id: number;
    commentId: number;
    authorName: string;
    authorAvatar: string;
    content: string;
    timeAgo: string;
    totalLikes: number;
    totalUnlikes: number;
}

export function useCommentInteractions() {
    // Estados para likes y dislikes de comentarios
    const [likedComments, setLikedComments] = useState<Set<number>>(new Set());
    const [dislikedComments, setDislikedComments] = useState<Set<number>>(new Set());
    const [showFilledLikeComment, setShowFilledLikeComment] = useState<{ [key: number]: boolean }>({});
    const [showFilledDislikeComment, setShowFilledDislikeComment] = useState<{ [key: number]: boolean }>({});

    // Estados para likes y dislikes de respuestas
    const [likedReplies, setLikedReplies] = useState<Set<number>>(new Set());
    const [dislikedReplies, setDislikedReplies] = useState<Set<number>>(new Set());
    const [showFilledLikeReply, setShowFilledLikeReply] = useState<{ [key: number]: boolean }>({});
    const [showFilledDislikeReply, setShowFilledDislikeReply] = useState<{ [key: number]: boolean }>({});

    // Estados para mostrar/ocultar formularios de respuesta
    const [showReplyForm, setShowReplyForm] = useState<{ [key: number]: boolean }>({});
    const [replyTexts, setReplyTexts] = useState<{ [key: number]: string }>({});

    // Referencias para animaciones
    const likeCommentRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});
    const dislikeCommentRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});
    const likeReplyRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});
    const dislikeReplyRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});

    // Handlers para comentarios
    const handleLikeComment = useCallback((commentId: number, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const buttonElement = event.currentTarget;
        likeCommentRefs.current[commentId] = buttonElement;

        setLikedComments(prev => {
            const newSet = new Set(prev);
            if (newSet.has(commentId)) {
                newSet.delete(commentId);
                setShowFilledLikeComment(prevState => ({ ...prevState, [commentId]: false }));
            } else {
                newSet.add(commentId);
                setShowFilledLikeComment(prevState => ({ ...prevState, [commentId]: true }));

                // Remover dislike si existe
                setDislikedComments(prevDisliked => {
                    const newDislikedSet = new Set(prevDisliked);
                    newDislikedSet.delete(commentId);
                    return newDislikedSet;
                });
                setShowFilledDislikeComment(prevState => ({ ...prevState, [commentId]: false }));

                // Animar el botón
                animateButton(buttonElement, 'like' as AnimationType);
            }
            return newSet;
        });
    }, []);

    const handleDislikeComment = useCallback((commentId: number, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const buttonElement = event.currentTarget;
        dislikeCommentRefs.current[commentId] = buttonElement;

        setDislikedComments(prev => {
            const newSet = new Set(prev);
            if (newSet.has(commentId)) {
                newSet.delete(commentId);
                setShowFilledDislikeComment(prevState => ({ ...prevState, [commentId]: false }));
            } else {
                newSet.add(commentId);
                setShowFilledDislikeComment(prevState => ({ ...prevState, [commentId]: true }));

                // Remover like si existe
                setLikedComments(prevLiked => {
                    const newLikedSet = new Set(prevLiked);
                    newLikedSet.delete(commentId);
                    return newLikedSet;
                });
                setShowFilledLikeComment(prevState => ({ ...prevState, [commentId]: false }));

                // Animar el botón
                animateButton(buttonElement, 'dislike' as AnimationType);
            }
            return newSet;
        });
    }, []);

    // Handlers para respuestas
    const handleLikeReply = useCallback((replyId: number, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const buttonElement = event.currentTarget;
        likeReplyRefs.current[replyId] = buttonElement;

        setLikedReplies(prev => {
            const newSet = new Set(prev);
            if (newSet.has(replyId)) {
                newSet.delete(replyId);
                setShowFilledLikeReply(prevState => ({ ...prevState, [replyId]: false }));
            } else {
                newSet.add(replyId);
                setShowFilledLikeReply(prevState => ({ ...prevState, [replyId]: true }));

                // Remover dislike si existe
                setDislikedReplies(prevDisliked => {
                    const newDislikedSet = new Set(prevDisliked);
                    newDislikedSet.delete(replyId);
                    return newDislikedSet;
                });
                setShowFilledDislikeReply(prevState => ({ ...prevState, [replyId]: false }));

                // Animar el botón
                animateButton(buttonElement, 'like' as AnimationType);
            }
            return newSet;
        });
    }, []);

    const handleDislikeReply = useCallback((replyId: number, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const buttonElement = event.currentTarget;
        dislikeReplyRefs.current[replyId] = buttonElement;

        setDislikedReplies(prev => {
            const newSet = new Set(prev);
            if (newSet.has(replyId)) {
                newSet.delete(replyId);
                setShowFilledDislikeReply(prevState => ({ ...prevState, [replyId]: false }));
            } else {
                newSet.add(replyId);
                setShowFilledDislikeReply(prevState => ({ ...prevState, [replyId]: true }));

                // Remover like si existe
                setLikedReplies(prevLiked => {
                    const newLikedSet = new Set(prevLiked);
                    newLikedSet.delete(replyId);
                    return newLikedSet;
                });
                setShowFilledLikeReply(prevState => ({ ...prevState, [replyId]: false }));

                // Animar el botón
                animateButton(buttonElement, 'dislike' as AnimationType);
            }
            return newSet;
        });
    }, []);

    // Handlers para formularios de respuesta
    const handleToggleReplyForm = useCallback((commentId: number) => {
        setShowReplyForm(prev => ({
            ...prev,
            [commentId]: !prev[commentId]
        }));
    }, []);

    const handleReplyTextChange = useCallback((commentId: number, text: string) => {
        setReplyTexts(prev => ({
            ...prev,
            [commentId]: text
        }));
    }, []);

    const handleSubmitReply = useCallback((commentId: number) => {
        const replyText = replyTexts[commentId];
        if (!replyText?.trim()) return;

        // Aquí implementarías la lógica para enviar la respuesta
        console.log(`Enviando respuesta al comentario ${commentId}:`, replyText);

        // Limpiar el formulario
        setReplyTexts(prev => ({ ...prev, [commentId]: '' }));
        setShowReplyForm(prev => ({ ...prev, [commentId]: false }));
    }, [replyTexts]);

    return {
        // Estados para comentarios
        likedComments,
        dislikedComments,
        showFilledLikeComment,
        showFilledDislikeComment,

        // Estados para respuestas
        likedReplies,
        dislikedReplies,
        showFilledLikeReply,
        showFilledDislikeReply,

        // Estados para formularios
        showReplyForm,
        replyTexts,

        // Handlers para comentarios
        handleLikeComment,
        handleDislikeComment,

        // Handlers para respuestas
        handleLikeReply,
        handleDislikeReply,

        // Handlers para formularios
        handleToggleReplyForm,
        handleReplyTextChange,
        handleSubmitReply
    };
}