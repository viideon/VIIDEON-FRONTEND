import React, { Component } from "react";
import { Input, Label, Row, Col, Form, FormGroup, Button } from "reactstrap";
import "./style.css";
import { connect } from "react-redux";
import { FaInfoCircle } from "react-icons/fa";
import AWS from "aws-sdk";
import LinkAccount from "./LinkAccount";
import { profileUser } from "../../Redux/Actions/profile";
import { ProfileState, UserProfile } from "../../Redux/Types/profile";
import { AuthState } from "../../Redux/Types/auth";
import profileImg from "../../assets/profileImages/profileImg.png";
import TimeZone from "../../components/TimeZone/Data/timezone.json";
import * as Constants from "../../constants/constants";
import Loading from "../../components/Loading";

type IProps = {
  history: any;
  auth: AuthState;
  navigation: any;
  userProfile: ProfileState;
  profile: (userProfile: UserProfile) => void;
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
const config = {
  bucketName: "paractice",
  dirName: "nafeel",
  region: "us-east-1",
  ACL: "public-read",
  accessKeyId: "AKIAIK4LMUMBSKO7CYAQ",
  secretAccessKey: "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"
};
class Profile extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: this.props.auth.user!.user!.email || "",
      firstName: this.props.auth.user!.user!.firstName || "",
      lastName: this.props.auth.user!.user!.lastName || "",
      userName: this.props.auth.user!.user!.userName || "",
      mobileNumber: this.props.auth.user!.user!.mobileNumber || "",
      timeZone: this.props.auth.user!.user!.timeZone || "",
      businessPhone: this.props.auth.user!.user!.businessPhone || "",
      webAddress: this.props.auth.user!.user!.webAddress || "",
      title: this.props.auth.user!.user!.title || "",
      affiliateId: this.props.auth.user!.user!.affiliateId || "",
      url: ""
    };
  }
  userNameHandler = (event: any) => {
    this.setState({
      userName: event.target.value
    });
  };
  firstNameHandler = (event: any) => {
    this.setState({
      firstName: event.target.value
    });
  };
  lastNameHandler = (event: any) => {
    this.setState({
      lastName: event.target.value
    });
  };
  emailHandler = (event: any) => {
    this.setState({
      email: event.target.value
    });
  };
  mobileHandler = (event: any) => {
    this.setState({
      mobileNumber: event.target.value
    });
  };
  timeHandler = (event: any) => {
    console.log("The Value Picker: ", event.target.value);
    this.setState({
      timeZone: event.target.value
    });
  };
  businessPhoneHandler = (event: any) => {
    this.setState({
      businessPhone: event.target.value
    });
  };
  webHandler = (event: any) => {
    this.setState({
      webAddress: event.target.value
    });
  };
  titleHandler = (event: any) => {
    this.setState({
      title: event.target.value
    });
  };
  afiliateHandler = (event: any) => {
    this.setState({
      affiliateId: event.target.value
    });
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
      userId: this.props.auth.user!.user!._id,
      url
    };
    this.props.profile(data);
  };
  fileHandler = (e: any) => {
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
        throw err;
      }
      console.log(`File uploaded successfully. ${data.Location} ${err}`);
      that.setState({ url: data.Location });
    });
  };
  render() {
    const { loading } = this.props.userProfile;
    return (
      <div className="wrapperProfileSection">
        <div id="profilePhotoWrap">
          <div id="profilePhotoHead">
            <h4>{Constants.PROFILE_PHOTO} </h4>
            <i>
              <FaInfoCircle id="infoCircleStyle" />
            </i>
            <p id="uploadProfilePara">{Constants.UPLOAD_DESCRIPTION}</p>
          </div>
          <hr />
          <div id="profileImgWrap">
            {this.state.url === "" ? (
              <img
                src={this.props.auth.user!.user!.url}
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
            <Label id="profileImgLabelStyle">
              {Constants.SELECT_NEW_PHOTO}
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
                    onChange={this.firstNameHandler}
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
                    onChange={this.lastNameHandler}
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
                    onChange={this.userNameHandler}
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
                    onChange={this.emailHandler}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">{Constants.MOBILE_NUMBER}</Label>
                  <Input
                    type="text"
                    name="mobile"
                    id="typeInput"
                    placeholder=""
                    value={this.state.mobileNumber}
                    onChange={this.mobileHandler}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">{Constants.TIMEZONE}</Label>
                  <Input
                    type="select"
                    name="timezone"
                    id="typeSelectInput"
                    placeholder=""
                    value={this.state.timeZone}
                    onChange={this.timeHandler}
                  >
                    {Object.entries(TimeZone).map((key, value) => {
                      return <option value={key}>{key}</option>;
                    })}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">{Constants.BUSINESS_PHONE}</Label>
                  <Input
                    type="text"
                    name="email"
                    id="typeInput"
                    placeholder=""
                    value={this.state.businessPhone}
                    onChange={this.businessPhoneHandler}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">{Constants.WEB_ADDRESS}</Label>
                  <Input
                    type="text"
                    name="email"
                    id="typeInput"
                    placeholder=""
                    value={this.state.webAddress}
                    onChange={this.webHandler}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">{Constants.TITLE}</Label>
                  <Input
                    type="text"
                    name="email"
                    id="typeInput"
                    placeholder=""
                    value={this.state.title}
                    onChange={this.titleHandler}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">{Constants.AFFILIATE}</Label>
                  <Input
                    type="text"
                    name="email"
                    id="typeInput"
                    placeholder=""
                    value={this.state.affiliateId}
                    onChange={this.afiliateHandler}
                  />
                  <p id="memberDubbPara">
                    {Constants.PROFILE_DESCRIPTION}{" "}
                    <a href="/profile"> {Constants.PROFILE_URL}</a>
                  </p>
                </FormGroup>
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
        <LinkAccount />
      </div>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
    userProfile: state.profile
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    profile: (userProfile: UserProfile) => dispatch(profileUser(userProfile))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
