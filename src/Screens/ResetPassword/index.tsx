import React from "react";
import Grid from "@material-ui/core/Grid";
import { Form, FormGroup, Label, Alert, Input } from "reactstrap";
import * as Constants from "../../constants/constants";
import { connect } from "react-redux";
import { reg } from "../../constants/emailRegEx";
import Loading from "../../components/Loading";
import { resetPassword } from "../../Redux/Actions/auth";
import { AuthState, User } from "../../Redux/Types/auth";
import ActionButton from "../../components/Reusable/ActionButton";
import "./style.css";
import VerifySuccessModal from "../../components/Modals/verifySuccessModal";
import * as Yup from "yup";
import { Formik } from "formik";
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
    console.log(search);
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      this.setState({ code: code });
    }
  }
  render() {
    const { loading } = this.props.auth;
    const { emailError, passwordError, invalidEmailError } = this.state;
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
                <p className="signUp">Reset Password for</p>
                <h2 className="logoSignin">{Constants.VIDIONPRO}</h2>
                <p className="login">Enter New Password </p>
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
              <div style={{ marginLeft: "35%", opacity: 0.5 }}>
                {loading && <Loading />}
              </div>
              <Formik
                onSubmit={values => {
                  console.log(values);
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
                  <Form style={{ width: "80%" }}>
                    <FormGroup>
                      <Label for="exampleEmail" style={{ fontWeight: "bold" }}>
                        New Password
                      </Label>
                      <div className="textInput">
                        <Input
                          type="password"
                          name="password"
                          placeholder="New Password"
                          id="password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password}
                          style={inputStyle}
                        />
                        <i
                          className="w3-xxlarge fa fa-key"
                          style={iconStyle}
                        ></i>
                      </div>
                    </FormGroup>
                    <div style={{ width: "69%" }}>
                      {formik.errors.password && formik.touched.password && (
                        <Alert color="danger">{formik.errors.password}</Alert>
                      )}
                    </div>
                    <FormGroup>
                      <Label
                        for="examplePassword"
                        style={{ fontWeight: "bold" }}
                      >
                        Confirm New Password
                      </Label>
                      <div className="textInput">
                        <Input
                          type="password"
                          name="passwordConfirmation"
                          placeholder="Confirm Password"
                          id="passwordConfirmation"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.passwordConfirmation}
                          style={inputStyle}
                        />
                        <i
                          className="w3-xxlarge fa fa-key"
                          style={iconStyle}
                        ></i>
                      </div>
                    </FormGroup>
                    <div style={{ width: "69%" }}>
                      {formik.errors.passwordConfirmation &&
                        formik.touched.passwordConfirmation && (
                          <Alert color="danger">
                            {formik.errors.passwordConfirmation}
                          </Alert>
                        )}
                    </div>
                    <div className="mainWrapperLayout">
                      <ActionButton
                        text="Submit"
                        bgColor="#9F55FF"
                        color="#fff"
                        onClick={formik.handleSubmit}
                        style={{ marginTop: 18, minWidth: "150px" }}
                      />
                    </div>
                  </Form>
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

// To be used later

/* <Input
type="password"
name="password"
placeholder="Password"
onChange={this.onChange}
id="input-with-icon-adornment"
endAdornment={
  <InputAdornment position="end">
    <VpnKeyIcon />
  </InputAdornment>
}
/> */
