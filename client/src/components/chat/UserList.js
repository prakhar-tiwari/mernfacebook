import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import green from '@material-ui/core/colors/green';
import ChatBox from './ChatBox';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';
import {connect} from 'react-redux';


const useStyles = theme => ({
    userList: {
        width: "60%",
        padding: theme.spacing(3, 2),
        marginLeft: "30%",
        borderLeft: '1px solid #6b6c70',
        borderRadius: 0,
        background: "url('/images/bgImage.png')",
        boxShadow: 'inset 2px 0 2px -2px #b2b9c9',
        lineHeight: '16px'
    },
    contactsHeader: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: '14px',
        height: '16px',
        color: '#4a4a4a',
    },
    online: {
        color: 'green'
    },
});

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            friendsList:[]
        }
    }

    componentDidMount(){
        const userId=this.props.auth.user.id;
        axios.post('/getfriendschat',{userId:userId})
        .then(result=>{
            this.setState({friendsList:result.data})
        })
        .catch(err=>{
            console.log(err);
        })
    }

    openModal = () => {
        this.setState({ open: true });
    }

    closeModal = () => {
        this.setState({ open: false })
    }

    render() {
        const { classes } = this.props;
        const {friendsList}=this.state;
        return (
            <div>
                <Paper className={classes.userList}>
                    <Typography className={classes.contactsHeader}>Contacts</Typography>
                    <List component="nav" aria-label="Secondary mailbox folders">
                        {(friendsList)?friendsList.map(friend=>(
                            <ListItem key={friend.user._id} button onClick={this.openModal}>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={'/'+friend.user.profileImage} />
                            </ListItemAvatar>
                            <ListItemText primary={friend.user.name} />
                            {/* <Badge color="primary" variant="dot"></Badge> */}
                        </ListItem>
                        )):
                        null}
                        
                    </List>

                </Paper>

                {(this.state.open)?<ChatBox click={this.closeModal} />:null}
            </div>
        )
    }
}

const mapStateToProps=state=>({
    auth:state.auth
})

export default connect(mapStateToProps)(withStyles(useStyles)(UserList));
