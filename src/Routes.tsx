import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import Home from "./Screens/Home/Home";
import VideoTab from "./Screens/VideoTab/VideoTab";
import Profile from "./Screens/Profile/index";
import { AuthState } from "../src/Redux/Types/auth";
import Signup from "./Screens/Signup/index";
import SignIn from "./Screens/SignIn";
import Header from "./components/Header/Header";
import UploadRecord from "../src/Screens/UploadRecordVideo";
import Watch from "./Screens/Watch";

type IProps = {
  auth: AuthState;
};

class Routes extends Component<IProps> {
  render() {
    return (
      <Router>
        {this.props.auth.loggedInStatus === true ? (
          <>
            <Header />
            <Switch>
              <Route exact path="/videotab/:id" component={VideoTab} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/video/create" component={UploadRecord} />
              <Route exact path="/watch/:id" component={Watch} />
              <Route exact path="*" component={Home} />
            </Switch>
          </>
        ) : (
          <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/" component={SignIn} />
            <Route exact path="/watch/:id" component={Watch} />
            <Route exact path="*" render={() => <Redirect to="/" />} />
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
