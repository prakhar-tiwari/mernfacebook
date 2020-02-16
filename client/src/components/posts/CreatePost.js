import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';
import PostIcon from '@material-ui/icons/LocalPostOffice';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import PhotoCamera from '@material-ui/icons/CloudUpload';
import PeopleIcon from '@material-ui/icons/PeopleTwoTone';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import PlusIcon from '@material-ui/icons/Add';
import { Icon } from '@material-ui/core';
import { connect } from 'react-redux';
import TagFriends from './TagFriends';
import { submitPost } from '../../actions/postActions';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'block',
        width: '80%',
    },
    postHeader: {
        padding: theme.spacing(0, 2),
        height: theme.spacing(4),
        textAlign: 'left',
        background: '#f5f6f7',
        borderRadius: '4px',
        lineHeight: '2rem'
    },
    paper: {
        padding: theme.spacing(3, 2),
        position: 'relative'
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    chip: {
        marginTop: theme.spacing(2),
        background: '#e9eaed',
        fontWeight: 'bold',
        color: '#385898',
        height: theme.spacing(5),
        transition: '0.5s all',
        "&:hover": {
            cursor: 'pointer',
            background: '#c4c5c7',
        }
    },
    postButton: {
        width: '50%',
        marginTop: theme.spacing(2)
    },
    postIcon: {
        marginLeft: theme.spacing(2),
        transition: '0.5s all'
    },
    input: {
        display: 'none',
    },
    card: {
        width: '100%',
    },
    media_image: {
        paddingTop: '56.25%', // 16:9
        backgroundPosition: 'initial'
    },
    media_video: {
        width: 'inherit',
        "& video": {
            width: 'inherit'
        }
    },
    imagePreviewBox: {
        display: 'flex',
        width: '100%',
        padding: '8px 8px',
        overflowX: 'auto'
    },
    imageBox: {
        minWidth: '100px',
        minHeight: '100px',
        marginLeft: '10px',
        maxWidth: '100px',
        maxHeight: '100px',
        "& img": {
            width: '100%',
            height: '100%'
        },
        "& video": {
            width: '100%',
            height: '100%'
        }
    },
    uploadImageBox: {
        minWidth: '100px',
        minHeight: '100px',
        background: '#fff',
        border: '2px dashed #e9eaed',
        marginLeft: '10px',
        maxWidth: '100px',
        maxHeight: '100px',
        "&:hover": {
            cursor: 'pointer',
            background: '#e9eaed'
        },
        "& span svg": {
            marginTop: '50%',
            marginLeft: '50%',
            transform: 'translate(-50%,-50%)'
        }
    },
    firstDivider: {
        marginTop: '24px',
        lineHeight: '1px'
    },
    secondDivider: {
        marginTop: '8px',
        lineHeight: '1px'
    },
    emojiPicker: {
        position: 'absolute',
        zIndex: 1000,
        marginTop: '10px'
    }
}));

function CreatePost(props) {
    const classes = useStyles();
    const [postText, setPostText] = useState('');
    const [postFiles, setPostFiles] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [imageName, setImageName] = useState('');
    const [uploadedImages, setUploadedImages] = useState([]);
    const [uploadedVideos, setUploadedVideos] = useState([]);
    const [tagFriends, setTagFriends] = useState(false);
    const [taggedFriends, setTaggedFriends] = useState([]);
    const [chosenEmoji, setChosenEmoji] = useState('');
    const [showEmoji, setShowEmoji] = useState(false);

    const onImageChange = (event) => {
        var file = event.target.files[0];
        if (file) {
            const fileType = file.type;
            const fileArr = [...postFiles];
            fileArr.push(file);
            setPostFiles(fileArr);
            if (fileType.includes('image')) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = (event) => {
                    setVideoPreview(null)
                    setImagePreview(reader.result);
                    setImageName(file.name);
                    const imageDetails = {
                        imageSrc: reader.result,
                        name: file.name
                    }
                    const updatedImages = [...uploadedImages];
                    updatedImages.unshift(imageDetails);
                    setUploadedImages(updatedImages);
                }
            }
            if (fileType.includes('video')) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = (event) => {
                    setImagePreview(null)
                    setVideoPreview(reader.result);
                    const videoDetails = {
                        videoSrc: reader.result,
                        name: file.name
                    }
                    const updatedVideos = [...uploadedVideos];
                    updatedVideos.unshift(videoDetails);
                    setUploadedVideos(updatedVideos);
                }
            }
        }
    }

    const submitPost = (e) => {
        e.preventDefault();
        const { user } = props.auth;
        const taggedFIds = (taggedFriends) ? taggedFriends.map(tFriend => tFriend.id) : null;
        let formData = new FormData();
        formData.append('postText', postText);
        postFiles.map(postFile => {
            formData.append('fileImages', postFile);
        })
        formData.append('userId', user.id);
        formData.append('taggedFriends', JSON.stringify(taggedFIds));
        props.submitPost(formData);
        setImagePreview(null);
        setVideoPreview(null);
        setPostFiles([]);
        setPostText('');
        setTagFriends(false);
        setTaggedFriends([]);
        setImageName('');
        setUploadedImages([]);
        setUploadedVideos([]);
    }

    const handleTagging = (selectedFriends) => {
        setTaggedFriends(selectedFriends);
    }

    const onEmojiClick = (event) => {
        const emoji = event.native;
        const text = (postText) ? `${postText}${emoji}` : emoji;
        setPostText(text);
    }

    return (
        <div className={classes.root}>
            <div className={classes.postHeader}>
                Create Post
            </div>
            <Paper className={classes.paper}>
                <Input
                    placeholder="Write something here..."
                    multiline={true}
                    fullWidth
                    disableUnderline={true}
                    onChange={(e) => setPostText(e.target.value)}
                    value={postText}
                />
                {
                    (imagePreview != null) ?
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.media_image}
                                image={imagePreview}
                                title={imageName}
                            />
                        </Card> :
                        null
                }

                {
                    (videoPreview != null) ?
                        <Card className={classes.card}>
                            <CardMedia className={classes.media_video}>
                                <video src={videoPreview} controls></video>
                            </CardMedia>
                        </Card> :
                        null
                }

                {(tagFriends) ? <Divider className={classes.firstDivider} /> : null}

                {(tagFriends) ? <TagFriends taggedFriends={handleTagging} /> : null}

                <Divider className={classes.secondDivider} />
                {(uploadedImages.length > 0) ?
                    <div className={classes.imagePreviewBox}>
                        {uploadedImages.map((image, index) => (
                            <div key={index} className={classes.imageBox}>
                                <img src={image.imageSrc} alt={image.name} />
                            </div>
                        ))}
                        {uploadedVideos.map((video, index) => (
                            <div key={index} className={classes.imageBox}>
                                <video src={video.videoSrc} />
                            </div>
                        ))}

                        <input onChange={onImageChange} className={classes.input} id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                            <div className={classes.uploadImageBox}>
                                <Icon><PlusIcon /></Icon>
                            </div>
                        </label>
                    </div>
                    :
                    null
                }
                <div className={classes.footer}>
                    <input onChange={onImageChange} className={classes.input} id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">

                        <Chip
                            icon={<PhotoCamera />}
                            label="Upload File"
                            color="primary"
                            className={classes.chip}
                        />

                    </label>
                    <label onClick={() => setTagFriends(!tagFriends)} htmlFor="">
                        <Chip
                            icon={<PeopleIcon />}
                            label="Tag Friends"
                            color="primary"
                            className={classes.chip}

                        />
                    </label>

                    <label>
                        <Chip
                            onClick={() => setShowEmoji(!showEmoji)} htmlFor=""
                            label="😀"
                            color="primary"
                            className={classes.chip}
                        />
                        {(showEmoji) ? <Picker style={{ position: 'absolute', zIndex: 1000, transform: 'translate(-50%,20%)' }} onSelect={(e) => onEmojiClick(e)} /> : null}
                    </label>
                    <Button
                        disabled={(postText || postFiles.length > 0) ? false : true}
                        onClick={submitPost}
                        className={classes.postButton} variant="contained" color="primary">
                        Post<PostIcon className={classes.postIcon} />
                    </Button>
                </div>
            </Paper>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post
})

export default connect(mapStateToProps, { submitPost })(CreatePost);
