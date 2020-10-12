import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getVideo, cleanSingleVideo } from "../../Redux/Actions/videos";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Grid from "@material-ui/core/Grid";
import "react-tabs/style/react-tabs.css";
import { FaInfo, FaChartLine, FaCut, FaShare } from "react-icons/fa";
import PaletteIcon from "@material-ui/icons/Palette";
import VideoTabHeader from "./Header";
import Detail from "./Detail";
import Editing from "./Editing";
import Share from "./Share";
import Analytics from "./Analytics";
import Design from "./Design";
import Header from "../../components/Header/Header";
import "./style.css";

const VideoTab = ({ match: { params }, getVideo, cleanSingleVideo }: any) => {
  const [isDisabled, enableLinks] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    getVideo(params.id);
    setTimeout(() => enableLinks(false), 1000);
    return () => {
      cleanSingleVideo();
    };
  }, []);

  return (
    <>
      <Header
        styles={{
          backgroundImage:
            "linear-gradient(-90deg, rgb(97, 181, 179), rgb(97, 181, 179), rgb(252, 179, 23))"
        }}
      />
      <div className="wrapperVideoTab">
        <Grid container>
          <Grid item xs={12} md={6} sm={12}>
            <div className="wrapperTabVideo">
              <VideoTabHeader />
            </div>
          </Grid>
          <Grid item xs={12} md={6} sm={12} style={{ marginTop: "1em" }}>
            <Tabs>
              <TabList>
                <Tab disabled={isDisabled}>
                  <div className="videoTabIcon">
                    <FaInfo />
                  </div>
                  <div>DETAILS</div>
                </Tab>
                <Tab disabled={isDisabled}>
                  <div className="videoTabIcon">
                    <FaChartLine />
                  </div>
                  <div>ANALYTICS</div>
                </Tab>
                {/* <Tab>
                  <div className="videoTabIcon">
                    <FaCut />
                  </div>
                  <div>EDITING</div>
                </Tab> */}
                <Tab>
                  <div className="videoTabIcon">
                    <PaletteIcon />
                  </div>
                  <div>EDITING</div>
                </Tab>
                <Tab disabled={isDisabled}>
                  <div className="videoTabIcon">
                    <FaShare />
                  </div>
                  <div>SHARE</div>
                </Tab>
              </TabList>
              <TabPanel forceRender>
                <Detail />
              </TabPanel>
              <TabPanel>
                <Analytics />
              </TabPanel>
              {/* <TabPanel>
                <Editing videoId={params.id} />
              </TabPanel> */}
              <TabPanel>
                <Design />
              </TabPanel>
              <TabPanel>
                <Share />
              </TabPanel>
            </Tabs>
          </Grid>
        </Grid>
      </div>
    </>
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
