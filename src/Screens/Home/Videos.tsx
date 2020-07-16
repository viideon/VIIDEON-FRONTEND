import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Home from "./Home";
import { withRouter } from "react-router-dom";
import VideoSection from "../../components/VideosSection/VideoSection";
import "./styles.css";

type IProps = {
  history: any;
};
class Videos extends Component<IProps> {
  render() {
    return (
      <Home>
        <Grid container className="wrapperDashVideos">
          <Grid item xs={12}>
            <VideoSection history={this.props.history} videoType="allVideos" />
          </Grid>
        </Grid>
      </Home>
    );
  }
}
export default withRouter<any, any>(Videos);
