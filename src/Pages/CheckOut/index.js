import classNames from "classnames/bind";
import { CartContext } from "~/Contexts/Cart";
import style from "./CheckOut.module.scss";
import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "~/ContextApi/ContextApi";
import { useNavigate } from "react-router-dom";
import Loading from "~/components/Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(style);

const CheckOut = () => {
  const { cartItems } = useContext(CartContext);
  const {Users,handlePost } = useContext(ApiContext);
  const [isLoading, setIsLoading] = useState(false);
  const [messResult, setMessResult] = useState("")
  const [height, setHeight] = useState("-200%")
  const navigate = useNavigate();
  let userID = JSON.parse(localStorage.getItem("isLogin") || "[]");
  const [data, setData] = useState();
  useEffect(() => {
    Users.map(us =>
      setData(us.purchaseOrder)
    )
  }, [Users]);

  let handleCheckOut = () => {
    if (cartItems?.length !== 0) {
      setIsLoading(true)
      handlePost({
        purchaseOrder: cartItems.concat(...data),
        listCart: [],
      },setIsLoading,"/success")
    } else {
      setMessResult("You need to add a product to your cart")
      setTimeout(() => {setHeight("0%")})
      setTimeout(() => {setHeight("-120%")},2500)
    }
  };


  let total = cartItems?.map((item) => item.total);
  const sumArray = (total) => {
    let sum = 0;
    if (total?.length >= 1) {
      total.forEach((value) => {
        sum += value;
      });
    }
    return sum;
  };
  
  return (
    <div className={cx("cart_detail")}>
      {isLoading=== true ? <Loading /> : <></>}
      <div className={cx("container")}>
        <h1>Check Out</h1>
        <div className={cx("box")}>
          <CartContext.Consumer>
            {({ cartItems }) => (
              <>
                <div
                  className={cx("detail")}
                  
                >
                  <h2>
                    You have {cartItems?.length > 0 ? cartItems.length : 0} orders
                  </h2>
                  <div className={cx("itemsDetail")}>
                    {cartItems?.map((cartItems) => (
                      <>
                        <div className={cx("listItems")} key={cartItems.id}>
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
                  <div className={cx("first")}>
                    {userID === true ? Users.map(us => <div className={cx("usDetail")} key={us.fullName}>
                      <div className={cx("input")}>Full name: {us.fullName}</div>
                      <div className={cx("input")}>Phone number: {us.phoneNumber}</div>
                      <div className={cx("input")}>Email: {us.email}</div>
                      <div className={cx("input")}>Address: {us.address}</div>
                    </div>)
                    :<></>}
                  </div>
                  <div className={cx("second")}>
                    <div className={cx("total")}>
                      <p>Total Payment: {sumArray(total)}USD</p>
                    </div>
                    <button>Continue shopping</button>
                    <button onClick={handleCheckOut}>Purchase</button>
                  </div>
                </div>
              </>
            )}
          </CartContext.Consumer>
        </div>
      </div>
      <div className={cx("messFalse")} style={{transform:"translateX(" + height + ")"}}>
        <p>{messResult}</p>
        <div className={cx("iClose")}>
          <FontAwesomeIcon icon={faX} onClick={() => {setHeight("-120%")}}/>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
