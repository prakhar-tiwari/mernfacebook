import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import Input from '@material-ui/core/Input';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import axios from 'axios';
import io from 'socket.io-client';

const useStyles = theme => ({
    chatBoxMain: {
        position: 'fixed',
        minWidth: "20%",
        transform: "translate(-100%)",
        bottom: 0
    },
    chatBox: {
        padding: theme.spacing(3, 2),
        height: '300px',
        width: '100%',
    },
    topBar: {
        padding: theme.spacing(1, 2),
        display: 'flex',
        width: '100%',
        height: 'auto',
        background: '#fff',
        borderBottom: '1px solid #b2b9c9',
        boxShadow: 'inset 2px 0 2px -2px #b2b9c9',
        justifyContent: 'space-between'
    },
    userInfo: {
        display: 'flex',
        "& img, & p": {
            padding: "0 16px"
        }
    },
    close: {
        cursor: 'pointer'
    },
    chatWindow: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '250px',
        overflowY: 'scroll'
    },
    sendMessageFooter: {
        width: '100%',
        marginTop: theme.spacing(2),
        borderTop: '1px solid #e9ebee',
    },
    msgLeft: {
        position: 'relative',
        minHeight: '10px',
        marginBottom: '15%',
        wordBreak: 'break-all',
        textAlign: 'left',
        maxWidth: '50%',
        fontSize: '11px',
        "& p": {
            background: '#e2e2e2',
            borderRadius: '45px',
            padding: '0 16px',
            fontSize: '15px',
            lineHeight: '1.2em'
        }
    },
    msgRight: {
        position: 'relative',
        minHeight: '10px',
        wordBreak: 'break-all',
        marginBottom: '15%',
        marginLeft: '50%',
        textAlign: 'left',
        maxWidth: '50%',
        color: '#fff',
        fontSize: '11px',
        "& p": {
            background: '#2072f7',
            borderRadius: '45px',
            padding: '0 16px',
            fontSize: '15px',
            lineHeight: '1.2em'
        }
    }
})

class ChatBox extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            chatMessage: '',
            allMessages: [],
            socket:null
        };
    }

    componentDidMount() {
        this.initSocket();
        const { user } = this.props.auth;
        const friend = this.props.friend.user;
        axios.post('/getchat', {
            userId: user.id,
            friendId: friend._id
        })
            .then(result => {
                this.setState({ allMessages: result.data });
            })
            .catch(err => {
                console.log(err);
            })
    }

    initSocket=()=>{
        const socket=io('/');
        this.setState({socket:socket})
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    sendMessage = (event) => {
        const { user } = this.props.auth;
        const friend = this.props.friend.user;
        if (event.key === 'Enter' && this.state.chatMessage.length > 0) {
            axios.post('/sendmessage', {
                message: this.state.chatMessage,
                sender: user.id,
                reciever: friend._id
            })
                .then(result => {
                    this.setState({ chatMessage: '' });
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ chatMessage: '' });
                })
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.allMessages !== this.state.allMessages) {
            this.state.socket.once('chat message', result => {
                var updatedMessages = [...this.state.allMessages];
                this.setState({ allMessages: updatedMessages.concat(result) });
            })
        }
    }

    render() {
        const { classes } = this.props;
        const { user } = this.props.friend;
        const userId = this.props.auth.user.id;
        let sortedMessages = (this.state.allMessages) ? this.state.allMessages.sort((a, b) => a.createdAt < b.createdAt ? -1 : 1) : [];


        return (
            <div className={classes.chatBoxMain}>
                <div className={classes.topBar}>
                    <div className={classes.userInfo}>
                        <Avatar alt="Batman" src={(user.profileImage) ? '/' + user.profileImage : '/images/blank.png'} />
                        <Typography component="p">{user.name}</Typography>
                    </div>
                    <div><CloseIcon className={classes.close} onClick={this.props.click.bind(this)} /></div>
                </div>
                <Paper className={classes.chatBox}>
                    <div className={classes.chatWindow}>
                        {sortedMessages.map(message => (
                            (message.from._id === userId) ?
                                <div key={message._id} className={classes.msgRight}>
                                    <Typography component="p">{message.message}</Typography>
                                </div> :
                                <div key={message._id} className={classes.msgLeft}>
                                    <Typography component="p">{message.message}</Typography>
                                </div>
                        ))}
                    </div>
                    <div className={classes.sendMessageFooter}>
                        <Input className={classes.textBox}
                            placeholder="Enter you message..."
                            fullWidth
                            disableUnderline={true}
                            onChange={(e) => this.setState({ chatMessage: e.target.value })}
                            onKeyPress={this.sendMessage}
                            value={this.state.chatMessage}
                        />
                    </div>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps)(withStyles(useStyles)(ChatBox));
