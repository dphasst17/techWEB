import classNames from "classnames/bind";
import { CartContext } from "~/Contexts/Cart";
import style from "./CheckOut.module.scss";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";

const cx = classNames.bind(style);

const CheckOut = () => {
  const {cartItems}=useContext(CartContext)
  let checkLogin = JSON.parse(localStorage.getItem("isLogin") || "[]");
  let navigate = useNavigate;
  /* Check login  */
  let handleCheckOut = () => {
    if(checkLogin === true){
      alert("Check out Success")
    }else{
      navigate("/login")
    }
  }
  let total = cartItems.map(item => item.total);
  const sumArray = (total)=>{
      let sum = 0;
      total.map((value) =>{
        return  sum += value;
      });
      return sum;
  }
  return (
    <div className={cx("cart_detail")}>
      <div className={cx("container")}>
        <h1>Check Out</h1>
        <div className={cx("box")}>
          <CartContext.Consumer>
            {({ cartItems }) => (
              <>
                <div className={cx("detail")} onChange={() =>{if(cartItems.length > 0){}}}>
                  <h2>You have {cartItems.length} orders</h2>
                  <div className={cx("itemsDetail")}>
                    {cartItems.map((cartItems, index) => (
                      <>
                        <div className={cx("listItems")} key={index}>
                          <div className={cx("item")}>
                            <div className={cx("imgProduct")}><img src={cartItems.url} alt="" /></div>
                            <div className={cx("product_detail")}>
                              <h4>Name product: {cartItems.title.length > 20 ? cartItems.title.slice(0,16)+`...`: cartItems.title}</h4>
                              <hr></hr>
                              <h4>Price product: {cartItems.price} USD</h4>
                            </div>
                            <div className={cx("product_detail_second")}>
                              <div className={cx("countItems")}>
                                Quantity: {cartItems.quantity}
                              </div>
                              <div className={cx("payment_money")}>
                                Price: {cartItems.quantity * cartItems.price} USD
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </div >
                  
                </div>
              </>
            )}
          </CartContext.Consumer>
          <div className={cx("detail_second")}>
            <div className={cx("total")}><p>Total Payment: {sumArray(total)} USD</p></div>
            <button>Continue shopping</button>
            <button onClick={handleCheckOut}>Purchase</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
