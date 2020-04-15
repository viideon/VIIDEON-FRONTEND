import React from "react";
import { Grid } from "@material-ui/core";
import GeneralStats from "../../components/GeneralStats";
import VideoViews from "../../components/VideoViews";

class Analytics extends React.Component {
  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={12} md={6}>
            <GeneralStats />
          </Grid>
          <Grid item xs={12} md={6}>
            <VideoViews />
          </Grid>
          <Grid item xs={12} md={12}></Grid>
        </Grid>
      </div>
    );
  }
}

export default Analytics;
