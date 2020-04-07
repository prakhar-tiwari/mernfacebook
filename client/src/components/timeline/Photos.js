import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import CameraIcon from '@material-ui/icons/CameraFront';
import Icon from '@material-ui/core/Icon';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Photo from './photos/Photo';

const useStyles = theme => ({
    photos: {
        marginTop: theme.spacing(2),
        background: '#fff',
        border: '1px solid #ccd0d5',
        borderRadius: '3px',
        marginBottom: '10px'
    },
    photosHeader: {
        background: '#f5f6f7',
        borderBottom: '1px solid #d3d6db',
        borderRadius: '2px 2px 0 0',
        marginBottom: '15px',
        paddingTop: '16px'
    },
    headerContent: {
        fontSize: '20px',
        fontWeight: 'bold',
        height: '32px',
        margin: '0 12px 5px',
        lineHeight: 1,
        '& a': {
            color: '#4b4f56',
            textDecoration: 'none',
            verticalAlign: 'text-top'
        }
    },
    cameraIcon: {
        color: '#969292',
    },
    pictureGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        height: 450,
        "& img": {
            cursor: 'pointer'
        },
        "& video": {
            cursor: 'pointer',
            width:'100%',
            height:'100%'
        }
    },
})

class Photos extends Component {
    constructor(){
        super();
        this.state={
            openPhoto:false,
            isImage:false,
            imageDetails:null
        }
    }

    onPhotoClick=(image)=>{
        this.setState({
            openPhoto:true,
            imageDetails:image,
            isImage:true
        })
    }
    onVideoClick=(video)=>{
        this.setState({
            openPhoto:true,
            imageDetails:video,
            isImage:false
        })
    }

    render() {
        const { classes } = this.props;
        const { user } = this.props.auth;
        const { allPosts } = this.props.post;
        const picturePost = allPosts.filter(post => post.images && post.images.length > 0)
        .map(post => {
            return post.images.map(image => {
                return {
                    _id: post._id,
                    image: image.imageUrl,
                    createdBy: post.createdBy,
                    comments: post.comments,
                    like: post.like,
                    profileImage: post.profileImage,
                    userName: post.userName
                }
            })
        }).flat(1);
        const videoPost = allPosts.filter(post => post.videos && post.videos.length > 0)
        .map(post => {
            return post.videos.map(image => {
                return {
                    _id: post._id,
                    video: image.videoUrl,
                    createdBy: post.createdBy,
                    comments: post.comments,
                    like: post.like,
                    profileImage: post.profileImage,
                    userName: post.userName
                }
            })
        }).flat(1);
        return (
            <div className={classes.photos}>
                <div className={classes.photosHeader}>
                    <h3 className={classes.headerContent}>
                        <Icon>
                            <CameraIcon className={classes.cameraIcon} />
                        </Icon>
                        <Link to={`/${user.userName}/photos`}>Photos</Link>
                    </h3>
                </div>
                <div className={classes.pictureGrid}>
                    <GridList className={classes.gridList} cols={4}>
                        {picturePost.map(post => (
                            <GridListTile key={post._id} cols={1}>
                                <img onError={(e) => { e.target.src='images/404.png' }} onClick={()=>this.onPhotoClick(post)} src={post.image} />
                            </GridListTile>
                        ))}
                        {videoPost.map(post => (
                            <GridListTile key={post._id} cols={1}>
                                <video onError={(e) => { e.target.src='images/404.png' }} onClick={()=>this.onVideoClick(post)} src={post.video} />
                            </GridListTile>
                        ))}
                    </GridList>
                    {(this.state.openPhoto) 
                    ? <Photo 
                    isImage={this.state.isImage}
                    openPhoto={this.state.openPhoto} 
                    imageDetails={this.state.imageDetails} 
                    onclose={()=>this.setState({openPhoto:false})} /> 
                    : null}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post,
    profile: state.profile
})

export default connect(mapStateToProps)(withStyles(useStyles)(withRouter(Photos)));
