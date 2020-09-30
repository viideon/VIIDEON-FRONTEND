import React from "react";
import { toast } from "react-toastify";
import VideoInfo from "../../components/VideoInfo";
import { connect } from "react-redux";
import { CircularProgress, Grid } from "@material-ui/core";
import Colors from "../../constants/colors";
import ThemeButton from "../../components/ThemeButton";
import CanvasPlayer from "../../components/CanvasPlayer/EditingCanvas";

interface Video {
  url: string;
  thumbnail?: string;
  title?: string;
  campaign?: boolean;
  logoProps?: any;
  textProps?: any;
  musicProps: any;
  _id: string;
  views?: number;
  watch?: number;
  emailShareCount?: number;
  recordingEdit?: boolean;
}
interface IProps {
  video?: Video;
}

class VideoTabHeader extends React.Component<IProps> {
  container: any;
  state = {
    height: "150px"
  };
  componentDidMount() {
    this.container = this.refs.container;
    this.caluclateContainerHeight();
    window.addEventListener("resize", this.caluclateContainerHeight);
  }
  caluclateContainerHeight = () => {
    let calculatedVideoHeight = document.getElementById("wrapperHeader")
      ?.clientWidth
      ? `${document.getElementById("wrapperHeader")!.clientWidth * 0.5625}px`
      : "150px";
    this.setState({ height: calculatedVideoHeight });
  };
  copyUrl = () => {
    const { video } = this.props;
    navigator.clipboard.writeText(
      `${process.env.REACT_APP_DOMAIN}/watch/${video && video._id}`
    );
    toast.info("Url copied to clipboard");
  };
  componentWillUnmount() {
    window.removeEventListener("resize", this.caluclateContainerHeight);
  }
  render() {
    const { video } = this.props;
    return (
      <div className="headerTab">
        <Grid container>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <Grid container>
              <Grid item xs={12} sm={12} md={6} id="wrapperHeader">
                {!video && (
                  <div className="justifyCenter">
                    <CircularProgress color="primary" />
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
                      musicProps={video.musicProps}
                    />
                  )}
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={6} id="headerText">
                <h3>{video && video.title}</h3>
                <VideoInfo video={video} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <ThemeButton
              style={{
                fontSize: "1.15rem",
                width: "100%",
                border: "none",
                background: Colors.themeBlue,
                color: Colors.white,
                outline: "none"
              }}
              onClick={this.copyUrl}
              name="Copy URL"
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    video: state.video.singleVideo
  };
};

export default connect(mapStateToProps, null)(VideoTabHeader);
