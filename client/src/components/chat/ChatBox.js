import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import Input from '@material-ui/core/Input';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

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
            fontSize:'15px',
            lineHeight:'1.2em'
        }
    },
    msgRight: {
        position: 'relative',
        minHeight: '10px',
        wordBreak: 'break-all',
        marginBottom: '15%',
        marginLeft:'50%',
        textAlign: 'left',
        maxWidth: '50%',
        color: '#fff',
        fontSize: '11px',
        "& p": {
            background: '#2072f7',
            borderRadius: '45px',
            padding: '0 16px',
            fontSize:'15px',
            lineHeight:'1.2em'
        }
    }
})

class ChatBox extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        };
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.chatBoxMain}>
                <div className={classes.topBar}>
                    <div className={classes.userInfo}>
                        <Avatar alt="Batman" src="images/Batman.jpg" />
                        <Typography component="p">Batman</Typography>
                    </div>
                    <div><CloseIcon className={classes.close} onClick={this.props.click.bind(this)} /></div>
                </div>
                <Paper className={classes.chatBox}>
                    <div className={classes.chatWindow}>
                        <div className={classes.msgLeft}>
                            <Typography component="p">Hi</Typography>
                        </div>
                        <div className={classes.msgRight}>
                            <Typography component="p">Lorem ihjkbsum ihgadk kahgdkfa chgasjd jasg anbs dhiuuh</Typography>
                        </div>
                        <div className={classes.msgLeft}>
                            <Typography component="p">Lorem ihjkbsum ihgadk kahgdkfa chgasjd jasg anbs dhiuuh</Typography>
                        </div>
                        <div className={classes.msgRight}>
                            <Typography component="p">Hi</Typography>
                        </div>
                        <div className={classes.msgRight}>
                            <Typography component="p">Lorem ihjkbsum ihgadk kahgdkfa chgasjd jasg anbs dhiuuh</Typography>
                        </div>
                        <div className={classes.msgLeft}>
                            <Typography component="p">Hi</Typography>
                        </div>
                    </div>
                    <div className={classes.sendMessageFooter}>
                        <Input className={classes.textBox}
                            placeholder="Enter you message..."
                            fullWidth
                            disableUnderline={true}
                        />
                    </div>
                </Paper>
            </div>
        )
    }
}

export default withStyles(useStyles)(ChatBox);
