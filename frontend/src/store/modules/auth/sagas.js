import { call, put, all, takeLatest  } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';


import * as actions from './actions';
import * as types from '../types';
import history from '../../../services/history';
import axios from '../../../services/axios'

function* loginRequest({ payload }) {
    try {
        toast.loading('Carregando...', {position: 'top-center'})
        const response = yield call(axios.post, '/tokens', payload);

        yield put(actions.loginSucess({ ...response.data }))

        toast.dismiss();
        toast.success('Login feito com sucesso');

        axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

        history.push(payload.prevPath)

    } catch (e) {
        toast.dismiss();
        toast.error('Usuario ou senha invalidos.');
        yield put(actions.loginFailure());

    }
}

function* registerRequest({ payload }) {
    const { id, nome, email, password} = payload;
    toast.loading('Carregando...', {position: 'top-center'})
    try {
        if(id){
            yield call(axios.put, '/users', {
                nome,
                email,
                password: password || undefined,
            });
            yield put(actions.registerSucess({ nome, email, password}))

            toast.dismiss();
            toast.success('Usuario editado com sucesso')
        }
        else{
            yield call(axios.post, '/users', {nome, email, password});
            toast.dismiss();
            toast.success('Usuario cadastrado com sucesso');
            yield put(actions.loginFailure());
            history.push('/login');
        }

    } catch (e) {
        const errors = get(e, 'response.data.errors', []);
        const status = get(e, 'response.status', 0);
        toast.dismiss();
        yield put(actions.registerFailure());
        if(status === 401){
            toast.error('Você precisa fazer login de novo');
            yield put(actions.loginFailure());
            return history.push('/login');
        }
        if(errors.length > 0){
            errors.map(error => toast.error(error));
        } else {
            toast.error('Error desconhecido');
        }

    }

}

//esto aqui se hace para garantizar que nuestro header tenga nuestro authorization aun asi despues de actualizarla pagina
//para asi que el usuario logre acessar a rutas cerrados que necesiten login
function persistRehydrate({ payload }) {
    const token = get(payload, 'auth.token', '');
    if(!token) return;
    axios.defaults.headers.Authorization = `Bearer ${token}`;
}

//el all sirve para juntar todas las actions en un array
// el takeLatest solo toma la ultima request echa por el disparador en login caso el usuario
//apriete varias vezes el boton
export default all([
    takeLatest(types.LOGIN_REQUEST, loginRequest),
    takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
    takeLatest(types.REGISTER_REQUEST, registerRequest),
]);