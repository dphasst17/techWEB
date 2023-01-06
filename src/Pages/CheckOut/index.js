import classNames from "classnames/bind";
import { CartContext } from "~/Contexts/Cart";
import style from "./CheckOut.module.scss";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(style);

function checkOut() {
  let checkLogin = JSON.parse(localStorage.getItem("isLogin") || "[]")
  let navigate = useNavigate;
  /* Check login  */
  let handleCheckOut = () => {
    if(checkLogin === true){
      alert("Check out Success")
    }else{
      navigate("/login")
    }
  }
  return (
    <div className={cx("cart_detail")}>
      <div className={cx("container")}>
        <h1>Check Out</h1>
        <div className={cx("box")}>
          <CartContext.Consumer>
            {({ cartItems }) => (
              <div className={cx("detail")}>
                <h2>You have {cartItems.length} orders</h2>
                {cartItems.map((cartItems, index) => (
                  <div className={cx("listItems")} key={index}>
                    <div className={cx("show")}>
                      <img src={cartItems.image} alt="" />
                      <div className={cx("product_detail")}>
                        <h4>Name product: {cartItems.title}</h4>
                        <hr></hr>
                        <h4>Price product: {cartItems.price} USD</h4>
                      </div>
                      <div className={cx("countItems")}>
                        Quantity: {cartItems.quantity}
                      </div>
                      <div className={cx("payment_money")}>
                        Total: {cartItems.total} USD
                      </div>
                    </div>
                  </div>
                ))}
                
              </div>
            )}
          </CartContext.Consumer>
        </div>
        <button onClick={handleCheckOut}>Payments product</button>
      </div>
    </div>
  );
}

export default checkOut;
