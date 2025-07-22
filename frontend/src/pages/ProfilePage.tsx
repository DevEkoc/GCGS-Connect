import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    prenom: user?.prenom || '',
    nom: user?.nom || '',
    email: user?.email || '',
    telephone: user?.telephone || '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simuler un appel API pour la mise à jour
    console.log('Mise à jour du profil:', formData);
    setTimeout(() => {
      setIsLoading(false);
      // Gérer la réponse (succès/erreur)
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mon Profil</h1>
      
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Prénom" name="prenom" value={formData.prenom} onChange={handleChange} />
            <Input label="Nom" name="nom" value={formData.nom} onChange={handleChange} />
          </div>
          <Input label="Adresse Email" type="email" name="email" value={formData.email} onChange={handleChange} disabled />
          <Input label="Téléphone" type="tel" name="telephone" value={formData.telephone} onChange={handleChange} />
          
          <div className="pt-2">
            <Button type="submit" isLoading={isLoading}>
              {isLoading ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
            </Button>
          </div>
        </form>
      </Card>
      
      <Card>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Changer de mot de passe</h3>
        <form className="space-y-6">
            <Input label="Mot de passe actuel" type="password" name="current_password" />
            <Input label="Nouveau mot de passe" type="password" name="new_password" />
            <Input label="Confirmer le nouveau mot de passe" type="password" name="new_password_confirm" />
            <div className="pt-2">
                <Button type="submit" variant="secondary">Changer le mot de passe</Button>
            </div>
        </form>
      </Card>
    </div>
  );
};

export default ProfilePage; 