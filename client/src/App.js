import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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
          <Switch>
            <Route path="/auth" component={Auth} />
            <Grid container>
              <PrivateRoute exact path="/" component={HomePage} />
              <PrivateRoute path="/:userName" component={TimeLinePage} />
            </Grid>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default withStyles(useStyles)(App);
