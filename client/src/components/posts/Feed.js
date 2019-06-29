import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import SinglePost from './SinglePost';
import CommentIcon from '@material-ui/icons/Comment';
import LikeIcon from '@material-ui/icons/ThumbUp';
import ShareIcon from '@material-ui/icons/Share';
import Typography from '@material-ui/core/Typography';

const useStyles = theme => ({
    root: {
        marginTop: theme.spacing(5),
        display: 'block',
        width: '80%'
    },
    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    post: {
        width: '100%'
    },
    actionsList:{
        padding: theme.spacing(1, 2),
        display:'flex',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
        justifyContent:'space-around'
    },
    actionItems:{
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        padding: theme.spacing(0, 2),
        '&:hover':{
            cursor:'pointer'
        }
    },
    actionIcons:{
        margin:theme.spacing(-0.5,0.5),
    }
})

class Feed extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.root}>
                    <List className={classes.list}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="images/flash.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="The Flash"
                            />
                        </ListItem >
                    </List>
                    <SinglePost />
                    <Paper className={classes.actionsList}>
                         <Typography className={classes.actionItems}><LikeIcon className={classes.actionIcons} color="primary" />Like</Typography>
                         <Typography className={classes.actionItems}><CommentIcon className={classes.actionIcons} color="secondary" />Comment</Typography>
                         <Typography className={classes.actionItems}><ShareIcon className={classes.actionIcons} color="primary" />Share</Typography>
                    </Paper>
                </Paper>
            </div>
        )
    }
}

export default withStyles(useStyles)(Feed);
