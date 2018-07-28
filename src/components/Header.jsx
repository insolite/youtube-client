import React from 'react';
import {Link} from 'react-router-dom';
import cx from 'classnames';


export default props => {
    const {children, className, ...restProps} = props;
    return (
        <div className={cx(className, 'header')} {...restProps}>
            <div className="header-content">
                <Link to="/?query=">
                    <img className="logo" align="center" src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"/>
                </Link>
                {children}
            </div>
        </div>
    );
};
