import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  toggleSendVariable,
} from "../../Redux/Actions/videos";

import { getChatvid,replyToAChatvid } from "../../Redux/Actions/chatvid";
import { AuthState } from "../../Redux/Types/auth";
import "react-tabs/style/react-tabs.css";



import AnswerTypeTab from './resSteps/answerType'

import RecorderTab from './steps/recorder';

import "./style.css";
type IProps = {
  auth: AuthState;
  history: any;
  toggleSendVariable: () => void;
  getChatvid: (chatvidId: string) => void;
  replyToAChatvid: (reply: any) => void;
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
    if(nextProps.resChatvid && nextProps.resChatvid._id && this.state.loading) {
      this.setState({ loading: false, chatvid: nextProps.resChatvid })
    }
  }

  handleNext = () => {
    this.setState({step: this.state.step+1});
  }

  sendReply = (reply: any) => {
    this.props.replyToAChatvid(reply);
  }

  renderSteps = () => {
    switch (this.state.step) {
      case 0:
        return (
          <AnswerTypeTab {...this.props} toggleSendVariable={this.props.toggleSendVariable} send={this.sendReply} />
        )
      default:
        return (
          <AnswerTypeTab {...this.props} toggleSendVariable={this.props.toggleSendVariable} />
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

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
    resChatvid: state.chatvids.resChatvid,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getChatvid: (chatvidId: string) => dispatch(getChatvid(chatvidId)),
    replyToAChatvid: (reply: any) => dispatch(replyToAChatvid(reply)),
    toggleSendVariable: () => dispatch(toggleSendVariable()),
  }
};

connect(mapStateToProps, mapDispatchToProps)(RecorderTab);
export default connect(mapStateToProps, mapDispatchToProps)(ChatVid);
