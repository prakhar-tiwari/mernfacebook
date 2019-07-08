import React from 'react';
import {withRouter} from 'react-router-dom';
import Login from './Login';
import SignUp from './Signup';

function Auth() {
    return (
        <div>
            <Login/>
            <SignUp/>
        </div>
    )
}

export default withRouter(Auth);
