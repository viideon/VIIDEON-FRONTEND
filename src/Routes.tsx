import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import { updateVideoCta } from "./Redux/Actions/videos";
import { AuthState } from "../src/Redux/Types/auth";

import Watch from "./Screens/Watch";
import Signup from "./Screens/Signup";
import SignIn from "./Screens/SignIn";
import Profile from "./Screens/Profile";
import Template from "./Screens/Template";
import Campaign from "./Screens/CampaignNew";
import MusicAssets from "./Screens/MusicAssets";
import Configuration from "./Screens/Configuration";
import AssetsLibrary from "./Screens/AssetsLibrary";
import ResetPassword from "./Screens/ResetPassword";
import ForgotPassword from "./Screens/ForgotPassword";

import VideoTab from "./Screens/VideoTab/VideoTab";
import InterActive from "../src/Screens/Interactive";
import UploadRecord from "../src/Screens/UploadRecordVideo";
import ResponseChatvid from "../src/Screens/Interactive/response";

import Videos from "./Screens/Home/Videos";
import Chatvid from "./Screens/Home/Chatvid";
import Dashboard from "./Screens/Home/Dashboard";
import CampaignList from "./Screens/Home/Campaigns";
import Contacts from "./Screens/Connections/Contacts";
import ChatvidBoard from "./Screens/Home/ChatvidBoard";

import PrivacyPolicy from "./components/PrivacyPolicy";

type IProps = {
  auth: AuthState;
  updateVideoCta: (id: any) => void;
};

class Routes extends Component<IProps> {
  render() {
    return (
      <Router>
        {this.props.auth.loggedInStatus === true ? (
          <>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/chatvids/" component={ChatvidBoard} />
              <Route exact path="/chatvids/form/:id" component={Chatvid} />
              <Route exact path="/videotab/:id" component={VideoTab} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/video/create" component={UploadRecord} />
              <Route exact path="/watch/:id" component={Watch} />
              <Route exact path="/chatVid" component={InterActive} />
              <Route exact path="/chatVid/res/:id" component={ResponseChatvid} />
              <Route
                exact
                path="/watch/:id/cta"
                render={(props: any) => {
                  this.props.updateVideoCta(props.match.params.id);
                  return <Redirect to={`/watch/${props.match.params.id}`} />;
                }}
              />
              <Route exact path="/campaign/new" component={Campaign} />
              <Route exact path="/template/" component={Template} />
              <Route exact path="/videos" component={Videos} />
              <Route exact path="/contacts" component={Contacts} />
              <Route exact path="/campaign" component={CampaignList} />
              <Route exact path="/configuration" component={Configuration} />
              <Route exact path="/assetlibrary" component={AssetsLibrary} />
              <Route exact path="/privacypolicy" component={PrivacyPolicy} />
              <Route exact path="/music" component={MusicAssets} />
              <Route exact path="*" render={() => <Redirect to="/" />} />
            </Switch>
          </>
        ) : (
          <Switch>
            <Route exact path="/login*" component={SignIn} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/forgotPassword" component={ForgotPassword} />
            <Route exact path="/resetPassword" component={ResetPassword} />
            <Route exact path="/privacypolicy" component={PrivacyPolicy} />
            <Route
              exact
              path="/watch/:id/cta"
              render={(props: any) => {
                this.props.updateVideoCta(props.match.params.id);
                return <Redirect to={`/watch/${props.match.params.id}`} />;
              }}
            />
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
    auth: state.auth
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    updateVideoCta: (id: any) => dispatch(updateVideoCta(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Routes);
