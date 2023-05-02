import "./Header.scss";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faCircleUser,
  faHardDrive,
  faHouse,
  faLaptop,
  faList,
  faMagnifyingGlass,
  faTrashCan,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import logo01 from "~/components/Layout/DefaultLayout/Header/img/tech-store-low-resolution-logo-black-on-transparent-background.png";
import { CartContext } from "~/Contexts/Cart";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ApiContext } from "~/ContextApi/ContextApi";
import SearchResults from "./Search";
import { faFacebook, faGithub} from "@fortawesome/free-brands-svg-icons";
import {FcGoogle } from "react-icons/fc";
import Cookies from "js-cookie";
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
  let navigate = useNavigate();
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
      <div className="header">
        {/* NAV */}
        <nav ref={nav}>
          {menuNav.map((nav, index) => (
            <div className={`navItems ${index === activeNav ? `active` : ``}`} key={nav}>
              <Link to={nav.path}>
                <div className="nav_text">
                  {nav.title}
                  <div className="hover_nav"></div>
                </div>
              </Link>
            </div>
          ))}
        </nav>

        <div className="logo">
          <img src={logo01} alt=""/>
        </div>
        {/* Search input */}
        <div className="search">
          <input
            placeholder="Search......"
            spellCheck="false"
            value={valueSearch}
            onChange={handelValueSearch}
            onClick={handleSetIsShowResult}
          />
          <button onClick={show} className="iconSearch">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          {showResult && (
            <div className="searchResult">
              <div className="title">
                <p>Search result</p>
                <span onClick={handleSetHideResult}>
                  <FontAwesomeIcon icon={faX} />
                </span>
              </div>
              <div className="result">
                <SearchResults />
              </div>
              <button
                onClick={() => {
                  navigate("/searchResult");
                }}
              >
                See more...
              </button>
            </div>
          )}
        </div>
        {/* Icon */}
        <div className="icon">
          <div className="detail">
            
            <div className="cart_Shopping">
                  <div className="show">{(cartItems?.length > 0)? cartItems.length : 0}</div>
                  <FontAwesomeIcon icon={faCartShopping} />
                  <div className="cart_content">
                    <div className="cover">
                      {cartItems?.map((cartItems) => (
                        <div className="cart_detail" key={cartItems.id}>
                          <div className="item">
                            <div className="img"><img src={cartItems.url} alt="IMG-product" /></div>
                            <div className="information">
                              <h4>{cartItems.title.length > 20 ? cartItems.title.slice(0,20)+`...`: cartItems.title}</h4>
                              <h4>{cartItems.price} USD</h4>
                            </div>
                            <div className="button">
                              <CartContext.Consumer>
                                {({ decrementItems }) => (
                                  <button
                                    className="reduce"
                                    onClick={() => decrementItems(cartItems)}
                                  >
                                    -
                                  </button>
                                )}
                              </CartContext.Consumer>
                              <span className="quantity">
                                {cartItems.quantity}
                              </span>
                              <CartContext.Consumer>
                                {({ incrementItems }) => (
                                  <button
                                    className="increment"
                                    onClick={() => incrementItems(cartItems)}
                                  >
                                    +
                                  </button>
                                )}
                              </CartContext.Consumer>
                            </div>
                            {/* button delete items */}
                            <CartContext.Consumer>
                              {({ deleteItems }) => (
                                <div className="trash">
                                  <button
                                    onClick={() => deleteItems(cartItems)}
                                  >
                                    <FontAwesomeIcon icon={faTrashCan} />
                                  </button>
                                </div>
                              )}
                            </CartContext.Consumer>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* button --- checkOut */}
                    <div className="checkout">
                      <button onClick={handleCheckout}>Check out</button>
                    </div>
                    {/* button remove all items */}
                  </div>
                </div>

            {/* User*/}
            <div className="user" onClick={handleSetShow}>
              <FontAwesomeIcon icon={faCircleUser} />
            </div>
          </div>
          {isShow && (
            <div className="showItems">
              <div className="box">
                {/* User information */}
                <div className="user_information" onClick={handleUser}>
                    <FontAwesomeIcon icon={faUser}/> User information
                  <br></br>
                </div>
                {/* List order */}
                <div className="list_order">
                    <FontAwesomeIcon icon={faList} /> List order
                </div>

                {/* button Login/Logout */}
                <div className="buttonLog">
                  <a href="/login">
                    <input
                      type="button"
                      value={valueIP}
                      onClick={handleButtonLog}
                    />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="headerMob">
        <div className="navMob">
          <FontAwesomeIcon icon={faBars} onClick={() => {setIsToggleNav("translateX(-17%)")}}/>
          <div className="navDetail" style={{transform: isToggleNav}}>
            <div className="navClose">
              <FontAwesomeIcon icon={faX} onClick={() => {setIsToggleNav("translateX(-200%)")}}/>
              <Link to={checkLogin === true ? "/checkout" : "/login"}>
                <div className="cartMob">
                  <FontAwesomeIcon icon={faCartShopping} />
                  <CartContext.Consumer>{({cartItems}) => <div className="totalItems">{(cartItems?.length > 0)? cartItems.length : 0}</div>}</CartContext.Consumer>
                </div>
              </Link>
            </div>
            <div className="navContent">
              <div className="navItemsMob">
                <div className="iconNavMob"><FontAwesomeIcon icon={faHouse} /></div>
                <span>
                  <Link to="/">HOME</Link>
                </span>
              </div>
              <div className="navItemsMob">
                <div className="iconNavMob"><FontAwesomeIcon icon={faLaptop} /></div>
                <span>
                  <Link to="/product">PRODUCT</Link>
                </span>
              </div>
              <div className="navItemsMob">
                <div className="iconNavMob"><FontAwesomeIcon icon={faHardDrive} /></div>
                <span>
                  <Link to="/accessory">ACCESSORY</Link>
                </span>
              </div>
              <div className="navItemsMob" onClick={handleUser}>
                <div className="iconNavMob"onClick={handleUser}><FontAwesomeIcon icon={faCircleUser} /></div>
                <span>
                  User information
                </span>
              </div>
            </div>
            <div className="navUser">
              <div className="buttonLog">
                  <a href="/login">
                    <input
                      type="button"
                      value={valueIP}
                      onClick={handleButtonLog}
                    />
                  </a>
                </div>
            </div>
            <hr></hr>
            <h2>Contact Us</h2>
            <div className="navContact">
              <div className="iconContact"><FontAwesomeIcon icon={faFacebook}/><span>Facebook</span></div>
              <div className="iconContact"><FontAwesomeIcon icon={faGithub}/><span>Github</span></div>
              <div className="iconContact"><FcGoogle /><span>Mail</span></div>
            </div>
          </div>
        </div>
        <div className="logoMob">
          <img src="" alt="" />
        </div>
        <div className="searchMob">
          <input
            placeholder="Search......"
            spellCheck="false"
            value={valueSearch}
            onChange={handelValueSearch}
            onClick={handleSetIsShowResult}
          />
          <button onClick={show} className="iconSearchMob">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
