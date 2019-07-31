import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Navigation from '../../common/Navigation';
import TimeLine from './TimeLine';
import UserList from '../chat/UserList';

class TimeLinePage extends Component {
    render() {
        return (
            <React.Fragment>
                <Grid item xs={12}>
                  <Navigation />
                </Grid>
                <Grid item xs={9}>
                  <TimeLine />
                </Grid>
                <Grid item xs={3}>
                  <UserList />
                </Grid>
            </React.Fragment>
        )
    }
}

export default TimeLinePage;
