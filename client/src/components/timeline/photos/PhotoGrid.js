import React from 'react';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ImageIcon from '@material-ui/icons/Image';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import { green } from '@material-ui/core/colors';
import tileData from '../friends/tileData';
import Photo from './Photo';

const useStyles = makeStyles(theme => ({
    photoGrid: {
        padding: theme.spacing(3, 2),
    },
    titleBar: {
        "& ul,& ul li":{
            margin:0,
            padding:0
        },
        "& ul li span":{
            fontSize:'20px'
        }
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
        "& img":{
            cursor:'pointer'
        }
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    photoAvatar:{
        margin: 10,
        color: '#fff',
        backgroundColor: green[500],
    }
}))

export default function PhotoGrid() {
    const classes = useStyles();
    const [openPhoto,setOpenPhoto]=React.useState(false);
    const [imageDetails,setImageDetails]=React.useState(null);

    function onPhotoClick(image){
        setOpenPhoto(true);
        setImageDetails(image);
    }
    return (
        <div>
            <Paper className={classes.photoGrid}>
                <div className={classes.titleBar}>
                    <List>
                        <ListItem>
                            <Avatar className={classes.photoAvatar}>
                                <ImageIcon />
                            </Avatar>
                            <ListItemText primary="Photos" />
                        </ListItem>
                    </List>
                </div>
                <div className={classes.pictureGrid}>
                    <GridList cellHeight={120} className={classes.gridList} cols={3}>
                        {tileData.map(tile => (
                            <GridListTile key={tile.img} cols={tile.cols || 1}>
                                <img onClick={()=>onPhotoClick(tile.img)} src={tile.img} alt={tile.title} />
                            </GridListTile>
                        ))}
                    </GridList>
                    <Photo openPhoto={openPhoto} imageDetails={imageDetails} onclose={()=>{
                        setOpenPhoto(false)
                    }}/>
                </div>
            </Paper>
        </div>
    )
}
