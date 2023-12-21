import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimateScroll } from "~/helper/animateScroll";
import { useGetData } from "~/hooks/useFetchData";
import bgProduct from "~/images/bg-product-6.png";
const ProductView = () => {
  const navigate = useNavigate()
  const { data, err } = useGetData("product", "getProductByView");
  const [inView, setInView] = useState(false);
  const refs = data?.map(() => React.createRef());

  AnimateScroll(refs, setInView);
  return (
    <div className="h-soldProduct w-full h-auto xl:h-[500px] xl:min-h-[0px] flex flex-wrap flex-col xl:flex-row-reverse justify-center items-center my-10">
      <h1 className="w-full text-center font-han font-[30px]">MOST VIEW PRODUCT</h1>
      <div
        className="sold-first w-4/5 sm:w-3/4 xl:w-1/5 h-[200px] xl:h-4/5 flex flex-row xl:flex-col items-center justify-center items-center xl:py-4 mb-8 xl:mb-0"
      >
        {data !== null &&
          data.slice(0, 1).map((e,i) => (
            <div style={{
              backgroundImage: `url(${bgProduct})`,
              backgroundRepeat: "repeat-y",
              backgroundSize: "110% 110%",
              backgroundPosition: "center",
            }} ref={refs[i]} key={e.idProduct} className={`sold-detail w-full h-full ${inView ? 'flex':'hidden'} justify-center items-center`}>
              <div className="sold-detail-child w-4/5 h-4/5 flex xl:flex-col flex-row justify-center items-center">
                <div className="sold-detail-img w-2/5 xl:w-full h-full xl:h-2/4 flex justify-center items-center cursor-pointer"
                 onClick={() => {navigate(`/detail/${e.idType}/${e.nameType}/${e.idProduct}/${e.nameProduct}`)}}
                >
                  <img
                    className="w-3/4 h-full object-contain"
                    src={e.imgProduct}
                    alt="img-Product"
                  />
                </div>
                <div className="sold-detail-info w-3/5 xl:w-full h-full xl:h-2/4 flex flex-wrap justify-between">
                  <span className="w-full h-[40px] flex justify-center items-center bg-slate-500 rounded-[5px] text-white text-[15px] font-bold cursor-pointer"
                    onClick={() => {navigate(`/detail/${e.idType}/${e.idProduct}/${e.nameProduct}`)}}
                  >
                    {e.nameProduct}
                  </span>
                  <span className="w-[48%] h-[40px] flex justify-center items-center bg-slate-500 rounded-[5px] text-white text-[15px] font-semibold cursor-pointer">
                    {e.price} USD
                  </span>
                  <span onClick={() => {window.location.pathname = `search/${e.brand}`}}  className="w-[48%] h-[40px] flex justify-center items-center bg-slate-500 rounded-[5px] text-white text-[15px] font-semibold cursor-pointer">
                    {e.brand.toUpperCase()}
                  </span>
                  <span onClick={() => {window.location.pathname = `search/${e.nameType}`}} className="w-[48%] h-[40px] flex justify-center items-center bg-slate-500 rounded-[5px] text-white text-[15px] font-semibold cursor-pointer">
                    <span className="overflow-hidden whitespace-nowrap text-ellipsis">{e.nameType.toUpperCase()}</span>
                  </span>
                  <span className="w-[48%] h-[40px] flex justify-center items-center bg-slate-500 rounded-[5px] text-white text-[15px] font-semibold cursor-pointer">
                    View: {e.view}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="sold-second w-full xl:w-[75%] h-auto xl:h-4/5 flex flex-wrap justify-around items-center">
        {data !== null &&
          data.slice(1, 7).map((e,i) => (
            <div
              style={{
                backgroundImage: `url(${bgProduct})`,
                backgroundRepeat: "repeat-y",
                backgroundSize: "110% 110%",
                backgroundPosition: "center",
              }}
              ref={refs[i]}
              key={e.idProduct}
              className={`sold-detail w-[28%] min-w-[220px] h-[180px] ${inView ? 'flex':'hidden'} items-center justify-center mb-10 xl:mb-0`}
            >
              <div className="sold-detail-child w-4/5 h-4/5 flex flex">
                <div className="sold-detail-img w-2/5 h-full flex justify-center items-center cursor-pointer"
                 onClick={() => {navigate(`/detail/${e.idType}/${e.idProduct}/${e.nameProduct}`)}}
                >
                  <img
                    className="w-full h-full object-contain"
                    src={e.imgProduct}
                    alt="img-Product"
                  />
                </div>
                <div className="sold-detail-info w-3/5 h-full flex flex-wrap justify-between">
                  <span className="w-full h-[40px] flex justify-center items-center bg-slate-500 rounded-[5px] text-white text-[15px] font-bold cursor-pointer"
                   onClick={() => {navigate(`/detail/${e.idType}/${e.idProduct}/${e.nameProduct}`)}}
                  >
                    <span className="overflow-hidden whitespace-nowrap text-ellipsis">{e.nameProduct}</span>
                  </span>
                  <span className="w-[48%] h-[40px] flex justify-center items-center bg-slate-500 rounded-[5px] text-white text-center text-[15px] font-semibold cursor-pointer">
                    {e.price} USD
                  </span>
                  <span onClick={() => {window.location.pathname = `search/${e.brand}`}} className="w-[48%] h-[40px] flex justify-center items-center bg-slate-500 rounded-[5px] text-white text-center text-[15px] font-semibold cursor-pointer">
                    {e.brand.toUpperCase()}
                  </span>
                  <span onClick={() => {window.location.pathname = `search/${e.nameType}`}} className="w-[48%] h-[40px] flex justify-center items-center bg-slate-500 rounded-[5px] text-white text-center text-[15px] font-semibold cursor-pointer">
                    <span className="overflow-hidden whitespace-nowrap text-ellipsis">{e.nameType.toUpperCase()}</span>
                  </span>
                  <span className="w-[48%] h-[40px] flex justify-center items-center bg-slate-500 rounded-[5px] text-white text-center text-[15px] font-semibold cursor-pointer">
                  View: {e.view}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default ProductView;
