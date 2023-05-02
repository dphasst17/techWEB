/* eslint-disable no-undef */
/* eslint-disable no-lone-blocks */
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./Login.module.scss";
import classNames from "classnames/bind";
import Cookies from "js-cookie";
import {
  faEye,
  faEyeSlash,
  faRightToBracket,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FcGoogle } from "react-icons/fc";
import { ApiContext } from "~/ContextApi/ContextApi";
import Loading from "~/components/Loading/Loading";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { useGoogleLogin } from "@leecheuk/react-google-login";
import { gapi } from "gapi-script";

const cx = classNames.bind(style);

const Login = () => {
  const { isLoad, setIsLoad, HandleLogin } =
    useContext(ApiContext);
  const [username, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [type, setType] = useState("password");
  const [showPass, setShowPass] = useState(true);
  const [falseMess, setFalseMess] = useState("-200%");
  const [isFalse, setIsFalse] = useState(false);
  const [result, setResult] = useState("");
  const [isLog, setIsLog] = useState(true);
  const clientId =
    "132575877421-gig4g2ahetogi4sr2071v1i3d4j1eifu.apps.googleusercontent.com";

  const handleUserNameChange = (username) => {
    setUserName(username.target.value);
  };
  const handlePassChange = (pass) => {
    setPass(pass.target.value);
  };
  const handleConfirmChange = (confirmPass) => {
    setConfirmPass(confirmPass.target.value);
  };

  const name = sessionStorage.getItem("pathName")
    ? JSON.parse(sessionStorage.getItem("pathName"))
    : "/";

  
    const showMessage = (message) => {
      setResult(message);
      setTimeout(() => {
        setIsFalse(!isFalse);
        setFalseMess("2%");
      });
      setTimeout(() => {
        setIsFalse(!isFalse);
        setFalseMess("-200%");
      }, 4000);
    };

  
  useEffect(() => {
    // Khởi tạo SDK của Facebook
    window.fbAsyncInit = function () {
      FB.init({
        appId: "606762504304033",
        cookie: true,
        xfbml: true,
        version: "v12.0",
      });
    };
    (function (d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  
  /* LOGIN WITH FACEBOOK */
  const HandleFacebookLogin = () => {
    window.FB.login((response) => {
      if (response.authResponse) {
        window.FB.api("/me", { fields: "name,email" }, (response) => {
          HandleLogin(response.name, response.email, name);
        });
      } else {
        setFalseMess("2%");
      }
    });
  };


  /*LOGIN WITH GOOGLE  */
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId });
    });
  }, []);
  const onFailure = (error) => {
    console.log(error); /* message err */
  };
  const onSuccess = (response) => {
    HandleLogin(response.profileObj.name, response.profileObj.email, name);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
  });
  /* LOGIN WITH USERNAME */
  const handleClick = () => {
    if (username !== "" && pass !== "") {
      setIsLoad(true)
      const option = {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          username: username,
          password: pass,
        }),
      };
      fetch(process.env.REACT_APP_URL_LOGIN, option)
        .then((res) => res.json())
        .then((res) => {
          const accessToken = res.accessToken;
          const refreshToken = res.refreshToken;
          const expirationTime = new Date().getTime() + 600 * 1000; // Thêm 10  vào thời gian hiện tại

          localStorage.setItem("accessTK", accessToken);
          localStorage.setItem("expirationTime", expirationTime);
          Cookies.set("RFTokens", refreshToken, { expires: 5, path: "/" });
          localStorage.setItem("isLogin", true);
          setIsLoad(false)
          if (name){ 
            name === "/login" ? window.location.pathname = "/": window.location.pathname = name 
          }else{ 
            window.location.pathname = "/"; 
          }
        });
    } else {
      setResult("Please enter in your login information!");
      setTimeout(() => {
        setIsFalse(!isFalse);
        setFalseMess("2%");
      });
      setTimeout(() => {
        setIsFalse(!isFalse);
        setFalseMess("-200%");
      }, 4000);
    }
  };
  /* CREATE ACCOUNT */
  

  let handleClickCreate = () => {
    if (username === "" || pass === "" || confirmPass === "") {
      showMessage("Please enter information!");
      return;
    }
  
    if (confirmPass !== pass) {
      showMessage("Password confirmation failed");
      return;
    }
  
    setIsLoad(true);
    const option = {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        username: username,
        password: pass,
      }),
    };
    fetch(process.env.REACT_APP_URL_REGISTER, option).then((res) => {
      if (res.status === 201 || res.status === 400) {
        if (res.status === 201) {
          setIsLoad(false);
          setIsLog(true);
        } else {
          setIsLoad(false);
          showMessage("Username is already taken");
        }
      }
    });
  };

  return (
    <>
      <div className={cx("login_container")}>
        <div className={cx("form")}>
          <div className={cx("backHome")}>
            <a href="/">
              <FontAwesomeIcon icon={faRightToBracket} />
            </a>
          </div>
          <form>
            <div className={cx("itemsForm")}>
              {isLog === true ? (
                <>
                  <h2>Log In form</h2>
                  <div className={cx("detail")}>
                    <div
                      className={cx("input")}
                      style={{
                        borderColor:
                          username.length > 0
                            ? "rgb(70, 117, 200)"
                            : "rgb(195, 9, 9)",
                      }}
                    >
                      <input
                        type="username"
                        placeholder="Enter your username"
                        onChange={handleUserNameChange}
                        value={username}
                        required
                      />
                    </div>
                    <div
                      className={cx("input")}
                      style={{
                        borderColor:
                          pass.length > 0
                            ? "rgb(70, 117, 200)"
                            : "rgb(195, 9, 9)",
                      }}
                    >
                      <input
                        type={type}
                        autoComplete="Password"
                        placeholder="Enter your Password"
                        onChange={handlePassChange}
                        value={pass}
                        required
                      />
                      <div className={cx("eyeSlash")}>
                        {showPass === true ? (
                          <FontAwesomeIcon
                            icon={faEyeSlash}
                            onClick={() => {
                              setType("text");
                              setShowPass(false);
                            }}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faEye}
                            onClick={() => {
                              setType("password");
                              setShowPass(true);
                            }}
                          />
                        )}
                      </div>
                    </div>
                    <div className={cx("forgotPass")}>
                      <p>Forgot Password? </p>
                    </div>
                    <button type="button" onClick={handleClick}>
                      Login
                    </button>
                    <div className={cx("navigation")}>
                      <p onClick={() => setIsLog(false)}>Create account</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h2>Create account From</h2>
                  <div className={cx("detail")}>
                    <div
                      className={cx("input")}
                      style={{
                        borderColor:
                          username.length > 0
                            ? "rgb(70, 117, 200)"
                            : "rgb(195, 9, 9)",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Enter your username"
                        id="username"
                        value={username}
                        onChange={handleUserNameChange}
                        required
                      />
                    </div>

                    <div
                      className={cx("input")}
                      style={{
                        borderColor:
                          pass.length > 0
                            ? "rgb(70, 117, 200)"
                            : "rgb(195, 9, 9)",
                      }}
                    >
                      <input
                        type="password"
                        autoComplete="Password"
                        placeholder="Enter your password"
                        id={cx("pass")}
                        value={pass}
                        onChange={handlePassChange}
                        required
                      />
                    </div>
                    <div
                      className={cx("input")}
                      style={{
                        borderColor:
                          confirmPass.length > 0
                            ? "rgb(70, 117, 200)"
                            : "rgb(195, 9, 9)",
                      }}
                    >
                      <input
                        type="password"
                        autoComplete="Confirm Password"
                        placeholder="Confirm your password"
                        id={cx("confirmPass")}
                        value={confirmPass}
                        onChange={handleConfirmChange}
                        required
                      />
                    </div>
                    <button type="button" onClick={handleClickCreate}>
                      Create account
                    </button>
                    <div className={cx("navigation")}>
                      <p onClick={() => setIsLog(true)}>
                        You have an account ?
                      </p>
                    </div>
                  </div>
                </>
              )}
              <span className={cx("loginIcon")}>
                <span className={cx("Icon")} onClick={HandleFacebookLogin}>
                  <FaFacebook />
                  <span>FACEBOOK</span>
                </span>
                <span className={cx("Icon")} onClick={signIn}>
                  <FcGoogle />
                  <span>GOOGLE MAIL</span>
                </span>
                <span className={cx("Icon")}>
                  <FaGithub />
                  <span>GITHUB</span>
                </span>
              </span>
            </div>
          </form>
        </div>
      </div>
      {isLoad === true && <Loading />}
      {isFalse && (
        <div
          className={cx("falseMess")}
          style={{ transform: "translateX(" + falseMess + ")" }}
        >
          <div className={cx("falseCT")}>
            <p>{result}</p>
          </div>
          <div className={cx("falseBTN")}>
            <FontAwesomeIcon
              icon={faX}
              onClick={() => {
                setFalseMess("-200%");
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
