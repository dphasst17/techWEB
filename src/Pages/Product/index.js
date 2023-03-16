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
  const { DataProduct,PaginationPage,numPage,isShowButton } = useContext(ApiContext);
  const [newValue, setNewValue] = useState([]);
  const [newPrice, setNewPrice] = useState([]);
  const [Slice, setSlice] = useState(12);
  /* const [isShowButton, setIsShowButton] = useState(false);
  const [numPage, setNumPage] = useState([]); */

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
        : value.price > min && value.price < max;
    } else {
      return value;
    }
  });
  /* useMemo(() => {
    if (data.length > 12) {
      if (data.length % 12 === 0) {
        setIsShowButton(true);
        let arr = [];
        for (let i = 1; i <= data.length / 12; i++) {
          arr.push(i);
          setNumPage(arr);
        }
      } else {
        setIsShowButton(true);
        let arr = [];
        for (let i = 1; i <= data.length / 12 + 1; i++) {
          arr.push(i);
          setNumPage(arr);
        }
      }
    } else {
      setIsShowButton(false);
    }
  }, [data.length]); */
  PaginationPage(data)
  const handlePagi = (e) => {
    setSlice(12 * e);
  };
  const dataBrand = DataProduct.map((items) => items.brand);
  const setBrand = new Set(dataBrand);
  let filterBrand = [...setBrand];
  const activePage = numPage.findIndex((e) => e === Slice / 12);

  return (
    <div className={cx("product")}>
      <div className={cx("filter")}>
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
                <label
                  className="infType"
                  onClick={(e) => {
                    e.target.style.color === "rgb(78, 55, 252)"
                      ? (e.target.style.color = "rgb(0,0,0)")
                      : (e.target.style.color = "rgb(78, 55, 252)");
                  }}
                >
                  <input
                    type="checkbox"
                    name="keyword"
                    onClick={() => {
                      if (newValue.includes(brand)) {
                        setNewValue(
                          newValue.filter((items) => items !== brand)
                        );
                      } else {
                        setNewValue([...newValue, brand]);
                      }
                    }}
                    id={cx("keyword-brand") + `${index}`}
                  />
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className={cx("aboutPriceMob")}>
          <h2>About Price</h2>
          <div className={cx("itemsPrice")}>
            {price.map((check, index) => (
              <div className={cx("priceDetail")} key={index}>
                <label
                  className="infType"
                  onClick={(e) => {
                    e.target.style.color === "rgb(78, 55, 252)"
                      ? (e.target.style.color = "rgb(0,0,0)")
                      : (e.target.style.color = "rgb(78, 55, 252)");
                  }}
                >
                  <input
                    type="checkbox"
                    name="keyword"
                    onClick={() => {
                      if (newPrice.includes(check)) {
                        setNewPrice(
                          newPrice.filter((items) => items !== check)
                        );
                      } else {
                        setNewPrice([...newPrice, check]);
                      }
                    }}
                    id={cx("keyword-price") + `${check.id}`}
                  ></input>
                  {check.min} - {check.max}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={cx("items_container")}>
        <div className={cx("show")}>
          {(data.length > 12
            ? data.slice(Slice - 12, Slice)
            : data.slice(0)
          ).map((product) => (
            <div className={cx("product-detail")} key={product.id}>
              <div className={cx("detail-box")}>
                <img src={product.url} alt="" />
                <div className={cx("title")}>
                  <h4>{product.title}</h4>
                </div>
                {product.detail.map((items, index) => (
                  <div className={cx("infProduct")} key={index}>
                    <p>Cpu: {items.cpu.map((detail) => detail.type)}</p>
                    <p>
                      Display:{" "}
                      {items.display.map((detail) => detail.size__inch)} inch -{" "}
                      {items.display.map((detail) => detail.refresh_rate__hz)}
                      hz
                    </p>
                    <p>Ram: {items.memory.map((detail) => detail.ram__gb)}GB</p>
                    <p>
                      Hard drive: {items.storage.map((detail) => detail.type)}-
                      {items.storage.map((detail) => detail.capacity__gb)}GB
                    </p>
                    <p>Os: {items.software.map((detail) => detail.os)}</p>
                  </div>
                ))}

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
                    <Link to={`/detail/${product.id}/${product.title}`}>
                      <FontAwesomeIcon icon={faTableList} />
                    </Link>
                  </button>
                  <button>
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={cx("buttonPG")}>
          <div className={cx("buttonCT")}>
            {isShowButton === true ? (
              numPage.map((items, index) => (
                <div
                  className={cx(
                    `pagination${index === activePage ? "Active" : ""}`
                  )}
                  key={index}
                >
                  <button onClick={() => handlePagi(items)}>{items}</button>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
