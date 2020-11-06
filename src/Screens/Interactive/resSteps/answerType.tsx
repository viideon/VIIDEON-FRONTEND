import React, { Component } from "react";
import { connect } from "react-redux";
import canvasTxt from "canvas-txt";

import CanvasPlayer from '../../../components/CanvasPlayer/EditingCanvas'


import VideoRecorder from "../../../components/VideoRecorder";


import { createStyles, withStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify'
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';

import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import NavigateBeforeOutlinedIcon from "@material-ui/icons/NavigateBeforeOutlined";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import MicOutlinedIcon from '@material-ui/icons/MicOutlined';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import "react-tabs/style/react-tabs.css";
import "../response.css";
import { Email } from "aws-sdk/clients/codecommit";


function validateEmail(email: Email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

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
    tab: 2,
    open: false,
    ansText: "",
    ansAudio: "",
    ansVideo: "",
    userName: "",
    userEmail: "",
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
      if (this.props.video) {
        this.videoRef.src = URL.createObjectURL(this.props.video);
      } else {
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
    this.videoRef.play();
    this.calculateDuration();
  };

  onVideoPlay = () => {
  };
  onVideoPause = () => {
  };
  onVideoEnd = () => {
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

  handleTextChange = (event: any) => {
    let state: any = this.state;
    state[event.target.name] = event.target.value;
    console.log(state)
    this.setState({ ...state })
  }

  handleSend = () => {
    this.setState({ open: !this.state.open })
  }


  handleReply = () => {
    const { userEmail, userName, ansText, ansAudio, ansVideo, tab } = this.state;
    if (tab < 1) return;
    if (!validateEmail(userEmail)) return toast.error("Enter a valid Email");
    if (!userName) return toast.error("Enter a valid Email");
    toast.info("Repling....")
    let people: any = {
      email: userEmail,
      name: userName,
    }
    if (this.props.auth.user?._id) {
      people.userId = this.props.auth.user?._id;
    }
    const reply = {
      chatvidId: this.props.resChatvid?._id,
      stepId: this.props.resChatvid.steps[0]._id,
      text: ansText,
      url: (ansVideo ? ansVideo : ansAudio) || "",
      type: tab === 1 ? "text" : tab === 2 ? "audio" : "video",
    }
    this.props.send({ people, reply })
  }

  renderTabs = () => {
    switch (this.state.tab) {
      case 0:
        return <OpenEndedType {...this.props} {...this.state} handleTabChange={this.handleTabChange} />
      case 1:
        return <TextResponse {...this.props} {...this.state} handleTabChange={this.handleTabChange} send={this.handleSend} handleTextChange={this.handleTextChange} />
      case 2:
        return <AudioResponse {...this.props} {...this.state} handleTabChange={this.handleTabChange} />
      case 3:
        return <VideoResponse {...this.props} {...this.state} handleTabChange={this.handleTabChange} />
      default:
        return <OpenEndedType {...this.props} {...this.state} handleTabChange={this.handleTabChange} />
    }
  }

  render() {
    const { open } = this.state;
    return (
      <Grid container className="responseTypeWrapper">
        <Grid container className="mainVideoContainer" xs={12} sm={12} md={6} lg={6}>
          <BorderLinearProgress variant="determinate" value={this.state.percentage} />
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <video ref={ref => this.videoRef = ref} muted autoPlay loop width="100%" />
          </Grid>
        </Grid>
        <Grid container className="ResponseAndTypeWrapper" xs={12} sm={12} md={6} lg={6}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {this.renderTabs()}
          </Grid>
        </Grid>

        {/* Dialog */}
        <Dialog open={open} onClose={this.handleSend} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Senders Data</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter your details to send!
          </DialogContentText>
            <form onChange={this.handleChange}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Your Name"
                type="tex"
                name="userName"
                fullWidth
              />
              <TextField
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                name="userEmail"
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSend} color="primary">
              Cancel
          </Button>
            <Button onClick={this.handleReply} color="primary">
              Reply
          </Button>
          </DialogActions>
        </Dialog>

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
  const { handleTabChange, send, handleTextChange, ansText } = props;
  return (
    <div className="textResponseWrappreContainer">
      <div className="captionDiv">
        <Typography variant="h3"> Write your response: </Typography>
      </div>
      <div className="optionDiv">
        <TextField
          className="_response_txtField"
          fullWidth
          variant="outlined"
          multiline
          rows={10}
          rowsMax={10}
          name="ansText"
          placeholder="Enter Message here ..."
          value={ansText}
          onChange={handleTextChange}
        />
        <div className="responseNavigationWrapper">
          <Button
            color="default"
            className="BackBTN"
            startIcon={<NavigateBeforeOutlinedIcon />}
            onClick={() => handleTabChange(0)}
          >
            Back
          </Button>
          <Button
            color="default"
            className="NextBTN"
            endIcon={<KeyboardArrowRightIcon />}
            onClick={() => send()}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}

const AudioResponse = (props: any) => {
  const classes = useStyles();
  const [recording, setRecording]: any = React.useState(undefined);
  const { handleTabChange, send } = props;

  return (
    <div className="textResponseWrappreContainer">
      <div className="captionDiv">
        <Typography variant="h3"> Hold the button to record </Typography>
      </div>
      <div className="optionDiv">
        <div className="AudioIconWrapper">
          {recording ?
            (
              <div className={classes.wrapper}>
                <Fab
                  aria-label="save"
                  color="primary"
                  className={classes.buttonSuccess}
                // onClick={handleButtonClick}
                >
                  <PlayArrowIcon />
                </Fab>
                {/* {loading &&
               } */}
                <CircularProgress size={68} className={classes.fabProgress} />
              </div>
            )
            :
            <MicOutlinedIcon />
          }
        </div>
        <div className="responseNavigationWrapper">
          <Button
            color="default"
            className="BackBTN"
            startIcon={<NavigateBeforeOutlinedIcon />}
            onClick={() => handleTabChange(0)}
          >
            Back
          </Button>
          <Button
            color="default"
            className="NextBTN"
            endIcon={<KeyboardArrowRightIcon />}
            onClick={() => send()}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
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
          reset={() => { setVideRecord(null); handleTabChange(0) }}
          // proceed={this.save}
          interActive={true}
        // quality={this.state.selectedValue}
        />
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    buttonSuccess: {
      backgroundColor: "#fdb415",
      '&:hover': {
        backgroundColor: "#fdb415",
      },
    },
    fabProgress: {
      color: "#fdb415",
      position: 'absolute',
      top: -6,
      left: -6,
      zIndex: 1,
    },
    buttonProgress: {
      color: "#fdb415",
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  }),
);

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