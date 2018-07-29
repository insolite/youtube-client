import {combineReducers} from 'redux';

import gapi from './gapi';
import favoritePlaylist from './favoritePlaylist';


export default combineReducers({
    gapi,
    favoritePlaylist,
});
