import React, { useContext, useEffect, useState } from "react";
import "~/tailwind.css";
import "./Product.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTableList } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "~/contexts/Cart";
import { ApiContext } from "~/contexts/apiContext";
import { Link, useNavigate } from "react-router-dom";
import Filter from "./Filter";
import Pagination from "~/components/PaginationView/Pagination";
import { StateContext } from "~/contexts/stateContext";

function Product() {
  const navigate = useNavigate();
  const {
    PaginationPage,
    numPage,
    activePage,
    HandleActivePage,
    SortDataBasedOnPrice,
  } = useContext(ApiContext);
  const { product, type, valueFil, setValueFil, isDark } =
    useContext(StateContext);
  const { addToCart } = useContext(CartContext);
  const [filPrice, setFilPrice] = useState("0");
  const [Slice, setSlice] = useState(12);
  const [filBrand, setFilBrand] = useState(null);
  const [data, setData] = useState(null);
  const [optionType, setOptionType] = useState("laptop");
  const [filDetailValue, setFilDetailValue] = useState(null);
  /* useEffect(() => {
    type !== null && setActiveData(product.map())
    filDetailValue !== null && console.log(filDetailValue)
    product !== null && console.log(product);
    activeData !== null && console.log(activeData)
  },[filDetailValue,product,activeData]) */

  useEffect(() => {
    product !== null &&
      setData(
        product.filter((f) => f.type === optionType).flatMap((e) => e.data)
      );
  }, [product, optionType]);

  useEffect(() => {
    type !== null &&
      product !== null &&
      setFilDetailValue(
        Object.fromEntries(
          type
            .filter((f) => f.type === optionType)
            .flatMap((t) => t.detail)
            .map((d) => {
              //set value for filter detail product
              let value = Array.from(
                new Set(
                  product
                    ?.filter((f) => f.type === optionType)[0]
                    .data?.flatMap((e) => e.detail.flatMap((t) => t[d.name]))
                )
              );

              if (value.every((item) => typeof item === "number")) {
                value = value.map((number) => Number(number.toFixed(1))).sort((a,b) => a > b ? 1 : -1);
                
              }
              return [d.name, value];
            })
        )
      );
  }, [optionType, product, type, data]);

  useEffect(() => {
    if (!numPage.includes(Slice / 12)) {
      setSlice(12);
    }
  }, [Slice, numPage, setSlice]);
  useEffect(() => {
    const resultData = product?.filter((f) => f.type === optionType)[0].data;
    if(valueFil.length !== 0){
      setData(
         resultData.filter((p) =>
           valueFil.every((v) =>
             v.key === "brand"
               ? v.values.includes(p.brand)
               : v.values.includes(p.detail[0][v.key])
           )
         )
       )
    }
    if(valueFil.length === 0 && product !== null){
      setData(
        product.filter((f) => f.type === optionType)[0].data
      );

    }
      
  }, [valueFil,product,optionType]);

  useEffect(() => {
    setFilBrand(
      Array.from(
        new Set(
          product
            ?.filter((f) => f.type === optionType)[0]
            .data.map((e) => e.brand)
        )
      )
    );
  }, [product, optionType]);
  //
  const HandlePagination = (e) => {
    if (data.length > 12) {
      numPage.includes(Slice / 12) ? setSlice(12 * e) : setSlice(12);
    } else {
      setSlice(12);
    }
  };

  PaginationPage(data, 12);
  SortDataBasedOnPrice(filPrice, data, setData);

  HandleActivePage(Slice, 12);
  return (
    <div className="product">
      <Filter
        props={{
          filBrand,
          type,
          valueFil,
          setValueFil,
          optionType,
          filDetailValue,
          filPrice,
          setOptionType,
          setFilPrice,
        }}
      />
      <div className="items_container w-[90%] min-h-[500px] overflow-hidden">
        <div className="show w-full min-h-[693px] flex flex-wrap justify-start items-start pb-[1%]">
          {data !== null &&
            (data.length > 12
              ? data.slice(Slice - 12, Slice)
              : data.slice(0)
            ).map((product) => (
              <div
                className="product-detail w-1/5 h-2/5 mt-[3%] ml-[4%] min-w-[150px] cursor-pointer"
                key={product.id}
              >
                <div className="detail-box w-full flex flex-col justify-around rounded-[16px]">
                  <div className="itemsImg w-full h-4/5 flex justify-center overflow-hidden">
                    <img
                      src={product.imgProduct}
                      alt="img Product Laptop"
                      className="w-full h-[130px] object-contain"
                    />
                  </div>
                  <div className="title w-full h-1/5">
                    <h4
                      className={`text-center text-[18px] ${
                        isDark ? "text-white" : "text-[#bc0c0c]"
                      }  font-semibold overflow-hidden whitespace-nowrap text-ellipsis`}
                    >
                      {product.nameProduct}
                    </h4>
                  </div>

                  <div className="infProduct w-full h-1/2">
                    {type
                      ?.filter((f) => f.type === optionType)[0]
                      .detail.filter((dFilter) => dFilter.displayorder <= 4)
                      .map((e) => (
                        <p className="font-semibold text-[16px] text-[#bc0c0c] ml-[5%] overflow-hidden whitespace-nowrap text-ellipsis">
                          {e.displayname}:{" "}
                          {product.detail.map((d) => d[e.name])}
                        </p>
                      ))}
                  </div>

                  <p className="font-semibold text-[16px] text-[#bc0c0c] ml-[5%]">
                    Price: {product.price} USD
                  </p>
                  <div className="button w-full h-[12%] flex justify-around mb-[5%]">
                    <button
                      className="w-[20%] h-[30px] text-[16px] font-[550] text-white rounded-[5px] bg-blue-800 hover:bg-blue-600 cursor-pointer"
                      onClick={() => {
                        navigate(
                          `/detail/${product.idType}/${product.nameType}/${product.idProduct}/${product.nameProduct}`
                        );
                      }}
                    >
                      <Link>
                        <FontAwesomeIcon icon={faTableList} />
                      </Link>
                    </button>

                    <button
                      className="w-1/2 h-[30px] px-[2%] text-[16px] font-[550] text-white rounded-[5px] bg-blue-800 hover:bg-blue-600 cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis"
                      onClick={() => addToCart(product, 1)}
                    >
                      ADD TO CART
                    </button>

                    <button className="w-[20%] h-[30px] text-[16px] font-[550] text-white rounded-[5px] bg-blue-800 hover:bg-blue-600 cursor-pointer">
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {data !== null && data.length > 12 && (
          <Pagination props={{ numPage, activePage, HandlePagination }} />
        )}
      </div>
    </div>
  );
}

export default Product;
