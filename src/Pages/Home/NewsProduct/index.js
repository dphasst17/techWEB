import classNames from "classnames/bind";
import style from "../Home.module.scss";
import { CartContext } from "~/Contexts/Cart";
import {

  faShoppingCart,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "~/ContextApi/ContextApi";
import LazyLoad from "react-lazy-load";


const cx = classNames.bind(style);

const NewsProduct = () => {
  const navigate = useNavigate();
  const { DataProduct } = useContext(ApiContext);
  const [showElement, setShowElement] = useState(false);
  const [offSet, setOffSet] = useState(0)
  const dataProduct = DataProduct.filter(
    (items) =>
      items.detail.map((check) => check.general.year) >=
      2020
  );
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    window.innerWidth >=800 ? setOffSet(10) : setOffSet(0)
  },[])
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    window.innerWidth >=800 
    ?setShowElement(currentScrollPos < 200 || currentScrollPos > 1500 ? false : true)
    :setShowElement(currentScrollPos < 300 || currentScrollPos > 1500 ? false : true)
  };
  return (
    <div className={cx("featuredProduct")}>
      {dataProduct.length!==0 ? <h2>News Product</h2> : <></>}
        {showElement && <LazyLoad height={"70%"} width={"90%"} offset={offSet}>
          <div className={cx("fpDetail")}>
            {dataProduct.map((items,index) => (
              <div className={cx("fpItems")} key={items.id} style={{animationDelay:"."+index+"s"}}>
                <div className={cx("fpImg")}>
                  <img src={items.url} alt="img New Product" loading="lazy"/>
                </div>
                <div className={cx("fpTitle")}>
                  {items.title.length > 20
                    ? items.title.slice(0, 20) + `...`
                    : items.title}
                </div>
                <div className={cx("fpPrice")}>Price:{items.price} USD</div>
                <div className={cx("fpButton")}>
                  
                  <button onClick={() => {navigate("/detail/" + items.id + "/" + items.title)}}>
                    <Link to={`/detail/${items.id}/${items.title}`}>
                      <FontAwesomeIcon icon={faTableList} />
                    </Link>
                  </button>
                  <CartContext.Consumer>
                    {({ addToCart }) => (
                      <button onClick={() => addToCart(items)}>
                        <FontAwesomeIcon icon={faShoppingCart} />
                      </button>
                    )}
                  </CartContext.Consumer>
                </div>
              </div>
            ))}
          </div>
        </LazyLoad>}
    </div>
  );
};
export default NewsProduct;
