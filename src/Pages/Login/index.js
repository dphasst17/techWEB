/* eslint-disable no-undef */
/* eslint-disable no-lone-blocks */
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./Login.module.scss";
import classNames from "classnames/bind";
import {
  faEye,
  faEyeSlash,
  faRightToBracket,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "~/ContextApi/ContextApi";
import Loading from "~/components/Loading/Loading";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { useGoogleLogin } from "@leecheuk/react-google-login";
import { gapi } from "gapi-script";

const cx = classNames.bind(style);
/* const clientId = "132575877421-gig4g2ahetogi4sr2071v1i3d4j1eifu.apps.googleusercontent.com"; */

const Login = () => {
  const { Users, isLoad, setIsLoad, urlUsers,HandleLogin } = useContext(ApiContext);
  const [username, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [type, setType] = useState("password");
  const [showPass, setShowPass] = useState(true);
  const [falseMess, setFalseMess] = useState(false);
  const [isLog, setIsLog] = useState(true);
  const navigate = useNavigate();

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

  const name = JSON.parse(sessionStorage.getItem("pathName") || "/");
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
      var js,
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
          HandleLogin(response.name,response.email,name)
        });
      } else {
        setFalseMess(false);
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
    console.log(error);/* message err */
  };
  const onSuccess = (response) => {
    HandleLogin(response.profileObj.name,response.profileObj.email,name)
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
  });
  /* LOGIN WITH USERNAME */
  const handleClick = () => {
    const dataUsers = Users.filter(
      (user) => user.username === username && user.password === pass
    );
    if (dataUsers.length !== 0) {
      if (name) {
        navigate(name);
        localStorage.setItem("isLogin", true);
        localStorage.setItem(
          "identificationID",
          JSON.stringify(dataUsers.map((items) => items.id))
        );
      } else {
        navigate("/");
        localStorage.setItem("isLogin", true);
        localStorage.setItem(
          "identificationID",
          JSON.stringify(dataUsers.map((items) => items.id))
        );
      }
    } else {
      setTimeout(() => {
        setFalseMess(true);
      });
      setTimeout(() => {
        setFalseMess(false);
      }, 5000);
    }
  };
  /* CREATE ACCOUNT */
  let handleClickCreate = () => {
    if (username !== "" && pass !== "" && confirmPass !== "") {
      if (
        Users.filter((items) => items.username.includes(username)).length === 0
      ) {
        if (confirmPass === pass) {
          setIsLoad(true);
          const option = {
            method: "POST",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({
              username: username,
              password: pass,
              user: [{ fullName: "", phoneNumber: "", email: "", address: "" }],
              listOrder: [],
              purchaseOrder: [],
              id: Users.length + 1,
            }),
          };
          fetch(urlUsers, option).then((res) => {
            if (res.status === 201) {
              setIsLoad(false);
              window.location.reload();
              setIsLog(true);
            }
          });
        } else {
          setResult("Password confirmation failed");
          setTimeout(() => {
            setIsFalse("2%");
          });
          setTimeout(() => {
            setIsFalse("-200%");
          }, 2300);
        }
      } else {
        setResult("This account has already existed");
        setTimeout(() => {
          setIsFalse("2%");
        });
        setTimeout(() => {
          setIsFalse("-200%");
        }, 2300);
      }
    } else {
      setResult("Please enter information!");
      setTimeout(() => {
        setIsFalse("2%");
      });
      setTimeout(() => {
        setIsFalse("-200%");
      }, 2300);
    }
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
            <img src="https://wallpaperaccess.com/full/1682077.png" alt="" />
            <div className={cx("itemsForm")}>
              {/* <h2>Log In form</h2> */}
              {isLog === true ? (
                <>
                  <h2>Log In form</h2>
                  <div className={cx("detail")}>
                    <div className={cx("input")}>
                      <input
                        type="username"
                        placeholder="Enter your username"
                        onChange={handleUserNameChange}
                        value={username}
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
                      Log in
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
                    <div className={cx("input")}>
                      <input
                        type="text"
                        placeholder="Enter your username"
                        id="username"
                        value={username}
                        onChange={handleUserNameChange}
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
      {falseMess === true ? (
        <div className={cx("falseMess")}>
          <div className={cx("falseCT")}>
            <p>
              Login false!<br></br>Please check again
            </p>
          </div>
          <div className={cx("falseBTN")}>
            <FontAwesomeIcon
              icon={faX}
              onClick={() => {
                setFalseMess(false);
              }}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Login;
