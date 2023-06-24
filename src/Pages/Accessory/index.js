import "./Accessory.scss";
import { CartContext } from "~/Contexts/Cart";
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "~/ContextApi/ContextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Pagination from "~/components/PaginationView/Pagination";
import Filter from "~/components/FilterProduct/Filter";

function Accessory() {
  const {
    Access,
    PaginationPage,
    numPage,
    isShowButton,
    HandleActivePage,
    activePage,
    valuePice,
    SortDataBasedOnPrice
  } = useContext(ApiContext);
  const [valueBrand, setValueBrand] = useState([]);
  const [valueType, setValueType] = useState([]);
  const [price, setPrice] = useState([]);
  const [Slice, setSlice] = useState(12);
  const [isShow, setIsShow] = useState(true);
  const [isShowS, setIsShowS] = useState(false);
  const [isShowFil,setIsShowFil] = useState("-200%")
  let filterBrand = Array.from(new Set(Access.map((items) => items.brand)));
  let filterType = Array.from(new Set(Access.map((items) => items.type)));
  let data = Access.filter((items) => {
    if (valueBrand.length !== 0 && valueType.length !== 0) {
      return valueBrand.includes(items.brand) && valueType.includes(items.type);
    } else if (valueBrand.length !== 0 || valueType.length !== 0) {
      return valueBrand.length !== 0
        ? valueBrand.includes(items.brand)
        : valueType.includes(items.type);
    } else {
      return items;
    }
  });
  SortDataBasedOnPrice(data,price)

  /* Pagination Page */
  PaginationPage(data, 12);
  useEffect(() => {
    if (!numPage.includes(Slice / 12)) {
      setSlice(12);
    }
  }, [Slice, numPage]);
  const HandlePagination = (e) => {
    setSlice(12 * e);
  };
  HandleActivePage(Slice,12);

  return (
    <div className="accessory w-full min-h-[600px] flex flex-col justify-center overflow-hidden">
      
      <Filter props={{filterBrand,filterType,valueBrand,valueType,isShowFil,isShow,isShowS,valuePice,price,setPrice,setValueBrand,setIsShow,setIsShowS,setIsShowFil,setValueType}}/>
      <div className="items_container w-[90%] min-h-[500px] overflow-hidden">
        <div className="show w-full min-h-[693px] flex flex-wrap justify-start items-start pb-[1%]">
          {(data.length > 12
            ? data.slice(Slice - 12, Slice)
            : data.slice(0)
          ).map((product) => (
            <div className="product-detail w-1/5 h-2/5 mt-[3%] ml-[4%] min-w-[150px] cursor-pointer" key={product.id} style={{animationDelay: "." + product.id + "s"}}>
              <div className="detail-box w-full h-[14em] flex flex-col justify-around rounded-[16px]">
                <div className="w-full h-4/5 flex justify-center overflow-hidden">
                  <img src={product.url} alt="img Access" className="w-full h-auto object-contain"/>
                </div>
                <div className="title w-full h-1/5">
                  <h4 className="text-center text-[18px] text-[#bc0c0c] font-semibold overflow-hidden whitespace-nowrap text-ellipsis">{product.title}</h4>
                </div>
                <p className="font-semibold text-[16px] text-[#bc0c0c] ml-[5%]">Price: {product.price} USD</p>
                <div className="button w-full h-[12%] flex justify-around mb-[5%]">
                  <button className="w-[20%] h-[30px] text-[16px] font-[550] text-white rounded-[5px] bg-blue-800 hover:bg-blue-600 cursor-pointer" onClick={() =>{window.location.pathname = ("/detail/" + product.id+"/"+ product.title)}}>
                    <Link to={"/detail/" + product.id + "/" + product.title}>
                      <FontAwesomeIcon icon={faTableList} />
                    </Link>
                  </button>

                  <CartContext.Consumer>
                    {({ addToCart }) => (
                      <button 
                        className="w-1/2 h-[30px] text-[5px] lg:text-[16px] md:text-[15px] sm:text-[10px] font-[550] text-white rounded-[5px] bg-blue-800 hover:bg-blue-600 cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis px-[2%]" 
                        onClick={() => addToCart(product)}>
                        ADD TO CART
                      </button>
                    )}
                  </CartContext.Consumer>

                  <button className="w-[20%] h-[30px] text-[16px] font-[550] text-white rounded-[5px] bg-blue-800 hover:bg-blue-600 cursor-pointer">
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {isShowButton === true && (
          <Pagination props={{numPage,activePage,HandlePagination}}/>
        )}
      </div>
    </div>
  );
}

export default Accessory;
