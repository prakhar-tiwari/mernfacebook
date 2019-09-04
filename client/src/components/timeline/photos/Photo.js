import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CommentIcon from '@material-ui/icons/Comment';
import LikeIcon from '@material-ui/icons/ThumbUp';
import ShareIcon from '@material-ui/icons/Share';
import CreateComment from '../../posts/comments/CreateComment';
import Comments from '../../posts/comments/Comments';

const useStyles = makeStyles(theme => ({
    openPhoto: {
    },
    imageDetails: {
        width: '1200px',
        height: '600px',
        display: 'flex',
    },
    imageHolder: {
        width: '65%',
        background: 'black',
        height: '100%',
        display: 'block',
        margin: 'auto'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    aboutImage: {
        width: '35%',
        height: '100%'
    },
    actionsList: {
        padding: theme.spacing(1, 2),
        display: 'flex',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
        justifyContent: 'space-around'
    },
    actionItems: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: theme.spacing(0, 2),
        '&:hover': {
            cursor: 'pointer'
        }
    },
    actionIcons: {
        margin: theme.spacing(-0.5, 0.5),
    }
}));

export default function Photo(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [image, setImage] = React.useState(null);
    const [userName, setUserName] = React.useState('');
    const { imageDetails, openPhoto } = props;

    React.useEffect(() => {
        if (open !== openPhoto) {
            setOpen(openPhoto);
            setImage('/'+imageDetails.image);
            setUserName(imageDetails.createdBy.name);
        }
    })

    function handleClose() {
        setOpen(false)
        props.onclose();
    }

    return (
        <div className={classes.dialog}>
            <Dialog
                maxWidth="xl"
                open={open}
                aria-labelledby="max-width-dialog-title"
                className={classes.openPhoto}
                onClose={handleClose}
            >
                <div className={classes.imageDetails}>

                    <div className={classes.imageHolder}>
                        <img
                            className={classes.image}
                            src={image}
                        />
                    </div>

                    <div className={classes.aboutImage}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={(imageDetails.createdBy.profileImage)?'/'+imageDetails.createdBy.profileImage:'/images/blank.png'} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={userName}
                            />
                        </ListItem >
                        <Paper className={classes.actionsList}>
                            <Typography className={classes.actionItems}><LikeIcon className={classes.actionIcons} color="primary" />Like</Typography>
                            <Typography className={classes.actionItems}><CommentIcon className={classes.actionIcons} color="secondary" />Comment</Typography>
                            <Typography className={classes.actionItems}><ShareIcon className={classes.actionIcons} color="primary" />Share</Typography>
                        </Paper>
                        {(imageDetails.comments) ? imageDetails.comments.map(comment => (
                            <Comments key={comment._id} comment={comment} />
                        )) : null}
                        <CreateComment postId={imageDetails._id} />
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
