import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import auth, { db } from '../Firebase';
import { fileToBase64 } from '../FirebaseUtil';
import { ITweet } from '../components/Timeline';
import Tweet from '../components/Tweet';
import { updateProfile } from 'firebase/auth';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;
const AvatarUpload = styled.label`
  width: 80px;
  overflow: hidden;
  height: 80px;
  border-radius: 50%;
  background-color: #1d9bf0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  svg {
    width: 50px;
  }
`;
const AvatarImg = styled.img`
  width: 100%;
`;
const AvatarInput = styled.input`
  display: none;
`;
const Name = styled.span`
  font-size: 22px;
`;

const EditButton = styled.button`
  background-color: royalblue;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background-color: red;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const Tweets = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const EditNameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const NameInput = styled.input``;

export default function Profile() {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [isEditingName, setEditingName] = useState(false);
  const [name, setName] = useState(
    user?.displayName ? user.displayName : 'Anonymous',
  );

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!user) {
      return;
    }

    if (files && files.length === 1) {
      const file = files[0];
      const imgString = await fileToBase64(file);
      setAvatar(imgString);
      // img를 firebase에 올린 후에 updateProfile하면 user photo 수정 가능.
      // await updateProfile(user, {
      //   photoURL: imgURL,
      // });
    }
  };

  const fetchTweets = async () => {
    const tweetQuery = query(
      collection(db, 'tweets'),
      where('userId', '==', user?.uid),
      orderBy('createdAt', 'desc'),
      limit(25),
    );
    const snapshot = await getDocs(tweetQuery);
    const tweets = snapshot.docs.map((doc) => {
      const { tweet, createdAt, userId, username, photo } = doc.data();
      const tweetData: ITweet = {
        tweet,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
      };

      return tweetData;
    });
    setTweets(tweets);
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  const onEditName = () => {
    setEditingName(true);
  };

  const onCancel = () => {
    setEditingName(false);
  };

  const onSave = async () => {
    setEditingName(false);

    if (!user || !name) {
      return;
    }

    await updateProfile(user, {
      displayName: name,
    });
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <Wrapper>
      <AvatarUpload htmlFor='avatar'>
        {typeof avatar === 'string' ? (
          <AvatarImg src={avatar} />
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='size-6'
          >
            <path
              fillRule='evenodd'
              d='M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z'
              clipRule='evenodd'
            />
          </svg>
        )}
      </AvatarUpload>
      <AvatarInput
        onChange={onAvatarChange}
        id='avatar'
        type='file'
        accept='image/*'
      ></AvatarInput>
      {!isEditingName ? (
        <>
          <Name>{name}</Name>
          <EditButton onClick={onEditName}>edit name</EditButton>
        </>
      ) : (
        <>
          <NameInput placeholder={name} onChange={onNameChange}></NameInput>
          <EditNameWrapper>
            <EditButton onClick={onSave}>save</EditButton>
            <CancelButton onClick={onCancel}>cancel</CancelButton>
          </EditNameWrapper>
        </>
      )}

      <Tweets>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </Tweets>
    </Wrapper>
  );
}
