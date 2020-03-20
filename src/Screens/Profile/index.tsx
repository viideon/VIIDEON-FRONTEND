import React, { Component } from 'react';
import { Input, Label, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import './style.css';
import { connect } from 'react-redux';
import LinkAccount from './LinkAccount';
import { profileUser } from '../../Redux/Actions/profile';
import { ProfileState, UserProfile } from '../../Redux/Types/profile';
import { AuthState } from '../../Redux/Types/auth';
import { FaInfoCircle } from "react-icons/fa";
import profileImg from '../../assets/profileImages/profileImg.png';
import TimeZone from '../../components/TimeZone/Data/timezone.json'

import S3 from 'aws-s3';
import AWS from 'aws-sdk';

type IProps = {
  auth: AuthState;
  navigation: any;
  profiler: ProfileState;
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
  url: string
};
const config = {
  bucketName: 'paractice',
  dirName: 'nafeel',
  region: "us-east-1",
  ACL: 'public-read',
  accessKeyId: 'AKIAIK4LMUMBSKO7CYAQ',
  secretAccessKey: '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',
}
class Profile extends Component<IProps, IState>  {
  constructor(props: any) {
    super(props);
    this.state = {
      email: this.props.auth.user!.user!.email || '',
      firstName: this.props.auth.user!.user!.firstName || '',
      lastName: this.props.auth.user!.user!.lastName || '',
      userName: this.props.auth.user!.user!.userName || '',
      mobileNumber: this.props.auth.user!.user!.mobileNumber || '',
      timeZone: this.props.auth.user!.user!.timeZone || '',
      businessPhone: this.props.auth.user!.user!.businessPhone || '',
      webAddress: this.props.auth.user!.user!.webAddress || '',
      title: this.props.auth.user!.user!.title || '',
      affiliateId: this.props.auth.user!.user!.affiliateId || '',
      url: ''
    }
  }
  userNameHandler = (event: any) => {
    this.setState({
      userName: event.target.value
    })
  }
  firstNameHandler = (event: any) => {
    this.setState({
      firstName: event.target.value
    })
  }
  lastNameHandler = (event: any) => {
    this.setState({
      lastName: event.target.value
    })
  }
  emailHandler = (event: any) => {
    this.setState({
      email: event.target.value
    })
  }
  mobileHandler = (event: any) => {
    this.setState({
      mobileNumber: event.target.value
    })
  }
  timeHandler = (event: any) => {
    console.log("The Value Picker: ", event.target.value)
    this.setState({
      timeZone: event.target.value
    })
  }
  businessPhoneHandler = (event: any) => {
    this.setState({
      businessPhone: event.target.value
    })
  }
  webHandler = (event: any) => {
    this.setState({
      webAddress: event.target.value
    })
  }
  titleHandler = (event: any) => {
    this.setState({
      title: event.target.value
    })
  }
  afiliateHandler = (event: any) => {
    this.setState({
      affiliateId: event.target.value
    })
  }
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
    }
    this.props.profile(data);
  }
  fileHandler = (e: any) => {
    const that = this;
    const file = {
      name: e.target.files[0].name,
      type: e.target.files[0].type,
      size: e.target.files[0].size
    }
    console.log("The Image Profile", e.target.files[0])
    let s3 = new AWS.S3(config)
    var options = {
      Bucket: config.bucketName,
      ACL: config.ACL,
      Key: Date.now().toString(),
      Body: e.target.files[0]
    };
    s3.upload(options, function (err: any, data: any) {
      if (err) {
        throw err;
      }
      console.log(`File uploaded successfully. ${data.Location} ${err}`)
      that.setState({ url: data.Location })
    });
  }
  render() {

    return (
      <div>
        <div id="profilePhotoWrap">
          <div id="profilePhotoHead">
            <h4>PROFILE PHOTO </h4><i><FaInfoCircle id="infoCircleStyle" /></i>
            <p id="uploadProfilePara">Upload a profile photo of you to display on your video pages</p>
          </div>
          <hr />
          <div id="profileImgWrap">
            <img src={this.state.url ? this.state.url : profileImg} alt="profileImg" id="profileImgStyle" />
          </div>
          <div id="profileImgLabelWrap">
            <Label id="profileImgLabelStyle">SELECT NEW PHOTO
            <Input type="file" id="profileSelectInput" onChange={this.fileHandler} />
            </Label>
          </div>
        </div>
        <div id="yourProfileWrap">
          <h4 id="yourProfielHead">YOUR PROFILE</h4>
          <hr />
          <Row>
            <Col className="col-md-6 m-auto">
              <Form id="formInput">
                <FormGroup>
                  <Label for="exampleEmail">First Name</Label>
                  <Input type="text" name="firstName" id="typeInput" placeholder=""
                    value={this.state.firstName}
                    onChange={this.firstNameHandler}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Last Name</Label>
                  <Input type="text" name="lastName" id="typeInput" placeholder=""
                    value={this.state.lastName}
                    onChange={this.lastNameHandler}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">User Name</Label>
                  <Input type="text" name="userName" id="typeInput" placeholder=""
                    value={this.state.userName}
                    onChange={this.userNameHandler}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">E-Mail Address</Label>
                  <Input type="text" name="email" id="typeInput" placeholder=""
                    value={this.state.email}
                    onChange={this.emailHandler}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Mobile Number</Label>
                  <Input type="text" name="mobile" id="typeInput" placeholder=""
                    value={this.state.mobileNumber}
                    onChange={this.mobileHandler}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Timezone</Label>
                  <Input type="select" name="timezone" id="typeSelectInput" placeholder=""
                    value={this.state.timeZone}
                    onChange={this.timeHandler}>
                    {/* <Input type="select" name="select" id="exampleSelect"> */}
                    {Object.entries(TimeZone).map((key, value) => {
                      return <option value={key}>{key}</option>
                    })}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Business Phone</Label>
                  <Input type="text" name="email" id="typeInput" placeholder=""
                    value={this.state.businessPhone}
                    onChange={this.businessPhoneHandler}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Web Address</Label>
                  <Input type="text" name="email" id="typeInput" placeholder=""
                    value={this.state.webAddress}
                    onChange={this.webHandler}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Title</Label>
                  <Input type="text" name="email" id="typeInput" placeholder=""
                    value={this.state.title}
                    onChange={this.titleHandler}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Affiliate URL</Label>
                  <Input type="text" name="email" id="typeInput" placeholder=""
                    value={this.state.affiliateId}
                    onChange={this.afiliateHandler}
                  />
                  <p id="memberDubbPara">Are you a member of the Dubb Affiliate Program? Enter your referral ID here to replace
                                your referral link with your affiliate link to earn recurring commissions. Signup at <a href="#"> earn.dubb.com.</a></p>
                </FormGroup>
                <Button id="yourProfileUpdateBtn"
                  onClick={() => this.update()}
                >Update</Button>
              </Form>
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
    profile: state.profile
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    profile: (userProfile: UserProfile) => dispatch(profileUser(userProfile))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);