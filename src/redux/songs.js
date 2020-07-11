import * as ActionTypes from './ActionTypes';

export const Songs = (state = {
        isLoading: true,
        errMess: null,
        songs: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_SONGS:
            return {...state, isLoading: false, errMess: null, songs: action.payload};

        case ActionTypes.SONGS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, songs: []};
            
        default:
            return state;
    }
}