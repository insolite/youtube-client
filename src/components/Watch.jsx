import React from 'react';
import {Link} from 'react-router-dom';
import TimeAgo from 'react-timeago';


export default props => {
    const {
        url,
        title,
        description,
        tags,
        channelUrl,
        channelTitle,
        publishedAt,
        ...restProps,
    } = props;
    const tagsString = tags ? tags.map(tag => `#${tag}`).join(', ') : '';
    return (
        <div className="watch">
            <div className="player">
                <iframe src={url}
                        allow="autoplay; encrypted-media"
                        allowFullScreen="1"
                        frameBorder="0"
                        {...restProps}
                />
            </div>
            <p className="watch-tags" title={tagsString}>
                {tagsString}
            </p>
            <p className="watch-title">{title}</p>
            <p className="watch-upload">
                <span>{channelTitle && 'Uploaded by'}</span>&nbsp;
                <a href={channelUrl} target="_blank">{channelTitle}</a>&nbsp;
                {publishedAt && <TimeAgo date={publishedAt}/>}
            </p>
            <p className="watch-description">
                {description}
            </p>
        </div>
    );
};
