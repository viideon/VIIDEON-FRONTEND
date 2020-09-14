import React from "react";
import Grid from "@material-ui/core/Grid";
import * as Yup from "yup";
import { Formik } from "formik";
import { connect } from "react-redux";
import InputRoundIcon from "../../components/InputRound/InputRoundIcon";
import Label from "../../components/Reusable/Label";
import Alert from "@material-ui/lab/Alert";
import { toast } from "react-toastify";
import * as Constants from "../../constants/constants";
import { reg } from "../../constants/emailRegEx";
import {
  loginUser,
  verifyUser,
  resendEmail,
  resetEmailVerifiedVariable
} from "../../Redux/Actions/auth";
import { User } from "../../Redux/Types/auth";
import Loading from "../../components/Loading";
import ThemeButton from "../../components/ThemeButton";
import VerifySuccessModal from "../../components/Modals/verifySuccessModal";
import Colors from "../../constants/colors";
import "./style.css";

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
  }

  componentDidUpdate(prevProps: any) {
    if (
      this.props.verifyState &&
      JSON.stringify(prevProps.verifyState) !==
      JSON.stringify(this.props.verifyState) &&
      this.props.verifyState.VerifySuccess
    ) {
      this.setState({ verifySuccessModals: true });
    }
    if (
      this.props.auth.loginError &&
      JSON.stringify(prevProps.auth) !== JSON.stringify(this.props.auth) &&
      this.props.auth.loginError.isEmailNotVerified
    ) {
      this.setState({ resendVerificationEmail: true });
      this.props.resetEmailVerifiedVariable();
      setTimeout(
        () => this.setState({ resendVerificationEmail: false }),
        10000
      );
    }
  }
  toggleVerifyModal = () => {
    this.setState({ verifySuccessModals: false });
    this.props.history.push("/login");
  };
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value } as Pick<IState, any>);
  };
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
        <VerifySuccessModal
          open={this.state.verifySuccessModals}
          toggle={this.toggleVerifyModal}
        />
        <Grid container>
          <Grid item xs={12} md={7} sm={12}>
            <div className="firstLayoutContainer">
              <div className="firstLayoutMainContainer">
                <p className="signUp">{Constants.SIGNIN_TO}</p>
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
                <div>
                  <p
                    className="create"
                    onClick={() => {
                      this.props.history.push("/signup");
                    }}
                  >
                    {Constants.CREATE_NEW}
                  </p>
                </div>
              </div>
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
                onSubmit={values => {
                  const user = {
                    email: values.email,
                    password: values.password
                  };
                  this.setState({ email: values.email });
                  this.props.login(user);
                }}
                initialValues={{
                  password: "",
                  email: ""
                }}
                validationSchema={validationSchema}
              >
                {formik => (
                  <>
                    <div className="formGroups">
                      <Label text={Constants.EMAIL_ADDRESS} />
                      <InputRoundIcon placeholder="Your registered E-mail" iconClass="iconPerson" type="text"
                        name="email" onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email} />
                    </div>

                    {formik.errors.email && formik.touched.email && (
                      <Alert severity="warning">{formik.errors.email}</Alert>
                    )}

                    <div className="formGroups">
                      <Label text={Constants.PASSWORD} />
                      <InputRoundIcon placeholder="Your password" iconClass="iconKey" type="password"
                        name="password" onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password} />
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
                        Forgot your password ?
                      </p>

                      <ThemeButton
                        name={Constants.LOGIN}
                        onClick={formik.handleSubmit}
                        round={true}
                        style={{ marginTop: 18, background: Colors.themePurple, color: Colors.white, width: "150px" }}
                      />
                    </div>
                  </>
                )}
              </Formik>
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
