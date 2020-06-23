import React from "react";
import RecordRTC from "recordrtc";
import DetectRTC from "detectrtc";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { Grid, Button } from "@material-ui/core";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import StopIcon from "@material-ui/icons/Stop";
// import recordGif from "../../assets/video-record.gif";
import Counter from "./Counter";
import "./style.css";

const hasGetUserMedia = !!navigator.getUserMedia;

interface IProps {
  moveToNextStep: () => void;
  saveVideo: (blob: any) => void;
  history: any;
}

class Recording extends React.Component<IProps> {
  state = {
    recordingStatus: false,
    showEditOption: false,
    showCountdown: false,
    isConnecting: false,
    showNext: true,
    trackNo: 1,
    showTimer: false,
    count: 0,
    timerTimeout: 0,
    disableRecordBtn: false
  };
  recordVideo: any;
  video: any;
  localStream: any;

  componentDidMount() {
    let that = this;
    DetectRTC.load(function() {
      if (DetectRTC.isWebsiteHasWebcamPermissions === false) {
        console.log("No permissions");
      } else if (!DetectRTC.hasWebcam && !DetectRTC.isWebRTCSupported) {
        console.log("No webcam");
      }
    });
    that.setState({ isConnecting: true });
    if (!hasGetUserMedia) {
      toast.info("Your browser cannot stream from your webcam.");
      return;
    }
    this.video = this.refs.video;
    this.requestUserMedia();
  }
  captureUserMedia = (callback: any) => {
    var params: any = {
      video: {
        width: {
          min: 1080
        },
        height: {
          min: 720
        }
      },
      audio: true
    };
    navigator.getUserMedia(params, callback, error => {
      if (error.name === "NotAllowedError") {
        toast.info(
          "You have denied permission for recording, Please enable them in your browser to record a video"
        );
        this.props.history.push("/");
      }
    });
  };

  requestUserMedia = () => {
    this.captureUserMedia((stream: any) => {
      this.recordVideo = RecordRTC(stream, {
        type: "video/webm",
        mimeType: "video/webm;codecs=vp9"
      });
      this.localStream = stream;
      this.video.srcObject = this.localStream;
      this.setState({ isConnecting: false });
    });
  };

  handleRecording = () => {
    this.setState({ showCountdown: true, disableRecordBtn: true });
    setTimeout(() => this.startRecord(), 3000);
  };
  startRecord = () => {
    this.setState({
      showCountdown: false,
      recordingStatus: true,
      showTimer: true,
      count: 0
    });
    // toast.info("Recording started");
    if (this.state.trackNo === 1) {
      this.recordVideo.startRecording();
    } else {
      this.recordVideo.resumeRecording();
    }
    this.setState({
      timerTimeout: setInterval(this.trackTime, 1000)
    });
  };

  stopRecord = () => {
    clearInterval(this.state.timerTimeout);
    this.setState({
      showTimer: false,
      recordingStatus: false,
      disableRecordBtn: false
    });
    this.recordVideo.pauseRecording();
    if (this.state.trackNo === 1) {
      toast.info("Intro recorded");
      this.moveToNextTrack();
    } else if (this.state.trackNo === 2) {
      toast.info("Message recorded");
      this.moveToNextTrack();
    } else {
      toast.info("Conclusion recorded");
      this.moveToNextTrack();
    }
  };

  moveToNextTrack = () => {
    if (this.state.trackNo === 1) {
      this.setState({ trackNo: 2 });
    } else if (this.state.trackNo === 2) {
      this.setState({ trackNo: 3 });
    } else {
      this.stopStream();
      let that = this;
      this.recordVideo.stopRecording(() => {
        window.getSeekableBlob(this.recordVideo.getBlob(), function(
          seekableBlob: any
        ) {
          that.props.saveVideo(seekableBlob);
        });

        this.setState({
          recordingStatus: false
        });
        this.props.moveToNextStep();
      });
    }
  };
  trackTime = () => {
    this.setState({
      count: this.state.count + 1
    });
  };

  nameTrack = () => {
    if (this.state.trackNo === 1) {
      return "Record Intro";
    } else if (this.state.trackNo === 2) {
      return "Record Message";
    } else {
      return "Record Conclusion";
    }
  };
  stopStream = () => {
    this.localStream &&
      this.localStream.getTracks().forEach(function(track: any) {
        track.stop();
      });
    this.video.srcObect = null;
    this.localStream = null;
  };
  componentWillUnmount() {
    this.stopStream();
  }
  render() {
    const { count } = this.state;
    const min = Math.floor(count / 60) % 60;
    const hour = Math.floor(count / 3600);
    const sec = Math.floor(count % 60);
    return (
      <Grid container>
        <Grid item xs={1} sm={1} md={3} lg={3}></Grid>
        <Grid item xs={10} sm={10} md={6} lg={6}>
          <div className="recorderWrapper">
            <h2 className="recordHeading">{this.nameTrack()}</h2>
            <div className="videoStreamWrapper">
              <video
                ref="video"
                muted
                autoPlay
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0
                }}
              />

              {/* {this.state.recordingStatus && (
                <img src={recordGif} className="iconRecording" alt="record" />
              )} */}
              {this.state.showCountdown && <Counter />}
              {this.state.showTimer && (
                <span className="timerRecording">
                  <span
                    style={{
                      color: "#ff0000",
                      marginRight: "2px"
                    }}
                  >
                    <FiberManualRecordIcon />
                  </span>
                  <span>
                    {`${hour}`}:{min < 10 ? `0${min}` : min}:
                    {sec < 10 ? `0${sec}` : sec}
                  </span>
                </span>
              )}
              {this.state.isConnecting && (
                <span className="loadingText">Loading ...</span>
              )}
            </div>

            <div className="btnDoubleWrap">
              <Button
                onClick={() => this.handleRecording()}
                variant="contained"
                size="large"
                style={{ color: "#008000" }}
                disabled={this.state.disableRecordBtn}
              >
                <KeyboardArrowRightIcon />
                {this.nameTrack()}
              </Button>
              {this.state.recordingStatus && (
                <Button
                  onClick={() => this.stopRecord()}
                  variant="contained"
                  style={{ color: "#ff0040" }}
                >
                  <StopIcon />
                  Done
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

export default withRouter<any, any>(Recording);
