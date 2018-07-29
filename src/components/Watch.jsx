import React from 'react';
import cx from 'classnames';
import {Link} from 'react-router-dom';
import TimeAgo from 'react-timeago';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons';
import {faHeart as faHeartRegular} from '@fortawesome/free-regular-svg-icons';


export default props => {
    const {
        url,
        title,
        description,
        tags,
        channelUrl,
        channelTitle,
        publishedAt,
        toggleFavorite,
        inFavorite,
        favoriteLoading,
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
                <button className={cx("watch-favorite", {'watch-favorite-on': inFavorite})}
                        onClick={toggleFavorite}
                >
                    <FontAwesomeIcon spin={favoriteLoading}
                                     icon={favoriteLoading ? faSpinner : (inFavorite ? faHeartSolid : faHeartRegular)}
                    />
                    &nbsp;{inFavorite ? 'Remove from favorite' : 'Add to favorite'}
                </button>
            </p>
            <p className="watch-description">
                {description}
            </p>
        </div>
    );
};
