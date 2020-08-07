import React from "react";
import Grid from "@material-ui/core/Grid";
import { Button, FormGroup, Label, Alert } from "reactstrap";
import { toast } from "react-toastify";
import InputRound from "../../components/InputRound";
import { connect } from "react-redux";
import { registerUser } from "../../Redux/Actions/register";
import { RegisterState } from "../../Redux/Types/register";
import { User } from "../../Redux/Types/register";
import * as Constants from "../../constants/constants";
import Loading from "../../components/Loading";
import { reg } from "../../constants/emailRegEx";
import "./style.css";
import * as Yup from "yup";
import { Formik } from "formik";
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Enter Password")
    .min(6, "Password must be 6 characters long"),
  email: Yup.string()
    .required("Enter Email")
    .matches(
      /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@gmail([\.])com/g,
      "Please enter a gmail account"
    ),
  passwordConfirmation: Yup.string()
    .required("Enter Confirm Password ")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  firstName: Yup.string().required("Enter First Name"),
  lastName: Yup.string().required("Enter Last Name"),
  userName: Yup.string().required("Enter User Name")
});
interface IProps {
  registerUser: RegisterState;
  register: (user: User) => void;
  history: any;
}
interface IState {
  next: boolean;
  showNext: boolean;
}

class Signup extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
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

  onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value } as Pick<IState, any>);
  };

  nextHandler = (email: any, error: any, touched: any) => {
    if (email === "") {
      toast.error("Enter Email");
    } else if (error && touched) {
      toast.error(error);
    } else {
      this.setState({ showNext: false, next: true });
    }
  };
  render() {
    const { loading } = this.props.registerUser;
    return (
      <div>
        <Grid container>
          <Grid item xs={12} md={7} sm={12}>
            {this.state.next ? (
              <div className="firstLayoutContainer">
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
                <div>
                  <p
                    className="create"
                    onClick={() => {
                      this.props.history.push("/login");
                    }}
                  >
                    Login here
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
                  const user = {
                    email: values.email,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    userName: values.userName,
                    password: values.password
                  };
                  this.props.register(user);
                }}
                initialValues={{
                  password: "",
                  firstName: "",
                  lastName: "",
                  userName: "",
                  passwordConfirmation: "",
                  email: ""
                }}
                validationSchema={validationSchema}
              >
                {formik => (
                  <div>
                    <FormGroup>
                      <Label for="exampleEmail" style={{ fontWeight: "bold" }}>
                        {/* {Constants.EMAIL_BUSINESS} */}
                        Enter Gmail Account
                      </Label>

                      <InputRound
                        type="email"
                        name="email"
                        placeholder="Enter your gmail account"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                    </FormGroup>

                    {formik.errors.email && formik.touched.email && (
                      <Alert color="danger">{formik.errors.email}</Alert>
                    )}

                    {this.state.showNext && (
                      <div className="buttonWrapper">
                        <Button
                          color="#9F55FF"
                          onClick={() =>
                            this.nextHandler(
                              formik.values.email,
                              formik.errors.email,
                              formik.touched.email
                            )
                          }
                          style={registerBtnStyle}
                        >
                          {Constants.NEXT}
                        </Button>
                      </div>
                    )}
                    {this.state.next && (
                      <>
                        <FormGroup>
                          <Label>{Constants.FIRSTNAME}</Label>

                          <InputRound
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                          />
                        </FormGroup>

                        {formik.errors.firstName &&
                          formik.touched.firstName && (
                            <Alert color="danger">
                              {formik.errors.firstName}
                            </Alert>
                          )}

                        <FormGroup>
                          <Label>{Constants.LASTNAME}</Label>

                          <InputRound
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                          />
                        </FormGroup>

                        {formik.errors.lastName && formik.touched.lastName && (
                          <Alert color="danger">{formik.errors.lastName}</Alert>
                        )}

                        <FormGroup>
                          <Label>{Constants.USERNAME}</Label>

                          <InputRound
                            type="text"
                            name="userName"
                            placeholder="User Name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.userName}
                          />
                        </FormGroup>

                        {formik.errors.userName && formik.touched.userName && (
                          <Alert color="danger">{formik.errors.userName}</Alert>
                        )}

                        <FormGroup>
                          <Label for="examplePassword">Password</Label>

                          <InputRound
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                          />
                        </FormGroup>

                        {formik.errors.password && formik.touched.password && (
                          <Alert color="danger">{formik.errors.password}</Alert>
                        )}

                        <FormGroup>
                          <Label for="examplePassword">
                            {Constants.CONFIRM_PASSWORD}
                          </Label>

                          <InputRound
                            type="password"
                            name="passwordConfirmation"
                            placeholder="Confirm Password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.passwordConfirmation}
                          />
                        </FormGroup>

                        {formik.errors.passwordConfirmation &&
                          formik.touched.passwordConfirmation && (
                            <Alert color="danger">
                              {formik.errors.passwordConfirmation}
                            </Alert>
                          )}

                        <div className="buttonWrapper1">
                          <Button
                            color="#9F55FF"
                            onClick={formik.handleSubmit}
                            style={registerBtnStyle}
                          >
                            {Constants.REGISTER}
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </Formik>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const registerBtnStyle = {
  backgroundColor: "#9F55FF",
  width: "40%",
  float: "right",
  marginBottom: "10px",
  color: "white",
  borderRadius: "10rem"
} as React.CSSProperties;

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
