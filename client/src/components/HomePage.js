import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Navigation from '../common/Navigation';
import DashBoard from './posts/DashBoard';
import UserList from './chat/UserList';

class HomePage extends Component {
    render() {
        return (
            <React.Fragment>
                <Grid item xs={12}>
                  <Navigation/>
                </Grid>
                <Grid item xs={3}>

                </Grid>
                <Grid item xs={6}>
                  <DashBoard />
                </Grid>
                <Grid item xs={3}>
                  <UserList />
                </Grid>
            </React.Fragment>
        )
    }
}

export default HomePage;
