import React from 'react';
import styled, { keyframes } from 'styled-components';

const Background = styled.div`
    background-color: #000000bb;
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;

    display: ${props => props.open ? "flex" : "none"};
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const fadeIn = keyframes`
    from{
        transform: translateY(20%);
        opacity: 0;
    }

    to{
        transform: translateY(0%);
        opacity: 1;
    }
`

const Container = styled.div`
    background-color: #ffffff;
    padding: 8px;
    box-shadow: 0px 4px 10px #00000055;
    border-radius: 10px;
    max-height: 80%;
    overflow-y: scroll;
    width: 500px;

    animation: ${fadeIn} 450ms;

    @media (max-width: 500px){
        width: 400px;
    }

    @media (max-width: 400px){
        width: 300px;
    }
`

const Modal = ({open, children}) => {
    return(
        <Background open={open}>
            <Container>
                {children}
            </Container>
        </Background>
    )
}

export default Modal;