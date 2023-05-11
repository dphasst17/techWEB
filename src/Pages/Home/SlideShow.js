import React, { useContext, useEffect, useRef, useState } from "react";
import { ApiContext } from "~/ContextApi/ContextApi";
import { CartContext } from "~/Contexts/Cart";
import "~/components/GlobalStyles/GlobalStyles.scss";
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
              <img src={items.url} alt="" />
            </div>
            <div className="content">
              <div className="items">
                <CartContext.Consumer>
                  {({ addToCart }) => (
                    <button
                      onClick={() => {
                        addToCart(items);
                      }}
                    >
                      <svg className="icon" viewBox="-20 40 70 30">
                        <path
                          d="M 40.63 40 L 50 50 V50 70 H-10 M -9.64 70 L -20 60 V40 H 41"
                          strokeWidth="1"
                          stroke="#000"
                          fill="transparent"
                        ></path>
                        <text
                          x="-15"
                          y="59"
                          stroke="#000"
                          strokeWidth="0"
                          fill="#000"
                        >
                          Add to cart
                        </text>
                      </svg>
                    </button>
                  )}
                </CartContext.Consumer>
                <button
                  onClick={() => {
                    window.location.pathname =
                      "/detail/" + items.id + "/" + items.title;
                  }}
                >
                  <svg className="icon" viewBox="-20 40 70 30">
                    <path
                      d="M 40.63 40 L 50 50 V50 70 H-10 M -9.64 70 L -20 60 V40 H 41"
                      strokeWidth="1"
                      stroke="#000"
                      fill="transparent"
                    ></path>
                    <text
                      x="0"
                      y="59"
                      stroke="#000"
                      strokeWidth="0"
                      fill="#000"
                    >
                      Detail
                    </text>
                  </svg>
                </button>
              </div>
              <div className="items">
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
                  {items.detail.map((child) => (
                    <div className="infDetail" key={items.id}>
                      <p>Cpu: {child.cpu.type}</p>
                      <p>
                        Display: {child.size__inch} inch -{" "}
                        {child.refresh_rate__hz}hz
                      </p>
                      <p>Ram: {child.memory.ram__gb}GB</p>
                      <p>
                        Hard drive: {child.storage.type}-
                        {child.storage.capacity__gb}GB
                      </p>
                      <p>Os: {child.software.os}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="slideshowDots">
        {data.map((_, idx) => (
          <div
            key={idx + "_slide"}
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
