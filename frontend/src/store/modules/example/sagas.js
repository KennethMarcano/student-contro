import { call, put, all, takeLatest  } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import * as actions from './actions';
import * as types from '../types';

const requesicao = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, 500);
});

function* exampleRequest() {
    try {
        yield call(requesicao);
        yield put(actions.clicaBotaoSucess()); //el put sirve para disparar una action tambien
    } catch {
        toast.error('Deu ruim');
        yield put(actions.clicaBotaoFailure());
    }
}

//el all sirve para juntar todas las actions en un array
// el takeLatest solo toma la ultima request echa por el disparador en login caso el usuario
//apriete varias vezes el boton
export default all([takeLatest(types.BOTAO_CLICADO_REQUEST, exampleRequest)]);