import classNames from "classnames/bind";
import style from "./Accessory.module.scss";
/* import keyword from "./datafake"; */
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons"; */
import { CartContext } from "~/Contexts/Cart";
import { useContext, useState } from "react";
import { ApiContext } from "~/ContextApi/ContextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart, faTableList } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(style);

function Accessory() {
  const { Access } = useContext(ApiContext);
  const [valueBrand, setValueBrand] = useState([]);
  const [valueType, setValueType] = useState([]);
  const dataBrand = Access.map((items) => items.brand);
  const dataType = Access.map((items) => items.type);
  let filterBrand = Array.from(new Set(dataBrand));
  let filterType = Array.from(new Set(dataType));
  let data = Access.filter(items => {
    if(valueBrand.length!==0 && valueType.length!==0){
      return valueBrand.includes(items.brand) && valueType.includes(items.type)
    }else if(valueBrand.length!==0 || valueType.length!==0){
      return (valueBrand.length !== 0) ? valueBrand.includes(items.brand) : valueType.includes(items.type)
    }else{
      return items
    }
})
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
              <h3>About Price</h3>
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
                          setValueType([...valueType,price]);
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

      <div className={cx("items_container")}>
        <div className={cx("show")}>
          {data.map((product) => (
            <div className={cx("product-detail")} key={product.id}>
              <div
                className={cx("detail-box")}
                onClick={() => {
                  console.log(product.title.length);
                }}
              >
                <img src={product.url} alt="" />
                <div className={cx("title")}>
                  <h4>{(product.title.length >= 19) ? product.title.slice(0,20) + `...` : product.title }</h4>
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

export default Accessory;
