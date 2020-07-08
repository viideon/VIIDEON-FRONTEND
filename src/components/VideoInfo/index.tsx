import React from "react";
import {
  FaRegEnvelopeOpen,
  FaHandPointUp,
  FaEye,
  FaVideo
} from "react-icons/fa";
import { Tooltip } from "@material-ui/core";
import "./style.css";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import * as Constants from "../../constants/constants";

const VideoInfo: React.FC = () => {
  return (
    <div>
      <Tooltip title="Email opens" placement="top" arrow>
        <span className="firstInfoContainer">
          <span className="itemsInfo">{Constants.ZERO} </span>
          <span className="itemsInfo">
            <FaRegEnvelopeOpen />
          </span>
        </span>
      </Tooltip>
      <Tooltip title="Email clicks" placement="top" arrow>
        <span className="mainInfoContainer">
          {Constants.DASH}
          <span className="itemsInfo">{Constants.ZERO} </span>
          <span className="itemsInfo">
            <FaHandPointUp />
          </span>
        </span>
      </Tooltip>
      <Tooltip title="Views" placement="top" arrow>
        <span className="mainInfoContainer">
          {Constants.DASH}
          <span className="itemsInfo">{Constants.ZERO} </span>
          <span className="itemsInfo">
            <FaEye />
          </span>
        </span>
      </Tooltip>
      <Tooltip title="Watches" placement="top" arrow>
        <span className="mainInfoContainer">
          {Constants.DASH}
          <span className="itemsInfo">{Constants.ZERO} </span>
          <span className="itemsInfo">
            <FaVideo />
          </span>
        </span>
      </Tooltip>
      <Tooltip title="CTA clicks" placement="top" arrow>
        <span className="mainInfoContainer">
          {Constants.DASH}
          <span className="itemsInfo">{Constants.ZERO} </span>
          <span className="itemsInfo">
            <MdCheckBoxOutlineBlank />
          </span>
        </span>
      </Tooltip>
    </div>
  );
};

export default VideoInfo;
