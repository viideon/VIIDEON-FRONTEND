import React from "react";
import RecordRTC from "recordrtc";
import { toast } from "react-toastify";
import { Grid, Button } from "@material-ui/core";
import recordGif from "../../assets/video-record.gif";
import "./style.css";

const hasGetUserMedia = !!navigator.getUserMedia;

class Recording extends React.Component {
  state = {
    recordVideo: null,
    src: "",
    recordBtnText: "Record Intro",
    recordingStatus: false
  };
  recordVideo: any;
  video: any;
  localStream: any;
  componentDidMount() {
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
    console.log("requestUserMedia");
    this.captureUserMedia((stream: any) => {
      this.recordVideo = RecordRTC(stream, { type: "video" });
      this.localStream = stream;
      this.video.srcObject = this.localStream;
      console.log("setting stream");
    });
  };

  startRecord = () => {
    toast.info("Recording started");
    if (this.state.recordBtnText === "Record Intro") {
      this.captureUserMedia((stream: any) => {
        // this.recordVideo = RecordRTC(stream, { type: "video" });
        this.recordVideo.startRecording();
      });
    } else {
      this.recordVideo.resumeRecording();
    }
    this.setState({ recordingStatus: true });
  };

  stopRecord = () => {
    if (this.state.recordBtnText === "Record Conclusion") {
      toast.info("Conclusion recorded");
      this.recordVideo.stopRecording(() => {
        alert(URL.createObjectURL(this.recordVideo.blob));
      });
      //   this.recordVideo.camera.stop();
      this.localStream.getTracks().forEach(function(track: any) {
        track.stop();
        console.log("relesing stream");
      });
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
  componentWillUnmount() {
    this.localStream.getTracks().forEach(function(track: any) {
      track.stop();
    });
    console.log("relesing stream");
  }
  render() {
    return (
      <Grid container>
        <Grid item xs={1} sm={1} md={3} lg={3}></Grid>
        <Grid item xs={10} sm={10} md={6} lg={6}>
          <div
            style={{
              textAlign: "center",
              marginTop: "80px",
              paddingBottom: "50px"
            }}
          >
            <h2>{this.state.recordBtnText}</h2>
            <div className="videoStreamWrapper">
              <video ref="video" muted autoPlay width="100%" />
              {this.state.recordingStatus && (
                <img src={recordGif} className="iconRecording" alt="record" />
              )}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <Button
                onClick={() => this.startRecord()}
                variant="contained"
                size="large"
                color="primary"
              >
                {this.state.recordBtnText}
              </Button>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                onClick={() => this.stopRecord()}
              >
                Stop Recording
              </Button>
            </div>
          </div>
        </Grid>
        <Grid item xs={1} sm={1} md={3} lg={3}></Grid>
      </Grid>
    );
  }
}

export default Recording;
