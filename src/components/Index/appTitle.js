import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
    font-family: 'Open-sans', sans-serif;

    font-size: 32px;
    color: #1472c4;
    font-weight: 600;
    margin: 16px;
    text-align: center;
`

const AppTitle = () => {
    return(
        <Title>Go Rest - Users</Title>
    )
}

export default AppTitle;