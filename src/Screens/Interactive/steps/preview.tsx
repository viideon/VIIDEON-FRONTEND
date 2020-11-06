import React, { useState } from "react";

import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import ForwardIcon from '@material-ui/icons/Forward';
import RefreshIcon from '@material-ui/icons/Refresh';
import HouseIcon from '@material-ui/icons/House';
import MenuIcon from '@material-ui/icons/Menu';
import CallMadeIcon from '@material-ui/icons/CallMade';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import { PreviewSearchBar } from '../../../components/SearchBar';


import AnswerTypeTab from '../resSteps/answerType'

import "../style.css";
import "../response.css"

const ChatvidPreviewTab = (props: any) => {
  const [active, setActive] = useState("web");
  return (
    <div className="previewTab">
      <div className="previewTabswrapper">
        <div className={`${active == "mobile" && "active"} tabIconWrapper`} onClick={() => setActive("mobile")}>
          <PhoneIphoneIcon />
        </div>
        <div className={`${active == "web" && "active"} tabIconWrapper`} onClick={() => setActive("web")}>
          <DesktopWindowsIcon />
        </div>
      </div>
      <div className="chatvidPreviewWrapper">
        <div className="previewTopHead">
          <div>
            <span>
              <FiberManualRecordIcon className="closeWindow" />
            </span>
            <span>
              <FiberManualRecordIcon className="minmizeWindow" />
            </span>
            <span>
              <FiberManualRecordIcon className="expandWindow" />
            </span>
          </div>
          <CallMadeIcon />
        </div>
        <div className="previewSearchHead">
          <ForwardIcon className="reverse" />
          <ForwardIcon />
          <RefreshIcon />
          <HouseIcon />
          <PreviewSearchBar />
          <MenuIcon />
        </div>
        <AnswerTypeTab
          video={props.video}
          overlayTxt={props.text}
          align={props.align}
          valign={props.valign}
        />
      </div>
    </div>
  )
}

export default ChatvidPreviewTab;