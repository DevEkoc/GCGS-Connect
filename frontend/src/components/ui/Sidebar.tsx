import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, UserCircleIcon, CalendarIcon, UsersIcon, UserGroupIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

const navigation = [
  { name: 'Tableau de bord', href: '/dashboard', icon: HomeIcon },
  { name: 'Rendez-vous', href: '/dashboard/appointments', icon: CalendarIcon },
  { name: 'Étudiants', href: '/dashboard/students', icon: UsersIcon },
  { name: 'Parents', href: '/dashboard/parents', icon: UserGroupIcon },
  { name: 'Mon Profil', href: '/dashboard/profile', icon: UserCircleIcon },
];

const Sidebar: React.FC = () => {
    const { logout } = useAuth();
  return (
    <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <span className="text-2xl font-bold text-indigo-600">GCGS</span>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto bg-white dark:bg-gray-900">
                <nav className="flex-1 px-2 py-4 space-y-1">
                    {navigation.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        end={item.href === '/dashboard'}
                        className={({ isActive }) =>
                        `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                            isActive
                            ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                        }`
                        }
                    >
                        <item.icon className="mr-3 flex-shrink-0 h-6 w-6" />
                        {item.name}
                    </NavLink>
                    ))}
                </nav>
                 <div className="mt-auto p-2">
                    <button
                        onClick={logout}
                        className="group w-full flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <ArrowLeftOnRectangleIcon className="mr-3 h-6 w-6"/>
                        Se déconnecter
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
};

export default Sidebar;