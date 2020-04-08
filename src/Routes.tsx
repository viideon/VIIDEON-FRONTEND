import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Home from "../src/Screens/Home/Home";
import SignIn from "../src/Screens/SIgnIn/SignIn";
import SignUp from "../src/Screens/SignUp/SignUp";
import VideoTab from "./Screens/VideoTab/VideoTab";
import Profile from "./Screens/Profile/index";
import { AuthState } from "../src/Redux/Types/auth";
import UploadRecord from "../src/Screens/UploadRecordVideo";
type IProps = {
  auth: AuthState;
};
type IState = {};
class Routes extends Component<IProps, IState> {
  render() {
    return (
      <Router>
        {this.props.auth.loggedInStatus === true ? (
          <Switch>
            <Route exact path="/videotab/:id" component={VideoTab} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/video/create" component={UploadRecord} />
            <Route exact path="/" component={Home} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/signup" component={SignUp} />
            <Route path="/" component={SignIn} />
          </Switch>
        )}
      </Router>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    auth: state.auth
  };
};
export default connect(mapStateToProps)(Routes);
