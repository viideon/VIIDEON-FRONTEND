import React, { Component } from "react";
import AWS from "aws-sdk";
import * as ebml from "ts-ebml";
import VideoRecorder from "react-video-recorder";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Button, LinearProgress, CircularProgress } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import { Input, Label, Row, Col, FormGroup } from "reactstrap";
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

import styles from "../VideoTab/style";
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
      thumbnail: ""
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
      const emailVideoObj = {
        emails: this.state.emails,
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
    const that = this;
    let s3 = new AWS.S3(config);
    var options = {
      Bucket: config.bucketName,
      ACL: config.ACL,
      Key: Date.now().toString() + this.state.files[0].name,
      Body: this.state.files[0]
    };
    var thumbnailOptions = {
      Bucket: config.bucketName,
      ACL: config.ACL,
      Key: Date.now().toString() + ".jpeg",
      Body: this.state.thumbnail
    };
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
        that.setState({ fileProgress: false });
        that.props.saveVideo(video);
      });
    }).on("httpUploadProgress", function(progress) {
      let uploaded: number = (progress.loaded * 100) / progress.total;
      that.setState({ progressFile: uploaded });
    });
  };

  saveVideo = () => {
    if (this.state.title === "") {
      toast.warn("Enter a title to save video");
      return;
    }
    this.setState({ videoProgress: true, progressVideo: 0 });
    let s3 = new AWS.S3(config);
    let options = {
      Bucket: config.bucketName,
      ACL: config.ACL,
      Key: Date.now().toString() + ".webm",
      Body: this.state.videoRecord
    };
    let thumbnailOptions = {
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
          url: that.state.urlRecord,
          userId: that.props.auth!.user!._id,
          title: that.state.title,
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
  getThumbnail = (blob: any) => {
    this.video = this.refs.video;
    this.canvas = this.refs.canvas;
    this.video.src = URL.createObjectURL(blob);
    this.video.currentTime = 3;
    this.canvas.width = 1280;
    this.canvas.height = 720;
    const that = this;

    this.video.addEventListener("loadeddata", (e: any) => {
      setTimeout(function() {
        that.canvas.getContext("2d").drawImage(that.video, 0, 0, 1280, 720);
        that.canvas.toBlob((blob: any) => {
          that.setState({ thumbnail: blob });
        }, "image/jpeg");
      }, 2000);
    });
  };
  getThumbnailfromFile = (file: any) => {
    this.video = this.refs.video;
    this.canvas = this.refs.canvas;
    this.video.src = URL.createObjectURL(file);
    this.video.currentTime = 3;
    this.canvas.width = 1280;
    this.canvas.height = 720;
    const that = this;
    this.video.addEventListener("loadeddata", (e: any) => {
      setTimeout(function() {
        that.canvas.getContext("2d").drawImage(that.video, 0, 0, 1280, 720);
        that.canvas.toBlob((blob: any) => {
          // alert(URL.createObjectURL(blob));
          that.setState({ thumbnail: blob });
          // alert(URL.createObjectURL(blob));
        }, "image/jpeg");
      }, 2000);
    });
  };
  getUrl = () => {
    this.canvas.getContext("2d").drawImage(this.video, 0, 0, 1280, 720);
    this.canvas.toBlob((blob: any) => {
      alert(URL.createObjectURL(blob));
    }, "image/jpeg");
  };
  getSeekableBlob = (inputBlob: any) => {
    // EBML.js copyrights goes to: https://github.com/legokichi/ts-ebml
    const decoder = new ebml.Decoder();
    fetch(URL.createObjectURL(inputBlob))
      .then(res => res.arrayBuffer())
      .then(buf => {
        const ebmlElms = decoder.decode(buf);
        console.log(ebmlElms);
      });
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
                                  <Button
                                    variant="contained"
                                    style={{ marginBottom: "8px" }}
                                    onClick={this.fileHandler}
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
                                      name="recieverEmail"
                                      id="typeInput"
                                      placeholder="Enter email address"
                                      value={this.state.recieverEmail}
                                      onChange={this.emailHandler}
                                      required
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
                                    <Label className="labelUploadSection">
                                      Broadcast
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
                          </div>
                        ))}
                      </aside>
                    </section>
                  )}
                </Dropzone>
                <div style={{ marginLeft: "50%" }}>
                  {loading && <CircularProgress />}
                  {this.props.progressEmail && <CircularProgress />}
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            {this.state.videoRecord && (
              <div style={{ marginTop: 20, marginBottom: 20 }}>
                <Row>
                  <Col className="col-md-6 m-auto">
                    <div style={{ marginLeft: "50%" }}>
                      {loading && <CircularProgress />}
                      {this.props.progressEmail && <CircularProgress />}
                    </div>
                    <div id="formInput">
                      {videoSaved === null && (
                        <div>
                          {this.state.videoProgress && (
                            <LinearProgress
                              variant="determinate"
                              value={this.state.progressVideo}
                            />
                          )}
                          <FormGroup>
                            <Label className="labelUploadSection">
                              {Constants.TITLE}
                            </Label>
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
                            <Label className="labelUploadSection">
                              Broadcast
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
                            color="secondary"
                            variant="contained"
                            onClick={this.sendMultipleEmail}
                          >
                            Broadcast
                          </Button>
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            )}
            <div style={styles.recorder} className="recorderWrapper">
              <VideoRecorder
                isOnInitially={false}
                showReplayControls
                replayVideoAutoplayAndLoopOff
                isReplayVideoInitiallyMuted={false}
                onRecordingComplete={(videoBlob: any) => {
                  // Do something with the video...
                  this.props.toggleSendVariable();
                  this.getThumbnail(videoBlob);
                  this.setState({ videoRecord: videoBlob });
                  // this.getSeekableBlob(videoBlob);
                }}
              />
            </div>
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
