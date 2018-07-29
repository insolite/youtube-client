import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {List, VideoThumbnail} from '../components';
import {gapiRequest, updateSearchQuery} from '../actions';


export default connect(
    state => {
        return {
            searchQuery: state.searchQuery,
        };
    },
    dispatch => {
        return {
            gapiRequest: (auth) => dispatch(gapiRequest(auth)),
            updateSearchQuery: (query) => dispatch(updateSearchQuery(query)),
        };
    },
)(
    class extends Component {
        state = {
            videos: [],
            pageToken: undefined,
            loading: true,
        };

        componentWillMount() {
            const {searchQuery, updateSearchQuery, location} = this.props;
            this.search(searchQuery);
            updateSearchQuery((new URLSearchParams(location.search)).get('query') || '');
        }

        componentWillReceiveProps(np) {
            if (np.searchQuery !== this.props.searchQuery) {
                this.search(np.searchQuery);
            }
        }

        search = (query, append=false) => {
            this.setState({loading: true}, () => {
                this.props.gapiRequest().then(gapi => {
                    gapi.client.youtube.search.list({
                        part: 'snippet',
                        type: 'video',
                        pageToken: this.state.nextPageToken,
                        maxResults: 10,
                        q: query,
                    }).execute(response => {
                        const {nextPageToken} = response;
                        const videos = response.items.map(({
                            snippet: {
                                title,
                                thumbnails: {
                                    default: thumbnail
                                }
                            },
                            id: {videoId}
                        }) => ({
                            title,
                            thumbnail,
                            videoId
                        }));
                        this.setState((prevState) => ({
                            videos: append ? prevState.videos.concat(videos) : videos,
                            nextPageToken,
                            loading: false,
                        }));
                    });
                });
            });
        };

        render() {
            const {videos, loading} = this.state;
            return (
                <List>
                    {videos.map(({videoId, title, thumbnail}) => (
                        <Link to={`/watch?id=${videoId}`} key={videoId}>
                            <VideoThumbnail title={title}
                                            videoId={videoId}
                                            imageUrl={thumbnail.url}
                            />
                        </Link>
                    ))}
                    {loading ? (
                        <div className="loading">Loading...</div>
                    ) : (
                        <button className="load"
                                onClick={() => !this.state.loading && this.search(this.props.searchQuery, true)}
                        >Load more</button>
                    )}
                </List>
            );
        }
    }
);
