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

import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import MicOutlinedIcon from '@material-ui/icons/MicOutlined';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';



import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import "react-tabs/style/react-tabs.css";
import "../response.css";
import { Email } from "aws-sdk/clients/codecommit";
import AWS from "aws-sdk";
import { config } from "../../../config/aws";
const s3 = new AWS.S3(config);

const MicRecorder = require('mic-recorder-to-mp3');

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
    tab: 0,
    open: false,
    ansText: "",
    ansAudio: "",
    ansVideo: "",
    userName: "",
    userEmail: "",
    choiceId: "",
    calendar: "",
    videoOBJ: {},
    audioOBJ: {},
  }

  componentDidMount() {
    // console.log(this.props.resChatvid)
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

  uploadAudio = (file: any) => {
    return new Promise((resolve, reject) => {
      // this.setState({ videoProgress: true, progressVideo: 0 });
      const options = {
        Bucket: config.bucketName,
        ACL: config.ACL,
        Key: Date.now().toString() + "replyAudioURL.mp3",
        Body: file
      }
      s3.upload(options, (err: any, data: any) => {
        if (err) {
          // this.setState({ videoProgress: false });
          reject();
        } else {
          this.setState({
            // videoProgress: false,
            ansAudio: data.Location
          });
          resolve();
        }
      }).on("httpUploadProgress", (progress: any) => {
        // let uploaded: number = (progress.loaded * 100) / progress.total;
        // this.setState({ progressVideo: uploaded });
      });
    });
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
    this.setState({ ...state })
  }

  uploadVideo = (file: any) => {
    toast.info("Uploading ...")
    return new Promise((resolve, reject) => {
      const options = {
        Bucket: config.bucketName,
        ACL: config.ACL,
        Key: Date.now().toString() + "replyVideoURL.mp3",
        Body: file
      }
      s3.upload(options, (err: any, data: any) => {
        if (err) {
          toast.error("something went wrong. Please try again later!")
          reject();
        } else {
          this.setState({
            ansVideo: data.Location
          });
          toast.info("Uploaded")
          resolve();
        }
      }).on("httpUploadProgress", (progress: any) => {
        // let uploaded: number = (progress.loaded * 100) / progress.total;
        // this.setState({ progressVideo: uploaded });
      });
    });
  };

  handleSend = () => {
    this.setState({ open: !this.state.open })
  }

  handleChoiceAndCalender = (value: string, type: string) => {
    let state: any = this.state;
    state[type] = value;
    this.setState({ ...state})
  }

  handleReply = async () => {
    const { userEmail, userName, ansText, ansAudio, ansVideo, tab, choiceId, calendar } = this.state;
    const { resChatvid, auth } = this.props;
    if (!validateEmail(userEmail)) return toast.error("Enter a valid Email");
    if (!userName) return toast.error("Enter a valid Email");
    toast.info("Repling....")
    const type = resChatvid.steps[0].responseType === "Multiple-Choice" ? "choice" : resChatvid.steps[0].responseType === "Open-ended" ? (tab === 1 ? "text" : tab === 2 ? "audio" : "video") : "calendar" ;
    let people: any = {
      email: userEmail,
      name: userName,
    }
    if (auth.user?._id) {
      people.userId = auth.user?._id;
    }
    const reply = {
      chatvidId: resChatvid._id,
      stepId: resChatvid.steps[0]._id,
      text: ansText,
      url: (ansVideo ? ansVideo : ansAudio) || "",
      type: type,
      choiceId: choiceId,
      calendar: calendar,
    }
    this.props.send({ people, reply })
  }

  renderTabs = (tab: number) => {
    switch (tab) {
      case 0:
        return <OpenEndedType {...this.props} {...this.state} handleTabChange={this.handleTabChange} send={this.handleSend} handleChoice={this.handleChoiceAndCalender} />
      case 1:
        return <TextResponse {...this.props} {...this.state} handleTabChange={this.handleTabChange} send={this.handleSend} handleTextChange={this.handleTextChange} />
      case 2:
        return <AudioResponse {...this.props} {...this.state} handleTabChange={this.handleTabChange} send={this.handleSend} handleAnsAudio={this.uploadAudio} />
      case 3:
        return <VideoResponse {...this.props} {...this.state} handleTabChange={this.handleTabChange} send={this.handleSend} handleAnsVideo={this.uploadVideo} />
      default:
        return <OpenEndedType {...this.props} {...this.state} handleTabChange={this.handleTabChange} />
    }
  }

  render() {
    const { open, tab } = this.state;
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
            {this.renderTabs(tab)}
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
  const { handleChoice, handleTabChange, send, resChatvid, preview, resType } = props;
  const { steps, userId } = resChatvid;
  let { responseType, choices } = steps[0];
  if (preview) {
    responseType = resType;
    choices = props.choices;
  }
  return (
    <>
      <div className="captionDiv">
        <Typography variant="h3">
          {responseType === "Open-ended" ?
            "How would you like to answer?"
            :
            responseType === "Multiple-Choice" ?
              "Choose a response"
              :
              `Schedule a meeting with ${userId.firstName || userId.lastName}.`
          }

        </Typography>
      </div>
      <div className="optionDiv">
        {responseType === "Open-ended" ?
          (
            <>
              <div className="IconWrapper" onClick={() => { handleTabChange(1) }}>
                <Typography variant="h1">Tt</Typography>
                <Typography variant="subtitle1"> Text </Typography>
              </div>
              <div className="IconWrapper" onClick={() => { handleTabChange(2) }}>
                <VolumeUpRoundedIcon />
                <Typography variant="subtitle1"> Audio </Typography>
              </div>
              <div className="IconWrapper" onClick={() => { handleTabChange(3) }}>
                <VideocamRoundedIcon />
                <Typography variant="subtitle1"> Video </Typography>
              </div>
            </>
          )
          :
          responseType === "Multiple-Choice" ?
            (
              <div className="optionsWraper">
                {choices && choices.length > 0 && choices.map((choice: any, ind: number) => {
                  return (<div className="_choiceOption" onClick={() => {handleChoice(choice._id, "choiceId"); send()}}>
                    <Typography variant="h5" > {preview ? choice : choice.text} </Typography>
                  </div>)
                })}

              </div>
            )
            :
            (
              <>
                <Button> Book a meeting </Button>
              </>
            )
        }

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
  const { useState, useMemo, useEffect } = React;
  const classes = useStyles();
  const [recording, setRecording]: any = useState(undefined);
  const [timer, setTimer] = useState(120);
  const [timeOut, setTimeOutTimer]: any = useState(0);
  const [recorded, setRecorded] = useState(false);
  const [audioFile, setFile]: any = useState(undefined)
  const [player, setBFile]: any = useState(undefined)
  const [progress, setProgress] = useState(0);
  const { handleTabChange, send, handleAnsAudio } = props;
  const recorder = useMemo(() => new MicRecorder({ bitRate: 128 }), []);

  const handleRecording = () => {
    setRecorded(false);
    setProgress(0);
    setTimer(120);
    recorder.start()
      .then(() => {
        setRecording(true);
        setTimeOutTimer(setInterval(trackTime, 1000))
      })
      .catch((error: any) => {
        console.log("Error Whire recording: : ", error.message)
        setRecording(false)
      })
  }

  const trackTime = async () => {
    await setTimer((time) => {
      if (time - 1 === 0) {
        handleStop();
      }

      setProgress((prog: number) => {
        let ptcg = 0;
        ptcg = (100 * (120 - (time - 1))) / 120
        return ptcg;
      })

      return time - 1;
    })
  }

  const handleStop = () => {
    setRecorded(true)
    setProgress(0)
    setTimeOutTimer((time: any) => {
      clearInterval(time);
      return 0;
    });
    try {
      recorder.stop()
        .getMp3()
        .then(([buffer, blob]: any) => {
          const file = new File(buffer, 'chatvidAnswer.mp3', {
            type: blob.type,
            lastModified: Date.now()
          });
          if (blob && blob.size > 10) {
            setFile(file);
            setBFile(new Audio(URL.createObjectURL(file)));
          }
        })
        .catch((error: any) => {
          handleReset();
          toast.error("something went wrong")
          console.log("EROR: WHILRE STOP: ", error.message)
        })
    } catch (error) {
      handleReset()
      toast.error("something went wrong")
      console.log(error.message)
    }

  }

  const palayAudio = async () => {
    if (!audioFile) { setRecording(false); return toast.error("NO recording found!"); }
    await setProgress(progress => 0);
    progressHandler(player)
    player.play();
  }

  const progressHandler = (player: any) => {
    let percentage = 0;
    if (!player && !player && !player?.currentTime) return percentage;
    percentage = (player?.currentTime * 100) / player?.duration;
    setProgress(percentage)
    setTimeout(function () {
      progressHandler(player);
    }, 0)
  }
  const handleReset = () => {
    setRecorded(false);
    setRecording(false);
    setFile(undefined);
    setTimeOutTimer(0);
    setTimer(120);
    setProgress(0);
  }


  const min = Math.floor(timer / 60) % 60;
  const sec = Math.floor(timer % 60);

  return (
    <div className="textResponseWrappreContainer">
      <div className="captionDiv">
        <Typography variant="h3">
          {
            recorded ? "Preview your recording" :
              recording ? "Reacording ..." :
                "Hold the button to record"
          }

        </Typography>
      </div>
      <div className="optionDiv">
        {
          recording &&
          <Typography variant="h4" className="audioTimer">
            {min < 10 ? `0${min}` : min} : {sec < 10 ? `0${sec}` : sec}
          </Typography>
        }
        <div className="AudioIconWrapper" style={{ border: (recording) ? "none" : "" }}>
          {recording ?
            (
              <div className={classes.wrapper}>
                <Fab
                  aria-label="save"
                  color="primary"
                  className={classes.buttonSuccess}
                // onClick={handleButtonClick}
                >
                  {
                    recorded ?
                      <PlayArrowIcon onClick={palayAudio} />
                      :
                      <MicOutlinedIcon onClick={handleStop} />
                  }

                </Fab>
                <CircularProgress variant="static" size={200} value={progress} className={classes.fabProgress} />
              </div>
            )
            :
            <MicOutlinedIcon onClick={handleRecording} />
          }
        </div>
        <div className="responseNavigationWrapper">
          <Button
            color="default"
            id="fitContent"
            className={`BackBTN ${recorded && "fitContent"}`}
            startIcon={<NavigateBeforeOutlinedIcon />}
            onClick={() => { { !recorded ? handleTabChange(0) : handleReset() } }}
          >
            {!recorded ? "Back" : "Record Again"}
          </Button>
          {
            recorded &&
            <Button
              color="default"
              className="NextBTN"
              endIcon={<KeyboardArrowRightIcon />}
              onClick={async () => { await handleAnsAudio(audioFile); send() }}
            >
              Send
          </Button>
          }
        </div>
      </div>
    </div>
  )
}

const VideoResponse = (props: any) => {
  const [videoURL, setURL] = React.useState("")
  const [videoRecord, setVideoRecord] = React.useState(null);
  const [recorded, setRecorded] = React.useState(false);


  const handleReset = () => {
    setURL("")
    setVideoRecord(null)
    setRecorded(false)
  }

  const { handleTabChange, send, handleAnsVideo } = props;
  return (
    <div className="videoResponseWrappreContainer">
      <div>
        {
          recorded && videoRecord ?
            (
              <video src={videoURL} controls width={"100%"} />
            )
            :
            (
              <VideoRecorder
                getBlob={(blob: any) => {
                  props.toggleSendVariable();
                  setVideoRecord(blob);
                  setURL(URL.createObjectURL(blob))
                  setRecorded(true);
                }}
                reset={() => { setVideoRecord(null); handleTabChange(0) }}
                // proceed={this.save}
                interActive={true}
              // quality={this.state.selectedValue}
              />
            )

        }
      </div>
      {
        recorded &&
        <div className="responseNavigationWrapper">
          <Button
            color="default"
            id="fitContent"
            className={`BackBTN ${recorded && "fitContent"}`}
            startIcon={<NavigateBeforeOutlinedIcon />}
            onClick={() => { { !recorded ? handleTabChange(0) : handleReset() } }}
          >
            {!recorded ? "Back" : "Record Again"}
          </Button>
          <Button
            color="default"
            className="NextBTN"
            endIcon={<KeyboardArrowRightIcon />}
            onClick={async () => { await handleAnsVideo(videoRecord); send() }}
          >
            Send
          </Button>
        </div>
      }
    </div>
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