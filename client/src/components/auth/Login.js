import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { withRouter } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    topNavBar: {
        backgroundColor: '#3b5998',
        backgroundImage: 'linear-gradient(#4e69a2, #3b5998 50%)',
        borderBottom: '1px solid #133783',
        minHeight: '42px',
        position: 'relative',
        zIndex: 1,
    },
    menuBarContainer: {
        height: '82px',
        minWidth: '1100px',
    },
    loginNav: {
        display: 'block',
        margin: '0 auto',
        width: '1100px',
    },
    floatLeft: {
        float: 'left',
        "& h1": {
            clip: 'rect(1px, 1px, 1px, 1px)',
            height: '1px',
            left: 'auto',
            whiteSpace: 'nowrap',
            width: '1px',
            color: '#fff',
            fontSize:'36px'
        }
    },
    floatRight: {
        float: 'right',
        paddingTop:'13px'
    },
    inputText: {
        borderColor: '#1d2a5b',
        margin: 0,
        width: '180px',
        padding:'4px 8px',
        "& input": {
            padding: '12px 10px'
        }
    },
    loginButton: {
        background: '#4267b2',
        borderColor: '#29487d',
        borderRadius: '2px',
        cursor: 'pointer',
        display: 'inline-block',
        fontSize: '12px',
        fontWeight: 'bold',
        lineHeight: '18px',
        border: '1px solid #ccd0d5',
        padding: '4px 8px',
        marginTop:'2px',
        textAlign: 'center',
        textDecoration: 'none',
        textShadow: 'none',
        verticalAlign: 'top',
        whiteSpace: 'nowrap',
        "& input": {
            background: 'none',
            border: 0,
            cursor: 'pointer',
            color: '#fff',
            display: 'inline-block',
            fontWeight: 'bold',
            lineHeight: '18px',
            marginTop: 0,
            padding: 0,
            whiteSpace: 'nowrap'
        },
        "&:hover":{
            backgroundColor: '#365899',
            borderColor: '#29487d',
            textDecoration:'none'
        }
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: '#000 !important'
        }
    },
    cssFocused: {
        color: ''
    },
    textInput: {
        height: 1,
        background: '#fff'
    }
})
)

function Login(props) {

    const [contactInfo, setContactInfo] = useState('');
    const [password, setPassword] = useState('');

    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();
        const userLogin = {
            contactInfo: contactInfo,
            password: password
        }
        props.login(userLogin);
    }

    useEffect(() => {
        const { isAuthenticated } = props.auth;
        if (isAuthenticated) {
            props.history.replace('/');
        }
        else {
            props.history.replace('/auth');
        }
    }, [props.auth.isAuthenticated])

    return (
        <div className={classes.topNavBar}>
            <div className={classes.menuBarContainer}>
                <div className={classes.loginNav}>
                    <div className={classes.floatLeft}>
                        <h1>
                            SocialConnect
                        </h1>
                    </div>
                    <div className={classes.floatRight}>
                        <Input
                            disabled={true}
                            color='#fff'
                            error={props.error !== null}
                            value={props.error.message || ''}
                            disableUnderline={true}
                            inputProps={{
                                style:{color:'red'}
                            }} />


                        <TextField
                            className={classes.inputText}
                            margin="normal"
                            variant="outlined"
                            placeholder="Email or Phone"
                            error={props.error.contactInfo ? true : false}
                            helperText={props.error.contactInfo}
                            onChange={(e) => setContactInfo(e.target.value)}
                            InputProps={{
                                classes: {
                                    root: classes.cssOutlinedInput,
                                    focused: classes.cssFocused,
                                    input: classes.textInput
                                }
                            }}
                            type="email" name="email" />


                        <TextField
                            className={classes.inputText}
                            margin="normal"
                            variant="outlined"
                            placeholder="Password"
                            error={props.error.password ? true : false}
                            helperText={props.error.password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                classes: {
                                    root: classes.cssOutlinedInput,
                                    focused: classes.cssFocused,
                                    input: classes.textInput
                                }
                            }}
                            type="password" name="password" />


                        <label htmlFor="login" className={classes.loginButton}>
                            <input type="submit"
                                onClick={handleSubmit}
                                value="Log In"
                            />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
})

export default connect(mapStateToProps, { login })(withRouter(Login));