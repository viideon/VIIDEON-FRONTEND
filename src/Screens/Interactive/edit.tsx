import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { config } from "../../config/aws";
import AWS from "aws-sdk";

import { saveChatvid, addStepToChatvid } from "../../Redux/Actions/chatvid";
import { toggleSendVariable } from '../../Redux/Actions/videos';
import { VideoState } from "../../Redux/Types/videos";
import { AuthState } from "../../Redux/Types/auth";
import "react-tabs/style/react-tabs.css";

import Header from "../../components/Header/Header";
import { Grid, Typography } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import "./style.css";
var month= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
const s3 = new AWS.S3(config);
type IProps = {
 auth: AuthState;
 history: any;
 videoUser: VideoState;
 chatvids: any;
 chatvid: any;
 toggleSendVariable: () => void;
 saveVideo: (video: any) => void;
 addStepToChatvid: (step: any) => void;
};

class ChatVid extends Component<IProps> {
 state = {
  step: -1,
  video: 0,
  thumbnailBlob: 0,
  thumbnailUrl: "",
  videoProgress: false,
  text: "",
  textColor: "#fff",
  fontSize: 5,
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
 }

 componentDidMount() {
  let pathname = this.props.history.location.pathname.split('/');
  if (pathname[1] === "chatvid" && pathname[2] === "step") {
   this.setState({ isAddStep: true, chatvidId: pathname[3], title: this.props.chatvids.selectedChatvid.name })
  }
 }

 render() {
  const { name, createdAt, _id, steps } = this.props.chatvid;
  var date: any = new Date(createdAt);
  date = `${month[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`;
  return (
   <>
    <Header
     styles={{
      backgroundImage:
       "linear-gradient(-90deg, rgb(97, 181, 179), rgb(97, 181, 179), rgb(252, 179, 23))"
     }}
    />
    <Grid container className="EditChatvidMainContainer">
     <div className="finalTabHeader">
      <CancelIcon className="finalCancel cursorPointer" onClick={() => this.props.history.push(`/chatvids/form/${_id}`)} />
      <Typography variant="subtitle1" >{`${name} - ${date}`} </Typography>
     </div>
     <div className="ChatvidBodyContainer">
      {
       steps.map((step:any, ind: number) => {
        return (
         <div className="thumbnaiForStepper">
          <img src={step?.videoId?.thumbnail} alt="thumbnail" className="thumbnail"/>
         </div>
        )
       })
      }
     </div>
    </Grid>
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
  chatvid: state.chatvids.selectedChatvid,
 };
};
const mapDispatchToProps = (dispatch: any) => {
 return {
  saveVideo: (chatvid: any) => dispatch(saveChatvid(chatvid)),
  addStepToChatvid: (step: any) => dispatch(addStepToChatvid(step)),
  toggleSendVariable: () => dispatch(toggleSendVariable()),
 }
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatVid);
