import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

const Form = styled.form``;

const Input = styled.input``;

export default function CreateAccount() {
    return <Wrapper>
        <Form>
            <Input name='name' placeholder="Name" type='text' />
            <Input />
            <Input />
            <Input />
        </Form>
    </Wrapper>;
}