import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import validator from "validator";
import { useSelector, useDispatch } from "react-redux";

import * as actions from '../../store/modules/auth/actions'
import { Container } from "../../styles/GlobalStyles";
import { ContainerRegister } from "./styled";


export default function Register() {
    const dispatch = useDispatch();
    const nomeStored = useSelector(state => state.auth.user.nome);
    const emailStored = useSelector(state => state.auth.user.email);
    const id = useSelector(state => state.auth.user.id);

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (!id) return;
        setNome(nomeStored);
        setEmail(emailStored);
    }, [id, nomeStored, emailStored]);


    async function handleSubmit(e) {
        e.preventDefault();
        let errorForm = false;
        if (nome.length < 3 || nome.length > 255) {
            errorForm = true;
            toast.error('Nome deve ter entre 3 e 255 caracteres');
        }
        if (!validator.isEmail(email)) {
            errorForm = true;
            toast.error('E-mail invalido');
        }
        if (!id && (password.length < 6 || password.length > 50)) {
            errorForm = true;
            toast.error('Senha deve ter entre 6 e 50 caracteres');
        }

        if (errorForm) return;

        dispatch(actions.registerRequest({ nome, email, password, id }))
    }

    return (
        <Container>
            <ContainerRegister>
                <h1>{id ? 'Editar dados' : 'Crie sua conta'}</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={nome}
                        placeholder="Nome"
                        onChange={(e) => setNome(e.target.value)}
                    >
                    </input>

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



                    <button type="submit">{id ? 'Salvar' : 'Cadastrar'}</button>
                </form>
            </ContainerRegister>
        </Container>
    );
}