import React, { Component } from "react";
import AWS from "aws-sdk";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Input, Label, Row, Col, Form, FormGroup } from "reactstrap";
import { FaCamera, FaLaptop } from "react-icons/fa";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import Header from "../../components/Header/Header";
import {
  sendVideoToEmail,
  saveVideo,
  toggleSendVariable
} from "../../Redux/Actions/videos";
import { VideoState, EmailVideo, VideoSave } from "../../Redux/Types/videos";
import VideoRecorder from "react-video-recorder";
import styles from "../VideoTab/style";
import Button from "@material-ui/core/Button";
import { AuthState } from "../../Redux/Types/auth";
import Loading from "../../components/Loading";
import * as Constants from "../../constants/components/UploadRecord";
import "../../../node_modules/react-tabs/style/react-tabs.css";
import { reg } from "../../constants/emailRegEx";
import { config } from "../../config/aws";
import "./style.css";

type IProps = {
  auth: AuthState;
  history: any;
  videoUser: VideoState;
  sendVideoToEmail: (video: EmailVideo) => void;
  saveVideo: (video: VideoSave) => void;
  toggleSendVariable: () => void;
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
  recieverEmail: string;
};

class UploadRecord extends Component<IProps, IState> {
  onDrop: (files: any) => void;
  constructor(props: any) {
    super(props);
    this.onDrop = files => {
      this.props.toggleSendVariable();
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
      recieverEmail: ""
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

  fileHandler = () => {
    if (this.state.title === "") {
      alert("Enter a video title");
      return;
    }
    const that = this;

    let s3 = new AWS.S3(config);
    var options = {
      Bucket: config.bucketName,
      ACL: config.ACL,
      Key: Date.now().toString() + this.state.files[0].name,
      Body: this.state.files[0]
    };
    s3.upload(options, function(err: any, data: any) {
      if (err) {
        throw err;
      }
      that.setState({ urlRecord: data.Location });
      const url = that.state.urlRecord;
      const video = {
        title: that.state.title,
        url,
        userId: that.props.auth.user!.user!._id
      };
      that.props.saveVideo(video);
    });
  };

  submit = () => {
    if (this.state.recieverEmail === "") {
      return alert("Add an Email");
    } else if (reg.test(this.state.recieverEmail) === false) {
      return alert("Invalid Email");
    } else {
      const that = this;
      const url = that.state.urlRecord;
      const recieverEmail = that.state.recieverEmail;
      const video = {
        url,
        recieverEmail
      };
      that.props.sendVideoToEmail(video);
    }
  };
  saveVideo = () => {
    if (this.state.title === "") {
      alert("Enter a title to save video");
      return;
    }
    let s3 = new AWS.S3(config);
    var options = {
      Bucket: config.bucketName,
      ACL: config.ACL,
      Key: Date.now().toString() + ".webm",
      Body: this.state.videoRecord
    };
    const that = this;
    s3.upload(options, function(err: any, data: any) {
      if (err) {
        throw err;
      }
      that.setState({ urlRecord: data.Location });
      const video = {
        url: that.state.urlRecord,
        userId: that.props.auth.user!.user!._id,
        title: that.state.title
      };
      that.props.saveVideo(video);
    });
  };

  render() {
    let { videoSaved, loading } = this.props.videoUser;
    return (
      <>
        <Header history={this.props.history} />
        <div className="recordMainContainer">
          <p className="mainHeader">{Constants.CREATE_VIDEO}</p>
          <p className="titleHeader">{Constants.RECORD_AND_SHARE}</p>
          <hr />
          <Tabs>
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
                              {/* style={{ boxShadow: "0 0 10px #dadada" }} */}
                              <div className="fileInformationDiv">
                                <p>File Name: {file.name}</p>
                                <p>Size: {file.size} bytes</p>
                              </div>
                              <Form id="formInput">
                                {videoSaved === null && (
                                  <div>
                                    <FormGroup>
                                      <Label for="exampleEmail">
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
                                      onClick={this.fileHandler}
                                    >
                                      {Constants.SAVE_VIDEO}
                                    </Button>
                                  </div>
                                )}

                                {videoSaved === true && (
                                  <div>
                                    <FormGroup>
                                      <Label
                                        for="exampleEmail"
                                        style={{ fontWeight: "bold" }}
                                      >
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
                                      onClick={this.submit}
                                    >
                                      {Constants.SEND_THROUGH_EMAIL}
                                    </Button>
                                  </div>
                                )}
                              </Form>
                            </div>
                          ))}
                        </aside>
                      </section>
                    )}
                  </Dropzone>
                  <div style={{ marginLeft: "50%" }}>
                    {loading && <Loading />}
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
                        {loading && <Loading height="15%" width="15%" />}
                      </div>
                      <Form id="formInput">
                        {videoSaved === null && (
                          <div>
                            <FormGroup>
                              <Label for="exampleEmail">
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
                              <Label for="exampleEmail">
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
                              onClick={this.submit}
                            >
                              {Constants.SEND_THROUGH_EMAIL}
                            </Button>
                          </div>
                        )}
                      </Form>
                    </Col>
                  </Row>
                </div>
              )}
              <div style={styles.recorder}>
                <VideoRecorder
                  isOnInitially={false}
                  showReplayControls
                  replayVideoAutoplayAndLoopOff
                  isReplayVideoInitiallyMuted={false}
                  onRecordingComplete={(videoBlob: any) => {
                    // Do something with the video...
                    this.props.toggleSendVariable();
                    this.setState({ videoRecord: videoBlob });
                  }}
                />
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </>
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
    videoUser: state.video
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendVideoToEmail: (video: EmailVideo) => dispatch(sendVideoToEmail(video)),
    saveVideo: (video: VideoSave) => dispatch(saveVideo(video)),
    toggleSendVariable: () => dispatch(toggleSendVariable())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UploadRecord);
