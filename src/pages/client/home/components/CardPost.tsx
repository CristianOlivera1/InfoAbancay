import publications from '../publicationsWithImage.json';
import PostCard from '../../../../shared/client/components/post/PostCard';

export default function CardPost() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {publications.map((pub) => (
                <PostCard key={pub.idPublication} publication={pub as any} />
            ))}
        </div>
    );
}