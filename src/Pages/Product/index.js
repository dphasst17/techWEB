import React, { useContext, useEffect, useState } from "react";
import "~/tailwind.css";
import "./Product.scss";
import { ApiContext } from "~/contexts/apiContext";
import Filter from "./Filter";
import Pagination from "~/components/PaginationView/Pagination";
import { StateContext } from "~/contexts/stateContext";
import ProductLayout from "~/components/Product";

function Product() {
  const {
    PaginationPage,
    numPage,
    activePage,
    HandleActivePage,
    SortDataBasedOnPrice
  } = useContext(ApiContext);
  const { product, type, valueFil, setValueFil } =
    useContext(StateContext);
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
        <ProductLayout props={{data,Slice,optionType}}/>
        {data !== null && data.length > 12 && (
          <Pagination props={{ numPage, activePage, HandlePagination }} />
        )}
      </div>
    </div>
  );
}

export default Product;
