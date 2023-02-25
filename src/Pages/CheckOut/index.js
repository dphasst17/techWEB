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
  /* const [data, setData] = useState({purchaseOrder:[]}); */
  let userID = JSON.parse(localStorage.getItem("identificationID") || "[]");
  const urlGet = urlUsers + `/` + userID;
  /* let navigate = useNavigate; */
  /* Check login  */
  const [data, setData] = useState();
  /*   const [showN, setIsShowN] = useState(false)
   */ useEffect(() => {
    const fetchData = async () => {
      const result = await axios(urlGet);
      setData(result.data.purchaseOrder);
    };
    fetchData();
  }, [urlGet]);

  /* useEffect(() =>{
    axios.get(urlGet)
      .then(res =>{setList(res.data.listCart)})
  },[urlGet,list]) */
  let handleCheckOut = () => {
    /* axios.get(urlGet)
  .then(res => setData(res.data.purchaseOrder)) */
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
  let total = cartItems.map((item) => item.total);
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
        {/* <button onClick={() => {console.log(list)}}>Check</button> */}
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
                    You have {cartItems?.length > 0 ? cartItems.length : 0}{" "}
                    orders
                  </h2>
                  <div className={cx("itemsDetail")}>
                    {cartItems.map((cartItems, index) => (
                      <>
                        <div className={cx("listItems")} key={index} onClick={() =>{navigate("/detail/" + cartItems.id)}}>
                          <div className={cx("item")}>
                            <div className={cx("imgProduct")}>
                              <img src={cartItems.url} alt="" />
                            </div>
                            <div className={cx("product_detail")}>
                              <h4>
                                Name product:{" "}
                                {cartItems.title.length > 20
                                  ? cartItems.title.slice(0, 16) + `...`
                                  : cartItems.title}
                              </h4>
                              <hr></hr>
                              <h4>Price product: {cartItems.price} USD</h4>
                            </div>
                            <div className={cx("product_detail_second")}>
                              <div className={cx("countItems")}>
                                Quantity: {cartItems.quantity}
                              </div>
                              <div className={cx("payment_money")}>
                                Price: {cartItems.quantity * cartItems.price}{" "}
                                USD
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
                <div className={cx("detail_second")}>
                  <div className={cx("total")}>
                    <p>Total Payment: {sumArray(total)} USD</p>
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
