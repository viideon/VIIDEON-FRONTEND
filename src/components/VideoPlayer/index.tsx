import React from "react";
import { Player } from "video-react";
import { thumbnailDefault } from "../../constants/constants";
import "../../../node_modules/video-react/dist/video-react.css";
import "./style.css";

type IProps = {
  url: string;
  thumbnail?: string;
  height?: number | string;
  watched?: () => void;
};

class VideoPlayer extends React.Component<IProps> {
  player: any;
  state = {
    currentTime: 0,
    watched: false
  };
  componentDidMount() {
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }
  handleStateChange(state: any, prevState: any) {
    if (
      state.currentTime !== prevState.currentTime &&
      state.currentTime >= 3 &&
      this.state.watched === false
    ) {
      this.setState({ watched: true });
      this.props.watched && this.props.watched();
    }
  }
  render() {
    const { thumbnail, height, url } = this.props;
    return (
      <Player
        ref={(player: any) => {
          this.player = player;
        }}
        playsInline
        poster={thumbnail ? thumbnail : thumbnailDefault}
        src={url}
        fluid={false}
        height={height ? height : 200}
        width="auto"
        preload="auto"
        aspectRatio="16:9"
      />
    );
  }
}

export default VideoPlayer;
