import React, { FC } from "react";
import { Card } from "reactstrap";
import { Player } from "video-react";
import "../../../node_modules/video-react/dist/video-react.css";
import "./style.css";

type IProps = {
  url: string;
  thumbnail?: string;
};
const VideoPlayer: FC<IProps> = ({ url, thumbnail }) => {
  return (
    <div>
      <Card className="VideoMain">
        <div>
          <Player
            playsInline
            poster={thumbnail ? thumbnail : "/assests/poster"}
            src={url}
            fluid={false}
            height={230}
            width="100%"
          />
        </div>
      </Card>
    </div>
  );
};
export default VideoPlayer;
