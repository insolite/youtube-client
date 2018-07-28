import React, {Component} from 'react';

import {Search} from '../components';


export default class extends Component {
    state = {
        query: '',
    };

    componentWillMount() {
        const params = new URLSearchParams(this.props.location.search);
        const query = params.get('query') || '';
        this.setState({query});
    }

    submit = () => {
        this.props.history.push('/list?query=' + this.state.query);
    };

    render() {
        return (
            <Search>
                <input value={this.state.query}
                       placeholder="Search..."
                       onKeyPress={e => (e.which || e.keyCode) === 13 && this.submit()}
                       onChange={({target: {value: query}}) => this.setState({query})}/>
                <button onClick={this.submit}>Search</button>
            </Search>
        );
    }
};
