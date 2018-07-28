import React, {Component} from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';

import {App, Header} from '../components';
import {List, Watch, Search} from '../containers';


export default class extends Component {
    listComponent = (props) => {
        return (
            <List/>
        );
    };

    watchComponent = (props) => {
        return (
            <Watch/>
        );
    };

    render() {
        return (
            <BrowserRouter>
                <App>
                    <Header>
                        <Search/>
                    </Header>
                    <Switch>
                        <Route
                            exact
                            path="/(list)?"
                            component={this.listComponent}
                        />
                        <Route
                            path="/watch"
                            component={this.watchComponent}
                        />
                    </Switch>
                </App>
            </BrowserRouter>
        );
    }
};
