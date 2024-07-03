import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ContainerAlunos = styled.div`
    
    h1 {
        text-align: center;
    }

    table{
        div {
            display: flex;
            align-items: center;
            justify-content: left;
            border-bottom: 1px solid #eee;
            &:hover {
                background: #eee;
            }
        }

        td {
            padding: 15px 10px;
        }

        img {
            width: 34px;
            height: 34px;
            border-radius: 50%;
        }
          
    }

`;

export const NovoAluno = styled(Link)`
    display: flex;
    justify-content: center;
    text-align: center;
    margin-top: 30px;
`;
