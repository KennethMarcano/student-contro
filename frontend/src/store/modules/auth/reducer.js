import * as types from '../types'
import axios from '../../../services/axios'

const initialState = {
    isLoggedIn: false,
    token: '',
    user: {},
    isLoading: false,
}

export default function auth(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN_REQUEST: {
            const newState = {...state}
            newState.isLoading = true;
            return newState;
        }

        case types.LOGIN_FAILURE: {
            //si de algun error con login o la app mandamos deslogar automaticamente
            const newState = { ...initialState };
            delete axios.defaults.headers.Authorization
            return newState;
        }

        case types.LOGIN_SUCESS: {
            const newState = {
                isLoggedIn: true,
                token: action.payload.token,
                user: action.payload.user,
                isLoading: false,
            }
            return newState;
        }

        case types.REGISTER_REQUEST: {
            const newState = {...state}
            newState.isLoading = true;
            return newState;
        }

        case types.REGISTER_FAILURE: {
            const newState = {...state}
            newState.isLoading = false;
            return newState;
        }

        case types.REGISTER_SUCESS: {
            const newState = {...state}
            newState.user.nome = action.payload.nome;
            newState.user.email = action.payload.email;
            newState.isLoading = false;
            return newState;
        }

        default:
            { return state; }

    }
};