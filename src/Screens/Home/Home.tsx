import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import VideocamIcon from "@material-ui/icons/Videocam";
import PublishIcon from "@material-ui/icons/Publish";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import EditIcon from "@material-ui/icons/Edit";
import SideBar from "../../components/SideBar/SideBar";
import HeaderCard from "../../components/HeaderCards/Cards";
import VideoSection from "../../components/VideosSection/VideoSection";
import { connect } from "react-redux";
import { getVideosLength } from "../../Redux/Selectors";
import Styles from "./styles";
import "./styles.css";

type IProps = {
  history: any;
  noOfVideos: number;
};

class Home extends Component<IProps> {
  navigate = (show?: string) => {
    this.props.history.push({ pathname: "/video/create", show: show });
  };
  render() {
    return (
      <div>
        <SideBar history={this.props.history} />
        <div className="wrapperHomeContent">
          <Grid container spacing={1}>
            <Grid item xs={6} md={3}>
              <HeaderCard
                styles={Styles.headerCardOne}
                Video={this.props.noOfVideos ? this.props.noOfVideos : "0"}
                Title="Videos"
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <HeaderCard
                styles={Styles.headerCardTwo}
                Video="0"
                Title="Total Video Views"
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <HeaderCard
                styles={Styles.headerCardThree}
                Video="3"
                Title="Call to Action"
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <HeaderCard
                styles={Styles.headerCardFour}
                Video="1"
                Title="Team Members"
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
                <h4>Record a Video</h4>
              </div>
            </Grid>
            <Grid item xs={6} md={3}>
              <div
                className="actionsHomePage"
                onClick={() => this.navigate("upload")}
              >
                <PublishIcon style={iconStyle} />
                <h4>Upload a Video</h4>
              </div>
            </Grid>
            <Grid item xs={6} md={3}>
              <div
                className="actionsHomePage"
                onClick={() => alert("Feature not created yet")}
              >
                <ImageSearchIcon style={iconStyle} />
                <h4>Create a Campaign</h4>
              </div>
            </Grid>
            <Grid item xs={6} md={3}>
              <div
                className="actionsHomePage"
                onClick={() => alert("Feature not created yet")}
              >
                <EditIcon style={iconStyle} />
                <h4>Edit My Message</h4>
              </div>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <VideoSection history={this.props.history} />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const iconStyle = {
  fontSize: "180px",
  cursor: "pointer"
};
const mapStateToProps = (state: any) => {
  let videoLength = getVideosLength(state);
  return {
    noOfVideos: videoLength
  };
};

export default connect(mapStateToProps)(Home);
