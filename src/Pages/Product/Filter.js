import "~/tailwind.css";
import "./Product.scss";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useState } from "react";

function Filter({ props }) {
  const [isShow, setIsShow] = useState(true);
  const [isShowFil, setIsShowFil] = useState("-200%");
  return (
    <>
      <div
        className="fill w-1/5 h-[30px] text-[20px] text-center font-[550] cursor-pointer flex justify-center items-center"
        onClick={() => {
          setIsShowFil("4%");
        }}
      >
        Filter your result <HiChevronDoubleRight />
      </div>
      <div
        className="filter w-11/12 lg:w-4/12 sm:w-5/12 ssm:w-6/12 h-screen top-0 fixed z-50 flex flex-col justify-start pt-[1%] bg-transparent rounded-[16px]"
        style={{ transform: "translateX(" + isShowFil + ")" }}
      >
        <div className="closeFil w-full h-[10%] flex justify-between items-center">
          <p
            onClick={() => {
              props.setNewValue([]);
              props.setNewPrice([]);
            }}
            className="w-2/5 text-white text-[20px] text-center rounded-[10px] bg-[#b2b1b1] font-[550] cursor-pointer ml-[2%]"
          >
            Reset All
          </p>
          <HiChevronDoubleLeft
            onClick={() => {
              setIsShowFil("-200%");
            }}
          />
        </div>
        <div className="box_filter w-full h-auto rounded-[16px] bg-transparent pb-[5%]">
          <p
            onClick={() => {
              setIsShow(!isShow);
            }}
            style={{ backgroundColor: isShow === true ? "#2735af" : "#b2b1b1" }}
            className="w-2/5 text-white text-[20px] text-center rounded-[10px] bg-[#b2b1b1] font-[550] cursor-pointer ml-[2%] mb-[4%]"
          >
            About Brand
          </p>
          <div className="brand w-full flex flex-wrap">
            {isShow &&
              props.filterBrand.map((check) => (
                <div className="box_filter_detail w-[35%]" key={check}>
                  <div className="detail">
                    <input
                      type="checkbox"
                      name="keyword"
                      onClick={() => {
                        if (props.newValue.includes(check)) {
                          props.setNewValue(
                            props.newValue.filter((items) => items !== check)
                          );
                        } else {
                          props.setNewValue([...props.newValue, check]);
                        }
                      }}
                      onChange={() => {}}
                      checked={props.newValue.includes(check) ? true : false}
                      id={`keyword-brand-${check}`}
                    />
                    <label htmlFor={`keyword-brand-${check}`}>{check}</label>
                  </div>
                </div>
              ))}
          </div>
          <p className="w-2/5 text-white text-[20px] text-center rounded-[10px] bg-[#b2b1b1] font-[550] cursor-pointer ml-[2%] mb-[4%]">About Price</p>

          {props.valuePice.map((items) => (
            <div className="box_filter_detail" key={items.inputID}>
              <input
                type="radio"
                name="check"
                id={items.inputID}
                value={items.inputValue}
                onClick={() => {
                  props.setNewPrice(items.inputValue);
                }}
                onChange={() => {}}
                checked={
                  props.newPrice.includes(items.inputValue) ? true : false
                }
              />
              <label htmlFor={items.inputID}>{items.content}</label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Filter;
