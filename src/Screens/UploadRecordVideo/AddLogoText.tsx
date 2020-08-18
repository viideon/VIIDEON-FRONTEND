import React from "react";
import AWS from "aws-sdk";
import { withRouter } from "react-router-dom";
import Loading from "../../components/Loading";
import {
  Grid,
  LinearProgress,
  Tooltip,
  TextField,
  Button
} from "@material-ui/core";
import { connect } from "react-redux";
import { Input, Button as StrapButton, FormGroup, Label } from "reactstrap";
import ChipInput from "material-ui-chip-input";
import canvasTxt from "canvas-txt";
import { CompactPicker } from "react-color";
import { toast } from "react-toastify";
import AssetPicker from "../../components/AssetPicker";
import {
  sendVideoToEmail,
  saveVideo,
  toggleSendVariable,
  sendMultipleEmails
} from "../../Redux/Actions/videos";
import * as Constants from "../../constants/constants";
import { reg } from "../../constants/emailRegEx";
import { EmailVideo, VideoSave, MultiEmail } from "../../Redux/Types/videos";
import { addAsset } from "../../Redux/Actions/asset";
import { config } from "../../config/aws";
import HelpIcon from "@material-ui/icons/Help";
import "./style.css";

interface IProps {
  history: any;
  auth: any;
  videoToEdit: any;
  videoUser: any;
  addAsset: (asset: any) => void;
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
  logoUploading: boolean;
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
}
class AddLogoText extends React.Component<IProps, IState> {
  video: any;
  upload: any;
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
      logoPath: null,
      isAssetPicker: false,
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
      thumbnailBlob: "",
      videoProgress: false,
      progressVideo: 0,
      thumbnailUrl: "",
      urlRecord: "",
      title: "",
      emails: [],
      recieverEmail: ""
    };
    this.draw = this.draw.bind(this);
  }
  componentDidMount() {
    this.props.toggleSendVariable();
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
  }
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
    canvasTxt.fontSize = this.state.fontSize;
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
    context2.drawImage(img, this.state.logoX, this.state.logoY);
    let idata = context2.getImageData(0, 0, width, height);
    let that = this;
    context.putImageData(idata, 0, 0);
    setTimeout(function() {
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
    canvasTxt.vAlign = this.state.vAlign;
    canvasTxt.align = this.state.align;
    canvasTxt.lineHeight = 20;
    canvasTxt.fontSize = this.state.fontSize;
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
    this.setState({ fontSize: e.target.value }, () => this.updateCanvas());
  };
  onAssetPick = (path: any) => {
    this.setState({ logoPath: path }, () => this.updateCanvas());
    toast.info("updated");
  };
  getThumbnail = () => {
    return new Promise((resolve, reject) => {
      const thumbCanvas: any = this.refs.thumbCanvas;
      this.video.currenTime = 3;
      thumbCanvas
        .getContext("2d")
        .drawImage(this.video, 0, 0, thumbCanvas.width, thumbCanvas.height);
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
        Body: this.props.videoToEdit
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
  uploadThumbnail = () => {
    return new Promise((resolve, reject) => {
      this.setState({ videoProgress: true, progressVideo: 0 });
      const thumbnailOptions = {
        Bucket: config.bucketName,
        ACL: config.ACL,
        Key: Date.now().toString() + "thumbnail.jpeg",
        Body: this.state.thumbnailBlob
      };

      this.s3
        .upload(thumbnailOptions, (err: any, data: any) => {
          if (err) {
            this.setState({ videoProgress: false });
            reject();
          } else {
            this.setState({
              videoProgress: false,
              thumbnailUrl: data.Location
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
      await this.getThumbnail();
      await this.uploadThumbnail();
      await this.uploadVideo();
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
        title: this.state.title,
        url: this.state.urlRecord,
        userId: this.props.auth!.user!._id,
        thumbnail: this.state.thumbnailUrl,
        textProps: textProps,
        logoProps: logoProps,
        campaign: false
      };
      this.props.saveVideo(video);
    } catch (error) {
      toast.error("Failed to save campaign, Please try again");
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
        recieverEmail
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
        videoId: this.props.savedVideoId
      };
      this.props.sendMultipleEmail(emailVideoObj);
      this.setState({ emails: [] });
    }
  };
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
  handleChipAdd = (email: any) => {
    if (reg.test(email) === false) {
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
    this.props.history.push("/videos");
  };
  render() {
    let { videoSaved, loading } = this.props.videoUser;
    let { progressEmail } = this.props;
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
              {this.state.logoUploading && <LinearProgress />}
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
        <Grid container>
          <Grid item xs={1} sm={1} md={2} lg={2}></Grid>
          <Grid item xs={10} sm={10} md={8} lg={8}>
            <div style={{ marginTop: "30px" }}>
              {videoSaved !== true && (
                <div>
                  {this.state.videoProgress && (
                    <LinearProgress
                      variant="determinate"
                      value={this.state.progressVideo}
                    />
                  )}
                  <FormGroup>
                    <Label className="labelUploadSection">Video Title</Label>
                    <Input
                      type="text"
                      name="name"
                      id="typeInput"
                      placeholder="Give your video an amazing title"
                      value={this.state.title}
                      onChange={this.titleNameHandler}
                    />
                  </FormGroup>
                  <StrapButton
                    style={{
                      border: "none",
                      background: "rgb(34, 185, 255)",
                      color: "rgb(255, 255, 255)"
                    }}
                    disabled={this.state.videoProgress || loading}
                    size="lg"
                    onClick={this.saveVideo}
                  >
                    Save Video
                  </StrapButton>
                </div>
              )}
              <div style={{ marginLeft: "50%", marginTop: "15px" }}>
                {loading && <Loading />}
                {progressEmail && <Loading />}
              </div>
              {videoSaved === true && (
                <div>
                  <FormGroup>
                    <Label className="labelUploadSection">
                      {Constants.SENDER_ADDRESS}
                      <span>
                        <Tooltip
                          title="connect your gmail account in confguration to send email's on your behalf"
                          placement="top"
                          arrow
                        >
                          <HelpIcon />
                        </Tooltip>
                      </span>
                    </Label>
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
                  </FormGroup>

                  <StrapButton
                    style={{
                      border: "none",
                      background: "#16B272",
                      color: "rgb(255, 255, 255)"
                    }}
                    size="lg"
                    onClick={this.submitEmail}
                  >
                    {Constants.SEND_THROUGH_EMAIL}
                  </StrapButton>
                  <FormGroup className="formGroupMultiple">
                    <Label className="labelUploadSection">
                      Broadcast
                      <span>
                        <Tooltip
                          title="connect your gmail account in confguration to send email's on your behalf"
                          placement="top"
                          arrow
                        >
                          <HelpIcon />
                        </Tooltip>
                      </span>
                    </Label>
                    <ChipInput
                      value={this.state.emails}
                      placeholder="Enter email and press enter"
                      fullWidth
                      onAdd={chips => this.handleChipAdd(chips)}
                      onDelete={chip => this.handleDeleteChip(chip)}
                    />
                  </FormGroup>
                  <StrapButton
                    style={{
                      border: "none",
                      background: "#16B272",
                      color: "#fff"
                    }}
                    size="lg"
                    onClick={this.sendMultipleEmail}
                  >
                    Broadcast
                  </StrapButton>
                  <FormGroup style={{ textAlign: "end" }}>
                    <StrapButton
                      style={{
                        border: "none",
                        background: "rgb(34, 185, 255)",
                        color: "rgb(255, 255, 255)",
                        width: "120px"
                      }}
                      size="lg"
                      onClick={this.navigateToVideos}
                    >
                      Done
                    </StrapButton>
                  </FormGroup>
                </div>
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
const mapDispatchToProps = (dispatch: any) => {
  return {
    addAsset: (asset: any) => dispatch(addAsset(asset)),
    sendVideoToEmail: (video: EmailVideo) => dispatch(sendVideoToEmail(video)),
    saveVideo: (video: VideoSave) => dispatch(saveVideo(video)),
    toggleSendVariable: () => dispatch(toggleSendVariable()),
    sendMultipleEmail: (emailVideoObj: MultiEmail) =>
      dispatch(sendMultipleEmails(emailVideoObj))
  };
};
const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
    videoUser: state.video,
    savedVideoId: state.video.savedVideoId,
    progressEmail: state.video.progressEmail
  };
};
export default withRouter<any, any>(
  connect(mapStateToProps, mapDispatchToProps)(AddLogoText)
);
