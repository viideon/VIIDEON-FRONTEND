import React from "react";
import RecordRTC from "recordrtc";
import { Tooltip } from "@material-ui/core";
import { Select, MenuItem, InputLabel } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import Counter from "./Counter";
import Button from "../Reusable/ActionButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import { toast } from "react-toastify";

import "./style.css";

const hasGetUserMedia = !!navigator.getUserMedia;

interface IProps {
  getBlob: (blob: any) => void;
  reset?: () => void;
  proceed?: () => void;
  interActive?: boolean;
  quality?: number;
  uploaded?: boolean;
  video?: any;
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
    deniedPermission: false,
    pause: false,
    note: false,
    isClicked: false,
  };
  recordVideo: any;
  video: any;
  localStream: any;
  resultVideo: any;

  componentDidMount() {
    this.handleUploaded(this.props);
    this.resultVideo = this.refs.resultVideo;
    this.setupMedia();
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.quality && this.state.selectValue !== nextProps.quality) {
      this.setQuality({ target: { value: nextProps.quality } });
    }
    this.handleUploaded(nextProps);
  }

  handleUploaded = (props: any) => {
    if (!this.resultVideo) {
      setTimeout(() => {
        this.handleUploaded(props);
      }, 50);
    } else if (props.uploaded) {
      if (props.video) {
        this.resultVideo.src = URL.createObjectURL(props.video);
        clearInterval(this.state.timerTimeout);
        this.setState({
          showTimer: false,
          recordingStatus: false,
          disableRecordBtn: false,
          showStopBtn: false,
          showQualityInput: true,
          showRecordBtn: true,
          showResult: true,
        });
      }
    }
  };

  setupMedia = () => {
    if (this.resultVideo) {
      if (this.props.uploaded && this.props.video) return;
      let that = this;
      that.setState({ isConnecting: true });
      if (!hasGetUserMedia) {
        this.setState({
          showNotSupported: true,
          isConnecting: false,
          showRecordBtn: false,
        });
        return;
      }
      this.video = this.refs.video;
      this.requestUserMedia();
    } else {
      setTimeout(() => {
        this.setupMedia();
      }, 500);
    }
  };

  captureUserMedia = (callback: any) => {
    const params: any = {
      video: {
        width: {
          ideal: this.state.width,
        },
        height: {
          ideal: this.state.height,
        },
      },
      audio: true,
    };

    navigator.getUserMedia(params, callback, (error) => {
      if (error.name === "NotAllowedError") {
        this.setState({
          deniedPermission: true,
          isConnecting: false,
          showRecordBtn: false,
        });
      }
    });
  };

  requestUserMedia = () => {
    this.captureUserMedia((stream: any) => {
      this.recordVideo = RecordRTC(stream, {
        type: "video",
        mimeType: "video/webm;codecs=vp8",
      });
      this.localStream = stream;
      this.video.srcObject = this.localStream || "";
      this.setState({ isConnecting: false });
    });
  };

  handleRecording = () => {
    if (!this.recordVideo) return toast.error("Allow camera's access first!");
    this.setState({
      showCountdown: true,
      showRecordBtn: false,
      showQualityInput: false,
    });
    setTimeout(() => this.startRecord(), 3000);
  };

  startRecord = () => {
    if (!this.recordVideo || this.state.showCountdown === false) return;
    this.setState({
      showCountdown: false,
      recordingStatus: true,
      showTimer: true,
      showStopBtn: true,
      count: 0,
    });
    this.recordVideo.startRecording();
    this.setState({
      timerTimeout: setInterval(this.trackTime, 1000),
    });
  };

  stopRecord = (getBlob: boolean) => {
    clearInterval(this.state.timerTimeout);
    this.setState({
      showTimer: false,
      recordingStatus: false,
      disableRecordBtn: false,
      showStopBtn: false,
      showQualityInput: true,
      showRecordBtn: true,
    });
    this.stopAndGetBlob(getBlob);
  };

  getSeekableBlob = (inputBlob: any, callback: any) => {
    // EBML.js copyrights goes to: https://github.com/legokichi/ts-ebml
    // @ts-ignore
    if (typeof window.EBML === 'undefined') {
      throw new Error('Please link: https://www.webrtc-experiment.com/EBML.js');
    }

    // @ts-ignore
    var reader = new window.EBML.Reader();
    // @ts-ignore
    var decoder = new window.EBML.Decoder();
    // @ts-ignore
    var tools = window.EBML.tools;

    var fileReader = new FileReader();
    fileReader.onload = function(e) {
      var ebmlElms = decoder.decode(this.result);
      const validEmlType = ["m", "u", "i", "f", "s", "8", "b", "d"] // This is from elm type of the lib
      ebmlElms = ebmlElms?.filter((elm: { type: string; }) => validEmlType.includes(elm.type))

      ebmlElms.forEach(function(element: any) {
        reader.read(element);
      });
      reader.stop();

      /** --- Breaks here. --- */
      var refinedMetadataBuf = tools.makeMetadataSeekable(reader.metadatas, reader.duration, reader.cues);

      // @ts-ignore
      var body = this.result.slice(reader.metadataSize);
      var newBlob = new Blob([refinedMetadataBuf, body], {
        type: 'video/webm'
      });

      callback(newBlob);
    };
    fileReader.readAsArrayBuffer(inputBlob);
  }

  stopAndGetBlob = (getBlob: boolean) => {
    if (!this.recordVideo) return toast.error("Camera's access denied!");
    let that = this;
    if (!getBlob) {
      try {
        this.recordVideo.stopRecording();
      } catch (error) {
        console.log("error: ", error.message);
        toast.error("No recording found");
      }
      this.props.reset && this.props.reset();
    } else {
      try {
        this.recordVideo.stopRecording(() => {
          this.getSeekableBlob(this.recordVideo.getBlob(), function(
            seekableBlob: any
          ) {
            that.stopStream();
            that.props.getBlob(seekableBlob);
            that.resultVideo.src = URL.createObjectURL(seekableBlob);
            that.setState({ showResult: true });
          });
          this.setState({ recordingStatus: false });
        });
      } catch (error) {
        console.log("error: ", error.message);
        toast.error("No recording found");
      }
    }
  };

  trackTime = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  stopStream = () => {
    this.localStream &&
      this.localStream.getTracks().forEach(function(track: any) {
        track.stop();
      });
    if (this.video) this.video.srcObect = null;
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
    } else if (value === 4) {
      this.setState({ width: 720, height: 1350, selectValue: 4 }, () => {
        this.stopStream();
        this.setupMedia();
      });
    }
  };

  componentWillUnmount() {
    this.stopStream();
  }

  pauseRecorder = () => {
    const { pause } = this.state;
    if (!pause) {
      this.recordVideo.pauseRecording();
      clearInterval(this.state.timerTimeout);
    } else {
      this.recordVideo.resumeRecording();
      this.setState({ timerTimeout: setInterval(this.trackTime, 1000) });
    }
    this.setState({ pause: !pause });
  };

  handleNotes = () => {
    this.setState({ note: !this.state.note });
  };

  handleReset = () => {
    clearInterval(this.state.timerTimeout);
    this.recordVideo = null;
    this.resultVideo.src = null;
    this.setState({
      showResult: false,
      showStopBtn: false,
      count: 0,
      timerTimeout: 0,
      showTimer: false,
      showRecordBtn: true,
      showCountdown: false,
      recordingStatus: false,
    });
    try {
      this.recordVideo && this.recordVideo.stopRecording();
    } catch (error) {
      console.log("err: in stoping: ", error.message);
    }
    this.props.reset && this.props.reset();
    setTimeout(() => {
      this.setupMedia();
    }, 220);
  };

  handleProceed = () => {
    const { isClicked } = this.state;
    if (!isClicked) {
      this.props.proceed && this.props.proceed();
      this.setState({ isClicked: true });
    }
  };

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
      deniedPermission,
      note,
    } = this.state;
    const min = Math.floor(count / 60) % 60;
    const hour = Math.floor(count / 3600);
    const sec = Math.floor(count % 60);
    return (
      <div className="customeRecWrapper">
        <div className="videoStreamWrapper">
          {this.props.interActive && !showRecordBtn && (
            <div className="safeAreaWrapper">
              <div className="fcY"></div>
              <div className="fcR"></div>
            </div>
          )}
          <div className="NoteWrapper" style={{ display: !note ? "none" : "" }}>
            <TextField id="overlayNote" multiline rows={20} />
          </div>
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
              left: 0,
            }}
          />
          <video
            ref="resultVideo"
            controls={this.props?.interActive ? false : true || true}
            autoPlay
            style={{
              visibility: showResult ? "visible" : "hidden",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
          {showCountdown && <Counter />}
          <span className="timerRecording">
            {showTimer && (
              <span>
                {`${hour}`}:{min < 10 ? `0${min}` : min}:
                {sec < 10 ? `0${sec}` : sec}
              </span>
            )}
            {!showTimer && !showResult ? (
              <span>
                <ArrowDownwardIcon />
                Press{" "}
                <b style={{ color: "#ff0202", textTransform: "uppercase" }}>
                  Record
                </b>{" "}
                to Start!
                <ArrowDownwardIcon />{" "}
              </span>
            ) : (
              showResult && <span>Proceed with this video?</span>
            )}
          </span>
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
        </div>
        <div
          className="recorderActionWrapper"
          style={{
            background:
              showStopBtn && !showResult
                ? "#fdb415"
                : showResult
                ? "#ffffff"
                : "",
          }}
        >
          {!showResult ? (
            <>
              <Tooltip title="Add note" placement="top" arrow>
                <div className="addNote">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={note}
                        onChange={this.handleNotes}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Teleprompter"
                    labelPlacement="bottom"
                  />
                </div>
              </Tooltip>
              {!showStopBtn && (
                <Tooltip title="Record" placement="top" arrow>
                  <FiberManualRecordIcon
                    className="recordingBtn"
                    onClick={() => showRecordBtn && this.handleRecording()}
                  />
                </Tooltip>
              )}
              {showStopBtn && (
                <Tooltip title="Stop" placement="top" arrow>
                  <div className="stopBtnWrapper">
                    <StopRoundedIcon
                      className="stopBtn"
                      onClick={() => showStopBtn && this.stopRecord(true)}
                    />
                  </div>
                </Tooltip>
              )}
              <Tooltip title="Cancel" placement="top" arrow>
                <CancelRoundedIcon
                  style={{ color: showStopBtn ? "#406c7f" : "" }}
                  className="cancelAction"
                  onClick={this.handleReset}
                />
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Proceed" placement="top" arrow>
                <CheckCircleIcon
                  style={{
                    color: "#fdb415",
                    background: "none",
                    border: "none",
                  }}
                  // disabled={true}
                  className="cursorPointer recordingBtn"
                  onClick={this.handleProceed}
                />
              </Tooltip>
              <Tooltip title="Re-record" placement="top" arrow>
                <CancelRoundedIcon
                  style={{
                    color: "#ff0000",
                    background: "none",
                    border: "none",
                  }}
                  className="cursorPointer recordingBtn"
                  onClick={this.handleReset}
                />
              </Tooltip>
            </>
          )}
        </div>
        {!this.props?.interActive && (
          <div className="recordQualityInput">
            {showQualityInput && (
              <div className="qualityWrapper">
                <InputLabel>Video Quality</InputLabel>
                <Select
                  id="videoQuality"
                  onChange={this.setQuality}
                  value={this.state.selectValue}
                >
                  <MenuItem value={1}> 1280 x 720 (High defination)</MenuItem>
                  <MenuItem value={2}>800 x 600 (Standard defination)</MenuItem>
                  <MenuItem value={3}>640 x 480 (Normal defination)</MenuItem>
                  <MenuItem value={4}>Portrait</MenuItem>
                </Select>
              </div>
            )}
            <div className="btnWrapper">
              <Button
                id="reset"
                text="Reset"
                onClick={() => {
                  this.stopRecord(false);
                }}
                style={{
                  fontWeight: "bold",
                  fontSize: "larger",
                  width: "80px",
                  borderRadius: "6px",
                  fontFamily: "Poppins",
                  fontWaight: "bold",
                }}
                color="#FFFFFF"
                bgColor="#FF404E"
              />
              <Button
                id="done"
                text="Done"
                onClick={() => {
                  !showRecordBtn
                    ? this.stopRecord(true)
                    : alert("No recording found");
                }}
                style={{
                  fontWeight: "bold",
                  fontSize: "larger",
                  width: "180px",
                  borderRadius: "6px",
                  fontFamily: "Poppins",
                  fontWaight: "bold",
                  backgroundImage:
                    "linear-gradient(-90deg, rgb(97, 181, 179), rgb(97, 181, 179), rgb(252, 179, 23))",
                }}
                color="#FFFFFF"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Recording;
