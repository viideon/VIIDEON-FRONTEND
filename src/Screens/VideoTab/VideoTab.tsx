import React, { useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";
import classnames from "classnames";
import {
  FaInfo,
  FaChartLine,
  FaCut,
  FaPalette,
  FaRegEye,
  FaReply
} from "react-icons/fa";
import VideoTabHeader from "./Header";
import Detail from "./Detail";
import Editing from "./Editing";
import Design from "./Design";
import Privacy from "./Privacy";
import VideoReplies from "./VideoReplies";
import Analytics from "./Analytics";
import * as Constants from "../../constants/constants";
import "./style.css";

const VideoTab = ({ match: { params }, history }: any) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab: any) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="wrapperVideoTab">
      <Container>
        <br />
        <br />
        <VideoTabHeader videoId={params.id} />
        <br />
        <br />
        <Nav tabs id="videoTabWrap">
          <NavItem>
            <NavLink
              id="videoTabNavLink"
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle("1");
              }}
            >
              <span>
                <i>
                  <FaInfo id="videoTabIcon" />
                </i>
              </span>
              <p>{Constants.DETAILS}</p>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              id="videoTabNavLink"
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggle("2");
              }}
            >
              <span>
                <i>
                  <FaChartLine id="videoTabIcon" />
                </i>
              </span>
              <p>{Constants.ANALYTICS}</p>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              id="videoTabNavLink"
              className={classnames({ active: activeTab === "3" })}
              onClick={() => {
                toggle("3");
              }}
            >
              <span>
                <i>
                  <FaCut id="videoTabIcon" />
                </i>
              </span>
              <p>{Constants.EDITING}</p>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              id="videoTabNavLink"
              className={classnames({ active: activeTab === "4" })}
              onClick={() => {
                toggle("4");
              }}
            >
              <span>
                <i>
                  <FaPalette id="videoTabIcon" />
                </i>
              </span>
              <p>{Constants.DESIGN}</p>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              id="videoTabNavLink"
              className={classnames({ active: activeTab === "5" })}
              onClick={() => {
                toggle("5");
              }}
            >
              <span>
                <i>
                  <FaRegEye id="videoTabIcon" />
                </i>
              </span>
              <p>{Constants.PRIVACY}</p>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              id="videoTabNavLink"
              className={classnames({ active: activeTab === "6" })}
              onClick={() => {
                toggle("6");
              }}
            >
              <span>
                <i>
                  <FaReply id="videoTabIcon" />
                </i>
              </span>
              <p>{Constants.VIDEO_REPLIES}</p>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Container>
              <Detail />
            </Container>
          </TabPane>
          <TabPane tabId="2">
            <Analytics />
          </TabPane>
          <TabPane tabId="3">
            <Editing videoId={params.id} />
          </TabPane>
          <TabPane tabId="4">
            <Design />
          </TabPane>
          <TabPane tabId="5">
            <Privacy />
          </TabPane>
          <TabPane tabId="6">
            <VideoReplies />
          </TabPane>
        </TabContent>
      </Container>
    </div>
  );
};
export default VideoTab;
