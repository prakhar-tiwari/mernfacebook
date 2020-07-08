import React, { Component, Fragment } from 'react';
import CommentIcon from '@material-ui/icons/Comment';
import LikeIcon from '@material-ui/icons/ThumbUp';
import ShareIcon from '@material-ui/icons/Share';
import Typography from '@material-ui/core/Typography';

class PostActions extends Component {
    render() {
        const { actionItems, actionIcons, takeAction, postId, post, user, handleLike, checkUserLike } = this.props;
        return (
            <Fragment>
                <Typography
                    onClick={() => handleLike(postId)}
                    className={actionItems}>
                    <LikeIcon className={(checkUserLike(post, user)) ? actionIcons : takeAction} />
                    {checkUserLike(post, user) ? 'Unlike' : 'Like'}
                </Typography>
                <Typography className={actionItems}><CommentIcon className={actionIcons} />Comment</Typography>
                <Typography className={actionItems}><ShareIcon className={actionIcons} />Share</Typography>
            </Fragment>
        )
    }
}

export default PostActions;
