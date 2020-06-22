import React from "react";
import { connect } from "react-redux";
import VideoPlayer from "../../components/VideoPlayer";
import CanvasPlayer from "../../components/CanvasPlayer";
import { getVideo } from "../../Redux/Actions/videos";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

interface IProps {
  getVideo: (id: string) => void;
  loadingVideo: boolean;
  video: any;
  match: any;
}
class Watch extends React.Component<IProps> {
  state = {
    width: 0,
    height: 0
  };
  container: any;
  componentDidMount() {
    this.props.getVideo(this.props.match.params.id);
    this.container = this.refs.container;
    const persistRect = JSON.parse(
      JSON.stringify(this.container.getBoundingClientRect())
    );
    this.setState({
      width: persistRect.width,
      height: persistRect.height
    });
  }
  componentWillReceiveProps(nextProps: any) {
    if (
      (nextProps.video && nextProps.video.campaign === false) ||
      (nextProps.video && nextProps.video.campaign === undefined)
    ) {
      this.container.style.display = "none";
    }
  }
  render() {
    const { video, loadingVideo } = this.props;
    return (
      <div style={container}>
        <Grid container>
          <Grid item md={3} sm={2} xs={1}></Grid>
          <Grid item md={6} sm={8} xs={10}>
            {loadingVideo && <CircularProgress style={{ marginLeft: "47%" }} />}
            {video && !video.campaign && (
              <VideoPlayer
                url={video.url}
                thumbnail={video.thumbnail}
                height={300}
              />
            )}
            <div ref="container" style={{ height: "400px", width: "100%" }}>
              {video && video.campaign && (
                <CanvasPlayer
                  width={this.state.width}
                  height={this.state.height}
                  muted={false}
                  autoPlay={false}
                  loop={false}
                  src={video.url}
                  logoProps={video.logoProps}
                  textProps={video.textProps}
                  thumbnail={video.thumbnail}
                />
              )}
            </div>
            {!loadingVideo && !video && (
              <h3 style={{ textAlign: "center" }}>No Video to display</h3>
            )}
          </Grid>
          <Grid item md={3} sm={2} xs={1}></Grid>
        </Grid>
      </div>
    );
  }
}

const container = {
  marginTop: "100px"
};

const mapStateToProps = (state: any) => {
  return {
    video: state.video.singleVideo,
    loadingVideo: state.video.loadingVideo
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getVideo: (id: string) => dispatch(getVideo(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Watch);
