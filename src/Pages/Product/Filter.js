import classNames from "classnames/bind";
import style from "./Product.module.scss";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useState } from "react";

const cx = classNames.bind(style);
function Filter({props}) {
    const [isShow, setIsShow] = useState(true);
    const [isShowFil,setIsShowFil] = useState("-200%");
    return <>
        <div className={cx("fill")} onClick={() => {setIsShowFil("4%")}}>Filter your result <HiChevronDoubleRight /></div>
      <div className={cx("filter")} style={{transform:"translateX(" + isShowFil + ")"}}>
        <div className={cx("closeFil")}>
          <p onClick={() => {props.setNewValue([]); props.setNewPrice([])}}>Reset All</p>
          <HiChevronDoubleLeft onClick={() => {setIsShowFil("-200%")}}/>
        </div>
        <div className={cx("box_filter")}>
          <p onClick={() => {setIsShow(!isShow)}} style={{backgroundColor: (isShow === true ) ? "#2735af" : "#b2b1b1"}}>About Brand</p>
          {isShow && props.filterBrand.map((check) => (
            <div className={cx("box_filter_detail")} key={check}>
              <div className={cx("detail")}>
                <input
                  type="checkbox"
                  name="keyword"
                  onClick={() => {
                    if (props.newValue.includes(check)) {
                      props.setNewValue(props.newValue.filter((items) => items !== check));
                    } else {
                      props.setNewValue([...props.newValue, check]);
                      
                    }
                  }}
                  onChange={() => {}}
                  checked={props.newValue.includes(check) ? true : false}
                  id={cx("keyword-brand-") + `${check}`}
                />
                <label htmlFor={cx("keyword-brand-") + `${check}`}>
                  {check}
                </label>
              </div>
            </div>
          ))}
          <p>About Price</p>
          
          {props.valuePice.map((items) => (
                <div className={cx("box_filter_detail")} key={items.inputID}>
                  <input
                    type="radio"
                    name="check"
                    id={items.inputID}
                    value={items.inputValue}
                    onClick={() => {
                      props.setNewPrice(items.inputValue);
                    }}
                    onChange={() => {}}
                    checked={props.newPrice.includes(items.inputValue) ? true : false}
                  />
                  <label htmlFor={items.inputID}>{items.content}</label>
                </div>
          ))}
        </div>
      </div>
    </>;
}

export default Filter;