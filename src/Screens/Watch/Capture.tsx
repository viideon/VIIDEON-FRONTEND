import React from "react";
import sample from "../../assets/sample.mp4";

interface IState {}
class Capture extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {};
    // this.capture=this.capture.bind(this);
  }
  canvas: any;
  video: any;
  componentDidMount() {}
  capture = () => {
    //getting refs
    this.video = this.refs.video;
    this.canvas = this.refs.canvas;
    this.canvas.width = 1280;
    this.canvas.height = 720;
    this.canvas.getContext("2d").drawImage(this.video, 0, 0, 1280, 720);
    this.canvas.toBlob((blob: any) => {
      alert(URL.createObjectURL(blob));
    }, "image/jpeg");
  };
  render() {
    return (
      <div>
        <div
          style={{
            marginTop: "70px",
            paddingLeft: "20px",
            paddingRight: "20px"
          }}
        >
          <video
            ref="video"
            src={sample}
            controls
            style={{ opacity: 0.00001 }}
          />
          <button onClick={() => this.capture()}>Capture</button>
          <canvas ref="canvas" style={{ display: "none" }} />
        </div>
      </div>
    );
  }
}

export default Capture;
