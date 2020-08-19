import React, { Component } from "react";
import AWS from "aws-sdk";
import VideoRecorder from "../../components/VideoRecorder";
import AddLogoText from "./AddLogoText";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import HelpIcon from "@material-ui/icons/Help";
import { Button, LinearProgress, Tooltip, TextField } from "@material-ui/core";
import Loading from "../../components/Loading";
import ChipInput from "material-ui-chip-input";
import { Input, Label, FormGroup, Button as StrapButton } from "reactstrap";
import { FaCamera, FaLaptop } from "react-icons/fa";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import { toast } from "react-toastify";
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
import "../../../node_modules/react-tabs/style/react-tabs.css";
import { reg } from "../../constants/emailRegEx";
import { config } from "../../config/aws";
import "./style.css";

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
};

class UploadRecord extends Component<IProps, IState> {
  onDrop: (files: any) => void;
  canvas: any;
  video: any;
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
      addLogoText: false
    };
  }
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
  fileHandler = () => {
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

  navigateToVideos = () => {
    this.props.history.push("/videos");
  };
  moveToAddLogoText = () => {
    this.setState({ addLogoText: true });
  };
  render() {
    let { videoSaved, loading } = this.props.videoUser;
    return (
      <div className="recordMainContainer">
        <p className="mainHeader">{Constants.CREATE_VIDEO}</p>
        <p className="titleHeader">{Constants.RECORD_AND_SHARE}</p>
        <hr />
        <Tabs defaultIndex={this.props.location.show === "upload" ? 0 : 1}>
          <TabList>
            <Tab>
              <FaLaptop id="videoTabIcon" style={iconStyle} />
              {Constants.UPLOAD_FROM_COMPUTER}
            </Tab>
            <Tab>
              <FaCamera id="videoTabIcon" style={iconStyle} />
              {Constants.RECORD_WITH_CAMERA}
            </Tab>
          </TabList>

          <TabPanel>
            <div className="borderStyle">
              <div style={{ marginTop: 20, marginBottom: 20 }}>
                <Dropzone onDrop={this.onDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <section className="container">
                      <div
                        {...getRootProps({ className: "dropzone" })}
                        style={{
                          textAlign: "center",
                          cursor: "pointer",
                          margin: "auto",
                          width: 100
                        }}
                      >
                        <input {...getInputProps()} />
                        <img
                          src={require("../../assets/upload.png")}
                          style={{ width: 80, margin: "auto" }}
                          alt="upload"
                        />
                      </div>
                      <aside>
                        <p style={{ marginTop: 20, textAlign: "center" }}>
                          {Constants.CLICK_AND_DRAG}
                        </p>
                        {this.state.files.map((file: any) => (
                          <div key={file.name}>
                            <div className="fileInformationDiv">
                              <p>File Name: {file.name}</p>
                              <p>Size: {file.size} bytes</p>
                            </div>
                            <div id="formInput">
                              {videoSaved === null && (
                                <div>
                                  {this.state.fileProgress && (
                                    <LinearProgress
                                      variant="determinate"
                                      value={this.state.progressFile}
                                    />
                                  )}
                                  <FormGroup style={{ marginTop: "5px" }}>
                                    <Label className="labelUploadSection">
                                      {Constants.VIDEO_TITLE}
                                    </Label>
                                    <Input
                                      type="text"
                                      name="name"
                                      id="typeInput"
                                      placeholder="Give your video an amazing title"
                                      value={this.state.title}
                                      onChange={this.titleNameHandler}
                                    />
                                  </FormGroup>
                                  <StrapButton
                                    style={{
                                      border: "none",
                                      background: "rgb(34, 185, 255)",
                                      color: "rgb(255, 255, 255)"
                                    }}
                                    disabled={
                                      this.state.videoProgress || loading
                                    }
                                    size="lg"
                                    onClick={this.fileHandler}
                                  >
                                    Save Video
                                  </StrapButton>
                                </div>
                              )}

                              {videoSaved === true && (
                                <div>
                                  <FormGroup>
                                    <Label className="labelUploadSection">
                                      {Constants.SENDER_ADDRESS}
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
                                    variant="contained"
                                    onClick={this.submitEmail}
                                    color="primary"
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
                                      onDelete={chip =>
                                        this.handleDeleteChip(chip)
                                      }
                                    />
                                  </FormGroup>
                                  <StrapButton
                                    style={{
                                      border: "none",
                                      background: "#16B272",
                                      color: "#fff"
                                    }}
                                    size="lg"
                                    onClick={this.sendMultipleEmail}
                                  >
                                    Broadcast
                                  </StrapButton>
                                  <FormGroup>
                                    <StrapButton
                                      style={{
                                        border: "none",
                                        background: "rgb(34, 185, 255)",
                                        color: "rgb(255, 255, 255)",
                                        marginTop: "30px",
                                        width: "120px"
                                      }}
                                      size="lg"
                                      onClick={this.navigateToVideos}
                                    >
                                      Done
                                    </StrapButton>
                                  </FormGroup>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </aside>
                    </section>
                  )}
                </Dropzone>
                <div style={{ marginLeft: "50%" }}>
                  {loading && <Loading />}
                  {this.props.progressEmail && <Loading />}
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            {this.state.addLogoText === false ? (
              <VideoRecorder
                getBlob={(blob: any) => {
                  this.props.toggleSendVariable();
                  this.setState({ videoRecord: blob }, () =>
                    this.setState({ addLogoText: true })
                  );
                }}
              />
            ) : (
              <AddLogoText videoToEdit={this.state.videoRecord} />
            )}
          </TabPanel>
        </Tabs>

        <canvas
          ref="canvas"
          style={{ position: "absolute", left: "-2000px" }}
        />
        <video
          ref="video"
          style={{
            opacity: 0.00001,
            // transform:"translate(-999px, 0px)"
            position: "absolute",
            left: "-999px"
          }}
        />
      </div>
    );
  }
}

const iconStyle = {
  padding: 5,
  width: 20,
  height: 20
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
