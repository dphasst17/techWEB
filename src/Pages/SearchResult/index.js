import { useContext, useEffect, useState } from "react";
import { ApiContext } from "~/contexts/apiContext";
import { CartContext } from "~/contexts/Cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTableList } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import Pagination from "~/components/PaginationView/Pagination";
import Filter from "./Filter";
import { useGetDataByKey } from "~/hooks/useFetchData";
import { StateContext } from "~/contexts/stateContext";

function SearchResult() {
  const { keyword } = useParams();
  const navigate = useNavigate()
  const { data: result, err } = useGetDataByKey(
    "product",
    "getProductByKeyword",
    JSON.stringify({ keyword: keyword })
  );
  const {
    PaginationPage,
    numPage,
    activePage,
    HandleActivePage,
    SortDataBasedOnPrice,
  } = useContext(ApiContext);
  const { valueFil, setValueFil } = useContext(StateContext);
  const [filPrice, setFilPrice] = useState("0");
  const [Slice, setSlice] = useState(12);
  const [filBrand, setFilBrand] = useState(null);
  const [filType,setFilType] = useState(null)
  const [data, setData] = useState(null);
  const [optionType, setOptionType] = useState("laptop");
  useEffect(() => {
    result !== null && setData(result);
    result !== null && setFilType(Array.from(new Set(result.map(e => e.nameType))))
  }, [result]);

  useEffect(() => {
    if (!numPage.includes(Slice / 12)) {
      setSlice(12);
    }
  }, [Slice, numPage, setSlice]);

  useEffect(() => {
    valueFil.length !== 0
      ? setData(
          result.filter((product) => {
            return valueFil.every((obj) => {
              return obj.values.includes(product[obj.key])
            });
          })
        )
      : setData(result);
  }, [result, valueFil]);

  useEffect(() => {
    result !== null &&
      setFilBrand(Array.from(new Set(result.map((e) => e.brand))));
  }, [result, setFilBrand]);

  const HandlePagination = (e) => {
    if (data.length > 12) {
      numPage.includes(Slice / 12) ? setSlice(12 * e) : setSlice(12);
    } else {
      setSlice(12);
    }
  };

  PaginationPage(data, 12);
  SortDataBasedOnPrice(filPrice, data, setData);

  HandleActivePage(Slice, 12);
  return (
    <div className="product">
      <Filter
        props={{
          filType,
          filBrand,
          valueFil,
          setValueFil,
          optionType,
          filPrice,
          setOptionType,
          setFilPrice,
        }}
      />
      <div className="items_container w-[90%] min-h-[500px] overflow-hidden">
        <div className="show w-full min-h-[693px] flex flex-wrap justify-start items-start pb-[1%]">
          {data !== null &&
            (data.length > 12
              ? data.slice(Slice - 12, Slice)
              : data.slice(0)
            ).map((product) => (
              <div
                className="product-detail w-1/5 h-2/5 mt-[3%] ml-[4%] min-w-[150px] cursor-pointer"
                key={product.id}
              >
                <div className="detail-box w-full flex flex-col justify-around rounded-[16px]">
                  <div className="itemsImg w-full h-4/5 flex justify-center overflow-hidden">
                    <img
                      src={product.imgProduct}
                      alt="img Product Laptop"
                      className="w-full h-[130px] object-contain"
                    />
                  </div>
                  <div className="title w-full h-1/5">
                    <h4 className="text-center text-[18px] text-[#bc0c0c] font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
                      {product.nameProduct}
                    </h4>
                  </div>

                  <div className="infProduct w-full h-1/2">
                    <p className="font-semibold text-[16px] text-[#bc0c0c] ml-[5%] overflow-hidden whitespace-nowrap text-ellipsis">
                      {product.detail1}
                    </p>
                    <p className="font-semibold text-[16px] text-[#bc0c0c] ml-[5%] overflow-hidden whitespace-nowrap text-ellipsis">
                      {product.detail2}
                    </p>
                    <p className="font-semibold text-[16px] text-[#bc0c0c] ml-[5%] overflow-hidden whitespace-nowrap text-ellipsis">
                      {product.detail3}
                    </p>
                    <p className="font-semibold text-[16px] text-[#bc0c0c] ml-[5%] overflow-hidden whitespace-nowrap text-ellipsis">
                      {product.detail4}
                    </p>
                  </div>

                  <p className="font-semibold text-[16px] text-[#bc0c0c] ml-[5%]">
                    Price: {product.price} USD
                  </p>
                  <div className="button w-full h-[12%] flex justify-around mb-[5%]">
                    <button
                      className="w-[20%] h-[30px] text-[16px] font-[550] text-white rounded-[5px] bg-blue-800 hover:bg-blue-600 cursor-pointer"
                      onClick={() => {
                        navigate(`/detail/${product.idType}/${product.idProduct}/${product.nameProduct}`)
                        
                      }}
                    >
                      <Link >
                        <FontAwesomeIcon icon={faTableList} />
                      </Link>
                    </button>

                    <CartContext.Consumer>
                      {({ addToCart }) => (
                        <button
                          className="w-1/2 h-[30px] px-[2%] text-[16px] font-[550] text-white rounded-[5px] bg-blue-800 hover:bg-blue-600 cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis"
                          onClick={() => addToCart(product)}
                        >
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
        {data !== null && data.length > 12 && (
          <Pagination props={{ numPage, activePage, HandlePagination }} />
        )}
      </div>
    </div>
  );
}

export default SearchResult;
