import React, { useContext, useEffect, useRef, useState } from "react";
/* import { CartContext } from "~/Contexts/Cart"; */
import "~/components/GlobalStyles/GlobalStyles.scss";
import "~/tailwind.css";
import { StateContext } from "~/contexts/stateContext";
function Slideshow() {
  const {laptop} = useContext(StateContext)
  const [index, setIndex] = useState(0);
  const [data,setData] = useState(null);
  useEffect(() => {
    laptop !== null && setData(laptop.filter(e => e.view > 24))
  },[laptop])
  const timeoutRef = useRef(null);
  const delay = 10000;

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => {
        // Thêm class 'inactive' vào phần tử hiện tại
        let currentElement = document.querySelector('.slide.active');
        if (currentElement) {
          currentElement.classList.add('inactive');
        }
  
        // Chờ 1 giây trước khi chuyển class 'active'
        setTimeout(() => {
          data !== null && setIndex((prevIndex) =>
            prevIndex === data.length - 1 ? 0 : prevIndex + 1
          );
  
          // Xóa class 'inactive' sau khi đã chuyển 'active'
          if (currentElement) {
            currentElement.classList.remove('inactive');
          }
        }, 1000);
      },
      delay
    );
  
    return () => {
      resetTimeout();
    };
  }, [index, data]);
useEffect(() => {
  resetTimeout();
  timeoutRef.current = setTimeout(
    () => {
      // Thêm class 'inactive' vào phần tử hiện tại
      let currentElement = document.querySelector('.slide.active');
      if (currentElement) {
        currentElement.classList.remove('active');
        currentElement.classList.add('inactive');
      }

      // Chờ 1 giây trước khi chuyển class 'active'
      setTimeout(() => {
        data !== null && setIndex((prevIndex) =>
          prevIndex === data.length - 1 ? 0 : prevIndex + 1
        );

        // Xóa class 'inactive' sau khi đã chuyển 'active'
        if (currentElement) {
          currentElement.classList.remove('inactive');
        }
      }, 1000);
    },
    delay
  );

  return () => {
    resetTimeout();
  };
}, [index, data]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {data !== null && data.map((items, s) => (
          <div
            className={`slide${index === s ? " active" : ""} inline-flex flex-col md:flex-row`}
            key={items.idProduct}
          >
            <div className="image w-full md:w-[35%] h-[30%] md:h-full">
              <div className="bgImage absolute flex justify-center items-center z-[-10] w-full min-w-[300px] h-[90%] min-h-[200px]">
                <img
                  className="w-[370px] h-[350px] hidden md:block"
                  src="https://dlcdnwebimgs.asus.com/files/media/66CA1B3A-32B3-44A6-9D99-9CEED66D168B/v1/images/large/1x/2-1__circle_gpu.webp"
                  alt="background-Img"
                />
              </div>
              <img
                src={items.imgProduct}
                alt=""
                className="imgProduct w-1/2 md:w-[300px] h-full md:h-[300px] object-contain flex justify-center items-center"
              />
            </div>
            <div className="content w-2/5 h-full flex items-center justify-center">
              <div className="border hidden md:block"></div>
              <div className="items w-full lg:w-3/5 h-full flex flex-col flex-wrap justify-center content-center">
                <div
                  className="title"
                >
                  {items.nameProduct}
                </div>
                <div className="inf">
                  <div className="infDetail">
                    <p className="bg-slate-500 skew-x-12 text-white text-center rounded-[5px] cursor-pointer scale-100 hover:scale-105 transition-all">Cpu: {items.detail.map(e => e.cpu)}</p>
                    <p className="bg-slate-500 skew-x-12 text-white text-center rounded-[5px] cursor-pointer scale-100 hover:scale-105 transition-all">
                      Display: {items.detail.map(e => e.sizeInch.toFixed())} inch -{" "}
                      {items.detail.map(e => e.resolution)}
                    </p>
                    <p className="bg-slate-500 skew-x-12 text-white text-center rounded-[5px] cursor-pointer scale-100 hover:scale-105 transition-all">Ram: {items.detail.map(e => e.capacity)}</p>
                    <p className="bg-slate-500 skew-x-12 text-white text-center rounded-[5px] cursor-pointer scale-100 hover:scale-105 transition-all">
                      Hard drive:
                      {items.detail.map(e => e.storage)}
                    </p>
                    <p className="bg-slate-500 skew-x-12 text-white text-center rounded-[5px] cursor-pointer scale-100 hover:scale-105 transition-all">Os: {items.detail.map(e => e.os)}</p>
                  </div>
                </div>
              </div>
              <div className="border2 hidden md:block"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="slideshowDots">
        {data !== null && data.map((_, idx) => (
          <div
            key={_.idProduct + _.nameProduct}
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
