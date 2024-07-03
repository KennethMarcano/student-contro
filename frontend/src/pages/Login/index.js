import React, { useState } from "react";
import { get } from "lodash";
import { toast } from "react-toastify";
import validator from "validator";
import history from "../../services/history";
import { useDispatch, useSelector } from "react-redux";

import { Container } from "../../styles/GlobalStyles";
import { ContainerLogin } from "./styled";
import * as actions from '../../store/modules/auth/actions'
import Loading from "../../components/Loading";


export default function Login(props) {
    const dispatch = useDispatch();

    //aqui se verifica si existe una ruta anterior y se pidio hacer login si no se coloca home como default
    const prevPath = get(props, 'location.state.prevPath', '/');  

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isLoading = useSelector(state => state.auth.isLoading);

    async function handleSubmit(e) {
        e.preventDefault();
        let errorForm = false;
        if(!validator.isEmail(email)){
            errorForm = true;
            toast.error('E-mail invalido');
        }
        if(password.length < 6 || password.length > 50) {
            errorForm = true;
            toast.error('Senha deve ter entre 6 e 50 caracteres');
        }

        if(errorForm) return;

        dispatch(actions.loginRequest({email, password, prevPath}));

    }

    return (
        <Container>
            <Loading isLoading={isLoading}/>
            <ContainerLogin>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                    type="email" 
                    value={email} 
                    placeholder="E-mail"
                    onChange={(e) => setEmail(e.target.value)}
                    >
                    </input>

                    <input 
                    type="password" 
                    value={password} 
                    placeholder="Senha"
                    onChange={(e) => setPassword(e.target.value)}>
                    </input>

                    <button type="submit">Entrar</button>
                </form>
            </ContainerLogin>
        </Container>);
}