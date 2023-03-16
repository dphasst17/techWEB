import classNames from "classnames/bind";
import style from "./Accessory.module.scss";
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons"; */
import { CartContext } from "~/Contexts/Cart";
import { useContext, useEffect, useState } from "react";
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
  const { Access,PaginationPage,numPage,isShowButton} = useContext(ApiContext);
  const [valueBrand, setValueBrand] = useState([]);
  const [valueType, setValueType] = useState([]);
  const [isShowInPut, setIsShowInPut] = useState(false);
  const [sliceB, setSliceB] = useState(5);
  const [Slice, setSlice] = useState(12);

  let filterBrand = Array.from(new Set(Access.map((items) => items.brand)));
  let filterMob = filterBrand
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
  filterBrand = filterBrand.slice(0,sliceB)
  useEffect(() => {
    filterBrand.length < 12 ? setIsShowInPut(true): setIsShowInPut(false)
  },[filterBrand])
  /* Pagination Page */
  PaginationPage(data)
  const handlePagi = (e) => {
    setSlice(12 * e);
  };
  const activePage = numPage.findIndex((e) => e === (Slice/12));

  return (
    <div className={cx("accessory")}>
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
          {(isShowInPut === true) ? <div className={cx("load")}><button onClick={() => {setSliceB(sliceB + 4)}}>Load more</button></div> :<div className={cx("load")}><button onClick={() => {setSliceB(sliceB - 8)}}>Hide</button></div>}
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
            {filterMob.map((brand, index) => (
              <div className={cx("brandDetail")} key={index}>
                <label
                  onClick={(e) => {
                    e.target.style.color === "rgb(78, 55, 252)"
                      ? (e.target.style.color = "rgb(0,0,0)")
                      : (e.target.style.color = "rgb(78, 55, 252)");
                  }}
                  className="infType"
                >
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
        <div className={cx("aboutTypeMob")}>
          <h2>About Type</h2>
          <div className={cx("itemsPrice")}>
            {filterType.map((check, index) => (
              <div className={cx("priceDetail")} key={index}>
                <label
                  onClick={(e) => {
                    e.target.style.color === "rgb(78, 55, 252)"
                      ? (e.target.style.color = "rgb(0,0,0)")
                      : (e.target.style.color = "rgb(78, 55, 252)");
                  }}
                  className="infType"
                >
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
                      }
                    }}
                    id={cx("keyword-price") + `${check.id}`}
                  />
                  {check}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={cx("items_container")}>
        <div className={cx("show")}>
          {((data.length > 12)?data.slice(Slice - 12, Slice):data.slice(0)).map((product) => (
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
                    <Link to={"/detail/" + product.id + "/" + product.title}>
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
                <div className={cx(`pagination${index === activePage ? "Active" : ""}`)} key={index}>
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

export default Accessory;
