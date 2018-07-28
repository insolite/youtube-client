import React from 'react';


export default props => {
    const {url, ...restProps} = props;
    return (
        <div className="player">
            <iframe src={url}
                    allow="autoplay; encrypted-media"
                    allowFullScreen="1"
                    frameBorder="0"
                    {...restProps}
            />
        </div>
    );
};
