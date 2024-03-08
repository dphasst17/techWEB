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
    setLaptop,
    setAddress,
    setListOrder,
    setIsDark,
    isDark,
    setType,
    setProduct,
    setBank,
    setNewData,
    setSelling,
    setSaleData,
    setPost,setViewData,
    fetchOrder,setFetchOrder,
    fetchUser,setFetchUser
  } = useContext(StateContext);
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
  useEffect(() => {
    fetch('https://api.vietqr.io/v2/banks')
    .then(res => res.json())
    .then(res => setBank(res.data))
    
  },[setBank])

  /* isLogin === true => check token => 
    if token has expired => get new token => get User with new access token and save new token in cookies
    else get user with access token and save data result user in state
  */

  const handleToken = HandleToken();
  //eslint-disable-next-line react-hooks/exhaustive-deps
  const isUndefinedOrFalse = (value) => {
    return value !== undefined && value !== false;
  };
  useEffect(() => {
    const fetchDataUser = async () => {
      const accessToken = await handleToken();
      if (accessToken) {
        try {
          const res = await getUserInfo(accessToken);
          if (res.status === 500) {
            throw Error({ status: res.status, message: res.messages });
          }
          setUsers(res);
          setAddress(res[0].address);
          setFetchUser(!fetchUser)
        } catch (err) {
          console.log(err);
        }
      }
    };

    (isLogin === "true" || isLogin) && fetchDataUser();
  }, []);
  useEffect(() => {
    const fetchDataOrder = async () => {
      const accessToken = await handleToken();
      if (isUndefinedOrFalse(accessToken)) {
        try {
          const res = await orderSelectByUser(accessToken);
          if (res.status === 500) {
            throw Error({ status: res.status, message: res.messages });
          }
          setListOrder(res);
          setFetchOrder(!fetchOrder)
        } catch (err) {
          console.log(err);
        }
      }
    };
    isLogin === "true" && fetchOrder && fetchDataOrder()
    
  },[isLogin,fetchOrder])

  const{data:dataPost,err:errPost} = useGetData('posts','getPosts');
  const{data:dataSale,err:errSale} = useGetData('product','getProductOnSale');
  const {data:dataNew,err:errNew} = useGetData('product','getProductNew');
  const { data:dataSold, err:errSold } = useGetData("product", "getProductSold");
  const { data:dataView, err:errView } = useGetData("product", "getProductByView");
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
  

  useEffect(() => {
    dataLaptop !== null && setLaptop(dataLaptop);
  }, [dataLaptop]);
  
  useEffect(() => {
    dataPost !== null && setPost(dataPost);
    dataSale !== null && setSaleData(dataSale.data);
    dataNew !== null && setNewData(dataNew);
    dataSold !== null && setSelling(dataSold);
    dataView !== null && setViewData(dataView)
  },[dataPost,dataSale,dataNew,dataSold,dataView])
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
  const percentDiscount = (discount,price) => {
    return price - ((price * discount) / 100)
  }
  return (
    <ApiContext.Provider
      value={{
        Users,
        isShowButton /* set show button number pagination */,
        numPage,
        activePage,
        ref,
        percentDiscount,
        SortDataBasedOnPrice,
        HandleActivePage /* number pagination */,
        PaginationPage /* handle division of page count */,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
