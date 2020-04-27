import React from "react";
import Grid from "@material-ui/core/Grid";
import { Form, FormGroup, Label, Input, Alert } from "reactstrap";
import * as Constants from "../../constants/constants";
import { connect } from "react-redux";
import { reg } from "../../constants/emailRegEx";
import Loading from "../../components/Loading";
import { loginUser } from "../../Redux/Actions/auth";
import { AuthState, User } from "../../Redux/Types/auth";
import ActionButton from "../../components/Reusable/ActionButton";
import "./style.css";

type IProps = {
  navigation: any;
  auth: AuthState;
  login: (user: object) => void;
  history: any;
};
type IState = {
  email: string;
  password: string;
  emailError: boolean;
  passwordError: boolean;
  invalidEmailError: boolean;
};
class Signin extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailError: false,
      passwordError: false,
      invalidEmailError: false
    };
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value } as Pick<IState, any>);
  };
  loginHandler = () => {
    const { email, password } = this.state;
    if (email === "") this.setState({ emailError: true });
    else if (reg.test(email) === false)
      this.setState({ invalidEmailError: true });
    else if (password === "") this.setState({ passwordError: true });
    else {
      const user = {
        email,
        password
      };

      this.props.login(user);
    }
  };
  render() {
    const { loading } = this.props.auth;
    const { emailError, passwordError, invalidEmailError } = this.state;
    return (
      <div>
        <Grid container>
          <Grid item xs={12} md={7} sm={12}>
            <div className="firstLayoutContainer">
              <div className="firstLayoutMainContainer">
                <p className="signUp">{Constants.SIGNUP_TO}</p>
                <h2 className="logoSignin">{Constants.VIDIONPRO}</h2>
                <p className="login">{Constants.LOGIN_TO_ACCOUNT}</p>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={5} sm={12}>
            <div className="secondLayoutMainContainer">
              <p className="loginTwo">{Constants.LOGIN}</p>
              <div className="createAccount">
                <p className="account">{Constants.DONT_HAVE_ACCOUNT_YET}</p>
                <div
                  onClick={() => {
                    this.props.history.push("/signup");
                  }}
                >
                  <p className="create">{Constants.CREATE_NEW}</p>
                </div>
              </div>
              <div style={{ marginLeft: "35%", opacity: 0.5 }}>
                {loading && <Loading />}
              </div>
              <Form style={{ width: "80%" }}>
                <FormGroup>
                  <Label for="exampleEmail" style={{ fontWeight: "bold" }}>
                    {Constants.EMAIL_ADDRESS}
                  </Label>
                  <div className="textInput">
                    <Input
                      type="text"
                      name="email"
                      placeholder="Email address"
                      onChange={this.onChange}
                      style={inputStyle}
                      autoComplete="off"
                    />
                    <i className="w3-xxlarge fa fa-user" style={iconStyle}></i>
                  </div>
                </FormGroup>
                <div style={{ width: "69%" }}>
                  {emailError && (
                    <Alert color="danger">{Constants.EMAIL_ERROR}</Alert>
                  )}
                  {invalidEmailError && (
                    <Alert color="danger">{Constants.EMAIL_INVALID}</Alert>
                  )}
                </div>
                <FormGroup>
                  <Label for="examplePassword" style={{ fontWeight: "bold" }}>
                    {Constants.PASSWORD}
                  </Label>
                  <div className="textInput">
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={this.onChange}
                      style={inputStyle}
                    />
                    <i className="w3-xxlarge fa fa-key" style={iconStyle}></i>
                  </div>
                </FormGroup>
                <div style={{ width: "69%" }}>
                  {passwordError && (
                    <Alert color="danger">{Constants.PASSWORD_ERROR}</Alert>
                  )}
                </div>
                <div className="mainWrapperLayout">
                  <p className="forgotPassword">Forget your Password</p>

                  <ActionButton
                    text={Constants.LOGIN}
                    bgColor="#9F55FF"
                    color="#fff"
                    onClick={this.loginHandler}
                    style={{ marginTop: 18, minWidth: "150px" }}
                  />
                </div>
              </Form>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const inputStyle = {
  borderRadius: "10rem",
  borderWidth: 0,
  borderColor: "white",
  boxShadow: "white"
};
const iconStyle = { width: "5%", margin: 10 };
const mapStateToProps = (state: any) => {
  return {
    auth: state.auth
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (user: User) => dispatch(loginUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
