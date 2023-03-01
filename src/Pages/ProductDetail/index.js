import React, { useContext } from "react";
import "./ProductDetail.scss";
import { Link, useNavigate, useParams} from "react-router-dom";
import { ApiContext } from "~/ContextApi/ContextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart, faTableList } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "~/Contexts/Cart";

const ProductDetail = () => {
  const { DataProduct, Access } = useContext(ApiContext);
  const navigate = useNavigate();
  const {productID} = useParams()
  /* const productID = window.location.pathname.slice(8).split('/').shift() */
  const productsData = [...DataProduct, ...Access];
  const thisProduct = productsData.filter(
    (items) => Math.floor(items.id) === Math.floor(productID)
  );
  const random = Math.floor(Math.random() * 10) + 9;
  const relatedProducts = productsData.filter(
    (items) => items.id % random === 0
  ).slice(0,6);
  return (
    <div className="detailPage">
      <div className="items">
        {thisProduct.map((items, index) => {return <div className="itemsChild" key={index}>
              <div className="image">
                <img src={items.url} alt="img Product" />
              </div>
              <div className="itemsContent">
                <div className="title">
                  <h1>{items.title}</h1>
                </div>
                <hr></hr>
                <div className="price">
                  <h1>Price: {items.price} USD</h1>
                </div>
                {items.type === "laptop"
                  ? items.detail.map((items, index) => (
                      <div className="infoProduct" key={index}>
                        <h3>
                          Cpu:
                          {items.cpu.map((detail) =>
                            detail.type
                          )}
                        </h3>
                        <h3>
                          Display:
                          {items.display.map((detail) => detail.size__inch)}
                          inch -
                          {items.display.map(
                            (detail) => detail.refresh_rate__hz
                          )}
                          hz
                        </h3>
                        <h3>
                          Ram: {items.memory.map((detail) => detail.ram__gb)}GB
                        </h3>
                        <h3>
                          Hard drive:
                          {items.storage.map((detail) => detail.type)}-
                          {items.storage.map((detail) => detail.capacity__gb)}GB
                        </h3>
                        <h3>Os: {items.software.map((detail) => detail.os)}</h3>
                      </div>
                    ))
                  : items.detail.map((item, index) => (
                      <div className="infoProduct" key={index}>
                        <h3>{item.inf.map((items) => items.inf1)}</h3>
                        <h3>{item.inf.map((items) => items.inf2)}</h3>
                        <h3>{item.inf.map((items) => items.inf3)}</h3>
                      </div>
                    ))}
                <div className="button">
                    <CartContext.Consumer>
                        {({ addToCart }) => (
                          <button onClick={() => addToCart(items)}>
                            Add to Cart
                          </button>
                        )}
                    </CartContext.Consumer>
                  <button>Add to favorites</button>
                </div>
              </div>
            </div>}
            
          )}
      </div>
      <div className="relatedProducts">
        <h1>YOU MAY ALSO LIKE</h1>
        <div className="relatedChild">
        {thisProduct !== undefined ? (
          relatedProducts.map((items, index) => (
            <div className="relatedDetail" key={index}>
                <div className="imgRelated">
                    <img src={items.url} alt="img Related"/>
                </div>
                <div className="titleRelated">
                    <h4>{(items.title.length > 18) ? items.title.slice(0,18)+ `...`: items.title}</h4>
                </div>
                <div className="priceRelated">
                    <h4>Price: {items.price} USD</h4>
                </div>
                <div className="button">
                    <CartContext.Consumer>
                    {({ addToCart }) => (
                      <button onClick={() => addToCart(items)}>
                        <FontAwesomeIcon icon={faCartShopping} />
                      </button>
                    )}
                  </CartContext.Consumer>
                    <button onClick={() => {navigate("/detail/"+ items.id +"/" + items.title)}}><Link to={`/detail/${items.id}/${items.title}`}><FontAwesomeIcon icon={faTableList}/></Link ></button>
                    <button><FontAwesomeIcon icon={faHeart}/></button>
                </div>
            </div>
          ))
        ) : (
          <></>
        )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
