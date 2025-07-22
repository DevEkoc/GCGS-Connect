import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/ui/Card';
import { BellIcon, CalendarIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { name: 'Rendez-vous prévus', stat: '12', icon: CalendarIcon },
    { name: 'Nouveaux clients', stat: '3', icon: UserGroupIcon },
    { name: 'Notifications', stat: '5', icon: BellIcon },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Bienvenue, {user?.prenom} !
        </h1>
        <p className="mt-1 text-lg text-gray-600 dark:text-gray-400">
          Voici un aperçu de votre journée.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <Card key={item.name} className="flex items-start space-x-4">
            <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-lg bg-indigo-500 text-white">
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{item.name}</p>
              <p className="text-3xl font-semibold text-gray-900 dark:text-white">{item.stat}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Placeholder pour d'autres sections comme les rendez-vous à venir */}
      <Card>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Prochains Rendez-vous</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          La liste des rendez-vous à venir apparaîtra ici.
        </p>
      </Card>
    </div>
  );
};

export default DashboardPage; 