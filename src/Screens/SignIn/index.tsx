import React from "react";
import Grid from "@material-ui/core/Grid";
import * as Yup from "yup";
import { Formik } from "formik";
import { connect } from "react-redux";
import InputRoundIcon from "../../components/InputRound/InputRoundIcon";
import Alert from "@material-ui/lab/Alert";
import { toast } from "react-toastify";
import * as Constants from "../../constants/constants";
import { reg } from "../../constants/emailRegEx";
import { loginUser, verifyUser, resendEmail, resetEmailVerifiedVariable } from "../../Redux/Actions/auth";
import { User } from "../../Redux/Types/auth";
import Loading from "../../components/Loading";
import ThemeButton from "../../components/ThemeButton";
import Colors from "../../constants/colors";
import "./style.css";

import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import whiteLogo from "../../assets/logo.png";
import atom from "../../assets/atom.png";
import {Auth} from "aws-amplify";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Enter Password")
    .min(6, "Password must be 6 characters long"),
  email: Yup.string()
    .required("Enter Email")
    .email("Enter Correct Email")
});
type IProps = {
  navigation: any;
  auth: any;
  login: (user: object) => void;
  resetEmailVerifiedVariable: () => void;
  history: any;
  location?: any;
  verifyState?: any;
  resendEmail?: any;
  verifyUser: any;
};
type IState = {
  email: string;
  password: string;
  emailError: boolean;
  passwordError: boolean;
  invalidEmailError: boolean;
  verifySuccessModals: boolean;
  resendVerificationEmail: boolean;
};
class Signin extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailError: false,
      passwordError: false,
      invalidEmailError: false,
      verifySuccessModals: false,
      resendVerificationEmail: false
    };
  }
  componentDidMount() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      this.props.verifyUser({ token: code });
    }
    if (this.props.auth.loggedInStatus && this.props.auth.user._id && this.props.auth.token) {
      this.props.history.push('/')
    }
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.auth.loggedInStatus && this.props.auth.user._id && this.props.auth.token) this.props.history.push('/');
    if (this.props.verifyState && JSON.stringify(prevProps.verifyState) !== JSON.stringify(this.props.verifyState) && this.props.verifyState.VerifySuccess) {
      this.setState({ verifySuccessModals: true });
      toast.info("The email is successfully verified!");
    }
    if (this.props.auth.loginError && JSON.stringify(prevProps.auth) !== JSON.stringify(this.props.auth) && this.props.auth.loginError.isEmailNotVerified) {
      this.setState({ resendVerificationEmail: true });
      this.props.resetEmailVerifiedVariable();
      setTimeout(
        () => this.setState({ resendVerificationEmail: false }),
        10000
      );
    }
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value } as Pick<IState, any>);
  };

  onSubmit = async (values: any) => {
    try {
      // values => {
      //   const user = {
      //     email: values.email,
      //     password: values.password
      //   };
      //   this.setState({ email: values.email });
      //   this.props.login(user);
      // }
      const user = await Auth.signIn(values.email, values.password);
      this.setState({email: values.email});
      this.props.login(
        {
          email: user.attributes.email,
          firstName: user.attributes.given_name,
          lastName: user.attributes.family_name,
          userName: user.attributes.email,
          _id: user.attributes.sub,
        }
      );
      // this.props.history.push("/");
    } catch (error) {
      console.log('Error signing in', {error});
      console.error(error);
      toast.error('You have entered an incorrect username or password.');
    }
  }

  resendVerificationEmail = () => {
    if (reg.test(this.state.email) === false) {
      toast.error("The email address is not valid");
    }
    this.props.resendEmail({ email: this.state.email });
  };

  render() {
    const { loading } = this.props.auth;
    return (
      <div>
        <Grid container>
          <Grid item xs={12} md={7} sm={12} className="sm-none">
            <div className="firstLayoutContainer">
              <div className="firstLayoutMainContainer">
                <img src={whiteLogo} alt="logo" />
              </div>
              <div
                style={{
                  position: "fixed",
                  bottom: "-13%",
                  left: "-3%",
                  opacity: "0.5"
                }}
              >
                <img style={{ width: "30%" }} src={atom} alt="logo" />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={5} sm={12} style={{ zIndex: 123123123 }}>
            <div className="secondLayoutMainContainer">
              <p className="loginTwo">{Constants.LOGIN}</p>
              <p className="loginDescription">{Constants.ENTER_DETAILS}</p>
              {this.state.resendVerificationEmail && (
                <div className="alert alert-warning fade show">
                  {Constants.RESEND_VERIFICATION_EMAIL_TEXT}&nbsp;
                  <span
                    onClick={this.resendVerificationEmail}
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    Click here
                  </span>
                  to resend .
                </div>
              )}

              <div className="wrapperLoader">
                {loading && (
                  <span className="innerWrapperLoader">
                    <Loading />
                  </span>
                )}
              </div>
              <Formik
                onSubmit={this.onSubmit}
                initialValues={{
                  password: "",
                  email: ""
                }}
                validationSchema={validationSchema}
              >
                {formik => (
                  <>
                    <div className="formGroups">
                      <Grid container spacing={2} alignItems="center">
                        <Grid md={1} sm={2} xs={2} item>
                          <EmailIcon />
                        </Grid>
                        <Grid md={10} sm={10} xs={10} item>
                          <InputRoundIcon
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                          />
                        </Grid>
                      </Grid>
                    </div>

                    {formik.errors.email && formik.touched.email && (
                      <Alert severity="warning">{formik.errors.email}</Alert>
                    )}

                    <div className="formGroups">
                      <Grid container spacing={2} alignItems="center">
                        <Grid md={1} sm={2} xs={2} item>
                          <LockIcon />
                        </Grid>
                        <Grid md={10} sm={10} xs={10} item>
                          <InputRoundIcon
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                          />
                        </Grid>
                      </Grid>
                    </div>

                    {formik.errors.password && formik.touched.password && (
                      <Alert severity="warning">{formik.errors.password}</Alert>
                    )}
                    <div className="btnBottomWrapper">
                      <p
                        className="forgotPassword"
                        onClick={() =>
                          this.props.history.push("/forgotpassword")
                        }
                      >
                        Forgot your password{" "}
                        <ArrowForwardIcon fontSize="small" />
                      </p>
                    </div>
                    <div className="loginBtnWrapper">
                      <ThemeButton
                        name={Constants.LOGIN}
                        onClick={formik.handleSubmit}
                        round={false}
                        style={{
                          marginTop: 18,
                          background: Colors.themePurple,
                          color: Colors.white,
                          width: "80%",
                          backgroundImage:
                            "linear-gradient(to right, #fcb317, #8bb589, #61b5b3)",
                          fontFamily: "Poppins",
                          fontWeight: "bolder",
                          fontSize: "larger"
                        }}
                      />
                    </div>
                  </>
                )}
              </Formik>
              <div className="createAccount">
                <p className="account">{Constants.DONT_HAVE_ACCOUNT_YET}</p>
                <div>
                  <p
                    className="create"
                    onClick={() => {
                      this.props.history.push("/signup");
                    }}
                  >
                    {Constants.SIGN_UP_HERE}
                  </p>
                </div>
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
    auth: state.auth,
    verifyState: state.auth.verify
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (user: User) => dispatch(loginUser(user)),
    verifyUser: (token: any) => dispatch(verifyUser(token)),
    resendEmail: (email: any) => dispatch(resendEmail(email)),
    resetEmailVerifiedVariable: () => dispatch(resetEmailVerifiedVariable())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
