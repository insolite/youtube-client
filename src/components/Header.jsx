import React from 'react';
import {Link} from 'react-router-dom';
import cx from 'classnames';

import logo from '../layout/images/logo.svg';


export default props => {
    const {children, className, ...restProps} = props;
    return (
        <div className={cx(className, 'header')} {...restProps}>
            <div className="header-content">
                <Link to="/">
                    <svg align="center" className="logo">
                        <use xlinkHref={`#${logo.id}`}/>
                    </svg>
                </Link>
                {children}
            </div>
        </div>
    );
};
