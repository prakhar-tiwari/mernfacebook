import React from 'react';
import { makeStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import FriendIcon from '@material-ui/icons/People';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import { pink } from '@material-ui/core/colors';
import tileData from './tileData';

const useStyles = makeStyles(theme => ({
    friendGrid: {
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
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    friendAvatar:{
        margin: 10,
        color: '#fff',
        backgroundColor: pink[500],
    }
}))

export default function FriendGrid() {
    const classes = useStyles();
    return (
        <div>
            <Paper className={classes.friendGrid}>
                <div className={classes.titleBar}>
                    <List>
                        <ListItem>
                            <Avatar className={classes.friendAvatar}>
                                <FriendIcon />
                            </Avatar>
                            <ListItemText primary="Friends" />
                        </ListItem>
                    </List>
                </div>
                <div className={classes.pictureGrid}>
                    <GridList cellHeight={120} className={classes.gridList} cols={3}>
                        {tileData.map(tile => (
                            <GridListTile key={tile.img} cols={tile.cols || 1}>
                                <img src={'/'+tile.img} alt={tile.title} />
                                <GridListTileBar
                                    title={tile.title}
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </Paper>
        </div>
    )
}
