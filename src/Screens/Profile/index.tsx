import React, { Component } from "react";
import AWS from "aws-sdk";
import { Input, Label, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { connect } from "react-redux";
import { FaInfoCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { Tooltip } from "@material-ui/core";
// import LinkAccount from "./LinkAccount";
import { updateProfileUser } from "../../Redux/Actions/profile";
import { addAsset } from "../../Redux/Actions/asset";
import { ProfileState, UserProfile } from "../../Redux/Types/profile";
import { AuthState } from "../../Redux/Types/auth";
import profileImg from "../../assets/profileImages/profileImg.png";
import TimeZone from "../../components/TimeZone/Data/timezone.json";
import * as Constants from "../../constants/constants";
import { config } from "../../config/aws";
import Loading from "../../components/Loading";
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
      avatarUploading: false,
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
            <div id="profileImgLabelWrap">
              <Label id="profileImgLabelStyle" className="profileBtn">
                SELECT NEW PHOTO
              <Input
                  type="file"
                  id="profileSelectInput"
                  onChange={this.fileHandler}
                />
              </Label>
            </div>
          </Tooltip>
        </div>
        <div id="yourProfileWrap">
          <h4 id="yourProfielHead">{Constants.YOUR_PROFILE}</h4>
          <hr />
          <Row>
            <Col className="col-md-6 m-auto">
              <Form id="formInput">
                <FormGroup>
                  <Label for="exampleEmail">{Constants.FIRSTNAME}</Label>
                  <Input
                    type="text"
                    name="firstName"
                    id="typeInput"
                    placeholder=""
                    value={this.state.firstName}
                    onChange={this.onChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">{Constants.LASTNAME}</Label>
                  <Input
                    type="text"
                    name="lastName"
                    id="typeInput"
                    placeholder=""
                    value={this.state.lastName}
                    onChange={this.onChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">{Constants.USERNAME}</Label>
                  <Input
                    type="text"
                    name="userName"
                    id="typeInput"
                    placeholder=""
                    value={this.state.userName}
                    onChange={this.onChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">{Constants.E_MAIL}</Label>
                  <Input
                    type="text"
                    name="email"
                    id="typeInput"
                    placeholder=""
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">{Constants.MOBILE_NUMBER}</Label>
                  <Input
                    type="text"
                    name="mobileNumber"
                    id="typeInput"
                    placeholder=""
                    value={this.state.mobileNumber}
                    onChange={this.onChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">{Constants.TIMEZONE}</Label>
                  <Input
                    type="select"
                    name="timeZone"
                    id="typeSelectInput"
                    placeholder=""
                    value={this.state.timeZone}
                    onChange={this.onChange}
                  >
                    {Object.entries(TimeZone).map((key: any, value) => {
                      return (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">{Constants.BUSINESS_PHONE}</Label>
                  <Input
                    type="text"
                    name="businessPhone"
                    id="typeInput"
                    placeholder=""
                    value={this.state.businessPhone}
                    onChange={this.onChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">{Constants.WEB_ADDRESS}</Label>
                  <Input
                    type="text"
                    name="webAddress"
                    id="typeInput"
                    placeholder=""
                    value={this.state.webAddress}
                    onChange={this.onChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">{Constants.TITLE}</Label>
                  <Input
                    type="text"
                    name="title"
                    id="typeInput"
                    placeholder=""
                    value={this.state.title}
                    onChange={this.onChange}
                  />
                </FormGroup>
                {/* <FormGroup>
                  <Label for="exampleEmail">{Constants.AFFILIATE}</Label>
                  <Input
                    type="text"
                    name="affiliateId"
                    id="typeInput"
                    placeholder=""
                    value={this.state.affiliateId}
                    onChange={this.onChange}
                  />
                  <p id="memberVideonText">
                    {Constants.PROFILE_DESCRIPTION}{" "}
                    <a href="/profile"> {Constants.PROFILE_URL}</a>
                  </p>
                </FormGroup> */}
                <Button id="yourProfileUpdateBtn" onClick={() => this.update()}>
                  {Constants.UPDATE}
                </Button>
              </Form>

              <div className="progressEditing">
                {loading && <Loading />}
              </div>
            </Col>
          </Row>
        </div>
        {/* <LinkAccount /> */}
      </div>
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
