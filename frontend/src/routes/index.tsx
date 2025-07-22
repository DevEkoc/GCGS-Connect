import { createBrowserRouter } from 'react-router-dom';

// Layouts
import AuthLayout from '../components/layouts/AuthLayout';
import DashboardLayout from '../components/layouts/DashboardLayout';

// Pages
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import DashboardPage from '../pages/DashboardPage';
import ProfilePage from '../pages/ProfilePage';
import StudentsPage from '../pages/StudentsPage'; // Importer la nouvelle page

// Routes
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  // Routes publiques
  {
    path: '/',
    element: <HomePage />,
  },
  
  // Routes d'authentification
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
      { path: '/reset-password', element: <ResetPasswordPage /> },
    ]
  },

  // Routes privées (Dashboard)
  {
    path: '/dashboard',
    element: <PrivateRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
            { index: true, element: <DashboardPage /> },
            { path: 'profile', element: <ProfilePage /> },
            { path: 'students', element: <StudentsPage /> },
            // ... autres routes du dashboard
        ]
      }
    ],
  },
]);

export default router; 