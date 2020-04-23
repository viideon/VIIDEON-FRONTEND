import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import VideocamIcon from "@material-ui/icons/Videocam";
import PublishIcon from "@material-ui/icons/Publish";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import EditIcon from "@material-ui/icons/Edit";
import HeaderCard from "../../components/HeaderCards";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getVideosLength } from "../../Redux/Selectors";
import Styles from "./styles";
import "./styles.css";

type IProps = {
  history: any;
  noOfVideos: number;
};

class Dashboard extends Component<IProps> {
  state = {
    showDashboard: true,
    showVideos: false
  };
  navigate = (show?: string) => {
    this.props.history.push({ pathname: "/video/create", show: show });
  };
  render() {
    return (
      <div className="wrapperDashboard">
        <h4 className="dashboardTxt">
          Dashboard <span className="cntrlText">Control panel</span>
        </h4>
        <Grid container spacing={1}>
          <Grid item xs={6} md={3}>
            <HeaderCard
              styles={Styles.headerCardOne}
              Number={this.props.noOfVideos ? this.props.noOfVideos : 0}
              Title="VIDEOS"
              iconBg="#368BC4"
            />
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
            <HeaderCard
              styles={Styles.headerCardThree}
              Number={3}
              Title="CAMPAIGNS"
              iconBg="#7754B8"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <HeaderCard
              styles={Styles.headerCardFour}
              Number={1}
              Title="CONTACTS"
              iconBg="#CC5551"
            />
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
              onClick={() => alert("Feature not created yet")}
            >
              <ImageSearchIcon style={iconStyle} />
              <h5>Create a Campaign</h5>
            </div>
          </Grid>
          <Grid item xs={6} md={3}>
            <div
              className="actionsHomePage"
              onClick={() => alert("Feature not created yet")}
            >
              <EditIcon style={iconStyle} />
              <h5>Edit My Message</h5>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const iconStyle = {
  fontSize: "100px",
  cursor: "pointer"
};
const mapStateToProps = (state: any) => {
  let videoLength = getVideosLength(state);
  return {
    noOfVideos: videoLength
  };
};

export default withRouter(connect(mapStateToProps)(Dashboard));
