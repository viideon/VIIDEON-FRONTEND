import React from "react";
import { Button } from "@material-ui/core";

interface IProps {
  moveToNextStep: () => void;
  moveToPreviousStep: () => void;
}
class MergeRecording extends React.Component<IProps> {
  render() {
    return (
      <div className="wrapperMerge">
        <h5 className="recordHeading">
          Merge Recorded Videos not functional yet
        </h5>
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
