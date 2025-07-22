import React from 'react';
import { useQuery } from '@tanstack/react-query';
import studentService from '../services/student.service';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { PlusIcon } from '@heroicons/react/24/outline';

const StudentsPage: React.FC = () => {
  const { data: students, isLoading, isError, error } = useQuery({
    queryKey: ['students'],
    queryFn: studentService.getAll,
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Gestion des Étudiants
        </h1>
        <Button onClick={() => console.log('Ouvrir modale ajout')}>
          <PlusIcon className="h-5 w-5 mr-2" />
          Ajouter un étudiant
        </Button>
      </div>

      <Card>
        {isLoading && <div className="text-center p-4">Chargement des étudiants...</div>}
        {isError && <div className="text-center p-4 text-red-500">Erreur: {error.message}</div>}
        
        {!isLoading && !isError && (
          <>
            {/* Vue Tableau pour les grands écrans */}
            <div className="hidden md:block">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Classe</th>
                    <th scope="col">École</th>
                    <th scope="col">Responsable</th>
                    <th scope="col"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {students?.map((student) => (
                    <tr key={student.id}>
                      <td className="px-6 py-4">{student.prenom} {student.nom}</td>
                      <td className="px-6 py-4">{student.level_details?.nom}</td>
                      <td className="px-6 py-4">{student.school_details?.nom}</td>
                      <td className="px-6 py-4">{student.responsable_details?.prenom} {student.responsable_details?.nom}</td>
                      <td className="px-6 py-4 text-right">
                        <a href="#" className="text-indigo-600">Modifier</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Vue Cartes pour les petits écrans */}
            <div className="md:hidden space-y-4">
              {students?.map((student) => (
                  <div key={student.id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow">
                      <div className="flex justify-between items-center">
                          <p className="font-bold text-lg text-gray-900 dark:text-white">{student.prenom} {student.nom}</p>
                          <a href="#" className="text-indigo-600 font-medium">Modifier</a>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{student.email}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{student.telephone}</p>
                  </div>
              ))}
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default StudentsPage;