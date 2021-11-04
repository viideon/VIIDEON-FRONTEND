import React, { Component } from "react";
import { connect } from "react-redux";
import { toast, Flip } from "react-toastify";
import { config } from "../../config/aws";
import { withRouter } from "react-router-dom";
import AWS from "aws-sdk";

import { saveChatvid, addStepToChatvid } from "../../Redux/Actions/chatvid";
import { toggleSendVariable } from "../../Redux/Actions/videos";
import { VideoState } from "../../Redux/Types/videos";
import { AuthState } from "../../Redux/Types/auth";
import "react-tabs/style/react-tabs.css";

import Header from "../../components/Header/Header";
// steps
import LandingQuestion from "./steps/landing";
import RecorderTab from "./steps/recorder";
import OverLayTab from "./steps/overlay";
import ResponseTypeTab from "./steps/responseType";
import MultiChoiceTab from "./steps/choices";
import CalendarTab from "./steps/calendar";
import FinalTab from "./steps/final";

import "./style.css";
import { createFalse } from "typescript";
const s3 = new AWS.S3(config);
type IProps = {
  auth: AuthState;
  history: any;
  videoUser: VideoState;
  chatvids: any;
  toggleSendVariable: () => void;
  checkchoices: () => void;
  saveVideo: (video: any, history: any) => void;
  addStepToChatvid: (step: any, history: any) => void;
};

class ChatVid extends Component<IProps> {
  state = {
    step: -1,
    video: 0,
    uploaded: false,
    thumbnailBlob: 0,
    thumbnailUrl: "",
    videoProgress: false,
    text: "",
    textColor: "#fff",
    fontSize: "xx-large",
    vAlign: "top",
    align: "left",
    fitvideo: true,
    responseType: "Open-ended",
    calendar: "",
    urlRecord: "",
    title: "",
    choices: [],
    isAddStep: false,
    chatvidId: "",
    stepNo: 0,
    reveal: [0, 100],
    fontWeight: false,
    textDecoration: false,
    fontStyle: false,
    isClicked: false,
  };

  componentDidMount() {
    let pathname = this.props.history.location.pathname.split("/");
    if (pathname[1] === "chatvid" && pathname[2] === "step") {
      this.setState({
        isAddStep: true,
        chatvidId: pathname[3],
        title: this.props.chatvids.selectedChatvid.name,
      });
    }
    if (pathname.length === 5) {
      this.setState({
        stepNo: pathname[4] - 1 === 0 ? pathname[4] : pathname[4] - 1,
      });
    }
  }

  uploadThumbnail = () => {
    return new Promise((resolve, reject) => {
      this.setState({ videoProgress: true, progressVideo: 0 });
      const options = {
        Bucket: config.bucketName,
        ACL: config.ACL,
        Key: Date.now().toString() + "thumbnail.jpeg",
        Body: this.state.thumbnailBlob,
      };
      s3.upload(options, (err: any, data: any) => {
        if (err) {
          this.setState({ videoProgress: false });
          reject();
        } else {
          this.setState({
            videoProgress: false,
            thumbnailUrl: data.Location,
          });
          resolve();
        }
      }).on("httpUploadProgress", (progress: any) => {
        let uploaded: number = (progress.loaded * 100) / progress.total;
        this.setState({ progressVideo: uploaded });
      });
    });
  };

  uploadVideo = () => {
    return new Promise((resolve, reject) => {
      this.setState({ videoProgress: true, progressVideo: 0 });
      const options = {
        Bucket: config.bucketName,
        ACL: config.ACL,
        Key: Date.now().toString() + ".webm",
        Body: this.state.video,
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

  handleNext = () => {
    this.setState({ step: this.state.step + 1 });
  };

  handleBack = (final = false) => {
    const { isClicked } = this.state;
    if (!isClicked) {
      this.setState({ step: final === true ? 2 : this.state.step - 1 });
      this.setState({ choices: [] });
    }
    if (isClicked) {
      return toast.error("Wait for your Response");
    }
  };

  handleProceed = (thumbnailBlob: any, video: any) => {
    this.setState({ thumbnailBlob, video, step: this.state.step + 1 });
  };

  moveToCalender = () => {
    this.setState({ step: 4, responseType: "Calendly" });
  };
  checkchoices = () => {
    console.log("choices are ", this.state.choices);
    for (const c of this.state.choices) {
      if (!c || c === "") return false;
    }
    return true;
  };

  moveTofinal = () => {
    const { isClicked } = this.state;
    if (isClicked) {
      return toast.error("Wait f or your Response");
    }
    console.log("in step index", this.state.choices);
    if (this.state.responseType === "Calendly" && !this.state.calendar)
      return toast.error("Add a link first!");
    if (
      this.state.responseType === "Multiple-Choice" &&
      this.state.choices.length < 2
    ) {
      return toast.error("Add at least two multiple choices");
    } else if (
      this.state.responseType === "Multiple-Choice" &&
      !this.checkchoices()
    ) {
      return toast.error("Please fill the multiple choices");
    }
    if (this.state.isAddStep && this.state.chatvidId) {
      this.props.history.location.pathname !== "/chatvid" &&
        this.setState({ isClicked: true });
      this.createChatVid();
    } else {
      this.setState({ step: 5 });
    }
  };

  onChange = (e: any) => {
    let newState: any = this.state;
    newState[e.target.name] = e.target.value;
    this.setState({ ...newState });
  };

  onStyle = (e: any) => {
    let newState: any = this.state;
    newState.fontStyle = false;
    newState.fontWeight = false;
    newState.textDecoration = false;
    if (e.target.value !== "default") newState[e.target.value] = true;
    this.setState({ ...newState });
  };

  createChatVid = async () => {
    const { responseType } = this.state;
    if (responseType === "Calendly" && !this.state.calendar)
      return toast.warn("Add a url first");
    if (responseType === "Multiple-Choice" && this.state.choices.length < 1)
      return toast.warn("Add Choice(s) first");
    try {
      // toast.info("Uploading thumbnail ...");
      toast("Your chatVid Creating...", {
        autoClose: 2000,
        transition: Flip,
      });
      await this.uploadThumbnail();
      toast.info("Uploading video...");
      await this.uploadVideo();
      console.log("reveanl is ", this.state.reveal);
      const textProps = {
        text: this.state.text,
        textColor: this.state.textColor,
        fontSize: this.state.fontSize,
        vAlign: this.state.vAlign,
        align: this.state.align,
        reveal: this.state.reveal,
        fontWeight: this.state.fontWeight,
        fontStyle: this.state.fontStyle,
        textDecoration: this.state.textDecoration,
      };
      const video = {
        title: this.state.title,
        url: this.state.urlRecord,
        userId: this.props.auth!.user!._id,
        thumbnail: this.state.thumbnailUrl,
        textProps: textProps,
        campaign: false,
        isChatvid: true,
      };
      let chatvid: any = {
        video,
        fitvideo: this.state.fitvideo,
        responseType: this.state.responseType,
        calendar: this.state.calendar,
        urlRecord: this.state.urlRecord,
        title: this.state.title,
        choices: this.state.choices,
      };
      if (this.state.isAddStep && this.state.chatvidId) {
        chatvid.chatvidId = this.state.chatvidId;
        chatvid.stepNo = this.state.stepNo
          ? this.state.stepNo
          : this.props.chatvids.selectedChatvid.steps.length + 1;

        toast.info(
          `Adding step to ${this.props.chatvids.selectedChatvid.name}`
        );
        return this.props.addStepToChatvid(chatvid, this.props.history);
      }
      // toast.info("Storing Chatvid ...");
      !this.state.isAddStep &&
        this.props.saveVideo(chatvid, this.props.history);
    } catch (error) {}
  };

  renderSteps = () => {
    switch (this.state.step) {
      case -1:
        return (
          <LandingQuestion
            {...this.props}
            toggleSendVariable={this.props.toggleSendVariable}
            moveToNextStep={this.handleNext}
            onChange={this.onChange}
          />
        );
      case 0:
        return (
          <RecorderTab
            {...this.props}
            {...this.state}
            toggleSendVariable={this.props.toggleSendVariable}
            proceedToNext={this.handleProceed}
            onChange={this.onChange}
          />
        );
      case 1:
        return (
          <OverLayTab
            {...this.props}
            {...this.state}
            moveToNextStep={this.handleNext}
            moveBack={this.handleBack}
            onChange={this.onChange}
            onStyle={this.onStyle}
          />
        );
      case 2:
        return (
          <ResponseTypeTab
            {...this.props}
            {...this.state}
            onChange={this.onChange}
            moveToFinal={this.moveTofinal}
            moveToNextStep={this.handleNext}
            moveToCalendar={this.moveToCalender}
            moveBack={this.handleBack}
          />
        );
      case 3:
        return (
          <MultiChoiceTab
            {...this.props}
            {...this.state}
            onChange={this.onChange}
            moveToNextStep={this.moveTofinal}
            moveBack={this.handleBack}
          />
        );
      case 4:
        return (
          <CalendarTab
            {...this.props}
            {...this.state}
            onChange={this.onChange}
            moveToNextStep={this.moveTofinal}
            moveBack={this.handleBack}
          />
        );
      case 5:
        return (
          <FinalTab
            {...this.props}
            {...this.state}
            onChange={this.onChange}
            moveToNextStep={this.createChatVid}
            moveBack={this.handleBack}
          />
        );
      default:
        return (
          <LandingQuestion
            {...this.props}
            toggleSendVariable={this.props.toggleSendVariable}
            moveToNextStep={this.handleNext}
          />
        );
    }
  };

  render() {
    console.log("reveanl is ", this.state.reveal);
    return (
      <>
        <Header
          styles={{
            backgroundImage:
              "linear-gradient(-90deg, rgb(97, 181, 179), rgb(97, 181, 179), rgb(252, 179, 23))",
          }}
        />
        {this.renderSteps()}
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
    videoUser: state.video,
    savedVideoId: state.video.savedVideoId,
    progressEmail: state.video.progressEmail,
    chatvids: state.chatvids,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    saveVideo: (chatvid: any, history: any) =>
      dispatch(saveChatvid(chatvid, history)),
    addStepToChatvid: (step: any, history: any) =>
      dispatch(addStepToChatvid(step, history)),
    toggleSendVariable: () => dispatch(toggleSendVariable()),
  };
};

connect(mapStateToProps, mapDispatchToProps)(RecorderTab);
export default withRouter<any, any>(
  connect(mapStateToProps, mapDispatchToProps)(ChatVid)
);
