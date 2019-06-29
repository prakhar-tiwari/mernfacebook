import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import UserAbout from './about/UserAbout';
import CreatePost from '../posts/CreatePost';
import PhotoGrid from './photos/PhotoGrid';
import FriendGrid from './friends/FriendGrid';

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
    photoGrid:{
        marginTop:theme.spacing(2)
    },
    friendGrid:{
        marginTop:theme.spacing(2)
    }

});

class TimeLine extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.timeline}>
                <div className={classes.timeLineCover}>
                    <div className={classes.coverPhoto}>
                        <img src="images/batman.jpg" />
                    </div>
                    <div className={classes.profilePicture}>
                        <a href="#">
                            <img src="images/flash.jpg" alt="Prakhar Tiwari" />
                        </a>
                    </div>
                    <div className={classes.timeLineNav}>
                        <ul className={classes.navList}>
                            <li><a href="#" className={classes.listItem}>TimeLine</a></li>
                            <li><a href="#" className={classes.listItem}>About</a></li>
                            <li><a href="#" className={classes.listItem}>Friends<span className={classes.totalFriends}>100</span></a></li>
                            <li><a href="#" className={classes.listItem}>Photos</a></li>
                            <li><a href="#" className={classes.listItem}>Archive</a></li>
                            <li><a href="#" className={classes.listItem}>More</a></li>
                        </ul>
                    </div>
                </div>

                <div className={classes.pageDetails}>
                    <Grid container spacing={0}>
                        <Grid item xs={5}>
                            <div className={classes.leftContent}>
                                <div className={classes.userAbout}>
                                    <UserAbout />
                                </div>
                                <div className={classes.photoGrid}>
                                    <PhotoGrid />
                                </div>
                                <div className={classes.friendGrid}>
                                    <FriendGrid />
                                </div>

                            </div>
                        </Grid>

                        <Grid item xs={7}>
                            <div className={classes.RightContent}>
                                <div className={classes.CreatePost}>
                                    <CreatePost />
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default withStyles(useStyles)(TimeLine);
