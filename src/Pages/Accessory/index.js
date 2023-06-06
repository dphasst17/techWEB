import classNames from "classnames/bind";
import style from "./Accessory.module.scss";
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
import Pagination from "~/components/PaginationView/Pagination";
import Filter from "~/components/FilterProduct/Filter";
const cx = classNames.bind(style);

function Accessory() {
  const {
    Access,
    PaginationPage,
    numPage,
    isShowButton,
    HandleActivePage,
    activePage,
    valuePice,
    SortDataBasedOnPrice
  } = useContext(ApiContext);
  const [valueBrand, setValueBrand] = useState([]);
  const [valueType, setValueType] = useState([]);
  const [price, setPrice] = useState([]);
  const [Slice, setSlice] = useState(12);
  const [isShow, setIsShow] = useState(true);
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
  SortDataBasedOnPrice(data,price)

  /* Pagination Page */
  PaginationPage(data, 12);
  useEffect(() => {
    if (!numPage.includes(Slice / 12)) {
      setSlice(12);
    }
  }, [Slice, numPage]);
  const HandlePagination = (e) => {
    setSlice(12 * e);
  };
  HandleActivePage(Slice,12);

  return (
    <div className={cx("accessory")}>
      
      <Filter props={{filterBrand,filterType,valueBrand,valueType,isShowFil,isShow,isShowS,valuePice,price,setPrice,setValueBrand,setIsShow,setIsShowS,setIsShowFil,setValueType}}/>
      <div className={cx("items_container")}>
        <div className={cx("show")}>
          {(data.length > 12
            ? data.slice(Slice - 12, Slice)
            : data.slice(0)
          ).map((product) => (
            <div className={cx("product-detail")} key={product.id} style={{animationDelay: "." + product.id + "s"}}>
              <div className={cx("detail-box")}>
                <img src={product.url} alt="img Access" />
                <div className={cx("title")}>
                  <h4>{product.title}</h4>
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
                  <button onClick={() =>{window.location.pathname = ("/detail/" + product.id+"/"+ product.title)}}>
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
        {isShowButton === true && (
          <Pagination props={{numPage,activePage,HandlePagination}}/>
        )}
      </div>
    </div>
  );
}

export default Accessory;
