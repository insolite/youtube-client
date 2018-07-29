import {ACTIONS} from '../actions/gapi';


function Deferred() {
    var self = this;
    this.promise = new Promise((resolve, reject) => {
        self.resolve = resolve;
        self.reject = reject;
    })
}

const loadDeferred = new Deferred();

window.addEventListener('load', () => loadDeferred.resolve()); // TODO: get rid of this gapi stuff

export const isGapiAction = (action) => {
    return Boolean(action) && Object.values(ACTIONS).indexOf(action.type) >= 0;
};

export const createGapiMiddleware = (GAPI_KEY, OAUTH_CLIENT_ID) => {
    return (store) => {
        const initDeferred = new Deferred();
        const authDeferred = new Deferred();
        function updateSigninStatus(isSignedIn) {
            if (isSignedIn) {
                authDeferred.resolve(gapi);
            }
        }
        return (next) => {
            return (action) => {
                if (!isGapiAction(action)) {
                    return next(action);
                }

                let result;
                const {type: actionType, payload: actionPayload} = action;

                if (actionType == ACTIONS.GAPI_INIT) {
                    loadDeferred.promise.then(() => {
                        gapi.client.load('youtube', 'v3', () => {
                            gapi.client.init({
                                apiKey: GAPI_KEY,
                                discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"],
                                clientId: OAUTH_CLIENT_ID,
                                scope: 'https://www.googleapis.com/auth/youtube',
                            }).then(function () {
                                gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
                                updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
                                initDeferred.resolve(gapi);
                            });
                        });
                    });
                    result = initDeferred.promise;
                } else if (actionType == ACTIONS.GAPI_REQUEST) {
                    result = initDeferred.promise;
                    if (actionPayload.auth) {
                        result = result.then(() => authDeferred.promise);
                    }
                }

                let actionResult = next(action);
                return result || actionResult;
            }
        };
    }
};
