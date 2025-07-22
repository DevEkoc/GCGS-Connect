import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
          Mot de passe oublié ?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Pas de problème. Entrez votre email et nous vous enverrons un lien.
        </p>
      </div>

      {isSubmitted ? (
        <div className="text-center">
          <p className="text-green-600 dark:text-green-400 font-medium">
            Si un compte avec cet email existe, un lien de réinitialisation a été envoyé.
          </p>
           <div className="mt-6">
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Retour à la connexion
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            id="email"
            label="Adresse Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exemple@email.com"
            required
          />

          <Button type="submit" isLoading={isLoading}>
            {isLoading ? 'Envoi...' : "Envoyer le lien"}
          </Button>
        </form>
      )}

       {!isSubmitted && (
         <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Vous vous souvenez de votre mot de passe ?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Connectez-vous
            </Link>
        </p>
       )}
    </Card>
  );
};

export default ForgotPasswordPage; 