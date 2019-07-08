import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {login} from '../../actions/authActions';
import {withRouter} from 'react-router-dom';

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
        minWidth: '980px',
    },
    loginNav: {
        display: 'block',
        margin: '0 auto',
        width: '980px',
        paddingTop: '13px'
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
        }
    },
    floatRight: {
        float: 'right',
        "& table tbody tr td": {
            padding: '0 0 0 14px'
        }
    },
    inputText: {
        borderColor: '#1d2a5b',
        margin: 0,
        width: '142px',
        padding: '4px 0'
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
        padding: '2px 6px',
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
            margin: 0,
            padding: 0,
            whiteSpace: 'nowrap'
        }
    }
})
)

function Login(props) {

    const [contactInfo, setContactInfo] = useState('');
    const [password, setPassword] = useState('');

    const classes = useStyles();

    const handleSubmit=(e)=>{
        e.preventDefault();
        const userLogin={
            contactInfo:contactInfo,
            password:password
        }
        props.login(userLogin);
    }

    useEffect(()=>{
        const {isAuthenticated} = props.auth;
        if(isAuthenticated){
            props.history.replace('/')
        }
        else{
            props.history.replace('/auth')
        }
    },[props.auth.isAuthenticated])

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
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label htmlFor="email">Email or Phone</label>
                                    </td>
                                    <td>
                                        <label htmlFor="password">Password</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input className={classes.inputText}
                                            onChange={(e) => setContactInfo(e.target.value)}
                                            type="email" name="email" />
                                    </td>
                                    <td>
                                        <input className={classes.inputText}
                                            onChange={(e) => setPassword(e.target.value)}
                                            type="password" name="password" />
                                    </td>
                                    <td>
                                        <label htmlFor="login" className={classes.loginButton}>
                                            <input type="submit"
                                             onClick={handleSubmit}
                                             value="Log In"
                                             />
                                        </label>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps=state=>({
    auth:state.auth
})

export default connect(mapStateToProps,{login})(withRouter(Login));