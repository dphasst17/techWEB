/* eslint-disable no-undef */
import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loading from "~/components/Loading/Loading";
import { useGoogleLogin } from "@leecheuk/react-google-login";
import { gapi } from "gapi-script";
import FormLogin from "./FormLogin";
import { forgotPass, login, register } from "~/api/authApi";

import "./Login.scss";
import { useForm } from "react-hook-form";
import { StateContext } from "~/contexts/stateContext";
import Alert from "../Alert";

const Login = () => {
  const {isAlert,setIsAlert,dataAlert,setDataAlert} = useContext(StateContext)
  const { register: registerLogin, handleSubmit: submitLogin, formState: { errors: errLogin } } = useForm();
  const { register: registerCreate, handleSubmit: submitCreate, formState: { errors: errCreate } } = useForm();
  const [formForgot,setFormForgot] = useState(false)
  const [type, setType] = useState("password");
  const [showPass, setShowPass] = useState(true);
  const [isLog, setIsLog] = useState(true);
  const [isLoad,setIsLoad] = useState(false)

  const name = sessionStorage.getItem("pathName")
    ? JSON.parse(sessionStorage.getItem("pathName"))
    : "/";
  const clientId = process.env.REACT_APP_URL_GOOGLE
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
          handleAuth('login',{email:response.email, name:response.name});
        });
      } else {
        showMessage('err','Login false');
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
    handleAuth('login',{email:response.profileObj.email, name:response.profileObj.name});
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
  });
  /* LOGIN WITH USERNAME */
  const onSubmitLogin = (data) => {
    setIsLoad(true);
    handleAuth('login',{username:data.loginUsername,password:data.loginPassword})
  }
  const onSubmitCreate = (data) => {
    if(data.regisConfirm !== data.regisPassword){
      showMessage('err',"Confirm password doesn't match with password")
    }else{
      setIsLoad(true)
      handleAuth('register',{username:data.regisUsername,password:data.regisPassword,email:data.regisEmail})
    }
  }
  const handleAuth = (type,infoLogin) => {
    (type === "login" ? login : register)(infoLogin)
      .then((res) => {
        setIsLoad(false);
        if(res.status === 200 || res.status === 201){
          const accessToken = res.data.accessToken;
          const refreshToken = res.data.refreshToken;

          localStorage.setItem("expAccess", res.data.expAccess);
          localStorage.setItem("expRefresh", res.data.expRefresh);
          Cookies.set("access", accessToken, {
            expires: new Date(res.data.expAccess * 1000),
          });
          Cookies.set("refresh", refreshToken, {
            expires: new Date(res.data.expRefresh * 1000),
            path: "/",
          });
          Cookies.set("role", res.data.role, {
            expires: new Date(res.data.expRefresh * 1000),
            path: "/",
          });
          localStorage.setItem("isLogin", true);
          setIsLoad(false);
          if (name) {
            window.location.pathname = name === "/login" ? "/" : name;
          } else {
            window.location.pathname = "/";
          }
        }else{
          console.log(res.message)
          showMessage('err',res.message)
        }
      })
  };
  
  const handleForgotPass = (username,email) => {
    forgotPass({username:username,email:email}).then(res => {
      if(res.status === 200){
        showMessage('success','Update password is successfully! Please check your email')
        setFormForgot(false)
      }else{
        showMessage('err',res.message)
      }
    })
  }
  const showMessage = (type,message) => {
    setIsAlert(true)
    setDataAlert({type:type,message:message})
    console.log(dataAlert)
  }
  return (
    <>
      <FormLogin
        props={{
          registerLogin,
          registerCreate,
          submitLogin,
          submitCreate,
          errLogin,
          errCreate,
          onSubmitLogin,
          onSubmitCreate,
          HandleFacebookLogin,
          handleForgotPass,
          isLog,
          formForgot,
          setFormForgot,
          type,
          showPass,
          setType,
          setShowPass,
          setIsLog,
          signIn,
        }}
      />
      {isLoad === true && <Loading />}
      {isAlert && <Alert />}
    </>
  );
};

export default Login;
