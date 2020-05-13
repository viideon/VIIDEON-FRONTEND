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
        <h5 className="recordHeading">Merge Recorded</h5>
        <div style={{ textAlign: "center" }}>
          {this.props.video ? (
            <video
              src={URL.createObjectURL(this.props.video)}
              controls
              width="100%"
            />
          ) : (
            <div>
              <CircularProgress /> <h5>Merge in Progress ,Please wait</h5>
            </div>
          )}
        </div>

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
      </div>
    );
  }
}

export default MergeRecording;
