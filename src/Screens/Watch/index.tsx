import React from "react";
import { connect } from "react-redux";
import VideoPlayer from "../../components/VideoPlayer";
import { getVideo } from "../../Redux/Actions/videos";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

interface IProps {
  getVideo: (id: string) => void;
  video: any;
  match: any;
}
class Watch extends React.Component<IProps> {
  componentDidMount() {
    this.props.getVideo(this.props.match.params.id);
  }
  render() {
    const { video } = this.props;
    return (
      <div style={container}>
        <Grid container>
          <Grid item md={3} sm={2} xs={1}></Grid>
          <Grid item md={6} sm={8} xs={10}>
            {video ? (
              <VideoPlayer url={video.url} height={300} />
            ) : (
             <CircularProgress/>
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
