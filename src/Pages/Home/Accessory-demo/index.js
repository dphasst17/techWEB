import React, { useContext } from "react";
import classNames from "classnames/bind";
import style from "../Home.module.scss";
import { CartContext } from "~/Contexts/Cart";
import { ApiContext } from "~/ContextApi/ContextApi";

const cx = classNames.bind(style);

const AccDemo = () => {
  const {Access} = useContext(ApiContext)
  return (
    <div className={cx("Access")}>
      {Access.map((dataAcc, index) => (
        <div className={cx("accDemo")} key={index}>
          <div className={cx("accDemo_Child")}>
            <img src={dataAcc.url} alt="" />
            <p>{dataAcc.title}</p>
            <button className={cx("price")}>{dataAcc.price} USD</button>
            <CartContext.Consumer>
              {({ addToCart }) => (
                <button
                  onClick={() => addToCart(dataAcc)}
                  className={cx("addToCard")}
                >
                  Add to cart
                </button>
              )}
            </CartContext.Consumer>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccDemo;
