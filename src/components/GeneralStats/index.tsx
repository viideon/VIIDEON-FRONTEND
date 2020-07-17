import React from "react";
import { Grid } from "@material-ui/core";
import ProgressBar from "../CircularProgressBar";
import "./style.css";
interface IProps {
  singleVideo?: any;
  videoCount: number;
}
const GeneralStats: React.FC<IProps> = ({ singleVideo, videoCount }) => {
  let watch = singleVideo && singleVideo.watch ? singleVideo.watch : 0;
  watch = videoCount && watch > 0 ? Math.round((watch * 100) / videoCount) : 0;
  let emailShare =
    singleVideo && singleVideo.emailShareCount
      ? singleVideo.emailShareCount
      : 0;
  emailShare =
    videoCount && emailShare > 0
      ? Math.round((emailShare * 100) / videoCount)
      : 0;
  let ctaClick =
    singleVideo && singleVideo.ctaClicks ? singleVideo.ctaClicks : 0;
  ctaClick =
    videoCount && ctaClick > 0 ? Math.round((ctaClick * 100) / videoCount) : 0;
  let views = singleVideo && singleVideo.views ? singleVideo.views : 0;
  views = videoCount && views > 0 ? Math.round((views * 100) / videoCount) : 0;
  let emailOpens =
    singleVideo && singleVideo.emailOpens ? singleVideo.emailOpens : 0;
  emailOpens =
    videoCount && emailOpens > 0
      ? Math.round((emailOpens * 100) / videoCount)
      : 0;
  return (
    <div className="wrapperGeneralStats">
      <div className="headGeneralStats">
        <h6>General Stats</h6>
      </div>
      <div className="bodyGeneralStats">
        <Grid container>
          <Grid item xs={6} md={6}>
            <div className="wrapperProgress">
              <ProgressBar
                width="25%"
                value={emailShare}
                heading="Email Share Rates"
              />
            </div>
          </Grid>
          <Grid item xs={6} md={6}>
            <div className="wrapperProgress">
              <ProgressBar
                width="25%"
                value={ctaClick}
                heading="CTA Click Rates"
              />
            </div>
          </Grid>
          <Grid item xs={6} md={6}>
            <div className="wrapperProgress">
              <ProgressBar width="25%" value={watch} heading="Watch Rates" />
            </div>
          </Grid>
          <Grid item xs={6} md={6}>
            <div className="wrapperProgress">
              <ProgressBar
                width="25%"
                value={emailOpens}
                heading="Email Open Rates"
              />
            </div>
          </Grid>
          <Grid item xs={6} md={6}>
            <div className="wrapperProgress">
              <ProgressBar width="25%" value={views} heading="View Rates" />
            </div>
          </Grid>
          {/* <Grid item xs={6} md={6}>
       
            <div className="wrapperProgress">
              <ProgressBar width="25%" value={watch} heading="Email Rates" />
            </div>
          </Grid>  */}
        </Grid>
      </div>
    </div>
  );
};

export default GeneralStats;
