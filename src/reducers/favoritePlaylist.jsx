import {ACTIONS} from '../actions/favoritePlaylist';


const initialState = null;

export default function (state=initialState, action) {
    if (action.type === ACTIONS.UPDATE_FAVORITE_PLAYLIST) {
        return action.payload.playlistId;
    }
    return state;
};
