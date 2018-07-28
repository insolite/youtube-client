import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {List, VideoThumbnail} from '../components';
import {gapiRequest} from '../actions';


export default connect(
    state => {
        return {};
    },
    dispatch => {
        return {
            gapiRequest: () => dispatch(gapiRequest()),
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
            this.search(this.parseQuery(this.props.location));
        }

        componentWillReceiveProps(np) {
            if (np.location.search !== this.props.location.search) {
                this.search(this.parseQuery(np.location));
            }
        }

        parseQuery = location => (new URLSearchParams(location.search)).get('query') || '';

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
                                onClick={() => !this.state.loading && this.search(this.parseQuery(this.props.location), true)}
                        >Load more</button>
                    )}
                </List>
            );
        }
    }
);
