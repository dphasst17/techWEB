import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./Product.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeart,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "~/Contexts/Cart";
import { ApiContext } from "~/ContextApi/ContextApi";
import { Link } from "react-router-dom";
import Filter from "./Filter";
import Pagination from "~/components/PaginationView/Pagination";

const cx = classNames.bind(style);


function Product() {
  const { DataProduct, PaginationPage, numPage, isShowButton, HandleActivePage, activePage, valuePice } = useContext(ApiContext);
  const [newValue, setNewValue] = useState([]);
  const [newPrice, setNewPrice] = useState([]);
  const [Slice, setSlice] = useState(12);

  let data = DataProduct.filter((value) => {
    newValue.includes(value.brand)
    if (newValue.length !== 0) {
      return (
        newValue.includes(value.brand)
      );
    } else {
      return value;
    }
  });
  data =
    newPrice !== undefined
      ? newPrice === "1"
        ? data.sort((items, check) => (items.price > check.price ? 1 : -1))
        : data.sort((items, check) => (items.price < check.price ? 1 : -1))
      : data;

  PaginationPage(data, 12)
  useEffect(() => {
    if (!numPage.includes(Slice / 12)) {
      setSlice(12);
    }
  }, [Slice, numPage]);
  const HandlePagination = (e) => {
    if (data.length > 12) {
      (numPage.includes(Slice / 12) ? setSlice(12 * e) : setSlice(12))
    } else {
      setSlice(12)
    }
  };
  const dataBrand = DataProduct.map((items) => items.brand);
  const setBrand = new Set(dataBrand);
  let filterBrand = [...setBrand];
  HandleActivePage(Slice)


  return (
    <div className={cx("product")}>
      <Filter props={{filterBrand,valuePice,newValue,newPrice,setNewValue,setNewPrice}} />
      <div className={cx("items_container")}>
        <div className={cx("show")}>
          {(data.length > 12
            ? data.slice(Slice - 12, Slice)
            : data.slice(0)
          ).map((product) => (
            <div className={cx("product-detail")} key={product.id}>
              <div className={cx("detail-box")}>
                <div className={cx("itemsImg")}><img src={product.url} alt="img Product Laptop" /></div>
                <div className={cx("title")}>
                  <h4>{product.title}</h4>
                </div>
                <div className={cx("infProduct")}>
                  <p>Cpu: {product.detail.cpu.type}</p>
                  <p>
                    Display:{" "}
                    {product.detail.display.size__inch} inch -{" "}
                    {product.detail.display.refresh_rate__hz}
                    hz
                  </p>
                  <p>Ram: {product.detail.memory.ram__gb}GB</p>
                  <p>
                    Hard drive: {product.detail.storage.type}-
                    {product.detail.storage.capacity__gb}GB
                  </p>
                  <p>Os: {product.detail.software.os}</p>
                </div>
                <p>Price: {product.price} USD</p>
                <div className={cx("button")}>
                  <CartContext.Consumer>
                    {({ addToCart }) => (
                      <button onClick={() => addToCart(product)}>
                        <FontAwesomeIcon icon={faCartShopping} />
                      </button>
                    )}
                  </CartContext.Consumer>
                  <button onClick={() => { window.location.pathname = ("/detail/" + product.id + "/" + product.title) }}>
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
        {isShowButton === true &&
          <Pagination props={{numPage,activePage,HandlePagination}}/>
        }
      </div>
    </div>
  );
}

export default Product;
