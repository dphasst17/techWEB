import classNames from "classnames/bind";
import { CartContext } from "~/Contexts/Cart";
import style from "./CheckOut.module.scss";

const cx = classNames.bind(style);

function checkOut() {

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
                        Count: {cartItems.count}
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
        <button>Payments product</button>
      </div>
    </div>
  );
}

export default checkOut;
