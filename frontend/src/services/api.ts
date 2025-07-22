import axios from 'axios';
import authService from './auth.service';

const API_BASE_URL = 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT à chaque requête
apiClient.interceptors.request.use(
  (config) => {
    const user = authService.getCurrentUser();
    if (user?.access) {
      config.headers['Authorization'] = `Bearer ${user.access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optionnel : Intercepteur pour gérer l'expiration du token (refresh)
// Pour un MVP, ce n'est peut-être pas nécessaire, mais c'est une bonne pratique.
// apiClient.interceptors.response.use(...)

export default apiClient; 