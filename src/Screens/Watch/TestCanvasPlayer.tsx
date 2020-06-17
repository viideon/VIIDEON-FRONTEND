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
              url:
                "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/195px-Real_Madrid_CF.svg.png",
              position: "topRight",
              width: 30,
              height: 30
            }}
            src="https://paractice.s3.amazonaws.com/1591959514483sample.mp4"
            textProps={{
              text: "Hello world",
              textColor: "#fff",
              fontSize: 30,
              vAlign: "top",
              align: "left"
            }}
            thumbnail="https://learn.zoner.com/wp-content/uploads/2017/03/minolta_g400.jpg?fidl=2019-06-mag-en"
          />
        </div>
      </div>
    );
  }
}

export default TestCanvas;
