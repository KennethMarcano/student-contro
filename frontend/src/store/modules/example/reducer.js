import * as types from '../types'

const initialState = {
    botaoCLicado: false,
}

export default function exampleReducer(state = initialState, action) {
    switch (action.type) {
        case types.BOTAO_CLICADO_SUCESS:
            const newState = { ...state };
            newState.botaoCLicado = !newState.botaoCLicado;
            console.log('Sucess')
            return newState;

        case types.BOTAO_CLICADO_REQUEST:
            console.log('Estou fazendo o request')
            return state;

        case types.BOTAO_CLICADO_FAILURE:
            console.log('Deu erro')
            return state;

        default:
            return state;

    }
};