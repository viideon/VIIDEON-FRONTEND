import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Input } from "reactstrap";
import VideoRecorder from "react-video-recorder";
import "./style.css";

interface IProps {
  moveToNextStep: () => void;
  moveToPreviousStep: () => void;
  saveIntro: (blob: any) => void;
}
class RecordIntro extends React.Component<IProps> {
  state = {
    videoRecord: []
  };
  render() {
    return (
      <Grid container>
        <Grid item xs={1} sm={1} md={2} lg={2}></Grid>
        <Grid item xs={10} sm={10} md={8} lg={8}>
          <h4 className="selectCampaign">Select Campaign Type</h4>
          <Input type="select">
            <option>Campaign Type </option>
            <option> Campaign Type2</option>
            <option> Campaign Type3</option>
            <option> Campaign Type 4</option>
          </Input>
          <h3 className="recordHeading introHeading">Record a Introduction</h3>
          <div className="recorderWrapper">
            <VideoRecorder
              isOnInitially={false}
              showReplayControls
              replayVideoAutoplayAndLoopOff
              isReplayVideoInitiallyMuted={false}
              onRecordingComplete={(videoBlob: any) =>
                this.props.saveIntro(videoBlob)
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
              Record Message
            </Button>
          </div>
        </Grid>
        <Grid item xs={1} sm={1} md={2} lg={2}></Grid>
      </Grid>
    );
  }
}

export default RecordIntro;
