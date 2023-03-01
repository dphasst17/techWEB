import classNames from "classnames/bind";
import style from "./Accessory.module.scss";
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons"; */
import { CartContext } from "~/Contexts/Cart";
import { useContext, useState } from "react";
import { ApiContext } from "~/ContextApi/ContextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeart,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const cx = classNames.bind(style);

function Accessory() {
  const { Access } = useContext(ApiContext);
  const [valueBrand, setValueBrand] = useState([]);
  const [valueType, setValueType] = useState([]);
  let filterBrand = Array.from(new Set(Access.map((items) => items.brand)));
  let filterType = Array.from(new Set(Access.map((items) => items.type)));
  let data = Access.filter((items) => {
    if (valueBrand.length !== 0 && valueType.length !== 0) {
      return valueBrand.includes(items.brand) && valueType.includes(items.type);
    } else if (valueBrand.length !== 0 || valueType.length !== 0) {
      return valueBrand.length !== 0
        ? valueBrand.includes(items.brand)
        : valueType.includes(items.type);
    } else {
      return items;
    }
  });
  return (
    <div className={cx("accessory")}>
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
                    if (valueBrand.includes(check)) {
                      setValueBrand(
                        valueBrand.filter((items) => items !== check)
                      );
                    } else {
                      setValueBrand([...valueBrand, check]);
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
          <h3>About Type</h3>
          {filterType.map((price, index) => (
            <div className={cx("box_filter_detail")} key={index}>
              <div htmlFor="keyword" className={cx("detail")}>
                <input
                  type="checkbox"
                  name="keyword"
                  onClick={() => {
                    if (valueType.includes(price)) {
                      setValueType(
                        valueType.filter((items) => items !== price)
                      );
                    } else {
                      setValueType([...valueType, price]);
                      /* setData(DataProduct.filter(value => inputName.includes(value.brand))) */
                    }
                  }}
                  id={cx("keyword-price") + `${index}`}
                ></input>
                <label htmlFor={cx("keyword-price") + `${index}`}>
                  {price}
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
                    if (valueBrand.includes(brand)) {
                      setValueBrand(
                        valueBrand.filter((items) => items !== brand)
                      );
                    } else {
                      setValueBrand([...valueBrand, brand]);
                      /* setData(DataProduct.filter(value => inputName.includes(value.brand))) */
                    }
                  }}
                  id={cx("keyword-brand") + `${index}`}
                />
                <label
                  htmlFor={cx("keyword-brand") + `${index}`}
                  className="infType"
                >
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className={cx("aboutTypeMob")}>
          <h2>About Price</h2>
          <div className={cx("itemsPrice")}>
            {filterType.map((check, index) => (
              <div className={cx("priceDetail")} key={index}>
                <input
                  type="checkbox"
                  name="keyword"
                  onClick={() => {
                    if (valueType.includes(check)) {
                      setValueType(
                        valueType.filter((items) => items !== check)
                      );
                    } else {
                      setValueType([...valueType, check]);
                      /* setData(DataProduct.filter(value => inputName.includes(value.brand))) */
                    }
                  }}
                  id={cx("keyword-price") + `${check.id}`}
                ></input>
                <label
                  htmlFor={cx("keyword-price") + `${check.id}`}
                  className="infType"
                >
                  {check}
                </label>
              </div>
            ))}
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
                  <h4>
                    {product.title}
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
                    <Link to={"/detail/" + product.id + "/" + product.title}><FontAwesomeIcon icon={faTableList} /></Link>
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

export default Accessory;
