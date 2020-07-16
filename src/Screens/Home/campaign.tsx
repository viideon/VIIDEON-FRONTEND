import React, { Component } from "react";
import Home from "./Home";
import { Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import VideoSection from "../../components/VideosSection/VideoSection";
import "./styles.css";

type IProps = {
  history: any;
};
class CampaignList extends Component<IProps> {
  render() {
    return (
      <Home>
        <Grid container className="wrapperDashVideos">
          <Grid item xs={12}>
            <VideoSection history={this.props.history} videoType="campaign" />
          </Grid>
        </Grid>
      </Home>
    );
  }
}
export default withRouter<any, any>(CampaignList);
