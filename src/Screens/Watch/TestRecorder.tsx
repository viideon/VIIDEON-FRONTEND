import React from "react";
import { Grid } from "@material-ui/core";
import VideoRecorder from "../../components/VideoRecorder/index";
class TestRecorder extends React.Component {
  getBlob = (blob: any) => {
    console.log("url", URL.createObjectURL(blob));
  };
  render() {
    return (
      <div style={{ paddingTop: "100px" }}>
        <Grid container>
          <Grid item xs={1} sm={1} lg={2}></Grid>
          <Grid item xs={10} sm={10} lg={8}>
            <VideoRecorder getBlob={this.getBlob} />
          </Grid>
          <Grid item xs={1} sm={1} lg={2}></Grid>
        </Grid>
      </div>
    );
  }
}

export default TestRecorder;
