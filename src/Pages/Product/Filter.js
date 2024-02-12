import "~/tailwind.css";
import "./Product.scss";
import { useState } from "react";
import HandleFilterData  from "~/helper/filterData";
import backIcon1 from "~/images/icon/backIcon3.png";
import { FcViewDetails,FcClearFilters,FcShop } from "react-icons/fc";
function Filter({ props }) {
  const [showFilBrand, setShowFilBrand] = useState(false);
  const [filDetail, setFilDetail] = useState(false);
  const [showFilValue, setShowFilValue] = useState(false);
  const [valueFilDetail, setValueFillDetail] = useState(null);


  const handleChange = (event) => {
    props.setValueFil([]);
    setShowFilValue(false);
    setShowFilBrand(false);
    props.setFilPrice('0');
    props.setOptionType(event.target.value);
  };


  return (
    <div className="p-filter w-screen md:w-full h-auto flex flex-wrap justify-around md:justify-start pl-2 md:ml-[8%]">
        <select
          className="w-[150px] m-2 h-[30px] bg-blue-500 outline-none rounded-[5px] text-center text-white font-semibold cursor-pointer"
          value={props.optionType}
          onChange={handleChange}
        >
          {props.type?.map(t => <option className="bg-slate-500 py-2" value={t.type}>
            {t.type.toUpperCase()}
          </option>)}
        </select>
        <div className="filBrand w-[150px] h-[30px] flex flex-col justify-start items-start m-2 cursor-pointer">
          <div
            onClick={() => {
              setShowFilBrand(!showFilBrand);
            }}
            className="filDetail w-[150px] h-[30px] rounded-[5px] bg-blue-500 text-white font-semibold flex justify-center items-center"
          >
            <FcShop className="mx-2"/>
            Brand
          </div>
          {showFilBrand === true && (
            <div className="w-[150px] h-auto absolute flex flex-col justify-center items-start mt-[32px] bg-slate-500 rounded-[5px]">
              {props.filBrand.map((e) => (
                <div className="filBrandDetail w-full h-auto  text-white text-[15px] font-medium" key={e}>
                  <input
                    type="checkbox"
                    id={e}
                    defaultChecked={
                      props.valueFil
                        .filter((v) => v.key.includes('brand'))[0]
                        ?.values.includes(e)
                        ? true
                        : false
                    }
                    onClick={() => HandleFilterData('brand', e.toLowerCase(),props.valueFil,props.setValueFil)}
                  />
                  <label htmlFor={e} className="cursor-pointer">
                    {e.toUpperCase()}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="filDetail w-[150px] h-[30px] flex flex-col justify-start items-start m-2 cursor-pointer">
          <div
            onClick={() => {
              setFilDetail(!filDetail);
            }}
            className="filDetail w-[150px] h-[30px] rounded-[5px] bg-blue-500 text-white font-semibold flex justify-center items-center"
          >
            <FcViewDetails className="mx-2"/>
            Detail
          </div>
          {filDetail === true && (
            <div className="filDetail absolute flex flex-col justify-center items-start mt-[32px] bg-slate-500 rounded-[5px]">
              <div
                className={`w-auto min-w-[150px] h-auto max-h-[500px] flex flex-col ${
                  showFilValue === true
                    ? " overflow-scroll justify-start items-center"
                    : "justify-center items-start"
                } 
            bg-slate-500 rounded-[5px]`}
              >
                {showFilValue === false ? (
                  Object.keys(props.filDetailValue).flatMap((e) => (
                    <div
                      key={e}
                      onClick={() => {
                        setValueFillDetail(e);
                        setShowFilValue(true);
                      }}
                      className="w-[150px] h-auto max-h-[500px] flex flex-col justify-center items-start bg-slate-500 rounded-[5px] text-[16px] text-white pl-2 overflow-hidden whitespace-nowrap text-ellipsis"
                    >
                      <span className="w-[98%] overflow-hidden whitespace-nowrap text-ellipsis">
                        {e}
                      </span>
                    </div>
                  ))
                ) : (
                  <>
                    <div
                      onClick={() => {
                        setShowFilValue(false);
                      }}
                      className="back w-4/5 h-[30px] rounded-[5px] my-2 bg-white flex justify-center items-center active:scale-75 transition-all"
                    >
                      <img
                        className="w-1/5 h-4/5 object-contain"
                        src={backIcon1}
                        alt="back-icon"
                      />
                      <span className="text-[20px] font-semibold">BACK</span>
                    </div>
                    {valueFilDetail !== null &&
                      props.filDetailValue[valueFilDetail]?.map((e) => (
                        <div className="w-full h-[20px] bg-slate-500 rounded-[5px] text-white cursor-pointer" key={e}>
                          <input
                            type="checkbox"
                            id={e}
                            defaultChecked={
                              props.valueFil
                                .filter((v) =>
                                  valueFilDetail.includes(v.key)
                                )[0]
                                ?.values.includes(e)
                                ? true
                                : false
                            }
                            onClick={() => HandleFilterData(valueFilDetail, e,props.valueFil,props.setValueFil)}
                          />
                          <label htmlFor={e} className="cursor-pointer">
                            {e}
                          </label>
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        
        <select 
          className="w-[150px] m-2 h-[30px] bg-blue-500 outline-none rounded-[5px] text-center text-white font-semibold cursor-pointer"
          onChange={(e) => {props.setFilPrice(e.target.value)}}
          value={props.filPrice}
        >
          <option className="bg-slate-500 py-2" value="0">Sort by price</option>
          <option className="bg-slate-500 py-2" value="1">Low to hight</option>
          <option className="bg-slate-500 py-2" value="2">Hight to low</option>
        </select>
        <div
          className="filClear w-[150px] h-[30px] my-2 rounded-[5px] bg-blue-500 text-white font-semibold flex justify-center items-center cursor-pointer"
          onClick={() => {
            setShowFilValue(false);
            setFilDetail(false);
            setShowFilBrand(false);
            props.setFilPrice('0');
            props.setValueFil([]);
          }}
        >
          < FcClearFilters className="mx-2"/>
          Clear All
        </div>
      </div>
  );
}

export default Filter;
