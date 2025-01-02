import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

interface Tweet {
    id: string;
    author: string;
    handle?: string;   // se quiser
    content: string;
    timestamp: string;
    likes: number;
    retweets: number;
    replies: number;
}

export function useTweets() {
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const { token } = useAuth(); // para pegar o token do Zustand

    useEffect(() => {
        async function fetchTweets() {
            if (!token) {
                // Se não tiver token, não busca ou busca público (se a API permitir)
                return;
            }
            try {
                const resp = await fetch('http://127.0.0.1:8000/api/tweets/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!resp.ok) throw new Error('Erro ao buscar tweets');
                const data = await resp.json();
                setTweets(data); // Atualiza os tweets no estado
            } catch (error) {
                console.error(error);
            }
        }
        fetchTweets();
    }, [token]);

    return { tweets, setTweets }; // Retorna o estado dos tweets e a função de atualização
}
