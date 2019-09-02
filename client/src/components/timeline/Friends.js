import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import PersonIcon from '@material-ui/icons/PersonTwoTone';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = theme => ({
    friends: {
        marginTop: theme.spacing(2),
        background: '#fff',
        border: '1px solid #ccd0d5',
        borderRadius: '3px',
        marginBottom: '10px'
    },
    friendsHeader: {
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
    personIcon: {
        color: '#969292',
    },
    friendsList: {
        listStyleType: 'none',
        margin: 0,
        padding: 0
    },
    friendDetails: {
        border: '1px solid #e9ebee',
        display: 'inline-block',
        margin: '0 0 13px 13px',
        padding: '0 10px 0 0',
        position: 'relative',
        varticalAlign: 'top',
        width: '390px'
    },
    friend: {
        '& img': {
            width: '100px',
            height: '100px',
            float: 'left'
        }
    },
    friendWrapper: {
        display: 'inline-block',
        float: 'right'
    },
    friendStatusWrapper: {
        display: 'inline-block',
        verticalAlign: 'middle'
    },
    friendButton: {
        display: 'inline-block',
        verticalAlign: 'top',
        '& a': {
            padding: '4px 12px',
            background: '#e9eaed',
            border: '1px solid #ccd0d5',
            cursor: 'pointer',
        }
    },
    checkIcon: {
        verticalAlign: 'sub',
        '& svg': {
            color: 'green',
            width: '0.9em'
        }
    },
    nameWrapper: {
        display: 'inline-block'
    },
    friendName: {
        color: '#385898',
        cursor: 'pointer',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '14px',
        marginLeft: '20px',
        '&:hover': {
            textDecoration: 'underline'
        }
    }
})

class Friends extends Component {
    render() {
        const { classes } = this.props;
        const { user } = this.props.auth;
        const { friends } = this.props.profile;
        const friendList = friends.map(friend => (
            <li key={friend._id} className={classes.friendDetails}>
                <div className={classes.friend}>
                    <img src={friend.profileImage?`/${friend.profileImage}`:'/images/blank.png'} alt="" />
                    <div className={classes.friendWrapper}>
                        <div className={classes.friendStatusWrapper} style={{ height: '35px' }}></div>
                        <div className={classes.friendStatus}>
                            <div className={classes.friendButton}>
                                <a>
                                    <span className={classes.checkIcon}>
                                        <Icon>
                                            <CheckIcon />
                                        </Icon>
                                    </span>
                                    <span> Friends</span></a>
                            </div>
                        </div>
                    </div>
                    <div className={classes.nameWrapper}>
                        <div className={classes.friendStatusWrapper} style={{ height: '35px' }}></div>
                        <div className={classes.friendNameWrapper}>
                            <Link className={classes.friendName} to={`/${friend.userName}`}>
                                {friend.name}
                            </Link>
                        </div>
                    </div>
                </div>
            </li>
        ))
        return (
            <div className={classes.friends}>
                <div className={classes.friendsHeader}>
                    <h3 className={classes.headerContent}>
                        <Icon>
                            <PersonIcon className={classes.personsIcon} />
                        </Icon>
                        <Link to={`/${user.userName}/friends`}> Friends</Link>
                    </h3>
                </div>

                <Grid container spacing={0}>
                    <ul className={classes.friendsList}>
                        {friendList}
                    </ul>
                </Grid>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post,
    profile: state.profile
})

export default connect(mapStateToProps)(withStyles(useStyles)(withRouter(Friends)));
