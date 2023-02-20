import classNames from "classnames/bind";
import style from "./SearchResult.module.scss";
import { useContext, useState } from "react";
import { ApiContext } from "~/ContextApi/ContextApi";
import { CartContext } from "~/Contexts/Cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeart,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(style);

function SearchResult() {
  const { valueSearch, DataProduct, Access } = useContext(ApiContext);
  const [value, setValue] = useState([]);
  const dataProduct = DataProduct.filter((data) =>
    valueSearch.length > 0
      ? data.title.toUpperCase().includes(valueSearch.toUpperCase()) ||
        data.brand.toUpperCase().includes(valueSearch.toUpperCase())
      : null
  );
  const dataAccess = Access.filter((data) =>
    valueSearch.length > 0
      ? data.brand.toUpperCase().includes(valueSearch.toUpperCase()) ||
        data.title.toUpperCase().includes(valueSearch.toUpperCase()) ||
        data.type.toUpperCase().includes(valueSearch.toUpperCase())
      : null
  );

  const data = [...dataProduct, ...dataAccess];

  const dataBrand = data.map((items) => items.brand);
  const dataType = data.map((items) => items.type);
  let filterBrand = Array.from(new Set(dataBrand));
  let filterType = Array.from(new Set(dataType));
  /* const handleCheck = () => {
    console.log(data);
  }; */
  let result = data.filter((items) =>
    value.length !== 0
      ? value.includes(items.brand) || value.includes(items.type)
      : items
  );
  return (
    <div className={cx("resultSearch")}>
      <div className={cx("filter")}>
        <div className={cx("detail")}>
          {filterBrand.length > 1 ? <h3>About Brand</h3> : <></>}
          {filterBrand.length > 1 ? (
            filterBrand.map((items, index) => (
              <div className={cx("filterBrand")} key={index}>
                <input
                  type="checkbox"
                  onClick={() => {
                    value.includes(items)
                      ? setValue(value.filter((check) => check !== items))
                      : setValue([...value, items]);
                  }}
                  id={cx("brand") + `${index}`}
                />
                <label htmlFor={cx("brand") + `${index}`}>{items}</label>
              </div>
            ))
          ) : (
            <></>
          )}
          {filterType.length > 1 ? <h3>About Type</h3> : <></>}
          {filterType.length > 1 ? (
            filterType.map((items, index) => (
              <div className={cx("filterType")} key={index}>
                <input
                  type="checkbox"
                  onClick={() => {
                    value.includes(items)
                      ? setValue(value.filter((check) => check !== items))
                      : setValue([...value, items]);
                  }}
                  id={cx("type") + `${index}`}
                />
                <label htmlFor={cx("type") + `${index}`}>{items}</label>
              </div>
            ))
          ) : (
            <></>
          )}
          {filterType.length > 1 || filterBrand.length > 1 ? (
            <div className={cx("price")}>
              <h3>About Price</h3>
              <input
                type="radio"
                name="check"
                id={cx("lowToHigh")}
                value={cx("1")}
              />
              <label htmlFor={cx("lowToHigh")}>Low to High</label>
              <br></br>
              <input
                type="radio"
                name="check"
                id={cx("lowToHigh2")}
                value={cx("2")}
              />
              <label htmlFor={cx("lowToHigh2")}>High to Low</label>
            </div>
          ) : (
            <></>
          )}
        </div>
        {/* <button onClick={() => {console.log(filterType)}}>check</button> */}
      </div>
      <div className={cx("filterMob")}>
        <div className={cx("aboutBrand")}>
          {filterBrand.length > 1 ? <h3>About Brand</h3> : <></>}
          <div className={cx("brandDetail")}>
            {filterBrand.length > 1 ? (
              filterBrand.map((items, index) => (
                <div className={cx("filterBrand")} key={index}>
                  <input
                    type="checkbox"
                    onClick={() => {
                      value.includes(items)
                        ? setValue(value.filter((check) => check !== items))
                        : setValue([...value, items]);
                    }}
                    id={cx("brand") + `${index}`}
                  />
                  <label htmlFor={cx("brand") + `${index}`}>{items}</label>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className={cx("aboutType")}>
        {filterType.length > 1 ? <h3>About Type</h3> : <></>}
          <div className={cx("typeDetail")}>
            {filterType.length > 1 ? (
              filterType.map((items, index) => (
                <div className={cx("filterType")} key={index}>
                  <input
                    type="checkbox"
                    onClick={() => {
                      value.includes(items)
                        ? setValue(value.filter((check) => check !== items))
                        : setValue([...value, items]);
                    }}
                    id={cx("type") + `${index}`}
                  />
                  <label htmlFor={cx("type") + `${index}`}>{items}</label>
                </div>
              ))
            ) : (
              <></>
            )}
          </div >
        </div>
      </div>
      <div className={cx("items_container")}>
        <div className={cx("show")}>
          {result.map((product) => (
            <div className={cx("product-detail")} key={product.id}>
              <div
                className={cx("detail-box")}
                onClick={() => {
                  console.log(product);
                }}
              >
                <img src={product.url} alt="" />
                <div className={cx("title")}>
                  <h4>
                    {product.title.length >= 19
                      ? product.title.slice(0, 20) + `...`
                      : product.title}
                  </h4>
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
  );
}

export default SearchResult;
