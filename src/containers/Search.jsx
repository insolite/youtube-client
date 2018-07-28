import React, {Component} from 'react';

import {Search} from '../components';


const enterKeyCode = 13;


export default class extends Component {
    state = {
        query: '',
    };

    componentWillMount() {
        this.setState({query: this.parseQuery(this.props.location)});
    }

    componentWillReceiveProps(np) {
        if (np.location.search !== this.props.location.search) {
            this.setState({query: this.parseQuery(np.location)});
        }
    }

    submit = () => {
        this.props.history.push('/list?query=' + this.state.query);
    };

    parseQuery = location => (new URLSearchParams(location.search)).get('query') || '';

    render() {
        return (
            <Search>
                <input value={this.state.query}
                       placeholder="Search..."
                       onKeyPress={e => (e.which || e.keyCode) === enterKeyCode && this.submit()}
                       onChange={({target: {value: query}}) => this.setState({query})}/>
                <button onClick={this.submit}>Search</button>
            </Search>
        );
    }
};
