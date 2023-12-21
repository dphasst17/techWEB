import "~/tailwind.css";
import "../Home.scss";
import { CartContext } from "~/contexts/Cart";

import { Link, useNavigate } from "react-router-dom";
import React, {useEffect,useRef } from "react";
import LazyLoad from "react-lazy-load";
import { FcNext, FcPrevious } from "react-icons/fc";
import { FaEye, FaHeart } from "react-icons/fa";
import { useGetData} from "~/hooks/useFetchData";



const NewsProduct = () => {
  const navigate = useNavigate();
  const {data,err} = useGetData('product','getProductNew');
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
      {data !== null &&  <h1 className="font-han font-[30px]">News Product</h1>}
      { <div className="itemsFeat w-full h-4/5 flex justify-center">
        <button className="click" onClick={handlePreviousNew}><FcPrevious /></button>
        <LazyLoad height={"100%"} width={"80%"} offset={0}>
          <div className="fpDetail w-full h-full flex" ref={containerRefNew}>
            {data !== null && data.map((items, index) => (
              <div className="fpItems" key={`${items.idProduct}-new`} style={{ animationDelay: "." + index + "s" }}>
                <div className="fpImg">
                  <img src={items.imgProduct} alt="img New Product" loading="lazy" className="w-3/4 h-full object-contain" />
                </div>
                <div className="fpTitle font-BOO">
                  {items.nameProduct.length > 20
                    ? items.nameProduct.slice(0, 20) + `...`
                    : items.nameProduct}
                </div>
                <div className="fpPrice">Price:{items.price} USD</div>
                <div className="fpButton">
                  <button onClick={() => { navigate(`/detail/${items.idType}/${items.nameType}/${items.idProduct}/${items.nameProduct}`) }} 
                    className="button w-12 border-none rounded-xl outline-none bg-transparent flex justify-center items-center hover:bg-blue-700"
                  >
                    <Link to={`/detail/${items.idType}/${items.idProduct}/${items.nameProduct}`}>
                      <FaEye />
                    </Link>
                  </button>
                  <CartContext.Consumer>
                    {({ addToCart }) => (
                      <button onClick={() => addToCart(items,1)}
                        className="w-3/5 h-2/4 rounded-xl text-white text-base font-semibold bg-blue-800 hover:bg-blue-700"
                      >
                        ADD TO CART
                      </button>
                    )}
                  </CartContext.Consumer>
                  <button 
                    className="button w-12 border-none rounded-xl outline-none bg-transparent flex justify-center items-center hover:bg-blue-700"
                  >
                    <Link to={`/detail/${items.idProduct}/${items.nameProduct}`}>
                      <FaHeart />
                    </Link>
                  </button>
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
