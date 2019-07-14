import React from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Photo from '../timeline/photos/Photo';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';

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
                cursor:'pointer',
            }
        }
    },
    gridList: {
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        "& img": {
            backgroundPosition: 'initial'
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

export default function SinglePost(props) {
    const classes = useStyles();

    const [openPhoto, setOpenPhoto] = React.useState(false);
    const [imageDetails, setImageDetails] = React.useState(null);
    const [anchorE1, setAnchorE1] = React.useState(null);

    const { post } = props;
    const { images } = post;
    const tags = post.tags;
    const tagsCount = tags.length - 1;
    const otherTags = tags.slice(1);

    function onPhotoClick(image) {
        setOpenPhoto(true);
        setImageDetails(image);
    }

    const handleTagPopper = (event) => {
        setAnchorE1((anchorE1)?null:event.currentTarget);
    }


    let imageUrls;
    if (images.length === 1) {
        imageUrls = images.map(image => {
            return {
                _id: image._id,
                imageUrl: image.imageUrl.replace("\\", "/"),
                featured: true
            }
        });
    }
    else {
        imageUrls = images.map(image => {
            return {
                _id: image._id,
                imageUrl: image.imageUrl.replace("\\", "/"),
                featured: false
            }
        });
    }
    var openTag = Boolean(anchorE1);

    return (
        <div className={classes.postDescription}>
            <Typography component="div" style={{ textAlign: 'left' }}>
                <p>{post.text}</p>
                {(tags.length>0)?<p>- with <a href="#">{tags[0].name}</a> and <a onClick={handleTagPopper}>{tagsCount} others</a></p>:null}
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
                            <Typography key={oTag._id} className={classes.typography} > {oTag.name} </Typography>)
                        )}
                    </div>
                </Popper>
            </Typography>
            <div className={classes.images}>
                <GridList cellHeight={200} className={classes.gridList}>
                    {imageUrls.map(image => (
                        <GridListTile cols={image.featured ? 2 : 1} rows={image.featured ? 2 : 1} key={image._id}>
                            <img onClick={() => onPhotoClick(image.imageUrl)} src={image.imageUrl} />
                        </GridListTile>
                    ))}
                </GridList>
                <Photo openPhoto={openPhoto} post={post} imageDetails={imageDetails} onclose={() => {
                    setOpenPhoto(false)
                }} />
            </div>
        </div>
    )
}
