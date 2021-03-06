import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router';
import {BrowserRouter, HashRouter, Router} from 'react-router-dom';

import {URL_PREFIX} from '../constants';
import {gapiInit, gapiRequest, updateFavoritePlaylist} from '../actions';
import {App, Header, Content} from '../components';
import {List, Watch, Search} from '../containers';


const routerComponent = URL_PREFIX ? HashRouter : BrowserRouter; // For github pages

export default connect(
    state => {
        return {
            favoritePlaylist: state.favoritePlaylist,
        };
    },
    dispatch => {
        return {
            gapiInit: () => dispatch(gapiInit()),
            gapiRequest: (auth) => dispatch(gapiRequest(auth)),
            updateFavoritePlaylist: playlistId => dispatch(updateFavoritePlaylist(playlistId)),
        };
    },
)(
    class extends Component {
        componentWillMount() {
            this.props.gapiInit();
            this.refreshFavoritePlaylist();
        }

        refreshFavoritePlaylist = () => {
            this.props.gapiRequest(true).then(gapi => {
                gapi.client.youtube.channels.list({
                    part: 'contentDetails',
                    mine: true,
                }).execute(response => {
                    if (response.error) {
                        console.error('Favorite playlist fetch error', response.error);
                    } else {
                        const {
                            items: [{
                                contentDetails: {
                                    relatedPlaylists: {
                                        favorites: favoritePlaylist
                                    }
                                }
                            }]
                        } = response;
                        this.props.updateFavoritePlaylist(favoritePlaylist);
                    }
                });
            });
        };

        render() {
            return (
                React.createElement(routerComponent, {basename: URL_PREFIX},
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
                                    component={List}
                                />
                                <Route
                                    path="/watch"
                                    component={Watch}
                                />
                            </Switch>
                        </Content>
                    </App>
                )
            );
        }
    }
);
