import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get } from "lodash";
import { FaUserCircle, FaEdit, FaWindowClose } from "react-icons/fa";
import { toast } from "react-toastify";

import axios from "../../services/axios";
import history from "../../services/history";
import { Container } from "../../styles/GlobalStyles";
import { ContainerAlunos, NovoAluno } from "./styled";
import Loading from "../../components/Loading";

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

    async function handleDelete(e, id) {
        setIsLoading(true);
        toast.loading('Apagando...', { position: 'top-center' })
        try {
            await axios.delete(`/alunos/${id}`);
            const response = await axios.get('/alunos');
            toast.dismiss()
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

    return (
        <Container>
            <Loading isLoading={isLoading} />
            <ContainerAlunos>
                <h1>Alunos</h1>
                <table>
                    {alunos.map(aluno => {
                        return (
                            <tr>
                                <div key={String(aluno.id)}>
                                    <td>
                                        {
                                            get(aluno, 'Fotos[0].url', false) ?
                                                <img crossOrigin="" src={aluno.Fotos[0].url} alt="" />
                                                :
                                                <FaUserCircle size={34} />
                                        }
                                    </td>
                                    <td>{aluno.nome}</td>
                                    <td>{aluno.email}</td>

                                    <td>
                                        <Link to={`/aluno/${aluno.id}/edit`} >
                                            <FaEdit color="blue" />
                                        </Link>
                                    </td>

                                    <td>
                                        <Link on onClick={e => {
                                            e.preventDefault();
                                            handleDelete(e, aluno.id)
                                        }}
                                            to={`/aluno/${aluno.id}/delete`}>
                                            <FaWindowClose />
                                        </Link>
                                    </td>


                                </div>

                            </tr>
                        );
                    })}

                </table>
                <NovoAluno to='/aluno'>Criar novo aluno</NovoAluno>
            </ContainerAlunos>

        </Container>);
}

