import { collection, getDocs, orderBy, query } from "firebase/firestore";
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

const Wrapper = styled.div``;

export default function Timeline() {
    const [tweets, setTweets] = useState<ITweet[]>([]);
    const fetchTweets = async () => {
        const tweetsQuery = query(
            collection(db, 'tweets'),
            orderBy('createAt', 'desc')
        );

        const snapshot = await getDocs(tweetsQuery);
        const tweets = snapshot.docs.map((doc) => {
            const { tweet, createdAt, userId, username, photo } = doc.data();
            const tweetData: ITweet = { tweet, createdAt, userId, username, photo, id: doc.id };

            return tweetData;
        });

        setTweets(tweets);
    };

    useEffect(() => {
        fetchTweets();
    }, []);

    return <Wrapper>
        {tweets.map((tweet) => (
            <Tweet key={tweet.id} {...tweet} />
        ))}
    </Wrapper>;
}