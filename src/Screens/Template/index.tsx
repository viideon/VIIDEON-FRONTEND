import React from "react";
import { connect } from "react-redux"
import Header from "../../components/Header/Header";
import AWS from "aws-sdk";
import { config } from "../../config/aws";
import { Grid, Typography, CardMedia, Button, LinearProgress, TextField } from "@material-ui/core";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { availableTheme } from "../../constants/constants";
import { toast } from 'react-toastify';
import { SketchPicker } from 'react-color';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';


import { previewTemplate, saveTemplateSetting } from '../../Redux/Actions/asset';
import "./style.css";

const s3 = new AWS.S3(config);
interface IProps {
  getPreview: (settings: any) => void;
  saveSettings: (settings: any) => void;
  preview: any;
  user: any;
}

class Overview extends React.Component<IProps> {
  fileRef: any;

  state = {
    assetUploading: false,
    logoBlob: undefined,
    img: null,
    name: "",
    text: "",
    colors: {
      background: "",
      primary: "",
      accent: "",
      link: "",
      text1: "",
      text2: ""
    },
  };

  componentDidMount() {
  }
  componentWillUnmount() {
  }

  renderStep = (step: any, index: number) => {
    return (
      <div className="stepHead" key={index}>
        <h4> {index + 1} </h4>
        <Typography variant="h5">{step.title}</Typography>
      </div>
    )
  }

  onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0] !== null) {
      if (!e.target.files![0].name.match(/\.(jpg|jpeg|png)$/)) {
        toast.error("Please add valid image");
        return;
      }
      await this.compress(e.target.files![0]);
    } else {
      toast.error("error in selecting file");
    }
  };

  compress(file: any) {
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
            await this.storeLogo(blob);
          },
          `${file.type}`,
          1
        );
      };
    };
  }

  onChange = (e: any) => {
    let newState: any = this.state;
    newState[e.target.name] = e.target.value;
    this.setState({newState});
  }

  getPrivew = () => {
    const { name, colors, text, img } = this.state;
    if(!name) return toast.error("choose a template first")
    let settings = {
      name,
      colors,
      text,
      logoUrl: img
    }
    this.props.getPreview(settings);
  }

  storeLogo = (logoBlob: any) => {
    this.setState({assetUploading: false, logoBlob, img: URL.createObjectURL(logoBlob)})
  };

  uploadLogo = () => {
    toast.info("Uploading logo please wait");
    this.setState({ assetUploading: true });
    const { logoBlob } = this.state;
    return new Promise((resolve, reject) => {
      const logoOptions = {
        Bucket: config.bucketName,
        ACL: config.ACL,
        Key: Date.now().toString() + "logo.jpeg",
        Body: logoBlob
      };
      s3.upload(logoOptions, (err: any, data: any) => {
        if (err) {
          toast.error(err);
          this.setState({ assetUploading: false });
          reject();
          return;
        }
        this.setState({ logoPath: data.Location, img: data.Location });
        toast.info("Logo uploaded");
        resolve();
      });
    });
  }

  onColorChagne = (colors: any) => {
    this.setState({colors})
  }

  saveSettings = () => {
    const { name, colors, text, img } = this.state;
    if(!name) return toast.error("choose a template first")
    let settings = {
      name,
      colors,
      text,
      logoUrl: img,
      userId: this.props.user
    }
    this.props.saveSettings(settings);
    toast.info("Saving Settings")
  }

  render() {
    const { colors, name, img, text, assetUploading } = this.state;
    return (
      <>
        <Header styles={{ backgroundImage: "linear-gradient(-90deg, rgb(97, 181, 179), rgb(97, 181, 179), rgb(252, 179, 23))" }} />
        <div className="templatePrefWrapper">
          <Grid container>
            <Grid container xs={12} sm={12} md={5} lg={5} className="tempPreviewWrapper">
              <Grid item xs={12} sm={12} md={12} lg={12} >
                <Typography variant="h4">Template Preview</Typography>
                <FormControl variant="outlined" fullWidth >
                  <InputLabel id="selectTemplateTheme">Select Template</InputLabel>
                  <Select
                    labelId="selectTemplateTheme"
                    id="selectTemplate"
                    name="name"
                    value={name}
                    onChange={this.onChange}
                  >
                    {
                      availableTheme && availableTheme.map((theme, index) => {
                        return <MenuItem key={index} value={theme.name}> {theme.name} </MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} style={{ overflow: "scroll", marginTop: "10px"}}>
                {
                this.props.preview &&<div dangerouslySetInnerHTML={{__html: this.props.preview}}></div>
                }
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5} className="tempEditToolsWrapper">
              <Grid container xs={12} sm={12} md={12} lg={12} className="tempEditLogoWrapper">
                {assetUploading && <LinearProgress />}
                <Typography variant="h4">Logo</Typography>
                <Grid xs={12} sm={4} >
                  {
                    img ?
                      <CardMedia component="img" height="180" className="logoIMGs" image={img || ""} />
                      :
                      <div className="logoIMG" style={{ width: "180px", height: "180px" }}><InsertPhotoIcon /></div>
                  }
                </Grid>
                <Grid xs={12} sm={4} style={{ alignSelf: "flex-end"}}>
                  <input type="file" ref={ref => { this.fileRef = ref }} onChange={this.onFileChange} style={{ display: 'none' }} />
                  <Button style={{ border: "1px solid #fcb41f", background: "transparent", color: "#fcb41f" , width: "80%", marginBottom: "9px"}} onClick={() => this.fileRef.click()}> Chose file </Button>
                  <Button style={{ background: "#fcb41f", color: "#fff", width: "80%" }} onClick={this.uploadLogo}> Upload Logo </Button>
                  <p style={{ fontSize: "smaller" }}>*Image must be less than 2mb</p>
                </Grid>
              </Grid>
              <Grid container xs={12} sm={12} md={12} lg={12} className="tempEditColorWrapper">
                <Typography variant="h4">Colors</Typography>
                <p>Click a color to change</p>
                <Colors {...this.state} onColorChagne={this.onColorChagne} />
              </Grid>
              <Grid container xs={12} sm={12} md={12} lg={12} className="tempEditMessageWrapper">
                <Typography variant="h4">Edit Message</Typography>
                <p>Click the editor below to change your message</p>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField rowsMax={5} multiline fullWidth name="text" value={text} onChange={this.onChange} id="editMessage" variant="outlined" />
                </Grid>
                <ActionBtns onPreview={this.getPrivew} saveSettings={this.saveSettings} />
              </Grid>
            </Grid>
          </Grid>

        </div>
      </>
    );
  }
}

const Colors = (props: any) => {
  const { useState } = React;
  const { colors, onColorChagne } = props;
  const {background, primary, accent, link, text1, text2} = colors;
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const openColorChanger = (name: string) => {
    setName(name)
    setOpen(true)
  }
  const handlePicker = (color: any) => {
    let newColor = colors;
    newColor[name] = color.hex;
    onColorChagne(newColor);
    setName("");
    setOpen(false);
  }
  return (
    <Grid container xs={12} sm={12} md={12} lg={12}>
      <Grid container xs={12} sm={12} md={12} lg={12}>
        <Grid item xs={12} sm={6} md={6} lg={6} className="colorCircleWrapper">
          <div className="colorCircles" onClick={() => {openColorChanger("primary")}} style={{ color: primary ? primary : "" , background: primary ? primary : ""}}></div>
          <p className="colorName">Primary Color</p>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} className="colorCircleWrapper">
          <div className="colorCircles" onClick={() => {openColorChanger("background")}} style={{ color: background ? background : "" , background: background ? background : ""}}></div>
          <p className="colorName">Background Color</p>
        </Grid>
      </Grid>
      <Grid container xs={12} sm={12} md={12} lg={12}>
        <Grid item xs={12} sm={6} md={6} lg={6} className="colorCircleWrapper">
          <div className="colorCircles" onClick={() => {openColorChanger("text1")}} style={{ color: text1 ? text1 : "" , background: text1 ? text1 : ""}}></div>
          <p className="colorName">Text 1</p>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} className="colorCircleWrapper">
          <div className="colorCircles" onClick={() => {openColorChanger("accent")}} style={{ color: accent ? accent : "" , background: accent ? accent : ""}}></div>
          <p className="colorName">Accent</p>
        </Grid>
      </Grid>
      <Grid container xs={12} sm={12} md={12} lg={12}>
        <Grid item xs={12} sm={6} md={6} lg={6} className="colorCircleWrapper">
          <div className="colorCircles" onClick={() => {openColorChanger("text2")}} style={{ color: text2 ? text2 : "" , background: text2 ? text2 : ""}}></div>
          <p className="colorName">Text 2</p>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} className="colorCircleWrapper">
          <div className="colorCircles" onClick={() => {openColorChanger("link")}} style={{ color: link ? link : "" , background: link ? link : ""}}></div>
          <p className="colorName">Links</p>
        </Grid>
      </Grid>
      <ColorPickerDialog open={open} handlePicker={handlePicker} name={name} />
    </Grid>
  )
}

const ActionBtns = (props: any) => {
  const { onPreview, saveSettings } = props;
  return (
    <Grid container className="actionBTNsWrapper">
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <Button
          color="default"
          className="previewBTN"
          onClick={onPreview}
        >
          Previews
        </Button>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <Button
          color="default"
          className="saveChangesBTN"
          onClick={saveSettings}
        >
          Save Changes
        </Button>
      </Grid>
    </Grid>
  )
}

const ColorPickerDialog = (props: any) => {
  const { open, name, handlePicker } = props;
  const [color, setColor]: any = React.useState();
  return (
    <Dialog onClose={handlePicker} aria-labelledby="customized-dialog-title" open={open}>
      <MuiDialogTitle id="customized-dialog-title">
        Pick {name} color
      </MuiDialogTitle>
      <MuiDialogContent>
        <SketchPicker color={color} onChangeComplete={(color: any) => setColor(color)} />
      </MuiDialogContent>
      <MuiDialogActions>
        <Button onClick={() => handlePicker(color)} color="primary">
          Save changes
        </Button>
      </MuiDialogActions>
    </Dialog>
  )
}

const mapStateToProps = (state: any) => {
  return {
    preview: state.asset.preview,
    user: state.auth.user,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getPreview: (settings: any) => dispatch(previewTemplate(settings)),
    saveSettings: (settings: any) => dispatch(saveTemplateSetting(settings)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Overview);
