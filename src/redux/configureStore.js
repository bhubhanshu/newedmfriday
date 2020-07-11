import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Songs } from './songs';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            songs: Songs,
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}