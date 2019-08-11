import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Input from '@material-ui/core/Input';
import { connect } from 'react-redux';
import axios from 'axios';
import {createComment} from '../../../actions/postActions';

const useStyles = makeStyles(theme => ({
    commentSection: {
        display: 'flex',
        padding: '12px 16px 8px 8px'
    },
    commentBox: {
        width: '100%',
        padding: '4px 20px',
        border: '1px solid #ccc',
        borderRadius: '25px'
    }
}));

function CreateComment(props) {
    const classes = useStyles();
    const { user } = props.auth;
    const { postId } = props;
    const [commentText, setCommentText] = useState('');
    const handleCommentText = (e) => {
        if (e.key === 'Enter') {
            setCommentText('');
            props.onCreateComment(user.id,postId,commentText)
        }
    }
    
    return (
        <div className={classes.commentSection}>
            <div>
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={'/' + user.profileImage} />
                </ListItemAvatar>
            </div>
            <div className={classes.commentBox}>
                <Input
                    fullWidth={true}
                    placeholder="Write a comment..."
                    disableUnderline={true}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyPress={(e) => handleCommentText(e)}
<<<<<<< HEAD
                    value={commentText}
=======
>>>>>>> d4b7a394787a9248ce27b16d5e143bb9be3c778e
                />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch =>({
    onCreateComment:(userId,postId,text)=>dispatch(createComment(userId,postId,text))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);
