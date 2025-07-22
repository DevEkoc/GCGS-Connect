import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError('Email ou mot de passe incorrect.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Content de vous revoir !
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Connectez-vous pour accéder à votre espace.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-500 text-center text-sm font-medium">{error}</p>}
        
        <Input
          id="email"
          label="Adresse Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="exemple@email.com"
          required
        />

        <Input
          id="password"
          label="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        <div className="text-right">
          <Link to="/forgot-password" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            Mot de passe oublié ?
          </Link>
        </div>

        <Button type="submit" isLoading={isLoading}>
          {isLoading ? 'Connexion...' : 'Se connecter'}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
        Pas encore de compte ?{' '}
        <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
          Inscrivez-vous
        </Link>
      </p>
    </Card>
  );
};

export default LoginPage; 