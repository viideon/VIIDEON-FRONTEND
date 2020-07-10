import React from "react";
import { Grid } from "@material-ui/core";
import { Button } from "reactstrap";
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
          <h3 className="recordHeading">Preview Video</h3>
          {this.props.previewVideo && (
            <div className="wrapperPreviewVideo">
              <video
                ref="videoPreview"
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0
                }}
                controls
                src={URL.createObjectURL(this.props.previewVideo)}
              />
            </div>
          )}
          <div className="btnSingleWrap">
            <Button
              style={{
                border: "none",
                background: "rgb(34, 185, 255)",
                color: "rgb(255, 255, 255)",
                width: "150px",
                marginTop: "30px"
              }}
              size="lg"
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
