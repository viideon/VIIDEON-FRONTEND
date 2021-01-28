import React, { useState } from "react";
import { toast, Flip } from "react-toastify";
import VideoInfo from "../../components/VideoInfo";
import { connect } from "react-redux";
import { CircularProgress, Grid, TextField } from "@material-ui/core";
import Colors from "../../constants/colors";
import ThemeButton from "../../components/ThemeButton";
import CanvasPlayer from "../../components/CanvasPlayer/EditingCanvas";
import VideoEditor from "./Editor";
import EmailInstruction from "../../components/Reusable/EmailInstruction";
import { withRouter } from "react-router-dom";

import ChipInput from "material-ui-chip-input";

import Sleek from "../Templates/Sleek";
import Spread from "../Templates/Spread";
import Templates from "../Templates/TemplateIs";

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import MailIcon from "@material-ui/icons/Mail";
import DirectionsIcon from "@material-ui/icons/Directions";

import {
  updateVideo,
  sendVideoToEmail,
  sendMultipleEmails,
} from "../../Redux/Actions/videos";
import { reg } from "../../constants/emailRegEx";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

const { availableTheme } = require("../../constants/constants");

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}
export interface SimpleDialogProps2 {
  open: boolean;
  themeName: string;
  selectedTheme: any;
  video: any;
  onClose: (value: string) => void;
}
export interface shareDialogProps {
  open: boolean;
  themeName: string;
  receiverEmail: string;
  onClose: (value: string) => void;
  emailHandler: (event: any) => void;
  submitEmail: () => void;
  sendMultipleEmail: () => void;
  emails: any;
  handleChipAdd: (email: any) => void;
  handleDeleteChip: (email: any) => void;
}
export interface SelectedTemplteProps {
  video: any;
  selectedTheme: any;
}
function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    // console.log("tem value2", selectedValue);
    onClose(selectedValue);
  };
  const handleListItemClick = (value: any) => {
    // console.log("tem value", value?.name);
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
          {availableTheme.map(
            (theme: any) =>
              theme.name == "Spread" && (
                <ListItem
                  button
                  onClick={() => handleListItemClick(theme)}
                  key={theme.name}
                >
                  <img
                    className="avatarImage"
                    src={theme.avatar}
                    alt="avatar"
                  />
                  <ListItemText primary={theme.name} />
                </ListItem>
              )
          )}
        </List>
      </Dialog>
    </div>
  );
}
function SelectedTemplte(props: SelectedTemplteProps) {
  const { video, selectedTheme } = props;
  console.log(selectedTheme.name);

  switch (selectedTheme.name) {
    case "Sleek":
      return <Sleek video={video} />;
    case "Spread":
      return <Templates tempName={selectedTheme.name} video={video} />;
    default:
      return (
        <img
          className="avatarImage templatePreview"
          src={selectedTheme.avatar}
          alt="avatar"
        />
      );
  }
}

function SimpleDialog2(props: SimpleDialogProps2) {
  // console.log("props2", props);
  const { onClose, themeName, selectedTheme, open, video } = props;

  const handleClose = () => {
    onClose(themeName);
  };
  const handleListItemClick = (value: any) => {
    onClose(value);
  };
  return (
    <div className="emailTmplateDialogWrapper">
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        {/* <DialogTitle id="simple-dialog-title">Preview of Template</DialogTitle>
        
          <ListItemText
            style={{ textAlign: "center" }}
            primary={selectedTheme.name}
          /> */}
        <SelectedTemplte video={video} selectedTheme={selectedTheme} />

        {/* <iframe
            src="/template/sleek.html"
            style={{ width: "100%", height: "77vh" }}
            title="Sleak"
          ></iframe> */}
      </Dialog>
    </div>
  );
}
function ShareDialog(props: shareDialogProps) {
  const {
    onClose,
    open,
    themeName,
    receiverEmail,
    emailHandler,
    submitEmail,
    handleChipAdd,
    handleDeleteChip,
    sendMultipleEmail,
    emails,
  } = props;

  const handleClose = () => {
    onClose(themeName);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <div style={{ padding: "6%" }}>
        <EmailInstruction heading="Receiver Email" />
        <TextField
          placeholder="Enter email address"
          fullWidth
          type="text"
          value={receiverEmail}
          name="receiverEmail"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={emailHandler}
        />
        <ThemeButton
          style={{
            background: Colors.themeGreen,
            color: Colors.white,
            marginTop: "15px",
          }}
          onClick={submitEmail}
          name={"SEND_THROUGH_EMAIL"}
        />
        <div className="formGroupMultiple" style={{ padding: "2%" }}>
          <EmailInstruction heading="Broadcast" />
          <ChipInput
            value={emails}
            placeholder="Enter email and press enter"
            fullWidth
            onAdd={(chips) => handleChipAdd(chips)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
          <ThemeButton
            style={{
              background: Colors.themeGreen,
              color: Colors.white,
              marginTop: "15px",
            }}
            onClick={sendMultipleEmail}
            name="Broadcast"
          />
        </div>
      </div>
    </Dialog>
  );
}

interface Video {
  url: string;
  thumbnail?: string;
  title?: string;
  campaign?: boolean;
  logoProps?: any;
  textProps?: any;
  musicProps: any;
  _id: string;
  views?: number;
  watch?: number;
  emailShareCount?: number;
  recordingEdit?: boolean;
}
interface IProps {
  video?: Video;
  updateVideo: (video: any) => void;
  sendVideoToEmail: (email: any) => void;
  sendMultipleEmail: (emails: any) => void;

  match: any;
}

class VideoTabHeader extends React.Component<IProps> {
  container: any;
  state = {
    height: "150px",
    editLogo: false,
    editMusic: false,
    editText: false,
    editTitle: false,
    title: "",
    themeName: "",
    selectedTheme: "",
    open: false,
    forPreviewOpen: false,
    forShare: false,
    template: "",
    receiverEmail: "",
    emails: [],
  };
  componentDidMount() {
    this.caluclateContainerHeight();
    window.addEventListener("resize", this.caluclateContainerHeight);
  }
  caluclateContainerHeight = () => {
    let calculatedVideoHeight = document.getElementById("wrapperHeader")
      ?.clientWidth
      ? `${document.getElementById("wrapperHeader")!.clientWidth * 0.5625}px`
      : "150px";
    this.setState({ height: calculatedVideoHeight });
  };
  copyUrl = () => {
    const { video } = this.props;
    const newClip = `${process.env.REACT_APP_DOMAIN}/watch/${video &&
      video._id}`;
    console.log("newClip", newClip);
    // navigator.permissions
    //   .query({ name: "clipboard-write" as PermissionName })
    //   .then((result) => {
    //     if (result.state === "granted" || result.state === "prompt") {
    //       navigator.clipboard.writeText(newClip);
    //     }
    //   });

    navigator.clipboard.writeText(newClip);
    toast("Url copied to clipboard", {
      autoClose: 1000,
      transition: Flip,
      hideProgressBar: true,
    });
  };
  componentWillUnmount() {
    window.removeEventListener("resize", this.caluclateContainerHeight);
  }

  handleEditTitle = () => {
    this.setState({ editTitle: true });
  };

  saveVideo = () => {
    const { video } = this.props;
    const { title } = this.state;
    let newVideo: any = video;
    newVideo.id = video?._id;
    newVideo.title = title;
    this.props.updateVideo(newVideo);
    this.setState({ editTitle: false });
  };

  handleInputChange = (input: any) => {
    this.setState({ title: input.value });
  };

  handleTemplate = () => {
    this.setState({ open: true });
  };
  handleTemplatePreview = () => {
    this.state.selectedTheme && this.setState({ forPreviewOpen: true });
  };
  handleShareandSend = () => {
    this.setState({ forShare: true });
  };

  handleCloseTemplate = (theme: any) => {
    this.setState({ selectedTheme: theme });
    console.log("tem in on close", theme);
    console.log("video for thm ", this.props.video);
    if (!theme.name) return this.setState({ open: false });
    const { video } = this.props;
    let newVideo: any = video;
    newVideo.id = video?._id;
    newVideo.eMailTemplate = theme.name;
    this.props.updateVideo(newVideo);
    this.setState({ open: false });
  };
  handleCloseTemplate2 = () => {
    this.setState({ forPreviewOpen: false });
  };
  handleCloseShare = () => {
    this.setState({ forShare: false });
  };
  emailHandler = (event: any) => {
    this.setState({
      receiverEmail: event.target.value,
    });
  };
  handleChipAdd = (email: any) => {
    if (reg.test(email) === false) {
      toast.error("Not a valid email");
      return;
    }
    this.setState({ emails: [...this.state.emails, email] });
  };
  handleDeleteChip = (delEmail: any) => {
    this.setState({
      emails: this.state.emails.filter((email: string) => email !== delEmail),
    });
  };
  submitEmail = () => {
    const { id } = this.props.match.params;
    if (id === "") {
      return toast.warn("No video to share");
    } else if (this.state.receiverEmail === "") {
      return toast.warn("Add an Email");
    } else if (reg.test(this.state.receiverEmail) === false) {
      return toast.warn("Invalid Email");
    } else {
      const recieverEmail = this.state.receiverEmail;
      const video = {
        videoId: id,
        recieverEmail,
      };
      console.log("receiver Email", video);
      this.props.sendVideoToEmail(video);

      this.setState({ forShare: false });
    }
  };
  sendMultipleEmail = () => {
    console.log(this.state.emails);

    const { id } = this.props.match.params;
    if (this.state.emails.length === 0) {
      toast.error("No email provided");
      return;
    } else if (!id) {
      toast.error("No video saved try again");
      return;
    } else if (this.state.emails.length === 1) {
      toast.error("Please add atleast two emails");
      return;
    } else {
      // console.log("email in state", this.state.emails);
      const emails = this.state.emails.join();
      // console.log("emails after join", emails);
      const emailVideoObj = {
        recieverEmail: emails,
        videoId: id,
      };
      console.log("emailObject", emailVideoObj);
      this.props.sendMultipleEmail(emailVideoObj);
      this.setState({ emails: [] });
    }
  };

  render() {
    const { video } = this.props;
    // console.log("video is ", video);
    const {
      editTitle,
      themeName,
      open,
      forPreviewOpen,
      forShare,
      receiverEmail,
      emails,
    } = this.state;
    return (
      <div className="headerTab">
        <Grid item xs={12} sm={12} md={12} id="wrapperHeader">
          {!video && (
            <div className="justifyCenter">
              <CircularProgress color="primary" />
            </div>
          )}
          <div
            ref={(ref) => {
              this.container = ref;
            }}
            style={{ width: "100%", height: this.state.height }}
          >
            {video && (
              <CanvasPlayer
                muted={false}
                autoPlay={true}
                loop={true}
                src={video.url}
                logoProps={video.logoProps}
                textProps={video.textProps}
                thumbnail={video.thumbnail}
                musicProps={video.musicProps}
              />
            )}
          </div>
        </Grid>
        {editTitle ? (
          <>
            <div>
              <input
                className="editVideoTitle"
                defaultValue={video && video.title}
                onChange={(e: any) => this.handleInputChange(e.currentTarget)}
              />
              <DoneIcon
                onClick={this.saveVideo}
                style={{ cursor: "pointer" }}
              />
            </div>
          </>
        ) : (
          <h3 className="videoTitle">
            {video && video.title}
            <EditIcon
              onClick={this.handleEditTitle}
              style={{ cursor: "pointer" }}
            />
          </h3>
        )}
        <VideoInfo video={video} />
        <Grid container xs={12} sm={12} md={12} id="editingToolsWrapper">
          <Grid item xs={12} sm={12} md={6} id="editingWrapper">
            <ThemeButton
              name="ADD CAPTIONS"
              style={Colors.themeGoldenBtn}
              onClick={() => {
                this.setState({ editText: true });
              }}
            />
            <ThemeButton
              name="SELECT/EDIT LOGO"
              style={Colors.themeGoldenBtn}
              onClick={() => {
                this.setState({ editLogo: true });
              }}
            />
            <ThemeButton
              name="SELECT MUSIC"
              style={Colors.themeGoldenBtn}
              onClick={() => {
                this.setState({ editMusic: true });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} id="templateWrapper">
            <ThemeButton
              name="Select Template"
              onClick={this.handleTemplate}
              style={{
                marginTop: 18,
                border: `1px solid ${Colors.themeGolden}`,
                color: Colors.themeGolden,
                background: Colors.white,
                width: "100%",
                fontFamily: "Poppins",
                fontWeight: "bolder",
                fontSize: "larger",
              }}
            />
            {}
            <ThemeButton
              name="Preview Template"
              onClick={this.handleTemplatePreview}
              style={{
                opacity: `${this.state.selectedTheme ? "1" : "0.5"}`,
                marginTop: 18,
                border: `1px solid ${Colors.themeGolden}`,
                color: Colors.themeGolden,
                background: Colors.white,
                width: "100%",
                fontFamily: "Poppins",
                fontWeight: "bolder",
                fontSize: "larger",
              }}
            />
          </Grid>
        </Grid>
        <div className="copyURL_Wrapper">
          <Paper component="form" style={classes.root}>
            <InputBase
              style={classes.input}
              value={`${process.env.REACT_APP_DOMAIN}/watch/${video &&
                video._id}`}
            />
            <IconButton
              style={classes.iconButton}
              aria-label="edit"
              onClick={this.copyUrl}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              type="submit"
              style={classes.iconButton}
              aria-label="email"
            >
              <MailIcon />
            </IconButton>
            <IconButton
              color="primary"
              style={classes.iconButton}
              aria-label="share"
            >
              <DirectionsIcon />
            </IconButton>
          </Paper>
        </div>
        <ThemeButton
          style={Colors.themeGradientBtn}
          name="Share & Send"
          onClick={this.handleShareandSend}
        />
        {this.state.editText && (
          <VideoEditor
            toggle={() => {
              this.setState({ editText: false });
            }}
            video={video}
            type="Text"
          />
        )}
        {this.state.editLogo && (
          <VideoEditor
            toggle={() => {
              this.setState({ editLogo: false });
            }}
            video={video}
            type="Logo"
          />
        )}
        {this.state.editMusic && (
          <VideoEditor
            toggle={() => {
              this.setState({ editMusic: false });
            }}
            video={video}
            type="Music"
          />
        )}
        <SimpleDialog
          selectedValue={themeName}
          open={open}
          onClose={this.handleCloseTemplate}
        />
        <SimpleDialog2
          themeName={themeName}
          selectedTheme={this.state.selectedTheme}
          open={forPreviewOpen}
          onClose={this.handleCloseTemplate2}
          video={video}
        />
        <ShareDialog
          themeName={themeName}
          open={forShare}
          onClose={this.handleCloseShare}
          receiverEmail={receiverEmail}
          emails={emails}
          emailHandler={this.emailHandler}
          submitEmail={this.submitEmail}
          handleChipAdd={this.handleChipAdd}
          handleDeleteChip={this.handleDeleteChip}
          sendMultipleEmail={this.sendMultipleEmail}
        />
      </div>
    );
  }
}

const classes = {
  root: {
    display: "flex",
    marginTop: "1em",
    alignItems: "center",
    width: "100%",
    border: "solid",
    borderWidth: "1px",
    borderColor: "#406c7f",
  },
  input: {
    flex: 1,
    marginLeft: "1em",
    color: "#406c7f",
    fontFamily: "Open Sans",
  },
  iconButton: {
    padding: 10,
    borderRadius: 0,
    background: "#406c7f",
    color: "white",
  },
};

const mapStateToProps = (state: any) => {
  return {
    video: state.video.singleVideo,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateVideo: (video: any) => dispatch(updateVideo(video)),
    sendVideoToEmail: (video: any) => dispatch(sendVideoToEmail(video)),
    sendMultipleEmail: (emailVideoObj: any) =>
      dispatch(sendMultipleEmails(emailVideoObj)),
  };
};

export default withRouter<any, any>(
  connect(mapStateToProps, mapDispatchToProps)(VideoTabHeader)
);
