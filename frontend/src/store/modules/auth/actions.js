import * as types from '../types'

export function loginRequest(payload) {
    return {
        type: types.LOGIN_REQUEST, //con esto especificamos el nombre de la accion
        payload
    };
}

export function loginFailure(payload) {
    return {
        type: types.LOGIN_FAILURE, //con esto especificamos el nombre de la accion
        payload
    };
}

export function loginSucess(payload) {
    return {
        type: types.LOGIN_SUCESS, //con esto especificamos el nombre de la accion
        payload
    };
}

export function registerRequest(payload) {
    return {
        type: types.REGISTER_REQUEST, //con esto especificamos el nombre de la accion
        payload
    };
}

export function registerFailure(payload) {
    return {
        type: types.REGISTER_FAILURE, //con esto especificamos el nombre de la accion
        payload
    };
}

export function registerSucess(payload) {
    return {
        type: types.REGISTER_SUCESS, //con esto especificamos el nombre de la accion
        payload
    };
}
