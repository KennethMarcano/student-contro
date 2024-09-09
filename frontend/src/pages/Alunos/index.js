import React, { useEffect, useState } from "react";
import { get } from "lodash";
import { FaUserCircle, FaEdit, FaWindowClose } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


import axios from "../../services/axios";
import history from "../../services/history";
import { Container } from "../../styles/GlobalStyles";
import { ActionButton, ActionsContainer, AlunoCard, AlunoDetails, AlunoImage, AlunoInfo, AlunosContainer, Title } from "./styled";
import Loading from "../../components/Loading";

const MySwal = withReactContent(Swal);

export default function Alunos() {
    const [alunos, setAlunos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getAlunos() {
            setIsLoading(true);
            toast.loading('Carregando...', { position: 'top-center' })
            try {
                const response = await axios.get('/alunos');
                setAlunos(response.data);
                toast.dismiss()
                setIsLoading(false);
            } catch (e) {
                const errors = get(e, 'response.data.errors', []);
                errors.map(error => toast.error(error));
            }


        }

        getAlunos();
    }, []);

    async function handleDelete(id, index) {
        const response = await MySwal.fire({
            title: `Apagar o aluno ${alunos[index].nome}?`,
            text: "O registro sera apagado para sempre!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim"
          })
        if(response.isConfirmed){
            setIsLoading(true);
            toast.loading('Apagando...', { position: 'top-center' })
            try {
                await axios.delete(`/alunos/${id}`);
                const response = await axios.get('/alunos');
                toast.dismiss()
                MySwal.fire({
                    title: "Registro apagado!",
                    icon: "success"
                  });
                setIsLoading(false);
                setAlunos(response.data);
            } catch (err) {
                toast.dismiss()
                setIsLoading(false);
                const errors = get(err, 'response.data.errors', []);
                errors.map(error => toast.error(error));
                history.push('/login')
            }
        }
    }

    return (
        <Container>
            <Loading isLoading={isLoading} />
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

