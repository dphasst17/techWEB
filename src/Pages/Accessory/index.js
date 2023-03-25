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
import { HiChevronDoubleLeft,HiChevronDoubleRight } from "react-icons/hi";
const cx = classNames.bind(style);

function Accessory() {
  const {
    Access,
    PaginationPage,
    numPage,
    isShowButton,
    HandleActivePage,
    activePage,
  } = useContext(ApiContext);
  const [valueBrand, setValueBrand] = useState([]);
  const [valueType, setValueType] = useState([]);
  const [Slice, setSlice] = useState(12);
  const [isShow, setIsShow] = useState(false);
  const [isShowS, setIsShowS] = useState(false);
  const [isShowFil,setIsShowFil] = useState("-200%")
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

  /* Pagination Page */
  PaginationPage(data, 12);
  useEffect(() => {
    if (!numPage.includes(Slice / 12)) {
      setSlice(12);
    }
  }, [Slice, numPage]);
  const handlePagi = (e) => {
    setSlice(12 * e);
  };
  HandleActivePage(Slice);
  /* const activePage = numPage.findIndex((e) => e === Slice / 12); */

  return (
    <div className={cx("accessory")}>
      <div className={cx("fill")} onClick={() => {setIsShowFil("0%")}}>Filter your result <HiChevronDoubleRight /></div>
      <div className={cx("filter")} style={{transform:"translateX(" + isShowFil + ")"}}>
        <div className={cx("closeFil")}>
            <p onClick={() => {setValueBrand([]); setValueType([])}}>Reset All</p>
            <HiChevronDoubleLeft onClick={() => {setIsShowFil("-200%")}}/>
        </div>
        <div className={cx("box_filter")}>
          <p onClick={() => {setIsShow(!isShow);setIsShowS(false)}}>About Brand</p>
          <p onClick={() => {setIsShowS(!isShowS);setIsShow(false)}}>About Type</p>
          {isShow && filterBrand.map((check, index) => (
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
                  onChange={() => {}}
                  checked={valueBrand.includes(check) ? true : false}
                  id={cx("keyword-brand") + `${index}`}
                />
                <label htmlFor={cx("keyword-brand") + `${index}`}>
                  {check}
                </label>
              </div>
            </div>
          ))}
         
          
          {isShowS && filterType.map((price, index) => (
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
                  onChange={() => {}}
                  checked={valueType.includes(price) ? true : false}
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
          {(data.length > 12
            ? data.slice(Slice - 12, Slice)
            : data.slice(0)
          ).map((product) => (
            <div className={cx("product-detail")} key={product.id} style={{animationDelay: "." + product.id + "s"}}>
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
        {isShowButton === true ? (
          <div className={cx("buttonPG")}>
            <button
              onClick={() => handlePagi(activePage)}
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
                  key={index}
                >
                  <button onClick={() => handlePagi(items)}>{items}</button>
                </div>
              ))}
            </div>
            <button
              onClick={() => handlePagi(activePage + 2)}
              disabled={activePage + 1 === numPage.length}
            >
              next
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Accessory;
