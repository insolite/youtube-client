import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Search} from '../components';
import {updateSearchQuery} from '../actions';


const enterKeyCode = 13;


export default connect(
    state => {
        return {
            searchQuery: state.searchQuery,
        };
    },
    dispatch => {
        return {
            updateSearchQuery: (query) => dispatch(updateSearchQuery(query)),
        };
    },
)(
    class extends Component {
        state = {
            query: '',
        };

        componentWillMount() {
            this.setState({query: this.props.searchQuery});
        }

        componentWillReceiveProps(np) {
            if (np.searchQuery !== this.props.searchQuery) {
                this.setState({query: np.searchQuery});
            }
        }

        submit = () => {
            const {updateSearchQuery, history} = this.props;
            const {query} = this.state;
            updateSearchQuery(query);
            history.push('/list?query=' + query);
        };

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
    }
);
