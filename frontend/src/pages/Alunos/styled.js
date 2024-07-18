import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ContainerAlunos = styled.div`
    
    h1 {
        text-align: center;
    }

    .responsive-table{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    overflow-x: auto;
    }
      
    .alunos-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .aluno-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        border-bottom: 1px solid #eee;
        &:hover {
            background: #eee;
        }
    }


    img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
    }
          

`;

export const NovoAluno = styled(Link)`
    display: flex;
    justify-content: center;
    text-align: center;
    margin-top: 30px;
`;
