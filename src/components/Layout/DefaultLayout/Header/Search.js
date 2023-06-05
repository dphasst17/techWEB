import classNames from "classnames/bind";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "~/ContextApi/ContextApi";
import style from "~/components/Layout/DefaultLayout/Header/Header.scss";

const cx = classNames.bind(style);

function SearchResults() {
  const { valueSearch, DataProduct, Access } = useContext(ApiContext);
  const navigate = useNavigate()
  const dataProduct = DataProduct.filter(
    (data) =>
      data.title.toUpperCase().includes(valueSearch.toUpperCase())||
      data.brand.toUpperCase().includes(valueSearch.toUpperCase())
  );
  const dataAccess = Access.filter(
    (data) => (valueSearch.length > 0) ?
    data.brand.toUpperCase().includes(valueSearch.toUpperCase()) ||
    data.title.toUpperCase().includes(valueSearch.toUpperCase()) ||
    data.type.toUpperCase().includes(valueSearch.toUpperCase()) : null
  );
  const data = [...dataProduct, ...dataAccess];
  return (
    <div className={cx("itemsResults")}>
      {data.slice(0,8).map((items) => (
        <div className={cx("detail")} key={items.id} onClick={() => {navigate("/detail/"+ items.id + "/" + items.title)}}>
          <img src={items.url} alt="" />
          <div className={cx("resultTitle")}>
            <h3>Title: {(items.title.length >= 40) ? items.title.slice(0,40) + `...` : items.title }</h3>
            <h3>Price: {items.price} USD</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
