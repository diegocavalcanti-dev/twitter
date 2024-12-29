import { useState, useEffect } from 'react';

interface Tweet {
    id: string;
    author: string;
    handle: string;
    content: string;
    timestamp: string;
    likes: number;
    retweets: number;
    replies: number;
}

export function useTweets() {
    const [tweets, setTweets] = useState<Tweet[]>([
        {
            id: '1',
            author: 'John Doe',
            handle: 'johndoe',
            content: 'Just setting up my Twitter clone! 🚀',
            timestamp: '2h',
            likes: 42,
            retweets: 5,
            replies: 3,
        },
        {
            id: '2',
            author: 'Jane Smith',
            handle: 'janesmith',
            content: 'This Twitter clone looks amazing! Love the dark theme. 🌙',
            timestamp: '4h',
            likes: 128,
            retweets: 12,
            replies: 8,
        },
    ]);

    // TODO: Implement API integration
    useEffect(() => {
        // Fetch tweets from API
    }, []);

    return { tweets };
}