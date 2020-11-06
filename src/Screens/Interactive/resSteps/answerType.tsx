import React, { Component } from "react";
import { connect } from "react-redux";
import canvasTxt from "canvas-txt";

import CanvasPlayer from '../../../components/CanvasPlayer/EditingCanvas'


import VideoRecorder from "../../../components/VideoRecorder";


import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography, TextField, Divider, Button } from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';

import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import "react-tabs/style/react-tabs.css";
import "../response.css";

class FinalTab extends Component<any> {
  videoRef: any;
  canvasRef: any;
  ctx: any;
  // STATE Declaration!
  state = {
    text: this.props.overlayTxt ? this.props.overlayTxt : "Hello this is David from ViideOn!",
    textColor: "#fff",
    fontSize: 5,
    vAlign: "top",
    align: "left",
    title: "",
    percentage: 0,
    tab: 1,
  }

  componentDidMount() {
    console.log(this.props.resChatvid)
    this.settingUPMedia();
  }

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    if (nextProps.overlayTxt && nextProps.overlayTxt !== this.state.text) {
      this.setState({ text: nextProps.overlayTxt })
    }
    if (nextProps.fontSize && nextProps.fontSize !== this.state.fontSize) {
      this.setState({ fontSize: nextProps.fontSize })
    }
    if (nextProps.align && nextProps.align !== this.state.align) {
      this.setState({ align: nextProps.align })
    }
    if (nextProps.valign && nextProps.valign !== this.state.vAlign) {
      this.setState({ vAlign: nextProps.valign })
    }
    if (nextProps.fontSize && nextProps.fontSize !== this.state.fontSize) {
      this.setState({ fontSize: nextProps.fontSize })
    }
  }

  settingUPMedia = () => {
    if (this.videoRef) {
      this.videoRef = this.videoRef;
      // this.canvasRef = this.canvasRef;
      // this.ctx = this.canvasRef.getContext("2d");
      if (this.props.video) {
        this.videoRef.src = URL.createObjectURL(this.props.video);
      } else {
        // considering this as response url
        let url = this.props.resChatvid.steps[0].videoId.url;
        this.videoRef.src = url;
      }
      this.videoRef.addEventListener("loadedmetadata", this.handleLoadedMetaData);
      this.videoRef.addEventListener("play", this.onVideoPlay, false);
      this.videoRef.addEventListener("pause", this.onVideoPause);
      this.videoRef.addEventListener("ended", this.onVideoEnd);
    } else {
      setTimeout(() => {
        this.settingUPMedia()
      }, 100)
    }
  }

  handleLoadedMetaData = () => {
    // this.canvasRef.width = this.videoRef.clientWidth;
    // this.canvasRef.height = (this.videoRef.clientHeight / 1.6);
    this.videoRef.play();
    // this.videoRef.style.zIndex = -1;
    this.calculateDuration();
  };

  onVideoPlay = () => {
    // this.draw(this.videoRef, this.ctx, this.videoRef.clientWidth, this.videoRef.clientHeight);
  };
  onVideoPause = () => {
  };
  onVideoEnd = () => {
  };
  draw = (video: any, context: any, width: any, height: any) => {
    if (video.paused || video.ended) return false;
    context.drawImage(video, 0, 0, width, height);
    context.fillStyle = this.state.textColor;
    canvasTxt.fontSize = (this.state.fontSize / 100) * (width - 80);
    canvasTxt.vAlign = this.state.vAlign;
    canvasTxt.align = this.state.align;
    canvasTxt.lineHeight = 20;
    canvasTxt.drawText(context, this.state.text, 30, 30, width - 50, height - 50);
    let that = this;
    setTimeout(function () {
      that.draw(video, context, width, height);
      that.calculateDuration();
      if (that.videoRef) that.videoRef.style.display = "none";
    }, 0);
  };

  handleChange = (e: any) => {
    let newState: any = this.state;
    newState[e.target.name] = e.target.value;
    this.setState({ newState })
  }

  calculateDuration = () => {
    let percentage = 0;
    if (!this.videoRef && !this.videoRef && !this.videoRef?.currentTime) return percentage;
    percentage = (this.videoRef?.currentTime * 100) / this.videoRef?.duration;
    this.setState({ percentage })
    let that = this;
    setTimeout(function () {
      that.calculateDuration();
    }, 0)
  }

  componentWillUnmount() {
    this.videoRef = null;
  }

  handleTabChange = (tab: number) => {
    this.setState({ tab })
  }

  renderTabs = () => {
    switch (this.state.tab) {
      case 0:
        return <OpenEndedType {...this.props} {...this.state} handleTabChange={this.handleTabChange} />
      case 1:
        return <TextResponse {...this.props} {...this.state} handleTabChange={this.handleTabChange} />
      case 2:
        return <AudioResponse {...this.props} {...this.state} handleTabChange={this.handleTabChange} />
      case 3:
        return <VideoResponse {...this.props} {...this.state} handleTabChange={this.handleTabChange} />
      default:
        return <OpenEndedType {...this.props} {...this.state} handleTabChange={this.handleTabChange} />
    }
  }

  render() {
    return (
      <Grid container className="responseTypeWrapper">
        <Grid container className="mainVideoContainer" xs={12} sm={12} md={6} lg={6}>
          <BorderLinearProgress variant="determinate" value={this.state.percentage} />
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <video ref={ref => this.videoRef = ref} muted autoPlay loop width="100%" />
            {/* <canvas ref={ref => this.canvasRef = ref} /> */}
          </Grid>
        </Grid>
        <Grid container className="ResponseAndTypeWrapper" xs={12} sm={12} md={6} lg={6}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {this.renderTabs()}
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

const OpenEndedType = (props: any) => {
  const { handleTabChange } = props;
  return (
    <>
      <div className="captionDiv">
        <Typography variant="h3"> How would you like to answer?</Typography>
      </div>
      <div className="optionDiv">
        <div className="IconWrapper" onClick={() => { handleTabChange(1) }}>
          <Typography variant="h1">Tt</Typography>
          <Typography variant="subtitle1"> Text </Typography>
        </div>
        <div className="IconWrapper" onClick={() => { handleTabChange(2) }}>
          <VideocamRoundedIcon />
          <Typography variant="subtitle1"> Audio </Typography>
        </div>
        <div className="IconWrapper" onClick={() => { handleTabChange(3) }}>
          <VolumeUpRoundedIcon />
          <Typography variant="subtitle1"> Video </Typography>
        </div>
      </div>
    </>
  )
}

const TextResponse = (props: any) => {
  const { handleTabChange } = props;
  return (
    <>
      <div className="captionDiv">
        <Typography variant="h3"> Write your response: </Typography>
      </div>
      <div className="optionDiv">
        <TextField variant="outlined" fullWidth multiline rows={7} rowsMax={7} className="_response_txtField" />
      </div>
    </>
  )
}

const VideoResponse = (props: any) => {
  const [videoRecord, setVideRecord] = React.useState(null)

  
  const { handleTabChange } = props;
  return (
    <>
      <div>
        <VideoRecorder
          getBlob={(blob: any) => {
            props.toggleSendVariable();
            setVideRecord(blob)
          }}
          reset={() => {setVideRecord(null); handleTabChange(0)}}
          // proceed={this.save}
          interActive={true}
          // quality={this.state.selectedValue}
        />
      </div>
    </>
  )
}

const AudioResponse = (props: any) => {
  const { handleTabChange } = props;
  return (
    <>
      <div className="captionDiv">
        <Typography variant="h3"> Hold the button to record </Typography>
      </div>
      <div className="optionDiv">

      </div>
    </>
  )
}

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 5,
      width: "100%",
      display: "relative"
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#4ce',
    },
  }),
)(LinearProgress);


const iconStyle = {
  padding: 0,
  width: "1em",
  height: "1em"
};
const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
    resChatvid: state.chatvids.resChatvid
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FinalTab);