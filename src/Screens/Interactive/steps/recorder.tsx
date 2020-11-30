import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from 'react-toastify'
import { isVideo } from '../../../constants/constants'

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

  getThumbnailfromFile = (file: any) => {
    this.video.src = URL.createObjectURL(file);
    this.video.currentTime = 3;
    this.canvas.width = 1280;
    this.canvas.height = 720;
    this.video.addEventListener("loadeddata", (e: any) => {
      setTimeout(() => {
        this.canvas.getContext("2d").drawImage(this.video, 0, 0, 1280, 720);
        this.canvas.toBlob((blob: any) => {
          this.setState({ thumbnail: blob }, () => {
          const { thumbnail,  videoRecord } = this.state;
            this.props.proceedToNext(thumbnail, this.props.uploaded ? this.props.video : videoRecord);
          });
        }, "image/jpeg");
      }, 2000);
    });
  };

  moveToAddLogoText = () => {
    this.setState({ addLogoText: true });
  };

  save = async () => {
    toast.info("Wait! we are getting things ready!")
    await this.getThumbnailfromFile(this.props.uploaded ? this.props.video : this.state.videoRecord);
  };

  setQuality = (e: any) => this.setState({ selectedValue: e.target.value })
  render() {
    return (
      <>
        <RecoderSettingHeader
          setQuality={this.setQuality}
          selectValue={this.state.selectedValue}
          history={this.props.history}
          {...this.props}
        />
        <div className="interActiveRecorderContainer">
          { }
          <VideoRecorder
            getBlob={(blob: any) => {
              this.props.toggleSendVariable();
              this.setState({ videoRecord: blob });
            }}
            reset={() => {
              this.props.onChange({ target: { name: "uploaded", value: false } })
              this.props.onChange({ target: { name: "video", value: 0 } })
              this.setState({ videoRecord: null });
            }}
            proceed={this.save}
            interActive={true}
            quality={this.state.selectedValue}
            uploaded={this.props.uploaded}
            video={this.props.video}
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
  const videElm = React.useRef(null)
  const { setQuality, selectValue, history } = props;

  React.useEffect(() => {
    if (!props.uploaded) {
      const elm: any = document.getElementById("inputVideo");
      if (elm) {
        elm.src = null;
      }
    }
  }, [props.uploaded])

  const handleUploadFile = (file: any) => {
    if (!file) return;
    if (isVideo(file.target.files[0])) {
      toast.info("Added");
      props.onChange({ target: { name: "video", value: file.target.files[0] } })
      props.onChange({ target: { name: "uploaded", value: true } })
      props.toggleSendVariable();
    } else {
      toast.error("Invalid file type!")
    }

  }

  const click = (event: any) => {
    const elm: any = document.getElementById("inputVideo");
    if (elm) {
      elm.click();
    }
  }

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
            <CloudUploadIcon className="cursorPointer" onClick={click} /> <p> Upload from Computer </p> <CancelIcon className="cursorPointer cancelIcon" onClick={() => history.push("/")} />
          </div>
        </Grid>
        <input style={{ display: "none" }} ref={videElm} type="file" id="inputVideo" name="video" accept="video/*" onChange={handleUploadFile} />
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