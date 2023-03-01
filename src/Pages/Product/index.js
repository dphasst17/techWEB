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
import { Link } from "react-router-dom";

const cx = classNames.bind(style);

function Product() {
  const { DataProduct } = useContext(ApiContext);
  const [newValue, setNewValue] = useState([]);
  const [newPrice, setNewPrice] = useState([]);

  let min = "";
  let max = "";
  if (newPrice.length > 1) {
    min = newPrice.reduce((items, check) => {
      return items.min < check.min ? items.min : check.min;
    });
    max = newPrice.reduce((items, check) => {
      return items.max > check.max ? items.max : check.max;
    });
  } else if (newPrice.length === 1) {
    min = [newPrice.map((items) => items.min)];
    max = [newPrice.map((items) => items.max)];
    /* newPrice.map(items => (items.max !== undefined) ? (
      min = [newPrice.map(items => items.min)],
      max = [newPrice.map(items => items.max)]
    ) : (
      min = [newPrice.map(items => items.min)],
      max = ""
    )) */
  } else {
    min = 0;
    max = 0;
  }
  let data = DataProduct.filter((value) => {
    if (newValue.length !== 0 && newPrice.length !== 0) {
      return (
        newValue.includes(value.brand) && value.price > min && value.price < max
      );
    } else if (newValue.length !== 0 || newPrice.length !== 0) {
      return newValue.length !== 0
        ? newValue.includes(value.brand)
        : value.price > min &&
            value.price <
              max /* min < value.price < max */ /* ((max !== undefined) ? value.price > min && value.price < max : value.price > min) */;
    } else {
      return value;
    }
  });
  const dataBrand = DataProduct.map((items) => items.brand);
  const setBrand = new Set(dataBrand);
  let filterBrand = [...setBrand];

  return (
    <div className={cx("product")}>
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
                      setNewValue(newValue.filter((items) => items !== check));
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
                      setNewPrice(newPrice.filter((items) => items !== price));
                    } else {
                      setNewPrice([...newPrice, price]);
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
      <div className={cx("filterMob")}>
        <div className={cx("aboutBrandMob")}>
          <h2>About Brand</h2>
          <div className={cx("itemsBrand")}>
            {filterBrand.map((brand, index) => (
              <div className={cx("brandDetail")} key={index}>
                <input
                  type="checkbox"
                  name="keyword"
                  onClick={() => {
                    if (newValue.includes(brand)) {
                      setNewValue(newValue.filter((items) => items !== brand));
                    } else {
                      setNewValue([...newValue, brand]);
                      /* setData(DataProduct.filter(value => inputName.includes(value.brand))) */
                    }
                  }}
                  id={cx("keyword-brand") + `${index}`}
                />
                <label htmlFor={cx("keyword-brand") + `${index}`} className="infType">{brand}</label>
              </div>
            ))}
          </div>
        </div>
        <div className={cx("aboutPriceMob")}>
          <h2>About Price</h2>
          <div className={cx("itemsPrice")}>
            {price.map((check,index) => <div className={cx("priceDetail")} key={index}>
            <input
                  type="checkbox"
                  name="keyword"
                  onClick={() => {
                    if (newPrice.includes(check)) {
                      setNewPrice(newPrice.filter((items) => items !== check));
                    } else {
                      setNewPrice([...newPrice, check]);
                      /* setData(DataProduct.filter(value => inputName.includes(value.brand))) */
                    }
                  }}
                  id={cx("keyword-price") + `${check.id}`}
                ></input>
                <label htmlFor={cx("keyword-price") + `${check.id}`} className="infType">
                  {check.min} - {check.max}
                </label>
            </div>)}
          </div>
        </div>
      </div>
      <div className={cx("items_container")}>
        <div className={cx("show")}>
          {data.map((product) => (
            <div className={cx("product-detail")} key={product.id}>
              <div className={cx("detail-box")}>
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
                    <Link to={`/detail/${product.id}/${product.title}`}><FontAwesomeIcon icon={faTableList} /></Link>
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
  );
}

export default Product;
