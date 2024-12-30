import React, { useState } from 'react';
import { Image, Smile, Calendar, MapPin } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function TweetBox() {
    const [tweet, setTweet] = useState('');
    const { token } = useAuth(); // obtém o token JWT do Zustand (ou outro state management)

    // Função para enviar o tweet para o backend
    const handleTweet = async () => {
        // Se o campo está vazio ou não temos token, não faz nada
        if (!tweet.trim() || !token) return;

        try {
            const response = await fetch('http://127.0.0.1:8000/api/tweets/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Inclui o token JWT no header
                    'Authorization': `Bearer ${token}`,
                },
                // Ajuste o body de acordo com o que o back-end espera.
                // No seu modelo, a prop "author" é necessária.
                body: JSON.stringify({
                    author: 'MeuUsername',  // ou pegue do seu state de usuário
                    content: tweet
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao criar tweet');
            }

            // Para tratar a resposta (por exemplo, atualizar a lista de tweets localmente)
            // const newTweet = await response.json();

            // Limpa o textarea
            setTweet('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="border-b border-gray-800 p-4">
            <div className="flex space-x-4">
                <img
                    src="https://avatars.githubusercontent.com/u/380624?s=200&v=4"
                    alt="Profile"
                    className="h-12 w-12 rounded-full"
                />
                <div className="flex-1">
                    <textarea
                        value={tweet}
                        onChange={(e) => setTweet(e.target.value)}
                        placeholder="What's happening?"
                        className="w-full bg-transparent text-white text-xl placeholder-gray-500 border-none focus:ring-0 resize-none"
                        rows={3}
                    />
                    <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                        <div className="flex space-x-4">
                            <button className="text-blue-400 hover:text-blue-500">
                                <Image className="h-5 w-5" />
                            </button>
                            <button className="text-blue-400 hover:text-blue-500">
                                <Smile className="h-5 w-5" />
                            </button>
                            <button className="text-blue-400 hover:text-blue-500">
                                <Calendar className="h-5 w-5" />
                            </button>
                            <button className="text-blue-400 hover:text-blue-500">
                                <MapPin className="h-5 w-5" />
                            </button>
                        </div>
                        <button
                            onClick={handleTweet}
                            className="bg-blue-500 text-white px-4 py-2 rounded-full font-bold hover:bg-blue-600 disabled:opacity-50"
                            disabled={!tweet.trim() || !token}
                        >
                            Tweet
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
