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
  const productsData = [...DataProduct, ...Access];
  const thisProduct = productsData.filter(
    (items) => Math.floor(items.id) === Math.floor(productID)
  );
  const filteredArray = productsData.filter(item => Math.floor(item.id) !== Math.floor(productID));
  const shuffledArray = filteredArray.sort(() => Math.random() - 0.5); 
  /* const random = Math.floor(Math.random() * 10) + 9; */
  const relatedProducts = shuffledArray.slice(0, 6);
  return (
    <div className="detailPage w-full h-auto min-h-[370px] flex flex-col justify-between">
      <div className="items w-full min-h-[350px] h-auto mb-[4%]">
        {thisProduct.map((items) => {return <div className="itemsChild w-full h-auto flex flex-row justify-center" key={items.id}>
              <div className="image w-2/5 flex justify-center">
                <img src={items.url} alt="img Product" className="w-4/5 h-full object-contain"/>
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
                  ? 
                      <div className="infoProduct">
                        <h3>
                          Cpu:
                          {items.detail.cpu.type
                          }
                        </h3>
                        <h3>
                          Display:
                          {items.detail.display.size__inch}
                          inch -
                          {items.detail.display.refresh_rate__hz
                          }
                          hz
                        </h3>
                        <h3>
                          Ram: {items.detail.memory.ram__gb}GB
                        </h3>
                        <h3>
                          Hard drive:
                          {items.detail.storage.type}-
                          {items.detail.storage.capacity__gb}GB
                        </h3>
                        <h3>Os: {items.detail.software.os}</h3>
                      </div>
                    
                  : items.detail.map((item) => (
                      <div className="infoProduct" key={items.id}>
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
          relatedProducts.map((items) => (
            <div className="relatedDetail" key={items.id}>
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
