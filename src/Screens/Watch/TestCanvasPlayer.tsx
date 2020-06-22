import React from "react";
import Player from "../../components/CanvasPlayer";

class TestCanvas extends React.Component {
  state = {
    width: 0,
    height: 0
  };
  componentDidMount() {
    let container: any = this.refs.container;
    const persistRect = JSON.parse(
      JSON.stringify(container.getBoundingClientRect())
    );
    this.setState({ width: persistRect.width, height: persistRect.height });
  }
  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          marginTop: "100px",
          paddingLeft: "10%"
        }}
      >
        <div style={{ width: "600px", height: "350px" }} ref="container">
          <Player
            width={this.state.width}
            height={this.state.height}
            autoPlay={false}
            muted={false}
            loop={false}
            logoProps={{
              url: "https://paractice.s3.amazonaws.com/1592831724504.jpeg",
              position: "top-left",
              width: "50",
              height: "50"
            }}
            src="https://paractice.s3.amazonaws.com/1592831724504.webm"
            textProps={{
              text: "Hello world",
              textColor: "#d33115",
              fontSize: 49,
              vAlign: "middle",
              align: "center"
            }}
            thumbnail="https://paractice.s3.amazonaws.com/1592831724504.jpeg"
          />
        </div>
      </div>
    );
  }
}

export default TestCanvas;
