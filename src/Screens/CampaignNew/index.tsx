import React from "react";
import VideoPreview from "./VideoPreview";
import Recording from "./Recording";
import Overview from "./Overview";
import SendSave from "./SendSave";
import AddLogoText from "./AddLogoText";
import SelectTemplate from "./SelectTemplate";
import Industry from "./Industry";
import Header from "../../components/Header/Header";

import "../../assets/fonts/Poppins-Regular.ttf";

class Campaign extends React.Component {
  state = {
    currentStep: 0,
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
      case 0:
        return (
          <Industry
            moveToNextStep={this.moveToNextStep}
          />
        );
      case 1:
        return (
          <SelectTemplate
            moveToNextStep={this.moveToNextStep}
            selectTemplate={this.selectTemplate}
            moveBack={this.moveBack}
          />
        );
      case 2:
        return (
          <Overview
            moveToNextStep={this.moveToNextStep}
            template={this.state.template}
            moveBack={this.moveBack}
          />
        )
      case 3:
        return (
          <Recording
            moveToNextStep={this.moveToNextStep}
            saveVideo={this.saveVideo}
            template={this.state.template}
            moveBack={this.moveBack}
            isCamp={true}
          />
        );
      case 4:
        return (
          <VideoPreview
            moveToNextStep={this.moveToNextStep}
            previewVideo={this.state.recordedVideo}
          />
        );
      case 5:
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
      case 6:
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
            template={this.state.template}
            saveVideo={this.saveVideo}
          />
        );
    }
  };

  moveToNextStep = () => {
    let nextStep = this.state.currentStep + 1;
    this.setState({ currentStep: nextStep });
  };

  moveBack = () => {
    this.setState({ currentStep: this.state.currentStep - 1 });
  };
  render() {
    return (
      <>
        <Header styles={{backgroundImage:"linear-gradient(-90deg, rgb(97, 181, 179), rgb(97, 181, 179), rgb(252, 179, 23))"}}/>
        <div className="containerCampaign">{this.renderCampaignSteps()}</div>
      </>
    );
  }
}

export default Campaign;
