import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import VideoSection from "../../components/VideosSection/VideoSection";
import "./styles.css";

type IProps = {
  history: any;
};
class Videos extends Component<IProps> {
  render() {
    return (
      <Grid container className="wrapperDashVideos">
        <Grid item xs={12}>
          <VideoSection history={this.props.history} />
        </Grid>
      </Grid>
    );
  }
}
export default withRouter<any, any>(Videos);
