import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from '../src/Screens/Home/Home';
import SignIn from '../src/Screens/SIgnIn/SignIn';
import SignUp from '../src/Screens/SignUp/SignUp';
import VideoTab from './Screens/VideoTab/VideoTab';
import Profile from './Screens/Profile/index';
import { AuthState } from '../src/Redux/Types/auth';

type IProps = {
  auth: AuthState;

};
type IState = {
};
class Routes extends Component<IProps, IState> {
  render() {
    return (
      <div className="App">
        {this.props.auth.loggedInStatus === true ? <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/videotab" component={VideoTab} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </Router> :
          <Router>
            <Switch>
              <Route exact path="/" component={SignIn} />
              <Route exact path="/signup" component={SignUp} />
            </Switch>
          </Router>
        }
      </div>
    );
  }
};
const mapStateToProps = (state: any) => {
  console.log("The Auth sate", state.auth)
  return {
    auth: state.auth
  };
};
export default connect(mapStateToProps)(Routes)
// export default Routes;
// export default App;