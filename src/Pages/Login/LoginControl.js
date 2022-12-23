import React, { Component } from "react";
import style from "./Login.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

class LoginControl extends Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.state = { isLoggedIn: false };
  }

  handleLoginClick() {
    this.setState({ isLoggedIn: true });
  }

  handleRegisterClick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <RegisterButton onClick={this.handleRegisterClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div className={cx("login_container")}>
        <div className={cx("form")}>
          <form>
            <Greeting isLoggedIn={isLoggedIn} />
            {button}
          </form>
        </div>
      </div>
    );
  }
}
//LOGIN FORM
function Login(props) {
  return (
    <div className={cx("detail")}>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <input type="button" value="Login" />
      <a href="###">Forgot Password? </a>
    </div>
  );
}
//REGISTER FORM
function Register(props) {
  return (
    <div className={cx("detail")}>
      <input type="email" placeholder="Email address" />
      <input type="password" placeholder="Password" />
      <input type="password" placeholder="Enter the password" />
      <input type="button" value="Register" />
    </div>
  );
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <Register />;
  }
  return <Login />;
}
//Button from Login form
function LoginButton(props) {
  return (
    <div className={cx("register")}>
      <button onClick={props.onClick}>
        <a href="####">Register</a>
      </button>
    </div>
  );
}
//Button from Register form
function RegisterButton(props) {
  return (
    <div className={cx("signIn")}>
      <button onClick={props.onClick}>
        <a href="####">Have an account</a>
      </button>
    </div>
  );
}

export default LoginControl;
