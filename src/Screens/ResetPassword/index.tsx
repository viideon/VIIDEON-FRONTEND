import React from "react";
import Grid from "@material-ui/core/Grid";
import * as Yup from "yup";
import { Formik } from "formik";
import InputRoundIcon from "../../components/InputRound/InputRoundIcon";
import Label from "../../components/Reusable/Label";
import Alert from "@material-ui/lab/Alert";
import ThemeButton from "../../components/ThemeButton";
import * as Constants from "../../constants/constants";
import { connect } from "react-redux";
import Loading from "../../components/Loading";
import { resetPassword } from "../../Redux/Actions/auth";
import Colors from "../../constants/colors";
import VerifySuccessModal from "../../components/Modals/verifySuccessModal";
import "./style.css";

import whiteLogo from "../../assets/logo.png";
import atom from "../../assets/atom.png";
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Required")
    .min(6, "Password must be 6 characters long"),
  passwordConfirmation: Yup.string()
    .required("Enter Confirm Password ")
    .oneOf([Yup.ref("password")], "Passwords must match")
});
type IProps = {
  navigation: any;
  auth: any;
  history: any;
  location?: any;
  verifyState?: any;
  resetPassword: any;
};
type IState = {
  email: string;
  password: string;
  emailError: boolean;
  passwordError: boolean;
  invalidEmailError: boolean;
  verifySuccessModals: boolean;
  code: string;
};
class ResetPassword extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailError: false,
      passwordError: false,
      invalidEmailError: false,
      verifySuccessModals: false,
      code: ""
    };
  }

  componentDidUpdate(prevProps: any) {
    if (
      this.props.auth &&
      JSON.stringify(prevProps.auth) !== JSON.stringify(this.props.auth) &&
      this.props.auth.resetSuccess
    ) {
      this.props.history.push("/login");
    }
  }
  toggleVerifyModal = () => {
    this.setState({ verifySuccessModals: false });
    this.props.history.push("/login");
  };
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value } as Pick<IState, any>);
  };
  componentDidMount() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      this.setState({ code: code });
    }
  }
  render() {
    const { loading } = this.props.auth;
    return (
      <div>
        <VerifySuccessModal
          open={this.state.verifySuccessModals}
          toggle={this.toggleVerifyModal}
        />
        <Grid container>
          <Grid item xs={12} md={7} sm={12} className="sm-none">
            <div className="firstLayoutContainer">
              <div className="firstLayoutMainContainer">
                <img src={whiteLogo} />
                VideonPro
              </div>
              <div
                style={{
                  position: "fixed",
                  bottom: "-13%",
                  left: "-3%",
                  opacity: "0.5"
                }}
              >
                <img style={{ width: "30%" }} src={atom} />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={5} sm={12}>
            <div className="secondLayoutMainContainer">
              <p className="loginTwo">Reset Password</p>
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
              <div className="wrapperLoader">
                {loading && (
                  <span className="innerWrapperLoader">
                    <Loading />
                  </span>
                )}
              </div>
              <Formik
                onSubmit={values => {
                  this.props.resetPassword({
                    token: this.state.code,
                    password: values.password
                  });
                }}
                initialValues={{
                  password: "",
                  passwordConfirmation: ""
                }}
                validationSchema={validationSchema}
              >
                {formik => (
                  <>
                    <div className="formGroups">
                      <Label text="New Password" />
                      <InputRoundIcon
                        type="password"
                        name="password"
                        placeholder="New Password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        iconClass="iconKey"
                      />
                    </div>

                    {formik.errors.password && formik.touched.password && (
                      <Alert severity="warning">{formik.errors.password}</Alert>
                    )}

                    <div className="formGroups">
                      <Label text=" Confirm New Password" />
                      <InputRoundIcon
                        type="password"
                        name="passwordConfirmation"
                        placeholder="Confirm Password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.passwordConfirmation}
                        iconClass="iconKey"
                      />
                    </div>

                    {formik.errors.passwordConfirmation &&
                      formik.touched.passwordConfirmation && (
                        <Alert severity="warning">
                          {formik.errors.passwordConfirmation}
                        </Alert>
                      )}

                    <div className="mainWrapperLayout">
                      <ThemeButton
                        name="Submit"
                        round={false}
                        onClick={formik.handleSubmit}
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
    resetPassword: (password: any) => dispatch(resetPassword(password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
