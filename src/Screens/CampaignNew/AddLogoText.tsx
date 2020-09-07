import React from "react";
import AWS from "aws-sdk";
import AssetPicker from "../../components/AssetPicker";
import MusicAssetPicker from "../../components/MusicAssetPicker";
import { LinearProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { addAsset, addMusicAsset } from "../../Redux/Actions/asset";
import { config } from "../../config/aws";
import { Grid, Button, Tooltip } from "@material-ui/core";
import { Input, Button as StrapButton } from "reactstrap";
import canvasTxt from "canvas-txt";
import { CompactPicker } from "react-color";
import { toast } from "react-toastify";
import { getIconPosition } from "../../lib/helpers";
import "./style.css";

interface IProps {
  saveLogoBlob: (blob: any) => void;
  moveToNextStep: () => void;
  saveTextLogoProps: (logoProps: any, textProps: any, musicProps: any) => void;
  videoToEdit: any;
  saveEditedVideo: (finalBlob: any) => void;
  saveThumbnailBlob: (blob: any) => void;
  addAsset: (asset: any) => void;
  addMusicAsset: (asset: any) => void;
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
  musicTitle: string;
  backgroundMusicUrl: string;
  musicFileSelected: boolean;
  musicFile: any;
  assetUploading: boolean;
  isOpenMusicPicker: boolean;
  musicLoadingTimeout: any;
  musicVolume: string;
}
class AddLogo extends React.Component<IProps, IState> {
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
      musicTitle: "",
      backgroundMusicUrl: "",
      musicFileSelected: false,
      musicFile: null,
      assetUploading: false,
      isOpenMusicPicker: false,
      musicVolume: "0.5",
      musicLoadingTimeout: null,
    };
    this.draw = this.draw.bind(this);
  }
  componentDidMount() {
    this.s3 = new AWS.S3(config);
    this.backgroundMusic = this.refs.backgroundMusic;
    this.video = this.refs.video;
    this.video.src = URL.createObjectURL(this.props.videoToEdit);
    this.canvas = this.refs.canvas;
    this.canvas2 = this.refs.dummyCanvas;
    this.img = this.refs.image;
    this.img.crossOrigin = "Anonymous";
    this.ctx = this.canvas.getContext("2d");
    this.ctx2 = this.canvas2.getContext("2d");
    this.video.addEventListener("loadedmetadata", this.handleLoadedMetaData);
    this.video.addEventListener(
      "play",
      this.onVideoPlay,
      false
    );
    this.video.addEventListener("pause", this.onVideoPause);
    this.video.addEventListener("ended", this.onVideoEnd);
    this.video.addEventListener("volumechange", this.syncAudio);
  }

  handleLoadedMetaData = () => {
    this.canvas.width = this.video.clientWidth;
    this.canvas.height = this.video.clientHeight;
    this.canvas2.width = this.video.clientWidth;
    this.canvas2.height = this.video.clientHeight;
  };

  onVideoPlay = () => {
    if (this.state.backgroundMusicUrl && this.backgroundMusic.readyState !== 4) {
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
  }
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
  }
  toggleMusicAssetPicker = () => {
    this.setState({ isOpenMusicPicker: !this.state.isOpenMusicPicker });
  }
  triggerMusicUploadBtn = () => {
    this.musicRef.click();
  }
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

  draw(
    video: any,
    img: any,
    context: any,
    context2: any,
    width: any,
    height: any
  ): any {
    if (video.paused || video.ended) return false;
    context2.drawImage(video, 0, 0, width, height);
    context2.fillStyle = this.state.textColor;
    canvasTxt.fontSize = (this.state.fontSize / 100) * (width - 80);
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
    context2.drawImage(img, this.state.logoX, this.state.logoY, logoDimension, logoDimension);
    let idata = context2.getImageData(0, 0, width, height);
    let that = this;
    context.putImageData(idata, 0, 0);
    setTimeout(function () {
      that.draw(video, img, context, context2, width, height);
    }, 0);
  }
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
    canvasTxt.fontSize = (this.state.fontSize / 100) * (width - 80);
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
    context2.drawImage(img, this.state.logoX, this.state.logoY, logoDimension, logoDimension);
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
    this.setState({ fontSize: Number(e.target.value) }, () => this.updateCanvas());
  };
  onChangeMusicTitle = (e: any) => {
    this.setState({ musicTitle: e.target.value });
  }
  moveToNextStep = () => {
    this.getThumbnail();
    this.props.moveToNextStep();
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
        this.setState({ backgroundMusicUrl: data.Location, musicFile: null, musicFileSelected: false, assetUploading: false });
        this.props.addMusicAsset({ url: data.Location, title: this.state.musicTitle });
      });
    }
  }
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
  }
  isMusicLoaded = () => {
    if (this.backgroundMusic && this.backgroundMusic.readyState === 4) {
      clearInterval(this.state.musicLoadingTimeout);
      this.setState({ musicLoadingTimeout: null });
      toast.info("Music added");
    }
  }
  onMusicAssetPick = (path: any) => {
    this.setState({ backgroundMusicUrl: path });
    toast.info("Wait while we add the music to the video");
    this.setState({ musicLoadingTimeout: setInterval(() => this.isMusicLoaded(), 3000) });
  }
  onAssetPick = (path: any) => {
    this.setState({ logoPath: path }, () => this.updateCanvas());
    toast.info("updated");
  };
  getThumbnail = () => {
    const thumbCanvas: any = this.refs.thumbCanvas;
    this.video.currenTime = 3;
    thumbCanvas
      .getContext("2d")
      .drawImage(this.video, 0, 0, thumbCanvas.width, thumbCanvas.height);

    thumbCanvas.toBlob((blob: any) => {
      this.props.saveThumbnailBlob(blob);
    }, "image/jpeg");
  };
  getThumbnailWithLogoText = () => {
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
      this.props.saveThumbnailBlob(blob);
    }, "image/jpeg");
  }
  finalize = () => {
    this.getThumbnailWithLogoText();
    const textProps = {
      text: this.state.text,
      textColor: this.state.textColor,
      fontSize: this.state.fontSize,
      vAlign: this.state.vAlign,
      align: this.state.align
    };
    const logoProps = {
      url: this.state.logoPath,
      position: this.state.iconPos,
      width: 50,
      height: 50
    };
    const musicProps = {
      url: this.state.backgroundMusicUrl,
      musicVolume: parseFloat(this.state.musicVolume)
    }
    this.props.saveTextLogoProps(logoProps, textProps, musicProps);
    this.props.moveToNextStep();
  };
  removeListeners = () => {
    this.video.removeEventListener("handleloadedmetadata", this.handleLoadedMetaData);
    this.video.removeEventListener("pause", this.onVideoPause);
    this.video.removeEventListener("play", this.onVideoPlay);
    this.video.removeEventListener("ended", this.onVideoEnd);
    this.video.removeEventListener("volumechange", this.syncAudio);
  }
  syncAudio = () => {
    let videoVolume = this.video.volume * 100;
    this.backgroundMusic.volume = parseFloat(this.state.musicVolume) / 100 * videoVolume;
  }
  onAdjustMusicVolume = (e: any) => {
    this.backgroundMusic.volume = e.target.value;
    this.setState({ musicVolume: e.target.value });
  }
  onVideoPause = () => {
    this.backgroundMusic.pause();
  }
  onVideoEnd = () => {
    this.backgroundMusic.currentTime = 0;
  }
  componentWillUnmount() {
    this.removeListeners();
  }
  render() {
    const { backgroundMusicUrl, musicFileSelected } = this.state;
    return (
      <Grid container>
        <Grid item xs={1} sm={1} md={1} lg={1}></Grid>
        <Grid item xs={10} sm={10} md={10} lg={10}>
          <div className="wrapperAddLogoText">
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
                      title="upload a logo"
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
                      backgroundColor: "#ff4301"
                    }}
                  >
                    Upload
                  </Button>

                  <Button
                    onClick={this.toggleAssetPicker}
                    style={{
                      color: "#fff",
                      marginLeft: "3px",
                      backgroundColor: "rgb(34, 185, 255)"
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
                    <Tooltip
                      title="upload audio music"
                      placement="top"
                    >
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
                  {musicFileSelected && <Button
                    onClick={this.uploadAndSaveMusicAsset}
                    style={{
                      color: "#fff",
                      width: "135px",
                      backgroundColor: "#ff4301"
                    }}
                  >
                    Upload
                  </Button>}
                  {!musicFileSelected && <Button
                    onClick={this.triggerMusicUploadBtn}
                    style={{
                      color: "#fff",
                      backgroundColor: "#ff4301"
                    }}
                  >
                    Select to Upload
                  </Button>}


                  <Button
                    onClick={this.toggleMusicAssetPicker}
                    style={{
                      color: "#fff",
                      marginLeft: "3px",
                      backgroundColor: "rgb(34, 185, 255)"
                    }}
                  >
                    Select from Assets
                  </Button>

                  {musicFileSelected && <Input type="text" placeholder='Music Title' value={this.state.musicTitle} onChange={this.onChangeMusicTitle} style={{ marginTop: "10px" }} />}
                  {backgroundMusicUrl && <div className="musicVolumeAdjust">
                    <label>Adjust music volume</label>
                    <input type="range" value={this.state.musicVolume} onChange={this.onAdjustMusicVolume}
                      min="0" max="1" step="0.1" /> </div>}

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
                  <Input
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
                      {Math.round(this.state.fontSize / 10 * 100)}px
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

            <div className="btnEditVideo">
              <StrapButton
                style={{
                  border: "none",
                  background: "#A9A9A9",
                  color: "rgb(255, 255, 255)",
                  width: "150px",
                  marginRight: "20px"
                }}
                size="lg"
                onClick={this.moveToNextStep}
              >
                Skip
              </StrapButton>
              <StrapButton
                style={{
                  border: "none",
                  background: "rgb(34, 185, 255)",
                  color: "rgb(255, 255, 255)",
                  width: "150px"
                }}
                size="lg"
                onClick={this.finalize}
              >
                Finalize
              </StrapButton>

              <canvas
                ref="thumbCanvas"
                height={720}
                width={1280}
                style={{ display: "none" }}
              />
              <audio src={backgroundMusicUrl} ref="backgroundMusic" loop style={{ display: "none" }} />
            </div>
          </div>
        </Grid>
        <Grid item xs={1} sm={1} md={10} lg={10}></Grid>
      </Grid>
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
const mapDispatchToProps = (dispatch: any) => {
  return {
    addAsset: (asset: any) => dispatch(addAsset(asset)),
    addMusicAsset: (asset: any) => dispatch(addMusicAsset(asset)),
  };
};
export default connect(null, mapDispatchToProps)(AddLogo);
