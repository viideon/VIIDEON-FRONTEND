import React from "react";
import { toast } from "react-toastify";
import VideoInfo from "../../components/VideoInfo";
import { connect } from "react-redux";
import { CircularProgress, Grid, TextField, InputAdornment } from "@material-ui/core";
import Colors from "../../constants/colors";
import ThemeButton from "../../components/ThemeButton";
import CanvasPlayer from "../../components/CanvasPlayer/EditingCanvas";
import VideoEditor from './Editor';

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from '@material-ui/icons/Done';
import MailIcon from "@material-ui/icons/Mail";
import DirectionsIcon from "@material-ui/icons/Directions";

import { updateVideo } from "../../Redux/Actions/videos";



import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";

const { availableTheme } = require("../../constants/constants");

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
});

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const classes = useStyles();
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
              <img className="avatarImage" src={theme.avatar} />
              <ListItemText primary={theme.name} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </div>
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
    open: false,
    template: "",
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
    navigator.permissions
      .query({ name: "clipboard-write" as PermissionName })
      .then(result => {
        if (result.state == "granted" || result.state == "prompt") {
          navigator.clipboard.writeText(newClip);
        }
      });

    // navigator.clipboard.writeText();
    toast.info("Url copied to clipboard");
  };
  componentWillUnmount() {
    window.removeEventListener("resize", this.caluclateContainerHeight);
  }

  handleEditTitle = () => {
    this.setState({ editTitle: true })
  }
  
  saveVideo = () => {
    const { video } = this.props;
    const { title } = this.state;
    let newVideo: any = video;
    newVideo.id = video?._id;
    newVideo.title = title;
    this.props.updateVideo(newVideo)
    this.setState({ editTitle: false })
  }
  
  handleInputChange = (input: any) => {
    this.setState({ title: input.value });
  }

  handleTemplate = () => {
    this.setState({ open : true})
  }

  handleCloseTemplate = (name: string) => {
    const { video } = this.props;
    const { template } = this.state;
    let newVideo: any = video;
    newVideo.id = video?._id;
    newVideo.eMailTemplate = name;
    this.props.updateVideo(newVideo)
    this.setState({open: false})
  }

  render() {
    const { video } = this.props;
    const { editTitle, themeName, open } = this.state;
    return (
      <div className="headerTab">
        <Grid item xs={12} sm={12} md={12} id="wrapperHeader">
          {!video && (
            <div className="justifyCenter">
              <CircularProgress color="primary" />
            </div>
          )}
          <div ref={ref => { this.container = ref; }} style={{ width: "100%", height: this.state.height }}>
            {video && (
              <CanvasPlayer
                muted={false}
                autoPlay={false}
                loop={false}
                src={video.url}
                logoProps={video.logoProps}
                textProps={video.textProps}
                thumbnail={video.thumbnail}
                musicProps={video.musicProps}
              />
            )}
          </div>
        </Grid>
        { editTitle ?
          <>
          <div>
            <input 
              className="editVideoTitle"
              defaultValue={video && video.title}
              onChange={(e:any) => this.handleInputChange(e.currentTarget)}
            />
            <DoneIcon onClick={this.saveVideo} style={{ cursor: "pointer" }} />
          </div>
          </>
          :
          <h3 className="videoTitle">
            {video && video.title}
            <EditIcon onClick={this.handleEditTitle} style={{ cursor: "pointer" }} />
          </h3>
        }
        <VideoInfo video={video} />
        <Grid container xs={12} sm={12} md={12} id="editingToolsWrapper">
          <Grid item xs={12} sm={12} md={6} id="editingWrapper">
            <ThemeButton
              name="ADD CAPTIONS"
              style={Colors.themeGoldenBtn}
              onClick={() => { this.setState({ editText: true }); }}
            />
            <ThemeButton
              name="SELECT/EDIT LOGO"
              style={Colors.themeGoldenBtn}
              onClick={() => { this.setState({ editLogo: true }); }}
            />
            <ThemeButton
              name="SELECT MUSIC"
              style={Colors.themeGoldenBtn}
              onClick={() => { this.setState({ editMusic: true }); }}
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
                fontSize: "larger"
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
              type="submit"
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
        <ThemeButton style={Colors.themeGradientBtn} name="Share & Send" />
        {
          this.state.editText &&
          <VideoEditor toggle={() => { this.setState({ editText: false }) }} video={video} type="Text" />
        }
        {
          this.state.editLogo &&
          <VideoEditor toggle={() => { this.setState({ editLogo: false }) }} video={video} type="Logo" />
        }
        {
          this.state.editMusic &&
          <VideoEditor toggle={() => { this.setState({ editMusic: false }) }} video={video} type="Music" />
        }
        <SimpleDialog
          selectedValue={themeName}
          open={open}
          onClose={this.handleCloseTemplate}
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
    borderColor: "#406c7f"
  },
  input: {
    flex: 1,
    marginLeft: "1em",
    color: "#406c7f",
    fontFamily: "Open Sans"
  },
  iconButton: {
    padding: 10,
    borderRadius: 0,
    background: "#406c7f",
    color: "white"
  }
};

const mapStateToProps = (state: any) => {
  return {
    video: state.video.singleVideo
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateVideo: (video: any) => dispatch(updateVideo(video)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoTabHeader);
