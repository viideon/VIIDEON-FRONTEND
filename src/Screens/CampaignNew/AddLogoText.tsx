import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Input } from "reactstrap";
import canvasTxt from "canvas-txt";
import { CompactPicker } from "react-color";
import { toast } from "react-toastify";
import "./style.css";

interface IProps {
  saveLogoBlob: (blob: any) => void;
  moveToNextStep: () => void;
  saveTextLogoProps: (logoProps: any, textProps: any) => void;
  videoToEdit: any;
  saveEditedVideo: (finalBlob: any) => void;
  saveThumbnailBlob: (blob: any) => void;
}
interface IState {
  img: any;
  logoX: number | string;
  logoY: number | string;
  text: string;
  btnText: string;
  textColor: string;
  fontSize: number;
  vAlign: string;
  align: string;
  iconPos: string;
}
class AddLogo extends React.Component<IProps, IState> {
  video: any;
  upload: any;
  img: any;
  canvas: any;
  canvas2: any;
  videoStream: any;
  mediaRecorder: any;
  sourceNode: any;
  recordedBlobs: any = [];
  cwidth: any;
  cheight: any;
  constructor(props: any) {
    super(props);
    this.state = {
      img: null,
      logoX: 10,
      logoY: 10,
      text: "",
      btnText: "Skip",
      textColor: "#fff",
      fontSize: 40,
      vAlign: "top",
      align: "left",
      iconPos: "top-left"
    };
    this.draw = this.draw.bind(this);
  }
  componentDidMount() {
    this.video = this.refs.video;
    this.video.src = URL.createObjectURL(this.props.videoToEdit);
    this.canvas = this.refs.canvas;
    this.canvas2 = this.refs.dummyCanvas;
    this.img = this.refs.image;
    const ctx = this.canvas.getContext("2d");
    const ctx2 = this.canvas2.getContext("2d");
    const audioCtx: any = new AudioContext();
    const dest: any = audioCtx.createMediaStreamDestination();
    const aStream: any = dest.stream;
    this.sourceNode = audioCtx.createMediaElementSource(this.video);
    this.sourceNode.connect(dest);
    this.sourceNode.connect(audioCtx.destination);
    this.videoStream = this.canvas.captureStream(60);
    this.videoStream.addTrack(aStream.getAudioTracks()[0]);
    this.mediaRecorder = new MediaRecorder(this.videoStream);
    let cw: any, ch: any;
    let that = this;
    this.cwidth = this.video.clientWidth;
    this.cheight = this.video.clientHeight;
    this.video.addEventListener(
      "play",
      function() {
        cw = that.video.clientWidth;
        ch = that.video.clientHeight;
        that.canvas.width = cw;
        that.canvas.height = ch;
        that.canvas2.width = cw;
        that.canvas2.height = ch;
        audioCtx.resume();
        that.draw(that.video, that.img, ctx, ctx2, cw, ch);

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
    this.video.addEventListener("ended", function() {
      that.mediaRecorder.stop();
    });
    this.video.addEventListener("pause", function() {
      that.mediaRecorder.pause();
    });
    this.mediaRecorder.onstop = function(e: any) {
      // let blob = new Blob(that.recordedBlobs, { type: "video/webm" });
      // that.recordedBlobs = [];
      // that.props.saveEditedVideo(blob);
      // that.setState({ btnText: "Finalize" });
      // toast.success("video edited click finalize to upload and send");
    };
  }

  setInputRef = (ref: any) => {
    this.upload = ref;
  };
  triggerFileUploadBtn = () => {
    this.upload.click();
  };
  onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0] !== null) {
      if (!e.target.files![0].name.match(/\.(jpg|jpeg|png)$/)) {
        toast.error("Please add valid image");
        return;
      }
      await this.compress(e.target.files![0]);
      // if (this.video.paused) {
      //   this.video.play();
      // }
      toast.info("Logo selected play the video to see the logo");
    } else {
      toast.error("error in selecting file");
    }
  };

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
    context2.drawImage(img, this.state.logoX, this.state.logoY);
    context2.fillStyle = this.state.textColor;
    canvasTxt.fontSize = this.state.fontSize;
    canvasTxt.vAlign = this.state.vAlign;
    canvasTxt.align = this.state.align;
    canvasTxt.lineHeight = 20;
    // canvasTxt.debug = true;
    canvasTxt.drawText(
      context2,
      this.state.text,
      0,
      0,
      width - 10,
      height - 10
    );
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
  compress(file: any) {
    const width = 100;
    const height = 100;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const elem = document.createElement("canvas");
        elem.width = width;
        elem.height = height;
        const ctx: any = elem.getContext("2d");
        // img.width and img.height will contain the original dimensions
        ctx.drawImage(img, 0, 0, width, height);
        ctx.canvas.toBlob(
          (blob: any) => {
            console.log("blob of image", blob);
            this.setState({ img: URL.createObjectURL(blob) });
            this.props.saveLogoBlob(blob);
          },
          `${file.type}`,
          1
        );
      };
      // (reader.onerror = error => console.log(error));
    };
  }
  setIconPosition = (position: string) => {
    if (this.state.img === null) {
      toast.info("Please upload a logo");
      return;
    }
    this.setState({ iconPos: position });
    let x, y: any;
    switch (position) {
      case "top-left":
        this.setState({ logoX: 10, logoY: 10 });
        return;
      case "bottom-left":
        x = 10;
        y = this.canvas.height - this.img.height - 10;
        this.setState({ logoX: x, logoY: y });
        return;
      case "bottom-right":
        x = this.canvas.width - this.img.width - 10;
        y = this.canvas.height - this.img.height - 10;

        this.setState({ logoX: x, logoY: y });
        return;

      case "top-right":
        x = this.canvas.width - this.img.width - 10;
        y = 10;
        this.setState({ logoX: x - 20, logoY: y });
        return;
      default:
        return;
    }
  };
  setTextPosition = (position: string) => {
    switch (position) {
      case "top-left":
        this.setState({ align: "left", vAlign: "top" });
        return;
      case "bottom-left":
        this.setState({ align: "left", vAlign: "bottom" });
        return;
      case "bottom-right":
        this.setState({ align: "right", vAlign: "bottom" });
        return;
      case "top-right":
        this.setState({ align: "right", vAlign: "top" });
        return;
      case "center":
        this.setState({ align: "center", vAlign: "middle" });
        return;
      default:
        return;
    }
  };
  changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ text: e.target.value });
  };
  handleChangeColor = (color: any) => {
    this.setState({ textColor: color.hex });
  };
  changeFontSize = (e: any) => {
    this.setState({ fontSize: e.target.value });
  };
  moveToNextStep = () => {
    this.getThumbnail(false);
    this.props.moveToNextStep();
  };
  getThumbnail = (edited: boolean) => {
    if (edited) {
      this.canvas.getContext("2d").drawImage(this.video, 0, 0, 1280, 720);
      this.canvas.toBlob((blob: any) => {
        this.props.saveThumbnailBlob(blob);
      }, "image/jpeg");
    } else {
      const elem = document.createElement("canvas");
      elem.width = 1280;
      elem.height = 720;
      const ctx: any = elem.getContext("2d");
      ctx.drawImage(this.video, 0, 0, 1280, 720);
      ctx.canvas.toBlob(
        (blob: any) => {
          console.log("Url thumbnail", URL.createObjectURL(blob));
          this.props.saveThumbnailBlob(blob);
        },
        "image/jpeg",
        1
      );
    }
  };
  finalize = () => {
    this.getThumbnail(true);
    const textProps = {
      text: this.state.text,
      textColor: this.state.textColor,
      fontSize: this.state.fontSize,
      vAlign: this.state.vAlign,
      align: this.state.align
    };
    const logoProps = {
      url: this.state.img,
      position: this.state.iconPos,
      width: 50,
      height: 50
    };
    this.props.saveTextLogoProps(logoProps, textProps);
    this.props.moveToNextStep();
  };
  render() {
    return (
      <Grid container>
        <Grid item xs={1} sm={1} md={1} lg={1}></Grid>
        <Grid item xs={10} sm={10} md={10} lg={10}>
          <h3 className="recordHeading">Add Logo and Text to Video</h3>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <video ref="video" controls width="100%" />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <canvas ref="canvas" />
            </Grid>
          </Grid>

          <canvas ref="dummyCanvas" style={{ display: "none" }} />

          <img
            alt="logo"
            src={this.state.img ? this.state.img : null}
            style={{ display: "none", maxWidth: "200px", maxHeight: "200px" }}
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
              <h5 className="positionTxt">Change Logo Position</h5>
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
              <h5 className="positionTxt">Change Text Position</h5>
              <Button
                style={logoPositionBtn}
                onClick={() => this.setTextPosition("center")}
              >
                Center
              </Button>
              <Button
                style={logoPositionBtn}
                onClick={() => this.setTextPosition("top-left")}
              >
                Top Left
              </Button>
              <Button
                style={logoPositionBtn}
                onClick={() => this.setTextPosition("top-right")}
              >
                Top Right
              </Button>
              <Button
                style={logoPositionBtn}
                onClick={() => this.setTextPosition("bottom-left")}
              >
                Bottom Left
              </Button>
              <Button
                style={logoPositionBtn}
                onClick={() => this.setTextPosition("bottom-right")}
              >
                Bottom Right
              </Button>
              <h5 className="positionTxt">Select Font Size</h5>
              <div style={{ display: "flex", flexWrap: "nowrap" }}>
                <input
                  type="range"
                  id="font"
                  name="font"
                  min="10"
                  max="100"
                  style={{ width: "80%" }}
                  value={this.state.fontSize}
                  onChange={this.changeFontSize}
                ></input>
                <span style={{ width: "10%", padding: "10px" }}>
                  {this.state.fontSize}px
                </span>
              </div>

              <h4 className="addLogoMessage">
                Choose Text Color
                <span className="optionalText">(optional)</span>
              </h4>
              <CompactPicker
                color={this.state.textColor}
                onChangeComplete={this.handleChangeColor}
              />
            </Grid>
          </Grid>

          <div className="btnEditVideo">
            <Button
              variant="contained"
              size="large"
              color="default"
              onClick={this.moveToNextStep}
              style={{ marginRight: "10px" }}
            >
              Skip
            </Button>
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={this.finalize}
            >
              Finalize
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
