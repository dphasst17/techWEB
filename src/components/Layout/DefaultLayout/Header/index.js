import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCircleUser,
  faList,
  faMagnifyingGlass,
  faTrashCan,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "~/Contexts/Cart";
import { useNavigate } from "react-router-dom";
const show = () => {
  alert("check search");
};
const cx = classNames.bind(styles);
function Header() {
  const [isShow, setIsShow] = useState(false);
  let navigate = useNavigate();
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
  return (
    <div className={cx("header")}>
      {/* NAV */}
      <div className={cx("nav")}>
        <ul>
          <li>
            <a href="/">
              <div className={cx("nav_text")}>
                Home
                <div className={cx("hover_nav")}></div>
              </div>
            </a>
          </li>
          <li>
            <a href="/product">
              <div className={cx("nav_text")}>
                Product
                <div className={cx("hover_nav")}></div>
              </div>
            </a>
          </li>
          <li>
            <a href="/accessory">
              <div className={cx("nav_text")}>
                Accessory
                <div className={cx("hover_nav")}></div>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div className={cx("logo")}>
        <a href="/">
          <img src={require("./img/logo.jpeg")} alt=""></img>
        </a>
      </div>
      {/* Search input */}
      <div className={cx("search")}>
        <input placeholder="Search......" spellCheck="false" />
        <button onClick={show} className={cx("iconSearch")}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      {/* Icon */}
      <div className={cx("icon")}>
        <div className={cx("detail")}>
          {/*cart-Shopping */}
          <CartContext.Consumer>
            {({ cartItems }) => (
              <div className={cx("cart_Shopping")}>
                <FontAwesomeIcon icon={faCartShopping} />
                <div className={cx("show")}>{cartItems.length}</div>

                <div className={cx("cart_content")}>
                  <div className={cx("cover")}>
                    {cartItems.map((cartItems, index) => (
                      <div className={cx("cart_detail")} key={index}>
                        <div className={cx("item") + `${cartItems.id}`}>
                          <img src={cartItems.image} alt="IMG-product" />
                          <div className={cx("information")}>
                            <h4>{cartItems.title}</h4>
                            <h4>{cartItems.price}</h4>
                          </div>
                          <div className={cx("button")}>
                            <CartContext.Consumer>
                              {({ decrementItems }) => (
                                <button
                                  className={cx("reduce")}
                                  onClick={() => decrementItems(cartItems)}
                                >
                                  -
                                </button>
                              )}
                            </CartContext.Consumer>
                            <span className={cx("quantity")}>
                              {cartItems.quantity}
                            </span>
                            <CartContext.Consumer>
                              {({ incrementItems }) => (
                                <button
                                  className={cx("increment")}
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
                              <div className={cx("trash")}>
                                <button onClick={() => deleteItems(cartItems)}>
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
                  <div className={cx("payment")}>
                    <button onClick={handleCheckout}>Check out</button>
                  </div>
                  {/* button remove all items */}
                  <CartContext.Consumer>
                    {({ removedAllItems }) => (
                      <div className={cx("removeItems")}>
                        <button onClick={() => removedAllItems()}>
                          Remove All
                        </button>
                      </div>
                    )}
                  </CartContext.Consumer>
                </div>
              </div>
            )}
          </CartContext.Consumer>

          {/* User*/}
          <div className={cx("user")} onClick={() => setIsShow(!isShow)}>
            <FontAwesomeIcon icon={faCircleUser} />
          </div>
          {isShow && (
            <div className={cx("detail")}>
              <div className={cx("box")}>
                {/* User information */}
                <div className={cx("user_information")}>
                  <a href="/user">
                    <FontAwesomeIcon icon={faUser} /> User information
                  </a>
                  <br></br>
                </div>
                {/* List order */}
                <div className={cx("list_order")}>
                  <a href="/checkout">
                    <FontAwesomeIcon icon={faList} /> List order
                  </a>
                </div>
                {/* button Login/Logout */}
                <div className={cx("buttonLog")}>
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
    </div>
  );
}

export default Header;
