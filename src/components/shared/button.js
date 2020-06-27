import styled from 'styled-components';

const Button = styled.button`
    font-family: 'Roboto', sans-serif;
    color: #1472c4;
    border-radius: 10px;
    border: 2px solid #1472c4;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    padding: 8px;
    margin: 8px;

    :hover{
        cursor: pointer;
        background-color: #eeeeee;
    }

    :focus{
        outline: none;
    }

    .icon{
        font-size: 20px;
    }

    .text{
        font-size: 18px;

        @media (max-width: 350px){
            font-size: 16px;
        }
    }
`

export default Button;