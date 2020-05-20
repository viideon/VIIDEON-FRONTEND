import React from "react";
import RecordRTC from "recordrtc";
import { toast } from "react-toastify";
import { Grid, Button } from "@material-ui/core";
import recordGif from "../../assets/video-record.gif";
import Counter from "./Counter";
import "./style.css";

const hasGetUserMedia = !!navigator.getUserMedia;
interface IProps {
  moveToNextStep: () => void;
  saveVideo: (blob: any) => void;
}
class Recording extends React.Component<IProps> {
  state = {
    recordVideo: null,
    src: "",
    recordBtnText: "Record Intro",
    recordingStatus: false,
    showNext: false,
    showCountdown: false,
    isConnecting: false
  };
  recordVideo: any;
  video: any;
  localStream: any;
  componentDidMount() {
    this.setState({ isConnecting: true });
    if (!hasGetUserMedia) {
      toast.info("Your browser cannot stream from your webcam.");
      return;
    }
    this.video = this.refs.video;
    this.requestUserMedia();
  }
  captureUserMedia = (callback: any) => {
    var params = { audio: true, video: true };
    navigator.getUserMedia(params, callback, error => {
      alert(JSON.stringify(error));
    });
  };

  requestUserMedia = () => {
    this.captureUserMedia((stream: any) => {
      this.recordVideo = RecordRTC(stream, { type: "video" });
      this.localStream = stream;
      this.video.srcObject = this.localStream;
      this.setState({ isConnecting: false });
    });
  };

  handleRecording = () => {
    this.setState({ showCountdown: true });
    setTimeout(() => this.startRecord(), 3000);
  };
  startRecord = () => {
    this.setState({ showCountdown: false, recordingStatus: true });
    console.log("start record");
    toast.info("Recording started");
    if (this.state.recordBtnText === "Record Intro") {
      this.recordVideo.startRecording();
    } else {
      this.recordVideo.resumeRecording();
    }
  };

  stopRecord = () => {
    if (this.state.recordBtnText === "Record Conclusion") {
      toast.info("Conclusion recorded");
      this.recordVideo.stopRecording(() => {
        this.props.saveVideo(this.recordVideo.blob);
        // alert(URL.createObjectURL(this.recordVideo.blob));
        this.setState({ showNext: true });
      });
      this.stopStream();
    } else {
      this.recordVideo.pauseRecording();
      if (this.state.recordBtnText === "Record Intro") {
        toast.info("Intro recorded");
        this.setState({ recordBtnText: "Record Message" });
      } else if (this.state.recordBtnText === "Record Message") {
        toast.info("Message recorded");
        this.setState({ recordBtnText: "Record Conclusion" });
      }
    }
    this.setState({ recordingStatus: false });
  };

  stopStream = () => {
    this.localStream &&
      this.localStream.getTracks().forEach(function(track: any) {
        track.stop();
      });
    this.video.srcObect = null;
    this.localStream = null;
    console.log("releasing stream");
  };
  componentWillUnmount() {
    this.stopStream();
  }
  render() {
    return (
      <Grid container>
        <Grid item xs={1} sm={1} md={3} lg={3}></Grid>
        <Grid item xs={10} sm={10} md={6} lg={6}>
          <div
            style={{
              textAlign: "center"
            }}
          >
            <h2 className="recordHeading">{this.state.recordBtnText}</h2>
            <div className="videoStreamWrapper">
              <video ref="video" muted autoPlay width="100%" />
              {this.state.recordingStatus && (
                <img src={recordGif} className="iconRecording" alt="record" />
              )}
              {this.state.showCountdown && <Counter />}
              {this.state.isConnecting && (
                <span className="loadingText">Loading ...</span>
              )}
            </div>

            <div className="btnDoubleWrap">
              <Button
                onClick={() => this.handleRecording()}
                variant="contained"
                size="large"
                color="primary"
              >
                {this.state.recordBtnText}
              </Button>
              {this.state.showNext && (
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  onClick={() => this.props.moveToNextStep()}
                >
                  Edit Recorded Video
                </Button>
              )}
              {this.state.showNext === false && this.state.recordingStatus && (
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  onClick={() => this.stopRecord()}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={1} sm={1} md={3} lg={3}></Grid>
      </Grid>
    );
  }
}

export default Recording;
