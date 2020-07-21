import React from "react";
import AWS from "aws-sdk";
import AssetPicker from "../../components/AssetPicker";
import Loading from "../../components/Loading";
import { connect } from "react-redux";
import { addAsset } from "../../Redux/Actions/asset";
import { config } from "../../config/aws";
import { Grid, Button, Tooltip } from "@material-ui/core";
import { Input, Button as StrapButton } from "reactstrap";
import canvasTxt from "canvas-txt";
import { CompactPicker } from "react-color";
import { toast } from "react-toastify";
import "./style.css";

interface IProps {
  saveLogoBlob: (blob: any) => void;
  moveToNextStep: () => void;
  saveTextLogoProps: (logoProps: any, textProps: any) => void;
  videoToEdit: any;
  saveEditedVideo: (finalBlob: any) => void;
  saveThumbnailBlob: (blob: any) => void;
  addAsset: (asset: any) => void;
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
}
class AddLogo extends React.Component<IProps, IState> {
  video: any;
  upload: any;
  img: any;
  canvas: any;
  canvas2: any;
  cwidth: any;
  cheight: any;
  s3: any;
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
      imagePath: ""
    };
    this.draw = this.draw.bind(this);
  }
  componentDidMount() {
    this.s3 = new AWS.S3(config);
    this.video = this.refs.video;
    this.video.src = URL.createObjectURL(this.props.videoToEdit);
    this.canvas = this.refs.canvas;
    this.canvas2 = this.refs.dummyCanvas;
    this.img = this.refs.image;
    this.img.crossOrigin = "Anonymous";
    const ctx = this.canvas.getContext("2d");
    const ctx2 = this.canvas2.getContext("2d");
    let cw: any, ch: any;
    let that = this;
    this.video.addEventListener("loadedmetadata", this.handleLoadedMetaData);
    this.video.addEventListener(
      "play",
      function() {
        cw = that.video.clientWidth;
        ch = that.video.clientHeight;
        that.canvas.width = cw;
        that.canvas.height = ch;
        that.canvas2.width = cw;
        that.canvas2.height = ch;
        that.draw(that.video, that.img, ctx, ctx2, cw, ch);
      },
      false
    );
  }
  handleLoadedMetaData = () => {
    this.canvas.width = this.video.clientWidth;
    this.canvas.height = this.video.clientHeight;
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
      0,
      0,
      width - 10,
      height - 10
    );
    context2.drawImage(img, this.state.logoX, this.state.logoY);
    let idata = context2.getImageData(0, 0, width, height);
    let that = this;
    context.putImageData(idata, 0, 0);
    setTimeout(function() {
      that.draw(video, img, context, context2, width, height);
    }, 0);
  }
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
            toast.info("logo uploaded, play video to see your logo");
          },
          `${file.type}`,
          1
        );
      };
    };
  }
  saveLogo = (logoBlob: any) => {
    let that = this;
    return new Promise(function(resolve, reject) {
      const logoOptions = {
        Bucket: config.bucketName,
        ACL: config.ACL,
        Key: Date.now().toString() + "logo.jpeg",
        Body: logoBlob
      };
      that.s3.upload(logoOptions, function(err: any, data: any) {
        if (err) {
          toast.error(err);
          that.setState({ logoUploading: false });
          reject();
          return;
        }
        that.setState({ logoPath: data.Location });
        that.props.addAsset({ type: "logo", url: data.Location });
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
        this.setState({ logoX: 10, logoY: 10 });
        return;
      case "bottom-left":
        x = 10;
        y = this.canvas.height - this.img.height - 10;
        this.setState({ logoX: x, logoY: y });
        return;
      case "bottom-right":
        x = this.canvas.width - this.img.width - 10;
        y = this.canvas.height - this.img.height - 10;
        this.setState({ logoX: x, logoY: y });
        return;
      case "top-right":
        x = this.canvas.width - this.img.width - 10;
        this.setState({ logoX: x, logoY: 10 });
        return;
      default:
        return;
    }
  };
  setTextPosition = (position: string) => {
    switch (position) {
      case "top-left":
        this.setState({ align: "left", vAlign: "top" });
        return;
      case "bottom-left":
        this.setState({ align: "left", vAlign: "bottom" });
        return;
      case "bottom-right":
        this.setState({ align: "right", vAlign: "bottom" });
        return;
      case "top-right":
        this.setState({ align: "right", vAlign: "top" });
        return;
      case "center":
        this.setState({ align: "center", vAlign: "middle" });
        return;
      case "center-bottom":
        this.setState({ align: "center", vAlign: "bottom" });
        return;
      default:
        return;
    }
  };
  changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ text: e.target.value });
  };
  handleChangeColor = (color: any) => {
    this.setState({ textColor: color.hex });
  };
  changeFontSize = (e: any) => {
    this.setState({ fontSize: e.target.value });
  };
  moveToNextStep = () => {
    this.getThumbnail();
    this.props.moveToNextStep();
  };
  onAssetPick = (logo: any) => {
    // console.log("logo", logo);
    this.setState({ logoPath: logo.src }, () => {
      this.img.crossOrigin = "Anonymous";
    });
    toast.info("logo selected");
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
  finalize = () => {
    this.getThumbnail();
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
    this.props.saveTextLogoProps(logoProps, textProps);
    this.props.moveToNextStep();
  };
  render() {
    return (
      <Grid container>
        <Grid item xs={1} sm={1} md={1} lg={1}></Grid>
        <Grid item xs={10} sm={10} md={10} lg={10}>
          <div
            style={{
              borderRadius: "4px",
              padding: "10px 30px 10px 30px",
              background: "#fff",
              boxShadow: "0px 0px 3px #d3d3d3"
            }}
          >
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
              alt="logo"
              src={this.state.logoPath ? this.state.logoPath : null}
              style={{ display: "none" }}
              ref="image"
            />
            <Grid container>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <div
                  style={{
                    boxShadow: "0 0 10px #cdcdcd",
                    padding: "31px",
                    marginTop: "51px",
                    marginRight: "30px"
                  }}
                >
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
                  />
                  <input
                    id="uploadInput"
                    type="file"
                    onChange={this.onFileChange}
                    ref={this.setInputRef}
                    accept="image/x-png,image/gif,image/jpeg"
                  />
                  {!this.state.logoUploading ? (
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
                  ) : (
                    <span>
                      <Loading width={35} height={35} />
                    </span>
                  )}
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
                <div
                  style={{
                    boxShadow: "0 0 10px #cdcdcd",
                    padding: "31px",
                    marginTop: "51px",
                    marginLeft: "25px"
                  }}
                >
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
    addAsset: (asset: any) => dispatch(addAsset(asset))
  };
};
export default connect(null, mapDispatchToProps)(AddLogo);
