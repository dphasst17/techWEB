import "./Header.scss";
import React, { useContext, useRef, useState } from "react";
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
import { CartContext } from "~/Contexts/Cart";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ApiContext } from "~/ContextApi/ContextApi";
import SearchResults from "./Search";
import { faFacebook, faGithub /* faGoogle */ } from "@fortawesome/free-brands-svg-icons";
import {FcGoogle } from "react-icons/fc";

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
  const {
    valueSearch,
    handelValueSearch,
    showResult,
    isToggleNav,
    setIsToggleNav,
    handleSetIsShowResult,
    handleSetHideResult,
  } = useContext(ApiContext);
  let navigate = useNavigate();
  const { pathname } = useLocation();
  /*  */
  const activeNav = menuNav.findIndex((e) => e.path === pathname);
  const nav = useRef(null);
  /* const menuToggle = () => nav.current.classList.toggle('active'); */
  /*  */
  let checkLogin = JSON.parse(localStorage.getItem("isLogin") || "[]");
  let check = () => {
    if (checkLogin === true) {
      return (check = "Log out");
    } else {
      return (check = "Log in");
    }
  };
  /* check Login */
  let handleButtonLog = () => {
    sessionStorage.setItem(
      "pathName",
      JSON.stringify(window.location.pathname)
    );
    if (checkLogin === true) {
      localStorage.setItem("isLogin", false);
      navigate("/login");
    } else {
      navigate("/login");
    }
  };
  /* Button check out */
  /* Check Login */
  let handleCheckout = () => {
    if (checkLogin === true) {
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  };
  let handleSetShow = () => {
    setIsShow(!isShow);
  };
  let show = () => {
    navigate("/searchResult");
  };
  /* let navTab = document.querySelectorAll(".header");
  navTab.forEach(items =>{
    items.addEventListener('click',function(event){
        if(event.target.classList.contains('navItems')){
            let lastActive = items.querySelector('div.active');
            let newActive = event.target;

            lastActive.classList.remove('active');
            newActive.classList.add('active');
        }
    })
}) */
  return (
    <>
      <div className="header">
        {/* NAV */}
        <nav ref={nav}>
          {menuNav.map((nav, index) => (
            <div className={`navItems ${index === activeNav ? `active` : ``}`} key={index}>
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
          <a href="/">
            <img src="" alt=""></img>
          </a>
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
            {/*cart-Shopping */}
            <CartContext.Consumer>
              {({ cartItems }) => (
                <div className="cart_Shopping">
                  <FontAwesomeIcon icon={faCartShopping} />
                  <div className="show">{cartItems.length}</div>

                  <div className="cart_content">
                    <div className="cover">
                      {cartItems.map((cartItems, index) => (
                        <div className="cart_detail" key={index}>
                          <div className="item">
                            <img src={cartItems.url} alt="IMG-product" />
                            <div className="information">
                              <h4>{cartItems.title}</h4>
                              <h4>{cartItems.price}</h4>
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
              )}
            </CartContext.Consumer>

            {/* User*/}
            <div className="user" onClick={handleSetShow}>
              <FontAwesomeIcon icon={faCircleUser} />
            </div>
          </div>
          {isShow && (
            <div className="showItems">
              <div className="box">
                {/* User information */}
                <div className="user_information">
                  <a href="/user">
                    <FontAwesomeIcon icon={faUser} /> User information
                  </a>
                  <br></br>
                </div>
                {/* List order */}
                <div className="list_order">
                  <a href="/checkout">
                    <FontAwesomeIcon icon={faList} /> List order
                  </a>
                </div>

                {/* button Login/Logout */}
                <div className="buttonLog">
                  <a href="/login">
                    <input
                      type="button"
                      value={check()}
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
          <FontAwesomeIcon icon={faBars} onClick={() => {setIsToggleNav(true)}}/>
          {isToggleNav && <div className="navDetail">
            <div className="navClose">
              <FontAwesomeIcon icon={faX} onClick={() => {setIsToggleNav(false)}}/>
              <Link to="/checkout">
                <div className="cartMob">
                  <FontAwesomeIcon icon={faCartShopping} />
                  <CartContext.Consumer>{({cartItems}) => <div className="totalItems">{cartItems.length}</div>}</CartContext.Consumer>
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
              <div className="navItemsMob">
                <div className="iconNavMob"><FontAwesomeIcon icon={faCircleUser} /></div>
                <span>
                  <Link to="/user">User information</Link>
                </span>
              </div>
            </div>
            <div className="navUser">
              <div className="buttonLog">
                  <a href="/login">
                    <input
                      type="button"
                      value={check()}
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
          </div>}
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
