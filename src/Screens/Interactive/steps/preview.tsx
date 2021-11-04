import React, { useState } from "react";

import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import ForwardIcon from "@material-ui/icons/Forward";
import RefreshIcon from "@material-ui/icons/Refresh";
import HouseIcon from "@material-ui/icons/House";
import MenuIcon from "@material-ui/icons/Menu";
import CallMadeIcon from "@material-ui/icons/CallMade";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import { PreviewSearchBar } from "../../../components/SearchBar";

import AnswerTypeTab from "../resSteps/answerType";

import "../style.css";
import "../response.css";

const mobileView = () => {};
const ChatvidPreviewTab = (props: any) => {
  const [active, setActive] = useState("web");
  return (
    <div>
      <div className="previewTab">
        <div className="previewTabswrapper">
          <div
            className={`${active === "mobile" && "active"} tabIconWrapper`}
            onClick={() => setActive("mobile")}
          >
            <PhoneIphoneIcon />
          </div>
          <div
            className={`${active === "web" && "active"} tabIconWrapper`}
            onClick={() => setActive("web")}
          >
            <DesktopWindowsIcon />
          </div>
        </div>

        <div className="chatvidPreviewWrapper">
          <p
            className="textpreview"
            style={{
              width: `${active == "mobile" ? "50%" : ""}`,
              margin: `${active == "mobile" ? "auto" : ""}`,
            }}
          >
            This is your preview of what your contact will see and be able to
            make a choice of responding by text, audio, or a video
          </p>
          <div
            className="previewTopHead"
            style={{
              width: `${active == "mobile" ? "50%" : ""}`,
              margin: `${active == "mobile" ? "auto" : ""}`,
            }}
          >
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
          <div
            className="previewSearchHead"
            style={{
              width: `${active == "mobile" ? "50%" : ""}`,
              margin: `${active == "mobile" ? "auto" : ""}`,
            }}
          >
            <ForwardIcon className="reverse" />
            <ForwardIcon />
            <RefreshIcon />
            <HouseIcon />
            <PreviewSearchBar />
            <MenuIcon />
          </div>
          <AnswerTypeTab
            screenType={active}
            video={props.video}
            vidBlob={props.video}
            uploaded={props.uploaded}
            overlayTxt={props.text}
            align={props.align}
            vAlign={props.vAlign}
            resType={props.responseType}
            choices={props.choices}
            calendar={props.calendar}
            preview={true}
            isFull={props.fitvideo}
            history={props.history}
            fontSize={props.fontSize}
            reveal={props.reveal}
            fontStyle={props.fontStyle}
            fontWeight={props.fontWeight}
            textDecoration={props.textDecoration}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatvidPreviewTab;
