import React from 'react';
import {Link} from 'react-router-dom';


export default props => {
    const {className} = props;
    return (
        <div className={cx(className, 'thumbnail')}>
            thumbnail
        </div>
    );
};
