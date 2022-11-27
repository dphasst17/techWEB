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
            <div className={cx("container")}>
              <h3>About Brand</h3>
              {keyword.map((keyword, index) => (
                <div className={cx("content")} key={index}>
                  <label htmlFor="keyword" className={cx("detail")}>
                    <input type="checkbox" name="keyword" />
                    <label htmlFor="keyword">{keyword.keyword}</label>
                  </label>
                </div>
              ))}
              <h3>About Price</h3>
              {price.map((price, index) => (
                <div className={cx("content")} key={index}>
                  
                  <div htmlFor="keyword" className={cx("detail")}>
                    <input type="checkbox" name="keyword" id={cx("keyword") + `${price.id}`}></input>
                    <label htmlFor={cx("keyword") + `${price.id}`}>{price.price}</label>
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
                    <p>{product.price}</p>
                    <CartContext.Consumer>
                      {({addToCart}) => <button onClick={() =>addToCart(product)}>Add to cart</button>} 
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
