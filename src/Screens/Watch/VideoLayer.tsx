import React from "react";
import { Button } from "@material-ui/core";
// import cheese from "../../assets/1.jpeg";
// import sample from "../../assets/sample.mp4";
// import Whammy from "react-whammy";

interface IState {
  img: any;
  text: string;
  logoX: number;
  logoY: number;
}
class VideoLayer extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      img: null,
      logoX: 0,
      logoY: 0,
      text: ""
    };
    this.draw = this.draw.bind(this);
  }
  id: any;
  upload: any;
  canvas: any;
  canvas2: any;
  videoStream: any;
  mediaRecorder: any;
  sourceNode: any;
  // encoder = new Whammy.Video(30);
  recordedBlobs: any = [];

  setInputRef = (ref: any) => {
    this.upload = ref;
  };
  triggerFileUploadBtn = () => {
    this.upload.click();
  };

  onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0] !== null) {
      this.setState({ img: URL.createObjectURL(e.target.files![0]) });
    } else {
      alert("No file selected");
    }
  };

  componentDidMount() {
    this.canvas = this.refs.canvas;
    this.canvas2 = this.refs.canvas2;
    const video: any = this.refs.video;
    const img: any = this.refs.image;
    const ctx = this.canvas.getContext("2d");
    const ctx2 = this.canvas2.getContext("2d");
    const audioCtx: any = new AudioContext();
    const dest: any = audioCtx.createMediaStreamDestination();
    const aStream: any = dest.stream;
    this.sourceNode = audioCtx.createMediaElementSource(video);
    this.sourceNode.connect(dest);
    this.sourceNode.connect(audioCtx.destination);
    // this.canvas.addTrack(this.aStream.getAudioTracks()[0]);
    this.videoStream = this.canvas.captureStream(60);
    this.videoStream.addTrack(aStream.getAudioTracks()[0]);
    this.mediaRecorder = new MediaRecorder(this.videoStream);
    let cw, ch;
    let that = this;

    video.addEventListener(
      "play",
      function() {
        console.log("called");
        cw = video.clientWidth;
        ch = video.clientHeight;
        // var aspect = video.videoHeight / video.videoWidth;
        // var wantedWidth = 1280; // or use height
        // var height = Math.round(wantedWidth * aspect);
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
      var blob = new Blob(that.recordedBlobs, { type: "video/mp4" });
      that.recordedBlobs = [];
      var videoURL = URL.createObjectURL(blob);
      // console.log("video url on recording stop", videoURL);
      alert(videoURL);
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
    context2.fillText(this.state.text ? this.state.text : "Add Text", 200, 70);
    let idata = context2.getImageData(0, 0, width, height);
    // let data = idata.data;
    // for (let i = 0; i < data.length; i += 4) {
    //   let r = data[i];
    //   let g = data[i + 1];
    //   let b = data[i + 2];
    //   let brightness = (3 * r + 4 * g + b) >>> 3;
    //   data[i] = brightness;
    //   data[i + 1] = brightness;
    //   data[i + 2] = brightness;
    // }
    // idata.data.set(data);
    let that = this;
    context.putImageData(idata, 0, 0);
    this.mediaRecorder.ondataavailable = function(e: any) {
      console.log("on data available called  called");
      e.data && that.recordedBlobs.push(e.data);
    };

    setTimeout(function() {
      that.draw(video, img, context, context2, width, height);
    }, 0);
  }

  setIconPosition = (position: string) => {
    switch (position) {
      case "top-left":
        this.setState({ logoX: 0, logoY: 0 });
        return;
      case "bottom-left":
        this.setState({ logoX: 0, logoY: 230 });
        return;
      case "bottom-right":
        this.setState({ logoX: 330, logoY: 230 });
        return;
      case "top-right":
        this.setState({ logoX: 330, logoY: 0 });
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
      <div
        style={{ marginTop: "70px", paddingLeft: "20px", paddingRight: "20px" }}
      >
        <canvas ref="canvas" />
        <canvas ref="canvas2" style={{ display: "none" }} />
        <img
          ref="image"
          src={this.state.img ? this.state.img : null}
          alt="logo"
          style={{ display: "none" }}
        />
        <video ref="video"  controls width={400} />
        <div>
          <h4 className="thumbnaillEditMsg">Add Logo</h4>
          <input
            id="uploadInput"
            type="file"
            onChange={this.onFileChange}
            ref={this.setInputRef}
            accept="image/x-png,image/gif,image/jpeg"
          />
          <Button
            onClick={this.triggerFileUploadBtn}
            style={{ backgroundColor: "#d3d3d3", color: "#000" }}
          >
            Add Logo
          </Button>
        </div>
        <div style={{ marginTop: "10px" }}>
          <h5>Change Position</h5>
          <Button onClick={() => this.setIconPosition("top-left")}>
            Top Left
          </Button>
          <Button onClick={() => this.setIconPosition("top-right")}>
            Top Right
          </Button>
          <Button onClick={() => this.setIconPosition("bottom-left")}>
            Bottom Left
          </Button>
          <Button onClick={() => this.setIconPosition("bottom-right")}>
            Bottom Right
          </Button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Add Text"
            name="text"
            value={this.state.text}
            onChange={this.changeText}
          />
          {/* <Button
            style={{ backgroundColor: "#d3d3d3" }}
            onClick={this.outputVideo}
          >
            Output Video
          </Button> */}
        </div>
      </div>
    );
  }
}

export default VideoLayer;
