import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    setError(null);
    setIsLoading(true);
    // Simuler un appel API
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <Card>
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Réinitialiser le mot de passe
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Choisissez un nouveau mot de passe sécurisé.
        </p>
      </div>

      {isSubmitted ? (
        <div className="text-center">
          <p className="text-green-600 dark:text-green-400 font-medium">
            Votre mot de passe a été réinitialisé avec succès !
          </p>
          <div className="mt-6">
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Se connecter avec le nouveau mot de passe
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-center text-sm font-medium">{error}</p>}
          <Input
            id="password"
            label="Nouveau mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <Input
            id="passwordConfirm"
            label="Confirmer le mot de passe"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="••••••••"
            required
          />

          <Button type="submit" isLoading={isLoading}>
            {isLoading ? 'Réinitialisation...' : 'Réinitialiser'}
          </Button>
        </form>
      )}
    </Card>
  );
};

export default ResetPasswordPage; 