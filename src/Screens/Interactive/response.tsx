import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { config } from "../../config/aws";
import canvasTxt from "canvas-txt";
import AWS from "aws-sdk";
import Loading from "../../components/Loading";


import {
  saveVideo,
  toggleSendVariable,
} from "../../Redux/Actions/videos";

import {VideoState,VideoSave,} from "../../Redux/Types/videos";
import { getChatvid } from "../../Redux/Actions/chatvid";
import { AuthState } from "../../Redux/Types/auth";
import "react-tabs/style/react-tabs.css";



import AnswerTypeTab from './resSteps/answerType'

import RecorderTab from './steps/recorder';
import OverLayTab from './steps/overlay';
import ResponseTypeTab from './steps/responseType';
import MultiChoiceTab from './steps/choices';
import CalendarTab from './steps/calendar';
import FinalTab from './steps/final';

import "./style.css";
const s3 = new AWS.S3(config);
const gifshot = require("gifshot");
type IProps = {
  auth: AuthState;
  history: any;
  videoUser: VideoState;
  toggleSendVariable: () => void;
  getChatvid: (chatvidId: string) => void;
};

class ChatVid extends Component<IProps> {
  state = {
    loading: true,
    step: 0,
    video: 0,
    chatvid: {},
    thumbnailBlob: 0,
    videoProgress: false,
  }

  componentDidMount() {
    let chatvidId = this.props.history.location.pathname.split("/")[3];
    if(!chatvidId) {
      toast.error("inValidURL")
      this.props.history.push("/")
      return ;
    }
    this.props.getChatvid(chatvidId);
  }

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    if(nextProps.resChatvid._id && this.state.loading) {
      console.log("success")
      this.setState({ loading: false, chatvid: nextProps.resChatvid })
    }
  }

  uploadThumbnail = () => {
    return new Promise((resolve, reject) => {
      this.setState({ videoProgress: true, progressVideo: 0 });
      const options = {
        Bucket: config.bucketName,
        ACL: config.ACL,
        Key: Date.now().toString() + "thumbnail.jpeg",
        Body: this.state.thumbnailBlob
      }
      s3.upload(options, (err: any, data: any) => {
        if (err) {
          this.setState({ videoProgress: false });
          reject();
        } else {
          this.setState({
            videoProgress: false,
            thumbnailUrl: data.Location
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
        Body: this.state.video
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
    this.setState({step: this.state.step+1});
  }

  handleBack = (final = false) => {
    this.setState({step: final === true ? 2 : this.state.step-1});
  }

  handleProceed = (thumbnailBlob: any, video: any) => {
    this.setState({thumbnailBlob,video, step: this.state.step + 1});
  }

  moveToCalender = () => {
    this.setState({step: 4});
  }
  
  moveTofinal = () => {
    this.setState({step: 5});
  }

  createChatVid = () => {

  }

  renderSteps = () => {
    switch (this.state.step) {
      case 0:
        return (
          <AnswerTypeTab {...this.props} toggleSendVariable={this.props.toggleSendVariable} proceedToNext={this.handleProceed} />
        )
      case 1:
        return (
          <OverLayTab {...this.props} {...this.state} moveToNextStep={this.handleNext} moveBack={this.handleBack} />
        )
      case 2:
        return (
          <ResponseTypeTab {...this.props} {...this.state} moveToFinal={this.moveTofinal} moveToNextStep={this.handleNext} moveToCalendar={this.moveToCalender} moveBack={this.handleBack}  />
        )
      case 3:
        return (
          <MultiChoiceTab {...this.props} {...this.state} moveToNextStep={this.moveTofinal} moveBack={this.handleBack} />
        )
      case 4:
        return (
          <CalendarTab {...this.props} {...this.state} moveToNextStep={this.moveTofinal} moveBack={this.handleBack} />
        )
      case 5:
        return (
          <FinalTab {...this.props} {...this.state} moveToNextStep={this.createChatVid} moveBack={this.handleBack} />
        )
      default:
        return (
          <RecorderTab proceedToNext={this.handleProceed} />
        )
    }
  }
  
  render() {
    return (
      <>
        {!this.state.loading && this.renderSteps()}
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
    resChatvid: state.chatvids.resChatvid,
    videoUser: state.video,
    savedVideoId: state.video.savedVideoId,
    progressEmail: state.video.progressEmail
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getChatvid: (chatvidId: string) => dispatch(getChatvid(chatvidId)),
    toggleSendVariable: () => dispatch(toggleSendVariable()),
  }
};

connect(mapStateToProps, mapDispatchToProps)(RecorderTab);
export default connect(mapStateToProps, mapDispatchToProps)(ChatVid);
