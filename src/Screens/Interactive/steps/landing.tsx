import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";
import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import PanoramaIcon from '@material-ui/icons/Panorama';
import "react-tabs/style/react-tabs.css";
import "../style.css";

class LandingQuestion extends Component<any> {
  render () {
    return (
      <Grid container className="LandingQuestionWrapper">
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div className="moveNextBTNWrapper" onClick={this.props.moveToNextStep}>
            <VideocamRoundedIcon />
            <Typography variant="h4">Record a video using</Typography>
            <Typography variant="h4">your webcam</Typography>
          </div>
          <div className="uploadBTNWrapper">
            <PanoramaIcon />
            <Typography variant="h4">Upload a video or</Typography>
            <Typography variant="h4">pick from the library</Typography>
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default LandingQuestion;