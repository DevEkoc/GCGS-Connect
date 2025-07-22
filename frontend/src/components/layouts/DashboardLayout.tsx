import { Outlet } from 'react-router-dom';
import Sidebar from '../ui/Sidebar'; // Supposant un composant Sidebar
import Header from '../ui/Header';   // Supposant un composant Header

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 