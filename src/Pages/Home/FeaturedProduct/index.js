import { ApiContext } from "~/ContextApi/ContextApi";
import { CartContext } from "~/Contexts/Cart";
import classNames from "classnames/bind";
import style from "../Home.module.scss";
import { Link, useNavigate } from "react-router-dom";
import LazyLoad from "react-lazy-load";
import { useState, useEffect, useContext, useRef } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import { FaEye, FaHeart } from "react-icons/fa";

const cx = classNames.bind(style);

const FeaturedProduct = () => {
  const navigate = useNavigate()
  const { DataProduct, Access} = useContext(ApiContext);
  const [showElement, setShowElement] = useState(false);
  const [offSet, setOffSet] = useState(0);
  const data = [...DataProduct, ...Access];
  const containerRef = useRef(null);

  const filterData = data.filter((items) => Number(items.id) % 4 === 0);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    window.innerHeight >= 800 ? setOffSet(10) : setOffSet(0)
  }, [])
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setShowElement(currentScrollPos < 1000 ? true : false);
  };
  const handleNext = () => {
    if (containerRef.current) {
      containerRef.current.scroll({
        left: containerRef.current.scrollLeft + 700,
        behavior: "smooth",
      });
    }
  };
  
  const handlePrevious = () => {
    if (containerRef.current) {
      containerRef.current.scroll({
        left: containerRef.current.scrollLeft - 700,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (containerRef.current) {
        if (
          containerRef.current.scrollLeft + containerRef.current.offsetWidth >=
          containerRef.current.scrollWidth
        ) {
          // reached the last item, scroll back to the first item
          containerRef.current.scroll({
            left: 0,
            behavior: "smooth",
          });
        } else {
          // move to the next item
          containerRef.current.scroll({
            left: containerRef.current.scrollLeft + 500,
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
      {filterData.length !== 0 ? <h2>Featured Product</h2> : <></>}
      {showElement && <div className={cx("itemsFeat")}>
        <button className={cx("click")} onClick={handlePrevious}><FcPrevious /></button>
        <LazyLoad height={"100%"} width={"80%"} offset={offSet}>
          <div className={cx("fpDetail")} ref={containerRef}>
            {filterData.map((items, index) => (
              <div className={cx("fpItems")} key={items.id} style={{ animationDelay: "." + index + "s" }} >

                <div className={cx("fpImg")}>
                  <img src={items.url} alt="img Featured" loading="lazy" />
                </div>
                <div className={cx("fpTitle")}>
                  {items.title}
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
        <button className={cx("click")} onClick={handleNext}><FcNext /></button>
      </div>}
    </div>
  );
};

export default FeaturedProduct;
