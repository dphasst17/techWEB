import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCircleUser,
  faList,
  faTrashCan,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "~/Contexts/Cart";

const cx = classNames.bind(styles);
function Header() {
  const [isShow, setIsShow] = useState(false);
  return (
    <div className={cx("header")}>
      {/* NAV */}
      <div className={cx("nav")}>
        <ul>
          <li>
            <div className={cx("nav_text")}>
              <a href="/">
                <div className={cx("text")}>Home</div>
              </a>
            </div>
          </li>
          <li>
            <div className={cx("nav_text")}>
              <a href="/product">
                <div className={cx("text")}>Product</div>
              </a>
            </div>
          </li>
          <li>
            <div className={cx("nav_text")}>
              <a href="/accessory">
                <div className={cx("text")}>Accessory</div>
              </a>
            </div>
          </li>
          <li>
            <div className={cx("nav_text")}>
              <a href="/news">
                <div className={cx("text")}>News</div>
              </a>
            </div>
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
        <input placeholder="    Search......" spellCheck="false" />
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
                            <span className={cx("Count")}>
                              {cartItems.count}
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
                  {/* button --- payment */}
                  <div className={cx("payment")}>
                    <button>
                      <a href="/cartdetail">Payment</a>
                    </button>
                  </div>
                  {/* button remove all items */}
                  <CartContext.Consumer>
                    {({ removedAllItems }) => (
                      <div className={cx("removeItems")}>
                        <button onClick={() => removedAllItems()}>
                          <a href="#remove">Remove All</a>
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
                <div className={cx("user_information")}>
                  <a href="/user">
                    <FontAwesomeIcon icon={faUser} /> User information
                  </a>
                  <br></br>
                </div>
                <div className={cx("list_order")}>
                  <a href="/cartdetail">
                    <FontAwesomeIcon icon={faList} /> List order
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
