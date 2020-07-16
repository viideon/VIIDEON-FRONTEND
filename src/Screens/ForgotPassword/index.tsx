import React from "react";
import Grid from "@material-ui/core/Grid";
import { Form, FormGroup, Label, Alert, Input } from "reactstrap";
import * as Constants from "../../constants/constants";
import { connect } from "react-redux";
import Loading from "../../components/Loading";
import { forgotPassword } from "../../Redux/Actions/auth";
import ActionButton from "../../components/Reusable/ActionButton";
import "./style.css";
import * as Yup from "yup";
import { Formik } from "formik";
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
          <Grid item xs={12} md={7} sm={12}>
            <div className="firstLayoutContainer">
              <div className="firstLayoutMainContainer">
                <p className="signUp">Reset Password for</p>
                <h2 className="logoSignin">{Constants.VIDIONPRO}</h2>
                <p className="login">Enter Email </p>
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
              <div
                style={{
                  marginLeft: "35%",
                  padding: "20px",
                  position: "relative"
                }}
              >
                {loading && (
                  <span style={{ position: "absolute" }}>
                    <Loading />
                  </span>
                )}
              </div>
              <Formik
                onSubmit={values => {
                  console.log(values);
                  this.props.forgotPassword({ email: values.email });
                }}
                initialValues={{
                  email: ""
                }}
                validationSchema={validationSchema}
              >
                {formik => (
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
                          style={inputStyle}
                          id="email"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                          autoComplete="off"
                        />
                        <i
                          className="w3-xxlarge fa fa-user"
                          style={iconStyle}
                        ></i>
                      </div>
                    </FormGroup>
                    <div style={{ width: "69%" }}>
                      {formik.errors.email && formik.touched.email && (
                        <Alert color="danger">{formik.errors.email}</Alert>
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
    forgotPassword: (email: any) => dispatch(forgotPassword(email))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
