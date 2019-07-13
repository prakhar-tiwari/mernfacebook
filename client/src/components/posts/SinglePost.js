import React from 'react';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Photo from '../timeline/photos/Photo';

const useStyles = makeStyles(theme => ({
    postDescription: {
        "& p": {
            padding: theme.spacing(0, 2)
        },
        "& a":{
            textDecoration:'none',
            padding:'0 2px',
            color:'#385898',
            "&:hover":{
                textDecoration:'underline'
            }
        }
    },
    gridList: {
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        "& img":{
            backgroundPosition:'initial'
        }
      },
    images: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
      },
})
)

export default function SinglePost(props) {
    const classes = useStyles();

    const [openPhoto,setOpenPhoto]=React.useState(false);
    const [imageDetails,setImageDetails]=React.useState(null);

    const { post } = props;
    const { images } = post;
    const tags=post.tags;
    const tagsCount=tags.length-1;
    const otherTags=tags.slice(1);

    function onPhotoClick(image){
        setOpenPhoto(true);
        setImageDetails(image);
    }
    
    let imageUrls;
    if (images.length === 1) {
        imageUrls = images.map(image => {
            return {
                _id: image._id,
                imageUrl: "http://localhost:8080/" + image.imageUrl.replace("\\", "/"),
                featured: true
            }
        });
    }
    else {
        imageUrls = images.map(image => {
            return {
                _id: image._id,
                imageUrl: "http://localhost:8080/" + image.imageUrl.replace("\\", "/"),
                featured: false
            }
        });
    }
    return (
        <div className={classes.postDescription}>
            <Typography component="p" style={{ textAlign: 'left' }}>
                {post.text} - with <a href="#">{tags[0].name}</a> and <a href="#">{tagsCount} others</a>
            </Typography>
            <div className={classes.images}>
                <GridList cellHeight={200} className={classes.gridList}>
                    {imageUrls.map(image => (
                        <GridListTile cols={image.featured ? 2 : 1} rows={image.featured ? 2 : 1} key={image._id}>
                            <img onClick={()=>onPhotoClick(image.imageUrl)} src={image.imageUrl} />
                        </GridListTile>
                    ))}
                </GridList>
                <Photo openPhoto={openPhoto} imageDetails={imageDetails} onclose={()=>{
                        setOpenPhoto(false)
                    }}/>
            </div>
        </div>
    )
}
