import React from 'react';
import { FaHome, FaSignInAlt, FaUser, FaWindowClose } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import history from '../../services/history';

import * as actions from '../../store/modules/auth/actions'
import { Nav } from './styled';


export default function Header() {

    const nomeStored = useSelector(state => state.auth.user.nome);
    const id = useSelector(state => state.auth.user.id);
    const dispatch = useDispatch()

    function handleClick(e) {
        e.preventDefault();
        dispatch(actions.loginFailure())
        history.push('/')
    }

    return (
        <Nav>
            {
                id ?
                    <span>
                        {nomeStored}
                    </span>
                    :
                    <></>
            }

            <div>
                <Link to="/">
                    <FaHome size={24} />
                </Link>

                <Link to="/register">
                    <FaUser size={18} />
                </Link>

                {
                    id ?
                        <Link onClick={handleClick} to='/logout'>
                            <FaWindowClose size={24} />
                        </Link>
                        :
                        <Link to="/login">
                            <FaSignInAlt size={22} />
                        </Link>
                }

            </div>


        </Nav>

    )
}