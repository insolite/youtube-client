import React from 'react';
import cx from 'classnames';


export default props => {
    const {className, title, imageUrl, videoId, ...restProps} = props;
    return (
        <div className={cx(className, 'thumbnail')} {...restProps}>
            <img src={imageUrl} align="top"/>
            <div className="thumbnail-title" title={title}>{title}</div>
        </div>
    );
};
