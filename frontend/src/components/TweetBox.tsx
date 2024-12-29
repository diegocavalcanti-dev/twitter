import React, { useState } from 'react';
import { Image, Smile, Calendar, MapPin } from 'lucide-react';

export function TweetBox() {
    const [tweet, setTweet] = useState('');

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
                            className="bg-blue-500 text-white px-4 py-2 rounded-full font-bold hover:bg-blue-600 disabled:opacity-50"
                            disabled={!tweet.trim()}
                        >
                            Tweet
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}