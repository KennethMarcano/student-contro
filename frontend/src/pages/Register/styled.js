import styled from 'styled-components';
import * as colors from '../../config/colors'

export const ContainerRegister = styled.div`
    h1 {
        text-align: center;
        margin-bottom: 10px;
    }

    form {
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