import React from "react";
import RecordRTC from "recordrtc";
import { Tooltip } from "@material-ui/core";
import { Select, MenuItem, InputLabel } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import Counter from "./Counter";
import "./style.css";

const hasGetUserMedia = !!navigator.getUserMedia;

interface IProps {
  getBlob: (blob: any) => void;
}

class Recording extends React.Component<IProps> {
  state = {
    recordingStatus: false,
    showEditOption: false,
    showCountdown: false,
    isConnecting: false,
    showTimer: false,
    count: 0,
    timerTimeout: 0,
    disableRecordBtn: false,
    width: 1280,
    height: 720,
    selectValue: 1,
    showQualityInput: true,
    showResult: false,
    showRecordBtn: true,
    showStopBtn: false,
    showNotSupported: false,
    deniedPermission: false
  };
  recordVideo: any;
  video: any;
  localStream: any;
  resultVideo: any;

  componentDidMount() {
    this.setupMedia();
    this.resultVideo = this.refs.resultVideo;
  }

  setupMedia = () => {
    let that = this;
    that.setState({ isConnecting: true });
    if (!hasGetUserMedia) {
      this.setState({
        showNotSupported: true,
        isConnecting: false,
        showRecordBtn: false
      });
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
        this.setState({
          deniedPermission: true,
          isConnecting: false,
          showRecordBtn: false
        });
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
      showRecordBtn: false,
      showQualityInput: false
    });
    setTimeout(() => this.startRecord(), 3000);
  };
  startRecord = () => {
    this.setState({
      showCountdown: false,
      recordingStatus: true,
      showTimer: true,
      showStopBtn: true,
      count: 0
    });
    this.recordVideo.startRecording();
    this.setState({
      timerTimeout: setInterval(this.trackTime, 1000)
    });
  };

  stopRecord = () => {
    clearInterval(this.state.timerTimeout);
    this.setState({
      showTimer: false,
      recordingStatus: false,
      disableRecordBtn: false,
      showStopBtn: false
    });
    // this.recordVideo.pauseRecording();
    this.stopAndGetBlob();
  };

  stopAndGetBlob = () => {
    let that = this;
    this.recordVideo.stopRecording(() => {
      window.getSeekableBlob(this.recordVideo.getBlob(), function(
        seekableBlob: any
      ) {
        that.stopStream();
        that.props.getBlob(seekableBlob);
        that.resultVideo.src = URL.createObjectURL(seekableBlob);
        that.setState({ showResult: true });
      });
      this.setState({
        recordingStatus: false
      });
    });
  };

  trackTime = () => {
    this.setState({
      count: this.state.count + 1
    });
  };

  stopStream = () => {
    this.localStream &&
      this.localStream.getTracks().forEach(function(track: any) {
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
    console.log("component will unmount  called");
    this.stopStream();
  }
  render() {
    const {
      count,
      showRecordBtn,
      showStopBtn,
      showResult,
      showCountdown,
      showTimer,
      showQualityInput,
      isConnecting,
      showNotSupported,
      deniedPermission
    } = this.state;
    const min = Math.floor(count / 60) % 60;
    const hour = Math.floor(count / 3600);
    const sec = Math.floor(count % 60);
    return (
      <div className="customeRecWrapper">
        <div className="videoStreamWrapper">
          <video
            ref="video"
            muted
            autoPlay
            style={{
              visibility: showResult ? "hidden" : "visible",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0
            }}
          />

          <video
            ref="resultVideo"
            muted
            controls
            style={{
              visibility: showResult ? "visible" : "hidden",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0
            }}
          />

          {showCountdown && <Counter />}
          {showTimer && (
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
          {isConnecting && <span className="loadingText">Loading ...</span>}
          {showNotSupported && (
            <span className="showNotSupported">
              Your browser cannot stream from your webcam.
            </span>
          )}
          {deniedPermission && (
            <span className="showNotSupported">
              You have denied permissions for recording, Please restart the
              browser and try again
            </span>
          )}
          {showRecordBtn && !isConnecting && (
            <Tooltip title="Record" placement="top" arrow>
              <button
                className="recordingBtn"
                onClick={() => this.handleRecording()}
              />
            </Tooltip>
          )}
          {showStopBtn && (
            <div className="stopBtnWrapper">
              <button
                className="stopBtn"
                onClick={() => this.stopRecord()}
              ></button>
            </div>
          )}
        </div>
        {showQualityInput && (
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
      </div>
    );
  }
}

export default Recording;
