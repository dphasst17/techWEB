import "./Header.scss";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "~/contexts/Cart";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiContext } from "~/contexts/apiContext";
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
    title: "MORE",
    path: "/more",
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
  const [isToggleNav, setIsToggleNav] = useState("translateX(-180%)");
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
      localStorage.removeItem("expAccess");
      localStorage.removeItem("expRefresh");
      Cookies.remove('refresh')
      Cookies.remove('access')
      navigate("/login");
    } else {
      navigate("/login");
    }
  };
  /* Check Login */
  /* Button check out */
  let handleCheckout = () => {
    if (checkLogin === true) {
      navigate("/cart");
    } else {
      sessionStorage.setItem(
        "pathName",
        JSON.stringify('/cart')
      );
      navigate("/login");
    }
  };
  let handleSetShow = () => {
    setIsShow(!isShow);
  };
  let show = () => {
    navigate(`/search/${valueSearch}`);
  };
  let handleUser = () => {
    if(checkLogin === true){
      navigate("/user")
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
