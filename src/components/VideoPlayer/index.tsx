import React, { FC } from "react";
import { Player } from "video-react";
import { thumbnailDefault } from "../../constants/constants";
import "../../../node_modules/video-react/dist/video-react.css";
import "./style.css";

type IProps = {
  url: string;
  thumbnail?: string;
  height?: number;
};
const VideoPlayer: FC<IProps> = ({ url, thumbnail, height }) => {
  return (
    <div className="playerWrapper">
      <Player
        playsInline
        poster={thumbnail ? thumbnail : thumbnailDefault}
        src={url}
        fluid={false}
        height={height ? height : 230}
        width="100%"
      />
    </div>
  );
};
export default VideoPlayer;
