import React from "react";
import AWS from "aws-sdk";
import S3FileUpload from "react-s3";
import axios from "axios";
import { Container, Row, Col, Input } from "reactstrap";
import { toast } from "react-toastify";
import canvasTxt from "canvas-txt";
import { CompactPicker } from "react-color";
import AssetPicker from "../../components/AssetPicker";
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
import { addAsset } from "../../Redux/Actions/asset";
import { updateVideo } from "../../Redux/Actions/videos";
import CanvasPlayer from "../../components/CanvasPlayer/EditingCanvas";
import { config } from "../../config/aws";
import ThemeButton from "../../components/ThemeButton";
import "./style.css";

interface IState {
  file: File | null;
  url: string;
  uploading: boolean;
  showVideo: boolean;
  isOpenThumbnailPicker: boolean;
  isOpenLogoPicker: boolean;
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
  logoUploading: boolean;
  imagePath: any;
  videoLoaded: boolean;
}
interface Video {
  url: string;
  title: string;
  thumbnail?: string;
  campaign?: boolean;
  logoProps?: any;
  textProps?: any;
  recordingEdit?: boolean;
}
interface IProps {
  updateVideo: (video: any) => void;
  addAsset: (asset: any) => void;
  videoId?: string | null;
  video: Video;
  isVideoUpdating: boolean;
}
const ICON_DIMENSION = 100;
class Editing extends React.Component<IProps, IState> {
  _isMounted: any;
  video: any;
  thumbnailRef: any;
  logoRef: any;
  img: any;
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
      file: null,
      url: "",
      uploading: false,
      showVideo: true,
      isOpenThumbnailPicker: false,
      isOpenLogoPicker: false,
      newVideoTitle: "",
      logoPath: null,
      logoX: 10,
      logoY: 10,
      text: "",
      btnText: "Skip",
      textColor: "#fff",
      fontSize: 30,
      vAlign: "top",
      align: "left",
      iconPos: "top-left",
      logoUploading: false,
      imagePath: "",
      videoLoaded: false
    };
    this._isMounted = false;
  }
  container: any;
  componentDidMount() {
    this.s3 = new AWS.S3(config);
    this.setUpCanvasEditing();
    this._isMounted = true;
    this.container = this.refs.container;
    this._isMounted &&
      setTimeout(() => this.setState({ showVideo: true }), 1000);
  }
  setUpCanvasEditing = () => {
    this.video = this.refs.video;
    this.canvas = this.refs.canvas;
    this.canvas2 = this.refs.dummyCanvas;
    this.img = this.refs.image;
    this.video.crossOrigin = "Anonymous";
    this.img.crossOrigin = "Anonymous";
    this.ctx = this.canvas.getContext("2d");
    this.ctx2 = this.canvas2.getContext("2d");
    // this.video.addEventListener("loadedmetadata", this.handleLoadedMetaData);
    this.video.addEventListener("canplaythrough", this.handleLoadedMetaData);
    this.video.addEventListener(
      "play",
      () => {
        this.draw(
          this.video,
          this.img,
          this.ctx,
          this.ctx2,
          this.video.clientWidth,
          this.video.clientHeight
        );
      },
      false
    );
  };
  componentWillReceiveProps(nextProps: any) {
    const { video } = nextProps;
    if (video) {
      axios({
        url: video.url,
        method: "GET",
        responseType: "blob" // important
      }).then((response: any) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        this.video.src = url;
        this.setState({ videoLoaded: true });
      });
      const { logoProps, textProps } = video;
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
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  setThumbnailInputRef = (ref: any) => {
    this.thumbnailRef = ref;
  };
  triggerThumbnailUploadBtn = () => {
    this.thumbnailRef.click();
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
    canvasTxt.fontSize = this.state.fontSize;
    canvasTxt.font = "Arial";
    canvasTxt.vAlign = this.state.vAlign;
    canvasTxt.align = this.state.align;
    canvasTxt.justify = false;
    canvasTxt.lineHeight = null;
    // canvasTxt.debug = true;
    // context2.font = `${this.state.fontSize}px Arial`;
    canvasTxt.drawText(
      context2,
      this.state.text,
      30,
      30,
      width - 50,
      height - 50
    );
    context2.drawImage(img, this.state.logoX, this.state.logoY);
    let idata = context2.getImageData(0, 0, width, height);
    let that = this;
    context.putImageData(idata, 0, 0);
    setTimeout(function () {
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
    canvasTxt.fontSize = this.state.fontSize;
    // context2.font = `${this.state.fontSize}px Arial`;
    // context2.font = context2.font.replace(/\d+px/, `${this.state.fontSize}px`);
    // canvasTxt.debug = true;
    canvasTxt.drawText(
      context2,
      this.state.text,
      30,
      30,
      width - 50,
      height - 50
    );
    context2.drawImage(img, this.state.logoX, this.state.logoY);
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
    this.setState({ fontSize: e.target.value }, () => this.updateCanvas());
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
    // debugger;
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
    this.setState({ logoUploading: true });
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
            // this.setState({ img: URL.createObjectURL(blob) });
            await this.saveLogo(blob);
            this.setState({ logoUploading: false });
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
          this.setState({ logoUploading: false });
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
  updateVideoLogoText = () => {
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
    const video = {
      id: this.props.videoId,
      logoProps,
      textProps
    };
    this.props.updateVideo(video);
  };
  render() {
    const { video, isVideoUpdating } = this.props;
    const { showVideo, videoLoaded } = this.state;
    return (
      <div className="editingTabWrapper" >
        <Container>
          <Row>
            <Col xs="1" md="2"></Col>
            <Col xs="10" md="8" id="wrapper_main">
              <div
                ref="container"
                style={{
                  visibility: showVideo ? "visible" : "hidden",
                  width: "100%",
                  height: document.getElementById('wrapper_main') ? `${document.getElementById('wrapper_main')!.clientWidth * 0.5625}px` : `300px`
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
                  />
                )}
              </div>
              {showVideo === false && (
                <div style={{ position: "absolute", left: "48%", top: "40%" }}>
                  <Loading />
                </div>
              )}
            </Col>
            <Col xs="1" md="2"></Col>
          </Row>
          <Row>
            <Col></Col>
          </Row>
          <Row>
            <Col xs="1" md="2"></Col>
            <Col xs="10" md="8">
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
                      border: "none",
                      background: "#16B272",
                      color: "rgb(255, 255, 255)",
                      marginBottom: "2px",
                      outline: "none"
                    }}
                  />
                  <ThemeButton
                    name="Select from assets"
                    onClick={this.toggleThumbnailAssetPicker}
                    style={{
                      border: "none",
                      background: "#16B272",
                      color: "rgb(255, 255, 255)",
                      marginBottom: "2px",
                      outline: "none"
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
                      border: "none",
                      background: "#16B272",
                      color: "rgb(255, 255, 255)",
                      marginTop: "20px",
                      marginBottom: "2px",
                      outline: "none"
                    }}
                  />
                </div>
              </div>
            </Col>
            <Col xs="1" md="2"></Col>
          </Row>
        </Container>
        {/* ------update logo and text---- */}
        <div className="wrapperEditLogoText">
          <h2 className="addLogoHeading">Edit Logo and Text</h2>
          <Grid container style={{ position: "relative" }}>
            {!videoLoaded && (
              <span className="progressVideoLoaded">
                <Loading />
              </span>
            )}
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              style={{ paddingRight: "5px" }}
            >
              <video ref="video" controls={videoLoaded} width="100%" />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              style={{ paddingLeft: "5px" }}
            >
              <canvas ref="canvas" style={{ transform: 'rotate(-270px)' }} />
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
                {this.state.logoUploading && <LinearProgress />}
                <Button
                  onClick={this.triggerLogoUploadBtn}
                  style={{
                    color: "#fff",
                    width: "135px",
                    backgroundColor: "#ff4301"
                  }}
                >
                  Upload
                </Button>

                <Button
                  onClick={this.toggleLogoAssetPicker}
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
                    min="10"
                    max="100"
                    style={{ width: "80%" }}
                    value={this.state.fontSize}
                    onChange={this.changeFontSize}
                  ></input>
                  <span style={{ width: "10%", padding: "10px" }}>
                    {this.state.fontSize}px
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
    addAsset: (asset: any) => dispatch(addAsset(asset))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Editing);
