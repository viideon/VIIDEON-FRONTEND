import React from "react";
import {
  // FaRegEnvelopeOpen,
  FaHandPointUp,
  FaEye,
  FaVideo
} from "react-icons/fa";
import { Tooltip } from "@material-ui/core";
import "./style.css";
// import { MdCheckBoxOutlineBlank } from "react-icons/md";
import * as Constants from "../../constants/constants";
interface Video {
  url: string;
  thumbnail?: string;
  title?: string;
  campaign?: boolean;
  logoProps?: any;
  textProps?: any;
  views?: number;
  watch?: number;
  emailShareCount?: number;
}
interface IProps {
  video?: Video;
}
const VideoInfo: React.FC<IProps> = ({ video }) => {
  return (
    <div>
      {/* <Tooltip title="Email Opens" enterDelay={0}>
        <span className="firstInfoContainer">
          <span className="itemsInfo">{Constants.ZERO} </span>
          <span className="itemsInfo">
            <FaRegEnvelopeOpen />
          </span>
        </span>
      </Tooltip> */}
      <Tooltip title="Email Shared" enterDelay={0}>
        <span className="mainInfoContainer">
          {/* {Constants.DASH} */}
          <span className="itemsInfo">
            {video && video.emailShareCount ? video.emailShareCount : "0"}{" "}
          </span>

          <span className="itemsInfo">
            <FaHandPointUp />
          </span>
        </span>
      </Tooltip>
      <Tooltip title="Views" enterDelay={0}>
        <span className="mainInfoContainer">
          {Constants.DASH}
          <span className="itemsInfo">
            {video && video.views ? video.views : "0"}{" "}
          </span>
          <span className="itemsInfo">
            <FaEye />
          </span>
        </span>
      </Tooltip>
      <Tooltip title="Watches" enterDelay={0}>
        <span className="mainInfoContainer">
          {Constants.DASH}
          <span className="itemsInfo">
            {video && video.watch ? video.watch : "0"}{" "}
          </span>
          <span className="itemsInfo">
            <FaVideo />
          </span>
        </span>
      </Tooltip>
      {/* <Tooltip title="CTA Clicks" enterDelay={0}>
        <span className="mainInfoContainer">
          {Constants.DASH}
          <span className="itemsInfo">{Constants.ZERO} </span>
          <span className="itemsInfo">
            <MdCheckBoxOutlineBlank />
          </span>
        </span>
      </Tooltip> */}
    </div>
  );
};

export default VideoInfo;
