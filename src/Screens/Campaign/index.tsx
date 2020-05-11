import React from "react";
import { toast } from "react-toastify";
import RecordIntro from "./RecordIntro";
import RecordMessage from "./RecordMessage";
import AddLogo from "./AddLogo";
import SendEmail from "./SendEmail";

class Campaign extends React.Component {
  state = {
    currentStep: 1,
    introRecord: "",
    messageRecord: "",
    finalVideo: ""
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
          <AddLogo
            moveToNextStep={this.moveToNextStep}
            moveToPreviousStep={this.moveToPreviousStep}
            videoBlob={this.state.introRecord}
            saveFinalVideo={this.saveFinalVideo}
          />
        );
      case 4:
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
    } else if (nextStep === 4 && this.state.finalVideo === "") {
      this.setState({
        finalVideo: this.state.introRecord,
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
