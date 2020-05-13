import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import RecordIntro from "./RecordIntro";
import RecordMessage from "./RecordMessage";
import MergeRecording from "./MergeRecording";
import AddLogo from "./AddLogo";
import SendEmail from "./SendEmail";

class Campaign extends React.Component {
  state = {
    currentStep: 1,
    introRecord: "",
    messageRecord: "",
    finalVideo: "",
    mergedVideo: "",
    mergeError: false
  };

  saveIntro = (blob: any) => {
    this.setState({ introRecord: blob });
    toast.info("Intro recorded");
  };
  saveMessage = (blob: any) => {
    this.setState({ messageRecord: blob });
    toast.info("Message recorded");
  };
  saveFinalVideo = (finalBlob: any) => {
    this.setState({ finalVideo: finalBlob });
  };
  mergeVideos = () => {
    const formData = new FormData();
    formData.append("one", this.state.introRecord);
    formData.append("two", this.state.messageRecord);
    axios
      .post("http://localhost:3008/edit/merge", formData, {
        responseType: "blob"
      })
      .then(res => {
        this.setState({ mergedVideo: res.data });
      })
      .catch(err => {
        this.setState({ mergeError: true });
        toast.error("video merge failed ,Please try again");
      });
  };
  renderCampaignSteps = () => {
    switch (this.state.currentStep) {
      case 1:
        return (
          <RecordIntro
            moveToNextStep={this.moveToNextStep}
            moveToPreviousStep={this.moveToPreviousStep}
            saveIntro={this.saveIntro}
          />
        );
      case 2:
        return (
          <RecordMessage
            moveToNextStep={this.moveToNextStep}
            moveToPreviousStep={this.moveToPreviousStep}
            saveMessage={this.saveMessage}
          />
        );
      case 3:
        return (
          <MergeRecording
            mergeVideos={this.mergeVideos}
            video={this.state.mergedVideo}
            moveToNextStep={this.moveToNextStep}
            mergeError={this.state.mergeError}
            moveToPreviousStep={this.moveToPreviousStep}
          />
        );
      case 4:
        return (
          <AddLogo
            moveToNextStep={this.moveToNextStep}
            moveToPreviousStep={this.moveToPreviousStep}
            videoBlob={this.state.mergedVideo}
            saveFinalVideo={this.saveFinalVideo}
          />
        );
      case 5:
        return (
          <SendEmail
            moveToNextStep={this.moveToNextStep}
            moveToPreviousStep={this.moveToPreviousStep}
            previewVideo={this.state.finalVideo}
          />
        );
      default:
        return (
          <RecordIntro
            moveToNextStep={this.moveToNextStep}
            moveToPreviousStep={this.moveToPreviousStep}
            saveIntro={this.saveIntro}
          />
        );
    }
  };

  moveToNextStep = () => {
    let nextStep = this.state.currentStep + 1;
    if (nextStep === 2 && this.state.introRecord === "") {
      toast.error("Please record a Intro first");
    } else if (nextStep === 3 && this.state.messageRecord === "") {
      toast.error("Please record a Main Message");
    } else if (nextStep === 5 && this.state.finalVideo === "") {
      this.setState({
        finalVideo: this.state.mergedVideo,
        currentStep: nextStep
      });
      return;
    } else {
      this.setState({ currentStep: nextStep });
    }
  };
  moveToPreviousStep = () => {
    let prevStep = this.state.currentStep - 1;
    this.setState({ currentStep: prevStep });
  };
  render() {
    return (
      <div className="containerCampaign">{this.renderCampaignSteps()}</div>
    );
  }
}

export default Campaign;
