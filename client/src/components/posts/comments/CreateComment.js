import React from 'react';
import { makeStyles } from '@material-ui/core';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Input from '@material-ui/core/Input';
import {connect} from 'react-redux';

const useStyles = makeStyles(theme => ({
    commentSection: {
        display: 'flex',
        padding:'0 8px'
    },
    commentBox:{
        width:'100%',
        padding:'4px 20px',
        border:'1px solid #ccc',
        borderRadius:'25px'
    }
}));

function CreateComment(props) {
    const classes = useStyles();
    const {user}=props.auth;
    return (
        <div className={classes.commentSection}>
            <div>
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={'/'+user.profileImage} />
                </ListItemAvatar>
            </div>
            <div className={classes.commentBox}>
                <Input
                    fullWidth={true}
                    placeholder="Write a comment..."
                    disableUnderline={true}
                />
            </div>
        </div>
    )
}

const mapStateToProps=state=>({
    auth:state.auth
})

export default connect(mapStateToProps)(CreateComment);
