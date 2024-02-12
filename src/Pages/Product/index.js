import React, { useContext, useEffect, useState } from "react";
import "~/tailwind.css";
import "./Product.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTableList } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "~/contexts/Cart";
import { ApiContext } from "~/contexts/apiContext";
import { useNavigate } from "react-router-dom";
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
    percentDiscount
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
        <div className="show w-full min-h-[693px] flex flex-wrap justify-around items-start pb-[1%]">
          {data !== null &&
            (data.length > 12
              ? data.slice(Slice - 12, Slice)
              : data.slice(0)
            ).map((product) => (
              <div
                className={`product-detail  w-1/5 h-2/5 mt-[3%] ml-[4%] min-w-[150px] cursor-pointer`}
                key={product.id}
              >
                <div className={`detail-box w-full ${isDark ? 'bg-gray-200 hover:bg-zinc-300' : 'bg-white hover:bg-zinc-200'} flex flex-col justify-around rounded-[16px]`}>
                  <div className="itemsImg relative w-full h-4/5 flex p-2 justify-between overflow-hidden">
                    {product.discount !== 0 && <div className="absolute w-[50px] h-[30px] flex items-center justify-center text-white rounded-md bg-red-500">Sale</div>}
                    <img
                      src={product.imgProduct}
                      alt="img Product Laptop"
                      className="w-full h-[130px] object-contain"
                    />
                    {product.discount !== 0 && <div className="absolute w-[50px] h-[30px] top-20 flex items-center justify-center text-white rounded-md bg-red-500">{product.discount}%</div>}
                  </div>
                  <div className="title w-full h-1/5">
                    <h4
                      className={`text-center text-[18px] ${
                        isDark ? "text-slate-700" : "text-[#bc0c0c]"
                      }  font-semibold overflow-hidden whitespace-nowrap text-ellipsis`}
                    >
                      {product.nameProduct}
                    </h4>
                  </div>

                  <div className="infProduct w-full h-1/2 flex flex-col">
                    {type
                      ?.filter((f) => f.type === optionType)[0]
                      .detail.filter((dFilter) => dFilter.displayorder <= 4)
                      .map((e) => (
                        <span className={`text-[16px]  text-zinc-700 font-bold ml-[5%] overflow-hidden whitespace-nowrap text-ellipsis`}>
                          {e.displayname.toUpperCase()}:{" "}
                          {product.detail.map((d) => d[e.name])}
                        </span>
                      ))}
                  </div>

                  <span className="font-semibold text-[16px] text-slate-700 ml-[5%]">
                    Price: {product.discount !== 0 ? (<><span className="text-red-600 font-medium line-through">{product.price}</span> {percentDiscount(product.discount,product.price)}</>) : product.price} USD
                  </span>
                  <div className="button w-full h-[12%] flex justify-around mb-[5%]">
                    <button
                      className="w-[20%] h-[30px] text-[16px] font-[550] text-white rounded-[5px] bg-slate-700 hover:bg-slate-300 hover:text-slate-700 border-slate-700 cursor-pointer transition-all"
                      onClick={() => {
                        navigate(
                          `/detail/${product.idType}/${product.nameType}/${product.idProduct}/${product.nameProduct}`
                        );
                      }}
                    >
                      <FontAwesomeIcon icon={faTableList} />
                    </button>

                    <button
                      className="w-1/2 h-[30px] px-[2%] text-[16px] font-bold text-white rounded-[5px] bg-slate-700 hover:bg-gray-100 hover:text-slate-700 transition-all cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis"
                      onClick={() => addToCart(product, 1)}
                    >
                      ADD TO CART
                    </button>

                    <button className="w-[20%] h-[30px] text-[16px] font-[550] text-white rounded-[5px] bg-slate-700 hover:bg-slate-300 hover:text-slate-700 border-slate-700  cursor-pointer transition-all">
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
