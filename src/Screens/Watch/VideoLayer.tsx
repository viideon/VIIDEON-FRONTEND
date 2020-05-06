import React from "react";
import { Button } from "@material-ui/core";
import cheese from "../../assets/1.jpeg";
import sample from "../../assets/sample.mp4";

interface IState {
  img: any;
}
class VideoLayer extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      img: null
    };
    this.draw = this.draw.bind(this);
  }
  upload: any;
  setInputRef = (ref: any) => {
    this.upload = ref;
  };
  triggerFileUploadBtn = () => {
    this.upload.click();
  };

  onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0] !== null) {
      // let file = e.target.files![0];
      this.setState({ img: e.target.files![0] });
    } else {
      alert("No file selected");
    }
  };

  componentDidMount() {
    const canvas: any = this.refs.canvas;
    const canvas2: any = this.refs.canvas2;
    const video: any = this.refs.video;
    const img: any = this.refs.image;
    const ctx = canvas.getContext("2d");
    const ctx2 = canvas2.getContext("2d");

    let cw, ch;
    let that = this;
    video.addEventListener(
      "play",
      function() {
        cw = video.clientWidth;
        ch = video.clientHeight;
        canvas.width = cw;
        canvas.height = ch;
        canvas2.width = cw;
        canvas2.height = ch;

        that.draw(video, img, ctx, ctx2, cw, ch);
      },
      false
    );
  }

  draw(
    video: any,
    img: any,
    context: any,
    context2: any,
    width: any,
    height: any
  ) {
    if (video.paused || video.ended) return false;
    context2.drawImage(video, 0, 0, width, height);
    context2.drawImage(img, 150, 150, 70, 70);
    context2.font = "30px Arial";
    context2.fillText("Hello World", 200, 70);
    let idata = context2.getImageData(0, 0, width, height);
    let data = idata.data;
    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];
      let brightness = (3 * r + 4 * g + b) >>> 3;
      data[i] = brightness;
      data[i + 1] = brightness;
      data[i + 2] = brightness;
    }
    //     var imageData = canvas.getContext('2d').createImageData(width, height);
    // imageData.data.set(myData);
    idata.data.set(data);
    // Draw the pixels onto the visible canvas
    context.putImageData(idata, 0, 0);
    // Start over!
    let that = this;
    setTimeout(function() {
      that.draw(video, img, context, context2, width, height);
    }, 0);
    // requestAnimationFrame(this.draw(video, context, context2, width, height));
  }
  render() {
    return (
      <div style={{ marginTop: "70px" }}>
        <canvas ref="canvas" />
        <canvas ref="canvas2" />
        <img
          ref="image"
          src={this.state.img}
          alt="logo"
          style={{ display: "none" }}
        />
        <video ref="video" src={sample} controls width={400} />
        <div>
          <h4 className="thumbnaillEditMsg">Add Logo</h4>
          <input
            id="uploadInput"
            type="file"
            onChange={this.onFileChange}
            ref={this.setInputRef}
            accept="image/x-png,image/gif,image/jpeg"
          />
          <Button name="Upload File" onClick={this.triggerFileUploadBtn} />
        </div>
      </div>
    );
  }
}

export default VideoLayer;

{
  /* // componentDidMount() {
//   const canvas: any = this.refs.canvas;
//   const ctx = canvas.getContext("2d");
//   const img: any = this.refs.image;
//   img.onload = () => {
//     ctx.drawImage(img, 0, 0);
//     var gradient = ctx.createLinearGradient(40, 0, 220, 0);

//     gradient.addColorStop(0, "rgba(245, 246, 252, 0.40)");
//     gradient.addColorStop(0.5, "rgba(117, 19, 93, 0.40)");
//     gradient.addColorStop(0.1, "rgba(117, 19, 93, 0.40)");
//     ctx.font = "30px Arial";
//     ctx.fillText("Hello World", 340, 90);
//     ctx.fillStyle = gradient;
//     ctx.fillRect(0, 0, 640, 425);
//     // alert(canvas.toDataURL());
//   };
// } */
}
