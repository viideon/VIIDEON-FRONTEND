import React, { Component } from "react";
import { Input, Label, Row, Col, Form, FormGroup, Button } from "reactstrap";
import "./style.css";
import { connect } from "react-redux";
// import { FaInfoCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import AWS from "aws-sdk";
// import LinkAccount from "./LinkAccount";
import { updateProfileUser } from "../../Redux/Actions/profile";
import { ProfileState, UserProfile } from "../../Redux/Types/profile";
import { AuthState } from "../../Redux/Types/auth";
import profileImg from "../../assets/profileImages/profileImg.png";
import TimeZone from "../../components/TimeZone/Data/timezone.json";
import * as Constants from "../../constants/constants";
import { config } from "../../config/aws";
import Loading from "../../components/Loading";

type IProps = {
  history: any;
  auth: AuthState;
  navigation: any;
  profile: ProfileState;
  updateProfile: (userProfile: UserProfile) => void;
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
};
class Profile extends Component<IProps, IState> {
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
      url: this.props.profile!.user!.url || ""
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
    toast("Uploading please wait");
    const that = this;
    let s3 = new AWS.S3(config);
    var options = {
      Bucket: config.bucketName,
      ACL: config.ACL,
      Key: Date.now().toString(),
      Body: e.target.files[0]
    };
    s3.upload(options, function(err: any, data: any) {
      if (err) {
        // throw err;
        toast.error("Failed to upload profile image ,try again");
        return;
      }
      that.setState({ url: data.Location });
      toast("Click update button below to save changes");
    });
  };
  render() {
    const { loading, user } = this.props.profile;
    return (
      <div className="wrapperProfileSection">
        <div id="profilePhotoWrap">
          <div id="profilePhotoHead">
            <h4>{Constants.PROFILE_PHOTO} </h4>
            {/* <i>
              <FaInfoCircle id="infoCircleStyle" />
            </i> */}
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
          </div>
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
                  <p id="memberDubbPara">
                    {Constants.PROFILE_DESCRIPTION}{" "}
                    <a href="/profile"> {Constants.PROFILE_URL}</a>
                  </p>
                </FormGroup> */}
                <Button id="yourProfileUpdateBtn" onClick={() => this.update()}>
                  {Constants.UPDATE}
                </Button>
              </Form>
              <div style={{ marginLeft: "50%", opacity: 0.5 }}>
                {loading ? <Loading /> : null}
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
      dispatch(updateProfileUser(userProfile))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
