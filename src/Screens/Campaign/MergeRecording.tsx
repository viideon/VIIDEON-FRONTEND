import React from "react";
import { Redirect } from "react-router-dom";
import { Button, CircularProgress } from "@material-ui/core";

interface IProps {
  moveToNextStep: () => void;
  moveToPreviousStep: () => void;
  mergeVideos: () => void;
  mergeError: boolean;
  video: any;
}
class MergeRecording extends React.Component<IProps> {
  componentDidMount() {
    this.props.mergeVideos();
  }
  render() {
    if (this.props.mergeError) {
      return <Redirect to="/" />;
    }
    return (
      <div className="wrapperMerge">
        <h5 className="recordHeading">Merge Video </h5>
        <div style={{ textAlign: "center" }}>
          {this.props.video ? (
            <video
              src={URL.createObjectURL(this.props.video)}
              controls
              width="100%"
            />
          ) : (
            <div>
              <CircularProgress /> <h5>In Progress , This may take a while </h5>
            </div>
          )}
        </div>

        <div className="btnSingleWrap">
          {this.props.video && (
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={this.props.moveToNextStep}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default MergeRecording;
