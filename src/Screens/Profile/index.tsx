import React, { Component } from 'react';
import { Input, Label, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import './style.css';
import { connect } from 'react-redux';
import ProfilePhoto from './ProfilePhoto';
// import YourProfile from './YourProfile';
import LinkAccount from './LinkAccount';
import { profileUser } from '../../Redux/Actions/profile';
import { ProfileState, UserProfile } from '../../Redux/Types/profile';


type IProps = {
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
};
class Profile extends Component<IProps, IState>  {
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            userName: '',
            mobileNumber: '',
            timeZone: '',
            businessPhone: '',
            webAddress: '',
            title: '',
            affiliateId: '',
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
    update=()=>{
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
            affiliateId
        }= this.state;
        const data={
            email,
            firstName,
            lastName,
            userName,
            mobileNumber,
            timeZone,
            businessPhone,
            webAddress,
            title,
            affiliateId
        }
        this.props.profile(data);
    }
    render(){
    
    return (
        <div>
            <ProfilePhoto/>
            <div id="yourProfileWrap">
                <h4 id="yourProfielHead">YOUR PROFILE</h4>
                <hr />
                <Row>
                    <Col className="col-md-6 m-auto">
                        <Form id="formInput">
                            <FormGroup>
                                <Label for="exampleEmail">First Name</Label>
                                <Input type="text" name="firstName" id="typeInput" placeholder=""
                                    onChange={this.firstNameHandler}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Last Name</Label>
                                <Input type="text" name="lastName" id="typeInput" placeholder=""
                                    onChange={this.lastNameHandler}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">User Name</Label>
                                <Input type="text" name="userName" id="typeInput" placeholder=""
                                    onChange={this.userNameHandler}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">E-Mail Address</Label>
                                <Input type="text" name="email" id="typeInput" placeholder=""
                                    onChange={this.emailHandler}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Mobile Number</Label>
                                <Input type="select" name="mobile" id="typeSelectInput" placeholder=""
                                    onChange={this.mobileHandler}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Timezone</Label>
                                <Input type="select" name="timezone" id="typeSelectInput" placeholder=""
                                    onChange={this.timeHandler}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Business Phone</Label>
                                <Input type="text" name="email" id="typeInput" placeholder=""
                                    onChange={this.businessPhoneHandler}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Web Address</Label>
                                <Input type="text" name="email" id="typeInput" placeholder=""
                                    onChange={this.webHandler}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Title</Label>
                                <Input type="text" name="email" id="typeInput" placeholder=""
                                    onChange={this.titleHandler}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Affiliate URL</Label>
                                <Input type="text" name="email" id="typeInput" placeholder=""
                                    onChange={this.afiliateHandler}
                                />
                                <p id="memberDubbPara">Are you a member of the Dubb Affiliate Program? Enter your referral ID here to replace
                                your referral link with your affiliate link to earn recurring commissions. Signup at <a href="#"> earn.dubb.com.</a></p>
                            </FormGroup>
                            <Button id="yourProfileUpdateBtn"
                            onClick={()=>this.update()}
                            >Update</Button>
                        </Form>
                    </Col>
                </Row>

            </div>
            <LinkAccount/>
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
      profile: (userProfile: UserProfile) => dispatch(profileUser(userProfile))
    };
  };
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Profile);