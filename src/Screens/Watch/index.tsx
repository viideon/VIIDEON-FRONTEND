import React from "react";
import { connect } from "react-redux";
import CanvasPlayer from "../../components/CanvasPlayer/EditingCanvas";
import {
  getVideo,
  updateVideoViews,
  updateVideoWatch
} from "../../Redux/Actions/videos";
import Grid from "@material-ui/core/Grid";
import Loading from "../../components/Loading";
import "./style.css";

interface IProps {
  getVideo: (id: string) => void;
  loadingVideo: boolean;
  video: any;
  match: any;
  updateVideoViews?: any;
  updateVideoWatch?: any;
}
class Watch extends React.Component<IProps> {
  container: any;
  state = {
    height: "100px"
  };
  componentDidMount() {
    this.container = this.refs.container;
    this.props.getVideo(this.props.match.params.id);
    const _id = { id: this.props.match.params.id };
    this.props.updateVideoViews(_id);
    this.caluclateContainerHeight();
    window.addEventListener("resize", this.caluclateContainerHeight);
  }
  caluclateContainerHeight = () => {
    let calculatedVideoHeight = document.getElementById("wrapperWatch")
      ?.clientWidth
      ? `${document.getElementById("wrapperWatch")!.clientWidth * 0.5625}px`
      : "300px";
    this.setState({ height: calculatedVideoHeight });
  };
  watched = () => {
    const _id = { id: this.props.match.params.id };
    this.props.updateVideoWatch(_id);
  };
  componentWillUnmount() {
    window.removeEventListener("resize", this.caluclateContainerHeight);
  }
  render() {
    const { video, loadingVideo } = this.props;
    return (
      <div className="contentWatch">
        <div className="containerWatch">
          <Grid container>
            <Grid item md={3} sm={2} xs={1}></Grid>
            <Grid item md={6} sm={8} xs={10} id="wrapperWatch">
              {loadingVideo && (
                <div style={{ marginLeft: "45%", marginTop: "20%" }}>
                  <Loading />
                </div>
              )}

              <div
                ref="container"
                style={{
                  width: "100%",
                  height: this.state.height
                }}
              >
                {video && (
                  <CanvasPlayer
                    muted={false}
                    autoPlay={false}
                    loop={false}
                    src={video.url}
                    logoProps={video.logoProps}
                    textProps={video.textProps}
                    thumbnail={video.thumbnail}
                    watched={this.watched}
                    musicProps={video.musicProps}
                  />
                )}
              </div>
              {!loadingVideo && !video && (
                <h3 style={{ textAlign: "center" }}>No Video to display</h3>
              )}
              {video && (
                <div className="descriptionWatch">
                  <h3>{video.title}</h3>
                  {video.description && <p>{video.description}</p>}
                </div>
              )}
            </Grid>
            <Grid item md={3} sm={2} xs={1}></Grid>
          </Grid>
        </div>
        <div className="footerWatch">
          <span>Powered By </span>
          <a href="https://videonpro.app">videonPro</a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    video: state.video.singleVideo,
    loadingVideo: state.video.loadingVideo
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getVideo: (id: string) => dispatch(getVideo(id)),
    updateVideoViews: (id: any) => dispatch(updateVideoViews(id)),
    updateVideoWatch: (id: any) => dispatch(updateVideoWatch(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Watch);
