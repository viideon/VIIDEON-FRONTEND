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
import { forgotPassword } from "../../Redux/Actions/auth";
import Colors from "../../constants/colors";
import "./style.css";

import whiteLogo from "../../assets/logo.png";
import atom from "../../assets/atom.png";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter Correct Email")
    .required("Enter Email")
});
type IProps = {
  navigation: any;
  auth: any;
  history: any;
  location?: any;
  forgotPassword?: any;
};
type IState = {
  email: string;
  password: string;
  emailError: boolean;
  passwordError: boolean;
  invalidEmailError: boolean;
  verifySuccessModals: boolean;
};
class ForgotPassword extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailError: false,
      passwordError: false,
      invalidEmailError: false,
      verifySuccessModals: false
    };
  }
  componentDidUpdate(prevProps: any) {
    if (
      this.props.auth &&
      JSON.stringify(prevProps.auth) !== JSON.stringify(this.props.auth) &&
      this.props.auth.forgotSuccess
    ) {
      this.props.history.push("/login");
    }
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value } as Pick<IState, any>);
  };

  render() {
    const { loading } = this.props.auth;
    return (
      <div>
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
          <Grid item xs={12} md={5} sm={12} style={{ zIndex: 231231232}}>
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
                  this.props.forgotPassword({ email: values.email });
                }}
                initialValues={{
                  email: ""
                }}
                validationSchema={validationSchema}
              >
                {formik => (
                  <>
                    <div className="formGroups">
                      <Label text={Constants.EMAIL_ADDRESS} />
                      <InputRoundIcon
                        type="email"
                        name="email"
                        placeholder="Email address"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        iconClass="iconPerson"
                      />
                    </div>

                    {formik.errors.email && formik.touched.email && (
                      <Alert severity="warning">{formik.errors.email}</Alert>
                    )}

                    <div className="mainWrapperLayout">
                      <ThemeButton
                        round={false}
                        name="Submit"
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
                        // style={{ marginTop: 18, minWidth: "150px", backgroundColor: Colors.themePurple, color: Colors.white }}
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
    forgotPassword: (email: any) => dispatch(forgotPassword(email))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
