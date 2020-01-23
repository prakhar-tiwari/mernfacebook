import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setTimeLineUser } from '../../actions/profileActions';
import UserAbout from './about/UserAbout';
import CreatePost from '../posts/CreatePost';
import PhotoGrid from './photos/PhotoGrid';
import FriendGrid from './friends/FriendGrid';
import SinglePost from '../posts/SinglePost';
import CommentIcon from '@material-ui/icons/Comment';
import LikeIcon from '@material-ui/icons/ThumbUp';
import ShareIcon from '@material-ui/icons/Share';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CreateComment from '../posts/comments/CreateComment';
import Comments from '../posts/comments/Comments';
import { likePost, getFeed, clearAllPosts } from '../../actions/postActions';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PostActions from '../../common/PostActions';

const useStyles = theme => ({
    timeline: {
        width: '85%',
        marginLeft: '5%'
    },
    timeLineCover: {
        borderRadius: '2px'
    },
    coverPhoto: {
        width: '100%',
        height: 'auto',
        "& > img": {
            width: '100%',
            height: '400px',
            border: '1px solid #888888',
            boxShadow: '1px 1px #888888',
        }
    },
    profilePicture: {
        transform: 'translate(-35%,-80%)',
        position: 'absolute',
        left: '10%',
        "&  img": {
            padding: theme.spacing(0.25, 0.25),
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            border: '2px solid #fff',
            background: '#fff',
            zIndex: 100
        }
    },
    uploadPhotoDiv: {
        bottom: '10px',
        left: '5px',
        overflow: 'hidden',
        width: '200px',
        position: 'absolute',
    },
    updatePhoto: {
        background: 'linear-gradient( transparent, rgba(0, 0, 0, .6) 0%, rgba(0, 0, 0, .6) 100% )',
        width: '100%',
        borderBottomLeftRadius: '90px',
        borderBottomRightRadius: '90px',
        height: '90px',
        textAlign: 'center',
        color: '#fff',
        cursor: 'pointer',
        transition: '0.3s'
    },
    uploadImageInput: {
        display: 'none'
    },
    timeLineNav: {
        paddingLeft: '30%',
        borderRadius: 'none',
        background: '#fff'
    },
    navList: {
        margin: 0,
        padding: 0,
        display: 'flex',
        listStyleType: 'none',
        borderLeft: '1px solid #e9eaed',
    },
    listItem: {
        borderRight: '1px solid #e9eaed',
        height: '43px',
        lineHeight: 3.05,
        padding: '17px 17px',
        position: 'relative',
        verticalAlign: 'middle',
        whiteSpace: 'nowrap',
        color: '#385898',
        cursor: 'pointer',
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: 600
    },
    totalFriends: {
        color: '#89919c',
        fontSize: '11px',
        fontWeight: 'normal',
        paddingLeft: '6px',
    },
    pageDetails: {
        marginTop: theme.spacing(2)
    },
    RightContent: {
        marginLeft: '20px',
        width: '120%'
    },
    photoGrid: {
        marginTop: theme.spacing(2)
    },
    friendGrid: {
        marginTop: theme.spacing(2)
    },
    actionContainer: {
        width: '50%',
        position: 'absolute'
    },
    interactingActions: {
        position: 'absolute',
        display: 'flex',
        padding: '0px 12px',
        bottom: '20px',
        left: '30%',
        "& div a": {
            padding: '4px 16px',
            background: '#e9eaed',
            border: '1px solid #ccd0d5',
            cursor: 'pointer'
        }
    },
    otherActions: {
        marginLeft: theme.spacing(1),
        display: 'flex'
    },
    typography: {
        padding: '8px 16px 4px 22px',
        fontSize: '14px',
    },
    arrowFriend: {
        content: " ",
        position: 'absolute',
        left: '5%',
        bottom: '100%',
        borderWidth: '10px',
        borderStyle: 'solid',
        borderColor: 'transparent transparent white'
    },
    arrowFollow: {
        content: " ",
        position: 'absolute',
        right: '5%',
        bottom: '100%',
        borderWidth: '10px',
        borderStyle: 'solid',
        borderColor: 'transparent transparent white'
    },
    popperElement: {
        zIndex: 50,
        maxWidth: '300px',
        minWidth: '192px',
    },
    popperContent: {
        transform: 'translate3d(0, 11px, 0px)',
        "& p:hover": {
            color: '#fff',
            background: '#385898',
            cursor: 'pointer'
        }
    },
    divider: {
        borderBottom: '1px solid #ddd',
        margin: '5px 7px 6px',
        paddingTop: '1px'
    },
    postItems: {
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
        transition:'all 0.5s',
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
        color: '#385898',
    },
    takeAction: {
        margin: theme.spacing(-0.5, 0.5),
        color: '#e9eaed'
    },
    likeResultIcon: {
        margin: theme.spacing(-0.5, 0.5),
    },
    commentSection: {
        marginTop: theme.spacing(1)
    },
    createComment: {
        marginTop: theme.spacing(2)
    },
    comments: {
        marginTop: theme.spacing(1)
    },
    divider: {
        borderBottom: '1px solid #ddd',
        margin: '5px 7px 6px',
        paddingTop: '1px'
    }
});

class TimeLine extends Component {

    handleLike = (postId) => {
        const { id } = this.props.auth.user;
        this.props.likePost(postId, id);
    }

    componentDidMount() {
        this.props.clearAllPosts();
        this.props.getFeed();
    }

    checkUserLike = (post, user) => {
        return post.like && post.like.find(l => l.user === user.id);
    }

    render() {
        const { classes } = this.props;
        const { user } = this.props.auth;
        const allPosts = this.props.post.allPosts;
        const { friends } = this.props.profile;
        return (
            <div className={classes.pageDetails} >
                <Grid container spacing={0} >
                    <Grid item xs={5} >
                        <div className={classes.leftContent} >
                            <div className={classes.userAbout} >
                                <UserAbout />
                            </div>
                            <div className={classes.photoGrid} >
                                <PhotoGrid posts={allPosts} />
                            </div>
                            <div className={classes.friendGrid} >
                                <FriendGrid friends={friends} />
                            </div>

                        </div>
                    </Grid>

                    <Grid item xs={7} >
                        <div className={classes.RightContent} >
                            <div className={classes.CreatePost} >
                                <CreatePost />
                            </div>
                            {allPosts.length > 0 ? allPosts.map(post => (
                                <Paper key={post._id} className={classes.postItems}>
                                    <List className={classes.list}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src={'/' + post.createdBy.profileImage} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={post.createdBy.name}
                                            />
                                        </ListItem >
                                    </List>
                                    <SinglePost post={post} />
                                    <div className={classes.actionsResult}>
                                        <Typography className={classes.actionsResultItem}><LikeIcon className={classes.likeResultIcon} color="primary" /></Typography>
                                        <Typography className={classes.actionsResultItem}>{(post.like) ? post.like.length : 0}</Typography>
                                    </div>
                                    <hr className={classes.divider} />
                                    <div className={classes.actionsList}>
                                        <PostActions
                                            actionItems={classes.actionItems}
                                            actionIcons={classes.actionIcons}
                                            takeAction={classes.takeAction}
                                            postId={post._id}
                                            post={post}
                                            user={user}
                                            handleLike={this.handleLike}
                                            checkUserLike={this.checkUserLike}
                                        />
                                        {/* <Typography onClick={() => this.handleLike(post._id)} className={classes.actionItems}><LikeIcon className={(post.like && post.like.find(l => l.user === user.id)) ? classes.actionIcons : classes.takeAction} />Like</Typography>
                                        <Typography className={classes.actionItems}><CommentIcon className={classes.actionIcons} />Comment</Typography>
                                        <Typography className={classes.actionItems}><ShareIcon className={classes.actionIcons} />Share</Typography> */}
                                    </div>
                                    <hr className={classes.divider} />
                                    <div className={classes.commentSection}>
                                        <div className={classes.createComment}>
                                            <CreateComment postId={post._id} />
                                        </div>
                                        <div className={classes.comments}>
                                            {(post.comments) ?
                                                post.comments.map(comment => (
                                                    <Comments key={`timeline/${post._id}-${comment._id}`} comment={comment} />
                                                ))
                                                : null}
                                        </div>
                                    </div>
                                </Paper>
                            )) : null}

                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post,
    profile: state.profile
})

export default connect(mapStateToProps, { setTimeLineUser, likePost, getFeed, clearAllPosts })(withStyles(useStyles)(withRouter(TimeLine)));
