/* eslint-disable no-undef */
/* eslint-disable no-lone-blocks */
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import style from "./Login.module.scss";
import classNames from "classnames/bind";
import {
  faEyeSlash,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "~/ContextApi/ContextApi";

const cx = classNames.bind(style);

const Login = () => {
  const {Users}=useContext(ApiContext)
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [type,setType] = useState("password")
  const navigate = useNavigate();

  const dataUsers = Users.map(user => ({"emailCheck":user.email,"passCheck":user.password,"usernameCheck":user.username}))
  console.log(dataUsers)
  const handleEmailChange = (email) => {
    setEmail(email.target.value);
  };
  const handlePassChange = (pass) => {
    setPass(pass.target.value);
  };
  const handleClick = () => {
    let checkLogin = JSON.parse(localStorage.getItem("login") || "[]");
    checkLogin.map((check) => {
      if (check.email === email && check.pass === pass) {
        navigate(-1);
        localStorage.setItem("isLogin", true);
      } else {
        alert("Login false \nPlease check again");
      }
      return null;
    });
  };
 
  return (
    <div className={cx("login_container")}>
      <div className={cx("form")}>
        <div className={cx("backHome")}>
          <a href="/">
            <FontAwesomeIcon icon={faRightToBracket} />
          </a>
        </div>
        <form>
          <h2>Log In form</h2>
          <img src="https://wallpaperaccess.com/full/1682077.png" alt="" />
          <div className={cx("detail")}>
            <div className={cx("input")}>
              <input
                type="email"
                autoComplete="Email"
                placeholder="Enter your email"
                onChange={handleEmailChange}
                value={email}
              />
            </div>
            <div className={cx("input")}>
              <input
                type={type}
                autoComplete="Password"
                placeholder="Enter your Password"
                onChange={handlePassChange}
                value={pass}
              />
              <div className={cx("eyeSlash")}>
                <FontAwesomeIcon icon={faEyeSlash} onClick={() =>{if(type === "password"){setType("text")}else{setType("password")}}}/>
              </div>
            </div>
            <div className={cx("forgotPass")}>
              <a href="###">Forgot Password? </a>
            </div>
            <button type="button" onClick={handleClick}>
              Log in
            </button>
            <div className={cx("navigation")}>
              <a href="/signup">Create account</a>
            </div>
          </div>
          <span className={cx("loginIcon")}>
            <span className={cx("Icon")}>
              <span className={cx("facebook")}>
                <FontAwesomeIcon icon={faFacebook} />
              </span>
            </span>
            <span className={cx("Icon")}>
              <span className={cx("google")}>
                <FontAwesomeIcon icon={faGoogle} />
              </span>
            </span>
            <span className={cx("Icon")}>
              <span className={cx("git")}>
                <FontAwesomeIcon icon={faGithub} />
              </span>
            </span>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
