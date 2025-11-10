
import publicationsData from '../featured.json';
import { timeAgo } from '../../../../utils/timeAgo.ts';

export default function Featured() {
    const publications = publicationsData;

    return (
        <section className="mb-20">
            <h2 className='text-xl font-semibold text-gray-800 mb-4'>Destacado</h2>
            <div className="flex gap-6 overflow-x-auto pb-2">
                {publications.map((publication) => (
                    <div
                        key={publication.idPublication}
                        className="min-w-[250px] sm:min-w-[350px] bg-white border border-gray-200 rounded-xl overflow-hidden shadow-2xs hover:shadow-xs transition-shadow duration-300 group cursor-pointer">
                        <img
                            src={publication.image}
                            alt={publication.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="p-5">
                            <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors line-clamp-3">
                                {publication.title}
                            </h3>

                            <div className="flex items-center text-sm text-gray-600 gap-x-2">
                                <span className="pr-2 py-1 text-xs font-medium">
                                    {publication.userName}
                                </span>
                                <span className="text-gray-400">•</span>
                                <div className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-xs">
                                    {publication.views} vistas
                                </div>
                                <span className="ml-auto text-xs">
                                    {timeAgo(publication.createdAt)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}