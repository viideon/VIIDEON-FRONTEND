import React from "react";
import { Button } from "@material-ui/core";
import sample from "../../assets/sample.mp4";
import audio_sample from "../../assets/audio_sample.mp3";

interface IState {
  img: any;
  music: any;
  text: string;
  logoX: number;
  logoY: number;
}
class VideoLayer extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      img: null,
      music: null,
      logoX: 0,
      logoY: 0,
      text: ""
    };
    this.draw = this.draw.bind(this);
  }
  id: any;
  uploadImageRef: any;
  uploadMusicRef: any;
  canvas: any;
  canvas2: any;
  videoStream: any;
  mediaRecorder: any;
  sourceNode: any;
  sourceNode2: any;
  recordedBlobs: any = [];

  setInputRef = (ref: any) => {
    this.uploadImageRef = ref;
  };
  triggerFileUploadBtn = () => {
    this.uploadImageRef.click();
  };

  onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0] !== null) {
      this.setState({ img: URL.createObjectURL(e.target.files![0]) });
    } else {
      alert("No file selected");
    }
  };
  setInputMusicRef = (ref: any) => {
    this.uploadMusicRef = ref;
  };
  triggerMusicUploadBtn = () => {
    this.uploadMusicRef.click();
  };
  onFileMusicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0] !== null) {
      this.setState({ music: URL.createObjectURL(e.target.files![0]) });
      alert("Music file added");
    } else {
      alert("No file selected");
    }
  };

  componentDidMount() {
    //getting refs
    this.canvas = this.refs.canvas;
    this.canvas2 = this.refs.canvas2;
    const video: any = this.refs.video;
    const musicElementRef: any = this.refs.music;
    const img: any = this.refs.image;
    //getting canvas context
    const ctx = this.canvas.getContext("2d");
    const ctx2 = this.canvas2.getContext("2d");
    //audio part from video
    const audioCtx: any = new AudioContext();
    const dest: any = audioCtx.createMediaStreamDestination();
    const aStream: any = dest.stream;
    this.sourceNode = audioCtx.createMediaElementSource(video);
    this.sourceNode.connect(dest);
    this.sourceNode.connect(audioCtx.destination);

    //audio part from music uploaded

    const dest2 = audioCtx.createMediaStreamDestination();
    const musicStream: any = dest2.stream;
    this.sourceNode2 = audioCtx.createMediaElementSource(musicElementRef);
    this.sourceNode2.connect(dest2);
    this.sourceNode2.connect(audioCtx.destination);

    //capturing stream and adding sound track
    this.videoStream = this.canvas.captureStream();
    this.videoStream.addTrack(aStream.getAudioTracks()[0]);
    this.videoStream.addTrack(musicStream.getAudioTracks()[0]);
    console.log("audio track", musicStream.getAudioTracks()[0]);
    this.mediaRecorder = new MediaRecorder(this.videoStream);
    let cw, ch;
    let that = this;

    video.addEventListener(
      "play",
      function() {
        console.log("called");
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

    //draw image ,video or text on invisible canvas
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

    //copies data from invisible canvas and puts it into visible canvas context
    context.putImageData(idata, 0, 0);

    //if data available pushed data into array
    this.mediaRecorder.ondataavailable = function(e: any) {
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
    console.log("state", this.state);
    return (
      <div
        style={{ marginTop: "70px", paddingLeft: "20px", paddingRight: "20px" }}
      >
        <img
          ref="image"
          src={this.state.img ? this.state.img : null}
          alt="logo"
          style={{ display: "none" }}
        />
        <audio
          ref="music"
          src={audio_sample}
          controls
          style={{ display: "none" }}
        />
        <video ref="video" src={sample} controls width={400} />
        <canvas ref="canvas" />
        <canvas ref="canvas2" style={{ display: "none" }} />
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
        <div>
          <h4 className="thumbnaillEditMsg">Add Logo</h4>
          <input
            id="uploadInput"
            type="file"
            onChange={this.onFileMusicChange}
            ref={this.setInputMusicRef}
            accept="audio/*"
          />
          <Button
            onClick={this.triggerMusicUploadBtn}
            style={{ backgroundColor: "#d3d3d3", color: "#000" }}
          >
            Add Music
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
