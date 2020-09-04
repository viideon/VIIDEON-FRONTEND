import React from "react";
import { Grid, LinearProgress, Tooltip, TextField } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Loading from "../../components/Loading";
import { Input, Label, FormGroup, Button } from "reactstrap";
import CanvasPlayer from "../../components/CanvasPlayer/EditingCanvas";
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
import HelpIcon from "@material-ui/icons/Help";
import "./style.css";

interface IProps {
  history: any;
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
  musicProps: any;
  toggleSendVariable: () => void;
  logoBlob: any;
  thumbnailBlob: any;
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
    height: 0,
    logoUrl: "",
    thumbnailUrl: "",
    videoHeight: "300px"
  };
  canvas: any;
  container: any;
  s3: any;
  componentDidMount() {
    this.props.toggleSendVariable();
    this.s3 = new AWS.S3(config);
    this.caluclateContainerHeight();
    window.addEventListener("resize", this.caluclateContainerHeight);
  }
  caluclateContainerHeight = () => {
    let calculatedVideoHeight = document.getElementById("wrapperSend")?.clientWidth ? `${document.getElementById('wrapperSend')!.clientWidth * 0.5625}px` : "300px";
    this.setState({ videoHeight: calculatedVideoHeight });
  }
  saveVideo = async () => {
    if (this.state.title === "") {
      toast.warn("Enter a title to save video");
      return;
    }
    try {
      await this.uploadThumbnail();
      await this.uploadVideo();
      const video = {
        title: this.state.title,
        url: this.state.urlRecord,
        userId: this.props.auth!.user!._id,
        thumbnail: this.state.thumbnailUrl,
        textProps: this.props.textProps,
        logoProps: this.props.logoProps,
        musicProps: this.props.musicProps,
        campaign: true
      };
      this.props.saveVideo(video);
    } catch (error) {
      toast.error("Failed to save campaign, Please try again");
    }
  };
  uploadVideo = () => {
    return new Promise((resolve, reject) => {
      this.setState({ videoProgress: true, progressVideo: 0 });
      const options = {
        Bucket: config.bucketName,
        ACL: config.ACL,
        Key: Date.now().toString() + ".webm",
        Body: this.props.previewVideo
      };
      this.s3
        .upload(options, (err: any, data: any) => {
          if (err) {
            this.setState({ videoProgress: false });
            reject();
          } else {
            this.setState({ urlRecord: data.Location, videoProgress: false });
            resolve();
          }
        })
        .on("httpUploadProgress", (progress: any) => {
          let uploaded: number = (progress.loaded * 100) / progress.total;
          this.setState({ progressVideo: uploaded });
        });
    });
  };
  uploadThumbnail = () => {
    return new Promise((resolve, reject) => {
      this.setState({ videoProgress: true, progressVideo: 0 });
      const thumbnailOptions = {
        Bucket: config.bucketName,
        ACL: config.ACL,
        Key: Date.now().toString() + "thumbnail.jpeg",
        Body: this.props.thumbnailBlob
      };

      this.s3
        .upload(thumbnailOptions, (err: any, data: any) => {
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
        })
        .on("httpUploadProgress", (progress: any) => {
          let uploaded: number = (progress.loaded * 100) / progress.total;
          this.setState({ progressVideo: uploaded });
        });
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
        videoId: this.props.savedVideoId,
        recieverEmail
      };
      this.props.sendVideoToEmail(video);
      this.setState({ recieverEmail: "" });
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
      const emails = this.state.emails.join();
      const emailVideoObj = {
        recieverEmail: emails,
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
  navigateToVideos = () => {
    this.props.history.push("/campaign");
  };
  componentWillUnmount() {
    window.removeEventListener("resize", this.caluclateContainerHeight);
  }
  render() {
    let { videoSaved, loading } = this.props.videoUser;
    let { progressEmail } = this.props;
    console.log("musicProps", this.props.musicProps && this.props.musicProps);
    return (
      <Grid container>
        <Grid item xs={1} sm={1} md={3} lg={3}></Grid>
        <Grid item xs={10} sm={10} md={6} lg={6} id="wrapperSend">
          <h3 className="recordHeading">Save and Email Campaign</h3>
          <div ref="container" style={{
            width: "100%",
            height: this.state.videoHeight
          }}>
            {this.props.previewVideo && this.props.thumbnailBlob && (
              <CanvasPlayer
                autoPlay={false}
                muted={false}
                loop={false}
                src={URL.createObjectURL(this.props.previewVideo)}
                textProps={this.props.textProps}
                logoProps={this.props.logoProps}
                musicProps={this.props.musicProps}
                local={true}
                thumbnail={URL.createObjectURL(this.props.thumbnailBlob)}
              />
            )}
          </div>
          <div style={{ marginLeft: "50%", marginTop: "15px" }}>
            {loading && <Loading />}
            {progressEmail && <Loading />}
          </div>
          <div id="formInput" style={{ marginTop: "30px" }}>
            {videoSaved !== true && (
              <div>
                {this.state.videoProgress && (
                  <LinearProgress
                    variant="determinate"
                    value={this.state.progressVideo}
                  />
                )}
                <FormGroup>
                  <Label className="labelUploadSection">Campaign Title</Label>
                  <Input
                    type="text"
                    name="name"
                    id="typeInput"
                    placeholder="Give your campaign an amazing title"
                    value={this.state.title}
                    onChange={this.titleNameHandler}
                  />
                </FormGroup>
                <Button
                  style={{
                    border: "none",
                    background: "rgb(34, 185, 255)",
                    color: "rgb(255, 255, 255)"
                  }}
                  disabled={this.state.videoProgress || loading}
                  size="lg"
                  onClick={this.saveVideo}
                >
                  Save Campaign
                </Button>
              </div>
            )}
            {videoSaved === true && (
              <div>
                <FormGroup>
                  <Label className="labelUploadSection">
                    {Constants.SENDER_ADDRESS}{" "}
                    <span>
                      <Tooltip
                        title="connect your gmail account in confguration to send email's on your behalf"
                        placement="top"
                        arrow
                      >
                        <HelpIcon />
                      </Tooltip>
                    </span>
                  </Label>
                  <TextField
                    placeholder="Enter email address"
                    fullWidth
                    type="text"
                    value={this.state.recieverEmail}
                    name="recieverEmail"
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={this.emailHandler}
                  />
                </FormGroup>

                <Button
                  style={{
                    border: "none",
                    background: "#16B272",
                    color: "rgb(255, 255, 255)"
                  }}
                  size="lg"
                  onClick={this.submitEmail}
                >
                  {Constants.SEND_THROUGH_EMAIL}
                </Button>
                <FormGroup className="formGroupMultiple">
                  <Label className="labelUploadSection">
                    Broadcast
                    <span>
                      <Tooltip
                        title="connect your gmail account in confguration to send email's on your behalf"
                        placement="top"
                        arrow
                      >
                        <HelpIcon />
                      </Tooltip>
                    </span>
                  </Label>
                  <ChipInput
                    value={this.state.emails}
                    placeholder="Enter email and press enter"
                    fullWidth
                    onAdd={chips => this.handleChipAdd(chips)}
                    onDelete={chip => this.handleDeleteChip(chip)}
                  />
                </FormGroup>
                <Button
                  style={{
                    border: "none",
                    background: "#16B272",
                    color: "#fff"
                  }}
                  size="lg"
                  onClick={this.sendMultipleEmail}
                >
                  Broadcast
                </Button>
                <FormGroup style={{ textAlign: "end" }}>
                  <Button
                    style={{
                      border: "none",
                      background: "rgb(34, 185, 255)",
                      color: "rgb(255, 255, 255)",
                      width: "120px"
                    }}
                    size="lg"
                    onClick={this.navigateToVideos}
                  >
                    Done
                  </Button>
                </FormGroup>
              </div>
            )}
          </div>
          <canvas
            ref="canvas"
            style={{ position: "absolute", left: "-2000px", display: "none" }}
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
export default withRouter<any, any>(
  connect(mapStateToProps, mapDispatchToProps)(SendSave)
);
