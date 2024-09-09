import styled from 'styled-components';
import * as colors from '../../config/colors';


export const Nav = styled.nav`
    background: ${colors.primaryColor};
    padding: 10px;
    display: flex;
    align-items: center;

    span {
        font-size: 17px;
        color: #fff;
        width: 33%;
    }


    div {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: end;

      a {
        color: #fff;
        margin: 0 10px;
        transition: all 300ms ease-in-out;
        &:hover{
            transform: scale(1.1);
        }
    }

    }

`;