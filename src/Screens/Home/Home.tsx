import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import VideocamIcon from "@material-ui/icons/Videocam";
import PublishIcon from "@material-ui/icons/Publish";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import EditIcon from "@material-ui/icons/Edit";
import SideBar from "../../components/SideBar/SideBar";
import HeaderCard from "../../components/HeaderCards";
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
