import { Routes, Route } from 'react-router-dom';
import Home from '../pages/client/home/Home';
import PublicationDetails from '../pages/client/publicationDetails/PublicationDetails';
import Header from '../shared/client/Header';
import Footer from '../shared/client/Footer';

export default function ClientRoutes() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/publication/:id" element={<PublicationDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}