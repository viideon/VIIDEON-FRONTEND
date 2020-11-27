import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";
import { toast } from 'react-toastify';
import { isVideo } from '../../../constants/constants'
import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import PanoramaIcon from '@material-ui/icons/Panorama';
import "react-tabs/style/react-tabs.css";
import "../style.css";



class LandingQuestion extends Component<any> {
  video: any = null;
  handleUploadFile = (file: any) => {
    if (!file) return;
    if (isVideo(file.target.files[0])) {
      toast.info("Added");
      this.props.onChange({ target: { name: "video", value: file.target.files[0] } })
      this.props.onChange({ target: { name: "uploaded", value: true } })
      this.props.toggleSendVariable();
      this.props.moveToNextStep();
    } else {
      toast.error("Invalid file type!")
    }

  }
  render() {
    return (
      <Grid container className="LandingQuestionWrapper">
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div className="moveNextBTNWrapper" onClick={this.props.moveToNextStep}>
            <VideocamRoundedIcon />
            <Typography variant="h4">Record a video using</Typography>
            <Typography variant="h4">your webcam</Typography>
          </div>
          <div className="uploadBTNWrapper" onClick={() => { this.video.click() }}>
            <PanoramaIcon />
            <Typography variant="h4">Upload a video or</Typography>
            <Typography variant="h4">pick from the library</Typography>
          </div>
        </Grid>
        <input style={{ display: "none" }} ref={(ref: any) => { this.video = ref }} type="file" id="video" name="video" accept="video/*" onChange={this.handleUploadFile} />
      </Grid>
    )
  }
}

export default LandingQuestion;