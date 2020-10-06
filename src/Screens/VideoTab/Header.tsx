import React from "react";
import { toast } from "react-toastify";
import VideoInfo from "../../components/VideoInfo";
import { connect } from "react-redux";
import { CircularProgress, Grid } from "@material-ui/core";
import Colors from "../../constants/colors";
import ThemeButton from "../../components/ThemeButton";
import CanvasPlayer from "../../components/CanvasPlayer/EditingCanvas";

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import MailIcon from '@material-ui/icons/Mail';
import DirectionsIcon from '@material-ui/icons/Directions';

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
    const newClip = `${process.env.REACT_APP_DOMAIN}/watch/${video && video._id}`;
    navigator.permissions.query({name:"clipboard-write" as PermissionName }).then(result => {
      if (result.state == "granted" || result.state == "prompt") {
        /* write to the clipboard now */
        navigator.clipboard.writeText(newClip)
      }
    });

    // navigator.clipboard.writeText();
    toast.info("Url copied to clipboard");
  };
  componentWillUnmount() {
    window.removeEventListener("resize", this.caluclateContainerHeight);
  }
  render() {
    const { video } = this.props;
    const classes = {
      root: {display: 'flex',marginTop: '1em',alignItems: 'center',width: '100%',border: 'solid',borderWidth: '1px',borderColor: '#406c7f',},
      input: {flex: 1,marginLeft: '1em',color: '#406c7f',fontFamily: 'Open Sans'},
      iconButton: {padding: 10,borderRadius: 0,background: '#406c7f',color: 'white'},
    }
    return (
      <div className="headerTab">
        <Grid item xs={12} sm={12} md={12} id="wrapperHeader">
          {!video && (
            <div
              className="justifyCenter"
            >
              <CircularProgress color="primary" />
            </div>
          )}
          <div ref="container" style={{
            width: "100%",
            height: this.state.height
          }}>
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
        <h3 className="videoTitle">{video && video.title}</h3>
        <VideoInfo video={video} />
        <div className="copyURL_Wrapper">
        <Paper component="form" style={classes.root} >
          <InputBase
            style={classes.input}
            value={`${process.env.REACT_APP_DOMAIN}/watch/${video && video._id}`}
          />
          <IconButton type="submit" style={classes.iconButton} aria-label="edit" onClick={this.copyUrl}>
            <EditIcon />
          </IconButton>
          <IconButton type="submit" style={classes.iconButton} aria-label="email">
            <MailIcon />
          </IconButton>
          <IconButton color="primary" style={classes.iconButton} aria-label="share">
            <DirectionsIcon />
          </IconButton>
        </Paper>
        </div>

        <ThemeButton
          style={{marginTop: 18,background: Colors.themePurple,color: Colors.white,width: "100%",backgroundImage:"linear-gradient(to right, #fcb317, #8bb589, #61b5b3)",fontFamily: "Poppins",fontWeight: "bolder",fontSize: "larger"}}
          // onClick={this.copyUrl}
          name="Share & Shend"
        />
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
