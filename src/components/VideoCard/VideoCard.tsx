import React, { FC } from "react";
import { Card, CardTitle, CardBody } from "reactstrap";
import { Player } from "video-react";
import "../../../node_modules/video-react/dist/video-react.css";
import "./styles.css";

type IProps = {
  title: string;
  url: string;
};
const VideoCard: FC<IProps> = ({ title, url }) => {
  return (
    <>
      <Card className="VideoMain">
        <Player playsInline poster="/assets/poster.png" src={url} />
        <CardBody>
          <CardTitle>{title}</CardTitle>
        </CardBody>
      </Card>
    </>
  );
};
export default VideoCard;
