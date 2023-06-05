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
import Pagination from "~/components/PaginationView/Pagination";
import Filter from "~/components/FilterProduct/Filter";

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
  const [valueBrand, setValueBrand] = useState([]);
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
      if(valueBrand.length !== 0 && valueType.length !== 0){
        return valueBrand.includes(items.brand) && valueType.includes(items.type)
      }else{
        if(valueBrand.length !== 0 || valueType.length !== 0){
          return valueBrand.length !== 0
              ? valueBrand.includes(items.brand)
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
      <Filter props={{filterBrand,filterType,valueBrand,valueType,isShowFil,isShow,isShowS,valuePice,price,setPrice,setValueBrand,setIsShow,setIsShowS,setIsShowFil,setValueType}}/>
      
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
          <Pagination props={{numPage,activePage,HandlePagination}}/>
        )}
      </div>
    </div>
  );
}

export default SearchResult;
