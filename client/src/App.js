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
import TimeLinePage from './components/timeline/TimeLinePage';
import HomePage from './components/HomePage';

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
              <Route exact path="/" component={HomePage} />
              <Route exact path="/timeline/:userName" component={TimeLinePage} />
              </Switch>
          </Grid>
        </div>
          <Route exact strict path="/auth" component={Auth} />
      </BrowserRouter>
    );
  }
}

export default withStyles(useStyles)(App);
