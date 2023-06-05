import "./Header.scss";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "~/Contexts/Cart";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiContext } from "~/ContextApi/ContextApi";
import Cookies from "js-cookie";
import HeaderMob from "./HeaderMob";
import HeaderPc from "./HeaderPc";
const menuNav = [
  {
    title: "HOME",
    path: "/",
  },
  {
    title: "PRODUCT",
    path: "/product",
  },
  {
    title: "ACCESSORY",
    path: "/accessory",
  },
];

function Header() {
  const [isShow, setIsShow] = useState(false);
  const {cartItems} = useContext(CartContext)
  const {
    valueSearch,
    handelValueSearch,
    showResult,
    handleSetIsShowResult,
    handleSetHideResult,
  } = useContext(ApiContext);
  const [isToggleNav, setIsToggleNav] = useState("translateX(-200%)");
  const [valueIP, setValueIP] = useState("Login");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  /*  */
  const activeNav = menuNav.findIndex((e) => e.path === pathname);
  const nav = useRef(null);

  let checkLogin = JSON.parse(localStorage.getItem("isLogin") || "[]");
  useEffect(()=>{
    if (checkLogin === true) {
      setValueIP("Logout")
    } else {
      setValueIP("Login")
    }
  },[checkLogin])
  /* check Login */
  let handleButtonLog = () => {
    sessionStorage.setItem(
      "pathName",
      JSON.stringify(window.location.pathname)
    );
    if (checkLogin === true) {
      localStorage.setItem("isLogin", false);
      localStorage.removeItem("identificationID")
      localStorage.removeItem("accessTK")
      Cookies.remove('RFTokens')
      navigate("/login");
    } else {
      navigate("/login");
    }
  };
  /* Check Login */
  /* Button check out */
  let handleCheckout = () => {
    if (checkLogin === true) {
      navigate("/checkout");
    } else {
      sessionStorage.setItem(
        "pathName",
        JSON.stringify('/checkout')
      );
      navigate("/login");
    }
  };
  let handleSetShow = () => {
    setIsShow(!isShow);
  };
  let show = () => {
    navigate("/searchResult");
  };
  let handleUser = () => {
    if(checkLogin === true){
      window.location.pathname = "/user"
    }else{
      sessionStorage.setItem("pathName",JSON.stringify('/user'));
      navigate("/login");
    }
    
  }
  return (
    <>
      <HeaderPc props={{cartItems,activeNav,nav,menuNav,isShow,valueSearch,handelValueSearch,valueIP,handleSetIsShowResult,showResult,
        handleSetHideResult,handleUser,handleButtonLog,handleCheckout,show,handleSetShow,navigate}}/>
      <HeaderMob props={{setIsToggleNav,isToggleNav,checkLogin,handleUser,valueIP,handleButtonLog,
        valueSearch,handelValueSearch,handleSetIsShowResult,show}} 
      />
    </>
  );
}

export default Header;
