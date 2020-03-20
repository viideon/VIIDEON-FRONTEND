import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { loginUser } from '../../Redux/Actions/auth';
import { AuthState, User } from '../../Redux/Types/auth';
import './style.css';
import * as Constants from '../../constants/components/SignIn';

const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

type IProps = {
  navigation: any;
  auth: AuthState
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
class SignIn extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: false,
      passwordError: false,
      invalidEmailError: false,
    };
  }

  usernameHandler = (event: any) => {
    this.setState({
      email: event.target.value
    })
  }
  passwordHandler = (event: any) => {
    this.setState({
      password: event.target.value
    })
  }
  loginHandler = () => {
    const { email, password } = this.state;
    if (email === '') this.setState({ emailError: true });
    else if (reg.test(email) === false) this.setState({ invalidEmailError: true });
    else if (password === '') this.setState({ passwordError: true });
    else {
      const user = {
        email,
        password
      };
      console.log("The Login User Are: ", user);
      this.props.login(user);
    }
  }
  render() {
    const { emailError, passwordError, invalidEmailError } = this.state;

    return (
      <>
        <div className='MainContainer'>
          <Form style={{ margin: 25, width: '85%' }}>
            <FormGroup>
              <Label for="exampleEmail" >{Constants.EMAIL}</Label>
              <Input type="email" name="email" id="exampleEmail" placeholder="Email"
                onChange={this.usernameHandler}
              />
            </FormGroup>
            {emailError &&
              <Alert color="danger">
                {Constants.EMAIL_ERROR}
              </Alert>
            }
            {invalidEmailError &&
              <Alert color="danger">
                {Constants.EMAIL_INVALID}
              </Alert>
            }
            <FormGroup>
              <Label for="examplePassword" >{Constants.PASSWORD}</Label>
              <Input type="password" name="password" id="examplePassword" placeholder="Password"
                onChange={this.passwordHandler}
              />
            </FormGroup>
            {passwordError &&
              <Alert color="danger">
                {Constants.PASSWORD_ERROR}
              </Alert>
            }
            <Button theme="info" onClick={this.loginHandler}>{Constants.LOGIN}</Button>
            <div className='RegisterAccount'>
              <p className="Account">{Constants.DONT_HAVE_ACCOUNT}</p>
              <Button theme="info" onClick={() => { this.props.history.push('/signup') }}>{Constants.REGISTER}</Button>
            </div>
          </Form>
        </div>

      </>
    );
  }
}
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);