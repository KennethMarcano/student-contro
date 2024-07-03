import storage from "redux-persist/lib/storage";
import { persistReducer } from 'redux-persist';

export default function persistedReducers(reducers) {
    const persistedReducer = persistReducer(
        {
            key: 'CONSUMO-API',
            storage,
            whitelist: ['auth'],
        },
        reducers
    );

    return persistedReducer;
}