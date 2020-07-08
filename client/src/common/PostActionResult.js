import React, { Fragment } from 'react';
import LikeIcon from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';

const PostActionResult = (props) => {
    const {actionsResultItem,likeResultIcon,like} = props;
    return (
        <Fragment>
            <Typography className={actionsResultItem}><LikeIcon className={likeResultIcon} color="primary" /></Typography>
            <Typography className={actionsResultItem}>{(like) ? like.length : 0}</Typography>
        </Fragment>
    )
}

export default PostActionResult;