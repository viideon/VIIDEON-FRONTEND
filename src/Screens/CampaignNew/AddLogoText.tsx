import React from "react";
import { Grid, Button } from "@material-ui/core";
import { toast } from "react-toastify";
import { Input } from "reactstrap";
import "./style.css";

interface IProps {
  moveToNextStep: () => void;
  videoToEdit: any;
  saveEditedVideo: (finalBlob: any) => void;
}
interface IState {
  img: any;
  logoX: number | string;
  logoY: number | string;
  text: string;
  btnText: string;
}
class AddLogo extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      img: null,
      logoX: 0,
      logoY: 0,
      text: "",
      btnText: "Skip"
    };
    this.draw = this.draw.bind(this);
  }
  upload: any;
  canvas: any;
  canvas2: any;
  videoStream: any;
  mediaRecorder: any;
  sourceNode: any;
  recordedBlobs: any = [];
  cwidth: any;
  cheight: any;

  setInputRef = (ref: any) => {
    this.upload = ref;
  };
  triggerFileUploadBtn = () => {
    this.upload.click();
  };
  onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0] !== null) {
      this.setState({ img: URL.createObjectURL(e.target.files![0]) });
      toast.info("Logo selected play the video to see the logo");
    } else {
      toast.error("error in selecting file");
    }
  };

  componentDidMount() {
    const video: any = this.refs.video;
    video.src = URL.createObjectURL(this.props.videoToEdit);
    this.canvas = this.refs.canvas;
    this.canvas2 = this.refs.dummyCanvas;
    const img: any = this.refs.image;
    const ctx = this.canvas.getContext("2d");
    const ctx2 = this.canvas2.getContext("2d");
    const audioCtx: any = new AudioContext();
    const dest: any = audioCtx.createMediaStreamDestination();
    const aStream: any = dest.stream;
    this.sourceNode = audioCtx.createMediaElementSource(video);
    this.sourceNode.connect(dest);
    this.sourceNode.connect(audioCtx.destination);
    this.videoStream = this.canvas.captureStream(60);
    this.videoStream.addTrack(aStream.getAudioTracks()[0]);
    this.mediaRecorder = new MediaRecorder(this.videoStream);
    let cw: any, ch: any;
    let that = this;
    this.cwidth = video.clientWidth;
    this.cheight = video.clientHeight;
    video.addEventListener(
      "play",
      function() {
        cw = video.clientWidth;
        ch = video.clientHeight;
        that.canvas.width = cw;
        that.canvas.height = ch;
        that.canvas2.width = cw;
        that.canvas2.height = ch;
        audioCtx.resume();
        that.draw(video, img, ctx, ctx2, cw, ch);

        if (
          that.mediaRecorder.state === "paused" &&
          that.mediaRecorder.state !== "inactive"
        ) {
          return that.mediaRecorder.resume();
        }
        that.mediaRecorder.start();
      },
      false
    );
    video.addEventListener("ended", function() {
      that.mediaRecorder.stop();
    });
    video.addEventListener("pause", function() {
      that.mediaRecorder.pause();
    });
    this.mediaRecorder.onstop = function(e: any) {
      let blob = new Blob(that.recordedBlobs, { type: "video/mp4" });
      that.recordedBlobs = [];
      // let videoURL = URL.createObjectURL(blob);
      that.props.saveEditedVideo(blob);
      that.setState({ btnText: "Finalize" });
      toast.success("video edited click finalize to upload and send");
    };
  }
  draw(
    video: any,
    img: any,
    context: any,
    context2: any,
    width: any,
    height: any
  ): any {
    if (video.paused || video.ended) return false;

    context2.drawImage(video, 0, 0, width, height);
    context2.drawImage(img, this.state.logoX, this.state.logoY, 70, 70);
    context2.font = "30px Arial";
    context2.fillText(this.state.text, 200, 200);
    let idata = context2.getImageData(0, 0, width, height);
    let that = this;
    context.putImageData(idata, 0, 0);
    this.mediaRecorder.ondataavailable = function(e: any) {
      e.data && that.recordedBlobs.push(e.data);
    };

    setTimeout(function() {
      that.draw(video, img, context, context2, width, height);
    }, 0);
  }
  setIconPosition = (position: string) => {
    let x, y: any;
    switch (position) {
      case "top-left":
        x = (this.canvas.width / 100) * 1;
        y = (this.canvas.height / 100) * 1;
        this.setState({ logoX: x, logoY: y });
        return;
      case "bottom-left":
        x = this.canvas.width / 100;
        y = (this.canvas.height / 100) * 90;
        this.setState({ logoX: x, logoY: y - 30 });
        return;
      case "bottom-right":
        x = (this.canvas.width / 100) * 90;
        y = (this.canvas.height / 100) * 90;
        this.setState({ logoX: x - 20, logoY: y - 30 });
        return;
      case "top-right":
        x = (this.canvas.width / 100) * 90;
        y = this.canvas.height / 100;
        this.setState({ logoX: x - 20, logoY: y });
        return;
      default:
        return;
    }
  };
  changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ text: e.target.value });
  };
  render() {
    return (
      <Grid container>
        <Grid item xs={1} sm={1} md={1} lg={1}></Grid>
        <Grid item xs={10} sm={10} md={10} lg={10}>
          <h3 className="recordHeading">Add a Logo</h3>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              {" "}
              <video ref="video" controls width="100%" />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              {" "}
              <canvas ref="canvas" />
            </Grid>
          </Grid>

          <canvas ref="dummyCanvas" style={{ display: "none" }} />

          <img
            alt="logo"
            src={this.state.img ? this.state.img : null}
            style={{ display: "none" }}
            ref="image"
          />
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <h4 className="addLogoMessage">Add Logo</h4>
              <input
                id="uploadInput"
                type="file"
                onChange={this.onFileChange}
                ref={this.setInputRef}
                accept="image/x-png,image/gif,image/jpeg"
              />
              <Button
                onClick={this.triggerFileUploadBtn}
                style={{ backgroundColor: "rgb(249, 104, 107)", color: "#000" }}
              >
                Upload
              </Button>
              <h5 className="positionTxt">Change Position</h5>
              <Button
                style={logoPositionBtn}
                onClick={() => this.setIconPosition("top-left")}
              >
                Top Left
              </Button>
              <Button
                style={logoPositionBtn}
                onClick={() => this.setIconPosition("top-right")}
              >
                Top Right
              </Button>
              <Button
                style={logoPositionBtn}
                onClick={() => this.setIconPosition("bottom-left")}
              >
                Bottom Left
              </Button>
              <Button
                style={logoPositionBtn}
                onClick={() => this.setIconPosition("bottom-right")}
              >
                Bottom Right
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <h4 className="addLogoMessage">Add Text</h4>
              <Input
                type="text"
                placeholder="Add Text"
                name="text"
                value={this.state.text}
                onChange={this.changeText}
                style={{ width: "80%" }}
              />
            </Grid>
          </Grid>

          <div className="btnSingleWrap">
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={this.props.moveToNextStep}
            >
              {this.state.btnText}
            </Button>
          </div>
        </Grid>
        <Grid item xs={1} sm={1} md={10} lg={10}></Grid>
      </Grid>
    );
  }
}

const logoPositionBtn = {
  backgroundColor: "#d3d3d3",
  marginLeft: "2px"
};
export default AddLogo;
