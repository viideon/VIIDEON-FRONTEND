import React from "react";
import RecordRTC from "recordrtc";
import { withRouter } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
import { toast } from "react-toastify";
import { Grid, Button, Select, MenuItem, InputLabel } from "@material-ui/core";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import StopIcon from "@material-ui/icons/Stop";
import Counter from "./Counter";
import * as Constants from "../../constants/constants";
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
    disableRecordBtn: false,
    width: 1280,
    height: 720,
    selectValue: 1,
    showQualityInput: true
  };
  recordVideo: any;
  video: any;
  localStream: any;
  toastOptions: any = { autoClose: 2000 };

  componentDidMount() {
    this.setupMedia();
  }
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
          min: this.state.width
        },
        height: {
          min: this.state.height
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
    this.setState({
      showCountdown: true,
      disableRecordBtn: true,
      showQualityInput: false
    });
    setTimeout(() => this.startRecord(), 3000);
  };
  startRecord = () => {
    this.setState({
      showCountdown: false,
      recordingStatus: true,
      showTimer: true,
      count: 0
    });
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
      toast.info("Intro recorded", this.toastOptions);
      this.moveToNextTrack();
    } else if (this.state.trackNo === 2) {
      toast.info("Message recorded", this.toastOptions);
      this.moveToNextTrack();
    } else {
      toast.info("Conclusion recorded", this.toastOptions);
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
        window.getSeekableBlob(this.recordVideo.getBlob(), function (
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
  showInstructions = () => {
    switch (this.state.trackNo) {
      case 1:
        return (
          <div className="instructionWrapper">
            <h3 className="instructionHeading">
              {Constants.INTRO_INSTRUCTION_HEADING}
            </h3>
            <p className="instructionLength">
              {Constants.INTRO_INSTRUCTION_LENGHT}
            </p>
            <ListGroup style={listGroupStyle}>
              <ListGroupItem>{Constants.INTRO_INSTRUCTION}</ListGroupItem>
              <ListGroupItem>
                <p className="exampleTxt">Example</p>
                <ul>
                  <li>{Constants.INTRO_INSTRUCTION_EXAMPLE_ONE}</li>
                  <li>{Constants.INTRO_INSTRUCTION_EXAMPLE_TWO}</li>
                  <li>{Constants.INTRO_INSTRUCTION_EXAMPLE_THREE}</li>
                </ul>
              </ListGroupItem>
            </ListGroup>
          </div>
        );

      case 2:
        return (
          <div className="instructionWrapper">
            <h3 className="instructionHeading">
              {Constants.MESSAGE_INSTRUCTION_HEADING}
            </h3>
            <p className="instructionLength">
              {Constants.MESSAGE_INSTRUCTION_LENGHT}
            </p>
            <ListGroup style={listGroupStyle}>
              <ListGroupItem>{Constants.MESSAGE_INSTRUCTION}</ListGroupItem>
              <ListGroupItem>
                <p className="exampleTxt">Example</p>
                <ul>
                  <li> {Constants.MESSAGE_INSTRUCTION_EXAMPLE_ONE}</li>
                  <li> {Constants.MESSAGE_INSTRUCTION_EXAMPLE_TWO}</li>
                </ul>
              </ListGroupItem>
            </ListGroup>
          </div>
        );
      case 3:
        return (
          <div className="instructionWrapper">
            <h3 className="instructionHeading">
              {Constants.CONCLUSION_INSTRUCTION_HEADING}
            </h3>
            <ListGroup style={listGroupStyle}>
              <ListGroupItem>{Constants.CONCLUSION_INSTRUCTION}</ListGroupItem>
              <ListGroupItem>
                <p className="exampleTxt">Example</p>
                <ul>
                  <li>{Constants.CONCLUSION_INSTRUCTION_EXAMPLE_ONE}</li>
                  <li>{Constants.CONCLUSION_INSTRUCTION_EXAMPLE_TWO}</li>
                </ul>
              </ListGroupItem>
            </ListGroup>
          </div>
        );
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
      this.localStream.getTracks().forEach(function (track: any) {
        track.stop();
      });
    this.video.srcObect = null;
    this.localStream = null;
  };
  setQuality = (e: any) => {
    let value = e.target.value;
    if (value === 1) {
      this.setState({ width: 1280, height: 720, selectValue: 1 }, () => {
        this.stopStream();
        this.setupMedia();
      });
    } else if (value === 2) {
      this.setState({ width: 800, height: 600, selectValue: 2 }, () => {
        this.stopStream();
        this.setupMedia();
      });
    } else if (value === 3) {
      this.setState({ width: 640, height: 480, selectValue: 3 }, () => {
        this.stopStream();
        this.setupMedia();
      });
    }
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
        <Grid item xs={12} sm={12} md={6} lg={6}>
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
            {this.state.showQualityInput && (
              <div className="recordQualityInput">
                <InputLabel>Quality</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  onChange={this.setQuality}
                  value={this.state.selectValue}
                >
                  <MenuItem value={1}> 1280 x 720 (High defination)</MenuItem>
                  <MenuItem value={2}>800 x 600 (Standard defination)</MenuItem>
                  <MenuItem value={3}>640 x 480 (Normal defination)</MenuItem>
                </Select>
              </div>
            )}
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
        <Grid item xs={12} sm={12} md={6} lg={6}>
          {this.showInstructions()}
        </Grid>
      </Grid>
    );
  }
}
const listGroupStyle = {
  boxShadow: "0 0 10px #cdcdcd",
  marginTop: "20px"
};
export default withRouter<any, any>(Recording);
