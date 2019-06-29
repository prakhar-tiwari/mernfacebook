import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
    userInfo: {
        padding: theme.spacing(3, 2),
    },
    addBio: {
        "&  a": {
            textDecoration: 'none',
            color: '#385898',
            "&:hover": {
                textDecoration: 'underline',
                cursor: 'pointer'
            }
        }
    },
    infoDetails: {
        marginTop: theme.spacing(1)
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
    }
}));

export default function UserAbout() {
    const [bioClicked, setBioClicked] = React.useState(false);
    const classes = useStyles();
    return (
        <div>
            <Paper className={classes.userInfo}>
                <Typography variant="h5" component="h5">
                    About.
                </Typography>
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

                </div>
            </Paper>
        </div>
    )
}
