import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/auth.service';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
    nom: '',
    prenom: '',
    telephone: '',
    role: 'USER',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { // Accepter les Select
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (formData.password !== formData.password2) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    
    setIsLoading(true);
    try {
      await authService.register(formData);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      const errorData = err.response?.data;
      const messages = errorData ? Object.values(errorData).flat().join(' ') : "Une erreur s'est produite.";
      setError(messages);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Créez votre compte
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Rejoignez-nous en quelques secondes.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-500 text-center text-sm font-medium">{error}</p>}
        {success && <p className="text-green-500 text-center text-sm font-medium">Inscription réussie ! Redirection...</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input name="prenom" placeholder="Prénom" onChange={handleChange} required />
          <Input name="nom" placeholder="Nom" onChange={handleChange} required />
        </div>
        <Input type="email" name="email" placeholder="Adresse Email" onChange={handleChange} required />
        <Input type="tel" name="telephone" placeholder="Téléphone" onChange={handleChange} required />
        <Input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} required />
        <Input type="password" name="password2" placeholder="Confirmer le mot de passe" onChange={handleChange} required />
        
        <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Rôle
            </label>
            <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 dark:text-white"
            >
                <option value="USER">Utilisateur</option>
                <option value="TELEMARKETEUR">Télémarketeur</option>
                {/* Les autres rôles pourraient être assignés par un admin */}
            </select>
        </div>

        <Button type="submit" isLoading={isLoading} disabled={success}>
          {isLoading ? 'Création...' : "Créer le compte"}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
        Déjà un membre ?{' '}
        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
          Connectez-vous
        </Link>
      </p>
    </Card>
  );
};

export default RegisterPage; 