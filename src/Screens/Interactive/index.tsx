import React, { Component } from "react";
import AWS from "aws-sdk";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import VideoRecorder from "../../components/VideoRecorder";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Grid } from "@material-ui/core";
import { Select, MenuItem, InputLabel } from "@material-ui/core";

import ThemeButton from "../../components/ThemeButton";
import Loading from "../../components/Loading";
import ChipInput from "material-ui-chip-input";
import { FaCamera, FaLaptop } from "react-icons/fa";
import EmailInstruction from "../../components/Reusable/EmailInstruction";
import { toast } from "react-toastify";
import Colors from "../../constants/colors";
import {
  sendVideoToEmail,
  saveVideo,
  toggleSendVariable,
  sendMultipleEmails
} from "../../Redux/Actions/videos";
import {
  VideoState,
  EmailVideo,
  VideoSave,
  MultiEmail
} from "../../Redux/Types/videos";
import { AuthState } from "../../Redux/Types/auth";
import * as Constants from "../../constants/constants";
import "react-tabs/style/react-tabs.css";
import { reg } from "../../constants/emailRegEx";
import { config } from "../../config/aws";
import VideocamIcon from "@material-ui/icons/Videocam";
import fileUploadIcon from "../../assets/uploadCircle.png";
import CancelIcon from '@material-ui/icons/Cancel';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Header from "../../components/Header/Header";
import canvasTxt from "canvas-txt";

import "./style.css";
const s3 = new AWS.S3(config);
const gifshot = require("gifshot");
type IProps = {
  auth: AuthState;
  history: any;
  videoUser: VideoState;
  savedVideoId: string;
  progressEmail: boolean;
  sendVideoToEmail: (video: EmailVideo) => void;
  saveVideo: (video: VideoSave) => void;
  toggleSendVariable: () => void;
  sendMultipleEmail: (emailVideoObj: any) => void;
  location: any;
};
type IState = {
  file: any;
  url: string;
  files: any;
  loading: boolean;
  videoRecord: any;
  title: string;
  urlRecord: string;
  recordFile: any;
  emails: Array<string>;
  recieverEmail: string;
  fileProgress: boolean;
  videoProgress: boolean;
  progressFile: number;
  progressVideo: number;
  addLogoText: boolean;
  thumbnail: any;
  thumbnailBlob: any;
  thumbnailUrl: string;
  selectedValue: number;
};

class UploadRecord extends Component<IProps, IState> {
  onDrop: (files: any) => void;
  canvas: any;
  video: any;
  img: any;
  testRef: any;
  thumbCanvas: any;
  image: any;
  constructor(props: any) {
    super(props);
    this.onDrop = files => {
      this.props.toggleSendVariable();
      this.getThumbnailfromFile(files[0]);
      this.setState({ files });
    };
    this.state = {
      file: {},
      url: "",
      files: [],
      recordFile: [],
      loading: false,
      videoRecord: "",
      title: "",
      urlRecord: "",
      recieverEmail: "",
      fileProgress: false,
      videoProgress: false,
      progressFile: 0,
      progressVideo: 0,
      emails: [],
      thumbnail: "",
      addLogoText: false,
      thumbnailBlob: "",
      thumbnailUrl: "",
      selectedValue: 1,
    };
  }

  componentDidMount() {
    this.img = this.image;
    this.img.crossOrigin = "Anonymous";
  }

  titleNameHandler = (event: any) => {
    this.setState({
      title: event.target.value
    });
  };

  uploadFileHandler = () => {
    if (this.state.title === "") {
      toast.warn("Enter a video title");
      return;
    }
    this.setState({ fileProgress: true, progressFile: 0 });
    let s3 = new AWS.S3(config);
    const options = {
      Bucket: config.bucketName,
      ACL: config.ACL,
      Key: Date.now().toString() + this.state.files[0].name,
      Body: this.state.files[0]
    };
    const thumbnailOptions = {
      Bucket: config.bucketName,
      ACL: config.ACL,
      Key: Date.now().toString() + ".jpeg",
      Body: this.state.thumbnail
    };
    s3.upload(options, (err: any, data: any) => {
      if (err) {
        this.setState({ fileProgress: false });
        toast.error(err);
        return;
      }
      this.setState({ urlRecord: data.Location });
      s3.upload(thumbnailOptions, (err: any, data: any) => {
        if (err) {
          toast.error(err);
          return;
        }
        const video = {
          title: this.state.title,
          url: this.state.urlRecord,
          userId: this.props.auth!.user!._id,
          thumbnail: data.Location,
          campaign: false
        };
        this.setState({ fileProgress: false });
        this.props.saveVideo(video);
      });
    }).on("httpUploadProgress", progress => {
      let uploaded: number = (progress.loaded * 100) / progress.total;
      this.setState({ progressFile: uploaded });
    });
  };

  getThumbnailfromFile = (file: any) => {
    this.video = this.refs.video;
    this.canvas = this.refs.canvas;
    this.video.src = URL.createObjectURL(file);
    this.video.currentTime = 3;
    this.canvas.width = 1280;
    this.canvas.height = 720;
    this.video.addEventListener("loadeddata", (e: any) => {
      setTimeout(() => {
        this.canvas.getContext("2d").drawImage(this.video, 0, 0, 1280, 720);
        this.canvas.toBlob((blob: any) => {
          this.setState({ thumbnail: blob });
        }, "image/jpeg");
      }, 2000);
    });
  };

  moveToAddLogoText = () => {
    this.setState({ addLogoText: true });
  };

  uploadVideo = () => {
    return new Promise((resolve, reject) => {
      this.setState({ videoProgress: true, progressVideo: 0 });
      const options = {
        Bucket: config.bucketName,
        ACL: config.ACL,
        Key: Date.now().toString() + ".webm",
        Body: this.state.videoRecord
      };
      s3.upload(options, (err: any, data: any) => {
        if (err) {
          this.setState({ videoProgress: false });
          reject();
        } else {
          this.setState({ urlRecord: data.Location, videoProgress: false });
          resolve();
        }
      }).on("httpUploadProgress", (progress: any) => {
        let uploaded: number = (progress.loaded * 100) / progress.total;
        this.setState({ progressVideo: uploaded });
      });
    });
  };

  getThumbnail = () => {
    // gifshot.createGIF({'video': [this.state.videoRecord]},function(obj: any) {
    //   if(!obj.error) {
    //     var image = obj.image;
    //     console.log("OBJECT: ", obj)
    //     let animatedImage = document.createElement('img');
    //     animatedImage.setAttribute("src", image)
    //     document.body.appendChild(animatedImage);
    //     console.log(animatedImage)
    //   }else {
    //     toast.error("ERROR WHILE GENERATING THUMBNAIL")
    //   }
    // });
    return new Promise((resolve, reject) => {
      const thumbCanvas: any = this.thumbCanvas;
      console.log("thumbCanvas:  ", thumbCanvas);
      console.log("testRef:  ", this.testRef);
      const thumbnailContext = thumbCanvas.getContext("2d");
      thumbnailContext.drawImage(this.video, 0, 0, 1280, 720);
      thumbCanvas.toBlob((blob: any) => {
        this.setState({ thumbnailBlob: blob });
        resolve();
      }, "image/jpeg");
    });
  };

  uploadThumbnail = () => {
    return new Promise((resolve, reject) => {
      this.setState({ videoProgress: true, progressVideo: 0 });
      const thumbnailOptions = {
        Bucket: config.bucketName,
        ACL: config.ACL,
        Key: Date.now().toString() + "thumbnail.jpeg",
        Body: this.state.thumbnailBlob
      };
      s3.upload(thumbnailOptions, (err: any, data: any) => {
        if (err) {
          this.setState({ videoProgress: false });
          reject();
        } else {
          this.setState({
            videoProgress: false,
            thumbnailUrl: data.Location
          });
          resolve();
        }
      }).on("httpUploadProgress", (progress: any) => {
        let uploaded: number = (progress.loaded * 100) / progress.total;
        this.setState({ progressVideo: uploaded });
      });
    });
  };

  save = async () => {
    toast.info("Generating thumbnail ...");
    await this.getThumbnail();
    await this.uploadThumbnail();
    // await this.uploadVideo();
    return;
  };

  setQuality = (e: any) => this.setState({ selectedValue: e.target.value})
  render() {
    let { videoSaved, loading } = this.props.videoUser;
    return (
      <>
        <Header
          styles={{
            backgroundImage:
              "linear-gradient(-90deg, rgb(97, 181, 179), rgb(97, 181, 179), rgb(252, 179, 23))"
          }}
        />
        <RecoderSettingHeader
          setQuality={this.setQuality}
          selectValue={this.state.selectedValue}
          history={this.props.history}
        />
        <div className="interActiveRecorderContainer">
          {}
          <VideoRecorder
            getBlob={(blob: any) => {
              this.props.toggleSendVariable();
              this.setState({ videoRecord: blob });
              this.save();
            }}
            reset={() => {
              this.setState({ videoRecord: null });
            }}
            interActive={true}
            quality={this.state.selectedValue}
          />
          <canvas
            ref={ref => {
              this.canvas = ref;
            }}
            style={{ position: "absolute", left: "-2000px" }}
          />
          <video
            ref={ref => {
              this.video = ref;
            }}
            style={{ opacity: 0.00001, position: "absolute", left: "-999px" }}
          />
          <canvas
            ref={ref => {
              this.thumbCanvas = ref;
            }}
            height={720}
            width={1280}
            style={{ display: "none" }}
          />
          <canvas
            ref={ref => {
              this.testRef = ref;
            }}
            height={720}
            width={1280}
            style={{ display: "none" }}
          />
          <img
            crossOrigin="anonymous"
            alt="logo"
            // src={this.state.logoPath ? this.state.logoPath : null}
            style={{ display: "none" }}
            ref={ref => {
              this.image = ref;
            }}
          />
        </div>
      </>
    );
  }
}

const RecoderSettingHeader = (props: any) => {
  const { setQuality, selectValue} = props;
  return (
    <div className="settingHeader">
      <Grid container>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <div className="qualityItemWrapper">
            <InputLabel>Video Quality</InputLabel>
            <Select
              id="HeaderVideoQuality"
              onChange={setQuality}
              value={selectValue}
              color={"primary"}
            >
              <MenuItem value={1}> 1280 x 720 (High defination)</MenuItem>
              <MenuItem value={2}>800 x 600 (Standard defination)</MenuItem>
              <MenuItem value={3}>640 x 480 (Normal defination)</MenuItem>
              {/* <MenuItem value={4}>Portrait</MenuItem> */}
            </Select>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}></Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <div className="UploadAndCancelWrapper">
            <CloudUploadIcon className="cursorPointer" /> <p> Upload from Computer </p> <CancelIcon className="cursorPointer cancelIcon" onClick={() => props.history.push("/")} />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

const iconStyle = {
  padding: 0,
  width: "1em",
  height: "1em"
};
const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
    videoUser: state.video,
    savedVideoId: state.video.savedVideoId,
    progressEmail: state.video.progressEmail
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendVideoToEmail: (video: EmailVideo) => dispatch(sendVideoToEmail(video)),
    saveVideo: (video: VideoSave) => dispatch(saveVideo(video)),
    toggleSendVariable: () => dispatch(toggleSendVariable()),
    sendMultipleEmail: (emailVideoObj: MultiEmail) =>
      dispatch(sendMultipleEmails(emailVideoObj))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UploadRecord);
