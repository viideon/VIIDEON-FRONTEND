import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { config } from "../../config/aws";
import { Grid, Tooltip, LinearProgress, TextField } from "@material-ui/core";
import Loading from "../../components/Loading";
import ThemeButton from "../../components/ThemeButton";
import AssetPicker from "../../components/AssetPicker";
import MusicAssetPicker from "../../components/MusicAssetPicker";
import { addAsset, addMusicAsset } from "../../Redux/Actions/asset";
import { updateVideo } from "../../Redux/Actions/videos";
import AWS from "aws-sdk";
import S3FileUpload from "react-s3";
import canvasTxt from "canvas-txt";
import { CompactPicker } from "react-color";
import { getIconPosition } from "../../lib/helpers";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
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
interface EditorProps {
  video?: Video;
  type?: string;
  toggle: () => void;
  updateVideo: (video: any) => void;
  addAsset: (asset: any) => void;
  addMusicAsset: (asset: any) => void;
}
interface EditState {
  file: File | null;
  url: string;
  uploading: boolean;
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
  open: boolean;
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
  ctx: any;
  ctx2: any;
  dummyCanvas: any;
  thumbCanvas: any;
  constructor(props: any) {
    super(props);
    this.video = React.createRef();
    this.state = {
      file: null,
      url: "",
      uploading: false,
      isOpenThumbnailPicker: false,
      isOpenLogoPicker: false,
      isOpenMusicPicker: false,
      newVideoTitle: "",
      logoPath: null,
      logoX: 10,
      logoY: 10,
      text: "",
      btnText: "Skip",
      textColor: "#0f2733",
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
      videoHeight: "300px",
      open: true,
    };
  }
  container: any;
  componentDidMount() {
    this.setUpCanvasEditing();
    this.caluclateContainerHeight();
    window.addEventListener("resize", this.caluclateContainerHeight);
  }
  caluclateContainerHeight = () => {
    let calculatedVideoHeight = document.getElementById("wrapper_main")
      ?.clientWidth
      ? `${document.getElementById("wrapper_main")!.clientWidth * 0.5625}px`
      : "300px";
    this.setState({ videoHeight: calculatedVideoHeight });
  };
  setUpCanvasEditing = () => {
    if (this.video.current) {
      this.video = this.video.current;
      this.video.crossOrigin = "Anonymous";
      this.video.addEventListener("canplaythrough", this.handleLoadedMetaData);
      this.video.addEventListener("pause", this.onVideoPause);
      this.video.addEventListener("play", this.onVideoPlay);
      this.video.addEventListener("ended", this.onVideoEnd);
      this.video.addEventListener("volumechange", this.syncAudio);
      this.img.crossOrigin = "Anonymous";
      this.canvas2 = this.dummyCanvas;
      this.ctx = this.canvas.getContext("2d");
      this.ctx2 = this.canvas2.getContext("2d");
      this.handleVideoLoaded();
      return;
    }
    setTimeout(() => {
      this.setUpCanvasEditing();
    }, 100);
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
              musicVolume: musicProps.musicVolume.toString(),
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
          align: textProps.align,
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
        Body: this.state.musicFile,
      };
      s3.upload(musicOptions, (err: any, data: any) => {
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
      id: this.props?.video?._id,
      thumbnail: this.state.url,
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
      id: this.props.video?._id,
      title: this.state.newVideoTitle,
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
        y = this.canvas.height - this.img.height - 40;
        this.setState({ logoX: x, logoY: y }, () => this.updateCanvas());
        return;
      case "bottom-right":
        x = this.canvas.width - this.img.width - 40;
        y = this.canvas.height - this.img.height - 40;
        this.setState({ logoX: x, logoY: y }, () => this.updateCanvas());
        return;
      case "top-right":
        x = this.canvas.width - this.img.width - 40;
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
        Body: logoBlob,
      };
      s3.upload(logoOptions, (err: any, data: any) => {
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
      musicLoadingTimeout: setInterval(() => this.isMusicLoaded(), 3000),
    });
  };
  updateVideoLogoText = async () => {
    try {
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
            id: this.props.video._id,
            logoProps,
            textProps,
            musicProps,
            thumbnail: this.state.updatedThumbnailUrl,
          };
          this.props.updateVideo(video);
        } else {
          const video = {
            id: this.props.video._id,
            logoProps,
            textProps,
            musicProps,
          };
          this.props.updateVideo(video);
        }
        this.handleClose();
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
        Body: blob,
      };
      s3.upload(thumbnailOptions, (err: any, data: any) => {
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
  }
  handleClose = () => {
    this.setState({ open: false });
    this.props.toggle();
  };
  render() {
    const { type } = this.props;
    const { videoLoaded, backgroundMusicUrl, open } = this.state;
    return (
      <div>
        <Dialog
          fullWidth={true}
          maxWidth={"lg"}
          open={open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title"> Edit {type} </DialogTitle>
          <DialogContent>
            <div className="wrapperEditLogoText">
              <Grid container style={{ position: "relative" }}>
                {!videoLoaded && (
                  <span className="progressVideoLoaded">
                    <Loading />
                  </span>
                )}
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <video ref={this.video} controls={videoLoaded} width="100%" />
                </Grid>
              </Grid>
              <Grid container style={{ position: "relative" }}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <canvas
                    ref={(ref) => {
                      this.canvas = ref;
                    }}
                    style={{ transform: "rotate(-270px)" }}
                  />
                </Grid>
              </Grid>
              <canvas
                ref={(ref) => {
                  this.dummyCanvas = ref;
                }}
                style={{ display: "none" }}
              />
              <img
                crossOrigin="anonymous"
                alt="logo"
                src={this.state.logoPath ? this.state.logoPath : null}
                style={{ display: "none" }}
                ref={(ref) => {
                  this.img = ref;
                }}
              />
              <audio
                src={backgroundMusicUrl}
                ref={(ref) => {
                  this.backgroundMusic = ref;
                }}
                loop
                style={{ display: "none" }}
              />
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  style={{ display: type === "Text" ? "none" : "" }}
                >
                  <div className="addLogoDiv">
                    {type === "Logo" && (
                      <EditLogo
                        {...this.state}
                        logoRef={(ref: any) => {
                          this.logoRef = ref;
                        }}
                        logoRefClick={() => this.logoRef.click()}
                        toggleLogoAssetPicker={this.toggleLogoAssetPicker}
                        onLogoAssetPick={this.onLogoAssetPick}
                        onLogoFileChange={this.onLogoFileChange}
                        setIconPosition={this.setIconPosition}
                      />
                    )}
                    {type === "Music" && (
                      <EditMusic
                        {...this.state}
                        musicRef={(ref: any) => {
                          this.musicRef = ref;
                        }}
                        musicRefClick={() => this.musicRef.click()}
                        toggleMusicAssetPicker={this.toggleMusicAssetPicker}
                        onMusicAssetPick={this.onMusicAssetPick}
                        onMusicInputChange={this.onMusicInputChange}
                        uploadAndSaveMusicAsset={this.uploadAndSaveMusicAsset}
                        onChangeMusicTitle={this.onChangeMusicTitle}
                        onAdjustMusicVolume={this.onAdjustMusicVolume}
                      />
                    )}
                  </div>
                </Grid>
                {type === "Text" && (
                  <EditText
                    {...this.state}
                    changeText={this.changeText}
                    setTextPosition={this.setTextPosition}
                    changeFontSize={this.changeFontSize}
                    handleChangeColor={this.handleChangeColor}
                  />
                )}
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
                    outline: "none",
                  }}
                />
              </div>
              <canvas
                ref={(ref) => {
                  this.thumbCanvas = ref;
                }}
                height={720}
                width={1280}
                style={{ display: "none" }}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const EditText = (props: any) => {
  const {
    text,
    fontSize,
    textColor,
    changeText,
    setTextPosition,
    changeFontSize,
    handleChangeColor,
  } = props;
  return (
    <Grid item xs={12} sm={12} md={12} lg={12}>
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
          value={text}
          onChange={changeText}
          style={{ width: "80%" }}
        />
        <h5 className="positionTxt">Change Text Position</h5>
        <Button
          style={logoPositionBtn}
          onClick={() => setTextPosition("center")}
        >
          Center
        </Button>
        <Button
          style={logoPositionBtn}
          onClick={() => setTextPosition("center-bottom")}
        >
          Center Bottom
        </Button>
        <Button
          style={logoPositionBtn}
          onClick={() => setTextPosition("top-left")}
        >
          Top Left
        </Button>
        <Button
          style={logoPositionBtn}
          onClick={() => setTextPosition("top-right")}
        >
          Top Right
        </Button>
        <Button
          style={logoPositionBtn}
          onClick={() => setTextPosition("bottom-left")}
        >
          Bottom Left
        </Button>
        <Button
          style={logoPositionBtn}
          onClick={() => setTextPosition("bottom-right")}
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
            value={fontSize}
            onChange={changeFontSize}
          />
          <span style={{ width: "10%", padding: "10px" }}>
            {Math.round((fontSize / 10) * 100)}px
          </span>
        </div>
        <h5 className="positionTxt">
          Choose Text Color
          <span className="optionalText">(optional)</span>
        </h5>
        <CompactPicker color={textColor} onChangeComplete={handleChangeColor} />
      </div>
    </Grid>
  );
};
const EditLogo = (props: any) => {
  const {
    isOpenLogoPicker,
    assetUploading,
    toggleLogoAssetPicker,
    onLogoAssetPick,
    onLogoFileChange,
    setIconPosition,
    logoRef,
    logoRefClick,
  } = props;
  return (
    <>
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
        isOpen={isOpenLogoPicker}
        toggle={toggleLogoAssetPicker}
        onPick={onLogoAssetPick}
        logoAssets={true}
      />
      <input
        id="uploadInput"
        type="file"
        onChange={onLogoFileChange}
        ref={logoRef}
        accept="image/x-png,image/gif,image/jpeg"
      />
      {assetUploading && <LinearProgress />}
      <Button
        onClick={logoRefClick}
        style={{
          color: "#fff",
          width: "135px",
          backgroundColor: "#ff4301",
          margin: "0px 5px 10px 0px",
        }}
      >
        Upload
      </Button>
      <Button
        onClick={toggleLogoAssetPicker}
        style={{
          color: "#fff",
          marginLeft: "3px",
          backgroundColor: "rgb(34, 185, 255)",
          margin: "0px 5px 10px 0px",
        }}
      >
        Select from Assets
      </Button>
      <h5 className="positionTxt">Change Logo Position</h5>
      <Button
        style={logoPositionBtn}
        onClick={() => setIconPosition("top-left")}
      >
        Top Left
      </Button>
      <Button
        style={logoPositionBtn}
        onClick={() => setIconPosition("top-right")}
      >
        Top Right
      </Button>
      <Button
        style={logoPositionBtn}
        onClick={() => setIconPosition("bottom-left")}
      >
        Bottom Left
      </Button>
      <Button
        style={logoPositionBtn}
        onClick={() => setIconPosition("bottom-right")}
      >
        Bottom Right
      </Button>
    </>
  );
};
const EditMusic = (props: any) => {
  const {
    isOpenMusicPicker,
    musicTitle,
    musicVolume,
    musicFileSelected,
    backgroundMusicUrl,
    toggleMusicAssetPicker,
    onMusicAssetPick,
    onMusicInputChange,
    uploadAndSaveMusicAsset,
    onChangeMusicTitle,
    onAdjustMusicVolume,
    musicRef,
    musicRefClick,
  } = props;
  return (
    <>
      <h3 className="addLogoMessage">
        Add Music
        <Tooltip title="upload audio music" placement="top">
          <span style={iconStyle}>
            <i className="fas fa-info"></i>
          </span>
        </Tooltip>
      </h3>
      <MusicAssetPicker
        isOpen={isOpenMusicPicker}
        toggle={toggleMusicAssetPicker}
        onPick={onMusicAssetPick}
      />
      <input
        id="uploadInput"
        type="file"
        onChange={onMusicInputChange}
        ref={musicRef}
        accept="audio/*"
      />
      {musicFileSelected && (
        <Button
          onClick={uploadAndSaveMusicAsset}
          style={{
            color: "#fff",
            width: "135px",
            backgroundColor: "#ff4301",
            margin: "0px 5px 10px 0px",
          }}
        >
          Upload
        </Button>
      )}
      {!musicFileSelected && (
        <Button
          onClick={musicRefClick}
          style={{
            color: "#fff",
            backgroundColor: "#ff4301",
            margin: "0px 5px 10px 0px",
          }}
        >
          Select to Upload
        </Button>
      )}
      <Button
        onClick={toggleMusicAssetPicker}
        style={{
          color: "#fff",
          backgroundColor: "rgb(34, 185, 255)",
          margin: "0px 5px 10px 0px",
        }}
      >
        Select from Assets
      </Button>
      {musicFileSelected && (
        <TextField
          type="text"
          placeholder="Music Title"
          name="text"
          value={musicTitle}
          onChange={onChangeMusicTitle}
          style={{ marginTop: "10px" }}
        />
      )}
      {backgroundMusicUrl && (
        <div className="musicVolumeAdjust">
          <label>Adjust music volume</label>
          <input
            type="range"
            value={musicVolume}
            onChange={onAdjustMusicVolume}
            min="0"
            max="1"
            step="0.1"
          />
        </div>
      )}
    </>
  );
};

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

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    isVideoUpdating: state.video.isVideoUpdating,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateVideo: (video: any) => dispatch(updateVideo(video)),
    addAsset: (asset: any) => dispatch(addAsset(asset)),
    addMusicAsset: (asset: any) => dispatch(addMusicAsset(asset)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VideoEditor);
