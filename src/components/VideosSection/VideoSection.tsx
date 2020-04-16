import React, { Component } from "react";
// import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { getUserVideos } from "../../Redux/Actions/videos";
import { Grid } from "@material-ui/core";
import VideoCard from "../VideoCard/VideoCard";
import "../../../node_modules/video-react/dist/video-react.css";
import RecordOption from "../RecordOption";
import "./styles.css";

type IProps = {
  history: any;
  getUserVideos: () => void;
  userVideos: object[];
};

class VideoSection extends Component<IProps> {
  componentDidMount() {
    this.props.getUserVideos();
  }

  navigateToVideoTab = (id: string) => {
    this.props.history.push(`/videotab/${id}`);
  };
  render() {
    const { userVideos } = this.props;
    return (
      <>
        <div className="VideoComponent">
          <div className="mainHeadingWrapper">
            <h5 className="Header">MY VIDEOS</h5>
            <RecordOption history={this.props.history} />
          </div>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4}>
              <VideoCard
                title="Dubb Account Setup"
                url="http://techslides.com/demos/sample-videos/small.mp4"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <VideoCard
                url="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                title="Sample Use Case - Sales Prospecting"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <VideoCard
                title="Sample Use Case - Screen Recording"
                url="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
              />
            </Grid>

            {userVideos &&
              userVideos.map((video: any) => (
                <Grid item xs={12} sm={6} md={4} key={video._id}>
                  <VideoCard
                    title={video.title}
                    url={video.url}
                    thumbnail={video.thumbnail}
                    onClick={() => this.navigateToVideoTab(video._id)}
                  />
                </Grid>
              ))}
          </Grid>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    userVideos: state.video.videos
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getUserVideos: () => dispatch(getUserVideos())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VideoSection);

// <Row>
// <Col xs="12" md="4" sm="6">
//   <VideoCard
//     title="Dubb Account Setup"
//     url="http://techslides.com/demos/sample-videos/small.mp4"
//   />
// </Col>
// <Col xs="12" sm="6" md="4">
//   <VideoCard
//     url="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
//     title="Sample Use Case - Sales Prospecting"
//   />
// </Col>
// <Col xs="12" sm="6" md="4">
//   <VideoCard
//     title="Sample Use Case - Screen Recording"
//     url="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
//   />
// </Col>
// {userVideos &&
//   userVideos.map((video: any) => (
//     <Col xs="12" md="4" sm="6" key={video._id}>
//       <VideoCard
//         title={video.title}
//         url={video.url}
//         thumbnail={video.thumbnail}
//         onClick={() => this.navigateToVideoTab(video._id)}
//       />
//     </Col>
//   ))}
// </Row>
