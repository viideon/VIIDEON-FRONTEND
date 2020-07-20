import React from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import GeneralStats from "../../components/GeneralStats";
// import VideoViews from "../../components/VideoViews";
// import ActivityAnalytics from "../../components/ActivityAnalytics";
import "./style.css";
interface IProps {
  singleVideo?: any;
  videoCount: number;
  emailShareCount: number;
  ctaCount: number;
  emailOpenCount: number;
  viewCount: number;
  watchCount: number;
}
class Analytics extends React.Component<IProps> {
  render() {
    return (
      <div className="wrapperAnalytics">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <GeneralStats
              singleVideo={this.props.singleVideo}
              videoCount={this.props.videoCount}
              emailShareCount={this.props.emailShareCount}
              emailOpenCount={this.props.emailOpenCount}
              viewCount={this.props.viewCount}
              watchCount={this.props.watchCount}
              ctaCount={this.props.ctaCount}
            />
          </Grid>
          {/* <Grid item xs={12} md={6}>
            <VideoViews />
          </Grid> */}
          {/* <Grid item xs={12} md={12}>
            <ActivityAnalytics />
          </Grid> */}
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    singleVideo: state.video.singleVideo,
    videoCount: state.video.videoCount,
    emailShareCount: state.video.emailShareCount,
    ctaCount: state.video.ctaCount,
    emailOpenCount: state.video.emailOpenCount,
    viewCount: state.video.viewCount,
    watchCount: state.video.watchCount
  };
};

export default connect(mapStateToProps)(Analytics);
