import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, SunIcon, MoonIcon } from '@heroicons/react/20/solid';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-sm">
      <div className="relative flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div>{/* Espace réservé à gauche */}</div>
        
        <div className="flex items-center space-x-4">
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
            </button>
            
            {/* Profile dropdown */}
            <Menu as="div" className="relative">
          <div>
            <Menu.Button className="flex max-w-xs items-center rounded-full bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <span className="sr-only">Open user menu</span>
              {/* Placeholder pour l'avatar */}
              <span className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300 font-bold">
                {user?.prenom.charAt(0)}{user?.nom.charAt(0)}
              </span>
               <span className="hidden sm:block ml-3 text-gray-700 dark:text-gray-300">
                <span className="font-semibold">{user?.prenom} {user?.nom}</span>
              </span>
              <ChevronDownIcon className="ml-1 h-5 w-5 text-gray-400" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/dashboard/profile"
                    className={classNames(active ? 'bg-gray-100 dark:bg-gray-700' : '', 'block px-4 py-2 text-sm text-gray-700 dark:text-gray-200')}
                  >
                    Mon Profil
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logout}
                    className={classNames(active ? 'bg-gray-100 dark:bg-gray-700' : '', 'block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200')}
                  >
                    Se déconnecter
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header; 