import {
  faHeart,
  faShoppingCart,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { ApiContext } from "~/ContextApi/ContextApi";
import { CartContext } from "~/Contexts/Cart";
import classNames from "classnames/bind";
import style from "../Home.module.scss";
import { Link, useNavigate } from "react-router-dom";
import LazyLoad from "react-lazy-load";
import { useState } from "react";
import { useEffect } from "react";

const cx = classNames.bind(style);

const FeaturedProduct = () => {
  const navigate = useNavigate()
  const { DataProduct, Access } = useContext(ApiContext);
  const [showElement, setShowElement] = useState(false);
  const [offSet, setOffSet] = useState(0)
  const data = [...DataProduct, ...Access];
  const filterData = data.filter((items) => Number(items.id) % 4 === 0);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    window.innerHeight >=800 ? setOffSet(10) : setOffSet(0)
  },[])
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setShowElement(currentScrollPos > 100);
    currentScrollPos > 1000   ? setShowElement(false):setShowElement(true)

  };
  return (
    <div className={cx("featuredProduct")}>
      {filterData.length!== 0 ? <h2>Featured Product</h2> : <></>}
        {showElement && <LazyLoad height={"70%"} width={"90%"} offset={offSet}>
          <div className={cx("fpDetail")}>
            {filterData.map((items,index) => (
              <div className={cx("fpItems")} key={items.id} style={{animationDelay:"."+index+"s"}}>
                
                <div className={cx("fpImg")}>
                  <img src={items.url} alt="img Featured" loading="lazy"/>
                </div>
                <div className={cx("fpTitle")}>
                  {items.title}
                </div>
                <div className={cx("fpPrice")}>Price:{items.price} USD</div>
                <div className={cx("fpButton")}>
                  <CartContext.Consumer>
                    {({ addToCart }) => (
                      <button onClick={() => addToCart(items)}>
                        <FontAwesomeIcon icon={faShoppingCart} />
                      </button>
                    )}
                  </CartContext.Consumer>
                  <button onClick={() => {navigate("/detail/" + items.id + "/" + items.title)}}>
                    <Link to={`/detail/${items.id}/${items.title}`}>
                      <FontAwesomeIcon icon={faTableList} />
                    </Link>
                  </button>
                  <button>
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </LazyLoad>}
    </div>
  );
};

export default FeaturedProduct;
