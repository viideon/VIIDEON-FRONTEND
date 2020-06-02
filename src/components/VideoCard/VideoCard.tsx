import React, { FC } from "react";
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
          style={{ objectFit: "contain", maxHeight: "100%", maxWidth: "100%" }}
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
