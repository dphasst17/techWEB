import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ViewMultiButton } from "~/components/Product/viewMultiBtn";
import { StateContext } from "~/contexts/stateContext";
import { AnimateScroll } from "~/helper/animateScroll";
const Selling = () => {
  const {selling,isDark} = useContext(StateContext)
  const navigate = useNavigate()
  const [inView, setInView] = useState(false);
  const refs = selling?.map(() => React.createRef());

  AnimateScroll(refs,setInView)
  return (
    <div className="h-soldProduct w-full h-auto xl:h-[500px] xl:min-h-[0px] flex flex-wrap flex-col xl:flex-row justify-center items-center my-10">
      <h1 className="w-full text-center font-han font-[30px]">MOST SOLD</h1>
      <div
        className="sold-first w-4/5 sm:w-3/4 xl:w-1/5 h-[200px] xl:h-4/5 flex flex-row xl:flex-col items-center justify-center xl:py-4 mb-8 xl:mb-0"
      >
        {selling !== null &&
          selling.slice(0, 1).map((e,i) => (
            <div ref={refs[i]} key={e.idProduct} className={`sold-detail w-full h-full border border-solid ${isDark ? 'border-slate-200': 'border-slate-500'} rounded-md
            ${inView ? 'flex':'hidden'} justify-center items-center`}>
              <div className="sold-detail-child w-4/5 h-4/5 flex xl:flex-col flex-row justify-center items-center">
                <div className="sold-detail-img w-2/5 xl:w-full h-full xl:h-2/4 flex justify-center items-center"
                  onClick={() => {navigate(`/detail/${e.idType}/${e.nameType}/${e.nameType}/${e.idProduct}/${e.nameProduct}`)}}
                >
                  <img
                    className="w-3/4 h-full object-contain"
                    src={e.imgProduct}
                    alt="img-Product"
                  />
                </div>
                <div className="sold-detail-info w-3/5 xl:w-full h-full xl:h-2/4 flex flex-wrap justify-between cursor-pointer" 
                >
                  <span
                  onClick={() => {navigate(`/detail/${e.idType}/${e.nameType}/${e.idProduct}/${e.nameProduct}`)}} 
                  className="w-full h-[40px] flex justify-center items-center bg-slate-500 rounded-[5px] text-white text-[15px] font-bold">
                    {e.nameProduct}
                  </span>
                  <ViewMultiButton props={{class:'justify-around lg:justify-between',arr:
                  [
                    {content:`${e.brand.toUpperCase()}`,isClick:true,handleName:() => {navigate(`/search/${e.brand}`)}},
                    {content:`${e.nameType.toUpperCase()}`,isClick:true,handleName:() => {navigate(`/search/${e.nameType}`)}},
                    {content:`${e.price} USD`,isClick:false,handleName:''},
                    {content:`Sold: ${e.sold}`,isClick:false,handleName:''}
                  ]}}/>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="sold-second w-full xl:w-[75%] h-auto xl:h-4/5 flex flex-wrap justify-around items-center">
        {selling !== null &&
          selling.slice(1, 7).map((e,i) => (
            <div
              ref={refs[i]}
              key={e.idProduct}
              className={`sold-detail w-4/5 ssm:w-[22%] smd:w-[28%] min-w-[200px] h-[180px] border border-solid ${isDark ? 'border-slate-200': 'border-slate-500'} rounded-md
              ${inView ? 'flex':'hidden'} items-center justify-center mb-10 xl:mb-0`}
            >
              <div className="sold-detail-child w-4/5 h-4/5 flex">
                <div className="sold-detail-img w-2/5 h-full flex justify-center items-center"
                  onClick={() => {navigate(`/detail/${e.idType}/${e.nameType}/${e.idProduct}/${e.nameProduct}`)}}
                >
                  <img
                    className="w-full h-full object-contain"
                    src={e.imgProduct}
                    alt="img-Product"
                  />
                </div>
                <div className="sold-detail-info w-3/5 h-full flex flex-wrap justify-between cursor-pointer"
                  onClick={() => {navigate(`/detail/${e.idType}/${e.nameType}/${e.idProduct}/${e.nameProduct}`)}}
                >
                  <span className="w-full h-[40px] flex justify-center items-center bg-slate-500 rounded-[5px] text-white text-[15px] font-bold">
                    <span className="overflow-hidden whitespace-nowrap text-ellipsis">{e.nameProduct}</span>
                  </span>
                  <ViewMultiButton props={{class:'justify-around lg:justify-between',arr:
                  [
                    {content:`${e.brand.toUpperCase()}`,isClick:true,handleName:() => {navigate(`/search/${e.brand}`)}},
                    {content:`${e.nameType.toUpperCase()}`,isClick:true,handleName:() => {navigate(`/search/${e.nameType}`)}},
                    {content:`${e.price} USD`,isClick:false,handleName:''},
                    {content:`Sold: ${e.sold}`,isClick:false,handleName:''}
                  ]}}/>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Selling;
