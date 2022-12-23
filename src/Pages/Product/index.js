import React from "react";
import classNames from "classnames/bind";
import style from "./Product.module.scss";
import keyword from "./FIlter/keyword";
import price from "./FIlter/price";
import product from "./ProductFake";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "~/Contexts/Cart";

const cx = classNames.bind(style);

function Product() {
  return (
    <div className={cx("product")}>
      <div className={cx("container")}>
        <div className={cx("content")}>
          <div className={cx("filter")}>
            <p>Filter</p>
            <div className={cx("box_filter")}>
              <h3>About Brand</h3>
              {keyword.map((keyword, index) => (
                <div className={cx("box_filter_detail")} key={index}>
                  <div className={cx("detail")}>
                    <input
                      type="checkbox"
                      name="keyword"
                      id={cx("keyword-brand") + `${keyword.id}`}
                    />
                    <label htmlFor={cx("keyword-brand") + `${keyword.id}`}>
                      {keyword.keyword}
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
                      id={cx("keyword-price") + `${price.id}`}
                    ></input>
                    <label htmlFor={cx("keyword-price") + `${price.id}`}>
                      {price.price}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={cx("content_container")}>
            <div className={cx("show")}>
              {product.map((product, index) => (
                <div className={cx("product-detail")} key={index}>
                  <div className={cx("detail-box")}>
                    <img src={product.image} alt="" />
                    <h4>{product.title}</h4>
                    <p>{product.price} USD</p>
                    <CartContext.Consumer>
                      {({ addToCart }) => (
                        <button onClick={() => addToCart(product)}>
                          Add to cart
                        </button>
                      )}
                    </CartContext.Consumer>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={cx("button")}>
            <button className={cx("next")}>
              <FontAwesomeIcon icon={faAnglesLeft} />
            </button>
            <button className={cx("prev")}>
              <FontAwesomeIcon icon={faAnglesRight} />
            </button>
            <div className={cx("number")}>
              <button>1</button>
              <button>2</button>
              <button>3</button>
              <button>4</button>
              <button>....</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
