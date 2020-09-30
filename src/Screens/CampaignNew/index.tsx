import React from "react";
import VideoPreview from "./VideoPreview";
import Recording from "./Recording";
import SendSave from "./SendSave";
import AddLogoText from "./AddLogoText";
import SelectTemplate from "./SelectTemplate";

class Campaign extends React.Component {
  state = {
    currentStep: 1,
    recordedVideo: "",
    editedVideo: "",
    finalVideo: "",
    logoProps: {},
    textProps: {},
    musicProps: {},
    logoBlob: "",
    thumbnailBlob: "",
    template: null
  };

  saveVideo = (finalBlob: any) => {
    this.setState({ recordedVideo: finalBlob });
  };
  saveEditedVideo = (editedVideoBlob: any) => {
    this.setState({ editedVideo: editedVideoBlob });
  };
  saveTextLogoProps = (logoProps: any, textProps: any, musicProps: any) => {
    this.setState({
      logoProps: logoProps,
      textProps: textProps,
      musicProps: musicProps
    });
  };
  saveLogoBlob = (blob: any) => {
    this.setState({ logoBlob: blob });
  };
  saveThumbnailBlob = (blob: any) => {
    this.setState({ thumbnailBlob: blob });
  };
  selectTemplate = (template: any) => {
    this.setState({ template: template });
  };
  renderCampaignSteps = () => {
    switch (this.state.currentStep) {
      case 1:
        return (
          <SelectTemplate
            moveToNextStep={this.moveToNextStep}
            selectTemplate={this.selectTemplate}
          />
        );
      case 2:
        return (
          <Recording
            moveToNextStep={this.moveToNextStep}
            saveVideo={this.saveVideo}
            template={this.state.template}
          />
        );
      case 3:
        return (
          <VideoPreview
            moveToNextStep={this.moveToNextStep}
            previewVideo={this.state.recordedVideo}
          />
        );
      case 4:
        return (
          <AddLogoText
            moveToNextStep={this.moveToNextStep}
            saveEditedVideo={this.saveEditedVideo}
            videoToEdit={this.state.recordedVideo}
            saveTextLogoProps={this.saveTextLogoProps}
            saveLogoBlob={this.saveLogoBlob}
            saveThumbnailBlob={this.saveThumbnailBlob}
          />
        );
      case 5:
        return (
          <SendSave
            logoProps={this.state.logoProps}
            thumbnailBlob={this.state.thumbnailBlob}
            textProps={this.state.textProps}
            logoBlob={this.state.logoBlob}
            musicProps={this.state.musicProps}
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
