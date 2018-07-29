import {combineReducers} from 'redux';

import gapi from './gapi';
import favoritePlaylist from './favoritePlaylist';
import searchQuery from './searchQuery';


export default combineReducers({
    gapi,
    favoritePlaylist,
    searchQuery,
});
