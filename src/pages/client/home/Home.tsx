import { Link } from 'react-router-dom';

import publicationsData from './publications.json';
import Slides from './components/Slides';
import Categories from './components/Categories';

export default function Home() {

  const publications = publicationsData;
  return (
    <div className="container mx-auto px-4 sm:px-6 xl:px-32 mt-8">
      <Slides />
      <Categories />

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publications.map((publication) => (
            <div key={publication.idPublication} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img
                src={publication.image}
                alt={publication.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{publication.title}</h3>
                <p className="text-gray-600 mb-4">{publication.description}</p>
                <Link
                  to={`/publication/${publication.idPublication}`}
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Leer más
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}