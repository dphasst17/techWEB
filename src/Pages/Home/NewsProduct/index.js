import classNames from "classnames/bind";
import style from "../Home.module.scss";
import { CartContext } from "~/Contexts/Cart";
import {
  faHeart,
  faShoppingCart,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ApiContext } from "~/ContextApi/ContextApi";

const cx = classNames.bind(style);

const NewsProduct = () => {
  const navigate = useNavigate();
  const { DataProduct } = useContext(ApiContext);
  const dataProduct = DataProduct.filter(
    (items) =>
      items.detail.map((check) => check.general.map((check) => check.year)) >=
      2020
  );
  return (
    <div className={cx("featuredProduct")}>
      <h2>News Product</h2>
      <div className={cx("fpDetail")}>
        {dataProduct.map((items) => (
          <div className={cx("fpItems")} key={items.id}>
            <div className={cx("fpImg")}>
              <img src={items.url} alt="img Featured" />
            </div>
            <div className={cx("fpTitle")}>
              {items.title.length > 20
                ? items.title.slice(0, 20) + `...`
                : items.title}
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
    </div>
  );
};
export default NewsProduct;
