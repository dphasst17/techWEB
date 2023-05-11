import classNames from "classnames/bind";
import style from "../Home.module.scss";
import { CartContext } from "~/Contexts/Cart";

import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "~/ContextApi/ContextApi";
import LazyLoad from "react-lazy-load";
import { FcNext, FcPrevious } from "react-icons/fc";
import { FaEye, FaHeart } from "react-icons/fa";
import { useRef } from "react";


const cx = classNames.bind(style);

const NewsProduct = () => {
  const navigate = useNavigate();
  const { DataProduct} = useContext(ApiContext);
  const [showElement, setShowElement] = useState(false);
  const [offSet, setOffSet] = useState(0);
  const containerRefNew = useRef(null);
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
    window.innerWidth >= 800 ? setOffSet(10) : setOffSet(0)
  }, [])
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    let showElement;
    if (window.innerWidth >= 800) {
      showElement = currentScrollPos < 200 || currentScrollPos > 1500 ? false : true;
    } else {
      showElement = currentScrollPos < 300 || currentScrollPos > 1500 ? false : true;
    }
    setShowElement(showElement);
  };
  const handleNextNew = () => {
    if (containerRefNew.current) {
      containerRefNew.current.scroll({
        left: containerRefNew.current.scrollLeft + 700,
        behavior: "smooth",
      });
    }
  };
  
  const handlePreviousNew = () => {
    if (containerRefNew.current) {
      containerRefNew.current.scroll({
        left: containerRefNew.current.scrollLeft - 700,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (containerRefNew.current) {
        if (
          containerRefNew.current.scrollLeft + containerRefNew.current.offsetWidth >=
          containerRefNew.current.scrollWidth
        ) {
          // reached the last item, scroll back to the first item
          containerRefNew.current.scroll({
            left: 0,
            behavior: "smooth",
          });
        } else {
          // move to the next item
          containerRefNew.current.scroll({
            left: containerRefNew.current.scrollLeft + 500,
            behavior: "smooth",
          });
        }
      }
    }, 7000);
  
    /* setIntervalId(intervalId); */
  
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div className={cx("featuredProduct")}>
      {dataProduct.length !== 0 ? <h2>News Product</h2> : <></>}
      {showElement && <div className={cx("itemsFeat")}>
        <button className={cx("click")} onClick={handlePreviousNew}><FcPrevious /></button>
        <LazyLoad height={"100%"} width={"80%"} offset={offSet}>
          <div className={cx("fpDetail")} ref={containerRefNew}>
            {dataProduct.map((items, index) => (
              <div className={cx("fpItems")} key={items.id} style={{ animationDelay: "." + index + "s" }}>
                <div className={cx("fpImg")}>
                  <img src={items.url} alt="img New Product" loading="lazy" />
                </div>
                <div className={cx("fpTitle")}>
                  {items.title.length > 20
                    ? items.title.slice(0, 20) + `...`
                    : items.title}
                </div>
                <div className={cx("fpPrice")}>Price:{items.price} USD</div>
                <div className={cx("fpButton")}>
                  <button onClick={() => { navigate("/detail/" + items.id + "/" + items.title) }}>
                    <Link to={`/detail/${items.id}/${items.title}`}>
                      <FaEye />
                    </Link>
                  </button>
                  <CartContext.Consumer>
                    {({ addToCart }) => (
                      <button onClick={() => addToCart(items)}>
                        ADD TO CART
                      </button>
                    )}
                  </CartContext.Consumer>
                  <button >
                    <Link to={`/detail/${items.id}/${items.title}`}>
                      <FaHeart />
                    </Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </LazyLoad>
        <button className={cx("click")} onClick={handleNextNew}><FcNext /></button>
      </div>}
    </div>
  );
};
export default NewsProduct;
