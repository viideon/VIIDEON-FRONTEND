import React from "react";
import { Grid, LinearProgress, TextField } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Loading from "../../components/Loading";
import ThemeButton from "../../components/ThemeButton";
import EmailInstruction from "../../components/Reusable/EmailInstruction";
import Label from "../../components/Reusable/Label";
import Colors from "../../constants/colors";
import CanvasPlayer from "../../components/CanvasPlayer/EditingCanvas";
import ChipInput from "material-ui-chip-input";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import {v4 as uuid} from 'uuid';

import { sendVideoToEmail, saveVideo, sendMultipleEmails, toggleSendVariable } from "../../Redux/Actions/videos";
import { VideoState, EmailVideo, VideoSave, MultiEmail } from "../../Redux/Types/videos";
import { AuthState } from "../../Redux/Types/auth";
import * as Constants from "../../constants/constants";
import { reg } from "../../constants/emailRegEx";
import * as api from '../../util/api';

import "./style.css";
import {Storage} from "aws-amplify";

const { availableTheme } = require("../../constants/constants");

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <div className="emailTmplateDialogWrapper">
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">Select E-mail theme</DialogTitle>
        <List component="div">
          {availableTheme.map((theme: any) => (
            <ListItem
              button
              onClick={() => handleListItemClick(theme.name)}
              key={theme.name}
            >
              <img className="avatarImage" src={theme.avatar} alt="avatar" />
              <ListItemText primary={theme.name} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </div>
  );
}

interface IProps {
  history: any;
  auth: AuthState;
  videoUser: VideoState;
  previewVideo: any;
  sendVideoToEmail: (video: EmailVideo) => void;
  saveVideo: (video: VideoSave) => void;
  sendMultipleEmail: (emailVideoObj: any) => void;
  savedVideoId: string;
  progressEmail: boolean;
  logoProps: any;
  textProps: any;
  musicProps: any;
  toggleSendVariable: () => void;
  logoBlob: any;
  thumbnailBlob: any;
  open: boolean;
  themeName: string;
  emailType: string;
}

class SendSave extends React.Component<IProps> {
  state = {
    title: "",
    urlRecord: "",
    emails: [],
    recieverEmail: "",
    videoProgress: false,
    progressVideo: 0,
    thumbnail: "",
    url: "",
    width: 0,
    height: 0,
    logoUrl: "",
    thumbnailUrl: "",
    videoHeight: "300px",
    open: false,
    themeName: "",
    emailType: "single"
  };
  canvas: any;
  container: any;
  s3: any;

  componentDidMount() {
    this.props.toggleSendVariable();
    this.caluclateContainerHeight();
    window.addEventListener("resize", this.caluclateContainerHeight);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.caluclateContainerHeight);
  }

  caluclateContainerHeight = () => {
    let calculatedVideoHeight = document.getElementById("wrapperSend")
      ?.clientWidth
      ? `${document.getElementById("wrapperSend")!.clientWidth * 0.5625}px`
      : "300px";
    this.setState({ videoHeight: calculatedVideoHeight });
  };

  saveVideo = async () => {
    if (this.state.title === "") {
      toast.warn("Enter a title to save video");
      return;
    }
    try {
      const filename = uuid();
      await this.uploadVideo(`${filename}-thumbnail`);
      const thumbnailResponse = await api.generateThumbnail(this.state.urlRecord, {});
      const video = {
        title: this.state.title,
        url: this.state.urlRecord,
        userId: this.props.auth!.user!._id,
        thumbnail: thumbnailResponse.thumbnail,
        textProps: this.props.textProps,
        logoProps: this.props.logoProps,
        musicProps: this.props.musicProps,
        campaign: true
      };
      this.props.saveVideo(video);
    } catch (error) {
      toast.error("Failed to save campaign, Please try again");
    }
  };

  uploadVideo = (filename: string) => {
    return new Promise((resolve, reject) => {
      this.setState({ videoProgress: true, progressVideo: 0 });
      Storage.put(filename, this.props.previewVideo, {
        level: "protected",
        progressCallback: (progressEvent: { loaded: number; total: number; }) => {
          let uploaded: number = (progressEvent.loaded * 100) / progressEvent.total;
          this.setState({ progressFile: uploaded });
        }
      }).then((response: any) => {
        this.setState({
          videoProgress: false,
          urlRecord: response.key,
        });
        resolve();
      }).catch((error: any) => {
        reject(error);
      });
      // api.uploadFile(
      //     filename,
      //     this.props.previewVideo,
      //     {
      //       onUploadProgress: (progressEvent: { loaded: number; total: number; }) => {
      //         let uploaded: number = (progressEvent.loaded * 100) / progressEvent.total;
      //         this.setState({ progressFile: uploaded });
      //       }
      //     }
      // ).then((response: { filename: any; }) => {
      //   this.setState({
      //     videoProgress: false,
      //     thumbnailUrl: response.filename,
      //   });
      //   resolve();
      // }).catch((error: any) => {
      //   reject(error);
      // });
    });
  };

  // uploadThumbnail = (filename: string) => {
  //   return new Promise((resolve, reject) => {
  //     this.setState({ videoProgress: true, progressVideo: 0 });
  //     Storage.put(filename, this.props.thumbnailBlob, {
  //       level: "protected",
  //       progressCallback: (progressEvent: { loaded: number; total: number; }) => {
  //         let uploaded: number = (progressEvent.loaded * 100) / progressEvent.total;
  //         this.setState({ progressFile: uploaded });
  //       }
  //     }).then((response: any) => {
  //       this.setState({
  //         videoProgress: false,
  //         thumbnailUrl: response.key,
  //       });
  //       resolve();
  //     }).catch((error: any) => {
  //       reject(error);
  //     });
  //     // api.uploadFile(
  //     //   filename,
  //     //   this.props.thumbnailBlob,
  //     //   {
  //     //     onUploadProgress: (progressEvent: { loaded: number; total: number; }) => {
  //     //       let uploaded: number = (progressEvent.loaded * 100) / progressEvent.total;
  //     //       this.setState({ progressFile: uploaded });
  //     //     }
  //     //   }
  //     // ).then((response: { filename: any; }) => {
  //     //   this.setState({
  //     //     videoProgress: false,
  //     //     thumbnailUrl: response.filename,
  //     //   });
  //     //   resolve();
  //     // }).catch((error: any) => {
  //     //   reject(error);
  //     // });
  //   });
  // };

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

  submitEmail = (themeName: string) => {
    if (this.props.savedVideoId === "") {
      return toast.warn("Please save a video");
    } else if (this.state.recieverEmail === "") {
      return toast.warn("Add an Email");
    } else if (!reg.test(this.state.recieverEmail)) {
      return toast.warn("Invalid Email");
    } else {
      const recieverEmail = this.state.recieverEmail;
      const video = {
        videoId: this.props.savedVideoId,
        recieverEmail,
        themeName
      };
      this.props.sendVideoToEmail(video);
      this.setState({ recieverEmail: "" });
    }
  };

  sendMultipleEmail = (themeName: string) => {
    if (this.state.emails.length === 0) {
      toast.error("No email provided");
      return;
    } else if (!this.props.savedVideoId) {
      toast.error("No video saved try again");
      return;
    } else {
      const emails = this.state.emails.join();
      const emailVideoObj = {
        recieverEmail: emails,
        videoId: this.props.savedVideoId,
        themeName
      };
      this.props.sendMultipleEmail(emailVideoObj);
      this.setState({ emails: [] });
    }
  };

  handleChipAdd = (email: any) => {
    if (!reg.test(email)) {
      toast.error("Not a valid email");
      return;
    }
    this.setState({ emails: [...this.state.emails, email] });
  };

  handleDeleteChip = (delEmail: any) => {
    this.setState({
      emails: this.state.emails.filter((email: string) => email !== delEmail)
    });
  };

  navigateToVideos = () => {
    this.props.history.push("/campaign");
  };

  handleClose = (themeName: string) => {
    const { emailType } = this.state;
    this.setState({ themeName, open: false });
    emailType === "single"
      ? this.submitEmail(themeName)
      : this.sendMultipleEmail(themeName);
  };

  handleModal = (emailType: string) => {
    this.setState({ open: true, emailType });
  };

  render() {
    let { videoSaved, loading } = this.props.videoUser;
    let { progressEmail } = this.props;
    const { open, themeName } = this.state;

    return (
      <Grid container>
        <Grid item xs={1} sm={1} md={3} lg={3}></Grid>
        <Grid item xs={10} sm={10} md={6} lg={6} id="wrapperSend">
          <h3 className="recordHeading">Save and Email Campaign</h3>
          <div
            ref="container"
            style={{
              width: "100%",
              height: this.state.videoHeight
            }}
          >
            {this.props.previewVideo && this.props.thumbnailBlob && (
              <CanvasPlayer
                autoPlay={false}
                muted={false}
                loop={false}
                src={URL.createObjectURL(this.props.previewVideo)}
                textProps={this.props.textProps}
                logoProps={this.props.logoProps}
                musicProps={this.props.musicProps}
                local={true}
                thumbnail={URL.createObjectURL(this.props.thumbnailBlob)}
              />
            )}
          </div>
          <div style={{ marginLeft: "50%", marginTop: "15px" }}>
            {loading && <Loading />}
            {progressEmail && <Loading />}
          </div>
          <div id="formInput" style={{ marginTop: "30px" }}>
            {videoSaved !== true && (
              <>
                {this.state.videoProgress && (
                  <LinearProgress
                    variant="determinate"
                    value={this.state.progressVideo}
                  />
                )}
                <div className="formGroups">
                  <Label text="Campaign Title" />
                  <TextField
                    name="name"
                    value={this.state.title}
                    onChange={this.titleNameHandler}
                    placeholder="Give your campaign an amazing title"
                    type="text"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </div>
                <ThemeButton
                  disabled={this.state.videoProgress || loading}
                  onClick={this.saveVideo}
                  name="Save Campaign"
                  style={{
                    backgroundColor: Colors.themeBlue,
                    color: Colors.white
                  }}
                />
              </>
            )}
            {videoSaved === true && (
              <>
                <div className="formGroups">
                  <EmailInstruction heading={Constants.SENDER_ADDRESS} />
                  <TextField
                    placeholder="Enter email address"
                    fullWidth
                    type="text"
                    value={this.state.recieverEmail}
                    name="recieverEmail"
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={this.emailHandler}
                  />
                </div>
                <ThemeButton
                  name="Send Through Email"
                  onClick={() => this.handleModal("single")}
                  style={{
                    backgroundColor: Colors.themeGreen,
                    color: Colors.white
                  }}
                />
                <div className="formGroups">
                  <EmailInstruction heading="Broadcast" />
                  <ChipInput
                    value={this.state.emails}
                    placeholder="Enter email and press enter"
                    fullWidth
                    onAdd={chips => this.handleChipAdd(chips)}
                    onDelete={chip => this.handleDeleteChip(chip)}
                  />
                </div>
                <ThemeButton
                  name="Broadcast"
                  onClick={() => this.handleModal("multiple")}
                  style={{
                    backgroundColor: Colors.themeGreen,
                    color: Colors.white
                  }}
                />
                <div style={{ textAlign: "end" }}>
                  <ThemeButton
                    name="Done"
                    onClick={this.navigateToVideos}
                    style={{
                      backgroundColor: Colors.themeBlue,
                      color: Colors.white,
                      width: "120px"
                    }}
                  />
                </div>
              </>
            )}
          </div>
          <canvas
            ref="canvas"
            style={{ position: "absolute", left: "-2000px", display: "none" }}
          />
        </Grid>
        <Grid item xs={1} sm={1} md={3} lg={3}></Grid>
        <SimpleDialog
          selectedValue={themeName}
          open={open}
          onClose={this.handleClose}
        />
      </Grid>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
    videoUser: state.video,
    savedVideoId: state.video.savedVideoId,
    progressEmail: state.video.progressEmail
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendVideoToEmail: (video: EmailVideo) => dispatch(sendVideoToEmail(video)),
    saveVideo: (video: VideoSave) => dispatch(saveVideo(video)),
    toggleSendVariable: () => dispatch(toggleSendVariable()),
    sendMultipleEmail: (emailVideoObj: MultiEmail) =>
      dispatch(sendMultipleEmails(emailVideoObj))
  };
};
export default withRouter<any, any>(
  connect(mapStateToProps, mapDispatchToProps)(SendSave)
);
