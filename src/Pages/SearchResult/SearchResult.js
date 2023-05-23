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
import LazyLoad from "react-lazy-load";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

const cx = classNames.bind(style);

function SearchResult() {
  const {
    valueSearch,
    DataProduct,
    Access,
    PaginationPage,
    numPage,
    isShowButton,
    HandleActivePage,
    activePage,
    valuePice
  } = useContext(ApiContext);
  const [value, setValue] = useState([]);
  const [valueType, setValueType] = useState([]);
  const [price, setPrice] = useState([]);
  const navigate = useNavigate();
  const [Slice, setSlice] = useState(12);
  const [isShow, setIsShow] = useState(true);
  const [isShowS, setIsShowS] = useState(false);
  const [isShowFil, setIsShowFil] = useState("-200%")
  /* FILTER DATA BASED ON VALUE SEARCH */
  const allData = [...DataProduct, ...Access];
  const data = allData.filter((data) =>
    valueSearch.length > 0
      ? 
      data.brand.toUpperCase().includes(valueSearch.toUpperCase()) ||
      data.title.toUpperCase().includes(valueSearch.toUpperCase()) ||
      data.type.toUpperCase().includes(valueSearch.toUpperCase())
      : null
  );

  /*FILTER TYPE AND BRAND  */
  let filterBrand = Array.from(new Set(data.map((items) => items.brand)));
  let filterType = Array.from(new Set(data.map((items) => items.type)));

  /*FILTER DATA BASED ON INPUT */
 
  let result = data.filter((items) =>
    {
      if(value.length !== 0 && valueType.length !== 0){
        return value.includes(items.brand) && valueType.includes(items.type)
      }else{
        if(value.length !== 0 || valueType.length !== 0){
          return value.length !== 0
              ? value.includes(items.brand)
              : valueType.includes(items.type)
        }else{
          return items;
        }
      } 
    }
  );
  /* PAGINATION PAGES */
  PaginationPage(result, 12);
  useEffect(() => {
    if (!numPage.includes(Slice / 12)) {
      setSlice(12);
    }
  }, [Slice, setSlice, numPage]);
  const HandlePagination = (e) => {
    setSlice(12 * e);
  };
  HandleActivePage(Slice);
  /* FILTER DATA BASED ON INPUT PRICE */
  result =
    price !== undefined
      ? price === "1"
        ? result.sort((items, check) => (items.price > check.price ? 1 : -1))
        : result.sort((items, check) => (items.price < check.price ? 1 : -1))
      : result;

  return (
    <div className={cx("resultSearch")}>
      <div className={cx("fill")} onClick={() => { setIsShowFil("4%") }}>Filter your result <HiChevronDoubleRight /></div>

      <div className={cx("filter")} style={{ transform: "translateX(" + isShowFil + ")" }}>
        <div className={cx("closeFil")}>
          <p onClick={() => { setValue([]); setValueType([]); setPrice([]) }}>Reset All</p>
          <HiChevronDoubleLeft onClick={() => { setIsShowFil("-200%") }} />
        </div>

        <div className={cx("detail")}>
          {filterBrand.length > 1 && <p onClick={() => { setIsShow(!isShow); setIsShowS(false) }} style={{ backgroundColor: (isShow === true) ? "#2735af" : "#b2b1b1" }}>About Brand</p>}
          {filterType.length > 1 && <p onClick={() => { setIsShowS(!isShowS); setIsShow(false) }} style={{ backgroundColor: (isShowS === true) ? "#2735af" : "#b2b1b1" }}>About Type</p>}
          {filterBrand.length > 1 && (
            isShow && filterBrand.map((items) => (
              <div className={cx("filterBrand")} key={items}>
                <input
                  type="checkbox"
                  onClick={() => {
                    if (value.includes(items)) { setValue(value.filter((check) => check !== items)) }
                    else { setValue([...value, items]) }
                  }}
                  onChange={() => { }}
                  checked={value.includes(items) ? true : false}
                  id={cx("brand-") + `${items}`}
                />
                <label htmlFor={cx("brand-") + `${items}`} >{items}</label>
              </div>
            ))
          )}

          {isShowS && filterType.length > 1 && (
            filterType.map((items) => (
              <div className={cx("filterType")} key={items}>
                <input
                  type="checkbox"
                  onClick={() => {
                    valueType.includes(items)
                      ? setValueType(
                        valueType.filter((check) => check !== items)
                      )
                      : setValueType([...valueType, items]);
                  }}
                  onChange={() => { }}
                  checked={valueType.includes(items) ? true : false}
                  id={cx("type-") + `${items}`}
                />
                <label htmlFor={cx("type-") + `${items}`}>{items}</label>
              </div>
            ))
          )}

        </div>
        {(filterType.length > 1 || filterBrand.length > 1) && (
          <div className={cx("price")}>
            <p>About Price</p>
            {valuePice.map((items) => (
              <div key={items}>
                <input
                  type="radio"
                  name="check"
                  id={items.inputID}
                  value={items.inputValue}
                  onClick={() => {
                    setPrice(items.inputValue);
                  }}
                  onChange={() => { }}
                  checked={price.includes(items.inputValue) ? true : false}
                />
                <label htmlFor={items.inputID}>{items.content}</label>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={cx("items_container")}>
        <div className={cx("show")}>
          {(result.length > 12
            ? result.slice(Slice - 12, Slice)
            : result.slice(0)
          ).map((product) => (
            <div className={cx("product-detail")} key={product.id}>
              <LazyLoad height={"auto"}>
                <div className={cx("detail-box")}>
                  <img src={product.url} alt="img Product" loading="lazy" />
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
        {isShowButton === true && (
          <div className={cx("buttonPG")}>
            <button
              onClick={() => HandlePagination(activePage)}
              disabled={activePage === 0}
            >
              prev
            </button>
            <div className={cx("buttonCT")}>
              {numPage.map((items, index) => (
                <div
                  className={cx(
                    `pagination${index === activePage ? "Active" : ""}`
                  )}
                  key={items}
                >
                  <button onClick={() => HandlePagination(items)}>{items}</button>
                </div>
              ))}
            </div>
            <button
              onClick={() => HandlePagination((activePage + 2))}
              disabled={activePage + 1 === numPage.length}
            >
              next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResult;
