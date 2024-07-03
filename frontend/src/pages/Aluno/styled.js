import styled from 'styled-components';
import * as colors from '../../config/colors'

export const FormularioAluno = styled.div`
    h1 {
        text-align: center;
        margin-bottom: 10px;
    }

    form {
        padding-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;

        input {
            width: 70%;
            margin: 15px 0;
            padding: 8px 0;
            text-align: center;
            border: 1px solid #bebebe;
            font-size: 15px;
            &:focus{
                border: 2px solid ${colors.primaryColor};
            }
        }

        button {
            margin-top: 10px;
        }
    }
`;

export const ProfilePicture = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
    position: relative;

    img {
        height: 180px;
        width: 180px;
        border-radius: 50%;
    }

    a{
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 10px;
        color: #fff;
        background: ${colors.primaryColor};
        width: 25px;
        height: 25px;
        border-radius: 50%;
    }
`;