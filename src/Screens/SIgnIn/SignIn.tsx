import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert, Row, Col, Container } from 'reactstrap';
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
        <div className='firstLayoutContainer' style={{width: '55%', float:'left'}}>
          {/* <Container fluid>
            <Row>
              <Col sm="12"> */}
                <div className='firstLayoutMainContainer'>

                  <p className='signUp'>{Constants.SIGNUP_TO}</p>
                  <p className='logo'>{Constants.VIDIONPRO}</p>
                  <p className='login'>{Constants.LOGIN_TO_ACCOUNT}</p>
                </div>

              {/* </Col >
            </Row>
          </Container> */}
        </div>
        {/* <Container>
        <Row>
          <Col sm="12"> */}
            <div className='secondLayoutMainContainer' style={{width:'45%', float:'left'}}>
              <p className='loginTwo'>{Constants.LOGIN}</p>
              <div className='createAccount'>
                <p className="account">{Constants.DONT_HAVE_ACCOUNT_YET}</p>
                <div onClick={() => { this.props.history.push('/signup') }}>
                  <p className='create' >{Constants.CREATE_NEW}</p>
                </div>
              </div>
              <div style={{ marginLeft: '35%', opacity: 0.5 }}>
                {loading ? <Loading /> : null}
              </div>
              <Form style={{ width: '80%' }}>
                <FormGroup>
                  <Label for="exampleEmail" style={{ fontWeight: 'bold' }}>{Constants.EMAIL}</Label>
                  <div className="textInput">
                    <Input type="text" name="email" id="email" placeholder="Email address"
                      onChange={this.usernameHandler}
                      style={{ borderRadius: '10rem', borderWidth: 0, borderColor: 'white', boxShadow: 'white' }}

                    />
                    <i className="w3-xxlarge fa fa-user" style={{ width: '5%', margin: 10 }}></i>
                  </div>
                </FormGroup>
                <div style={{ width: '69%' }}>
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
                </div>
                <FormGroup>
                  <Label for="examplePassword" style={{ fontWeight: 'bold' }}>{Constants.PASSWORD}</Label>
                  <div className="textInput">
                    <Input type="password" name="password" id="password" placeholder="Password"
                      onChange={this.passwordHandler}
                      style={{ borderRadius: '10rem', borderWidth: 0, borderColor: 'white', boxShadow: 'white' }}
                    />
                    <i className="w3-xxlarge fa fa-key" style={{ width: '5%', margin: 10 }}></i>
                  </div>
                </FormGroup>
                <div style={{ width: '69%' }}>
                  {passwordError &&
                    <Alert color="danger">
                      {Constants.PASSWORD_ERROR}
                    </Alert>
                  }
                </div>
                <div className='mainWrapperLayout'>
                  <p className="forgotPassword">Forget your Password</p>

                  <Button color='#9F55FF' onClick={this.loginHandler} style={{ marginTop: 18, backgroundColor: '#9F55FF', width: '40%', marginBottom: '10px', color: 'white', borderRadius: '10rem' }}>{Constants.LOGIN}</Button>
                </div>
              </Form>
            </div>
          {/* </Col>
        </Row>
      </Container> */}
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