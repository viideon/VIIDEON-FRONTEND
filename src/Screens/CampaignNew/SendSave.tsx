import React from "react";
import {
  Grid,
  Button,
  LinearProgress,
  CircularProgress
} from "@material-ui/core";
import { Input, Label, FormGroup } from "reactstrap";
import CanvasPlayer from "../../components/CanvasPlayer";
import ChipInput from "material-ui-chip-input";
import AWS from "aws-sdk";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  sendVideoToEmail,
  saveVideo,
  sendMultipleEmails,
  toggleSendVariable
} from "../../Redux/Actions/videos";
import {
  VideoState,
  EmailVideo,
  VideoSave,
  MultiEmail
} from "../../Redux/Types/videos";
import { AuthState } from "../../Redux/Types/auth";
import * as Constants from "../../constants/constants";
import { reg } from "../../constants/emailRegEx";
import { config } from "../../config/aws";
import "./style.css";

interface IProps {
  auth: AuthState;
  videoUser: VideoState;
  previewVideo: any;
  sendVideoToEmail: (video: EmailVideo) => void;
  saveVideo: (video: VideoSave) => void;
  sendMultipleEmail: (emailVideoObj: any) => void;
  savedVideoId: string;
  progressEmail: boolean;
  logoProps: any;
  textProps: any;
  toggleSendVariable: () => void;
}

class SendSave extends React.Component<IProps> {
  state = {
    title: "",
    urlRecord: "",
    emails: [],
    recieverEmail: "",
    videoProgress: false,
    progressVideo: 0,
    thumbnail: "",
    url: "",
    width: 0,
    height: 0
  };
  canvas: any;
  componentDidMount() {
    this.props.toggleSendVariable();
    let container: any = this.refs.container;
    const persistRect = JSON.parse(
      JSON.stringify(container.getBoundingClientRect())
    );
    // const video: any = this.refs.video;
    console.log("preview Video", this.props.previewVideo);
    // let url = URL.createObjectURL(this.props.previewVideo);
    alert(URL.createObjectURL(this.props.previewVideo));
    // video.src = URL.createObjectURL(this.props.previewVideo);
    this.canvas = this.refs.canvas;
    this.canvas.width = 1280;
    this.canvas.height = 720;
    const that = this;
    console.log(
      "persistRectWidth,height",
      persistRect.width,
      persistRect.height
    );
    this.setState({
      width: persistRect.width,
      height: persistRect.height
    });

    // video.addEventListener("loadeddata", (e: any) => {
    //   setTimeout(function() {
    //     that.canvas.getContext("2d").drawImage(video, 0, 0, 1280, 720);
    //     that.canvas.toBlob((blob: any) => {
    //       console.log("blob", blob);
    //       that.setState({ thumbnail: blob });
    //     }, "image/jpeg");
    //   }, 2000);
    // });
  }
  saveVideo = () => {
    if (this.state.title === "") {
      toast.warn("Enter a title to save video");
      return;
    }
    this.setState({ videoProgress: true, progressVideo: 0 });
    let s3 = new AWS.S3(config);
    var options = {
      Bucket: config.bucketName,
      ACL: config.ACL,
      Key: Date.now().toString() + ".webm",
      Body: this.props.previewVideo
    };
    var thumbnailOptions = {
      Bucket: config.bucketName,
      ACL: config.ACL,
      Key: Date.now().toString() + ".jpeg",
      Body: this.state.thumbnail
    };
    const that = this;
    s3.upload(options, function(err: any, data: any) {
      if (err) {
        that.setState({ fileProgress: false });
        toast.error(err);
        return;
      }
      that.setState({ urlRecord: data.Location });
      s3.upload(thumbnailOptions, function(err: any, data: any) {
        if (err) {
          toast.error(err);
          return;
        }
        const video = {
          title: that.state.title,
          url: that.state.urlRecord,
          userId: that.props.auth!.user!._id,
          thumbnail: data.Location
        };
        that.setState({ videoProgress: false });
        that.props.saveVideo(video);
      });
    }).on("httpUploadProgress", function(progress) {
      let uploaded: number = (progress.loaded * 100) / progress.total;
      that.setState({ progressVideo: uploaded });
    });
  };
  titleNameHandler = (event: any) => {
    this.setState({
      title: event.target.value
    });
  };
  emailHandler = (event: any) => {
    this.setState({
      recieverEmail: event.target.value
    });
  };
  submitEmail = () => {
    if (this.props.savedVideoId === "") {
      return toast.warn("Please save a video");
    } else if (this.state.recieverEmail === "") {
      return toast.warn("Add an Email");
    } else if (reg.test(this.state.recieverEmail) === false) {
      return toast.warn("Invalid Email");
    } else {
      const recieverEmail = this.state.recieverEmail;
      const video = {
        id: this.props.savedVideoId,
        recieverEmail
      };
      this.props.sendVideoToEmail(video);
    }
  };
  sendMultipleEmail = () => {
    if (this.state.emails.length === 0) {
      toast.error("No email provided");
      return;
    } else if (!this.props.savedVideoId) {
      toast.error("No video saved try again");
      return;
    } else {
      const emailVideoObj = {
        emails: this.state.emails,
        videoId: this.props.savedVideoId
      };
      this.props.sendMultipleEmail(emailVideoObj);
      this.setState({ emails: [] });
    }
  };

  handleChipAdd = (email: any) => {
    if (reg.test(email) === false) {
      toast.error("Not a valid email");
      return;
    }
    this.setState({ emails: [...this.state.emails, email] });
  };
  handleDeleteChip = (delEmail: any) => {
    this.setState({
      emails: this.state.emails.filter((email: string) => email !== delEmail)
    });
  };

  render() {
    let { videoSaved, loading } = this.props.videoUser;
    return (
      <Grid container>
        <Grid item xs={1} sm={1} md={3} lg={3}></Grid>
        <Grid item xs={10} sm={10} md={6} lg={6}>
          <h3 className="recordHeading">Save and Email Video</h3>
          <div style={{ width: "100%", height: "300px" }} ref="container">
            {/* <video width="100%" ref="video" controls /> */}
            {this.props.previewVideo && (
              <CanvasPlayer
                width={this.state.width}
                height={this.state.height}
                autoPlay={false}
                muted={false}
                loop={false}
                src={URL.createObjectURL(this.props.previewVideo)}
                textProps={{
                  text: "Hello world",
                  textColor: "#fff",
                  fontSize: 30,
                  vAlign: "top",
                  align: "left"
                }}
                logoProps={{
                  url:
                    "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/195px-Real_Madrid_CF.svg.png",
                  position: "topRight",
                  width: 30,
                  height: 30
                }}
              />
            )}
          </div>
          <div style={{ marginLeft: "50%" }}>
            {loading && <CircularProgress />}
            {this.props.progressEmail && <CircularProgress />}
          </div>
          <div id="formInput">
            {videoSaved !== true && (
              <div>
                {this.state.videoProgress && (
                  <LinearProgress
                    variant="determinate"
                    value={this.state.progressVideo}
                  />
                )}
                <FormGroup>
                  <Label className="labelUploadSection">Video Title</Label>
                  <Input
                    type="text"
                    name="name"
                    id="typeInput"
                    placeholder=""
                    value={this.state.title}
                    onChange={this.titleNameHandler}
                  />
                </FormGroup>
                <Button
                  variant="contained"
                  style={{ marginBottom: "8px" }}
                  onClick={this.saveVideo}
                >
                  {Constants.SAVE_VIDEO}
                </Button>
              </div>
            )}
            {videoSaved === true && (
              <div>
                <FormGroup>
                  <Label className="labelUploadSection">
                    {Constants.SENDER_ADDRESS}
                  </Label>
                  <Input
                    type="text"
                    name="email"
                    id="typeInput"
                    placeholder=""
                    value={this.state.recieverEmail}
                    onChange={this.emailHandler}
                  />
                </FormGroup>

                <Button
                  color="secondary"
                  variant="contained"
                  onClick={this.submitEmail}
                >
                  {Constants.SEND_THROUGH_EMAIL}
                </Button>
                <FormGroup className="formGroupMultiple">
                  <Label className="labelUploadSection">Broadcast</Label>
                  <ChipInput
                    value={this.state.emails}
                    placeholder="Enter email and press enter"
                    fullWidth
                    onAdd={chips => this.handleChipAdd(chips)}
                    onDelete={chip => this.handleDeleteChip(chip)}
                  />
                </FormGroup>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={this.sendMultipleEmail}
                >
                  Broadcast
                </Button>
              </div>
            )}
          </div>
          <canvas
            ref="canvas"
            style={{ position: "absolute", left: "-2000px" }}
          />
        </Grid>
        <Grid item xs={1} sm={1} md={3} lg={3}></Grid>
      </Grid>
    );
  }
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
    sendVideoToEmail: (video: EmailVideo) => dispatch(sendVideoToEmail(video)),
    saveVideo: (video: VideoSave) => dispatch(saveVideo(video)),
    toggleSendVariable: () => dispatch(toggleSendVariable()),
    sendMultipleEmail: (emailVideoObj: MultiEmail) =>
      dispatch(sendMultipleEmails(emailVideoObj))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SendSave);
