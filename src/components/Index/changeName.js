import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io';

import Modal from '../shared/modal';
import Button from '../shared/button';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const Title = styled.span`
    font-family: 'Roboto', sans-serif;
    font-size: 26px;
    color: #060909;

    padding: 16px 0px 8px 0px;
    margin: 16px 8px 8px 8px;

    @media (max-width: 500px){
        font-size: 22px;
    }

    @media (max-width: 400px){
        font-size: 20px;
    }
`

const Input = styled.input`
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    color: #060909;
    
    border: 2px solid #060909;
    border-radius: 10px;
    padding: 8px;
    margin: 8px;

    @media (max-width: 500px){
        font-size: 18px;
    }

    @media (max-width: 400px){
        font-size: 16px;
    }
    
    :focus{
        outline: none;
    }
`

const ChangeName = ({open, setOpen, user, changeUserName}) => {
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [updating, setUpdating] = useState(false);

    return(
        <Modal open={open}>
            <Container>
                <Button
                    onClick={() => setOpen(false)}
                >
                    <IoIosArrowBack className="icon" />
                    <span className="text">Go Back</span>
                </Button>
                <Title>Change {user.first_name} {user.last_name} name</Title>
                <Input
                    type="text"
                    placeholder="First name..."
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Last name..."
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />
                <Button
                    onClick={() => {
                        if(!updating){
                            setUpdating(true);
                            changeUserName(user, firstName, lastName, setUpdating, setOpen);
                        }
                    }}
                >
                    <span className="text">{updating ? "Changing..." : "Change"}</span>
                </Button>
            </Container>
        </Modal>
    )
}

export default ChangeName;