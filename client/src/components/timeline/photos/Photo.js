import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CreateComment from '../../posts/comments/CreateComment';
import Comments from '../../posts/comments/Comments';
import PostActions from '../../../common/PostActions';
import { connect } from 'react-redux';
import { likePost } from '../../../actions/postActions';
import PostActionResult from '../../../common/PostActionResult';

const useStyles = makeStyles(theme => ({
    imageDetails: {
        width: '1200px',
        display: 'flex',
        overflow: 'hidden'
    },
    imageHolder: {
        width: '65%',
        background: 'black',
        height: 'inherit',
        display: 'block',
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
        overflow: 'auto'
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
        transition: 'all 0.5s',
        '&:hover': {
            cursor: 'pointer',
            transform: 'scale(1.1)',
            '& > *': {
                color: '#385898',
            }
        },
        '&:active': {
            transform: 'scale(0.9)'
        }
    },
    actionIcons: {
        margin: theme.spacing(-0.5, 0.5),
        color: '#385898'
    },
    takeAction: {
        margin: theme.spacing(-0.5, 0.5),
        color: '#e9eaed'
    },
    actionsResult: {
        padding: theme.spacing(1, 0),
        display: 'flex',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    actionsResultItem: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 0,
    },
    divider: {
        borderBottom: '1px solid #ddd',
        margin: '5px 7px 6px',
        paddingTop: '1px'
    },
    likeResultIcon: {
        margin: theme.spacing(-0.5, 0.5),
    },
}));

const Photo = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [image, setImage] = React.useState(null);
    const [userName, setUserName] = React.useState('');
    const { imageDetails, openPhoto, isImage } = props;
    const { user } = props.auth;

    React.useEffect(() => {
        if (open !== openPhoto) {
            setOpen(openPhoto);
            setImage(imageDetails.image);
            setUserName(imageDetails.createdBy.name);
        }
    })

    const handleClose = () => {
        setOpen(false)
        props.onclose();
    }

    const handleLike = (postId) => {
        const { id } = props.auth.user;
        props.likePost(postId, id);
    }

    const checkUserLike = (post, user) => {
        return post.like && post.like.find(l => l.user === user.id);
    }

    return (
        <div>
            <Dialog
                maxWidth="xl"
                open={open}
                onClose={handleClose}
            >
                <div className={classes.imageDetails}>

                    <div className={classes.imageHolder}>
                        {(isImage) ? <img
                            className={classes.image}
                            src={image}
                        /> :
                            <video
                                className={classes.image}
                                src={image}
                                controls />}
                    </div>

                    <div className={classes.aboutImage}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt={imageDetails.createdBy.name} src={(imageDetails.createdBy.profileImage) ? imageDetails.createdBy.profileImage : '/images/blank.png'} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={userName}
                            />
                        </ListItem >
                        <div className={classes.actionsResult}>
                            <PostActionResult
                                actionsResultItem={classes.actionsResultItem}
                                likeResultIcon={classes.likeResultIcon}
                                like={imageDetails.like} />
                        </div>
                        <hr className={classes.divider} />
                        <Paper className={classes.actionsList}>
                            <PostActions
                                actionItems={classes.actionItems}
                                actionIcons={classes.actionIcons}
                                takeAction={classes.takeAction}
                                postId={imageDetails._id}
                                post={imageDetails}
                                user={user}
                                handleLike={handleLike}
                                checkUserLike={checkUserLike}
                            />
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

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { likePost })(Photo);