import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router';
import {BrowserRouter, Router} from 'react-router-dom';

import {gapiInit} from '../actions';
import {App, Header, Content} from '../components';
import {List, Watch, Search} from '../containers';


export default connect(
    state => {
        return {};
    },
    dispatch => {
        return {
            gapiInit: () => dispatch(gapiInit()),
        };
    },
)(
    class extends Component {
        componentWillMount() {
            this.props.gapiInit();
        }

        listComponent = (props) => {
            return (
                <List {...props}/>
            );
        };

        watchComponent = (props) => {
            return (
                <Watch {...props}/>
            );
        };

        render() {
            return (
                <BrowserRouter>
                    <App>
                        <Header>
                            <Route
                                path="/"
                                component={Search}
                            />
                        </Header>
                        <Content>
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
                        </Content>
                    </App>
                </BrowserRouter>
            );
        }
    }
);
