import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './common/Navigation';
import CreatePost from './components/posts/CreatePost';
import Feed from './components/posts/Feed';
import UserList from './components/chat/UserList';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TimeLine from './components/timeline/TimeLine';
import DashBoard from './components/posts/DashBoard';
import Auth from './components/auth/Auth';
import PrivateRoute from './utils/PrivateRoute';

const useStyles = theme => ({
  root: {
    background: "url('/images/bgImage.png')",
    height: '100%'
  },
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <BrowserRouter>
        <div className={classes.root}>
          <Grid container spacing={0}>

            <Switch>
              <PrivateRoute exact path="/">
                <Grid item xs={12}>
                  <Navigation />
                </Grid>
                <Grid item xs={3}>

                </Grid>
                <Grid item xs={6}>
                  <DashBoard />
                </Grid>
                <Grid item xs={3}>
                  <UserList />
                </Grid>
              </PrivateRoute>
            </Switch>

            <Switch>
              <PrivateRoute exact path="/timeline/:userName">
                <Grid item xs={12}>
                  <Navigation />
                </Grid>
                <Grid item xs={9}>
                  <TimeLine />
                </Grid>
                <Grid item xs={3}>
                  <UserList />
                </Grid>
              </PrivateRoute>
            </Switch>
          </Grid>
        </div>
        <Switch>
          <Route exact path="/auth" component={Auth} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default withStyles(useStyles)(App);
