import React from "react";
import { Grid, Button } from "@material-ui/core";
import "./style.css";

interface IProps {
  moveToNextStep: () => void;
  previewVideo: any;
}
class VideoPreview extends React.Component<IProps> {
  render() {
    return (
      <Grid container>
        <Grid item xs={1} sm={1} md={3} lg={3}></Grid>
        <Grid item xs={10} sm={10} md={6} lg={6}>
          <h3 className="recordHeading">Video Preview</h3>
          {this.props.previewVideo && (
            <video
              ref="videoPreview"
              width="100%"
              controls
              src={URL.createObjectURL(this.props.previewVideo)}
            />
          )}
          <div className="btnSingleWrap">
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={this.props.moveToNextStep}
            >
              Next
            </Button>
          </div>
        </Grid>
        <Grid item xs={1} sm={1} md={3} lg={3}></Grid>
      </Grid>
    );
  }
}

export default VideoPreview;
