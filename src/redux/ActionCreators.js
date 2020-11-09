import * as ActionTypes from './ActionTypes';

export const fetchSongs = () => (dispatch) => {
    return fetch('https://api.jsonbin.io/b/5fa94e8d2769cc5b06ad3828',{
        headers: {
            'secret-key': '$2b$10$ue12ANlX4Ga8vojhFMlgCu25fhVTK1GP.A4CJuRMpC66OFGc.6yuK'
        }
    })
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