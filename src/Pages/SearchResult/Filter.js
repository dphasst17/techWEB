import "~/tailwind.css";
import { useState } from "react";
import HandleFilterData  from "~/helper/filterData";
import { FcViewDetails,FcClearFilters,FcShop } from "react-icons/fc";
function Filter({ props }) {
  const [showFilBrand, setShowFilBrand] = useState(false);
  const handleChange = (event) => {
    props.setValueFil([]);
    setShowFilBrand(false);
    props.setFilPrice('0');
    props.setOptionType(event.target.value);
  };


  return (
    <div className="p-filter w-screen md:w-full h-auto flex flex-wrap justify-around md:justify-start pl-2 md:ml-[8%]">
        {props.filType !== null && props.filType.length > 1 && 
            <select
            className="w-[150px] m-2 h-[30px] bg-blue-500 outline-none rounded-[5px] text-center text-white font-semibold cursor-pointer"
            value={props.optionType}
            onChange={handleChange}
            >
                {props.filType.map(e => <option className="bg-slate-500 py-2" value={e}>
                    {e.toUpperCase()}
                </option>)}
            </select>
        }
        {props.filBrand !== null && props.filBrand.length > 1  && 
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
        }
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
            setShowFilBrand(false);
            props.setFilPrice('0');
            props.setValueFil([]);
          }}
        >
          <FcClearFilters className="mx-2"/>
          Clear All filter
        </div>
      </div>
  );
}

export default Filter;
