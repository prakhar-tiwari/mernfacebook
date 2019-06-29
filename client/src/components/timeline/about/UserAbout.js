import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import SchoolIcon from '@material-ui/icons/School';
import InfoIcon from '@material-ui/icons/Info';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
    userInfo: {
        padding: theme.spacing(3, 2),
    },
    header: {
        textAlign: 'left'
    },
    addBio: {
        marginTop: theme.spacing(1),
        "& p": {
            fontSize: '14px',
            opacity: 0.7,
        },
        "& a": {
            textDecoration: 'none',
            color: '#385898',
            "&:hover": {
                textDecoration: 'underline',
                cursor: 'pointer'
            }
        }
    },
    infoDetails: {
        marginTop: theme.spacing(1),
        alignItems: 'left',
        textAlign: 'left',
        "& ul": {
            listStyleType: 'none'
        },
        "& ul li": {
            padding: '4px 16px 4px 0'
        },
        "& ul li a": {
            color: '#385898',
            "&:hover": {
                cursor: 'pointer',
                textDecoration: 'underline'
            }
        }
    },
    createBio: {
        height: theme.spacing(20),
    },
    bioInput: {
        height: theme.spacing(15),
        overflow: 'auto',
        "&  textarea": {
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
        },
    },
    bioButtons: {
        background: '#e9eaed'
    },
    button: {
        margin: theme.spacing(0.5),
        width: theme.spacing(3),
        fontSize: '11px',
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    titleBar: {
        "& ul,& ul li": {
            margin: 0,
            padding: 0
        },
        "& ul li span": {
            fontSize: '20px'
        }
    },
    aboutAvatar: {
        margin: 10,
        color: '#fff',
        background:'#385898'
    }
}));

export default function UserAbout() {
    const [bioClicked, setBioClicked] = React.useState(false);
    const classes = useStyles();
    return (
        <div>
            <Paper className={classes.userInfo}>
                <div className={classes.titleBar}>
                    <List>
                        <ListItem>
                            <Avatar className={classes.aboutAvatar}>
                                <InfoIcon />
                            </Avatar>
                            <ListItemText primary="About" />
                        </ListItem>
                    </List>
                </div>
                <div className={classes.addBio}>

                    {(!bioClicked) ? <div>
                        <Typography component="p">
                            Add a short bio.
                        </Typography>
                        <a onClick={() => setBioClicked(true)}>Add Bio</a>
                    </div> :
                        <div>
                            <Paper className={classes.createBio}>
                                <div>
                                    <div className={classes.bioInput}>
                                        <Input
                                            placeholder="Write something about yourself"
                                            multiline={true}
                                            fullWidth
                                            disableUnderline={true}
                                        />
                                    </div>
                                    <div className={classes.bioButtons}>
                                        <Button variant="contained" className={classes.button} onClick={() => setBioClicked(false)}>Cancel</Button>
                                        <Button variant="contained" className={classes.button} color="primary">Save</Button>
                                    </div>
                                </div>
                            </Paper>
                        </div>
                    }

                    <Divider />
                </div>
                <div className={classes.infoDetails}>
                    <ul>
                        <li><div><SchoolIcon /> Working in <a>Tata Consultancy Services</a></div></li>
                        <li><div><SchoolIcon /> Studied at <a>Shri Ram Murti Smarak College of Enginnering and Technology</a></div></li>
                        <li><div><SchoolIcon /> Went to <a>St. Lawrence School</a></div></li>
                    </ul>
                </div>
            </Paper>
        </div>
    )
}
