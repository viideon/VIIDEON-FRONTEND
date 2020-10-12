import React from "react";
import AWS from "aws-sdk";
import S3FileUpload from "react-s3";
import Colors from "../../constants/colors";
import { toast } from "react-toastify";
import canvasTxt from "canvas-txt";
import { CompactPicker } from "react-color";
import AssetPicker from "../../components/AssetPicker";
import MusicAssetPicker from "../../components/MusicAssetPicker";
import {
  Tooltip,
  TextField,
  Button,
  Grid,
  LinearProgress
} from "@material-ui/core";
import Loading from "../../components/Loading";
import HelpIcon from "@material-ui/icons/Help";
import { connect } from "react-redux";
import { addAsset, addMusicAsset } from "../../Redux/Actions/asset";
import { updateVideo } from "../../Redux/Actions/videos";
import CanvasPlayer from "../../components/CanvasPlayer/EditingCanvas";
import { config } from "../../config/aws";
import { getIconPosition } from "../../lib/helpers";
import ThemeButton from "../../components/ThemeButton";
import "./style.css";

interface IState {
  file: File | null;
  url: string;
  uploading: boolean;
  showVideo: boolean;
  isOpenThumbnailPicker: boolean;
  isOpenLogoPicker: boolean;
  isOpenMusicPicker: boolean;
  newVideoTitle: string;
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
  assetUploading: boolean;
  imagePath: any;
  videoLoaded: boolean;
  musicTitle: string;
  backgroundMusicUrl: string;
  musicFileSelected: boolean;
  musicFile: any;
  musicLoadingTimeout: any;
  musicVolume: string;
  updatedThumbnailUrl: string;
  videoHeight: string;
}
interface Video {
  url: string;
  title: string;
  thumbnail?: string;
  campaign?: boolean;
  logoProps?: any;
  textProps?: any;
  musicProps?: any;
  recordingEdit?: boolean;
}
interface IProps {
  updateVideo: (video: any) => void;
  addAsset: (asset: any) => void;
  addMusicAsset: (asset: any) => void;
  videoId?: string | null;
  video: Video;
  isVideoUpdating: boolean;
}
const ICON_DIMENSION = 100;
class Editing extends React.Component<IProps, IState> {
  _isMounted: any;
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
    super(props);
    this.state = {
      file: null,
      url: "",
      uploading: false,
      showVideo: true,
      isOpenThumbnailPicker: false,
      isOpenLogoPicker: false,
      isOpenMusicPicker: false,
      newVideoTitle: "",
      logoPath: null,
      logoX: 10,
      logoY: 10,
      text: "",
      btnText: "Skip",
      textColor: "#fff",
      fontSize: 5,
      vAlign: "top",
      align: "left",
      iconPos: "top-left",
      assetUploading: false,
      imagePath: "",
      videoLoaded: false,
      musicTitle: "",
      backgroundMusicUrl: "",
      musicFileSelected: false,
      musicFile: null,
      musicLoadingTimeout: null,
      musicVolume: "0.5",
      updatedThumbnailUrl: "",
      videoHeight: "300px"
    };
    this._isMounted = false;
  }
  container: any;
  componentDidMount() {
    this.s3 = new AWS.S3(config);
    this.setUpCanvasEditing();
    this._isMounted = true;
    this.caluclateContainerHeight();
    window.addEventListener("resize", this.caluclateContainerHeight);
    this._isMounted &&
      setTimeout(() => this.setState({ showVideo: true }), 1000);
  }
  caluclateContainerHeight = () => {
    let calculatedVideoHeight = document.getElementById("wrapper_main")
      ?.clientWidth
      ? `${document.getElementById("wrapper_main")!.clientWidth * 0.5625}px`
      : "300px";
    this.setState({ videoHeight: calculatedVideoHeight });
  };
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
  };
  UNSAFE_componentWillReceiveProps(nextProps: any) {
    this.handleVideoLoaded();
  }
  onAdjustMusicVolume = (e: any) => {
    this.backgroundMusic.volume = e.target.value;
    this.setState({ musicVolume: e.target.value });
  };
  setThumbnailInputRef = (ref: any) => {
    this.thumbnailRef = ref;
  };
  triggerThumbnailUploadBtn = () => {
    this.thumbnailRef.click();
  };
  setMusicInputRef = (ref: any) => {
    this.musicRef = ref;
  };
  triggerMusicUploadBtn = () => {
    this.musicRef.click();
  };
  setLogoInputRef = (ref: any) => {
    this.logoRef = ref;
  };
  triggerLogoUploadBtn = () => {
    this.logoRef.click();
  };
  toggleThumbnailAssetPicker = () => {
    this.setState({ isOpenThumbnailPicker: !this.state.isOpenThumbnailPicker });
  };
  toggleLogoAssetPicker = () => {
    this.setState({ isOpenLogoPicker: !this.state.isOpenLogoPicker });
  };
  toggleMusicAssetPicker = () => {
    this.setState({ isOpenMusicPicker: !this.state.isOpenMusicPicker });
  };
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
  isMusicLoaded = () => {
    if (this.backgroundMusic && this.backgroundMusic.readyState === 4) {
      clearInterval(this.state.musicLoadingTimeout);
      this.setState({ musicLoadingTimeout: null });
      toast.info("Music added");
    }
  };
  onVideoPause = () => {
    this.backgroundMusic.pause();
  };
  onVideoEnd = () => {
    this.backgroundMusic.currentTime = 0;
  };

  onThumbnailFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0] !== null) {
      let file = e.target.files![0];
      this.setState({ uploading: true });
      S3FileUpload.uploadFile(file, config)
        .then((data: any) => {
          this.setState({ url: data.location, uploading: false }, () =>
            this.props.addAsset({ type: "thumbnail", url: this.state.url })
          );
          this.saveChanges();
          return;
        })
        .catch((err: any) => {
          this.setState({ uploading: false });
          toast.error(err);
        });
    } else {
      toast.error("No file selected");
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
      toast.info("Add a title and  click upload to save this asset");
      this.setState({ musicFileSelected: true, musicFile: musicFile });
    } else {
      toast.error("Failed to select a file try again");
    }
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
        Body: this.state.musicFile
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
          assetUploading: false
        });
        this.props.addMusicAsset({
          url: data.Location,
          title: this.state.musicTitle
        });
      });
    }
  };
  onThumbnailAssetPick = (path: any) => {
    this.setState({ url: path }, () => {
      toast.info("Saving your changes");
      this.saveChanges();
    });
  };
  saveChanges = () => {
    if (this.state.url === "") {
      toast.error("Failed to add thumbnail, Please try again");
      return;
    }
    const video = {
      id: this.props.videoId,
      thumbnail: this.state.url
    };
    this.props.updateVideo(video);
    this.setState({ url: "" });
  };
  changeTitle = (e: any) => {
    this.setState({ newVideoTitle: e.target.value });
  };
  updateTitle = () => {
    if (this.state.newVideoTitle === "") {
      toast.error("Please add an title before updating");
      return;
    }
    const video = {
      id: this.props.videoId,
      title: this.state.newVideoTitle
    };
    this.props.updateVideo(video);
    this.setState({ newVideoTitle: "" });
  };
  handleLoadedMetaData = () => {
    this.canvas.width = this.video.clientWidth;
    this.canvas.height = this.video.clientHeight;
    this.canvas2.width = this.video.clientWidth;
    this.canvas2.height = this.video.clientHeight;
    if (
      this.props.video &&
      this.props.video.logoProps &&
      this.props.video.logoProps.position
    ) {
      this.initializeIconPosition(this.props.video.logoProps.position);
    }
  };

  onLogoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
    context2.fillStyle = this.state.textColor;
    canvasTxt.fontSize = (this.state.fontSize / 100) * (width - 80);
    canvasTxt.font = "Arial";
    canvasTxt.vAlign = this.state.vAlign;
    canvasTxt.align = this.state.align;
    canvasTxt.justify = false;
    canvasTxt.lineHeight = null;
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
  onChangeMusicTitle = (e: any) => {
    this.setState({ musicTitle: e.target.value });
  };
  setIconPosition = (position: string) => {
    if (this.state.logoPath === null) {
      toast.info("Please upload a logo");
      return;
    }
    this.setState({ iconPos: position });
    let x, y: any;
    switch (position) {
      case "top-left":
        this.setState({ logoX: 20, logoY: 20 }, () => this.updateCanvas());
        return;
      case "bottom-left":
        x = 20;
        y = this.canvas.height - this.img.height - 20;
        this.setState({ logoX: x, logoY: y }, () => this.updateCanvas());
        return;
      case "bottom-right":
        x = this.canvas.width - this.img.width - 20;
        y = this.canvas.height - this.img.height - 20;
        this.setState({ logoX: x, logoY: y }, () => this.updateCanvas());
        return;
      case "top-right":
        x = this.canvas.width - this.img.width - 20;
        this.setState({ logoX: x, logoY: 20 }, () => this.updateCanvas());
        return;
      default:
        return;
    }
  };
  initializeIconPosition = (position: string) => {
    let x, y: any;
    switch (position) {
      case "top-left":
        this.setState({ logoX: 20, logoY: 20 });
        return;
      case "bottom-left":
        x = 20;
        y = this.canvas.height - ICON_DIMENSION - 20;
        this.setState({ logoX: x, logoY: y });
        return;
      case "bottom-right":
        x = this.canvas.width - ICON_DIMENSION - 20;
        y = this.canvas.height - ICON_DIMENSION - 20;
        this.setState({ logoX: x, logoY: y });
        return;
      case "top-right":
        x = this.canvas.width - ICON_DIMENSION - 20;
        this.setState({ logoX: x, logoY: 20 });
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
        Body: logoBlob
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
  onLogoAssetPick = (path: any) => {
    this.setState({ logoPath: path }, () => this.updateCanvas());
    toast.info("updated");
  };
  onMusicAssetPick = (path: any) => {
    this.setState({ backgroundMusicUrl: path });
    toast.info("Wait while we add the music to the video");
    this.setState({
      musicLoadingTimeout: setInterval(() => this.isMusicLoaded(), 3000)
    });
  };
  updateVideoLogoText = async () => {
    try {
      const textProps = {
        text: this.state.text,
        textColor: this.state.textColor,
        fontSize: this.state.fontSize,
        vAlign: this.state.vAlign,
        align: this.state.align
      };
      const logoProps = {
        url: this.state.logoPath,
        position: this.state.iconPos
      };
      const musicProps = {
        url: this.state.backgroundMusicUrl,
        musicVolume: parseFloat(this.state.musicVolume)
      };
      if (this.props.video) {
        const { video } = this.props;
        if (
          JSON.stringify(video.textProps) !== JSON.stringify(textProps) ||
          JSON.stringify(logoProps) !== JSON.stringify(video.logoProps)
        ) {
          toast.info("Generating new thumbnail", { autoClose: 1000 });
          await this.updateThumbnail();
          toast.info("Thumbnail generated", { autoClose: 1000 });
          const video = {
            id: this.props.videoId,
            logoProps,
            textProps,
            musicProps,
            thumbnail: this.state.updatedThumbnailUrl
          };
          this.props.updateVideo(video);
        } else {
          const video = {
            id: this.props.videoId,
            logoProps,
            textProps,
            musicProps
          };
          this.props.updateVideo(video);
        }
      }
    } catch (error) {
      toast.info("Error in updating");
    }
  };
  updateThumbnail = () => {
    return new Promise((resolve, reject) => {
      const thumbCanvas = this.thumbCanvas;
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
      thumbCanvas.toBlob(async (blob: any) => {
        try {
          await this.uploadUpdatedThumbnail(blob);
          resolve();
        } catch (err) {
          reject();
        }
        resolve();
      }, "image/jpeg");
    });
  };
  uploadUpdatedThumbnail = (blob: any) => {
    return new Promise((resolve, reject) => {
      const thumbnailOptions = {
        Bucket: config.bucketName,
        ACL: config.ACL,
        Key: Date.now().toString() + "thumbnail.jpeg",
        Body: blob
      };
      this.s3.upload(thumbnailOptions, (err: any, data: any) => {
        if (err) {
          reject();
        } else {
          this.setState({ updatedThumbnailUrl: data.Location });
          resolve();
        }
      });
    });
  };
  syncAudio = () => {
    let videoVolume = this.video.volume * 100;
    this.backgroundMusic.volume =
      (parseFloat(this.state.musicVolume) / 100) * videoVolume;
  };
  removeListeners = () => {
    this.video.removeEventListener("canplaythrough", this.handleLoadedMetaData);
    this.video.removeEventListener("pause", this.onVideoPause);
    this.video.removeEventListener("play", this.onVideoPlay);
    this.video.removeEventListener("ended", this.onVideoEnd);
    this.video.removeEventListener("volumechange", this.syncAudio);
    window.removeEventListener("resize", this.caluclateContainerHeight);
  };
  componentWillUnmount() {
    this.removeListeners();
    this._isMounted = false;
  }
  render() {
    const { video, isVideoUpdating } = this.props;
    const {
      showVideo,
      videoLoaded,
      musicFileSelected,
      backgroundMusicUrl
    } = this.state;
    return (
      <div className="editingTabWrapper">
        <Grid container>
          <Grid item xs={1} md={2}></Grid>
          <Grid item xs={10} md={8} id="wrapper_main">
            <div
              ref={ref => {
                this.container = ref;
              }}
              style={{
                visibility: showVideo ? "visible" : "hidden",
                width: "100%",
                height: this.state.videoHeight
              }}
            >
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
            {showVideo === false && (
              <div style={{ position: "absolute", left: "48%", top: "40%" }}>
                <Loading />
              </div>
            )}
          </Grid>
          <Grid item xs={1} md={2}></Grid>
        </Grid>

        <Grid container>
          <Grid item xs={1} md={2}></Grid>
          <Grid item xs={10} md={8}>
            <div className="wrapperEditThumbnail">
              <input
                id="uploadInput"
                type="file"
                onChange={this.onThumbnailFileChange}
                ref={this.setThumbnailInputRef}
                accept="image/x-png,image/gif,image/jpeg"
              />
              <h4 className="thumbnaillEditMsg">
                Customize Thumbnail
                <Tooltip
                  title="upload a thumbnail for your video"
                  placement="top"
                  arrow
                  style={{ marginLeft: "3px" }}
                >
                  <HelpIcon />
                </Tooltip>
              </h4>
              <div className="progressEditing">
                {this.state.uploading && <Loading />}
              </div>
              <div className="progressEditing">
                {isVideoUpdating && <Loading height={60} width={60} />}
              </div>
              <AssetPicker
                isOpen={this.state.isOpenThumbnailPicker}
                toggle={this.toggleThumbnailAssetPicker}
                logoAssets={false}
                onPick={this.onThumbnailAssetPick}
              />
              <div className="btnEditThumbnailWrapper">
                <ThemeButton
                  name="Upload File"
                  onClick={this.triggerThumbnailUploadBtn}
                  style={{
                    background: Colors.themeGreen,
                    color: Colors.white
                  }}
                />
                <ThemeButton
                  name="Select from assets"
                  onClick={this.toggleThumbnailAssetPicker}
                  style={{
                    background: Colors.themeGreen,
                    color: Colors.white
                  }}
                />
              </div>
              <div className="wrapperEditTitle">
                <h4 className="thumbnaillEditMsg">
                  Customize Title
                  <Tooltip
                    title="Customize  title for this video"
                    placement="top"
                    arrow
                    style={{ marginLeft: "3px" }}
                  >
                    <HelpIcon />
                  </Tooltip>
                </h4>
                <TextField
                  placeholder="Add new title"
                  fullWidth
                  type="text"
                  value={this.state.newVideoTitle}
                  name="recieverEmail"
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={this.changeTitle}
                />
                <ThemeButton
                  name="Update title"
                  onClick={this.updateTitle}
                  style={{
                    background: Colors.themeGreen,
                    color: Colors.white,
                    marginTop: "20px"
                  }}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={1} md={2}></Grid>
        </Grid>
        {/* ------update logo and text---- */}
        <div className="wrapperEditLogoText">
          <h2 className="addLogoHeading">Edit Logo and Text</h2>
          <Grid container style={{ position: "relative" }}>
            {!videoLoaded && (
              <span className="progressVideoLoaded">
                <Loading />
              </span>
            )}
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <video
                ref={ref => {
                  this.video = ref;
                }}
                controls={videoLoaded}
                width="100%"
              />
            </Grid>
          </Grid>
          <Grid container style={{ position: "relative" }}>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <canvas
                ref={ref => {
                  this.canvas = ref;
                }}
                style={{ transform: "rotate(-270px)" }}
              />
            </Grid>
          </Grid>
          <canvas
            ref={ref => {
              this.dummyCanvas = ref;
            }}
            style={{ display: "none" }}
          />
          <img
            crossOrigin="anonymous"
            alt="logo"
            src={this.state.logoPath ? this.state.logoPath : null}
            style={{ display: "none" }}
            ref={ref => {
              this.img = ref;
            }}
          />
          <audio
            src={backgroundMusicUrl}
            ref={ref => {
              this.backgroundMusic = ref;
            }}
            loop
            style={{ display: "none" }}
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
                  isOpen={this.state.isOpenLogoPicker}
                  toggle={this.toggleLogoAssetPicker}
                  onPick={this.onLogoAssetPick}
                  logoAssets={true}
                />
                <input
                  id="uploadInput"
                  type="file"
                  onChange={this.onLogoFileChange}
                  ref={this.setLogoInputRef}
                  accept="image/x-png,image/gif,image/jpeg"
                />
                {this.state.assetUploading && <LinearProgress />}
                <Button
                  onClick={this.triggerLogoUploadBtn}
                  style={{
                    color: "#fff",
                    width: "135px",
                    backgroundColor: "#ff4301",
                    margin: "0px 5px 10px 0px"
                  }}
                >
                  Upload
                </Button>
                <Button
                  onClick={this.toggleLogoAssetPicker}
                  style={{
                    color: "#fff",
                    marginLeft: "3px",
                    backgroundColor: "rgb(34, 185, 255)",
                    margin: "0px 5px 10px 0px"
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
                      margin: "0px 5px 10px 0px"
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
                      margin: "0px 5px 10px 0px"
                    }}
                  >
                    Select to Upload
                  </Button>
                )}
                <Button
                  onClick={this.toggleMusicAssetPicker}
                  style={{
                    color: "#fff",
                    backgroundColor: "rgb(34, 185, 255)",
                    margin: "0px 5px 10px 0px"
                  }}
                >
                  Select from Assets
                </Button>

                {musicFileSelected && (
                  <TextField
                    type="text"
                    placeholder="Music Title"
                    name="text"
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
                    />
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
                    style={{ width: "80%" }}
                    step="0.1"
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
          <div style={{ textAlign: "end" }}>
            <ThemeButton
              name="Update"
              onClick={this.updateVideoLogoText}
              style={{
                border: "none",
                background: "#16B272",
                color: "rgb(255, 255, 255)",
                marginTop: "20px",
                marginBottom: "2px",
                outline: "none"
              }}
            />
          </div>
          <canvas
            ref={ref => {
              this.thumbCanvas = ref;
            }}
            height={720}
            width={1280}
            style={{ display: "none" }}
          />
        </div>
      </div>
    );
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
const mapStateToProps = (state: any, ownProps: any) => {
  return {
    video: state.video.singleVideo,
    isVideoUpdating: state.video.isVideoUpdating
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    updateVideo: (video: any) => dispatch(updateVideo(video)),
    addAsset: (asset: any) => dispatch(addAsset(asset)),
    addMusicAsset: (asset: any) => dispatch(addMusicAsset(asset))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Editing);
