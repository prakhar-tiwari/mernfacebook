import React, { Component } from 'react';
import { fade, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import HomeIcon from '@material-ui/icons/Home';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import SearchBox from './SearchBox';
import PersonIcon from '@material-ui/icons/PersonRounded';
import { Popper, Paper } from '@material-ui/core';
import axios from 'axios';

const useStyles = theme => ({
    grow: {
        flexGrow: 1,
    },
    headerBar: {
        height: '55px'
    },
    appBar: {
        height: '50px'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.95),
        '&:hover': {
            backgroundColor: theme.palette.common.white,
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('xs')]: {
            marginLeft: theme.spacing(3),
            width: '40%',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        color: fade(theme.palette.common.black, 0.8),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: fade(theme.palette.common.black, 1),
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 2),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 500,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    arrowFriend: {
        content: " ",
        position: 'absolute',
        right: '5%',
        bottom: '100%',
        borderWidth: '10px',
        borderStyle: 'solid',
        borderColor: 'transparent transparent white'
    },
    popperElement: {
        zIndex: 50,
        maxWidth: '600px',
        minWidth: '500px',
        overflow:'auto'
    },
    popperContent: {
        transform: 'translate3d(0, 11px, 0px)',
        width: '100%',
        "& p:hover": {
            color: '#385898',
            cursor: 'pointer',
            textDecoration: 'underline'
        }
    },
    friendInfo: {
        display: 'flex'
    },
    typography: {
        width:'150px',
        "& p": {
            textAlign:'left',
            padding: '8px 16px 4px 22px',
            fontSize: '14px',
        }
    },
    confirmButton: {
        width: theme.spacing(3),
        marginTop: theme.spacing(1),
        marginLeft: '15%',
        fontSize: '12px',
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        background: '#385898',
        color: '#fff',
        padding: '8px 32px 4px 16px'
    },
    declineButton: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
        fontSize: '12px',
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        background: '#e9eaed',
        color: '#000',
        padding: '8px 16px 4px 16px'
    }
});


class Navigation extends Component {
    constructor() {
        super();
        this.state = {
            anchorEl: null,
            mobileMoreAnchorEl: null,
            userName: '',
            anchorFriend: null,
            friendRequests: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.auth.isAuthenticated != nextProps.auth.isAuthenticated) {
            if (!nextProps.auth.isAuthenticated) {
                this.props.history.replace('/auth');
            }
        }
    }

    componentDidMount() {
        const { isAuthenticated, user } = this.props.auth;
        if (!isAuthenticated) {
            this.props.history.replace('/auth');
        }
        else {
            this.setState({ userName: user.name.split(" ")[0] });
            axios.post('/getfriendrequests', {
                userId: user.id
            })
                .then(result => {
                    this.setState({
                        friendRequests: result.data
                    })
                })
                .catch(err => {
                })
        }
    }


    handleFriendNotificationPopper = (event, userId) => {
        event.preventDefault();
        if (this.state.anchorFriend) {
            this.setState({
                anchorFriend: null
            })
        }
        else {
            this.setState({
                anchorFriend: event.currentTarget,
            });
            axios.post('/getfriendrequests', {
                userId: userId
            })
                .then(result => {
                    this.setState({
                        friendRequests: result.data
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    confirmFriend=(event,tlUserId)=>{
        event.preventDefault();
        const {user} = this.props.auth;
        axios.post('/acceptfriend',{
            userId:user.id,
            tlUserId:tlUserId
        })
        .then(result=>{
            console.log(result)
        })
        .catch(err=>{
            console.log(err)
        })
    }


    render() {
        const { classes } = this.props;
        const { user } = this.props.auth;
        var openFriend = Boolean(this.state.anchorFriend);

        const isMenuOpen = Boolean(this.state.anchorEl);
        const isMobileMenuOpen = Boolean(this.state.mobileMoreAnchorEl);

        const handleProfileMenuOpen = (event) => {
            this.setState({ anchorEl: event.currentTarget });
        }

        const handleMobileMenuClose = () => {
            this.setState({ mobileMoreAnchorEl: null })
        }

        const handleMenuClose = () => {
            this.setState({ anchorEl: null });
            handleMobileMenuClose();
        }

        const handleLogout = (e) => {
            e.preventDefault();
            this.props.logout();
        }

        const handleMobileMenuOpen = (event) => {
            this.setState({ mobileMoreAnchorEl: event.currentTarget });
        }

        const { friendRequests } = this.state;


        const menuId = 'primary-search-account-menu';
        const renderMenu = (
            <Menu
                anchorEl={this.state.anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleMenuClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        );

        const mobileMenuId = 'primary-search-account-menu-mobile';
        const renderMobileMenu = (
            <Menu
                anchorEl={this.state.mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={mobileMenuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={handleMobileMenuClose}
            >
                <MenuItem onClick={() => this.props.history.push({
                    pathname: '/' + user.userName,
                    state: {
                        user: user
                    }
                })}>
                    <ListItemAvatar>
                        <Avatar onError={(e) => { e.target.src = 'images/404.png' }} src={(user.profileImage)?user.profileImage:'images/blank.png'} />
                    </ListItemAvatar>
                    <ListItemText primary={this.state.userName} />
                </MenuItem>
                <MenuItem onClick={() => this.props.history.push('/')}>
                    <IconButton aria-label="Show 4 new mails" color="inherit">
                        <HomeIcon />
                    </IconButton>
                    <p>Home</p>
                </MenuItem>
                <MenuItem>
                    <IconButton aria-label="Show friend requests" color="inherit">
                        <Badge badgeContent={10} color="secondary">
                            <PersonIcon />
                        </Badge>
                    </IconButton>
                    <p>Friend Requests</p>
                </MenuItem>
                <MenuItem>
                    <IconButton aria-label="Show new mails" color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <MailIcon />
                        </Badge>
                    </IconButton>
                    <p>Messages</p>
                </MenuItem>
                <MenuItem>
                    <IconButton aria-label="Show new notifications" color="inherit">
                        <Badge badgeContent={11} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <p>Notifications</p>
                </MenuItem>
                <MenuItem onClick={handleProfileMenuOpen}>
                    <IconButton
                        aria-label="Account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
            </Menu>
        );

        return (
            <div className={classes.grow}>
                <AppBar className={classes.headerBar} position="fixed">
                    <Toolbar className={classes.appBar} style={{minHeight:'50px'}}>
                        <Typography className={classes.title} variant="h6" noWrap>
                            SocialConnect
                            </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <SearchBox />
                        </div>
                        <div className={classes.sectionDesktop}>
                            <MenuItem onClick={() => this.props.history.push({
                                pathname: '/' + user.userName,
                                state: {
                                    user: user
                                }
                            })}>
                                <ListItemAvatar>
                                    <Avatar onError={(e) => { e.target.src='images/404.png' }} src={(user.profileImage)? user.profileImage:'images/blank.png'} />
                                </ListItemAvatar>
                                <ListItemText primary={this.state.userName} />
                            </MenuItem>
                            <MenuItem onClick={() => this.props.history.push('/')}>
                                <IconButton aria-label="Show 4 new mails" color="inherit">
                                    <HomeIcon />
                                </IconButton>
                                <p>Home</p>
                            </MenuItem>

                            <IconButton onClick={(e) => this.handleFriendNotificationPopper(e, user.id)} aria-label="Show friend requests" color="inherit">
                                <Badge badgeContent={friendRequests.length} color="secondary">
                                    <PersonIcon />
                                </Badge>


                                {(friendRequests) ?
                                    <Popper className={classes.popperElement}
                                        anchorEl={this.state.anchorFriend}
                                        open={openFriend}
                                        placement='bottom-end'
                                        disablePortal={true}
                                        modifiers={
                                            {
                                                flip: {
                                                    enabled: false,
                                                },
                                                // preventOverflow: {
                                                //     enabled: false,
                                                //     boundariesElement: 'scrollParent',
                                                // },
                                            }
                                        } >
                                        <Paper className={classes.popperContent} >
                                            <div className={classes.arrowFriend} > </div>
                                            {friendRequests.map(friend => (
                                                <React.Fragment key={friend.user._id}>
                                                    <div className={classes.friendInfo} >
                                                        <ListItemAvatar>
                                                            <Avatar onError={(e) => { e.target.src='images/404.png' }} alt="Remy Sharp" src={(friend.user.profileImage) ? friend.user.profileImage : 'images/blank.png'} />
                                                        </ListItemAvatar>
                                                        <div className={classes.typography}>
                                                            <Typography > {friend.user.name} </Typography>
                                                        </div>
                                                        <a onClick={(e)=>this.confirmFriend(e,friend.user._id)} className={classes.confirmButton}>
                                                            Confirm
                                                        </a>
                                                        <a onClick={this.declineFriend} className={classes.declineButton}>
                                                            Decline
                                                        </a>
                                                    </div>
                                                    <hr className={classes.divider} />
                                                </React.Fragment>
                                            ))}
                                        </Paper>
                                    </Popper>
                                    : null}
                            </IconButton>
                            <IconButton aria-label="Show new mails" color="inherit">
                                <Badge badgeContent={4} color="secondary">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            <IconButton aria-label="Show new notifications" color="inherit">
                                <Badge badgeContent={17} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="Account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>

                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="Show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>

                {renderMobileMenu}
                {renderMenu}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(withStyles(useStyles)(withRouter(Navigation)));
