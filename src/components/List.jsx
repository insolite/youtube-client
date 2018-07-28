import React from 'react';
import cx from 'classnames';


export default props => {
    const {children, className, ...restProps} = props;
    return (
        <div className={cx(className, 'list')} {...restProps}>
            {children}
        </div>
    );
};
