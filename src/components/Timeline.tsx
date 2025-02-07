import { collection, limit, onSnapshot, orderBy, query, Unsubscribe } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { db } from "../Firebase";
import Tweet from "./Tweet";

export interface ITweet {
    id: string;
    photo: string;
    tweet: string;
    userId: string;
    username: string;
    createdAt: number;
}

const Wrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    `;

export default function Timeline() {
    const [tweets, setTweets] = useState<ITweet[]>([]);

    useEffect(() => {
        let unsubscribe: Unsubscribe | null;
        const fetchTweets = async () => {
            const tweetsQuery = query(
                collection(db, 'tweets'),
                orderBy('createAt', 'desc'),
                limit(25)
            );

            unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
                console.log(`onSnapshot: `, snapshot);
                const tweets = snapshot.docs.map((doc) => {
                    const { tweet, createdAt, userId, username, photo } = doc.data();
                    const tweetData: ITweet = { tweet, createdAt, userId, username, photo, id: doc.id };

                    return tweetData;
                });
                setTweets(tweets);
            });

            // setTweets(tweets);
        };
        fetchTweets();

        return () => {
            console.log('clean up');
            unsubscribe && unsubscribe();
        };
    }, []);

    return <Wrapper>
        {tweets.map((tweet) => (
            <Tweet key={tweet.id} {...tweet} />
        ))}
    </Wrapper>;
}