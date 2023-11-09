/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Loading from "~/components/Loading/Loading";
import { useGoogleLogin } from "@leecheuk/react-google-login";
import { gapi } from "gapi-script";
import FormLogin from "./FormLogin";
import { login } from "~/api/authApi";

const Login = () => {
  const [username, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [type, setType] = useState("password");
  const [showPass, setShowPass] = useState(true);
  const [falseMess, setFalseMess] = useState("-200%");
  const [isFalse, setIsFalse] = useState(false);
  const [result, setResult] = useState("");
  const [isLog, setIsLog] = useState(true);
  const [isLoad,setIsLoad] = useState(false)

  const name = sessionStorage.getItem("pathName")
    ? JSON.parse(sessionStorage.getItem("pathName"))
    : "/";
  const clientId = process.env.REACT_APP_URL_GOOGLE

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
          handleLogin({email:response.email, name:response.name});
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
    handleLogin({email:response.profileObj.email, name:response.profileObj.name});
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
  });
  /* LOGIN WITH USERNAME */
  const handleLogin = (infoLogin) => {
    login(infoLogin)
      .then((res) => {
        const accessToken = res.accessToken;
        const refreshToken = res.refreshToken;

        localStorage.setItem("expAccess", res.expAccess);
        localStorage.setItem("expRefresh", res.expRefresh);
        Cookies.set("access", accessToken, {
          expires: new Date(res.expAccess * 1000),
        });
        Cookies.set("refresh", refreshToken, {
          expires: new Date(res.expRefresh * 1000),
          path: "/",
        });
        Cookies.set("role", res.role, {
          expires: new Date(res.expRefresh * 1000),
          path: "/",
        });
        localStorage.setItem("isLogin", true);
        setIsLoad(false);
        if (name) {
          window.location.pathname = name === "/login" ? "/" : name;
        } else {
          window.location.pathname = "/";
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleClick = () => {
    if (username !== "" && pass !== "") {
      setIsLoad(true);
      handleLogin({ username: username, password: pass });
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
    fetch(process.env.REACT_APP_URL_REGISTER, option)
      .then((res) => {
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
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <FormLogin
        props={{
          HandleFacebookLogin,
          isLog,
          type,
          showPass,
          setType,
          setShowPass,
          setIsLog,
          handleClickCreate,
          handleClick,
          handleUserNameChange,
          handlePassChange,
          handleConfirmChange,
          signIn,
        }}
      />
      {isLoad === true && <Loading />}
      {isFalse && (
        <div
          className="falseMess"
          style={{ transform: "translateX(" + falseMess + ")" }}
        >
          <div className="falseCT">
            <p>{result}</p>
          </div>
          <div className="falseBTN">
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
