import classNames from "classnames/bind";
import style from "./SearchResult.module.scss";
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "~/ContextApi/ContextApi";
import { CartContext } from "~/Contexts/Cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeart,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import LazyLoad from 'react-lazy-load';

const cx = classNames.bind(style);

const valuePice = [
  {
    content: "Low to Hight",
    inputValue: "1",
    inputID: "low",
  },
  {
    content: "Hight to Low",
    inputValue: "2",
    inputID: "hight",
  },
];

function SearchResult() {
  const { valueSearch, DataProduct, Access,PaginationPage,numPage,isShowButton } = useContext(ApiContext);
  const [SliceIP, setSliceIP] = useState(6);
  const [isShowButtonIP, setIsShowButtonIP] = useState(false);
  const [value, setValue] = useState([]);
  const [valueType, setValueType] = useState([]);
  const [price, setPrice] = useState();
  const [button, setButton] = useState(false);
  const navigate = useNavigate();
  const [Slice, setSlice] = useState(12);
  /* FILTER DATA BASED ON VALUE SEARCH */
  const allData = [...DataProduct, ...Access];
  const data = allData.filter((data) =>
  valueSearch.length > 0
    ? data.brand.toUpperCase().includes(valueSearch.toUpperCase()) ||
      data.title.toUpperCase().includes(valueSearch.toUpperCase()) ||
      data.type.toUpperCase().includes(valueSearch.toUpperCase())
    : null
);

  /*FILTER TYPE AND BRAND  */
  const dataBrand = data.map((items) => items.brand);
  const dataType = data.map((items) => items.type);
  let filterBrand = Array.from(new Set(dataBrand));
  useEffect(() => {
    filterBrand.length >= 5 ? setButton(true) : setButton(false);
  }, [filterBrand]);
  filterBrand = filterBrand.slice(0, SliceIP);

  useEffect(() => {
    filterBrand.length < 13
      ? setIsShowButtonIP(true)
      : setIsShowButtonIP(false);
  }, [filterBrand]);

  let filterType = Array.from(new Set(dataType));

  /*FILTER DATA BASED ON INPUT */
  let result = data.filter((items) =>
    value.length !== 0 && valueType.length !== 0
      ? value.includes(items.brand) && valueType.includes(items.type)
      : value.length !== 0 || valueType.length !== 0
      ? value.length !== 0
        ? value.includes(items.brand)
        : valueType.includes(items.type)
      : items
  );
  /* PAGINATION PAGES */
  PaginationPage(result)
  const handlePagi = (e) => {
    setSlice(12 * e);
  };
  const activePage = numPage.findIndex((e) => e === (Slice/12));
  /* FILTER DATA BASED ON INPUT PRICE */
  result =
    price !== undefined
      ? price === "1"
        ? result.sort((items, check) => (items.price > check.price ? 1 : -1))
        : result.sort((items, check) => (items.price < check.price ? 1 : -1))
      : result;

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
          {filterBrand.length > 1 ? (
            button === true ? (
              isShowButtonIP === true ? (
                <div className={cx("load")}>
                  <button
                    onClick={() => {
                      setSliceIP(SliceIP + 4);
                    }}
                  >
                    Load More...
                  </button>
                </div>
              ) : (
                <div className={cx("load")}>
                  <button
                    onClick={() => {
                      setSliceIP(SliceIP - 8);
                    }}
                  >
                    Hide
                  </button>
                </div>
              )
            ) : (
              <></>
            )
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
                    valueType.includes(items)
                      ? setValueType(
                          valueType.filter((check) => check !== items)
                        )
                      : setValueType([...valueType, items]);
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
              {valuePice.map((items, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    name="check"
                    id={items.inputID}
                    value={items.inputValue}
                    onClick={() => {
                      setPrice(items.inputValue);
                    }}
                  />
                  <label htmlFor={items.inputID}>{items.content}</label>
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {valueSearch.length !== 0 ? (
        <div className={cx("filterMob")}>
          <div className={cx("aboutBrand")}>
            {filterBrand.length > 1 ? <h3>About Brand</h3> : <></>}
            <div className={cx("brandDetail")}>
              {filterBrand.length > 1 ? (
                filterBrand.map((items, index) => (
                  <div className={cx("filterBrand")} key={index}>
                    <label
                      onClick={(e) => {
                        e.target.style.color === "rgb(78, 55, 252)"
                          ? (e.target.style.color = "rgb(0,0,0)")
                          : (e.target.style.color = "rgb(78, 55, 252)");
                      }}
                    >
                      <input
                        type="checkbox"
                        onClick={() => {
                          value.includes(items)
                            ? setValue(value.filter((check) => check !== items))
                            : setValue([...value, items]);
                        }}
                        id={cx("brand") + `${index}`}
                      />
                      {items}
                    </label>
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
                    <label
                      onClick={(e) => {
                        e.target.style.color === "rgb(78, 55, 252)"
                          ? (e.target.style.color = "rgb(0,0,0)")
                          : (e.target.style.color = "rgb(78, 55, 252)");
                      }}
                    >
                      <input
                        type="checkbox"
                        onClick={() => {
                          valueType.includes(items)
                            ? setValueType(
                                valueType.filter((check) => check !== items)
                              )
                            : setValueType([...valueType, items]);
                        }}
                        name={cx("type") + `${index}`}
                        id={cx("type") + `${index}`}
                      />
                      {items}
                    </label>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
          {filterType.length > 1 || filterBrand.length > 1 ? (
            <div className={cx("price")}>
              <h3>About Price</h3>

              {valuePice.map((items) => (
                <>
                  <input
                    type="radio"
                    name="check"
                    id={items.inputID}
                    value={items.inputValue}
                    onClick={() => {
                      setPrice(items.inputValue);
                    }}
                  />
                  <label htmlFor={items.inputID}>{items.content}</label>
                </>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
      <div className={cx("items_container")}>
        <div className={cx("show")}>
          {((result.length > 12)?result.slice(Slice - 12, Slice):result.slice(0)).map((product) => (
            <div className={cx("product-detail")} key={product.id}>
              <LazyLoad height={"auto"}>
                <div className={cx("detail-box")}>
                  <img src={product.url} alt="img Product" loading="lazy"/>
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
                    <button
                      onClick={() => {
                        navigate("/detail/" + product.id + "/" + product.title);
                      }}
                    >
                      <FontAwesomeIcon icon={faTableList} />
                    </button>
                    <button>
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                  </div>
                </div>
              </LazyLoad>
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

export default SearchResult;
