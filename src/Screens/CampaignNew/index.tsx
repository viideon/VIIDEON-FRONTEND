import React from "react";
// import { toast } from "react-toastify";
import Recording from "./Recording";
import SendSave from "./SendSave";
import AddLogoText from "./AddLogoText";

class Campaign extends React.Component {
  state = {
    currentStep: 1,
    recordedVideo: "",
    editedVideo: "",
    finalVideo: ""
  };

  saveVideo = (finalBlob: any) => {
    this.setState({ recordedVideo: finalBlob });
  };
  saveEditedVideo = (editedVideoBlob: any) => {
    this.setState({ editedVideo: editedVideoBlob });
  };

  renderCampaignSteps = () => {
    switch (this.state.currentStep) {
      case 1:
        return (
          <Recording
            moveToNextStep={this.moveToNextStep}
            saveVideo={this.saveVideo}
          />
        );
      case 2:
        return (
          <AddLogoText
            moveToNextStep={this.moveToNextStep}
            saveEditedVideo={this.saveEditedVideo}
            videoToEdit={this.state.recordedVideo}
          />
        );
      case 3:
        return (
          <SendSave
            previewVideo={
              this.state.editedVideo
                ? this.state.editedVideo
                : this.state.recordedVideo
            }
          />
        );
      default:
        return (
          <Recording
            moveToNextStep={this.moveToNextStep}
            saveVideo={this.saveVideo}
          />
        );
    }
  };

  moveToNextStep = () => {
    let nextStep = this.state.currentStep + 1;
    this.setState({ currentStep: nextStep });
  };

  render() {
    return (
      <div className="containerCampaign">{this.renderCampaignSteps()}</div>
    );
  }
}

export default Campaign;
