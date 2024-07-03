import styled from 'styled-components';


export const Title = styled.h1`
    text-align: center;
    padding-bottom: 25px;
`;

export const Form = styled.form`

        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;

    label {
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        width: 200px;
        height: 200px;
        border: 4px dashed black;
        border-radius: 50%;
        background: grey;
        cursor: pointer;
        overflow: hidden;
    }

    img {
        height: 200px;
        width: 200px;
    }

    input {
        display: none;
    }
`;