import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';
import PostIcon from '@material-ui/icons/LocalPostOffice';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import PhotoCamera from '@material-ui/icons/CloudUpload';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';

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
        borderRadius: '4px'
    },
    paper: {
        padding: theme.spacing(3, 2),
        position: 'relative'
    },
    footer: {
        display: 'flex',
        justifyContent:'space-around'
    },
    chip:{
        marginTop:theme.spacing(2),
        background:'#e9eaed',
        fontWeight:'bold',
        color:'#385898',
        height:theme.spacing(5),
        "&:hover":{
            cursor:'pointer',
        }
    },
    postButton: {
        width: '70%',
        marginTop: theme.spacing(2)
    },
    postIcon: {
        marginLeft: theme.spacing(2)
    },
    input: {
        display: 'none',
    },
    card: {
        width: '100%',
    },
    media: {
        marginTop: theme.spacing(2),
        paddingTop: '56.25%', // 16:9
    },
}));

export default function PaperSheet() {
    const classes = useStyles();
    const [imagePreview, setImagePreview] = useState(null);
    const [imageName, setImageName] = useState('');

    const onImageChange = (event) => {
        // if (event.target.files && event.target.files[0]) {
        //     setImageName(event.target.files[0].name);
        //     let reader = new FileReader();
        //     reader.onload = (e) => {
        //         setImagePreview(e.target.result)
        //     }
        //     reader.readAsDataURL(event.target.files[0]);
        // }
        if (imagePreview != null) {
            URL.revokeObjectURL(imagePreview)
        }
        setImageName(event.target.files[0].name);
        setImagePreview(URL.createObjectURL(event.target.files[0]))
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
                />
                {(imagePreview != null) ? <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image={imagePreview}
                        title={imageName}
                    />
                </Card> : null}
                <Divider />
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
                    <Button className={classes.postButton} variant="contained" color="primary">
                        Post<PostIcon className={classes.postIcon} />
                    </Button>
                </div>
            </Paper>
        </div>
    )
}
