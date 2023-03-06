import classNames from "classnames/bind";
import { CartContext } from "~/Contexts/Cart";
import style from "./CheckOut.module.scss";
/* import { useNavigate } from "react-router-dom"; */
import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "~/ContextApi/ContextApi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(style);

const CheckOut = () => {
  const { cartItems, setState } = useContext(CartContext);
  const { urlUsers } = useContext(ApiContext);
  const navigate = useNavigate();
  let userID = JSON.parse(localStorage.getItem("identificationID") || "[]");
  const urlGet = urlUsers + `/` + userID;
  /* Check login  */
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(urlGet);
      setData(result.data.purchaseOrder);
    };
    fetchData();
  }, [urlGet, data]);
  let handleCheckOut = () => {
    if (cartItems.length !== 0) {
      const option = {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          purchaseOrder: cartItems.concat(...data),
          listCart: [],
        }),
      };
      fetch(urlUsers + `/` + userID, option).then((res) => res.json());
      setState({ cartItems: [] });
      navigate("/success");
    } else {
      alert("You need to add a product to your cart");
    }
  };
  let total = cartItems?.map((item) => item.total);
  const sumArray = (total) => {
    let sum = 0;
    if (total.length >= 1) {
      total.map((value) => {
        return (sum += value);
      });
    } else {
      return (sum = 0);
    }
    return sum;
  };
  return (
    <div className={cx("cart_detail")}>
      <div className={cx("container")}>
        <h1>Check Out</h1>
        <div className={cx("box")}>
          <CartContext.Consumer>
            {({ cartItems }) => (
              <>
                <div
                  className={cx("detail")}
                  onChange={() => {
                    if (cartItems.length > 0) {
                    }
                  }}
                >
                  <h2>
                    You have {cartItems.length > 0 ? cartItems.length : 0}
                    orders
                  </h2>
                  <div className={cx("itemsDetail")}>
                    {cartItems?.map((cartItems, index) => (
                      <>
                        <div className={cx("listItems")} key={index}>
                          <div className={cx("item")}>
                            <div className={cx("imgProduct")}>
                              <img src={cartItems.url} alt="" />
                            </div>
                            <div
                              className={cx("product_detail")}
                              onClick={() => {
                                navigate(
                                  "/detail/" +
                                    cartItems.id +
                                    "/" +
                                    cartItems.title
                                );
                              }}
                            >
                              <h4>
                                Name product:
                                {cartItems.title.length > 20
                                  ? cartItems.title.slice(0, 16) + `...`
                                  : cartItems.title}
                              </h4>
                              <hr></hr>
                              <h4>Price product: {cartItems.price} USD</h4>
                            </div>
                            <div className={cx("product_detail_second")}>
                              <CartContext.Consumer>
                                {({ decrementItems }) => (
                                  <button
                                    onClick={() => decrementItems(cartItems)}
                                  >
                                    -
                                  </button>
                                )}
                              </CartContext.Consumer>
                              <div className={cx("countItems")}>
                                {cartItems.quantity}
                              </div>
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
                              <CartContext.Consumer>
                                {({ deleteItems }) => (
                                  <button
                                    onClick={() => deleteItems(cartItems)}
                                  >
                                    delete
                                  </button>
                                )}
                              </CartContext.Consumer>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
                <div className={cx("detail_second")}>
                  <div className={cx("total")}>
                    <p>Total Payment: {sumArray(total)}USD</p>
                  </div>
                  <button>Continue shopping</button>
                  <button onClick={handleCheckOut}>Purchase</button>
                </div>
              </>
            )}
          </CartContext.Consumer>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
