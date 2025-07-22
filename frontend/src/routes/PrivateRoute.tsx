import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  // Si l'utilisateur est authentifié, on rend le contenu de la route (via Outlet)
  // Sinon, on le redirige vers la page de connexion
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute; 