import { CartContext } from "~/Contexts/Cart";
import  "./CheckOut.scss";
import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "~/ContextApi/ContextApi";
import { useNavigate } from "react-router-dom";
import Loading from "~/components/Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";


const CheckOut = () => {
  const { cartItems } = useContext(CartContext);
  const { Users, handlePost } = useContext(ApiContext);
  const [isLoading, setIsLoading] = useState(false);
  const [messResult, setMessResult] = useState("");
  const [height, setHeight] = useState("-200%");
  const navigate = useNavigate();
  let userID = JSON.parse(localStorage.getItem("isLogin") || "[]");
  const [data, setData] = useState();
  useEffect(() => {
    Users.map((us) => setData(us.purchaseOrder));
  }, [Users]);

  let handleCheckOut = () => {
    if (cartItems?.length !== 0) {
      setIsLoading(true);
      handlePost(
        {
          purchaseOrder: cartItems.concat(...data),
          listCart: [],
        },
        setIsLoading,
        "/success"
      );
    } else {
      setMessResult("You need to add a product to your cart");
      setTimeout(() => {
        setHeight("0%");
      });
      setTimeout(() => {
        setHeight("-120%");
      }, 2500);
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
    <div className="cart_detail">
      {isLoading === true ? <Loading /> : <></>}
      <div className="container">
        <h1>Check Out</h1>
        <div className="box">
          <CartContext.Consumer>
            {({ cartItems }) => (
              <>
                <div className="detail">
                  <h2>
                    You have {cartItems?.length > 0 ? cartItems.length : 0}{" "}
                    orders
                  </h2>
                  <div className="itemsDetail">
                    {cartItems?.map((cartItems) => (
                      <>
                        <div className="listItems" key={cartItems.id}>
                          <div className="item">
                            <div className="imgProduct">
                              <img src={cartItems.url} alt="" />
                            </div>
                            <div
                              className="product_detail"
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
                            <div className="product_detail_second">
                              <CartContext.Consumer>
                                {({ decrementItems }) => (
                                  <button
                                    onClick={() => decrementItems(cartItems)}
                                  >
                                    -
                                  </button>
                                )}
                              </CartContext.Consumer>
                              <div className="countItems">
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
                <div className="detail_second">
                  <div className="first">
                    {userID === true ? (
                      Users.map((us) => (
                        <div className="usDetail" key={us.fullName}>
                          <div className="input">
                            Full name: {us.fullName}
                          </div>
                          <div className="input">
                            Phone number: {us.phoneNumber}
                          </div>
                          <div className="input">Email: {us.email}</div>
                          <div className="input">
                            Address: {us.address}
                          </div>
                        </div>
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="second">
                    <div className="total">
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
      <div
        className="messFalse"
        style={{ transform: "translateX(" + height + ")" }}
      >
        <p>{messResult}</p>
        <div className="iClose">
          <FontAwesomeIcon
            icon={faX}
            onClick={() => {
              setHeight("-120%");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
