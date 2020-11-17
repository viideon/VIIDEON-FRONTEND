import React, { Component } from "react";
import AWS from "aws-sdk";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import VideoRecorder from "../../components/VideoRecorder";
import AddLogoText from "./AddLogoText";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { LinearProgress, TextField } from "@material-ui/core";
import ThemeButton from "../../components/ThemeButton";
import Loading from "../../components/Loading";
import ChipInput from "material-ui-chip-input";
import { FaLaptop } from "react-icons/fa";
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
import "./style.css";
import fileUploadIcon from "../../assets/uploadCircle.png";
import Header from "../../components/Header/Header";

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
      <>
        <Header
          styles={{
            backgroundImage:
              "linear-gradient(-90deg, rgb(97, 181, 179), rgb(97, 181, 179), rgb(252, 179, 23))"
          }}
        />
        <div className="recordMainContainer">
          <Tabs defaultIndex={this.props.location.show === "upload" ? 1 : 0}>
            <TabList>
              <Tab>
                <div>
                  <VideocamIcon />
                  {Constants.RECORD_WITH_CAMERA}
                </div>
              </Tab>
              <Tab style={{ bottom: "-2.2px" }}>
                <div>
                  <FaLaptop id="videoTabIcon" style={iconStyle} />
                  {Constants.UPLOAD_FROM_COMPUTER}
                </div>
              </Tab>
            </TabList>
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
            <TabPanel>
              <div className="uploadPanelBorder">
                <div className="wrapperUploadPanel">
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
                            src={fileUploadIcon}
                            style={{ width: 80, margin: "auto" }}
                            alt="upload"
                          />
                        </div>
                        <aside>
                          <p
                            style={{
                              marginTop: 20,
                              textAlign: "center",
                              fontFamily: "Poppins",
                              fontWeight: "bold"
                            }}
                          >
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
                                    <TextField
                                      name="name"
                                      value={this.state.title}
                                      onChange={this.titleNameHandler}
                                      placeholder="Give your video an amazing title"
                                      type="text"
                                      label="Video Title"
                                      fullWidth
                                      margin="normal"
                                      InputLabelProps={{
                                        shrink: true
                                      }}
                                      style={{ margin: "40px 0px" }}
                                    />
                                    <ThemeButton
                                      style={{
                                        background: Colors.themeBlue,
                                        color: Colors.white
                                      }}
                                      disabled={
                                        this.state.videoProgress || loading
                                      }
                                      onClick={this.uploadFileHandler}
                                      name="Save Video"
                                    />
                                  </div>
                                )}
                                {videoSaved === true && (
                                  <div>
                                    <div>
                                      <EmailInstruction heading="Reciever Email" />
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
                                    </div>
                                    <ThemeButton
                                      onClick={this.submitEmail}
                                      name={`${Constants.SEND_THROUGH_EMAIL}`}
                                      style={{
                                        backgroundColor: Colors.themeGreen,
                                        color: Colors.white
                                      }}
                                    />
                                    <div className="formGroupMultiple">
                                      <EmailInstruction heading="Broadcast" />
                                      <ChipInput
                                        value={this.state.emails}
                                        placeholder="Enter email and press enter"
                                        fullWidth
                                        onAdd={chips =>
                                          this.handleChipAdd(chips)
                                        }
                                        onDelete={chip =>
                                          this.handleDeleteChip(chip)
                                        }
                                      />
                                    </div>
                                    <div>
                                      <ThemeButton
                                        style={{
                                          backgroundColor: Colors.themeGreen,
                                          color: Colors.white
                                        }}
                                        onClick={this.sendMultipleEmail}
                                        name="Broadcast"
                                      />
                                    </div>
                                    <ThemeButton
                                      style={{
                                        background: Colors.themeBlue,
                                        color: Colors.white,
                                        marginTop: "30px"
                                      }}
                                      onClick={this.navigateToVideos}
                                      name="Done"
                                    />
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
          </Tabs>

          <canvas
            ref="canvas"
            style={{ position: "absolute", left: "-2000px" }}
          />
          <video
            ref="video"
            style={{
              opacity: 0.00001,
              position: "absolute",
              left: "-999px"
            }}
          />
        </div>
      </>
    );
  }
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
