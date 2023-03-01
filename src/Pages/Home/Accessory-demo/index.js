import React, { useContext } from "react";
import classNames from "classnames/bind";
import style from "../Home.module.scss";
import { CartContext } from "~/Contexts/Cart";
import { ApiContext } from "~/ContextApi/ContextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faTableList } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const cx = classNames.bind(style);

const AccDemo = () => {
  const {Access} = useContext(ApiContext)
  return (
    <div className={cx("Access")}>
      {Access.slice(0,12).map((dataAcc, index) => (
        <div className={cx("accDemo")} key={index}>
          <div className={cx("accDemo_Child")}>
            <div className={cx("image")}><img src={dataAcc.url} alt="" /></div>
            <div className={cx("title")}><p>{/* (dataAcc.title.length > 20) ? dataAcc.title.slice(0,20)+`...`: */dataAcc.title}</p></div >
            <div className={cx("items-child")}>
              <div className={cx("price")}>{dataAcc.price} USD</div>
              <div className={cx("button")}>
                <CartContext.Consumer>
                  {({ addToCart }) => (
                    <button
                      onClick={() => addToCart(dataAcc)}
                      
                    >
                      <FontAwesomeIcon icon={faCartShopping} />
                    </button>
                  )}
                </CartContext.Consumer>
                <button><Link to={`/detail/${dataAcc.id}/${dataAcc.title}`}><FontAwesomeIcon icon={faTableList}/></Link ></button>
              </div>
            </div >
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccDemo;
