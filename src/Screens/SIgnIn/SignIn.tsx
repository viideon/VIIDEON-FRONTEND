import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { loginUser } from '../../Redux/Actions/auth';
import { AuthState, User } from '../../Redux/Types/auth';
import './style.css';
import * as Constants from '../../constants/components/SignIn';
import Loading from '../../components/Loading';

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
    const { loading } = this.props.auth;
    const { emailError, passwordError, invalidEmailError } = this.state;
    return (
      <>
        <Row xs="2">
          <Col xs="7">
            <div className='firstLayoutContainer'>
              <div className='firstLayoutMainContainer'>

                <p className='signUp'>Signup to</p>
                <p className='logo'>VIDIONPRO</p>
                <p className='login'>Login to your account</p>
              </div>
            </div>

          </Col >
          <Col xs="5">
            <div className='secondLayoutMainContainer'>
              <p className='loginTwo'>Login</p>
              <div className='createAccount'>
                <p className="account">Don't have an account yet?</p>
                <div onClick={() => { this.props.history.push('/signup') }}>
                  <p className='create' >Create one here</p>
                </div>
              </div>
              <div style={{ marginLeft: '35%', opacity: 0.5 }}>
                {loading ? <Loading /> : null}
              </div>
              <Form id="formInput" style={{ margin: 25, width: '85%' }}>
                <FormGroup>
                  <Label for="exampleEmail" style={{ fontWeight: 'bold' }}>{Constants.EMAIL}</Label>
                  <div className="textInput">
                    <Input type="text" name="email" id="typeInput" placeholder=""
                      onChange={this.usernameHandler}
                    />
                    <i className="w3-xxlarge fa fa-user" style={{ width: '5%', margin: 10 }}></i>
                  </div>
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
                  <Label for="examplePassword" style={{ fontWeight: 'bold' }}>{Constants.PASSWORD}</Label>
                  <div className="textInput">
                    <Input type="password" name="password" id="typeInput" placeholder="Password"
                      onChange={this.passwordHandler}
                    />
                    <i className="w3-xxlarge fa fa-key" style={{ width: '5%', margin: 10 }}></i>
                  </div>
                </FormGroup>
                {passwordError &&
                  <Alert color="danger">
                    {Constants.PASSWORD_ERROR}
                  </Alert>
                }
                <div className='buttonWrapper'>
                  <Button color='#9F55FF' onClick={this.loginHandler} style={{ backgroundColor: '#9F55FF', width: '100%', color: 'white' }}>{Constants.LOGIN}</Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
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