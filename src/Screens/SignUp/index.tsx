import React from "react";
import Grid from "@material-ui/core/Grid";
import { Button, FormGroup, Label, Input, Alert } from "reactstrap";
import { connect } from "react-redux";
import { registerUser } from "../../Redux/Actions/register";
import { RegisterState } from "../../Redux/Types/register";
import { User } from "../../Redux/Types/register";
import * as Constants from "../../constants/constants";
import Loading from "../../components/Loading";
import { reg } from "../../constants/emailRegEx";
import "./style.css";

type IProps = {
  registerUser: RegisterState;
  register: (user: User) => void;
  history: any;
};
type IState = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  emailError: boolean;
  passwordError: boolean;
  invalidEmailError: boolean;
  c_passwordError: boolean;
  firstError: boolean;
  lastError: boolean;
  userNameError: boolean;
  confirmPasswordError: boolean;
  next: boolean;
  showNext: boolean;
};

class Signup extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      userName: "",
      emailError: false,
      passwordError: false,
      invalidEmailError: false,
      c_passwordError: false,
      firstError: false,
      lastError: false,
      userNameError: false,
      confirmPasswordError: false,
      next: false,
      showNext: true
    };
  }

  componentWillReceiveProps(nextProps: any) {
    if (
      nextProps.registerUser.isSignupSuccess &&
      nextProps.registerUser.isSignupSuccess !==
        this.props.registerUser.isSignupSuccess
    ) {
      this.props.history.push("/");
    }
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
    event.preventDefault();
    this.setState({
      email: event.target.value
    });
  };

  passwordHandler = (event: any) => {
    this.setState({
      password: event.target.value
    });
  };
  confirmPasswordHandler = (event: any) => {
    this.setState({
      confirmPassword: event.target.value
    });
  };
  registerHandler = () => {
    const {
      firstName,
      lastName,
      userName,
      email,
      password,
      confirmPassword
    } = this.state;
    if (firstName === "") this.setState({ firstError: true });
    else if (lastName === "") this.setState({ lastError: true });
    else if (userName === "") this.setState({ userNameError: true });
    else if (email === "") this.setState({ emailError: true });
    else if (reg.test(email) === false)
      this.setState({ invalidEmailError: true });
    else if (password === "") this.setState({ passwordError: true });
    else if (confirmPassword === "")
      this.setState({ confirmPasswordError: true });
    else if (password !== confirmPassword)
      this.setState({ c_passwordError: true });
    else {
      const user = {
        email,
        firstName,
        lastName,
        userName,
        password
      };
      this.props.register(user);
    }
  };
  nextHandler = () => {
    if (this.state.email) {
      this.setState({ showNext: false });
      this.setState({ next: true });
    } else {
      alert("Please Add Email");
    }
  };

  render() {
    const { loading } = this.props.registerUser;
    const {
      firstError,
      lastError,
      emailError,
      passwordError,
      confirmPasswordError,
      c_passwordError,
      invalidEmailError,
      userNameError
    } = this.state;

    return (
      <div>
        <Grid container>
          <Grid item xs={12} md={7} sm={12}>
            {this.state.next ? (
              <div className="firstStateLayoutContainer">
                <div className="firstLayoutMainContainer">
                  <p className="signUp">{Constants.SIGNUP_TO}</p>
                  <h2 className="logo">{Constants.VIDIONPRO}</h2>
                </div>
              </div>
            ) : (
              <div className="firstLayoutContainer">
                <div className="firstLayoutMainContainer">
                  <p className="signUp">{Constants.SIGNUP_TO}</p>
                  <p className="logo">{Constants.VIDIONPRO}</p>
                </div>
              </div>
            )}
          </Grid>
          <Grid item xs={12} md={5} sm={12}>
            <div className="secondLayoutMainContainer">
              <p className="loginTwo">{Constants.REGISTER}</p>
              <div className="createAccountSignup">
                <p className="accountSignup">{Constants.ALREADY_HAD_ACCOUNT}</p>
                <div
                  onClick={() => {
                    this.props.history.push("/");
                  }}
                >
                  <p className="create">{Constants.LOGIN_HERE}</p>
                </div>
              </div>
              <div className="loadingWrapper">{loading && <Loading />}</div>
              <div id="wrapperFormSignup">
                <FormGroup>
                  <Label for="exampleEmail" style={{ fontWeight: "bold" }}>
                    {Constants.EMAIL_BUSINESS}
                  </Label>
                  <div className="textInpu1">
                    <Input
                      type="text"
                      name="email"
                      id="typeInput"
                      placeholder="Enter Your business e-mail"
                      onChange={this.emailHandler}
                      style={{
                        borderRadius: "10rem",
                        borderWidth: 0,
                        borderColor: "white",
                        boxShadow: "white"
                      }}
                    />
                  </div>
                </FormGroup>
                {emailError && (
                  <Alert color="danger">{Constants.EMAIL_ERROR}</Alert>
                )}
                {invalidEmailError && (
                  <Alert color="danger">{Constants.EMAIL_INVALID}</Alert>
                )}
                {this.state.showNext && (
                  <div className="buttonWrapper">
                    <Button
                      color="#9F55FF"
                      onClick={this.nextHandler}
                      style={{
                        backgroundColor: "#9F55FF",
                        width: "40%",
                        float: "right",
                        marginBottom: "10px",
                        color: "white",
                        borderRadius: "10rem"
                      }}
                    >
                      {Constants.NEXT}
                    </Button>
                  </div>
                )}
                {this.state.next && (
                  <>
                    <FormGroup>
                      <Label>{Constants.FIRSTNAME}</Label>
                      <div className="textInpu1">
                        <Input
                          type="email"
                          name="firstName"
                          placeholder="First Name"
                          style={{
                            borderRadius: "10rem",
                            borderWidth: 0,
                            borderColor: "white",
                            boxShadow: "white"
                          }}
                          onChange={this.firstNameHandler}
                        />
                      </div>
                    </FormGroup>
                    {firstError && (
                      <Alert color="danger">{Constants.FIRSTNAME_ERROR}</Alert>
                    )}
                    <FormGroup>
                      <Label>{Constants.LASTNAME}</Label>
                      <div className="textInpu1">
                        <Input
                          type="email"
                          name="lastName"
                          placeholder="Last Name"
                          style={{
                            borderRadius: "10rem",
                            borderWidth: 0,
                            borderColor: "white",
                            boxShadow: "white"
                          }}
                          onChange={this.lastNameHandler}
                        />
                      </div>
                    </FormGroup>
                    {lastError && (
                      <Alert color="danger">{Constants.LASTNAME_ERROR}</Alert>
                    )}
                    <FormGroup>
                      <Label>{Constants.USERNAME}</Label>
                      <div className="textInpu1">
                        <Input
                          type="email"
                          name="userName"
                          placeholder="UserName"
                          style={{
                            borderRadius: "10rem",
                            borderWidth: 0,
                            borderColor: "white",
                            boxShadow: "white"
                          }}
                          onChange={this.userNameHandler}
                        />
                      </div>
                    </FormGroup>
                    {userNameError && (
                      <Alert color="danger">{Constants.USERNAME_ERROR}</Alert>
                    )}
                    <FormGroup>
                      <Label for="examplePassword">{Constants.PASSWORD}</Label>
                      <div className="textInpu1">
                        <Input
                          type="password"
                          name="password"
                          id="examplePassword"
                          placeholder="Password"
                          style={{
                            borderRadius: "10rem",
                            borderWidth: 0,
                            borderColor: "white",
                            boxShadow: "white"
                          }}
                          onChange={this.passwordHandler}
                        />
                      </div>
                    </FormGroup>
                    {passwordError && (
                      <Alert color="danger">{Constants.PASSWORD_ERROR}</Alert>
                    )}
                    <FormGroup>
                      <Label for="examplePassword">
                        {Constants.CONFIRM_PASSWORD}
                      </Label>
                      <div className="textInpu1">
                        <Input
                          type="password"
                          name="confirmPassword"
                          id="examplePassword"
                          placeholder="Confrim Password"
                          style={{
                            borderRadius: "10rem",
                            borderWidth: 0,
                            borderColor: "white",
                            boxShadow: "white"
                          }}
                          onChange={this.confirmPasswordHandler}
                        />
                      </div>
                    </FormGroup>
                    {confirmPasswordError && (
                      <Alert color="danger">{Constants.CONFIRM_ERROR}</Alert>
                    )}
                    {c_passwordError && (
                      <Alert color="danger">
                        {Constants.PASSWORD_MATCHING}
                      </Alert>
                    )}
                    <div className="buttonWrapper1">
                      <Button
                        color="#9F55FF"
                        onClick={this.registerHandler}
                        style={{
                          backgroundColor: "#9F55FF",
                          width: "40%",
                          float: "right",
                          marginBottom: "10px",
                          color: "white",
                          borderRadius: "10rem"
                        }}
                      >
                        {Constants.REGISTER}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    registerUser: state.register
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    register: (user: User) => dispatch(registerUser(user))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
