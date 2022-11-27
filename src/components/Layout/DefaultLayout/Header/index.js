import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import React,{useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "~/Contexts/Cart";

const cx = classNames.bind(styles);
function Header() { 
const cartItems = JSON.parse(localStorage.getItem("cartItems") ?? "[]")
 const [count,setCount] = useState(1);
 const increment = () => {
  if(count>=1){
    setCount(count + 1)
  }
 }
 const reduce = () => {
  if(count > 1){
    setCount(count - 1 )
  }else{
    setCount(count - 0)
  }
 }
const removeItems = () => {
  if(cartItems){
    localStorage.removeItem("cartItems")
    
  }
}
  return (
    <div className={cx("header")}>
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
              <a href="/contact">
                <div className={cx("text")}>Contact</div>
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
      <div className={cx("search")}>
        <input placeholder="    Search......" spellCheck="false" />
      </div>
      <div className={cx("icon")}>
        <div className={cx("detail")}>
          {/*cart-Shopping */}
          <CartContext.Consumer>
          {({ cartItems }) => <div className={cx("cart_Shopping")} >
               <FontAwesomeIcon icon={faCartShopping} />
               <div className={cx("show")}>{cartItems.length}</div>
               
                 <div className={cx("cart_content")}>
                     
                       <div className={cx("cover")}>
                         {cartItems.map((cartItems) => (
                          <div className={cx("cart_detail")} key={cartItems.id}>
                              
                          <div className={cx("item") + `${cartItems.id}`}>
                              <img
                                src={cartItems.image}
                                alt="IMG-product"
                              />
                            <div className={cx("information")}>
                              <h4>{cartItems.title}</h4>
                              <h4>{cartItems.price}</h4>
                            </div>
                            <div className={cx("button")}>
                              <button className={cx("reduce")} onClick={reduce}>
                                -
                              </button>
                              <div>{count}</div>
                              <button className={cx("increment")} onClick={increment}>
                                +
                              </button>
                            </div>
                          
                          </div>
                        </div>
                         ))}
                       </div>
                     {/* button --- payment */}
                 <div className={cx("payment")}>
                     <button >
                       <a href="/cartdetail">Thanh toan</a>
                     </button>
                 </div>
                 <div className={cx("removeItems")}>
                      <button onClick={removeItems}><a href="#remove">Remove All</a></button>
                 </div>
                 </div>
               </div>
               
          }


            
            
          </CartContext.Consumer>

          {/* User*/}
          <div className={cx("user")}>
            <FontAwesomeIcon icon={faCircleUser} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
