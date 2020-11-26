import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from 'react-toastify'

import { Grid, Select, MenuItem, InputLabel } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import VideoRecorder from "../../../components/VideoRecorder";

import "react-tabs/style/react-tabs.css";
import "../style.css";

type RState = {
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
class RecorderTab extends Component<any, RState> {
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

  // uploadFileHandler = () => {
  //   if (this.state.title === "") {
  //     toast.warn("Enter a video title");
  //     return;
  //   }
  //   this.setState({ fileProgress: true, progressFile: 0 });
  //   let s3 = new AWS.S3(config);
  //   const options = {
  //     Bucket: config.bucketName,
  //     ACL: config.ACL,
  //     Key: Date.now().toString() + this.state.files[0].name,
  //     Body: this.state.files[0]
  //   };
  //   const thumbnailOptions = {
  //     Bucket: config.bucketName,
  //     ACL: config.ACL,
  //     Key: Date.now().toString() + ".jpeg",
  //     Body: this.state.thumbnail
  //   };
  //   s3.upload(options, (err: any, data: any) => {
  //     if (err) {
  //       this.setState({ fileProgress: false });
  //       toast.error(err);
  //       return;
  //     }
  //     this.setState({ urlRecord: data.Location });
  //     s3.upload(thumbnailOptions, (err: any, data: any) => {
  //       if (err) {
  //         toast.error(err);
  //         return;
  //       }
  //       const video = {
  //         title: this.state.title,
  //         url: this.state.urlRecord,
  //         userId: this.props.auth!.user!._id,
  //         thumbnail: data.Location,
  //         campaign: false
  //       };
  //       this.setState({ fileProgress: false });
  //       this.props.saveVideo(video);
  //     });
  //   }).on("httpUploadProgress", progress => {
  //     let uploaded: number = (progress.loaded * 100) / progress.total;
  //     this.setState({ progressFile: uploaded });
  //   });
  // };

  getThumbnailfromFile = (file: any) => {
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

  save = async () => {
    toast.info("Wait! we are getting things ready!")
    await this.getThumbnailfromFile(this.state.videoRecord);
    setTimeout(() => {
      const { thumbnail, thumbnailBlob, videoRecord } = this.state;
      console.log("thumnnai", thumbnail)
      this.props.proceedToNext(thumbnail, videoRecord);
    }, 3000)
    return;
  };

  setQuality = (e: any) => this.setState({ selectedValue: e.target.value })
  render() {
    return (
      <>
        <RecoderSettingHeader
          setQuality={this.setQuality}
          selectValue={this.state.selectedValue}
          history={this.props.history}
        />
        <div className="interActiveRecorderContainer">
          { }
          <VideoRecorder
            getBlob={(blob: any) => {
              this.props.toggleSendVariable();
              this.setState({ videoRecord: blob });
            }}
            reset={() => {
              this.setState({ videoRecord: null });
            }}
            proceed={this.save}
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
    )
  }
}


const RecoderSettingHeader = (props: any) => {
  const { setQuality, selectValue, history } = props;
  console.log(history)
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
            <CloudUploadIcon className="cursorPointer" /> <p> Upload from Computer </p> <CancelIcon className="cursorPointer cancelIcon" onClick={() => history.push("/")} />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RecorderTab);