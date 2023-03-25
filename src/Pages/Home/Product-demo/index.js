import React, { useContext } from "react";
import classNames from "classnames/bind";
import style from "../Home.module.scss";
import { CartContext } from "~/Contexts/Cart";
import { ApiContext } from "~/ContextApi/ContextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faTableList } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazy-load";

const cx = classNames.bind(style);
const Product = () => {
  const { DataProduct } = useContext(ApiContext);
  const data = DataProduct.filter((data) => data.id % 2 !== 0);

  return (
    <>
      {data.length !== 0 ? <h1>OUR PRODUCT</h1> : <></>}
      {data.length !== 0 ? 
        <div className={cx("product")}>
        {data.slice(0,12).map((product) => (
          <div className={cx("product-info")} key={product.id}>
            <LazyLoad height={"auto"}>
              <div className={cx("product-detail")}>
                <div className={cx("image")}>
                  <img src={product.url} alt="Slide-show" loading="lazy" />
                </div>
                <div className={cx("items")}>
                  <div className={cx("title")}>
                    <p>{product.title}</p>
                  </div>
                  <div className={cx("productAccess")}>
                    {product.detail.map((items, index) => (
                      <div className={cx("information")} key={index}>
                        <p>Cpu: {items.cpu.type}</p>
                        <p>
                          Display:{" "}
                          {items.display.size__inch}{" "}
                          inch -{" "}
                          {items.display.refresh_rate__hz
                          }
                          hz
                        </p>
                        <p>
                          Ram: {items.memory.ram__gb}GB
                        </p>
                        <p>
                          Hard drive:{" "}
                          {items.storage.type}-
                          {items.storage.capacity__gb}GB
                        </p>
                        <p>Os: {items.software.os}</p>
                      </div>
                    ))}
                  </div>
                  <div className={cx("items-child")}>
                    <div className={cx("money")}>{product.price} USD</div>
                    <div className={cx("button")}>
                      <CartContext.Consumer>
                        {({ addToCart }) => (
                          <button onClick={() => addToCart(product)}>
                            <FontAwesomeIcon icon={faCartShopping} />
                          </button>
                        )}
                      </CartContext.Consumer>
                      <button>
                        <Link
                          to={"/detail/" + product.id + "/" + product.title}
                        >
                          <FontAwesomeIcon icon={faTableList} />
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </LazyLoad>
          </div>
        ))}
      </div>
      : <></>}
    </>
  );
};

export default Product;
