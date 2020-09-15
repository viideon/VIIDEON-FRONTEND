import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getVideo, cleanSingleVideo } from "../../Redux/Actions/videos";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import {
  FaInfo,
  FaChartLine,
  FaCut,
  FaShare
} from "react-icons/fa";
import VideoTabHeader from "./Header";
import Detail from "./Detail";
import Editing from "./Editing";
import Share from "./Share";
import Analytics from "./Analytics";
import "./style.css";

const VideoTab = ({ match: { params }, getVideo, cleanSingleVideo }: any) => {
  const [isDisabled, enableLinks] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
  useEffect(() => {
    getVideo(params.id);
    setTimeout(() => enableLinks(false), 1000);
    return () => {
      cleanSingleVideo();
    };
  }, []);

  return (
    <div className="wrapperVideoTab">
      <br />
      <br />
      <VideoTabHeader />
      <Tabs >
        <TabList>
          <Tab><span className="videoTabIcon"><FaCut /></span>Editing</Tab>
          <Tab disabled={isDisabled}><span className="videoTabIcon"><FaInfo /></span>Details</Tab>
          <Tab disabled={isDisabled}><span className="videoTabIcon"><FaChartLine /></span>Analytics</Tab>
          <Tab disabled={isDisabled}><span className="videoTabIcon"><FaShare /></span>Share</Tab>
        </TabList>
        <TabPanel forceRender>
          <Editing videoId={params.id} />
        </TabPanel>
        <TabPanel>
          <Detail />
        </TabPanel>
        <TabPanel>
          <Analytics />
        </TabPanel>
        <TabPanel>
          <Share />
        </TabPanel>
      </Tabs>
    </div>
  );
};
const mapStateToProps = (state: any) => {
  return {
    loadingVideo: state.video.loadingVideo
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getVideo: (id: any) => dispatch(getVideo(id)),
    cleanSingleVideo: () => dispatch(cleanSingleVideo())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VideoTab);
