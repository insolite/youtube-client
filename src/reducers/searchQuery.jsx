import {ACTIONS} from '../actions/searchQuery';


const initialState = '';

export default function (state=initialState, action) {
    if (action.type === ACTIONS.UPDATE_SEARCH_QUERY) {
        return action.payload.query;
    }
    return state;
};
