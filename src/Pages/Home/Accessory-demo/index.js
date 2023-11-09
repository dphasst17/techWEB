import React, { useContext, useState } from "react";
import "../Home.scss";
import { CartContext } from "~/contexts/Cart";
import { ApiContext } from "~/contexts/apiContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazy-load";
import { AnimateScroll } from "~/helper/animateScroll";

const AccDemo = () => {
  /* const { Access } = useContext(ApiContext);
  const [inView, setInView] = useState(false);
  const refs = Access.map(() => React.createRef());

  AnimateScroll(refs,setInView)
  return (
    <>
      {Access.length !== 0 ? (
        <h1 className="font-han font-[30px]">OUR ACCESSORY</h1>
      ) : (
        <></>
      )}
      <div className="h-access w-full h-auto flex flex-row flex-wrap items-center justify-evenly">
        {Access.slice(0, 12).map((dataAcc,i) => (
          <div
            className="accDemo w-[21%] h-auto min-w-[160px] rounded-[10px] scale-100 pb-[2%]"
            key={dataAcc.id}
          >
            <LazyLoad
                height={"auto"}
                offset={50}
                className="flex justify-center"
              >
                <div ref={refs[i]} className={`accDemo_Child w-full max-w-[300px] ${inView ? 'flex' : 'hidden'} flex-col rounded-[16px] px-[2%] cursor-pointer`}>
                  <div style={{backgroundSize: "100% 100%"}} className="item_top :w-full h-[16px] bg-no-repeat bg-[url(https://dlcdnwebimgs.asus.com/files/media/E30EF754-96D6-4A74-82E0-14AACEEABC94/v1/images/large/1x/grid/top.webp)]"></div>
                  <div
                    style={{
                      backgroundRepeat: "repeat-y",
                      backgroundSize: "100% 100%",
                    }}
                    className="item_body w-[100%] h-[280px] flex flex-col pl-0 bg-[url(https://dlcdnwebimgs.asus.com/files/media/E30EF754-96D6-4A74-82E0-14AACEEABC94/v1/images/large/1x/grid/body.webp)]"
                  >
                    <div className="image w-full h-[50%] flex justify-center">
                      <img
                        src={dataAcc.url}
                        className="w-[75%] h-[100%] object-contain"
                        alt="img Access demo"
                        loading="lazy"
                      />
                    </div>
                    <div className="title w-full h-[10%] px-4">
                      <p className="w-full h-[50px] font-BOO text-[20px] text-white text-center font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
                        {dataAcc.title}
                      </p>
                    </div>
                    <div className="accessInf w-full h-[30%] flex items-center justify-around">
                      <div
                        onClick={() => {
                          window.location.pathname = `search/${dataAcc.brand}`
                        }}
                        className="w-2/5 h-[30px] flex items-center justify-center rounded-[5px] bg-gray-700 font-han text-[20px] text-gray-300 font-semibold overflow-hidden whitespace-nowrap text-ellipsis"
                      >
                        {dataAcc.brand}
                      </div>
                      <div
                        onClick={() => {
                          window.location.pathname = `search/${dataAcc.type}`
                        }}
                        className="w-2/5 h-[30px] flex items-center justify-center rounded-[5px] bg-gray-700 font-han text-[20px] text-gray-300 font-semibold overflow-hidden whitespace-nowrap text-ellipsis"
                      >
                        {dataAcc.type.toUpperCase()}
                      </div>
                    </div>
                    <div className="items-child w-full h-[21%] flex lg:flex-row flex-col justify-between">
                      <div className="price w-full lg:w-2/4 h-[40px] text-[17px] font-semibold ml-[3%] text-gray-300 font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
                        Price:<span className="font-han text-[25px] text-zinc-200">{dataAcc.price}</span> USD
                      </div>
                      <div className="button w-full lg:w-2/5 flex flex-row justify-between">
                        <CartContext.Consumer>
                          {({ addToCart }) => (
                            <button
                              className="w-3/4 lg:w-4/6 h-[30px] border-none rounded-[5px] bg-[url(https://dlcdnwebimgs.asus.com/files/media/0EE47A6A-E964-48A7-9332-8C5FD982A196/v1/images/large/1x/09__bgFrame.webp)] bg-cover cursor-pointer hover:bg-blue-600 transition-all"
                              onClick={() => addToCart(dataAcc)}
                            >
                              <FontAwesomeIcon
                                className="text-white"
                                icon={faCartShopping}
                              />
                            </button>
                          )}
                        </CartContext.Consumer>
                        <button
                          className="w-1/5 lg:w-1/4 h-[30px] flex justify-center items-center mr-[5%] border-none rounded-[10px] cursor-pointer bg-blue-800 hover:bg-blue-600 transition-all"
                          onClick={() => {
                            window.location.pathname =
                              "/detail/" + dataAcc.nameProduct + "/" + dataAcc.nameProduct;
                          }}
                        >
                          <Link to={`/detail/${dataAcc.idProduct}/${dataAcc.nameProduct}`}>
                            <FaEye className="text-white m-auto" />
                          </Link>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div style={{backgroundSize: "100% 100%"}} className="item_bottom w-[100%] h-[16px] bg-no-repeat bg-[url(https://dlcdnwebimgs.asus.com/files/media/E30EF754-96D6-4A74-82E0-14AACEEABC94/v1/images/large/1x/grid/bottom.webp)]"></div>
                </div>
              </LazyLoad>
          </div>
        ))}
      </div>
    </>
  ); */
};

export default AccDemo;
