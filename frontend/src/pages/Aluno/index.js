import React, { useEffect, useState } from "react";
import { get } from "lodash";
import { toast } from "react-toastify";
import validator from "validator";
import Proptypes from 'prop-types'
import { useDispatch } from "react-redux";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

import * as actions from '../../store/modules/auth/actions'
import axios from "../../services/axios";
import history from "../../services/history";
import { Container } from "../../styles/GlobalStyles";
import { FormularioAluno, ProfilePicture } from "./styled";

export default function Aluno({ match }) {
    const { id } = match.params;
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [idade, setIdade] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [foto, setFoto] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {
        if (!id) return;
        async function getAluno() {
            try {
                const response = await axios.get(`/alunos/${id}`);
                setNome(response.data.nome)
                setSobrenome(response.data.sobrenome)
                setEmail(response.data.email)
                setIdade(response.data.idade)
                setPeso(response.data.peso)
                setAltura(response.data.altura)
                setFoto(response.data.Fotos[0])
            } catch (e) {
                const errors = get(e, 'response.data.errors', []);
                const status = get(e, 'response.status', 0);
                if (errors.length > 0)
                    errors.map(error => toast.error(error));
                else
                    toast.error('Erro desconhecido')

                if (status === 401) dispatch(actions.loginFailure())
                history.push('/');
            }
        }

        getAluno();

    }, [])

    async function handleSubmit(e) {
        e.preventDefault();
        let errorForm = false;
        if (nome.length < 3 || nome.length > 255) {
            errorForm = true;
            toast.error('Nome deve ter entre 3 e 255 caracteres');
        }
        if (sobrenome.length < 3 || sobrenome.length > 255) {
            errorForm = true;
            toast.error('Sobrenome deve ter entre 3 e 255 caracteres');
        }
        if (!validator.isEmail(email)) {
            errorForm = true;
            toast.error('E-mail invalido');
        }
        if (!validator.isNumeric(String(idade))) {
            errorForm = true;
            toast.error('Idade deve ser um numero');
        }
        if (!validator.isNumeric(String(peso))) {
            errorForm = true;
            toast.error('Peso deve ser um numero');
        }
        if (!validator.isNumeric(String(altura))) {
            errorForm = true;
            toast.error('Altura deve ser um numero');
        }

        if (errorForm) return;

        try {
            if (!id) {
                await axios.post('/alunos', { nome, sobrenome, email, idade, peso, altura });
                toast.success('Aluno criado com sucesso', { position: 'top-center' });
                return history.push('/');
            }
            else {
                await axios.put(`/alunos/${id}`, { nome, sobrenome, email, idade, peso, altura })
                toast.success('Aluno alterado com sucesso');
                return;
            }
        } catch (err) {
            const errors = get(err, 'response.data.errors', []);
            const status = get(err, 'response.status', 0);
            if (errors.length > 0)
                errors.map(error => toast.error(error));
            else
                toast.error('Erro desconhecido')

            if (status === 401) dispatch(actions.loginFailure())
            history.push('/');
        }
    }

    return (
        <Container>
            <FormularioAluno>
                <h1>{id ? 'Editar aluno' : 'Criar novo aluno'}</h1>

                {id && (
                    <ProfilePicture>
                        {foto ? (
                            <img crossOrigin="" src={foto.url} alt="nome"/>
                        ) : (
                            <FaUserCircle size={180}/>
                        )}
                        <Link to={`/fotos/${id}`}><FaEdit/></Link>
                    </ProfilePicture>
                )}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={nome}
                        placeholder="Nome"
                        onChange={(e) => setNome(e.target.value)}
                    >
                    </input>

                    <input
                        type="text"
                        value={sobrenome}
                        placeholder="Sobrenome"
                        onChange={(e) => setSobrenome(e.target.value)}
                    >
                    </input>

                    <input
                        type="text"
                        value={email}
                        placeholder="E-mail"
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </input>

                    <input
                        type="text"
                        value={idade}
                        placeholder="Idade"
                        onChange={(e) => setIdade(e.target.value)}
                    >
                    </input>

                    <input
                        type="text"
                        value={peso}
                        placeholder="Peso"
                        onChange={(e) => setPeso(e.target.value)}
                    >
                    </input>

                    <input
                        type="text"
                        value={altura}
                        placeholder="Altura"
                        onChange={(e) => setAltura(e.target.value)}
                    >
                    </input>

                    <button type="submit">{id ? 'Salvar' : 'Criar'}</button>
                </form>
            </FormularioAluno>

        </Container>);
}

Aluno.propTypes = {
    match: Proptypes.shape({}).isRequired,
}