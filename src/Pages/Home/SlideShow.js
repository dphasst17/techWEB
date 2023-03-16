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

  function resetTimeout() {
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
      <div
        className="slideshowSlider"
        style={{transform: `translate3d(${-index * 100}%, 0, 0)`}}
      >
        {data.map((items, s) => (
          <div className={`slide${index === s ? " active" : ""}`} key={s}>
            <div className="image">
              <img src={items.url} alt="" />
            </div>
            <div className="content">
              <div className="items">          
                <CartContext.Consumer>
                  {({addToCart}) => <button onClick={() => {addToCart(items)}}>
                    <svg className="icon" viewBox="-20 40 70 30">
                      <path
                        d="M 40.63 40 L 50 50 V50 70 H-10 M -9.64 70 L -20 60 V40 H 41"
                        strokeWidth="1"
                        stroke="#000"
                        fill="transparent"
                      ></path>
                      <text x="-15" y="59" stroke="#000" strokeWidth="0" fill="#000">
                        Add to cart
                      </text>
                    </svg>
                  </button>}
                </CartContext.Consumer>
                <button onClick={() => {window.location.pathname = "/detail/" + items.id + "/" + items.title}}>
                  <svg className="icon" viewBox="-20 40 70 30">
                    <path
                      d="M 40.63 40 L 50 50 V50 70 H-10 M -9.64 70 L -20 60 V40 H 41"
                      strokeWidth="1"
                      stroke="#000"
                      fill="transparent"
                    ></path>
                    <text x="0" y="59" stroke="#000" strokeWidth="0" fill="#000">
                      Detail
                    </text>
                  </svg>
                </button>
              </div>
              <div className="items">
                <div className="title" data-text={items.title}>{items.title}</div>
                <div className="inf">
                  {items.detail.map((items,index) => 
                  <div className="infDetail" key={index}>
                    <p>Cpu: {items.cpu.map((detail) => detail.type)}</p>
                    <p>Display: {items.display.map((detail) => (detail.size__inch))} inch - {items.display.map((detail) => (detail.refresh_rate__hz))}hz</p>
                    <p>Ram: {items.memory.map((detail) => (detail.ram__gb))}GB</p>
                    <p>Hard drive: {items.storage.map((detail) =>(detail.type))}-{items.storage.map((detail) =>(detail.capacity__gb))}GB</p>
                    <p>Os: {items.software.map((detail) => (detail.os))}</p>
                  </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="slideshowDots">
        {data.map((_, idx) => (
          <div
            key={idx}
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
