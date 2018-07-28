import {ACTIONS} from '../actions/gapi';


function Deferred() {
    var self = this;
    this.promise = new Promise((resolve, reject) => {
        self.resolve = resolve;
        self.reject = reject;
    })
}

const loadDeferred = new Deferred();

window.onload = () => loadDeferred.resolve(); // TODO: get rid of this gapi stuff

export const isGapiAction = (action) => {
    return Boolean(action) && Object.values(ACTIONS).indexOf(action.type) >= 0;
};

export const createGapiMiddleware = (GAPI_KEY) => {
    return (store) => {
        const initDeferred = new Deferred();
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
                            gapi.client.setApiKey(GAPI_KEY);
                            initDeferred.resolve(gapi);
                        });
                    });
                    result = initDeferred.promise;
                } else if (actionType == ACTIONS.GAPI_REQUEST) {
                    // const callback = actionPayload;
                    // result = callback(gapi);
                    result = initDeferred.promise;
                }

                let actionResult = next(action);
                return result || actionResult;
            }
        };
    }
};
