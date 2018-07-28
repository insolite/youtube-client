import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import {App} from './containers';
import {createGapiMiddleware} from './middlewares/gapi';
import {GAPI_KEY} from './constants';
import mainReducer from './reducers';


const createStoreWithMiddleware = applyMiddleware(
    createGapiMiddleware(GAPI_KEY),
)(createStore);
const store = createStoreWithMiddleware(mainReducer);


ReactDOM.render((
    <Provider store={store}>
        <App/>
    </Provider>
), document.getElementById('root'));
