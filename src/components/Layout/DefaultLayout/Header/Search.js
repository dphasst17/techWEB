import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "~/contexts/apiContext";
import  "~/components/Layout/DefaultLayout/Header/Header.scss";
import { StateContext } from "~/contexts/stateContext";


function SearchResults() {
  const { valueSearch} = useContext(ApiContext);
  const {laptop,keyboard,monitor,memory,vga,mouse,storage} = useContext(StateContext);
  const [data,setData] = useState(null)
  const navigate = useNavigate();
  useEffect(() => {
    laptop !== null && keyboard !== null && monitor !== null && memory !== null && vga !== null && mouse !== null && storage !== null 
    && setData([...laptop,...keyboard,...monitor,...memory,...vga,...mouse,...storage].filter(
      (d) =>
        d.nameProduct.toUpperCase().includes(valueSearch.toUpperCase())||
        d.brand.toUpperCase().includes(valueSearch.toUpperCase()) ||
        d.nameType.toUpperCase().includes(valueSearch.toUpperCase())
    ))
  },[laptop,keyboard,monitor,memory,vga,mouse,storage,valueSearch])
  return (
    <div className="itemsResults w-full h-auto overflow-hidden">
      {data !== null && data.slice(0,8).map((items) => (
        <div className="detail w-full h-full flex justify-between my-[6%] mx-[0%] cursor-pointer" key={items.idProduct} onClick={() => {navigate(`/detail/${items.idType}/${items.idProduct}/${items.nameProduct}`)}}>
          <img src={items.imgProduct} alt="img-result-search" className="w-[16%] h-[40px] my-[0] mx-[auto] object-contain"/>
          <div className="resultTitle w-[70%]">
            <h3 className="text-[18px] font-semibold text-[#bc0c0c] mx-[auto] my-[0]">Name: {(items.nameProduct.length >= 40) ? items.nameProduct.slice(0,40) + `...` : items.nameProduct }</h3>
            <h3 className="text-[18px] font-semibold text-[#bc0c0c] mx-[auto] my-[0]">Price: {items.price} USD</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
