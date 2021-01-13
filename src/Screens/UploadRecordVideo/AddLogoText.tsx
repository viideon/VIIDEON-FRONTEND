import React from "react";
import AWS from "aws-sdk";
import { withRouter } from "react-router-dom";
import Loading from "../../components/Loading";
import {
  Grid,
  LinearProgress,
  Tooltip,
  TextField,
  Button,
} from "@material-ui/core";
import ThemeButton from "../../components/ThemeButton";
import EmailInstruction from "../../components/Reusable/EmailInstruction";
import Colors from "../../constants/colors";
import { connect } from "react-redux";
import ChipInput from "material-ui-chip-input";
import canvasTxt from "canvas-txt";
import { CompactPicker } from "react-color";
import { toast, Flip } from "react-toastify";
import AssetPicker from "../../components/AssetPicker";
import MusicAssetPicker from "../../components/MusicAssetPicker";
import {
  sendVideoToEmail,
  saveVideo,
  toggleSendVariable,
  sendMultipleEmails,
} from "../../Redux/Actions/videos";
import * as Constants from "../../constants/constants";
import { reg } from "../../constants/emailRegEx";
import { EmailVideo, VideoSave, MultiEmail } from "../../Redux/Types/videos";
import { addAsset, addMusicAsset } from "../../Redux/Actions/asset";
import { getIconPosition } from "../../lib/helpers";
import { config } from "../../config/aws";
import "./style.css";

interface IProps {
  history: any;
  auth: any;
  videoToEdit: any;
  videoUser: any;
  addAsset: (asset: any) => void;
  addMusicAsset: (asset: any) => void;
  toggleSendVariable: () => void;
  sendVideoToEmail: (video: EmailVideo) => void;
  saveVideo: (video: VideoSave) => void;
  sendMultipleEmail: (emailVideoObj: any) => void;
  savedVideoId: string;
  progressEmail: boolean;
}

interface IState {
  logoPath: any;
  logoX: number | string;
  logoY: number | string;
  text: string;
  btnText: string;
  textColor: string;
  fontSize: number;
  vAlign: string;
  align: string;
  iconPos: string;
  imagePath: any;
  isAssetPicker: boolean;
  thumbnailBlob: any;
  videoProgress: boolean;
  progressVideo: number;
  thumbnailUrl: string;
  urlRecord: string;
  title: string;
  emails: any;
  recieverEmail: string;
  musicTitle: string;
  backgroundMusicUrl: string;
  musicFileSelected: boolean;
  musicFile: any;
  assetUploading: boolean;
  isOpenMusicPicker: boolean;
  musicLoadingTimeout: any;
  musicVolume: string;
}
class AddLogoText extends React.Component<IProps, IState> {
  video: any;
  upload: any;
  img: any;
  musicRef: any;
  backgroundMusic: any;
  canvas: any;
  canvas2: any;
  cwidth: any;
  cheight: any;
  s3: any;
  ctx: any;
  ctx2: any;
  constructor(props: any) {
    super(props);
    this.state = {
      logoPath: null,
      isAssetPicker: false,
      isOpenMusicPicker: false,
      logoX: 10,
      logoY: 10,
      text: "",
      btnText: "Skip",
      textColor: "#fff",
      fontSize: 5,
      vAlign: "top",
      align: "left",
      iconPos: "top-left",
      imagePath: "",
      thumbnailBlob: "",
      videoProgress: false,
      progressVideo: 0,
      thumbnailUrl: "",
      urlRecord: "",
      title: "",
      emails: [],
      recieverEmail: "",
      musicTitle: "",
      backgroundMusicUrl: "",
      musicFileSelected: false,
      musicFile: null,
      assetUploading: false,
      musicLoadingTimeout: null,
      musicVolume: "0.5",
    };
  }
  componentDidMount() {
    this.props.toggleSendVariable();
    this.backgroundMusic = this.refs.backgroundMusic;
    this.s3 = new AWS.S3(config);
    this.video = this.refs.video;
    this.video.src = URL.createObjectURL(this.props.videoToEdit);
    this.canvas = this.refs.canvas;
    this.canvas2 = this.refs.dummyCanvas;
    this.img = this.refs.image;
    this.img.crossOrigin = "Anonymous";
    this.ctx = this.canvas.getContext("2d");
    this.ctx2 = this.canvas2.getContext("2d");
    this.video.addEventListener("loadedmetadata", this.handleLoadedMetaData);
    this.video.addEventListener("play", this.onVideoPlay, false);
    this.video.addEventListener("pause", this.onVideoPause);
    this.video.addEventListener("ended", this.onVideoEnd);
    this.video.addEventListener("volumechange", this.syncAudio);
  }
  onVideoPlay = () => {
    if (
      this.state.backgroundMusicUrl &&
      this.backgroundMusic.readyState !== 4
    ) {
      toast.info("Adding background music to video , Please wait");
      return;
    } else {
      this.backgroundMusic.play();
    }
    this.draw(
      this.video,
      this.img,
      this.ctx,
      this.ctx2,
      this.video.clientWidth,
      this.video.clientHeight
    );
  };
  handleLoadedMetaData = () => {
    this.canvas.width = this.video.clientWidth;
    this.canvas.height = this.video.clientHeight;
    this.canvas2.width = this.video.clientWidth;
    this.canvas2.height = this.video.clientHeight;
  };
  toggleAssetPicker = () => {
    this.setState({ isAssetPicker: !this.state.isAssetPicker });
  };
  setInputRef = (ref: any) => {
    this.upload = ref;
  };
  triggerFileUploadBtn = () => {
    this.upload.click();
  };
  setMusicInputRef = (ref: any) => {
    this.musicRef = ref;
  };
  toggleMusicAssetPicker = () => {
    this.setState({ isOpenMusicPicker: !this.state.isOpenMusicPicker });
  };
  triggerMusicUploadBtn = () => {
    this.musicRef.click();
  };
  onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0] !== null) {
      if (!e.target.files![0].name.match(/\.(jpg|jpeg|png)$/)) {
        toast.error("Please add valid image");
        return;
      }
      toast.info("Uploading logo please wait");
      await this.compress(e.target.files![0]);
    } else {
      toast.error("error in selecting file");
    }
  };

  draw = (
    video: any,
    img: any,
    context: any,
    context2: any,
    width: any,
    height: any
  ) => {
    if (video.paused || video.ended) return false;
    context2.drawImage(video, 0, 0, width, height);
    canvasTxt.fontSize = (this.state.fontSize / 100) * (width - 80);
    context2.fillStyle = this.state.textColor;
    canvasTxt.vAlign = this.state.vAlign;
    canvasTxt.align = this.state.align;
    canvasTxt.lineHeight = 20;
    canvasTxt.drawText(
      context2,
      this.state.text,
      30,
      30,
      width - 50,
      height - 50
    );
    let logoDimension = 0.2 * width;
    context2.drawImage(
      img,
      this.state.logoX,
      this.state.logoY,
      logoDimension,
      logoDimension
    );
    let idata = context2.getImageData(0, 0, width, height);
    let that = this;
    context.putImageData(idata, 0, 0);
    setTimeout(function() {
      that.draw(video, img, context, context2, width, height);
    }, 0);
  };
  updateDrawCanvas = (
    video: any,
    img: any,
    context: any,
    context2: any,
    width: any,
    height: any
  ) => {
    context2.drawImage(video, 0, 0, width, height);
    context2.fillStyle = this.state.textColor;
    canvasTxt.vAlign = this.state.vAlign;
    canvasTxt.align = this.state.align;
    canvasTxt.lineHeight = 20;
    canvasTxt.fontSize = (this.state.fontSize / 100) * (width - 80);
    canvasTxt.drawText(
      context2,
      this.state.text,
      30,
      30,
      width - 50,
      height - 50
    );
    let logoDimension = 0.2 * width;
    context2.drawImage(
      img,
      this.state.logoX,
      this.state.logoY,
      logoDimension,
      logoDimension
    );
    let idata = context2.getImageData(0, 0, width, height);
    context.putImageData(idata, 0, 0);
  };
  updateCanvas = () => {
    this.updateDrawCanvas(
      this.video,
      this.img,
      this.ctx,
      this.ctx2,
      this.video.clientWidth,
      this.video.clientHeight
    );
  };
  compress(file: any) {
    this.setState({ assetUploading: true });
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
            this.setState({ assetUploading: false });
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
        Body: logoBlob,
      };
      this.s3.upload(logoOptions, (err: any, data: any) => {
        if (err) {
          toast.error(err);
          this.setState({ assetUploading: false });
          reject();
          return;
        }
        this.setState({ logoPath: data.Location }, () => {
          setTimeout(() => {
            this.updateCanvas();
          }, 1000);
        });
        this.props.addAsset({ type: "logo", url: data.Location });
        resolve();
      });
    });
  };
  setIconPosition = (position: string) => {
    if (this.state.logoPath === null) {
      toast.info("Please upload a logo");
      return;
    }
    // console.log("image ", this.canvas.width);
    // console.log("image ", this.img.width);
    this.setState({ iconPos: position });
    let x, y: any;
    switch (position) {
      case "top-left":
        this.setState({ logoX: 20, logoY: 20 }, () => this.updateCanvas());
        return;
      case "bottom-left":
        x = 20;
        y = this.canvas.height - this.img.height - this.img.height / 2;
        this.setState({ logoX: x, logoY: y }, () => this.updateCanvas());
        return;
      case "bottom-right":
        x = this.canvas.width - this.img.width - this.img.width / 2;
        y = this.canvas.height - this.img.height - this.img.height / 2;
        this.setState({ logoX: x, logoY: y }, () => this.updateCanvas());
        return;
      case "top-right":
        x = this.canvas.width - this.img.width - this.img.width / 2;
        // console.log("x", x);
        this.setState({ logoX: x, logoY: 20 }, () => this.updateCanvas());
        return;
      default:
        return;
    }
  };
  setTextPosition = (position: string) => {
    switch (position) {
      case "top-left":
        this.setState({ align: "left", vAlign: "top" }, () =>
          this.updateCanvas()
        );
        return;
      case "bottom-left":
        this.setState({ align: "left", vAlign: "bottom" }, () =>
          this.updateCanvas()
        );
        return;
      case "bottom-right":
        this.setState({ align: "right", vAlign: "bottom" }, () =>
          this.updateCanvas()
        );
        return;
      case "top-right":
        this.setState({ align: "right", vAlign: "top" }, () =>
          this.updateCanvas()
        );
        return;
      case "center":
        this.setState({ align: "center", vAlign: "middle" }, () =>
          this.updateCanvas()
        );
        return;
      case "center-bottom":
        this.setState({ align: "center", vAlign: "bottom" }, () =>
          this.updateCanvas()
        );
        return;
      default:
        return;
    }
  };
  changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ text: e.target.value }, () => this.updateCanvas());
  };
  handleChangeColor = (color: any) => {
    this.setState({ textColor: color.hex }, () => this.updateCanvas());
  };
  changeFontSize = (e: any) => {
    this.setState({ fontSize: Number(e.target.value) }, () =>
      this.updateCanvas()
    );
  };
  onAssetPick = (path: any) => {
    this.setState({ logoPath: path }, () => this.updateCanvas());
    toast.info("updated");
  };
  getThumbnail = () => {
    return new Promise((resolve, reject) => {
      const thumbCanvas: any = this.refs.thumbCanvas;
      const thumbnailContext = thumbCanvas.getContext("2d");
      const iconPos = getIconPosition(this.state.iconPos);
      thumbnailContext.drawImage(this.video, 0, 0, 1280, 720);
      thumbnailContext.fillStyle = this.state.textColor;
      canvasTxt.fontSize = (this.state.fontSize / 100) * 1100;
      canvasTxt.vAlign = this.state.vAlign;
      canvasTxt.align = this.state.align;
      canvasTxt.lineHeight = 20;
      canvasTxt.drawText(
        thumbnailContext,
        this.state.text,
        60,
        60,
        1280 - 120,
        720 - 120
      );
      thumbnailContext.drawImage(this.img, iconPos.x, iconPos.y);
      thumbCanvas.toBlob((blob: any) => {
        this.setState({ thumbnailBlob: blob });
        resolve();
      }, "image/jpeg");
    });
  };
  uploadVideo = () => {
    return new Promise((resolve, reject) => {
      this.setState({ videoProgress: true, progressVideo: 0 });
      const options = {
        Bucket: config.bucketName,
        ACL: config.ACL,
        Key: Date.now().toString() + ".webm",
        Body: this.props.videoToEdit,
      };
      this.s3
        .upload(options, (err: any, data: any) => {
          if (err) {
            this.setState({ videoProgress: false });
            reject();
          } else {
            this.setState({ urlRecord: data.Location, videoProgress: false });
            resolve();
          }
        })
        .on("httpUploadProgress", (progress: any) => {
          let uploaded: number = (progress.loaded * 100) / progress.total;
          this.setState({ progressVideo: uploaded });
        });
    });
  };
  uploadAndSaveMusicAsset = () => {
    if (this.state.musicTitle === "") {
      toast.error("Please add a title for music asset");
    } else {
      toast.info("Uploading music please wait");
      this.setState({ assetUploading: true });
      const musicOptions = {
        Bucket: config.bucketName,
        ACL: config.ACL,
        Key: Date.now().toString() + this.state.musicFile.name,
        Body: this.state.musicFile,
      };
      this.s3.upload(musicOptions, (err: any, data: any) => {
        if (err) {
          toast.error(err);
          this.setState({ assetUploading: false });
          return;
        }
        toast.info("Asset Uploaded");
        this.setState({
          backgroundMusicUrl: data.Location,
          musicFile: null,
          musicFileSelected: false,
          assetUploading: false,
        });
        this.props.addMusicAsset({
          url: data.Location,
          title: this.state.musicTitle,
        });
      });
    }
  };
  onMusicInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audioTypes = /(\.|\/)(mp3|ogg|wav)$/i;
    let musicFile = e.target.files![0];
    if (!audioTypes.test(musicFile.name)) {
      toast.error("Please upload a valid audio file");
      return;
    }
    if (musicFile !== null) {
      toast("Add a title and  click upload to save this asset", {
        autoClose: 3000,
        transition: Flip,
      });
      this.setState({ musicFileSelected: true, musicFile: musicFile });
    } else {
      toast.error("Failed to select a file try again");
    }
  };
  onMusicAssetPick = (path: any) => {
    this.setState({ backgroundMusicUrl: path });
    toast.info("Wait while we add the music to the video");
    this.setState({
      musicLoadingTimeout: setInterval(() => this.isMusicLoaded(), 3000),
    });
  };
  uploadThumbnail = () => {
    return new Promise((resolve, reject) => {
      this.setState({ videoProgress: true, progressVideo: 0 });
      const thumbnailOptions = {
        Bucket: config.bucketName,
        ACL: config.ACL,
        Key: Date.now().toString() + "thumbnail.jpeg",
        Body: this.state.thumbnailBlob,
      };

      this.s3
        .upload(thumbnailOptions, (err: any, data: any) => {
          if (err) {
            this.setState({ videoProgress: false });
            reject();
          } else {
            this.setState({
              videoProgress: false,
              thumbnailUrl: data.Location,
            });
            resolve();
          }
        })
        .on("httpUploadProgress", (progress: any) => {
          let uploaded: number = (progress.loaded * 100) / progress.total;
          this.setState({ progressVideo: uploaded });
        });
    });
  };
  saveVideo = async () => {
    if (this.state.title === "") {
      toast.warn("Enter a title to save video");
      return;
    }
    try {
      toast.info("Generating thumbnail ...");
      await this.getThumbnail();
      await this.uploadThumbnail();
      await this.uploadVideo();
      const textProps = {
        text: this.state.text,
        textColor: this.state.textColor,
        fontSize: this.state.fontSize,
        vAlign: this.state.vAlign,
        align: this.state.align,
      };
      const logoProps = {
        url: this.state.logoPath,
        position: this.state.iconPos,
      };
      const musicProps = {
        url: this.state.backgroundMusicUrl,
        musicVolume: parseFloat(this.state.musicVolume),
      };
      const video = {
        title: this.state.title,
        url: this.state.urlRecord,
        userId: this.props.auth!.user!._id,
        thumbnail: this.state.thumbnailUrl,
        musicProps: musicProps,
        textProps: textProps,
        logoProps: logoProps,
        campaign: false,
        isVideo: true,
      };
      this.props.saveVideo(video);
    } catch (error) {
      toast.error("Failed to save video, Please try again");
    }
  };
  submitEmail = () => {
    if (this.props.savedVideoId === "") {
      return toast.warn("Please save a video");
    } else if (this.state.recieverEmail === "") {
      return toast.warn("Add an Email");
    } else if (reg.test(this.state.recieverEmail) === false) {
      return toast.warn("Invalid Email");
    } else {
      const recieverEmail = this.state.recieverEmail;
      const video = {
        videoId: this.props.savedVideoId,
        recieverEmail,
      };
      this.props.sendVideoToEmail(video);
      this.setState({ recieverEmail: "" });
    }
  };
  sendMultipleEmail = () => {
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
      };
      this.props.sendMultipleEmail(emailVideoObj);
      this.setState({ emails: [] });
    }
  };
  titleNameHandler = (event: any) => {
    this.setState({
      title: event.target.value,
    });
  };
  emailHandler = (event: any) => {
    this.setState({
      recieverEmail: event.target.value,
    });
  };
  onChangeMusicTitle = (e: any) => {
    this.setState({ musicTitle: e.target.value });
  };
  isMusicLoaded = () => {
    if (this.backgroundMusic && this.backgroundMusic.readyState === 4) {
      clearInterval(this.state.musicLoadingTimeout);
      this.setState({ musicLoadingTimeout: null });
      toast.info("Music added");
    }
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
  navigateToVideos = () => {
    this.props.history.push("/videos");
  };
  removeListeners = () => {
    this.video.removeEventListener(
      "handleloadedmetadata",
      this.handleLoadedMetaData
    );
    this.video.removeEventListener("pause", this.onVideoPause);
    this.video.removeEventListener("play", this.onVideoPlay);
    this.video.removeEventListener("ended", this.onVideoEnd);
    this.video.removeEventListener("volumechange", this.syncAudio);
  };
  syncAudio = () => {
    let videoVolume = this.video.volume * 100;
    this.backgroundMusic.volume =
      (parseFloat(this.state.musicVolume) / 100) * videoVolume;
  };
  onAdjustMusicVolume = (e: any) => {
    this.backgroundMusic.volume = e.target.value;
    this.setState({ musicVolume: e.target.value });
  };
  onVideoPause = () => {
    this.backgroundMusic.pause();
  };
  onVideoEnd = () => {
    this.backgroundMusic.currentTime = 0;
  };
  componentWillUnmount() {
    this.removeListeners();
  }
  render() {
    let { videoSaved, loading } = this.props.videoUser;
    let { progressEmail } = this.props;
    let { musicFileSelected, backgroundMusicUrl } = this.state;
    return (
      <div>
        <h2 className="addLogoHeading">Add Logo and Text to Video</h2>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            style={{ paddingRight: "5px" }}
          >
            <video ref="video" controls width="100%" />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            style={{ paddingLeft: "5px" }}
          >
            <canvas ref="canvas" />
          </Grid>
        </Grid>
        <canvas ref="dummyCanvas" style={{ display: "none" }} />
        <img
          crossOrigin="anonymous"
          alt="logo"
          src={this.state.logoPath ? this.state.logoPath : null}
          style={{ display: "none" }}
          ref="image"
        />
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6}>
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
              <AssetPicker
                isOpen={this.state.isAssetPicker}
                toggle={this.toggleAssetPicker}
                onPick={this.onAssetPick}
                logoAssets={true}
              />
              <input
                id="uploadInput"
                type="file"
                onChange={this.onFileChange}
                ref={this.setInputRef}
                accept="image/x-png,image/gif,image/jpeg"
              />
              {this.state.assetUploading && <LinearProgress />}
              <Button
                onClick={this.triggerFileUploadBtn}
                style={{
                  color: "#fff",
                  width: "135px",
                  backgroundColor: "#ff4301",
                }}
              >
                Upload
              </Button>

              <Button
                onClick={this.toggleAssetPicker}
                style={{
                  color: "#fff",
                  marginLeft: "3px",
                  backgroundColor: "rgb(34, 185, 255)",
                }}
              >
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
              <h3 className="addLogoMessage">
                Add Music
                <Tooltip title="upload audio music" placement="top">
                  <span style={iconStyle}>
                    <i className="fas fa-info"></i>
                  </span>
                </Tooltip>
              </h3>
              <MusicAssetPicker
                isOpen={this.state.isOpenMusicPicker}
                toggle={this.toggleMusicAssetPicker}
                onPick={this.onMusicAssetPick}
              />
              <input
                id="uploadInput"
                type="file"
                onChange={this.onMusicInputChange}
                ref={this.setMusicInputRef}
                accept="audio/*"
              />
              {musicFileSelected && (
                <Button
                  onClick={this.uploadAndSaveMusicAsset}
                  style={{
                    color: "#fff",
                    width: "135px",
                    backgroundColor: "#ff4301",
                  }}
                >
                  Upload
                </Button>
              )}
              {!musicFileSelected && (
                <Button
                  onClick={this.triggerMusicUploadBtn}
                  style={{
                    color: "#fff",
                    backgroundColor: "#ff4301",
                  }}
                >
                  Select to Upload
                </Button>
              )}
              <Button
                onClick={this.toggleMusicAssetPicker}
                style={{
                  color: "#fff",
                  marginLeft: "3px",
                  backgroundColor: "rgb(34, 185, 255)",
                }}
              >
                Select from Assets
              </Button>

              {musicFileSelected && (
                <TextField
                  type="text"
                  placeholder="Music Title"
                  value={this.state.musicTitle}
                  onChange={this.onChangeMusicTitle}
                  style={{ marginTop: "10px" }}
                />
              )}
              {backgroundMusicUrl && (
                <div className="musicVolumeAdjust">
                  <label>Adjust music volume</label>
                  <input
                    type="range"
                    value={this.state.musicVolume}
                    onChange={this.onAdjustMusicVolume}
                    min="0"
                    max="1"
                    step="0.1"
                  />{" "}
                </div>
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <div className="addTextDiv">
              <h4 className="addLogoMessage">
                Add Text
                <Tooltip
                  title="enter text and play the video to see it"
                  placement="top"
                >
                  <span style={iconStyle}>
                    <i className="fas fa-info"></i>
                  </span>
                </Tooltip>
              </h4>
              <TextField
                type="text"
                placeholder="Add Text"
                name="text"
                value={this.state.text}
                onChange={this.changeText}
                style={{ width: "80%" }}
              />
              <h5 className="positionTxt">Change Text Position</h5>
              <Button
                style={logoPositionBtn}
                onClick={() => this.setTextPosition("center")}
              >
                Center
              </Button>
              <Button
                style={logoPositionBtn}
                onClick={() => this.setTextPosition("center-bottom")}
              >
                Center Bottom
              </Button>
              <Button
                style={logoPositionBtn}
                onClick={() => this.setTextPosition("top-left")}
              >
                Top Left
              </Button>
              <Button
                style={logoPositionBtn}
                onClick={() => this.setTextPosition("top-right")}
              >
                Top Right
              </Button>
              <Button
                style={logoPositionBtn}
                onClick={() => this.setTextPosition("bottom-left")}
              >
                Bottom Left
              </Button>
              <Button
                style={logoPositionBtn}
                onClick={() => this.setTextPosition("bottom-right")}
              >
                Bottom Right
              </Button>
              <h5 className="positionTxt">Select Font Size</h5>
              <div style={{ display: "flex", flexWrap: "nowrap" }}>
                <input
                  type="range"
                  id="font"
                  name="font"
                  min="1"
                  max="10"
                  step="0.1"
                  style={{ width: "80%" }}
                  value={this.state.fontSize}
                  onChange={this.changeFontSize}
                ></input>
                <span style={{ width: "10%", padding: "10px" }}>
                  {Math.round((this.state.fontSize / 10) * 100)}px
                </span>
              </div>
              <h5 className="positionTxt">
                Choose Text Color
                <span className="optionalText">(optional)</span>
              </h5>
              <CompactPicker
                color={this.state.textColor}
                onChangeComplete={this.handleChangeColor}
              />
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={1} sm={1} md={2} lg={2}></Grid>
          <Grid item xs={10} sm={10} md={8} lg={8}>
            <div style={{ marginTop: "30px" }}>
              {videoSaved !== true && (
                <>
                  {this.state.videoProgress && (
                    <LinearProgress
                      variant="determinate"
                      value={this.state.progressVideo}
                    />
                  )}
                  <TextField
                    name="name"
                    value={this.state.title}
                    onChange={this.titleNameHandler}
                    placeholder="Give your video an amazing title"
                    type="text"
                    label="Video Title"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ margin: "20px 0px" }}
                  />
                  <ThemeButton
                    style={{
                      backgroundColor: Colors.themeBlue,
                      color: Colors.white,
                    }}
                    disabled={this.state.videoProgress || loading}
                    onClick={this.saveVideo}
                    name="Save Video"
                  />
                </>
              )}
              <div style={{ marginLeft: "50%", marginTop: "15px" }}>
                {loading && <Loading />}
                {progressEmail && <Loading />}
              </div>
              {videoSaved === true && (
                <>
                  <div>
                    <EmailInstruction heading="Reciever Email" />
                    <TextField
                      placeholder="Enter email address"
                      fullWidth
                      type="text"
                      value={this.state.recieverEmail}
                      name="recieverEmail"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={this.emailHandler}
                    />
                  </div>
                  <ThemeButton
                    onClick={this.submitEmail}
                    name={`${Constants.SEND_THROUGH_EMAIL}`}
                    style={{
                      backgroundColor: Colors.themeGreen,
                      color: Colors.white,
                      marginTop: "15px",
                    }}
                  />
                  <div className="formGroupMultiple">
                    <EmailInstruction heading="Broadcast" />
                    <ChipInput
                      value={this.state.emails}
                      placeholder="Enter email and press enter"
                      fullWidth
                      onAdd={(chips) => this.handleChipAdd(chips)}
                      onDelete={(chip) => this.handleDeleteChip(chip)}
                    />
                  </div>
                  <ThemeButton
                    style={{
                      backgroundColor: Colors.themeGreen,
                      color: Colors.white,
                      marginTop: "15px",
                    }}
                    onClick={this.sendMultipleEmail}
                    name="Broadcast"
                  />
                  <div style={{ textAlign: "end" }}>
                    <ThemeButton
                      style={{
                        background: Colors.themeBlue,
                        color: Colors.white,
                        marginTop: "30px",
                      }}
                      onClick={this.navigateToVideos}
                      name="Done"
                    />
                  </div>
                </>
              )}
            </div>
          </Grid>
          <Grid item xs={1} sm={1} md={8} lg={2}></Grid>
        </Grid>
        <canvas
          ref="thumbCanvas"
          height={720}
          width={1280}
          style={{ display: "none" }}
        />
        <audio
          src={backgroundMusicUrl}
          ref="backgroundMusic"
          loop
          style={{ display: "none" }}
        />
      </div>
    );
  }
}
const iconStyle = {
  fontSize: "15px",
  color: "#a9a9a9",
  marginLeft: "7px",
  cursor: "pointer",
};
const logoPositionBtn = {
  marginBottom: "10px",
  marginLeft: "7px",
  fontSize: "11px",
  border: "1px solid #696969",
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    addAsset: (asset: any) => dispatch(addAsset(asset)),
    addMusicAsset: (asset: any) => dispatch(addMusicAsset(asset)),
    sendVideoToEmail: (video: EmailVideo) => dispatch(sendVideoToEmail(video)),
    saveVideo: (video: VideoSave) => dispatch(saveVideo(video)),
    toggleSendVariable: () => dispatch(toggleSendVariable()),
    sendMultipleEmail: (emailVideoObj: MultiEmail) =>
      dispatch(sendMultipleEmails(emailVideoObj)),
  };
};
const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
    videoUser: state.video,
    savedVideoId: state.video.savedVideoId,
    progressEmail: state.video.progressEmail,
  };
};
export default withRouter<any, any>(
  connect(mapStateToProps, mapDispatchToProps)(AddLogoText)
);
