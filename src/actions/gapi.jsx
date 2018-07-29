const GAPI_INIT = 'GAPI_INIT';
const GAPI_REQUEST = 'GAPI_REQUEST';

export const gapiInit = () => ({
    type: GAPI_INIT,
});

export const gapiRequest = (auth=false) => ({
    type: GAPI_REQUEST,
    payload: {
        auth,
    }
});

export const ACTIONS = {
    GAPI_INIT,
    GAPI_REQUEST,
};
