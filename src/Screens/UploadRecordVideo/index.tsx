import React, { Component } from "react";
import AWS from "aws-sdk";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Input, Label, Row, Col, Form, FormGroup } from "reactstrap";
import { FaCamera, FaLaptop } from "react-icons/fa";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import Header from "../../components/Header/Header";
import { sendVideoToEmail, saveVideo } from "../../Redux/Actions/videos";
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
    if (reg.test(this.state.recieverEmail) === false) {
      return alert("Invalid Email");
    } else if (this.state.recieverEmail) {
      const that = this;
      this.setState({ loading: true });
      const file = {
        name: this.state.files[0].name,
        type: this.state.files[0].type,
        size: this.state.files[0].size
      };
      this.setState({ file });
      let s3 = new AWS.S3(config);
      var options = {
        Bucket: config.bucketName,
        ACL: config.ACL,
        Key: Date.now().toString(),
        Body: this.state.files[0]
      };
      s3.upload(options, function(err: any, data: any) {
        if (err) {
          throw err;
        }
        that.setState({ url: data.Location });
        const url = that.state.url;
        const recieverEmail = that.state.recieverEmail;
        const video = {
          url,
          recieverEmail
        };
        that.props.sendVideoToEmail(video);
        that.setState({ loading: false });
      });
    } else {
      alert("Fill the field first");
    }
  };
  submit = () => {
    if (reg.test(this.state.recieverEmail) === false) {
      return alert("Invalid Email");
    } else if (this.state.recieverEmail) {
      const that = this;
      this.setState({ loading: true });
      // let file = {
      //   name: this.state.title,
      //   type: this.state.videoRecord.type,
      //   size: this.state.videoRecord.size,
      //   path: this.state.videoRecord.type
      // };

      // this.setState({ recordFile: file });
      let s3 = new AWS.S3(config);
      var options = {
        Bucket: config.bucketName,
        ACL: config.ACL,
        Key: Date.now().toString() + ".webm",
        Body: this.state.videoRecord
      };
      s3.upload(options, function(err: any, data: any) {
        if (err) {
          throw err;
        }
        that.setState({ urlRecord: data.Location });
        const url = that.state.urlRecord;
        const recieverEmail = that.state.recieverEmail;
        const video = {
          url,
          recieverEmail
        };
        that.props.sendVideoToEmail(video);
        that.setState({ loading: false });
      });
    } else {
      alert("Fill the field first");
    }
  };
  saveVideo = () => {
    if (this.state.title === "") {
      alert("Enter a title to save video");
      return;
    }
    this.setState({ loading: true });
    // let file = {
    //   name: this.state.title,
    //   type: this.state.videoRecord.type,
    //   size: this.state.videoRecord.size,
    //   path: this.state.videoRecord.type
    // };

    // this.setState({ recordFile: file });

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
      that.setState({ loading: false });
    });
  };

  render() {
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
                            <>
                              <div style={{ boxShadow: "0 0 10px #dadada" }}>
                                <p>File Name: {file.name}</p>
                                <p>Size: {file.size} bytes</p>
                              </div>
                              <Form id="formInput">
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
                                  />
                                </FormGroup>
                              </Form>
                              <Button
                                color="secondary"
                                variant="contained"
                                onClick={this.fileHandler}
                              >
                                {Constants.SEND_THROUGH_EMAIL}
                              </Button>
                            </>
                          ))}
                        </aside>
                      </section>
                    )}
                  </Dropzone>
                  <div style={{ marginLeft: "50%" }}>
                    {this.state.loading ? <Loading /> : null}
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
                        {this.state.loading ? (
                          <Loading height="15%" width="15%" />
                        ) : null}
                      </div>
                      <Form id="formInput">
                        <FormGroup>
                          <Label for="exampleEmail">{Constants.TITLE}</Label>
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
                        {/* <span className="orSpanText">or</span> */}
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
    saveVideo: (video: VideoSave) => dispatch(saveVideo(video))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UploadRecord);
