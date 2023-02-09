import React, { useContext, useState } from "react";
import classNames from "classnames/bind";
import style from "./Product.module.scss";
import price from "./FIlter/price";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeart,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "~/Contexts/Cart";
import { ApiContext } from "~/ContextApi/ContextApi";

const cx = classNames.bind(style);

function Product() {
  const { DataProduct } = useContext(ApiContext);
  const [newValue, setNewValue] = useState([]);
  const [newPrice, setNewPrice] = useState([])
  
  let min = "";
  let max = "";
  if(newPrice.length>1){
    min = newPrice.reduce((items,check) => {return (items.min < check.min) ? items.min : check.min});
    max = newPrice.reduce((items,check) => {return (items.max > check.max) ? items.max : check.max})
  }else if(newPrice.length === 1){
    min = [newPrice.map(items => items.min)]
    max = [newPrice.map(items => items.max)]
  }
  else{
    min = 0;
    max = ""
  }
  let data = DataProduct.filter((value) => {
    if (newValue.length !== 0 && newPrice.length!== 0) {
      return newValue.includes(value.brand) && (value.price > min && value.price < max) ;
    }else if(newValue.length !== 0 || newPrice.length !== 0){
     return (newValue.length !== 0) ? newValue.includes(value.brand) : (value.price > min && value.price < max);
    }
     else {
      return value;
    }
  });
  const dataBrand = (DataProduct.map(items => items.brand))
  const setBrand = new Set(dataBrand)
  let filterBrand = [...setBrand]
  
  return (
    <div className={cx("product")}>
      <div className={cx("container")}>
        <div className={cx("content")}>
          <div className={cx("filter")}>
            <p>Filter</p>
            <div className={cx("box_filter")}>
              <h3>About Brand</h3>
              {filterBrand.map((check, index) => (
                <div className={cx("box_filter_detail")} key={index}>
                  <div className={cx("detail")}>
                    <input
                      type="checkbox"
                      name="keyword"
                      onClick={() => {
                        if (newValue.includes(check)) {
                          setNewValue(
                            newValue.filter((items) => items !== check)
                          );
                        } else {
                          setNewValue([...newValue, check]);
                          /* setData(DataProduct.filter(value => inputName.includes(value.brand))) */
                        }
                      }}
                      id={cx("keyword-brand") + `${index}`}
                    />
                    <label htmlFor={cx("keyword-brand") + `${index}`}>
                      {check}
                    </label>
                  </div>
                </div>
              ))}
              <h3>About Price</h3>
              {price.map((price, index) => (
                <div className={cx("box_filter_detail")} key={index}>
                  <div htmlFor="keyword" className={cx("detail")}>
                    <input
                      type="checkbox"
                      name="keyword"
                      onClick={() => {
                        if (newPrice.includes(price)) {
                          setNewPrice(
                            newPrice.filter((items) => items !== price)
                          );
                        } else {
                          setNewPrice([...newPrice,price]);
                          /* setData(DataProduct.filter(value => inputName.includes(value.brand))) */
                        }
                      }}
                      id={cx("keyword-price") + `${price.id}`}
                    ></input>
                    <label htmlFor={cx("keyword-price") + `${price.id}`}>
                      {price.min} - {price.max}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={cx("items_container")}>
            <div className={cx("show")}>
              {data.map((product) => (
                <div className={cx("product-detail")} key={product.id}>
                  <div
                    className={cx("detail-box")}
                    
                  >
                    <img src={product.url} alt="" />
                    <div className={cx("title")}>
                      <h4>{product.title}</h4>
                    </div>
                    <p>{product.price} USD</p>
                    <div className={cx("button")}>
                      <CartContext.Consumer>
                        {({ addToCart }) => (
                          <button onClick={() => addToCart(product)}>
                            <FontAwesomeIcon icon={faCartShopping} />
                          </button>
                        )}
                      </CartContext.Consumer>
                      <button>
                        <FontAwesomeIcon icon={faTableList} />
                      </button>
                      <button>
                        <FontAwesomeIcon icon={faHeart} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
