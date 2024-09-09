import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { get } from "lodash";
import { FaUserCircle, FaEdit, FaWindowClose } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';

import axios from "../../services/axios";
import history from "../../services/history";
import { Container } from "../../styles/GlobalStyles";
import { ActionButton, ActionsContainer, AlunoCard, AlunoDetails, AlunoImage, AlunoInfo, AlunosContainer, Title } from "./styled";

export default function Alunos() {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const [alunos, setAlunos] = useState([]);

    useEffect(() => {
        async function getAlunos() {
            Swal.fire({
                title: 'Carregando...',
                text: 'Por favor, espere...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            try {
                const response = await axios.get('/alunos');
                setAlunos(response.data);
                Swal.close()
            } catch (e) {
                Swal.close()
                const errors = get(e, 'response.data.errors', []);
                errors.map(error => toast.error(error));
            }


        }

        getAlunos();
    }, []);

    async function handleDelete(id, index) {
        if (!isLoggedIn) return;
        const response = await Swal.fire({
            title: `Apagar aluna/o ${alunos[index].nome}?`,
            text: "O registro sera apagado para sempre!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim"
        })
        if (response.isConfirmed) {
            Swal.fire({
                title: 'Apagando...',
                text: 'Por favor, espere...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            try {
                await axios.delete(`/alunos/${id}`);
                const response = await axios.get('/alunos');
                Swal.close();
                toast.success('Registro apagado com sucesso.')
                setAlunos(response.data);
            } catch (err) {
                Swal.close();
                const errors = get(err, 'response.data.errors', []);
                errors.map(error => toast.error(error));
                history.push('/login')
            }
        }
    }

    return (
        <Container>
            <Title>Lista de Alunos</Title>
            <AlunosContainer>
                {alunos.map((aluno, index) => (
                    <AlunoCard key={aluno.id}>
                        <AlunoInfo>
                            {aluno.foto ? (
                                <AlunoImage src={aluno.foto} alt={`${aluno.nome} ${aluno.sobrenome}`} />
                            ) : (
                                <FaUserCircle size={50} />
                            )}
                            <AlunoDetails>
                                <div>{aluno.nome} {aluno.sobrenome}</div>
                                <div>{aluno.email}</div>
                            </AlunoDetails>
                        </AlunoInfo>
                        <ActionsContainer>
                            <ActionButton to={`/aluno/${aluno.id}/edit`}>
                                <FaEdit color="blue" />
                            </ActionButton>
                            <ActionButton to={`/aluno/${aluno.id}/delete`} onClick={() => handleDelete(aluno.id, index)}>
                                <FaWindowClose />
                            </ActionButton>
                        </ActionsContainer>
                    </AlunoCard>
                ))}
                <ActionButton to='/aluno'>Criar novo aluno</ActionButton>
            </AlunosContainer>
        </Container>
    );
}

