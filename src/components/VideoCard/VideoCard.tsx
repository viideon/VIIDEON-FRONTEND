import React, { FC } from "react";
import { Card, CardTitle, CardBody } from "reactstrap";
import { Player } from "video-react";
import "../../../node_modules/video-react/dist/video-react.css";
import "./styles.css";

type IProps = {
  title: string;
  url: string;
  onClick?: any;
  thumbnail?: string;
};
const VideoCard: FC<IProps> = ({ title, url, thumbnail, onClick }) => {
  return (
    <div onClick={onClick}>
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
        <CardBody id="videoCardBody">
          <CardTitle className="text-truncate">{title}</CardTitle>
        </CardBody>
      </Card>
    </div>
  );
};
export default VideoCard;
