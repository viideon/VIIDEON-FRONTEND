import React, { FC } from "react";
// import { Card, CardBody } from "reactstrap";
// import { Player } from "video-react";
// import "../../../node_modules/video-react/dist/video-react.css";
import "./styles.css";
import VideoInfo from "../VideoInfo";
import { thumbnailDefault } from "../../constants/constants";

type IProps = {
  title: string;
  url?: string;
  onClick?: any;
  thumbnail?: string;
};
const VideoCard: FC<IProps> = ({ title, thumbnail, onClick }) => {
  return (
    <div className="wrapperVideoCard">
      <div className="videoPreview" onClick={onClick}>
        <img
          style={{ width: "100%", maxHeight: "126px" }}
          src={thumbnail ? thumbnail : thumbnailDefault}
          alt="preview"
        />
      </div>
      <div className="row" id="rowCardTitle">
        <div className="col-xs-10">
          <h5 className="titleVideo">{title}</h5>
        </div>
        <div className="col-xs-2"></div>
      </div>
      <div className="row" id="rowCardInfo">
        <div className="col-xs-12">
          <VideoInfo />
          <span className="addedVideoInfo">added 2 days ago</span>
        </div>
      </div>
    </div>
  );
};
export default VideoCard;

/* <div onClick={onClick}>
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
    <h5 className="titleVideo">{title}</h5>
  </CardBody>
</Card>
</div> */
