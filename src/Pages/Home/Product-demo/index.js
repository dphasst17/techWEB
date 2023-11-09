import React, { useContext, useEffect, useState } from "react";
import "~/tailwind.css";
import "../Home.scss";
import { CartContext } from "~/contexts/Cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import LazyLoad from "react-lazy-load";
import { AnimateScroll } from "~/helper/animateScroll";
import { StateContext } from "~/contexts/stateContext";

const Product = () => {
  const navigate = useNavigate()
  const {laptop} = useContext(StateContext)
  const [data,setData] = useState(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    laptop !== null && setData(laptop.filter(e => e.id % 2 !== 0))
  },[laptop,setData])

  const refs = data?.map(() => React.createRef());
  AnimateScroll(refs,setInView)
  return (
    <>
      {laptop !== null && (
        <h1 className="font-han font-[30px]">OUR PRODUCT</h1>
      )}
      {laptop !== null &&  (
        <div className="h-product w-full h-auto flex flex-wrap justify-around">
          {data !== null && data.slice(0, 12).map((product,i) => (
            <div
              className="product-info w-1/5 h-auto min-h-[350px] min-w-[160px] m-[2%] rounded-[10px] cursor-pointer scale-100"
              key={product.id}
            >
              
                <LazyLoad height={"auto"} offset={50} className="p-0 m-0 flex justify-center">
                  <div ref={refs[i]} className={`product-detail w-full max-w-[300px] h-full ${inView ? 'flex' : 'hidden'} flex-col pb-[2%] rounded-[16px]`}>
                    <div style={{backgroundSize: "100% 100%"}} className="item_top w-full h-[16px] bg-no-repeat bg-[url(https://dlcdnwebimgs.asus.com/files/media/E30EF754-96D6-4A74-82E0-14AACEEABC94/v1/images/large/1x/grid/top.webp)]"></div>
                    <div
                      style={{
                        backgroundRepeat: "repeat-y",
                        backgroundSize: "100% 100%",
                      }}
                      className="item_body w-full h-[90%] pl-0 bg-auto bg-[url(https://dlcdnwebimgs.asus.com/files/media/E30EF754-96D6-4A74-82E0-14AACEEABC94/v1/images/large/1x/grid/body.webp)]"
                    >
                      <div className="image w-full h-[30%] flex justify-center">
                        <img
                          src={product.imgProduct}
                          alt="img Product Laptop"
                          loading="lazy"
                          className="w-full h-44 object-contain"
                        />
                      </div>
                      <div className="items w-full h-[70%] flex flex-col flex-wrap justify-between">
                        <div className="title w-full h-[10%]">
                          <p className="w-full h-[50px] text-[20px] text-white text-center font-BOO font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
                            {product.nameProduct}
                          </p>
                        </div>
                        <div className="accessInf w-full h-[10%] flex justify-around">
                          <div onClick={() => {window.location.pathname = `/search/${product.brand}`}} className="items-brand w-2/5 h-[30px] flex items-center justify-center rounded-[5px] bg-gray-700 font-han text-[20px] text-gray-300 font-semibold overflow-hidden whitespace-nowrap text-ellipsis">{product.brand}</div>
                          <div onClick={() => {window.location.pathname = `/search/${product.nameType}`}} className="items-type w-2/5 h-[30px] flex items-center justify-center rounded-[5px] bg-gray-700 font-han text-[20px] text-gray-300 font-semibold overflow-hidden whitespace-nowrap text-ellipsis">{product.nameType.toUpperCase()}</div>
                        </div>
                        <div className="productAccess w-full h-[36%]">
                          <div className="information pl-[3%]">
                            <p className="transition-all font-han text-[18px] text-gray-300 font-semibold overflow-hidden whitespace-nowrap text-ellipsis text-black">
                              Cpu: {product.detail.map(e => e.cpu)}
                            </p>
                            <p className="transition-all font-han text-[18px] text-gray-300 font-semibold overflow-hidden whitespace-nowrap text-ellipsis text-black">
                              Display: {product.detail.map(e => e.sizeInch.toFixed(1))} inch
                              - {product.detail.map(e => e.resolution)}
                              hz
                            </p>
                            <p className="transition-all font-han text-[18px] text-gray-300 font-semibold overflow-hidden whitespace-nowrap text-ellipsis text-black">
                              Ram: {product.detail.map(e => e.capacity)}GB
                            </p>
                            <p className="transition-all font-han text-[18px] text-gray-300 font-semibold overflow-hidden whitespace-nowrap text-ellipsis text-black">
                              Storage:
                              {product.detail.map(e => e.storage)}
                            </p>
                            <p className="transition-all font-han text-[18px] text-gray-300 font-semibold overflow-hidden whitespace-nowrap text-ellipsis text-black">
                              Os: {product.detail.map(e => e.os)}
                            </p>
                          </div>
                        </div>
                        <div className="items-child w-full h-[21%] flex lg:flex-row flex-col justify-between  ">
                          <div className="money w-full lg:w-3/5 text-[17px] font-semibold ml-[3%] text-gray-300">
                            Price:{" "}
                            <span className="font-han text-[25px] text-zinc-200">
                              {product.price}
                            </span>{" "}
                            USD
                          </div>
                          <div className="button w-full lg:w-2/5 flex flex-col md:flex-row items-center justify-between md:mr-[3%]">
                            <CartContext.Consumer>
                              {({ addToCart }) => (
                                <button
                                  onClick={() => addToCart(product,1)}
                                  className="w-3/4 lg:w-4/6 h-[30px] border-none rounded-[5px] md:my-0 my-[2%] bg-[url(https://dlcdnwebimgs.asus.com/files/media/0EE47A6A-E964-48A7-9332-8C5FD982A196/v1/images/large/1x/09__bgFrame.webp)] bg-cover cursor-pointer hover:bg-blue-600 transition-all"
                                >
                                  <FontAwesomeIcon
                                    className="text-white"
                                    icon={faCartShopping}
                                  />
                                </button>
                              )}
                            </CartContext.Consumer>
                            <button
                              onClick={() => {
                                navigate(`/detail/${product.idType}/${product.idProduct}/${product.nameProduct}`)
                              }}
                              className="w-3/4 lg:w-1/4 h-[30px] flex justify-center items-center border-none rounded-[5px] md:my-0 my-[2%] cursor-pointer bg-blue-800 hover:bg-blue-600 transition-all"
                            >
                              <Link>
                                <FaEye className="text-white m-auto" />
                              </Link>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{backgroundSize: "100% 100%"}} className="item_bottom w-full h-[16px] bg-no-repeat bg-cover bg-[url(https://dlcdnwebimgs.asus.com/files/media/E30EF754-96D6-4A74-82E0-14AACEEABC94/v1/images/large/1x/grid/bottom.webp)]"></div>
                  </div>
                </LazyLoad>
              
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Product;
