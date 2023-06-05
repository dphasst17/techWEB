import classNames from "classnames/bind";
import style from "./Pagination.module.scss";
const cx = classNames.bind(style);
function Pagination({props}) {
    return <div className={cx("buttonPG")}>
    {/* tạo button prev: set lại giá trị slice*/}
    <button onClick={() => props.HandlePagination((props.activePage))} disabled={props.activePage === 0}>prev</button>
    <div className={cx("buttonCT")}>
      {props.numPage.map((items, index) => (
        <div
          className={cx(
            `pagination${index === props.activePage ? "Active" : ""}`
          )}
          key={items}
        >
          <button onClick={() => props.HandlePagination(items)}>{items}</button>
        </div>
      ))}
    </div>
    <button onClick={() => props.HandlePagination((props.activePage + 2))} disabled={props.activePage + 1 === props.numPage.length}>next</button>

  </div>;
}

export default Pagination;