import React from 'react';


export default props => {
    const {url, ...restProps} = props;
    return (
        <iframe id="ytplayer"
                width="640"
                height="360"
                src={url}
                allow="autoplay; encrypted-media"
                allowFullScreen="1"
                frameBorder="0"
                {...restProps}
        />
    );
};
