/* eslint-disable no-undef */
/* eslint-disable no-lone-blocks */
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./Login.module.scss";
import classNames from "classnames/bind";
import Cookies from "js-cookie";
import {
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { ApiContext } from "~/ContextApi/ContextApi";
import Loading from "~/components/Loading/Loading";
import { useGoogleLogin } from "@leecheuk/react-google-login";
import { gapi } from "gapi-script";
import FormLogin from "./FormLogin";

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
  
  const name = sessionStorage.getItem("pathName")
    ? JSON.parse(sessionStorage.getItem("pathName"))
    : "/";
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
          const expirationTime = res.expirationTime 

          localStorage.setItem("accessTK", accessToken);
          localStorage.setItem("expirationTime", expirationTime);
          Cookies.set("RFTokens", refreshToken, { expires: 5, path: "/" });
          localStorage.setItem("isLogin", true);
          setIsLoad(false)
          if (name){
            window.location.pathname = name === "/login" ? "/" : name 
            
          }else{ 
            window.location.pathname = "/"; 
          }
        })
        .catch((e) => {console.log(e)})
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
    })
    .catch((e) => {console.log(e)})
  };

  return (
    <>
      <FormLogin props={{HandleFacebookLogin,isLog,username,pass,confirmPass,type,showPass,setType,setShowPass,
        setIsLog,handleClickCreate,handleClick,handleUserNameChange,handlePassChange,handleConfirmChange,signIn}}/>
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