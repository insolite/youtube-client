import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Watch} from '../components';
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
            videoId: null,
            title: null,
            description: null,
            tags: null,
            channelId: null,
            channelTitle: null,
            publishedAt: null,
        };

        componentWillMount() {
            const videoId = this.parseId(this.props.location);
            this.setState({videoId});
            this.refreshDetails(videoId);
        }

        componentWillReceiveProps(np) {
            if (np.location.search !== this.props.location.search) {
                const videoId = this.parseId(np.location);
                this.setState({videoId});
                this.refreshDetails(videoId);
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

        render() {
            const {
                videoId,
                title,
                description,
                tags,
                channelId,
                channelTitle,
                publishedAt,
            } = this.state;
            return (
                <Watch url={`https://www.youtube.com/embed/${videoId}?autoplay=1&widgetid=1&enablejsapi=1`}
                       title={title}
                       description={description}
                       tags={tags}
                       channelTitle={channelTitle}
                       channelUrl={`https://www.youtube.com/channel/${channelId}`}
                       publishedAt={publishedAt}
                />
            );
        }
    }
);
