import React from 'react';
import { Tweet } from './Tweet';
import { useTweets } from '../../hooks/useTweets';

export function TweetList() {
    const { tweets } = useTweets();

    return (
        <div>
            {tweets.map((tweet) => (
                <Tweet key={tweet.id} {...tweet} />
            ))}
        </div>
    );
}