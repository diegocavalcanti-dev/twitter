import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/ui/Logo';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    // 1. Estado de carregamento
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 2. Seta isLoading para true antes de chamar o login
        setIsLoading(true);

        try {
            // 3. Faz a chamada de login
            await login(email, password);
        } catch (error) {
            // trata o erro se necessário
            console.error(error);
        } finally {
            // 4. Independente do resultado, encerra o loading
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-full max-w-md space-y-8 p-6">
                <Logo />
                <h2 className="text-center text-3xl font-bold text-white">
                    Entrar no Twitter
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />

                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Senha"
                        required
                    />

                    <Button type="submit" fullWidth disabled={isLoading}>
                        {/* Se estiver carregando, exibe "Carregando...", senão "Sign in" */}
                        {isLoading ? 'Acessando...' : 'Entrar'}
                    </Button>
                </form>

                <p className="text-center text-gray-500">
                    Não tem uma conta?{' '}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Crie sua conta
                    </Link>
                </p>
            </div>
        </div>
    );
}
