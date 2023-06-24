import React, { useContext, useEffect, useRef, useState } from "react";
import { ApiContext } from "~/ContextApi/ContextApi";
import { CartContext } from "~/Contexts/Cart";
import "~/components/GlobalStyles/GlobalStyles.scss";
import "~/tailwind.css";
function Slideshow() {
  const { DataProduct } = useContext(ApiContext);
  const data = DataProduct.filter(
    (items) =>
      items.id === "3" ||
      items.id === "5" ||
      items.id === "10" ||
      items.id === "20"
  );
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const delay = 10000;

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === data.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index, data.length]);

  return (
    <div className="slideshow">
      {DataProduct && <div className="sliceBG">
        <img
          src="https://i.pinimg.com/originals/e1/6d/42/e16d4219e671bac00d1c23131e6d723f.jpg"
          loading="lazy"
          alt="img Background Slide show"
          
        />
      </div>}
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {data.map((items, s) => (
          <div className={`slide${index === s ? " active" : ""}`} key={items.id}>
            <div className="image">
              <img src={items.url} alt="" className="w-full h-3/4 object-contain" />
            </div>
            <div className="content w-3/5 h-full flex">
              <div className="items w-full lg:w-2/5 h-full flex flex-col flex-wrap justify-center content-center">
                <CartContext.Consumer>
                  {({ addToCart }) => (
                    <button
                      onClick={() => {
                        addToCart(items);
                      }}
                      className="w-3/5 lg:w-2/4 rounded-lg bg-blue-900 text-white text-3xl font-bold hover:bg-blue-700 transition "
                    >
                      ADD TO CART
                      
                    </button>
                  )}
                </CartContext.Consumer>
                <button
                  onClick={() => {
                    window.location.pathname =
                      "/detail/" + items.id + "/" + items.title;
                  }}
                  className="w-3/5 lg:w-2/4 rounded-lg bg-blue-900 text-white text-3xl font-bold hover:bg-blue-700 transition "
                >
                  DETAIL
                </button>
              </div>
              <div className="items w-full lg:w-3/5 h-full flex flex-col flex-wrap justify-center content-center">
                <div
                  className="title"
                  style={{
                    animation:
                      "typing 4s alternate steps(" +
                      items.title.length +
                      ") infinite",
                  }}
                >
                  {items.title}
                </div>
                <div className="inf">
                  
                    <div className="infDetail">
                      <p>Cpu: {items.detail.cpu.type}</p>
                      <p>
                        Display: {items.detail.size__inch} inch -{" "}
                        {items.detail.refresh_rate__hz}hz
                      </p>
                      <p>Ram: {items.detail.memory.ram__gb}GB</p>
                      <p>
                        Hard drive: {items.detail.storage.type}-
                        {items.detail.storage.capacity__gb}GB
                      </p>
                      <p>Os: {items.detail.software.os}</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="slideshowDots">
        {data.map((_, idx) => (
          <div
            key={_.id + 1}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Slideshow;
