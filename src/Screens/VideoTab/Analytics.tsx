import React from "react";
import { Grid } from "@material-ui/core";
import GeneralStats from "../../components/GeneralStats";
// import VideoViews from "../../components/VideoViews";
// import ActivityAnalytics from "../../components/ActivityAnalytics";
import "./style.css";
interface IProps {
  singleVideo?: any;
  videoCount: number;
}
class Analytics extends React.Component<IProps> {
  render() {
    console.log(this.props.videoCount, "ana");
    return (
      <div className="wrapperAnalytics">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <GeneralStats
              singleVideo={this.props.singleVideo}
              videoCount={this.props.videoCount}
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

export default Analytics;
