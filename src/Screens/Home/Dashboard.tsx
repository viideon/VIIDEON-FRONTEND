import React, { Component } from "react";
import Home from "./Home";
import { Grid } from "@material-ui/core";
import VideocamIcon from "@material-ui/icons/Videocam";
import PublishIcon from "@material-ui/icons/Publish";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import EditIcon from "@material-ui/icons/Edit";
import HeaderCard from "../../components/HeaderCards";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getVideoCount, getCampaignCount } from "../../Redux/Actions/videos";
import { getEmailConfigurations } from "../../Redux/Actions/email";
import { isEmailConfigured } from "../../Redux/Actions/auth";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Styles from "./styles";
import "./styles.css";
import Tooltip from "@material-ui/core/Tooltip";
type IProps = {
  history: any;
  videoCount: number;
  campaignCount: number;
  viewCount: number;
  emailConfig: any;
  user: any;
  auth: any;
  getEmailConfigurations: () => void;
  getVideoCount: () => void;
  getCampaignCount: () => void;
  isEmailConfigured: () => void;
};
class Dashboard extends Component<IProps> {
  state = {
    showDashboard: true,
    showVideos: false,
    emailNoteOpen: !this.props?.auth?.isEmailConfigured,
    emailConfigSttus: false,
  };
  componentDidMount() {
    this.props.getVideoCount();
    this.props.getCampaignCount();
    this.props.getEmailConfigurations();
  }

  emailConfigWarning = () => {
    return (
      <Dialog
        open={!this.props.auth.isEmailConfigured}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ color: "#fdb415" }} id="alert-dialog-title">
          {"Kindly configure your gmail"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By configuring gmail you can enjoy all the features of VIDEON PRO.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => this.props.history.push(`/configuration`)}
            variant="outlined"
            color="primary"
          >
            Configure
          </Button>
          <Button
            onClick={() => this.EmailConfigStatus()}
            color="secondary"
            variant="outlined"
          >
            Later
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  navigate = (show?: string) => {
    this.props.history.push({ pathname: "/video/create", show: show });
  };
  EmailConfigStatus = () => {
    this.props.isEmailConfigured();
    this.props.history.push("/");
  };
  render() {
    const { user } = this.props;
    const { loading, emailConfigurations } = this.props.emailConfig;

    return (
      <Home>
        <div className="wrapperDashboard">
          <div className="dashboardTop">
            <h3 className="dashboardTopLeft">
              Welcome, {user?.firstName || user?.lastName || user?.userName}!
            </h3>
          </div>
          <Grid container spacing={2} className="dashHeaderWrapper">
            <Grid item xs={6} md={3}>
              <Link to="/videos" className="link-style">
                <HeaderCard
                  styles={Styles.headerCardOne}
                  Number={this.props.videoCount ? this.props.videoCount : 0}
                  Title="VIDEOS"
                  iconBg="#368BC4"
                />
              </Link>
            </Grid>
            <Grid item xs={6} md={3}>
              <Tooltip title="Feature Coming Soon">
                <div onClick={() => alert("Feature not created yet")}>
                  <HeaderCard
                    styles={Styles.headerCardTwo}
                    Number={this.props.viewCount ? this.props.viewCount : 0}
                    Title="VIEWS"
                    iconBg="#3A966F"
                  />
                </div>
              </Tooltip>
            </Grid>
            <Grid item xs={6} md={3}>
              <Link to="/campaign" className="link-style">
                <HeaderCard
                  styles={Styles.headerCardThree}
                  Number={
                    this.props.campaignCount ? this.props.campaignCount : 0
                  }
                  Title="CAMPAIGNS"
                  iconBg="#7754B8"
                />
              </Link>
            </Grid>

            <Grid item xs={6} md={3}>
              <Tooltip title="Feature Coming Soon">
                <div onClick={() => alert("Feature not created yet")}>
                  <HeaderCard
                    styles={Styles.headerCardFour}
                    Number={0}
                    Title="CONTACTS"
                    iconBg="#CC5551"
                  />
                </div>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid container className="wrapperActivityHome">
            <Grid item xs={6} md={3}>
              <div
                className="actionsHomePage"
                onClick={() => this.navigate("upload")}
              >
                <PublishIcon style={iconStyle} />
                <h5 className="cursorPointer">
                  Record/Upload a Single Video Message
                </h5>
              </div>
            </Grid>
            {/* <Grid item xs={6} md={3}>
              <div
                className="actionsHomePage"
                onClick={() => this.props.history.push("/chatvid")}
              >
                <VideocamIcon style={iconStyle} />
                <h5 className="cursorPointer">Record/Upload a Chatvid</h5>
              </div>
            </Grid> */}
            {/* <Grid item xs={6} md={3}>
              <div
                className="actionsHomePage"
                onClick={() => this.props.history.push("/campaign/new")}
              >
                <ImageSearchIcon style={iconStyle} />
                <h5 className="cursorPointer">Create a Campaign</h5>
              </div>
            </Grid> */}
            {/* <Grid item xs={6} md={3}>
              <Tooltip title="Feature Coming Soon">
                <div
                  className="actionsHomePage"
                  onClick={() => alert("Feature not created yet")}
                >
                  <EditIcon style={iconStyle} />
                  <h5 className="cursorPointer">Analytics</h5>
                </div>
              </Tooltip>
            </Grid> */}
          </Grid>
        </div>
        {!loading &&
            emailConfigurations &&
            emailConfigurations.length < 1 &&
          this.emailConfigWarning()}
      </Home>
    );
  }
}

const iconStyle = {
  fontSize: "50px",
  cursor: "pointer",
  color: "#FFFFFF",
};
const mapStateToProps = (state: any) => {
  return {
    // videoCount: state.video.videoCount - state.video.campaignCount,
    videoCount: state.video.videoCount,
    viewCount: state.video.viewCount,
    campaignCount: state.video.campaignCount,
    user: state.auth.user,
    auth: state.auth,
    emailConfig: state.email,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getEmailConfigurations: () => dispatch(getEmailConfigurations()),
    getVideoCount: () => dispatch(getVideoCount()),
    getCampaignCount: () => dispatch(getCampaignCount()),
    isEmailConfigured: () => dispatch(isEmailConfigured()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
