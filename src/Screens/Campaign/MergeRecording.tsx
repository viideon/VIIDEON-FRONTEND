import React from "react";
import { Button, CircularProgress } from "@material-ui/core";

interface IProps {
  moveToNextStep: () => void;
  moveToPreviousStep: () => void;
  mergeVideos: () => void;
  video: any;
}
class MergeRecording extends React.Component<IProps> {
  componentDidMount() {
    this.props.mergeVideos();
  }
  render() {
    let videoUrl: any;
    if (this.props.video) {
      videoUrl = URL.createObjectURL(this.props.video);
    }
    return (
      <div className="wrapperMerge">
        <h5 className="recordHeading">Merge Recorded</h5>
        {this.props.video ? (
          <video src={videoUrl} controls width="50%" />
        ) : (
          <CircularProgress />
        )}
        <div className="btnDoubleWrap">
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={this.props.moveToPreviousStep}
          >
            Prev
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={this.props.moveToNextStep}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }
}

export default MergeRecording;
