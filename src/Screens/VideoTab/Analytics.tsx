import React from "react";
import { Grid } from "@material-ui/core";
import GeneralStats from "../../components/GeneralStats";
import VideoViews from "../../components/VideoViews";
import ActivityAnalytics from "../../components/ActivityAnalytics";
import "./style.css";
interface IProps {
  singleVideo?: any;
}
class Analytics extends React.Component<IProps> {
  render() {
    return (
      <div className="wrapperAnalytics">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <GeneralStats singleVideo={this.props.singleVideo} />
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
