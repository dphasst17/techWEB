import { useContext, useEffect, useState } from "react";
import { ApiContext } from "~/contexts/apiContext";
import { useParams } from "react-router-dom";
import Pagination from "~/components/PaginationView/Pagination";
import Filter from "./Filter";
import { useGetDataByKey } from "~/hooks/useFetchData";
import { StateContext } from "~/contexts/stateContext";
import ProductLayoutBasic from "~/components/Product/basic";
function SearchResult() {
  const { keyword } = useParams();
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
    SortDataBasedOnPrice
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
        <div className="show w-full min-h-[693px] flex flex-wrap justify-center items-start pb-[1%]">
          {data !== null &&
            (data.length > 12
              ? data.slice(Slice - 12, Slice)
              : data.slice(0)
            ).map(product => <ProductLayoutBasic props={{d:product}}/>)}
        </div>
        {data !== null && data.length > 12 && (
          <Pagination props={{ numPage, activePage, HandlePagination }} />
        )}
      </div>
    </div>
  );
}

export default SearchResult;
