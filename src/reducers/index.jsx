import {combineReducers} from 'redux';

import favoritePlaylist from './favoritePlaylist';
import searchQuery from './searchQuery';


export default combineReducers({
    favoritePlaylist,
    searchQuery,
});
