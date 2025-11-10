import { Routes, Route } from 'react-router-dom';
import Home from '../pages/client/home/Home';
import PublicationDetails from '../pages/client/publicationDetails/PublicationDetails';
import Header from '../shared/client/header/Header';
import Footer from '../shared/client/footer/Footer';
import Login from '../pages/client/login/Login';
import Register from '../pages/client/register/Register';

export default function ClientRoutes() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/publication/:idPublication" element={<PublicationDetails />} />
          <Route path="/iniciarsesion" element={<Login />} />
          <Route path="/registrarse" element={<Register />} />
          <Route path="/Publicationdetails" element={<PublicationDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}