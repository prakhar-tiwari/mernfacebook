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

const useStyles = theme => ({
  root: {
    textAlign: 'center',
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
            <Grid item xs={12}>
              <Navigation />
            </Grid>

            <Switch>
              <Route exact path="/">
                <Grid item xs={3}>

                </Grid>
                <Grid item xs={6}>
                  <DashBoard />
                </Grid>
              </Route>
            </Switch>

            <Switch>
              <Route exact path="/timeline">
                <Grid item xs={9}>
                  <TimeLine />
                </Grid>
              </Route>
            </Switch>
            <Grid item xs={3}>
              <UserList />
            </Grid>
          </Grid>
        </div>
      </BrowserRouter>
    );
  }
}

export default withStyles(useStyles)(App);
