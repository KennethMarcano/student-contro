import React from "react";
import { toast } from "react-toastify";
import { get } from "lodash";
import { useDispatch } from "react-redux";

import * as actions from '../../store/modules/auth/actions';
import Loading from "../../components/Loading";
import history from '../../services/history'
import axios from "../../services/axios";
import { Container } from "../../styles/GlobalStyles";
import { Title, Form } from "./styled";



export default function Fotos({ match }) {
    const dispatch = useDispatch();
    const { id } = match.params;
    const [foto, setFoto] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                toast.loading('Carregando...', { position: 'top-center' })
                const { data } = await axios.get(`/alunos/${id}`);
                setFoto(get(data, 'Fotos[0].url', ''))
                toast.dismiss();
                setIsLoading(false);
            } catch (error) {
                toast.dismiss();
                setIsLoading(false);
                toast.error('Erro ao obter a imagem ')
                history.push('/')
            }
        };

        getData();
    }, [id])

    function handleChange(e) {
        const newFoto = e.target.files[0]
        const fotoURL = URL.createObjectURL(newFoto); //crea una URL apartir de un archivo
        setFoto(fotoURL);

        const formData = new FormData();
        formData.append('aluno_id', id);
        formData.append('foto', newFoto);
        try {
            setIsLoading(true);
            toast.loading('Carregando...', { position: 'top-center' })
            axios.post('/fotos/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            toast.dismiss();
            setIsLoading(false);
            toast.success('Foto alterada com sucesso')
        } catch (error) {
            const status = get(error, 'response.status', 0);
            toast.dismiss();
            setIsLoading(false);
            toast.error('Erro ao alterar a imagem');
            if(status === 401) dispatch(actions.loginFailure());

        }
    }

    return (
        <Container>
            <Loading isLoading={isLoading} />
            <Title>Fotos</Title>
            <Form>
                <label htmlFor="foto">
                    {foto ? (
                        <img crossOrigin='' src={foto} alt="foto" />
                    ) :
                        ('Seleccionar')}
                    <input type="file" id="foto" onChange={handleChange} />
                </label>
            </Form>


        </Container>);
}