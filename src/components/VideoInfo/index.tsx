import React from "react";
import {
  FaEnvelopeOpen,
  FaHandPointUp,
  FaEye,
  FaVideo,
  FaShare
} from "react-icons/fa";
import { Tooltip } from "@material-ui/core";
import * as Constants from "../../constants/constants";
import { timeDifference } from "../.././lib/helpers";
import "./style.css";
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
  emailOpens?: number;
  ctaClicks?: any;
  date?: any;
}
interface IProps {
  video?: Video;
}
const VideoInfo: React.FC<IProps> = ({ video }) => {
  return (
    <div>
      <Tooltip title="Email Opens" enterDelay={0}>
        <span className="videoDateWrapper">
          <span className="itemsInfo">
            {video && timeDifference(video.date)}
          </span>
        </span>
      </Tooltip>
      <Tooltip title="Email Opens" enterDelay={0}>
        <span className="firstInfoContainer">
          <span className="itemsInfo">
            {video && video.emailOpens ? video.emailOpens : "0"}
          </span>
          <span className="itemsInfo">
            <FaEnvelopeOpen />
          </span>
        </span>
      </Tooltip>
      <Tooltip title="Email Shared" enterDelay={0}>
        <span className="mainInfoContainer">
          {Constants.DASH}
          <span className="itemsInfo">
            {video && video.emailShareCount ? video.emailShareCount : "0"}
          </span>
          <span className="itemsInfo">
            <FaShare />
          </span>
        </span>
      </Tooltip>
      <Tooltip title="Views" enterDelay={0}>
        <span className="mainInfoContainer">
          {Constants.DASH}
          <span className="itemsInfo">
            {video && video.views ? video.views : "0"}
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
            {video && video.watch ? video.watch : "0"}
          </span>
          <span className="itemsInfo">
            <FaVideo />
          </span>
        </span>
      </Tooltip>
      <Tooltip title="CTA Clicks" enterDelay={0}>
        <span className="mainInfoContainer">
          {Constants.DASH}
          <span className="itemsInfo">
            {video && video.ctaClicks ? video.ctaClicks : "0"}
          </span>
          <span className="itemsInfo">
            <FaHandPointUp />
          </span>
        </span>
      </Tooltip>
    </div>
  );
};

export default VideoInfo;
