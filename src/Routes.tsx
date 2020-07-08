import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import Home from "./Screens/Home/Home";
import VideoTab from "./Screens/VideoTab/VideoTab";
import Profile from "./Screens/Profile/index";
import { AuthState } from "../src/Redux/Types/auth";
import Signup from "./Screens/SignUp";
import SignIn from "./Screens/SIgnIn";
import Header from "./components/Header/Header";
import UploadRecord from "../src/Screens/UploadRecordVideo";
import Watch from "./Screens/Watch";
import ForgotPassword from "./Screens/ForgotPassword";
// import Campaign from "./Screens/Campaign";
import Campaign from "./Screens/CampaignNew";
import Recording from "./Screens/Watch/Recording";
import VideoLayer from "./Screens/Watch/VideoLayer";
import Capture from "./Screens/Watch/Capture";
import TestCanvas from "./Screens/Watch/TestCanvasPlayer";
import ResetPassword from "./Screens/ResetPassword";
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
              <Route exact path="/campaign" component={Campaign} />
              <Route exact path="/recording" component={Recording} />
              <Route exact path="/layer" component={VideoLayer} />
              <Route exact path="/capture" component={Capture} />
              <Route exact path="/canvastest" component={TestCanvas} />
              <Route exact path="*" component={Home} />
            </Switch>
          </>
        ) : (
          <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/forgotPassword" component={ForgotPassword} />
            <Route exact path="/resetPassword" component={ResetPassword} />
            <Route exact path="/login*" component={SignIn} />
            <Route exact path="/watch/:id" component={Watch} />
            <Route exact path="*" render={() => <Redirect to="/login" />} />
          </Switch>
        )}
      </Router>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(Routes);
