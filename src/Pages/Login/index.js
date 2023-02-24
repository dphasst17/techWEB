/* eslint-disable no-undef */
/* eslint-disable no-lone-blocks */
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons";
import style from "./Login.module.scss";
import classNames from "classnames/bind";
import {
  faEyeSlash,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "~/ContextApi/ContextApi";

const cx = classNames.bind(style);

const Login = () => {
  const {Users}=useContext(ApiContext)
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [type, setType] = useState("password");
  const navigate = useNavigate();

 /*  const checkUser2 = dataUsers.map(user2 => {if(user2.password === "17052003zedzed"){return true}else{return false}}) */
  const handleEmailChange = (email) => {
    setEmail(email.target.value);
  };
  const handlePassChange = (pass) => {
    setPass(pass.target.value);
  };
  /* const checkUser =Users.filter((check) => check.email==="dfast17@gmail.com" && check.pass === "17052003zedzed"
  ); */
  const name = JSON.parse(sessionStorage.getItem("pathName"));
  const handleClick = () => {
    /* let checkLogin = JSON.parse(localStorage.getItem("login") || "[]"); */
    const dataUsers = Users.filter(user => (user.email=== email || user.usename === email) &&user.password === pass)
    if(dataUsers.length !== 0){
      navigate(name);
      localStorage.setItem("isLogin", true);
      localStorage.setItem("identificationID",JSON.stringify(dataUsers.map(items => items.id)))
    }else{
      alert("Login false \nPlease check again");
    }
    /* Users.map((check) => {
      if (check.email=== email && check.password === pass) {
        navigate(name);
        localStorage.setItem("isLogin", true);
      } else {
        alert("Login false \nPlease check again");
      }
      return null;
    }); */
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
          <img src="https://wallpaperaccess.com/full/1682077.png" alt="" />
          <div className={cx("itemsForm")}>
          <h2>Log In form</h2>
            <div className={cx("detail")}>
              <div className={cx("input")}>
                <input
                  type="email"
                  autoComplete="Email"
                  placeholder="Enter your email or username"
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
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    onClick={() => {
                      if (type === "password") {
                        setType("text");
                      } else {
                        setType("password");
                      }
                    }}
                  />
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
                  <FcGoogle />
                </span>
              </span>
              <span className={cx("Icon")}>
                <span className={cx("git")}>
                  <FontAwesomeIcon icon={faGithub} />
                </span>
              </span>
            </span>
          </div >
        </form>
      </div>
    </div>
  );
};

export default Login;
