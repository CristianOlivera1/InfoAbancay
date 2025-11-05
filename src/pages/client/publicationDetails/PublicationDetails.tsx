import { useParams, Link } from 'react-router-dom';

export default function PublicationDetails() {
    const { id } = useParams<{ id: string }>();
    
    // Simulando datos de publicaciones
    const publications = [
        { 
            id: 1, 
            title: "Noticia 1", 
            description: "Descripción de la primera noticia",
            content: "Este es el contenido completo de la primera noticia. Aquí encontrarás toda la información detallada sobre este importante acontecimiento en Abancay.",
            date: "2024-11-04",
            author: "Redacción InfoAbancay"
        },
        { 
            id: 2, 
            title: "Noticia 2", 
            description: "Descripción de la segunda noticia",
            content: "Este es el contenido completo de la segunda noticia. Información relevante para la comunidad de Abancay.",
            date: "2024-11-03",
            author: "Redacción InfoAbancay"
        },
        { 
            id: 3, 
            title: "Noticia 3", 
            description: "Descripción de la tercera noticia",
            content: "Este es el contenido completo de la tercera noticia. Mantente informado con las últimas noticias de nuestra ciudad.",
            date: "2024-11-02",
            author: "Redacción InfoAbancay"
        },
    ];

    const publication = publications.find(pub => pub.id === parseInt(id || '0'));

    if (!publication) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Publicación no encontrada</h1>
                <p className="text-lg text-gray-700 mb-4">Lo sentimos, no pudimos encontrar la publicación que buscas.</p>
                <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                    Volver al inicio
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/" className="text-blue-500 hover:text-blue-700 mb-4 inline-block">
                ← Volver al inicio
            </Link>
            
            <article className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold mb-4">{publication.title}</h1>
                    <div className="text-gray-600 mb-4">
                        <p>Por {publication.author} | {publication.date}</p>
                    </div>
                    <p className="text-xl text-gray-700 mb-6">{publication.description}</p>
                </header>
                
                <div className="prose max-w-none">
                    <p className="text-lg leading-relaxed">{publication.content}</p>
                </div>
                
                <footer className="mt-8 pt-8 border-t border-gray-200">
                    <div className="flex space-x-4">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                            Compartir
                        </button>
                        <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors">
                            Imprimir
                        </button>
                    </div>
                </footer>
            </article>
        </div>
    );
}