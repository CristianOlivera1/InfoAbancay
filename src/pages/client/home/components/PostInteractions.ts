import { useState } from 'react';
import { animateButton } from './postAnimations';

export interface Publication {
    idPublication: number;
    title: string;
    totalLikes: number;
    totalUnlikes: number;
    totalComments: number;
}

export const usePostInteractions = () => {
    const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
    const [dislikedPosts, setDislikedPosts] = useState<Set<number>>(new Set());
    const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set());
    const [showFilledLike, setShowFilledLike] = useState<{[key:number]:boolean}>({});
    const [showFilledDislike, setShowFilledDislike] = useState<{[key:number]:boolean}>({});

    const handleLike = (pubId: number, event: React.MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget;
        animateButton(button, 'like');

        setTimeout(() => {
            setShowFilledLike(prev => ({ ...prev, [pubId]: true }));
        }, 350);

        setLikedPosts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(pubId)) {
                newSet.delete(pubId);
                setShowFilledLike(prev => ({ ...prev, [pubId]: false }));
            } else {
                newSet.add(pubId);
                setDislikedPosts(prevDisliked => {
                    const newDislikedSet = new Set(prevDisliked);
                    newDislikedSet.delete(pubId);
                    return newDislikedSet;
                });
            }
            return newSet;
        });
    };

    const handleDislike = (pubId: number, event: React.MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget;
        animateButton(button, 'dislike');

        setTimeout(() => {
            setShowFilledDislike(prev => ({ ...prev, [pubId]: true }));
        }, 600);

        setDislikedPosts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(pubId)) {
                newSet.delete(pubId);
                setShowFilledDislike(prev => ({ ...prev, [pubId]: false }));
            } else {
                newSet.add(pubId);
                setLikedPosts(prevLiked => {
                    const newLikedSet = new Set(prevLiked);
                    newLikedSet.delete(pubId);
                    return newLikedSet;
                });
            }
            return newSet;
        });
    };

    const handleComment = (event: React.MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget;
        animateButton(button, 'comment');
    };

    const handleBookmark = (pubId: number, event: React.MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget;
        animateButton(button, 'bookmark');

        setSavedPosts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(pubId)) {
                newSet.delete(pubId);
            } else {
                newSet.add(pubId);
            }
            return newSet;
        });
    };

    const handleShare = (pub: Publication, event: React.MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget;
        animateButton(button, 'share');
        navigator.share?.({ title: pub.title, url: window.location.href });
    };

    return {
        likedPosts,
        dislikedPosts,
        savedPosts,
        showFilledLike,
        showFilledDislike,
        handleLike,
        handleDislike,
        handleComment,
        handleBookmark,
        handleShare
    };
};