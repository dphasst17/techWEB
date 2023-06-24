import React, { useContext, useEffect, useState } from "react";
import "~/tailwind.css";
import  "./Product.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "~/Contexts/Cart";
import { ApiContext } from "~/ContextApi/ContextApi";
import { Link } from "react-router-dom";
import Filter from "./Filter";
import Pagination from "~/components/PaginationView/Pagination";



function Product() {
  const { DataProduct, PaginationPage, numPage, isShowButton, HandleActivePage, activePage, valuePice,SortDataBasedOnPrice } = useContext(ApiContext);
  const [newValue, setNewValue] = useState([]);
  const [newPrice, setNewPrice] = useState([]);
  const [Slice, setSlice] = useState(12);

  let data = DataProduct.filter((value) => {
    newValue.includes(value.brand)
    if (newValue.length !== 0) {
      return (
        newValue.includes(value.brand)
      );
    } else {
      return value;
    }
  });
  SortDataBasedOnPrice(data,newPrice)
  PaginationPage(data, 12)
  useEffect(() => {
    if (!numPage.includes(Slice / 12)) {
      setSlice(12);
    }
  }, [Slice, numPage]);
  const HandlePagination = (e) => {
    if (data.length > 12) {
      (numPage.includes(Slice / 12) ? setSlice(12 * e) : setSlice(12))
    } else {
      setSlice(12)
    }
  };
  const dataBrand = DataProduct.map((items) => items.brand);
  const setBrand = new Set(dataBrand);
  let filterBrand = [...setBrand];
  HandleActivePage(Slice,12)


  return (
    <div className="product">
      <Filter props={{filterBrand,valuePice,newValue,newPrice,setNewValue,setNewPrice}} />
      <div className="items_container w-[90%] min-h-[500px] overflow-hidden">
        <div className="show w-full min-h-[693px] flex flex-wrap justify-start items-start pb-[1%]">
          {(data.length > 12
            ? data.slice(Slice - 12, Slice)
            : data.slice(0)
          ).map((product) => (
            <div className="product-detail w-1/5 h-2/5 mt-[3%] ml-[4%] min-w-[150px] cursor-pointer" key={product.id}>
              <div className="detail-box w-full flex flex-col justify-around rounded-[16px]">
                <div className="itemsImg w-full h-4/5 flex justify-center overflow-hidden">
                  <img src={product.url} alt="img Product Laptop" className="w-full h-[130px] object-contain"/>
                </div>
                <div className="title w-full h-1/5">
                  <h4 className="text-center text-[18px] text-[#bc0c0c] font-semibold overflow-hidden whitespace-nowrap text-ellipsis">{product.title}</h4>
                </div>
                <div className="infProduct w-full h-1/2">
                  <p className="font-semibold text-[16px] text-[#bc0c0c] ml-[5%] overflow-hidden whitespace-nowrap text-ellipsis">Cpu: {product.detail.cpu.type}</p>
                  <p className="font-semibold text-[16px] text-[#bc0c0c] ml-[5%] overflow-hidden whitespace-nowrap text-ellipsis">
                    Display:{" "}
                    {product.detail.display.size__inch} inch -{" "}
                    {product.detail.display.refresh_rate__hz}
                    hz
                  </p>
                  <p className="font-semibold text-[16px] text-[#bc0c0c] ml-[5%] overflow-hidden whitespace-nowrap text-ellipsis">Ram: {product.detail.memory.ram__gb}GB</p>
                  <p className="font-semibold text-[16px] text-[#bc0c0c] ml-[5%] overflow-hidden whitespace-nowrap text-ellipsis">
                    Hard drive: {product.detail.storage.type}-
                    {product.detail.storage.capacity__gb}GB
                  </p>
                  <p className="font-semibold text-[16px] text-[#bc0c0c] ml-[5%] overflow-hidden whitespace-nowrap text-ellipsis">Os: {product.detail.software.os}</p>
                </div>
                <p className="font-semibold text-[16px] text-[#bc0c0c] ml-[5%]">Price: {product.price} USD</p>
                <div className="button w-full h-[12%] flex justify-around mb-[5%]">
                  <button className="w-[20%] h-[30px] text-[16px] font-[550] text-white rounded-[5px] bg-blue-800 hover:bg-blue-600 cursor-pointer" onClick={() => { window.location.pathname = ("/detail/" + product.id + "/" + product.title) }}>
                    <Link to={`/detail/${product.id}/${product.title}`}>
                      <FontAwesomeIcon icon={faTableList} />
                    </Link>
                  </button>

                  <CartContext.Consumer>
                    {({ addToCart }) => (
                      <button className="w-1/2 h-[30px] px-[2%] text-[16px] font-[550] text-white rounded-[5px] bg-blue-800 hover:bg-blue-600 cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis" onClick={() => addToCart(product)}>
                        ADD TO CART
                      </button>
                    )}
                  </CartContext.Consumer>

                  <button className="w-[20%] h-[30px] text-[16px] font-[550] text-white rounded-[5px] bg-blue-800 hover:bg-blue-600 cursor-pointer">
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {isShowButton === true &&
          <Pagination props={{numPage,activePage,HandlePagination}}/>
        }
      </div>
    </div>
  );
}

export default Product;
