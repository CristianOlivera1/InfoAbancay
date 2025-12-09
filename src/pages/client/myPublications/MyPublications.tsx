import { Icon } from "@iconify/react";
import publications from "../home/publicationsWithImage.json";
import PostCard from "../../../shared/client/components/post/PostCard";
import { Link } from "react-router-dom";

export default function MyPublications() {
  // Mock user
  const currentUserName = "MunicipalidadProv Abancay MunicipalidadProv Abancay";

  const myPublications = publications.filter(
    (pub) => pub.userName === currentUserName
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 xl:px-32 mt-30 mb-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mis Publicaciones</h1>
          <p className="text-gray-600">
            Ver, administrar y analizar tus publicaciones anteriores
          </p>
        </div>
        <Link
          to="/crear-publicacion"
          className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <Icon icon="mdi:plus" className="mr-2" />
          Crear nuevo
        </Link>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <select className="border rounded-lg px-3 py-2 text-gray-700">
          <option>Todos los estados</option>
          <option>Publicado</option>
          <option>En revisión</option>
          <option>Rechazado</option>
        </select>

        <select className="border rounded-lg px-3 py-2 text-gray-700">
          <option>Todas las categorías</option>
          <option>Noticias</option>
          <option>Eventos</option>
          <option>Anuncios</option>
        </select>
      </div>

      {myPublications.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {myPublications.map((pub) => (
            <PostCard key={pub.idPublication} publication={pub as any} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-200 border-dashed">
          <p className="text-gray-500 text-lg">No tienes publicaciones aún.</p>
        </div>
      )}
    </div>
  );
}