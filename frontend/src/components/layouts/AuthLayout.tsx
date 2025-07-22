import { Outlet } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

const AuthLayout = () => {
  const { theme } = useTheme();
  return (
    <div className={`${theme}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md">
          {/* Vous pouvez ajouter un logo ici */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout; 