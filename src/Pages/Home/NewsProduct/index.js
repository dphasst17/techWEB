import "~/tailwind.css";
import "../Home.scss";
import { CartContext } from "~/contexts/Cart";

import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useRef } from "react";
import LazyLoad from "react-lazy-load";
import { FcNext, FcPrevious } from "react-icons/fc";
import { StateContext } from "~/contexts/stateContext";
import { ButtonIconAddCart } from "~/components/Button/addCart";
import ButtonViewDetail from "~/components/Button/viewDetail";
import { ViewBrandAndType } from "~/components/Product/viewMultiBtn";



const NewsProduct = () => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext)
  const { isDark, newData } = useContext(StateContext)
  const containerRefNew = useRef(null);

  const handleNextNew = () => {
    if (containerRefNew.current) {
      containerRefNew.current.scroll({
        left: containerRefNew.current.scrollLeft + 700,
        behavior: "smooth",
      });
    }
  };

  const handlePreviousNew = () => {
    if (containerRefNew.current) {
      containerRefNew.current.scroll({
        left: containerRefNew.current.scrollLeft - 700,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (containerRefNew.current) {
        if (
          containerRefNew.current.scrollLeft + containerRefNew.current.offsetWidth >=
          containerRefNew.current.scrollWidth
        ) {
          // reached the last item, scroll back to the first item
          containerRefNew.current.scroll({
            left: 0,
            behavior: "smooth",
          });
        } else {
          // move to the next item
          containerRefNew.current.scroll({
            left: containerRefNew.current.scrollLeft + 500,
            behavior: "smooth",
          });
        }
      }
    }, 7000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div className="featuredProduct">
      {newData !== null && <h1 className="font-han font-[30px]">News Product</h1>}
      {<div className="itemsFeat w-full h-4/5 flex justify-center">
        <button className="click" onClick={handlePreviousNew}><FcPrevious /></button>
        <LazyLoad height={"100%"} width={"80%"} offset={0}>
          <div className="fpDetail w-full h-full flex" ref={containerRefNew}>
            {newData !== null && newData.map((items, index) => (
              <div className={`fpItems ${isDark ? 'bg-gray-200' : 'bg-white'}`} key={`${items.idProduct}-new`} style={{ animationDelay: "." + index + "s" }}>
                <div className="fpImg h-[35%] lg:h-[40%]">
                  <img src={items.imgProduct} alt="img New Product" loading="lazy" className="w-3/4 h-full object-contain" />
                </div>
                <div className='fpTitle font-BOO text-slate-700'>
                  {items.nameProduct.length > 20
                    ? items.nameProduct.slice(0, 20) + `...`
                    : items.nameProduct}
                </div>
                <ViewBrandAndType props={{brand:items.brand,type:items.nameType,height:'[15%]',navigate}}/>
                <div className='fpPrice h-[15%] lg:h-[10%] flex items-center justify-center text-slate-700 font-bold my-1'>{items.price} USD</div>
                <div className="fpButton">
                  <ButtonIconAddCart props={{ addToCart, items, width: 'w-3/4 lg:w-2/4' }} />
                  <ButtonViewDetail props={{
                    url: `/detail/${items.idType}/${items.nameType}/${items.idProduct}/${items.nameProduct}`,
                    width: 'w-3/4 lg:w-[30%]'
                  }} />

                </div>
              </div>
            ))}
          </div>
        </LazyLoad>
        <button className="click" onClick={handleNextNew}><FcNext /></button>
      </div>}
    </div>
  );
};
export default NewsProduct;
