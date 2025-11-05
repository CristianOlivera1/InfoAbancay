import { Routes, Route } from 'react-router-dom';
import ClientRoutes from './ClientRoutes';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/*" element={<ClientRoutes />} />
    </Routes>
  );
}