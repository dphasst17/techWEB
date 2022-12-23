import classNames from "classnames/bind";
import style from "./Accessory.module.scss";
import keyword from "./datafake";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import product from "../Product/ProductFake";
import { CartContext } from "~/Contexts/Cart";

const cx = classNames.bind(style);

function Accessory() {
  return (
    <div className={cx("accessory")}>
      <div className={cx("container")}>
        <div className={cx("content")}>
          <div className={cx("filter")}>
            <p>Bộ lọc</p>
            <div className={cx("container")}>
              <h3>Theo hãng</h3>
              {keyword.map((keyword, index) => (
                <div className={cx("content")} key={index}>
                  <div className={cx("detail")}>
                    <input type="checkbox" name="keyword"></input>
                    <label htmlFor="keyword">{keyword.keyword}</label>
                  </div>
                </div>
              ))}
              <h3>Theo giá tiền</h3>
              {keyword.map((price, index) => (
                <div className={cx("content")} key={index}>
                  <div className={cx("detail")}>
                    <input type="checkbox" name="keyword"></input>
                    <label htmlFor="keyword">{price.price}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={cx("content_container")}>
            <div className={cx("show")}>
              {product.map((product, index) => (
                <div className={cx("product-detail")} key={index}>
                  <div className={cx("detail-box")}>
                    <img src={product.image} alt="" />
                    <h4>{product.title}</h4>
                    <p>{product.price}</p>
                    <CartContext.Consumer>
                      {({ addToCart }) => (
                        <button onClick={() => addToCart(product)}>
                          Add to cart
                        </button>
                      )}
                    </CartContext.Consumer>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={cx("button")}>
            <button className={cx("next")}>
              <FontAwesomeIcon icon={faAnglesLeft} />
            </button>
            <button className={cx("prev")}>
              <FontAwesomeIcon icon={faAnglesRight} />
            </button>
            <div className={cx("number")}>
              <button>1</button>
              <button>2</button>
              <button>3</button>
              <button>4</button>
              <button>....</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accessory;
