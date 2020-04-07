import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import SinglePost from './SinglePost';
import CommentContainer from './comments/CommentContainer';
import CreateComment from './comments/CreateComment';
import { connect } from 'react-redux';
import { getFeed, likePost, clearAllPosts } from '../../actions/postActions';
import PostActions from '../../common/PostActions';
import PresentationLoader from '../../common/PresentationLoader';
import PostActionResult from '../../common/PostActionResult';

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
})

class Feed extends Component {
    constructor() {
        super();
        this.state = {
            start: 1,
            count: 4
        }
    }

    componentDidMount() {
        this.props.clearAllPosts();
        const { start, count } = this.state;
        const { id } = this.props.auth.user;
        this.props.getFeed(id, start, count);
    }

    handleLike = (postId) => {
        const { id } = this.props.auth.user;
        this.props.likePost(postId, id);
    }

    fetchData = () => {
        const { start, count } = this.state;
        this.setState({ start: start + Math.ceil(count / 2) });
        const { id } = this.props.auth.user;
        this.props.getFeed(id, start + Math.ceil(count / 2), count); // total count 4 , 2 of user and 2 of friends
    }

    checkUserLike = (post, user) => {
        return post.like && post.like.find(l => l.user === user.id);
    }


    render() {
        const { classes } = this.props;
        let { allPosts, hasMorePosts } = this.props.post;
        const { user } = this.props.auth;

        return (
            <div>
                <InfiniteScroll
                    dataLength={allPosts.length}
                    next={this.fetchData}
                    hasMore={hasMorePosts}
                    pullDownToRefresh={true}
                    refreshFunction={this.fetchData}
                    loader={<PresentationLoader />}>
                    {
                        (allPosts) ? allPosts.map(post => (
                            <Paper key={post._id} className={classes.root}>
                                <List className={classes.list}>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src={(post.createdBy.profileImage) ? post.createdBy.profileImage : 'images/blank.png'} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={post.createdBy.name}
                                        />
                                    </ListItem >
                                </List>
                                <SinglePost post={post} />
                                <div className={classes.actionsResult}>
                                    <PostActionResult
                                        actionsResultItem={classes.actionsResultItem}
                                        likeResultIcon={classes.likeResultIcon}
                                        like={post.like} />
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
                                </div>
                                <hr className={classes.divider} />
                                <div className={classes.commentSection}>
                                    <div className={classes.createComment}>
                                        <CreateComment postId={post._id} />
                                    </div>
                                    <div className={classes.comments}>
                                        {(post.comments && post.comments.length > 0) ?
                                            <CommentContainer comments={post.comments} />
                                            :
                                            <p>No comments to show</p>}
                                    </div>
                                </div>
                            </Paper>
                        )) :
                            <PresentationLoader />
                    }
                </InfiniteScroll>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post
})

export default connect(mapStateToProps, { getFeed, likePost, clearAllPosts })(withStyles(useStyles)(Feed));
