import React from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Photo from '../timeline/photos/Photo';
import Popper from '@material-ui/core/Popper';

const useStyles = makeStyles(theme => ({
    postDescription: {
        "& p": {
            padding: theme.spacing(0, 2)
        },
        "& a": {
            textDecoration: 'none',
            padding: '0 2px',
            color: '#385898',
            "&:hover": {
                textDecoration: 'underline',
                cursor: 'pointer',
            }
        }
    },
    gridList: {
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        width: '100%',
        "& img": {
            backgroundPosition: 'initial',
            cursor: 'pointer',
            width: '100%',
            height: 'inherit'
        },
        "& video": {
            backgroundPosition: 'initial',
            cursor: 'pointer',
            width: '100%',
            height: 'inherit'
        }
    },
    images: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    arrowTag: {
        content: " ",
        position: 'absolute',
        left: '5%',
        bottom: '100%',
        borderWidth: '5px',
        borderStyle: 'solid',
        borderColor: 'transparent transparent black'
    },
    popperElement: {
        zIndex: 50,
        maxWidth: '300px',
        minWidth: '192px',
    },
    popperContent: {
        transform: 'translate3d(0, 11px, 0px)',
        background: '#000',
        color: '#fff',
        "& p:hover": {
            color: '#fff',
            background: '#385898',
            cursor: 'pointer'
        }
    },
})
)

function SinglePost(props) {
    const classes = useStyles();

    const [openPhoto, setOpenPhoto] = React.useState(false);
    const [isImage, setIsImage] = React.useState(false);
    const [imageDetails, setImageDetails] = React.useState(null);
    const [anchorE1, setAnchorE1] = React.useState(null);

    const { post } = props;
    const { images, videos } = post;
    const tags = post.tags;
    const tagsCount = tags.length - 1;
    const otherTags = tags.slice(1);


    function onPhotoClick(imagePost, imageId) {
        setOpenPhoto(true);
        setIsImage(true);
        let picPost;
        imagePost.images.find(image => {
            if (image._id === imageId) {
                picPost = {
                    _id: imagePost._id,
                    image: image.imageUrl,
                    createdBy: imagePost.createdBy,
                    comments: imagePost.comments,
                    like: imagePost.like,
                    profileImage: imagePost.profileImage,
                    userName: imagePost.userName
                }
            }
        });
        setImageDetails(picPost);
    }

    function onVideoClick(videoPost, videoId) {
        setOpenPhoto(true);
        setIsImage(false);
        let vidPost;
        videoPost.videos.find(video => {
            if (video._id === videoId) {
                vidPost = {
                    _id: videoPost._id,
                    image: video.videoUrl,
                    createdBy: videoPost.createdBy,
                    comments: videoPost.comments,
                    like: videoPost.like,
                    profileImage: videoPost.profileImage,
                    userName: videoPost.userName
                }
            }
        });
        setImageDetails(vidPost);
    }

    const handleTagPopper = (event) => {
        setAnchorE1((anchorE1) ? null : event.currentTarget);
    }

    const getFileData = (file) => {
        let data;
        if (file.length === 1) {
            data = file.map(image => {
                return {
                    ...image,
                    featured: true
                }
            });
        }
        else {
            data = file.map(image => {
                return {
                    ...image,
                    featured: false
                }
            });
        }
        return data;
    }

    let imageUrls = (images) ? getFileData(images) : [],
        videoUrls = (videos) ? getFileData(videos) : [];

    var openTag = Boolean(anchorE1);

    return (
        <div key={post._id} className={classes.postDescription}>
            <Typography component="div" style={{ textAlign: 'left' }}>
                <p>{post.text}</p>
                {(tags.length === 1) ? <p>- with <a href="#">{tags[0].user.name}</a></p> : (tags.length > 1) ? <p>- with <a href="#">{tags[0].user.name}</a> and <a onClick={handleTagPopper}>{tagsCount} others</a></p> : null}
                <Popper className={classes.popperElement}
                    anchorEl={anchorE1}
                    open={openTag}
                    placement='bottom-start'
                    disablePortal={true}
                    modifiers={
                        {
                            flip: {
                                enabled: false,
                            },
                            preventOverflow: {
                                enabled: false,
                                boundariesElement: 'scrollParent',
                            },
                        }
                    } >
                    <div className={classes.popperContent} >
                        <div className={classes.arrowTag} > </div>
                        {otherTags.map(oTag => (
                            <Typography key={oTag.user._id} className={classes.typography} > {oTag.user.name} </Typography>)
                        )}
                    </div>
                </Popper>
            </Typography>
            <div className={classes.images}>
                <GridList className={classes.gridList}>
                    {(imageUrls) ? imageUrls.map(image => (
                        <GridListTile cols={image.featured ? 2 : 1} rows={image.featured ? 2 : 1} key={image._id}>
                            <img onClick={() => onPhotoClick(post, image._id)} src={(image.imageUrl)?`/${image.imageUrl}`:'/images/404.png'} />
                        </GridListTile>
                    )) :
                        null}
                    {(videoUrls) ? videoUrls.map(video => (
                        <GridListTile cols={video.featured ? 2 : 1} rows={video.featured ? 2 : 1} key={video._id}>
                            <video onClick={() => onVideoClick(post, video._id)} src={(video.videoUrl)?`/${video.videoUrl}`:'/images/404.png'} />
                        </GridListTile>
                    )) :
                        null}
                </GridList>
                {(openPhoto) ? <Photo isImage={isImage} openPhoto={openPhoto} imageDetails={imageDetails} onclose={() => {
                    setOpenPhoto(false)
                }} /> : null}
            </div>
        </div>
    )
}

export default SinglePost;
