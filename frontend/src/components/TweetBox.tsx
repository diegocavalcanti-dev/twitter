import React, { useState } from 'react';
import { Image, Smile, Calendar, MapPin } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTweets } from '../hooks/useTweets';  // Importando o hook useTweets

export function TweetBox() {
    const [tweet, setTweet] = useState('');
    const { token } = useAuth();  // Obtém o token JWT do Zustand (ou outro state management)
    const { tweets, setTweets } = useTweets();  // Desestruturando o estado de tweets e a função setTweets

    // Função para enviar o tweet para o backend
    const handleTweet = async () => {
        if (!tweet.trim() || !token) return;

        try {
            const response = await fetch('http://127.0.0.1:8000/api/tweets/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,  // Inclui o token JWT no header
                },
                body: JSON.stringify({
                    author: 'MeuUsername',  // Substitua por informações do usuário, se necessário
                    content: tweet
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao criar tweet');
            }

            // Para tratar a resposta e atualizar a lista de tweets localmente
            const newTweet = await response.json();

            // Atualizando a lista de tweets com o novo tweet
            setTweets([newTweet, ...tweets]);

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
                    src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg"
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
