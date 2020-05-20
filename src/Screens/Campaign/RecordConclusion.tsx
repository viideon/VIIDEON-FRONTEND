import React from "react";
import { Grid, Button } from "@material-ui/core";
import VideoRecorder from "react-video-recorder";
import "./style.css";

interface IProps {
  moveToNextStep: () => void;
  saveConclusion: (blob: any) => void;
}
class RecordConclusion extends React.Component<IProps> {
  render() {
    return (
      <Grid container>
        <Grid item xs={1} sm={1} md={2} lg={2}></Grid>
        <Grid item xs={10} sm={10} md={8} lg={8}>
          <h3 className="recordHeading">Conclude your Message</h3>
          <div className="recorderWrapper">
            <VideoRecorder
              isOnInitially={false}
              showReplayControls
              replayVideoAutoplayAndLoopOff
              isReplayVideoInitiallyMuted={false}
              onRecordingComplete={(videoBlob: any) =>
                this.props.saveConclusion(videoBlob)
              }
            />
          </div>
          <div className="btnSingleWrap">
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={this.props.moveToNextStep}
            >
              Merge Clips
            </Button>
          </div>
        </Grid>
        <Grid item xs={1} sm={1} md={2} lg={2}></Grid>
      </Grid>
    );
  }
}

export default RecordConclusion;
