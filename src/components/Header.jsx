import React from 'react';
import cx from 'classnames';


export default props => {
    const {children, className} = props;
    return (
        <div className={cx(className, 'header')}>
            {children}
        </div>
    );
};
