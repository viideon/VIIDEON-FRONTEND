import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import VideocamIcon from "@material-ui/icons/Videocam";
import PublishIcon from "@material-ui/icons/Publish";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import EditIcon from "@material-ui/icons/Edit";
import HeaderCard from "../../components/HeaderCards";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getVideoCount } from "../../Redux/Actions/videos";
import Styles from "./styles";
import "./styles.css";
import Tooltip from "@material-ui/core/Tooltip";
type IProps = {
  history: any;
  videoCount: number;
  getVideoCount: () => void;
};

class Dashboard extends Component<IProps> {
  state = {
    showDashboard: true,
    showVideos: false,
  };
  componentDidMount() {
    this.props.getVideoCount();
  }
  navigate = (show?: string) => {
    this.props.history.push({ pathname: "/video/create", show: show });
  };
  render() {
    return (
      <div className="wrapperDashboard">
        <div className="dashboardTop">
          <h3 className="dashboardTopLeft">
            Dashboard <span className="cntrlText">Control panel</span>
          </h3>
          <div className="dashboardTopRight">
            <span className="homeDashIcon">
              <i className="fas fa-tachometer-alt" />
            </span>
            <span className="homeDashIcon">Home</span>
            <span>
              <i className="fas fa-angle-right"></i>
            </span>
            <span className="txtDash">Dashboard</span>
          </div>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <Link to="/videos" className="link-style">
              <HeaderCard
                styles={Styles.headerCardOne}
                Number={this.props.videoCount}
                Title="VIDEOS"
                iconBg="#368BC4"
              />
            </Link>
          </Grid>
          <Grid item xs={6} md={3}>
            <HeaderCard
              styles={Styles.headerCardTwo}
              Number={0}
              Title="VIEWS"
              iconBg="#3A966F"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <Link to="/campaign" className="link-style">
              <HeaderCard
                styles={Styles.headerCardThree}
                Number={3}
                Title="CAMPAIGNS"
                iconBg="#7754B8"
              />
            </Link>
          </Grid>

          <Grid item xs={6} md={3}>
            <Link to="/contacts" className="link-style">
              <HeaderCard
                styles={Styles.headerCardFour}
                Number={1}
                Title="CONTACTS"
                iconBg="#CC5551"
              />
            </Link>
          </Grid>
        </Grid>
        <Grid container className="wrapperActivityHome">
          <Grid item xs={6} md={3}>
            <div
              className="actionsHomePage"
              onClick={() => this.navigate("record")}
            >
              <VideocamIcon style={iconStyle} />
              <h5>Record a Video</h5>
            </div>
          </Grid>
          <Grid item xs={6} md={3}>
            <div
              className="actionsHomePage"
              onClick={() => this.navigate("upload")}
            >
              <PublishIcon style={iconStyle} />
              <h5>Upload a Video</h5>
            </div>
          </Grid>
          <Grid item xs={6} md={3}>
            <div
              className="actionsHomePage"
              onClick={() => this.props.history.push("/campaign/new")}
            >
              <ImageSearchIcon style={iconStyle} />
              <h5>Create a Campaign</h5>
            </div>
          </Grid>
          <Grid item xs={6} md={3}>
            <Tooltip title="Under Progress">
              <div
                className="actionsHomePage"
                onClick={() => alert("Feature not created yet")}
              >
                <EditIcon style={iconStyle} />
                <h5>Edit My Message</h5>
              </div>
            </Tooltip>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const iconStyle = {
  fontSize: "100px",
  cursor: "pointer",
};
const mapStateToProps = (state: any) => {
  return {
    videoCount: state.video.videoCount,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getVideoCount: () => dispatch(getVideoCount()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
