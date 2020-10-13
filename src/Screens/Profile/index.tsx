import React, { Component } from "react";
import AWS from "aws-sdk";
import { connect } from "react-redux";
import { FaInfoCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { Tooltip, TextField, Grid } from "@material-ui/core";
import { updateProfileUser } from "../../Redux/Actions/profile";
import { addAsset } from "../../Redux/Actions/asset";
import { ProfileState, UserProfile } from "../../Redux/Types/profile";
import { AuthState } from "../../Redux/Types/auth";
import profileImg from "../../assets/profileImages/profileImg.png";
import TimeZone from "../../components/TimeZone/Data/timezone.json";
import * as Constants from "../../constants/constants";
import { config } from "../../config/aws";
import Loading from "../../components/Loading";
import ThemeButton from "../../components/ThemeButton";
import Header from "../../components/Header/Header";

import "./style.css";

type IProps = {
  history: any;
  auth: AuthState;
  navigation: any;
  profile: ProfileState;
  updateProfile: (userProfile: UserProfile) => void;
  addAsset: (asset: any) => void;
};

type IState = {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  mobileNumber: string;
  timeZone: string;
  businessPhone: string;
  webAddress: string;
  title: string;
  affiliateId: string;
  url: string;
  avatarUploading: boolean;
};
class Profile extends Component<IProps, IState> {
  s3: any = new AWS.S3(config);
  file: any;
  constructor(props: any) {
    super(props);
    this.state = {
      email: this.props.profile!.user!.email || "",
      firstName: this.props.profile!.user!.firstName || "",
      lastName: this.props.profile!.user!.lastName || "",
      userName: this.props.profile!.user!.userName || "",
      mobileNumber: this.props.profile!.user!.mobileNumber || "",
      timeZone: this.props.profile!.user!.timeZone || "",
      businessPhone: this.props.profile!.user!.businessPhone || "",
      webAddress: this.props.profile!.user!.webAddress || "",
      title: this.props.profile!.user!.title || "",
      affiliateId: this.props.profile!.user!.affiliateId || "",
      url: this.props.profile!.user!.url || "",
      avatarUploading: false
    };
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value } as Pick<IState, any>);
  };

  update = () => {
    const {
      email,
      firstName,
      lastName,
      userName,
      mobileNumber,
      timeZone,
      businessPhone,
      webAddress,
      title,
      affiliateId,
      url
    } = this.state;
    const data = {
      email,
      firstName,
      lastName,
      userName,
      mobileNumber,
      timeZone,
      businessPhone,
      webAddress,
      title,
      affiliateId,
      userId: this.props.profile!.user!._id,
      url
    };
    this.props.updateProfile(data);
  };
  fileHandler = (e: any) => {
    if (!e.target.files[0]) {
      toast.info("Failed to select a file");
      return;
    }
    toast.info("Uploading please wait");
    this.setState({ avatarUploading: true });
    this.getLogoFromProfilePic(e.target.files[0]);
    const options = {
      Bucket: config.bucketName,
      ACL: config.ACL,
      Key: Date.now().toString(),
      Body: e.target.files[0]
    };
    this.s3.upload(options, (err: any, data: any) => {
      if (err) {
        toast.error(err.message);
        this.setState({ avatarUploading: false });
        return;
      }
      this.setState({ avatarUploading: false, url: data.Location });
      toast.info("Click update button below to save changes");
    });
  };
  getLogoFromProfilePic = (file: any) => {
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
            try {
              await this.saveLogo(blob);
            } catch (err) {
              toast.error("Error saving profile image as asset");
            }
          },
          `${file.type}`,
          1
        );
      };
    };
  };
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
          reject();
          return;
        }
        this.props.addAsset({ type: "logo", url: data.Location });
        resolve();
      });
    });
  };
  render() {
    const { loading, user } = this.props.profile;
    const { avatarUploading } = this.state;
    return (
      <>
        <Header
          styles={{
            backgroundImage:
              "linear-gradient(-90deg, rgb(97, 181, 179), rgb(97, 181, 179), rgb(252, 179, 23))"
          }}
        />
        <div className="wrapperProfileSection">
          <div id="profilePhotoWrap">
            <div id="profilePhotoHead">
              <h4>{Constants.PROFILE_PHOTO} </h4>
              <i>
                <Tooltip title={`${Constants.PROFILE_PIC_INSTRUCTIONS}`}>
                  <span>
                    <FaInfoCircle id="infoCircleStyle" />
                  </span>
                </Tooltip>
              </i>
              <p id="uploadProfilePara">{Constants.UPLOAD_DESCRIPTION}</p>
            </div>
            <hr />
            <div id="profileImgWrap">
              {this.state.url === "" ? (
                <img
                  src={user!.url ? user!.url : profileImg}
                  alt="profileImg"
                  id="profileImgStyle"
                />
              ) : (
                <img
                  src={this.state.url ? this.state.url : profileImg}
                  alt="profileImg"
                  id="profileImgStyle"
                />
              )}
              <div className="progressEditing">
                {avatarUploading && <Loading />}
              </div>
            </div>
            <Tooltip title={`${Constants.PROFILE_PIC_INSTRUCTIONS}`}>
              <div className="profileImgLabelWrap">
                <div className="profileBtn" onClick={() => {this.file.click()}}>
                  SELECT NEW PHOTO
                  <input
                    type="file"
                    id="profileSelectInput"
                    onChange={this.fileHandler}
                    ref={ref => {this.file = ref}}
                  />
                </div>
              </div>
            </Tooltip>
          </div>
          <div id="yourProfileWrap">
            <h4 id="yourProfielHead">{Constants.YOUR_PROFILE}</h4>
            <hr />
            <Grid container>
              <Grid xs={1} sm={1} md={2} lg={2} item></Grid>
              <Grid item xs={10} sm={10} md={8} lg={8}>
                <div className="formProfile">
                  <TextField
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.onChange}
                    label="First Name"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                  <TextField
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.onChange}
                    label="Last Name"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                  <TextField
                    name="userName"
                    value={this.state.userName}
                    onChange={this.onChange}
                    label="User Name"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                  <TextField
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    label="E-mail Address"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />

                  <TextField
                    name="mobileNumber"
                    value={this.state.mobileNumber}
                    onChange={this.onChange}
                    label="Mobile Number"
                    fullWidth
                    margin="normal"
                    type="text"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                  <TextField
                    select
                    name="timeZone"
                    label="Time Zone"
                    fullWidth
                    value={this.state.timeZone}
                    onChange={this.onChange}
                    InputLabelProps={{
                      shrink: true
                    }}
                    SelectProps={{
                      native: true
                    }}
                  >
                    {Object.entries(TimeZone).map((key: any, value) => {
                      return (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      );
                    })}
                  </TextField>

                  <TextField
                    name="businessPhone"
                    value={this.state.businessPhone}
                    onChange={this.onChange}
                    label="Business Phone"
                    fullWidth
                    margin="normal"
                    type="text"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                  <TextField
                    name="webAddress"
                    value={this.state.webAddress}
                    onChange={this.onChange}
                    label="Web Address"
                    fullWidth
                    margin="normal"
                    type="text"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                  <TextField
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                    label="Web Address"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true
                    }}
                    style={{ marginBottom: "30px" }}
                  />

                  <ThemeButton
                    style={{
                      backgroundColor: "rgb(34, 185, 255)",
                      color: "#fff"
                    }}
                    onClick={() => this.update()}
                    name={`${Constants.UPDATE}`}
                  />
                </div>

                <div className="progressEditing">{loading && <Loading />}</div>
              </Grid>
              <Grid xs={1} sm={1} md={2} lg={2} item></Grid>
            </Grid>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    profile: state.profile
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    updateProfile: (userProfile: UserProfile) =>
      dispatch(updateProfileUser(userProfile)),
    addAsset: (asset: any) => dispatch(addAsset(asset))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
