import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { registerUser } from '../../Redux/Actions/register';
import { RegisterState } from '../../Redux/Types/register';
import { User } from '../../Redux/Types/register';

const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

type IProps = {
  navigation: any;
  registerUser: RegisterState;
  register: (user: User) => void;
};
type IState = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  emailError: boolean;
  passwordError: boolean;
  invalidEmailError: boolean;
  c_passwordError:boolean;
  firstError:boolean;
  lastError:boolean;
  userNameError:boolean;
  confirmPasswordError:boolean;
};
class SignUp extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      userName: '',
      emailError: false,
      passwordError: false,
      invalidEmailError: false,
      c_passwordError: false,
      firstError: false,
      lastError: false,
      userNameError: false,
      confirmPasswordError: false,
    };
  }

  userNameHandler = (event: any) => {
    this.setState({
      userName: event.target.value
    })
  }
  firstNameHandler = (event: any) => {
    this.setState({
      firstName: event.target.value
    })
  }
  lastNameHandler = (event: any) => {
    this.setState({
      lastName: event.target.value
    })
  }
  emailHandler = (event: any) => {
    this.setState({
      email: event.target.value
    })
  }

  passwordHandler = (event: any) => {
    this.setState({
      password: event.target.value
    })
  }
  confirmPasswordHandler = (event: any) => {
    this.setState({
      confirmPassword: event.target.value
    })
  }
  registerHandler = () => {
    const { firstName, lastName, userName, email, password, confirmPassword } = this.state;
    if (firstName === '') this.setState({ firstError: true });
    else if (lastName === '') this.setState({ lastError: true });
    else if (userName === '') this.setState({ userNameError: true });
    else if (email === '') this.setState({ emailError: true });
    else if (reg.test(email) === false) this.setState({ invalidEmailError: true });
    else if (password === '') this.setState({ passwordError: true });
    else if (confirmPassword === '') this.setState({ confirmPasswordError: true });
    else if (password !== confirmPassword) this.setState({ c_passwordError: true });
    else {
      const user = {
        email,
        firstName,
        lastName,
        userName,
        password
      };
      this.props.register(user)
      console.log("The SignUp User Are: ", user)
    }
  }
  render() {
    const { firstError, lastError, emailError, passwordError, confirmPasswordError, c_passwordError, invalidEmailError, userNameError } = this.state;
    return (
      <>
        <div style={{ marginTop: '5%', marginLeft: '40%' }}>
          <Form style={{ width: '30%' }}>
          <FormGroup>
              <Label for="exampleEmail" >First Name</Label>
              <Input type="email" name="firstName" id="exampleEmail" placeholder="First Name"
                onChange={this.firstNameHandler}
              />
            </FormGroup>
            {firstError &&
              <Alert color="danger">
                First Name Not Empty
             </Alert>
            }
            <FormGroup>
              <Label for="exampleEmail" >Last Name</Label>
              <Input type="email" name="lastName" id="exampleEmail" placeholder="Last Name"
                onChange={this.lastNameHandler}
              />
            </FormGroup>
            {lastError &&
              <Alert color="danger">
                Last Name Not Empty
             </Alert>
            }
            <FormGroup>
              <Label for="exampleEmail" >UserName</Label>
              <Input type="email" name="userName" id="exampleEmail" placeholder="UserName"
                onChange={this.userNameHandler}
              />
            </FormGroup>
            {userNameError &&
              <Alert color="danger">
                UserName Not Empty
             </Alert>
            }
            <FormGroup>
              <Label for="exampleEmail" >Email</Label>
              <Input type="email" name="email" id="exampleEmail" placeholder="Email"
                onChange={this.emailHandler}
              />
            </FormGroup>
            {emailError &&
              <Alert color="danger">
                Email Not Empty
             </Alert>
            }
            {invalidEmailError &&
              <Alert color="danger">
                Email Invalid
             </Alert>
            }
            <FormGroup>
              <Label for="examplePassword" >Password</Label>
              <Input type="password" name="password" id="examplePassword" placeholder="Password"
                onChange={this.passwordHandler}
              />
            </FormGroup>
            {passwordError &&
              <Alert color="danger">
                Password Not Empty
             </Alert>
            }
            <FormGroup>
              <Label for="examplePassword" >Confrim Password</Label>
              <Input type="password" name="confirmPassword" id="examplePassword" placeholder="Confrim Password"
                onChange={this.confirmPasswordHandler}
              />
            </FormGroup>
            {confirmPasswordError &&
              <Alert color="danger">
               Confrim Password Not Empty
             </Alert>
            }
            {c_passwordError &&
              <Alert color="danger">
                Password Not Matched
             </Alert>
            }
            <Button theme="info" onClick={this.registerHandler}>Register</Button>
          </Form>
        </div>


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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);