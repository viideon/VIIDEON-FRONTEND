import React from "react";
import RecordRTC from "recordrtc";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { Grid, Button, Typography } from "@material-ui/core";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import NavigateBeforeOutlinedIcon from "@material-ui/icons/NavigateBeforeOutlined";
import Counter from "./Counter";
import MicIcon from "@material-ui/icons/Mic";
import ClosedCaptionIcon from "@material-ui/icons/ClosedCaption";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import "./style.css";

const hasGetUserMedia = !!navigator.getUserMedia;

interface IProps {
  moveToNextStep: () => void;
  moveBack: () => void;
  saveVideo: (blob: any) => void;
  template: any;
  history: any;
  isCamp?: boolean;
}

class Recording extends React.Component<IProps> {
  state = {
    recordingStatus: false,
    showEditOption: false,
    showCountdown: false,
    isConnecting: false,
    showNext: true,
    showTimer: false,
    count: 0,
    timerTimeout: 0,
    disableRecordBtn: false,
    width: 1280,
    height: 720,
    selectValue: 1,
    showQualityInput: true,
    currentStep: 1,
    totalSteps: 1,
  };
  recordVideo: any;
  video: any;
  localStream: any;
  toastOptions: any = { autoClose: 2000 };
  autoStopPromise: any = null;

  componentDidMount() {
    this.setupMedia();
    this.intializeRecordingTemplate();
  }
  intializeRecordingTemplate = () => {
    this.setState({ totalSteps: this.props.template.totalSteps });
  };
  setupMedia = () => {
    this.setState({ isConnecting: true });
    if (!hasGetUserMedia) {
      toast.info("Your browser cannot stream from your webcam.");
      return;
    }
    this.video = this.refs.video;
    this.requestUserMedia();
  };
  captureUserMedia = (callback: any) => {
    const params: any = {
      video: {
        width: {
          min: this.state.width,
        },
        height: {
          min: this.state.height,
        },
      },
      audio: true,
    };

    navigator.getUserMedia(params, callback, (error) => {
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
        mimeType: "video/webm;codecs=vp9",
      });
      this.localStream = stream;

      this.video.srcObject = this.localStream;
      this.setState({ isConnecting: false });
    });
  };

  handleRecording = () => {
    if (this.state.showCountdown) return;
    if (!this.recordVideo || !this.localStream)
      return toast.error("No camera access!");
    this.setState({
      showCountdown: true,
      disableRecordBtn: true,
      showQualityInput: false,
    });
    setTimeout(() => this.startRecord(), 3000);
  };
  startRecord = () => {
    this.autoStopPromise = setTimeout(
      () => this.stopRecord(),
      parseInt(
        this.props.template?.steps[this.state.currentStep - 1].duration
      ) *
        1000 +
        1000
    );
    this.setState({
      showCountdown: false,
      recordingStatus: true,
      showTimer: true,
      count: 0,
    });
    if (this.state.currentStep === 1) {
      this.recordVideo.startRecording();
    } else {
      this.recordVideo.resumeRecording();
    }
    this.setState({
      timerTimeout: setInterval(this.trackTime, 1000),
    });
  };

  stopRecord = () => {
    clearInterval(this.state.timerTimeout);
    clearTimeout(this.autoStopPromise);

    this.setState({
      showTimer: false,
      recordingStatus: false,
      disableRecordBtn: false,
    });
    this.recordVideo.pauseRecording();

    toast.info("Scene recorded", this.toastOptions);
    this.moveToNextTrack();
  };

  moveToNextTrack = () => {
    if (this.state.currentStep !== this.state.totalSteps) {
      this.setState({ currentStep: this.state.currentStep + 1 });
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
          recordingStatus: false,
        });
        this.props.moveToNextStep();
      });
    }
  };
  showRecInstructions = () => {
    let { currentStep } = this.state;
    let { template } = this.props;
    return (
      <div className="instructionWrapper">
        <div className="wrapperStep">
          <div className="wrapperStepHeader">
            <p>{template?.steps[currentStep - 1].description}</p>
          </div>
        </div>
      </div>
    );
  };
  trackTime = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  nameTrack = () => {
    let { currentStep } = this.state;
    let { template } = this.props;
    return template?.steps[currentStep - 1].title;
  };
  stopStream = () => {
    this.localStream &&
      this.localStream.getTracks().forEach(function(track: any) {
        track.stop();
      });
    if (this.video) this.video.srcObect = null;
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
      <div className="recordingWrapperDiv">
        <Typography variant="h4" className="shotNo">
          Shot {this.state.currentStep}{" "}
        </Typography>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <div className="recorderWrapper">
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
                    left: 0,
                  }}
                />
                {this.state.showCountdown && <Counter />}
                {this.state.showTimer && (
                  <span
                    className="timerRecording"
                    style={{
                      justifyContent: this.props.isCamp
                        ? "center"
                        : "space-between",
                    }}
                  >
                    <span
                      style={{
                        color: "#ff0000",
                        marginRight: "2px",
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
                  variant="contained"
                  size="large"
                  style={{
                    background: "#fff",
                    color: "#fcb414",
                    alignSelf: "center",
                    margin: "2%",
                    borderRadius: "50%",
                    height: "70px",
                  }}
                  disabled={this.state.disableRecordBtn}
                >
                  <MicIcon />
                </Button>
                <Button
                  onClick={() => {
                    this.state.recordingStatus
                      ? this.stopRecord()
                      : this.handleRecording();
                  }}
                  variant="contained"
                  size="large"
                  style={{
                    background: "#fcb414",
                    color: "#fff",
                    margin: "2%",
                    borderRadius: "50%",
                    height: "100px",
                    width: "100px",
                  }}
                  // disabled={this.state.disableRecordBtn}
                >
                  {this.state.recordingStatus ? (
                    <VideocamOffIcon />
                  ) : (
                    <VideoCallIcon />
                  )}
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  style={{
                    background: "#fff",
                    color: "#fcb414",
                    alignSelf: "center",
                    margin: "2%",
                    borderRadius: "50%",
                    height: "70px",
                  }}
                  disabled={this.state.disableRecordBtn}
                >
                  <ClosedCaptionIcon />
                </Button>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            {this.showRecInstructions()}
          </Grid>
        </Grid>
        <Grid container className="actionBTNsWrapper" style={{ margin: "1%" }}>
          <Grid
            container
            xs={12}
            sm={12}
            md={6}
            lg={6}
            className="sm-none"
          ></Grid>
          <Grid container xs={12} sm={12} md={6} lg={6}>
            <Grid item xs={12} sm={4} md={4} lg={4} style={{ margin: "4px" }}>
              <Button
                color="default"
                className="changeIndustryBtn"
                startIcon={<NavigateBeforeOutlinedIcon />}
                onClick={this.props.moveBack}
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={12} sm={4} md={5} lg={5} style={{ margin: "4px" }}>
              <Button
                color="default"
                className="continueBTN"
                endIcon={<KeyboardArrowRightIcon />}
                // onClick={this.props.moveToNextStep}
              >
                Next Shot
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withRouter<any, any>(Recording);
