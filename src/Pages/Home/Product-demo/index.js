import React, { useContext } from "react";
import classNames from "classnames/bind";
import style from "../Home.module.scss";
import { CartContext } from "~/Contexts/Cart";
import { ApiContext } from "~/ContextApi/ContextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faTableList } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const cx = classNames.bind(style);
const Product = () => {
  const {DataProduct}=useContext(ApiContext)
  const data = DataProduct.filter(data => data.id % 2 !== 0)
/*   const detail = data.map(data => data.detail.map(items => (items.software.map(typeCpu => typeCpu.os))))
  console.log(detail) */


  return (
    <div className={cx("product")}>
      {data.map((product) => (
        <div className={cx("product-info")} key={product.id}>
          <div className={cx("product-detail")}>
            <div className={cx("image")}><img src={product.url} alt="Slide-show" /></div>
            <div className={cx("items")}>
              <div className={cx("title")}>
                <p>{(product.title.length > 15) ? product.title.slice(0,15)+`...`:product.title}</p>
              </div>
              <div className={cx("productAccess")}>
                {product.detail.map((items,index) => (
                <div className={cx("information")} key={index}>
                  <p>Cpu: {items.cpu.map((detail) => detail.type)}</p>
                  <p>Display: {items.display.map((detail) => (detail.size__inch))} inch - {items.display.map((detail) => (detail.refresh_rate__hz))}hz</p>
                  <p>Ram: {items.memory.map((detail) => (detail.ram__gb))}GB</p>
                  <p>Hard drive: {items.storage.map((detail) =>(detail.type))}-{items.storage.map((detail) =>(detail.capacity__gb))}GB</p>
                  <p>Os: {items.software.map((detail) => (detail.os))}</p>
                </div>
                ))}
              </div>
              <div className={cx("items-child")}>
                <div className={cx("money")}>{product.price} USD</div>
                <div className={cx("button")}>
                  <CartContext.Consumer>
                    {({ addToCart }) => (
                      <button onClick={() => addToCart(product)}><FontAwesomeIcon icon={faCartShopping} /></button>
                    )}
                    
                  </CartContext.Consumer>
                  <button><Link to={`/detail/${product.id}`}><FontAwesomeIcon icon={faTableList}/></Link ></button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default Product;
