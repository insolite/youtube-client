import React, {Component} from 'react';

import {Watch} from '../components';


export default class extends Component {
    state = {
        videoId: null,
    };

    componentWillMount() {
        this.setState({videoId: this.parseId(this.props.location)});
    }

    componentWillReceiveProps(np) {
        if (np.location.search !== this.props.location.search) {
            this.setState({videoId: this.parseId(np.location)});
        }
    }

    parseId = location => (new URLSearchParams(location.search)).get('id') || '';

    render() {
        const {videoId} = this.state;
        return (
            <Watch url={`https://www.youtube.com/embed/${videoId}?autoplay=1&widgetid=1&enablejsapi=1`}/>
        );
    }
};
