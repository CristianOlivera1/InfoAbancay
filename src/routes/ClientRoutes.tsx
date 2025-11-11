import { Routes, Route } from 'react-router-dom';
import Home from '../pages/client/home/Home';
import PublicationDetails from '../pages/client/publicationDetails/PublicationDetails';
import Header from '../shared/client/header/Header';
import Footer from '../shared/client/footer/Footer';
import Login from '../pages/client/login/Login';
import Register from '../pages/client/register/Register';
import InsertPublication from '../pages/client/insertPublication/InsertPublication';

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
          <Route path="/detalles-publicacion" element={<PublicationDetails />} />
          <Route path="/insertar-publicacion" element={<InsertPublication />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}