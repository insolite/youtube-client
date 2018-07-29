import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Watch} from '../components';
import {gapiRequest} from '../actions';


export default connect(
    state => {
        return {
            favoritePlaylist: state.favoritePlaylist,
        };
    },
    dispatch => {
        return {
            gapiRequest: (auth) => dispatch(gapiRequest(auth)),
        };
    },
)(
    class extends Component {
        state = {
            videoId: null,
            title: null,
            description: null,
            tags: null,
            channelId: null,
            channelTitle: null,
            publishedAt: null,
            inFavorite: null,
            favoritePlaylistItem: null,
            favoriteLoading: false,
        };

        componentWillMount() {
            const videoId = this.parseId(this.props.location);
            this.setState({videoId});
            this.refreshDetails(videoId);
            this.refreshInFavorite(videoId, this.props.favoritePlaylist);
        }

        componentWillReceiveProps(np) {
            if (np.location.search !== this.props.location.search) {
                const videoId = this.parseId(np.location);
                this.setState({videoId});
                this.refreshDetails(videoId);
            }
            if (np.favoritePlaylist !== this.props.favoritePlaylist && np.favoritePlaylist) {
                this.refreshInFavorite(this.parseId(np.location), np.favoritePlaylist);
            }
        }

        parseId = location => (new URLSearchParams(location.search)).get('id') || '';

        refreshDetails = (videoId) => {
            this.props.gapiRequest().then(gapi => {
                gapi.client.youtube.videos.list({
                    id: videoId,
                    part: 'snippet',
                }).execute(response => {
                    const [{
                        snippet: {
                            title,
                            description,
                            tags,
                            channelId,
                            channelTitle,
                            publishedAt,
                        },
                    }] = response.items;
                    this.setState({
                        title,
                        description,
                        tags,
                        channelId,
                        channelTitle,
                        publishedAt,
                    });
                });
            });
        };

        refreshInFavorite = (videoId, favoritePlaylist) => {
            if (videoId && favoritePlaylist) {
                this.props.gapiRequest().then(gapi => {
                    gapi.client.youtube.playlistItems.list({
                        part: 'id',
                        videoId,
                        playlistId: favoritePlaylist,
                    }).execute(response => {
                        const inFavorite = response.pageInfo.totalResults > 0;
                        let newState = {
                            inFavorite,
                        };
                        if (inFavorite) {
                            newState = {
                                ...newState,
                                favoritePlaylistItem: response.items[0].id,
                            };
                        }
                        this.setState(newState);
                    });
                });
            }
        };

        signIn = () => {
            this.props.gapiRequest().then(gapi => {
                gapi.auth2.getAuthInstance().signIn();
            });
        };

        toggleFavorite = () => {
            this.setState({favoriteLoading: true});
            this.props.gapiRequest(true).then(gapi => {
                const {videoId, inFavorite, favoritePlaylistItem} = this.state;
                const {favoritePlaylist} = this.props;
                if (inFavorite) {
                    gapi.client.youtube.playlistItems.delete({
                        id: favoritePlaylistItem,
                    }, {
                        snippet: {
                            playlistId: favoritePlaylist,
                            resourceId: {
                                kind: 'youtube#video',
                                videoId,
                            }
                        }
                    }).execute(response => {
                        // TODO: handle errors
                        this.setState({
                            favoriteLoading: false,
                            inFavorite: false,
                        });
                    });
                } else {
                    gapi.client.youtube.playlistItems.insert({
                        part: 'snippet',
                    }, {
                        snippet: {
                            playlistId: favoritePlaylist,
                            resourceId: {
                                kind: 'youtube#video',
                                videoId,
                            }
                        }
                    }).execute(response => {
                        // TODO: handle errors
                        this.setState({
                            favoriteLoading: false,
                            inFavorite: true,
                            favoritePlaylistItem: response.result.id,
                        });
                    });
                }
            });
        };

        render() {
            const {
                videoId,
                title,
                description,
                tags,
                channelId,
                channelTitle,
                publishedAt,
                inFavorite,
                favoriteLoading,
            } = this.state;
            return (
                <Watch url={`https://www.youtube.com/embed/${videoId}?autoplay=1&widgetid=1&enablejsapi=1`}
                       title={title}
                       description={description}
                       tags={tags}
                       channelTitle={channelTitle}
                       channelUrl={`https://www.youtube.com/channel/${channelId}`}
                       publishedAt={publishedAt}
                       toggleFavorite={inFavorite === null ? this.signIn : this.toggleFavorite}
                       inFavorite={inFavorite}
                       favoriteLoading={favoriteLoading}
                />
            );
        }
    }
);
