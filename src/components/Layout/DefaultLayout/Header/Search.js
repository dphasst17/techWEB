import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "~/ContextApi/ContextApi";
import  "~/components/Layout/DefaultLayout/Header/Header.scss";


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
    <div className="itemsResults w-full h-auto overflow-hidden">
      {data.slice(0,8).map((items) => (
        <div className="detail w-full h-full flex justify-between my-[6%] mx-[0%] cursor-pointer" key={items.id} onClick={() => {navigate("/detail/"+ items.id + "/" + items.title)}}>
          <img src={items.url} alt="img-result-search" className="w-[16%] h-[40px] my-[0] mx-[auto] object-contain"/>
          <div className="resultTitle w-[70%]">
            <h3 className="text-[18px] font-semibold text-[#bc0c0c] mx-[auto] my-[0]">Title: {(items.title.length >= 40) ? items.title.slice(0,40) + `...` : items.title }</h3>
            <h3 className="text-[18px] font-semibold text-[#bc0c0c] mx-[auto] my-[0]">Price: {items.price} USD</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
