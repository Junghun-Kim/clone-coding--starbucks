import { styled } from "styled-components";
import { ITweet } from "./Timeline";
import React from "react";
import auth, { db } from "../Firebase";
import { deleteDoc, doc } from "firebase/firestore";

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 20px;
    border: 1px solid rgba(255,255,255,0.5);
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

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
    const user = auth.currentUser;
    const onDelete = async () => {
        const ok = window.confirm('Are you sure you want to delete this tweets?');
        if (!ok || user?.uid !== userId) {
            return;
        }
        try {
            await deleteDoc(doc(db, 'tweets', id));
        } catch (e) {

        }
    };

    return <Wrapper>
        <Column>
            <Username>{username}</Username>
            <Payload>{tweet}</Payload>
            {user?.uid === userId && <DeleteButton onClick={onDelete}>Delete</DeleteButton>}
        </Column>
        <Column>
            {photo ? (
                <Photo src={photo} />
            ) : null}
        </Column>
    </Wrapper>;
}