import React, { useContext, useEffect, useState } from "react";
import "~/tailwind.css";
import "../Home.scss";
import { CartContext } from "~/Contexts/Cart";
import { ApiContext } from "~/ContextApi/ContextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faTableList } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazy-load";
const Product = () => {
  const { DataProduct } = useContext(ApiContext);
  const data = DataProduct.filter((data) => data.id % 2 !== 0);
  const [showElement, setShowElement] = useState(false);
  const [offSet, setOffSet] = useState(50);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    window.innerWidth >= 800 ? setOffSet(50) : setOffSet(55);
  }, []);
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    let showElement;
    if (window.innerWidth >= 800) {
      showElement = !(currentScrollPos < 10 || currentScrollPos > 3200);
    } else {
      showElement = !(currentScrollPos < 10 || currentScrollPos > 4000);
    }
    setShowElement(showElement);
  };
  return (
    <>
      {data.length !== 0 && <h1>OUR PRODUCT</h1>}
      {data.length !== 0 && (
        <div className="h-product w-full h-auto flex flex-wrap justify-between">
          {data.slice(0, 12).map((product) => (
            <div className="product-info" key={product.id}>
              {showElement && (
                <LazyLoad height={"auto"} offset={offSet}>
                  <div className="product-detail w-full h-full flex flex-col">
                    <div className="image w-full flex justify-center">
                      <img
                        src={product.url}
                        alt="img Product Laptop"
                        loading="lazy"
                        className="w-full h-44 object-contain"
                      />
                    </div>
                    <div className="items w-full flex flex-col flex-wrap justify-between">
                      <div className="title">
                        <p className="w-full text-center font-semibold overflow-hidden whitespace-nowrap text-ellipsis">{product.title}</p>
                      </div>
                      <div className="productAccess">
                        <div className="information">
                          <p className="overflow-hidden whitespace-nowrap text-ellipsis text-black">Cpu: {product.detail.cpu.type}</p>
                          <p className="overflow-hidden whitespace-nowrap text-ellipsis text-black">
                            Display: {product.detail.display.size__inch} inch -{" "}
                            {product.detail.display.refresh_rate__hz}
                            hz
                          </p>
                          <p className="overflow-hidden whitespace-nowrap text-ellipsis text-black">Ram: {product.detail.memory.ram__gb}GB</p>
                          <p className="overflow-hidden whitespace-nowrap text-ellipsis text-black">
                            Hard drive: {product.detail.storage.type}-
                            {product.detail.storage.capacity__gb}GB
                          </p>
                          <p className="overflow-hidden whitespace-nowrap text-ellipsis text-black">Os: {product.detail.software.os}</p>
                        </div>
                      </div>
                      <div className="items-child w-full flex lg:flex-row flex-col justify-between  ">
                        <div className="money w-full lg:w-2/4">
                          Price:{product.price} USD
                        </div>
                        <div className="button w-full lg:w-2/5 flex flex-row justify-between">
                          <CartContext.Consumer>
                            {({ addToCart }) => (
                              <button onClick={() => addToCart(product)} className="w-3/4 lg:w-4/6 bg-blue-800 hover:bg-blue-600">
                                <FontAwesomeIcon icon={faCartShopping} />
                              </button>
                            )}
                          </CartContext.Consumer>
                          <button
                            onClick={() => {
                              window.location.pathname =
                                "/detail/" + product.id + "/" + product.title;
                            }}
                            className="w-1/5 lg:w-1/4 bg-blue-800 hover:bg-blue-600"
                          >
                            <Link
                              to={"/detail/" + product.id + "/" + product.title}
                            >
                              <FontAwesomeIcon icon={faTableList} />
                            </Link>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </LazyLoad>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Product;
