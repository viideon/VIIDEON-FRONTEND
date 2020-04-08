import React, { FC } from "react";
import { Card, CardTitle, CardBody } from "reactstrap";
import { Player } from "video-react";
import "../../../node_modules/video-react/dist/video-react.css";
import "./styles.css";

type IProps = {
  title: string;
  url: string;
  onClick?: any;
};
const VideoCard: FC<IProps> = ({ title, url, onClick }) => {
  return (
    <div onClick={onClick}>
      <Card className="VideoMain">
        <Player playsInline poster="/assets/poster.png" src={url} />
        <CardBody>
          <CardTitle>{title}</CardTitle>
        </CardBody>
      </Card>
    </div>
  );
};
export default VideoCard;
