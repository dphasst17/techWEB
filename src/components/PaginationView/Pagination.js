import classNames from "classnames/bind";
import style from "./Pagination.module.scss";
import nextIcon1 from "~/images/icon/nextIcon1.png"
const cx = classNames.bind(style);
function Pagination({props}) {
    return <div className={cx("buttonPG")}>
    <button className="w-[150px] active:scale-75 transition-all" onClick={() => props.HandlePagination(props.activePage - 1)} disabled={props.activePage === 0}>
      <img className="w-full h-[40px] object-contain scale-x-[-1]" src={nextIcon1} alt="prev-icon"/>
    </button>
    <div className={cx("buttonCT")}>
      {props.numPage.map((items) => (
        <div
          className={cx(
            `pagination${items === props.activePage ? "Active" : ""}`
          )}
          key={items}
        >
          <button onClick={() => props.HandlePagination(items)}>{items}</button>
        </div>
      ))}
    </div>
    <button className="w-[150px] active:scale-75 transition-all" onClick={() => props.HandlePagination(props.activePage + 1)} disabled={props.activePage === props.numPage.length}>
    <img className="w-full h-[40px] object-contain" src={nextIcon1} alt="next-icon"/>
    </button>

  </div>;
}

export default Pagination;