import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = (props)=> (
        <Route
        {...props}
            render={() =>
                props.auth.isAuthenticated ?
                    (props.component) :
                    (<Redirect to="/auth" />)}
        />
    )

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute);
