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

const cx = classNames.bind(style);

const FeaturedProduct = () => {
  const navigate = useNavigate()
  const { DataProduct, Access } = useContext(ApiContext);
  const data = [...DataProduct, ...Access];
  const filterData = data.filter((items) => Number(items.id) % 4 === 0);
  return (
    <div className={cx("featuredProduct")}>
      {filterData.length!== 0 ? <h2>Featured Product</h2> : <></>}
      <LazyLoad height={"70%"} width={"90%"}>
        <div className={cx("fpDetail")}>
          {filterData.map((items) => (
            <div className={cx("fpItems")} key={items.id}>
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
      </LazyLoad>
    </div>
  );
};

export default FeaturedProduct;
