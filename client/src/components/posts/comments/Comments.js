import React from 'react';
import { makeStyles } from '@material-ui/core';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CommentIcon from '@material-ui/icons/Comment';
import LikeIcon from '@material-ui/icons/ThumbUp';

const useStyles = makeStyles(theme => ({
    commentSection: {
        padding: '0 8px'
    },
    message: {
        display: 'flex',
        width: '100%',
        position: 'relative',
        minHeight: '10px',
        wordBreak: 'break-all',
        textAlign: 'left',
        fontSize: '11px',

    },
    messageBody: {
        width: '100%',
        padding: '4px',
        "& p a": {
            color: '#385898',
            fontWeight: 'bold',
            "&:hover": {
                cursor: 'pointer',
                textDecoration: 'underline'
            }
        },
        "& p": {
            background: '#f2f3f5',
            borderRadius: '45px',
            padding: '8px 16px',
            fontSize: '15px',
            lineHeight: '1.2em'
        }
    },
    actionsList: {
        padding: theme.spacing(0, 2),
        display: 'flex',
        maxWidth: '100%',
        "& a": {
            color: '#385898',
            fontSize:'14px',
            padding: '0 4px',
            "&:hover": {
                cursor: 'pointer',
                textDecoration: 'underline'
            }
        }
    },
}));

export default function Comments(props) {
    const classes = useStyles();
    const {comment} = props;
    return (
        <div>
            <div className={classes.commentSection}>
                <div className={classes.message}>
                    <ListItemAvatar>
                        <Avatar alt={comment.from.name} src={(comment.from.profileImage)?'/'+comment.from.profileImage:'/images/blank.png'} />
                    </ListItemAvatar>
                    <div className={classes.messageBody}>
                        <Typography component="p"><a>{comment.from.name}</a> {comment.text}</Typography>
                        <div className={classes.actionsList}>
                            <a>Like</a>
                            <a>Reply</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
