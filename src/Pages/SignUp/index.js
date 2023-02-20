import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub
} from "@fortawesome/free-brands-svg-icons";
import classNames from "classnames/bind";
import style from "./SignUp.module.scss";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";


const cx = classNames.bind(style);

function SignUp() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  let navigate = useNavigate();

  const handleEmailChange = (email) => {
    setEmail(email.target.value);
  };
  const handlePassChange = (pass) => {
    setPass(pass.target.value);
  };
  const handleConfirmChange = (confirmPass) => {
    setConfirmPass(confirmPass.target.value);
  };
  let handleClick = () => {
    if (confirmPass === pass) {
      localStorage.setItem(
        "login",
        JSON.stringify([
          {
            email: email,
            pass: pass,
            user: [{ fullName: "", phone: "", address: "" }],
            listOrder: [],
            purchaseOrder: [],
            ID: "1",
          },
        ])
      );
      navigate("/login");
      localStorage.setItem("isLogin", true);
    } else {
      alert("Sign in false \nPlease check again!");
    }
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
            <h2>Sign up Form</h2>
            <div className={cx("detail")}>
              <div className={cx("input")}>
                <input
                  type="email"
                  autoComplete="Email"
                  placeholder="Enter your email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className={cx("input")}>
                <input
                  type="password"
                  autoComplete="Password"
                  placeholder="Enter your password"
                  id={cx("pass")}
                  value={pass}
                  onChange={handlePassChange}
                />
              </div>
              <div className={cx("input")}>
                <input
                  type="password"
                  autoComplete="Confirm Password"
                  placeholder="Confirm your password"
                  id={cx("confirmPass")}
                  value={confirmPass}
                  onChange={handleConfirmChange}
                />
              </div>
              <button type="button" onClick={handleClick}>
                Sign Up
              </button>
              <div className={cx("toLogin")}><a href="/login">You have an account ?</a></div>
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
