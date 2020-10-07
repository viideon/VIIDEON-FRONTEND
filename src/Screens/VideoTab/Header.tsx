import React from "react";
import { toast } from "react-toastify";
import VideoInfo from "../../components/VideoInfo";
import { connect } from "react-redux";
import { CircularProgress, Grid, Tooltip, LinearProgress } from "@material-ui/core";
import Colors from "../../constants/colors";
import ThemeButton from "../../components/ThemeButton";
import CanvasPlayer from "../../components/CanvasPlayer/EditingCanvas";

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import MailIcon from '@material-ui/icons/Mail';
import DirectionsIcon from '@material-ui/icons/Directions';

import Loading from "../../components/Loading";
import AssetPicker from "../../components/AssetPicker";
import MusicAssetPicker from "../../components/MusicAssetPicker";
import AWS from "aws-sdk";
import S3FileUpload from "react-s3";
import { config } from "../../config/aws";
import canvasTxt from "canvas-txt";


// Dialog

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { FastField } from "formik";


const s3 = new AWS.S3(config);
const ICON_DIMENSION = 100;

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
}

class VideoTabHeader extends React.Component<IProps> {
  container: any;
  state = {
    height: "150px",
    editLogo: false,
    editMusic: false,
    editText: false,
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
    const newClip = `${process.env.REACT_APP_DOMAIN}/watch/${video && video._id}`;
    navigator.permissions.query({ name: "clipboard-write" as PermissionName }).then(result => {
      if (result.state == "granted" || result.state == "prompt") {
        /* write to the clipboard now */
        navigator.clipboard.writeText(newClip)
      }
    });

    // navigator.clipboard.writeText();
    toast.info("Url copied to clipboard");
  };
  componentWillUnmount() {
    window.removeEventListener("resize", this.caluclateContainerHeight);
  }
  render() {
    const { video } = this.props;
    const classes = {
      root: { display: 'flex', marginTop: '1em', alignItems: 'center', width: '100%', border: 'solid', borderWidth: '1px', borderColor: '#406c7f', },
      input: { flex: 1, marginLeft: '1em', color: '#406c7f', fontFamily: 'Open Sans' },
      iconButton: { padding: 10, borderRadius: 0, background: '#406c7f', color: 'white' },
    }
    return (
      <div className="headerTab">
        <Grid item xs={12} sm={12} md={12} id="wrapperHeader">
          {!video && (
            <div
              className="justifyCenter"
            >
              <CircularProgress color="primary" />
            </div>
          )}
          <div ref={ref => { this.container = ref }} style={{
            width: "100%",
            height: this.state.height
          }}>
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
        <h3 className="videoTitle">{video && video.title}</h3>
        <VideoInfo video={video} />

        <Grid container xs={12} sm={12} md={12} id="editingToolsWrapper">
          <Grid item xs={12} sm={12} md={6} id="editingWrapper">
            <ThemeButton
              style={{ marginTop: 18, background: Colors.themeGolden, color: Colors.white, width: "100%", fontFamily: "Poppins", fontWeight: "bolder", fontSize: "larger" }}
              name="ADD CAPTIONS"
            />
            <ThemeButton
              style={{ marginTop: 18, background: Colors.themeGolden, color: Colors.white, width: "100%", fontFamily: "Poppins", fontWeight: "bolder", fontSize: "larger" }}
              name="SELECT/EDIT LOGO"
              onClick={() => { this.setState({ editLogo: true }) }}
            />
            <ThemeButton
              style={{ marginTop: 18, background: Colors.themeGolden, color: Colors.white, width: "100%", fontFamily: "Poppins", fontWeight: "bolder", fontSize: "larger" }}
              name="SELECT MUSIC"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} id="templateWrapper">
            <ThemeButton
              style={{ marginTop: 18, border: `1px solid ${Colors.themeGolden}`, color: Colors.themeGolden, background: Colors.white, width: "100%", fontFamily: "Poppins", fontWeight: "bolder", fontSize: "larger" }}
              name="Select Template"
            />
          </Grid>
        </Grid>
        <div className="copyURL_Wrapper">
          <Paper component="form" style={classes.root} >
            <InputBase
              style={classes.input}
              value={`${process.env.REACT_APP_DOMAIN}/watch/${video && video._id}`}
            />
            <IconButton type="submit" style={classes.iconButton} aria-label="edit" onClick={this.copyUrl}>
              <EditIcon />
            </IconButton>
            <IconButton type="submit" style={classes.iconButton} aria-label="email">
              <MailIcon />
            </IconButton>
            <IconButton color="primary" style={classes.iconButton} aria-label="share">
              <DirectionsIcon />
            </IconButton>
          </Paper>
        </div>
        <ThemeButton
          style={{ marginTop: 18, background: Colors.themePurple, color: Colors.white, width: "100%", backgroundImage: Colors.themeGradient, fontFamily: "Poppins", fontWeight: "bolder", fontSize: "larger" }}
          name="Share & Shend"
        />
        {/* {
          this.state.editLogo &&
          <VideoEditor toggle={() => { this.setState({ editLogo: false }) }} video={video} />
        } */}
      </div>
    );
  }
}

interface EditorProps {
  video?: Video;
  toggle: () => void;
}
interface EditState {
  open: boolean;
  videoLoaded: boolean;
  logoPath: string;
  backgroundMusicUrl: string;
  isOpenLogoPicker: boolean;
  assetUploading: boolean;
  iconPos: string;
  logoX: any;
  logoY: any;
  musicVolume: string;
  musicLoadingTimeout: any;
  text: string;
  textColor: string;
  fontSize: number;
  vAlign: any;
  align: any;

}
class VideoEditor extends React.Component<EditorProps, EditState> {
  video: any;
  backgroundMusic: any;
  thumbnailRef: any;
  logoRef: any;
  musicRef: any;
  img: any;
  canvas: any;
  canvas2: any;
  cwidth: any;
  cheight: any;
  s3: any;
  ctx: any;
  ctx2: any;
  dummyCanvas: any;
  thumbCanvas: any;

  constructor(props: any) {
    super(props)
    this.state = {
      open: false,
      videoLoaded: false,
      logoPath: "",
      backgroundMusicUrl: "",
      isOpenLogoPicker: false,
      assetUploading: false,
      logoX: 0,
      logoY: 0,
      musicVolume: "5",
      musicLoadingTimeout: null,
      text: "",
      textColor: "#fff",
      fontSize: 5,
      vAlign: "top",
      align: "left",
      iconPos: "top-left",
    }
  }

  componentDidMount() {
    this.setUpCanvasEditing();
  }

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    this.handleVideoLoaded();
  }

  setUpCanvasEditing = () => {
    this.video.crossOrigin = "Anonymous";
    this.img.crossOrigin = "Anonymous";
    this.canvas2 = this.dummyCanvas;
    this.ctx = this.canvas.getContext("2d");
    this.ctx2 = this.canvas2.getContext("2d");
    this.video.addEventListener("canplaythrough", this.handleLoadedMetaData);
    this.video.addEventListener("pause", this.onVideoPause);
    this.video.addEventListener("play", this.onVideoPlay);
    this.video.addEventListener("ended", this.onVideoEnd);
    this.video.addEventListener("volumechange", this.syncAudio);
    this.handleVideoLoaded();
  };

  onVideoPlay = () => {
    if (this.state.backgroundMusicUrl && this.backgroundMusic.readyState !== 4) {
      toast.info("Adding background music to video , Please wait");
      return;
    } else {
      this.backgroundMusic.play();
    }
    this.draw(this.video, this.img, this.ctx, this.ctx2, this.video.clientWidth, this.video.clientHeight);
  };

  syncAudio = () => {
    let videoVolume = this.video.volume * 100;
    this.backgroundMusic.volume = (parseFloat(this.state.musicVolume) / 100) * videoVolume;
  };

  onVideoPause = () => {
    this.backgroundMusic.pause();
  };

  onVideoEnd = () => {
    this.backgroundMusic.currentTime = 0;
  };

  // isMusicLoaded = () => {
  //   if (ElbackgroundMusic && ElbackgroundMusic.readyState === 4) {
  //     clearInterval(musicLoadingTimeout);
  //     setMusicLoadingTimeout(null)
  //     toast.info("Music added");
  //   }
  // };

  handleLoadedMetaData = () => {
    this.canvas.width = this.video.clientWidth;
    this.canvas.height = this.video.clientHeight;
    this.dummyCanvas.width = this.video.clientWidth;
    this.dummyCanvas.height = this.video.clientHeight;
    if (this.props.video && this.props.video.logoProps && this.props.video.logoProps.position) {
      this.initializeIconPosition(this.props.video.logoProps.position);
    }
  };

  initializeIconPosition = (position: string) => {
    switch (position) {
      case "top-left":
        return this.setXYAndUpdate(20, 20, false)
      case "bottom-left":
        return this.setXYAndUpdate(20, this.canvas.height - ICON_DIMENSION - 20, false)
      case "bottom-right":
        return this.setXYAndUpdate(this.canvas.width - ICON_DIMENSION - 20, this.canvas.height - ICON_DIMENSION - 20, false)
      case "top-right":
        return this.setXYAndUpdate(this.canvas.width - ICON_DIMENSION - 20, 20, false)
      default:
        return;
    }
  };

  handleVideoLoaded = async () => {
    const { video } = this.props;
    if (video) {
      const { logoProps, textProps, musicProps } = video;
      try {
        if (musicProps && musicProps.url) {
          let res = await fetch(musicProps.url);
          let musicBlob = await res.blob();
          const audioUrl = await window.URL.createObjectURL(musicBlob);
          this.backgroundMusic.src = audioUrl;
          this.setState(
            {
              backgroundMusicUrl: musicProps.url,
              musicVolume: musicProps.musicVolume.toString()
            },
            () => this.syncAudio()
          );
        }
        const response = await fetch(video.url);
        let videoBlob = await response.blob();
        const videoUrl = await window.URL.createObjectURL(videoBlob);
        this.video.src = videoUrl;
      } catch (err) {
        console.log("error in editing screen", err);
      }
      if (logoProps) {
        this.setState({ logoPath: logoProps.url, iconPos: logoProps.position });
      }
      if (textProps) {
        this.setState({
          text: textProps.text,
          textColor: textProps.textColor,
          fontSize: textProps.fontSize,
          vAlign: textProps.vAlign,
          align: textProps.align
        });
      }
      this.setState({ videoLoaded: true });
    }
  }

  handleClose = () => {
    this.setState({ open: false })
    this.props.toggle();
  };

  onLogoAssetPick = async (path: any) => {
    this.setState({ logoPath: path }, () => {
      this.updateCanvas();
    })
    toast.info("updated");
  };

  onLogoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0] !== null) {
      if (!e.target.files![0].name.match(/\.(jpg|jpeg|png)$/)) {
        toast.error("Please add valid image");
        return;
      }
      toast.info("Uploading logo please wait");
      await this.compress(e.target.files![0]);
      return;
    }
    toast.error("error in selecting file");
  };

  compress = (file: any) => {
    this.setState({ assetUploading: true })
    const width = 100;
    const height = 100;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const elem = document.createElement("canvas");
        elem.width = width;
        elem.height = height;
        const ctx: any = elem.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        ctx.canvas.toBlob(
          async (blob: any) => {
            await this.saveLogo(blob);
            this.setState({ assetUploading: false })
            toast.info("Logo uploaded");
          },
          `${file.type}`,
          1
        );
      };
    };
  }

  saveLogo = (logoBlob: any) => {
    return new Promise((resolve, reject) => {
      const logoOptions = {
        Bucket: config.bucketName,
        ACL: config.ACL,
        Key: Date.now().toString() + "logo.jpeg",
        Body: logoBlob
      };
      s3.upload(logoOptions, async (err: any, data: any) => {
        if (err) {
          toast.error(err);
          this.setState({ assetUploading: true })
          reject();
          return;
        }
        this.setState({ logoPath: data.Location }, () => {
          setTimeout(() => {
            this.updateCanvas();
          }, 1000);
        })
        resolve();
      });
    });
  };

  setXYAndUpdate = (x: any, y: any, doUpdateCanvas: boolean) => {
    this.setState({ logoX: x, logoY: y }, () => {
      doUpdateCanvas && this.updateCanvas();
    })
  }

  setIconPosition = async (position: string) => {
    if (!this.state.logoPath || this.state.logoPath === null) {
      toast.info("Please upload a logo");
      return;
    }
    this.setState({ iconPos: position });
    switch (position) {
      case "top-left":
        return this.setXYAndUpdate(20, 20, true);
      case "bottom-left":
        return this.setXYAndUpdate(20, this.canvas.height - this.img.height - 20, true);
      case "bottom-right":
        return this.setXYAndUpdate(this.canvas.width - this.img.width - 20, this.canvas.height - this.img.height - 20, true);
      case "top-right":
        return this.setXYAndUpdate(this.canvas.width - this.img.width - 20, 20, true)
      default:
        return;
    }
  };

  draw = (video: any, img: any, context: any, context2: any, width: any, height: any) => {
    if (video.paused || video.ended) return false;
    context2.drawImage(video, 0, 0, width, height);
    // context2.fillStyle = textColor;
    // canvasTxt.fontSize = (fontSize / 100) * (width - 80);
    // canvasTxt.font = "Poppins";
    // canvasTxt.vAlign = vAlign;
    // canvasTxt.align = align;
    // canvasTxt.justify = false;
    // canvasTxt.lineHeight = null;
    // canvasTxt.drawText(context2, text, 30, 30, width - 50, height - 50);
    let logoDimension = 0.2 * width;
    context2.drawImage(img, this.state.logoX, this.state.logoY, logoDimension, logoDimension);
    let idata = context2.getImageData(0, 0, width, height);
    let that = this;
    context.putImageData(idata, 0, 0);
    setTimeout(function () {
      that.draw(video, img, context, context2, width, height);
    }, 0);
  };
  updateDrawCanvas = (video: any, img: any, context: any, context2: any, width: any, height: any) => {
    context2.drawImage(video, 0, 0, width, height);
    // context2.fillStyle = textColor;
    // canvasTxt.vAlign = vAlign;
    // canvasTxt.align = align;
    // canvasTxt.lineHeight = 20;
    // canvasTxt.fontSize = (fontSize / 100) * (width - 80);
    // canvasTxt.drawText(context2, text, 30, 30, width - 50, height - 50);
    let logoDimension = 0.2 * width;
    context2.drawImage(img, this.state.logoX, this.state.logoY, logoDimension, logoDimension);
    let idata = context2.getImageData(0, 0, width, height);
    context.putImageData(idata, 0, 0);
  };

  updateCanvas = () => {
    this.updateDrawCanvas(this.video, this.img, this.ctx, this.ctx2, this.video.clientWidth, this.video.clientHeight);
  };

  render() {
    const { video } = this.props;
    const {
      videoLoaded,
      // musicFileSelected,
      backgroundMusicUrl,
      open,
      assetUploading,
      isOpenLogoPicker,
      logoPath
    } = this.state;
    return (
      <div>
        <Dialog fullWidth={true} maxWidth={"lg"} open={open} onClose={this.handleClose} aria-labelledby="responsive-dialog-title">
          <DialogTitle id="responsive-dialog-title"> Edit Logo </DialogTitle>

          <DialogContent>
            <Grid container style={{ position: "relative" }}>
              {!videoLoaded && (
                <span className="progressVideoLoaded">
                  <Loading />
                </span>
              )}
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <video ref={ref => { this.video = ref }} controls={videoLoaded} width="100%" />
              </Grid>
            </Grid>
            <Grid container style={{ position: "relative" }}>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <canvas ref={ref => { this.canvas = ref }} style={{ transform: "rotate(-270px)" }} />
              </Grid>
            </Grid>
            <canvas ref={ref => { this.dummyCanvas = ref }} style={{ display: "none" }} />
            <img
              crossOrigin="anonymous"
              alt="logo"
              src={logoPath}
              style={{ display: "none" }}
              ref={ref => { this.img = ref }}
            />
            <audio
              src={backgroundMusicUrl}
              ref={ref => { this.backgroundMusic = ref }}
              loop
              style={{ display: "none" }}
            />
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <div className="addLogoDiv">
                <h3 className="addLogoMessage">
                  Add Logo
                    <Tooltip
                    title="upload a logo and play the video to see it"
                    placement="top"
                  >
                    <span style={iconStyle}>
                      <i className="fas fa-info"></i>
                    </span>
                  </Tooltip>
                </h3>
                <AssetPicker isOpen={isOpenLogoPicker} toggle={() => this.setState({ isOpenLogoPicker: !this.state.isOpenLogoPicker })} onPick={this.onLogoAssetPick} logoAssets={true} />
                <input id="uploadInput" type="file" onChange={this.onLogoFileChange} ref={ref => { this.logoRef = ref }} accept="image/x-png,image/gif,image/jpeg" />
                {assetUploading && <LinearProgress />}
                <Button
                  onClick={() => this.logoRef.click()}
                  style={{ color: "#fff", width: "135px", backgroundColor: "#ff4301", margin: "0px 5px 10px 0px" }}
                >
                  Upload
                  </Button>
                <Button onClick={() => this.setState({ isOpenLogoPicker: !this.state.isOpenLogoPicker })} style={{ color: "#fff", marginLeft: "3px", backgroundColor: "rgb(34, 185, 255)", margin: "0px 5px 10px 0px" }}>
                  Select from Assets
                </Button>
                <h5 className="positionTxt">Change Logo Position</h5>
                <Button
                  style={logoPositionBtn}
                  onClick={() => this.setIconPosition("top-left")}
                >
                  Top Left
                  </Button>
                <Button
                  style={logoPositionBtn}
                  onClick={() => this.setIconPosition("top-right")}
                >
                  Top Right
                  </Button>
                <Button
                  style={logoPositionBtn}
                  onClick={() => this.setIconPosition("bottom-left")}
                >
                  Bottom Left
                  </Button>
                <Button
                  style={logoPositionBtn}
                  onClick={() => this.setIconPosition("bottom-right")}
                >
                  Bottom Right
                  </Button>
              </div>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

const iconStyle = {
  fontSize: "15px",
  color: "#a9a9a9",
  marginLeft: "7px",
  cursor: "pointer"
};
const logoPositionBtn = {
  marginBottom: "10px",
  marginLeft: "7px",
  fontSize: "11px",
  border: "1px solid #696969"
};

const mapStateToProps = (state: any) => {
  return {
    video: state.video.singleVideo
  };
};

export default connect(mapStateToProps, null)(VideoTabHeader);
