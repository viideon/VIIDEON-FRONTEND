import React from "react";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import Label from "../../components/Reusable/Label";
import ThemeButton from "../../components/ThemeButton";
import { toast } from "react-toastify";
import InputRound from "../../components/InputRound/InputRoundIcon";
import { connect } from "react-redux";
import { registerUser } from "../../Redux/Actions/register";
import {RegisterState} from "../../Redux/Types/register";
import { User } from "../../Redux/Types/register";
import * as Constants from "../../constants/constants";
import Loading from "../../components/Loading";
import "./style.css";
import * as Yup from "yup";
import { Formik } from "formik";
import {Auth} from "aws-amplify";

import Colors from "../../constants/colors";
import whiteLogo from "../../assets/logo.png";
import atom from "../../assets/atom.png";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Enter Password")
    .min(6, "Password must be 6 characters long"),
  email: Yup.string()
    .required("Enter Email")
    .matches(/([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@gmail([\.])com/g, "Please enter a gmail account"),
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
  creatingCognitoUser: boolean;
}

class Signup extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      next: false,
      showNext: true,
      creatingCognitoUser: false,
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

  onSubmit = async (values: any) => {
    try {
      this.setState({creatingCognitoUser: true} as Pick<IState, any>);
      const {userSub} = await Auth.signUp({
        username: values.email,
        password: values.password,
        attributes: {
          email: values.email,
          given_name: values.firstName,
          family_name: values.lastName,
        },
      });
      console.log('Cognito user registered')
      const _user = {
        userSub,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        userName: values.userName,
        password: values.password
      };
      this.setState({creatingCognitoUser: false} as Pick<IState, any>);
      return this.props.register(_user);
    } catch (error) {
      console.log('Error creating user', error);
      console.error(error)
      this.setState({creatingCognitoUser: false} as Pick<IState, any>);
      if (error.name === 'UsernameExistsException') {
        toast.error('Please sign in to continue.');
      } else if (error.name === 'InvalidPasswordException') {
        toast.error('The provided password is invalid.');
      } else {
        toast.error('We are having trouble processing your request. Please try again later.');
      }
    }
  }

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
      <>
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
                {(loading || this.state.creatingCognitoUser) && (
                  <span className="innerWrapperLoader">
                    <Loading />
                  </span>
                )}
              </div>
              <Formik
                onSubmit={this.onSubmit}
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
                    <div className="formGroups">
                      <Label text="Enter Gmail Account" />
                      <InputRound
                        type="email"
                        name="email"
                        placeholder="Enter your gmail account"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                    </div>

                    {formik.errors.email && formik.touched.email && (
                      <Alert severity="warning">{formik.errors.email}</Alert>
                    )}

                    {this.state.showNext && (
                      <div className="signupBtns">
                        <ThemeButton
                          onClick={() =>
                            this.nextHandler(
                              formik.values.email,
                              formik.errors.email,
                              formik.touched.email
                            )
                          }
                          round={false}
                          style={{
                            marginTop: 18,
                            background: Colors.themePurple,
                            color: Colors.white,
                            width: "60%",
                            backgroundImage:
                              "linear-gradient(to right, #fcb317, #8bb589, #61b5b3)",
                            fontFamily: "Poppins",
                            fontWeight: "bolder",
                            fontSize: "larger"
                          }}
                          // style={{ backgroundColor: Colors.themePurple, color: Colors.white, width: "150px" }}
                          name={Constants.NEXT}
                        />
                      </div>
                    )}
                    {this.state.next && (
                      <>
                        <div className="formGroups">
                          <Label text={Constants.FIRSTNAME} />
                          <InputRound
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                          />
                        </div>

                        {formik.errors.firstName &&
                          formik.touched.firstName && (
                            <Alert severity="warning">
                              {formik.errors.firstName}
                            </Alert>
                          )}

                        <div className="formGroups">
                          <Label text={Constants.LASTNAME} />
                          <InputRound
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                          />
                        </div>

                        {formik.errors.lastName && formik.touched.lastName && (
                          <Alert severity="warning">
                            {formik.errors.lastName}
                          </Alert>
                        )}

                        <div className="formGroups">
                          <Label text={Constants.USERNAME} />
                          <InputRound
                            type="text"
                            name="userName"
                            placeholder="User Name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.userName}
                          />
                        </div>

                        {formik.errors.userName && formik.touched.userName && (
                          <Alert severity="warning">
                            {formik.errors.userName}
                          </Alert>
                        )}

                        <div className="formGroups">
                          <Label text="Password" />
                          <InputRound
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                          />
                        </div>

                        {formik.errors.password && formik.touched.password && (
                          <Alert severity="warning">
                            {formik.errors.password}
                          </Alert>
                        )}

                        <div className="formGroups">
                          <Label text={Constants.CONFIRM_PASSWORD} />
                          <InputRound
                            type="password"
                            name="passwordConfirmation"
                            placeholder="Confirm Password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.passwordConfirmation}
                          />
                        </div>

                        {formik.errors.passwordConfirmation &&
                          formik.touched.passwordConfirmation && (
                            <Alert severity="warning">
                              {formik.errors.passwordConfirmation}
                            </Alert>
                          )}

                        <div className="signupBtns">
                          <ThemeButton
                            onClick={formik.handleSubmit}
                            name={Constants.REGISTER}
                            round={false}
                            style={Colors.themeGradientBtn}
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}
              </Formik>
            </div>
          </Grid>
        </Grid>
      </>
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
