import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Navigation from '../../common/Navigation';
import TimeLineContainer from './TimeLineContainer';
import UserList from '../chat/UserList';
import { setTimeLineUser } from '../../actions/profileActions';

class TimeLinePage extends Component {
  componentDidMount() {
    const { isAuthenticated, user } = this.props.auth;
    if (!isAuthenticated) {
      this.props.history.replace('/auth');
    }
    else {
      const userName = this.props.match.params.userName;
      this.props.setTimeLineUser(userName, user.userName);
    }
  }
  componentDidUpdate(prevProps) {
    const { isAuthenticated, user } = this.props.auth;
    if (isAuthenticated != prevProps.auth.isAuthenticated) {
      if (!this.props.auth.isAuthenticated) {
        this.props.history.replace('/auth');
      }
    }
    else {
      if (prevProps.match.params.userName != this.props.match.params.userName) {
        const userName = this.props.match.params.userName;
        this.props.setTimeLineUser(userName, user.userName);
      }
    }
  }
  render() {
    return (
      <React.Fragment>
        <Grid item xs={12}>
          <Navigation />
        </Grid>
        <Grid item xs={9}>
          <TimeLineContainer />
        </Grid>
        <Grid item xs={3}>
          <UserList />
        </Grid>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
  profile: state.profile
})

export default connect(mapStateToProps,{setTimeLineUser})(TimeLinePage);
