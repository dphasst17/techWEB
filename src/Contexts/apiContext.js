import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { StateContext } from "./stateContext";
import { useGetData, useGetDataByKey } from "~/hooks/useFetchData";
import { getUserInfo } from "~/api/userApi";
import { orderSelectByUser } from "~/api/orderApi";
import HandleToken from "~/helper/handleToken";
import { getProductByType } from "~/api/productApi";

export const ApiContext = createContext({});

export const ApiProvider = ({ children }) => {
  const {
    Users,
    setUsers,
    /* setLaptop,
    setKeyboard,
    setMouse,
    setMemory,
    setMonitor,
    setStorage,
    setVga, */
    setLaptop,
    setAddress,
    setListOrder,
    setIsDark,
    isDark,
    setType,
    setProduct,
  } = useContext(StateContext);
  const [valueSearch, setValueSearch] = useState("");
  const [showResult, setIsShowResult] = useState(false);
  const [isShowButton, setIsShowButton] = useState(false);

  const [numPage, setNumPage] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const ref = useRef();
  const isLogin = localStorage.getItem("isLogin") || false;
  const darkMode = localStorage.getItem("dark") || false;
  const handleSetDarkMode = useCallback(() => {
    setIsDark(JSON.parse(darkMode));
  }, [darkMode, setIsDark]);
  useEffect(() => {
    handleSetDarkMode();
  }, [handleSetDarkMode]);
  useEffect(() => {
    isDark === true
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
  }, [isDark]);

  /* isLogin === true => check token => 
    if token has expired => get new token => get User with new access token and save new token in cookies
    else get user with access token and save data result user in state
  */

  const handleToken = HandleToken();
  //eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const isUndefinedOrFalse = (value) => {
      return value !== undefined && value !== false;
    };

    const fetchUser = async () => {
      const accessToken = await handleToken();
      if (isUndefinedOrFalse(accessToken)) {
        try {
          const res = await getUserInfo(accessToken);
          if (res.status === 500) {
            throw Error({ status: res.status, message: res.messages });
          }
          setUsers(res);
          setAddress(res[0].address);
        } catch (err) {
          console.log(err);
        }

        try {
          const res = await orderSelectByUser(accessToken);
          if (res.status === 500) {
            throw Error({ status: res.status, message: res.messages });
          }
          setListOrder(res);
        } catch (err) {
          console.log(err);
        }
      }
    };

    isLogin === "true" && fetchUser();
  }, [handleToken]);

  /*   const { data, err } = []; */
  const { data: dataLaptop, err: errLaptop } = useGetDataByKey(
    "product",
    "getProductByType",
    JSON.stringify({ type: "laptop" })
  );
  const { data: dataType, err: errType } = useGetData("product", "getType");


  useEffect(() => {
    if (dataType !== null) {
      setType(dataType.data);
      let tempProduct = [];
      Promise.all(dataType.data.map(e => getProductByType({type: e.type}).then(res => tempProduct.push({ type: e.type, data: res })))).then(() => {
        setProduct(prevProduct => (prevProduct !== null ? [...prevProduct, ...tempProduct] : [...tempProduct]));
      });
    }
  }, [dataType]);
  

  /* useEffect(() => {
    type!== null && console.log(type)
    product !== null && console.log(product)
  },[type,product]) */

  useEffect(() => {
    dataLaptop !== null && setLaptop(dataLaptop);
  }, [dataLaptop]);

  const handelValueSearch = (valueSearch) => {
    setValueSearch(valueSearch.target.value);
    if (valueSearch.target.value.length > 0) {
      setIsShowResult(true);
    } else {
      setIsShowResult(false);
    }
  };

  const handleSetIsShowResult = () => {
    if (valueSearch.length > 0) {
      setIsShowResult(true);
    } else {
      setIsShowResult(false);
    }
  };

  const handleSetHideResult = () => {
    if (showResult === true) {
      setIsShowResult(false);
    }
  };

  //------------- Pagination ----------------
  const PaginationPage = (e, z) => {
    useEffect(() => {
      if (e?.length > z) {
        let length = e.length % z === 0 ? e.length / z : e.length / z + 1;
        setIsShowButton(true);

        let arr = [];
        for (let i = 1; i <= length; i++) {
          arr.push(i);
          setNumPage(arr);
        }
      } else {
        setIsShowButton(false);
      }
    }, [e, z]);
  };

  const HandleActivePage = (data, numberOfProductInPage) => {
    useEffect(() => {
      setActivePage(data / numberOfProductInPage);
    }, [data, numberOfProductInPage]);
  };

  //------------------------------------------------
  const SortDataBasedOnPrice = (price, data, setData) => {
    useEffect(() => {
      if (data !== null) {
        const sortedData =
          price !== "0"
            ? [...data].sort((items, check) =>
                price === "1"
                  ? items.price - check.price
                  : check.price - items.price
              )
            : [...data];
        JSON.stringify(sortedData) !== JSON.stringify(data) &&
          setData(sortedData);
      }
    }, [data, price, setData]);
  };

  return (
    <ApiContext.Provider
      value={{
        Users,
        valueSearch,
        showResult,
        isShowButton /* set show button number pagination */,
        numPage,
        activePage,
        ref,
        SortDataBasedOnPrice,
        HandleActivePage /* number pagination */,
        PaginationPage /* handle division of page count */,
        handelValueSearch,
        handleSetIsShowResult,
        handleSetHideResult,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
