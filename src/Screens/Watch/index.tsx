import React from "react";
import VideoPlayer from "../../components/VideoPlayer";
import Grid from "@material-ui/core/Grid";

class Watch extends React.Component {
  render() {
    return (
      <div style={container}>
        <Grid container>
          <Grid item md={3} sm={2} xs={1}></Grid>
          <Grid item md={6} sm={8} xs={10}>
            <VideoPlayer
              url="https://paractice.s3.amazonaws.com/1587546924861.webm"
              height={300}
            />
          </Grid>
          <Grid item md={3} sm={2} xs={1}></Grid>
        </Grid>
      </div>
    );
  }
}

const container = {
  marginTop: "100px"
};
export default Watch;
