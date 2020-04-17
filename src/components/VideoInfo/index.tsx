import React from "react";
import {
  FaRegEnvelopeOpen,
  FaHandPointUp,
  FaEye,
  FaVideo
} from "react-icons/fa";
import "./style.css";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import * as Constants from "../../constants/components/videotab";

const VideoInfo: React.FC = () => {
  return (
    <div>
      <span className="firstInfoContainer">
        <span className="itemsInfo">{Constants.ZERO} </span>
        <span className="itemsInfo">
          <FaRegEnvelopeOpen />
        </span>
      </span>
      <span className="mainInfoContainer">
        {Constants.DASH}
        <span className="itemsInfo">{Constants.ZERO} </span>
        <span className="itemsInfo">
          <FaHandPointUp />
        </span>
      </span>
      <span className="mainInfoContainer">
        {Constants.DASH}
        <span className="itemsInfo">{Constants.ZERO} </span>
        <span className="itemsInfo">
          <FaEye />
        </span>
      </span>
      <span className="mainInfoContainer">
        {Constants.DASH}
        <span className="itemsInfo">{Constants.ZERO} </span>
        <span className="itemsInfo">
          <FaVideo />
        </span>
      </span>
      <span className="mainInfoContainer">
        {Constants.DASH}
        <span className="itemsInfo">{Constants.ZERO} </span>
        <span className="itemsInfo">
          <MdCheckBoxOutlineBlank />
        </span>
      </span>
    </div>
  );
};

export default VideoInfo;
