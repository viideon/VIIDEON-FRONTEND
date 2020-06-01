import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserVideos } from "../../Redux/Actions/videos";
import { Grid } from "@material-ui/core";
import VideoCard from "../VideoCard/VideoCard";
import "../../../node_modules/video-react/dist/video-react.css";
import RecordOption from "../RecordOption";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./styles.css";

type IProps = {
  history: any;
  getUserVideos: () => void;
  userVideos: object[];
  loadingVideos: boolean;
};

class VideoSection extends Component<IProps> {
  componentDidMount() {
    this.props.getUserVideos();
  }
  navigateToVideoTab = (id: string) => {
    this.props.history.push(`/videotab/${id}`);
  };
  render() {
    const { userVideos, loadingVideos } = this.props;
    return (
      <div className="VideoComponent">
        <div className="mainHeadingWrapper">
          <span className="Header">MY VIDEOS</span>
          <RecordOption history={this.props.history} />
        </div>
        {loadingVideos && <CircularProgress style={{ marginLeft: "50%" }} />}
        <Grid container spacing={3}>
          {userVideos &&
            userVideos.map((video: any) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={video._id}>
                <VideoCard
                  title={video.title}
                  url={video.url}
                  thumbnail={video.thumbnail}
                  onClick={() => this.navigateToVideoTab(video._id)}
                />
              </Grid>
            ))}
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    userVideos: state.video.videos,
    loadingVideos: state.video.loadingVideos
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getUserVideos: () => dispatch(getUserVideos())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VideoSection);
