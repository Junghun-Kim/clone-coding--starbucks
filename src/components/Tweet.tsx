import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { styled } from 'styled-components';
import auth, { db } from '../Firebase';
import { fileToBase64 } from '../FirebaseUtil';
import { ITweet } from './Timeline';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div``;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
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

const TweetControlButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const PhotoEditInput = styled.input`
  display: none;
`;

const PhotoEditButton = styled.label`
  background-color: royalblue;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  text-align: center;
  border-radius: 5px;
  white-space: nowrap;
  width: fit-content;
  height: fit-content;
  cursor: pointer;
`;

const PhotoWrapper = styled.div`
  display: grid;
  grid-template-rows: 4fr 1fr;
  gap: 10px;
  place-items: center;
`;

const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const [isEditing, setEditing] = useState(false);
  const [editedTweet, setEditedTweet] = useState(tweet);
  const [editedPhoto, setEditedPhoto] = useState<string | null>();
  const user = auth.currentUser;

  const onDelete = async () => {
    const ok = window.confirm('Are you sure you want to delete this tweets?');
    if (!ok || user?.uid !== userId) {
      return;
    }
    try {
      await deleteDoc(doc(db, 'tweets', id));
    } catch (e) {}
  };

  const onEditing = () => {
    setEditing(true);
  };

  const onCancel = () => {
    setEditing(false);
    setEditedTweet(tweet);
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length === 1) {
      const imgString = await fileToBase64(files[0]);
      setEditedPhoto(imgString);
    }
  };

  const onSave = async () => {
    const user = auth.currentUser;
    if (!user) {
      return;
    }

    try {
      if (editedTweet !== '' && editedTweet.length <= 180) {
        await updateDoc(doc(db, 'tweets', id), {
          tweet: editedTweet,
        });
      }

      if (editedPhoto) {
        await updateDoc(doc(db, 'tweets', id), {
          photo: editedPhoto,
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setEditing(false);
      setEditedPhoto(null);
    }
  };

  const onTextboxChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedTweet(e.target.value);
  };

  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        {!isEditing ? (
          <Payload>{tweet}</Payload>
        ) : (
          <TextArea
            rows={5}
            maxLength={180}
            onChange={onTextboxChange}
            value={editedTweet}
            placeholder='What is happening?!'
          />
        )}

        {user?.uid === userId && (
          <TweetControlButtons>
            {!isEditing ? (
              <>
                <DeleteButton onClick={onDelete}>Delete</DeleteButton>
                <EditButton onClick={onEditing}>Edit</EditButton>
              </>
            ) : (
              <>
                <EditButton onClick={onSave}>Save</EditButton>
                <CancelButton onClick={onCancel}>Cancel</CancelButton>
              </>
            )}
          </TweetControlButtons>
        )}
      </Column>
      <Column>
        {!isEditing ? (
          photo ? (
            <Photo src={photo} />
          ) : null
        ) : (
          <PhotoWrapper>
            {editedPhoto ? <Photo src={editedPhoto} /> : null}
            <PhotoEditButton htmlFor='edit-photo'>edit photo</PhotoEditButton>
            <PhotoEditInput
              onChange={onFileChange}
              type='file'
              id='edit-photo'
              accept='image/*'
            ></PhotoEditInput>
          </PhotoWrapper>
        )}
      </Column>
    </Wrapper>
  );
}
