import { Routes, Route } from 'react-router-dom';
import Header from '../shared/client/header/Header';
import Footer from '../shared/client/footer/Footer';
import { lazy } from 'react';
import MyPublications from '../pages/client/myPublications/MyPublications';

const Home = lazy(() => import('../pages/client/home/Home'));
const PublicationDetails = lazy(() => import('../pages/client/publicationDetails/PublicationDetails'));
const Login = lazy(() => import('../pages/client/login/Login'));
const Register = lazy(() => import('../pages/client/register/Register'));
const InsertPublication = lazy(() => import('../pages/client/insertPublication/InsertPublication'));
const CategoryPosts = lazy(() => import('../pages/client/categoryDetails/CategoryPosts'));

export default function ClientRoutes() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/publicacion/:idPublication" element={<PublicationDetails />} />
          <Route path="/iniciar-sesion" element={<Login />} />
          <Route path="/registrarse" element={<Register />} />
          <Route path="/crear-publicacion" element={<InsertPublication />} />
          <Route path="/categoria/:nameCategory" element={<CategoryPosts />} />
          <Route path="/detalles-publicacion" element={<PublicationDetails />} />
          <Route path="/mis-publicaciones" element={<MyPublications />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}