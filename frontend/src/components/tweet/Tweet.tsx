import React from 'react';
import { Heart, MessageCircle, Repeat2, Share } from 'lucide-react';

interface TweetProps {
    id: string;
    author: string;
    handle: string;
    content: string;
    timestamp: string;
    likes: number;
    retweets: number;
    replies: number;
}

export function Tweet({ author, handle, content, timestamp, likes, retweets, replies }: TweetProps) {
    return (
        <div className="border-b border-gray-800 p-4 hover:bg-gray-900/50">
            <div className="flex space-x-4">
                <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt={author}
                    className="h-12 w-12 rounded-full"
                />
                <div className="flex-1">
                    <div className="flex items-center space-x-2">
                        <span className="font-bold text-white">{author}</span>
                        <span className="text-gray-500">@{handle}</span>
                        <span className="text-gray-500">·</span>
                        <span className="text-gray-500">{timestamp}</span>
                    </div>
                    <p className="text-white mt-2">{content}</p>
                    <div className="flex justify-between mt-4 text-gray-500 max-w-md">
                        <button className="flex items-center space-x-2 hover:text-blue-500">
                            <MessageCircle className="h-5 w-5" />
                            <span>{replies}</span>
                        </button>
                        <button className="flex items-center space-x-2 hover:text-green-500">
                            <Repeat2 className="h-5 w-5" />
                            <span>{retweets}</span>
                        </button>
                        <button className="flex items-center space-x-2 hover:text-red-500">
                            <Heart className="h-5 w-5" />
                            <span>{likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 hover:text-blue-500">
                            <Share className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}