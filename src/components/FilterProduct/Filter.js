import classNames from "classnames/bind";
import style from "./Filter.module.scss";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

const cx = classNames.bind(style);

function Filter({props}) {
    return <>
        <div className={cx("fill")} onClick={() => {props.setIsShowFil("4%")}}>Filter your result <HiChevronDoubleRight /></div>
      <div className={cx("filter")} style={{transform:"translateX(" + props.isShowFil + ")"}}>
        <div className={cx("closeFil")}>
            <p onClick={() => {props.setValueBrand([]); props.setValueType([])}}>Reset All</p>
            <HiChevronDoubleLeft onClick={() => {props.setIsShowFil("-200%")}}/>
        </div>
        <div className={cx("box_filter")}>
          <p onClick={() => {props.setIsShow(!props.isShow);props.setIsShowS(false)}} style={{backgroundColor: (props.isShow === true ) ? "#2735af" : "#b2b1b1"}}>About Brand</p>
          <p onClick={() => {props.setIsShowS(!props.isShowS);props.setIsShow(false)}}style={{backgroundColor: (props.isShowS === true ) ? "#2735af" : "#b2b1b1"}}>About Type</p>
          {props.isShow && props.filterBrand.map((check) => (
            <div className={cx("box_filter_detail")} key={check}>
              <div className={cx("detail")}>
                <input
                  type="checkbox"
                  name="keyword"
                  onClick={() => {
                    if (props.valueBrand.includes(check)) {
                      props.setValueBrand(
                        props.valueBrand.filter((items) => items !== check)
                      );
                    } else {
                      props.setValueBrand([...props.valueBrand, check]);
                    }
                  }}
                  onChange={() => {}}
                  checked={props.valueBrand.includes(check) ? true : false}
                  id={cx("keyword-brand-") + `${check}`}
                />
                <label htmlFor={cx("keyword-brand-") + `${check}`}>
                  {check.toUpperCase()}
                </label>
              </div>
            </div>
          ))}
         
          
          {props.isShowS && props.filterType.map((price) => (
            <div className={cx("box_filter_detail")} key={price}>
              <div htmlFor="keyword" className={cx("detail")}>
                <input
                  type="checkbox"
                  name="keyword"
                  onClick={() => {
                    if (props.valueType.includes(price)) {
                        props.setValueType(
                            props.valueType.filter((items) => items !== price)
                      );
                    } else {
                        props.setValueType([...props.valueType, price]);
                    }
                  }}
                  onChange={() => {}}
                  checked={props.valueType.includes(price) ? true : false}
                  id={cx("keyword-price-") + `${price}`}
                ></input>
                <label htmlFor={cx("keyword-price-") + `${price}`}>
                  {price}
                </label>
              </div>
            </div>
          ))}

            {(props.filterType.length > 1 || props.filterBrand.length > 1) && (
                    <div className={cx("price")}>
                        <p>About Price</p>
                        {props.valuePice.map((items) => (
                        <div key={items}>
                            <input
                            type="radio"
                            name="check"
                            id={items.inputID}
                            value={items.inputValue}
                            onClick={() => {
                                props.setPrice(items.inputValue);
                            }}
                            onChange={() => { }}
                            checked={props.price.includes(items.inputValue) ? true : false}
                            />
                            <label htmlFor={items.inputID}>{items.content}</label>
                        </div>
                        ))}
                    </div>
                    )}
        </div>
      </div>
    </>;
}

export default Filter;