import * as ActionTypes from './ActionTypes';

export const fetchSongs = () => (dispatch) => {
    return fetch('https://api.npoint.io/3afc6c645a96f8d71317')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(Songs => dispatch(addSongs(Songs)))
        .catch(error => dispatch(SongsFailed(error.message)));
}

export const SongsFailed = (errmess) => ({
    type: ActionTypes.SONGS_FAILED,
    payload: errmess
});

export const addSongs = (Songs) => ({
    type: ActionTypes.ADD_SONGS,
    payload: Songs
});