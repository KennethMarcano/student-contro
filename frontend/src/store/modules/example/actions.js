import * as types from '../types'

export function clicaBotaoSucess() {
    return {
        type: types.BOTAO_CLICADO_SUCESS, //con esto especificamos el nombre de la accion
    };
}

export function clicaBotaoRequest() {
    return {
        type: types.BOTAO_CLICADO_REQUEST, //con esto especificamos el nombre de la accion
    };
}

export function clicaBotaoFailure() {
    return {
        type: types.BOTAO_CLICADO_FAILURE, //con esto especificamos el nombre de la accion
    };
}