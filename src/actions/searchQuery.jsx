const UPDATE_SEARCH_QUERY = 'UPDATE_SEARCH_QUERY';

export const updateSearchQuery = (query) => ({
    type: UPDATE_SEARCH_QUERY,
    payload: {
        query,
    }
});

export const ACTIONS = {
    UPDATE_SEARCH_QUERY,
};
