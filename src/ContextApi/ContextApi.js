import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";

export const ApiContext = createContext({});

export const ApiProvider = ({ children }) => {
  const urlProduct =
    "https://63a16120a543280f77548d0f.mockapi.io/tx3en1cj8hjaw/";
  const urlUsers =
    "https://63d4daaa0e7ae91a00a3604b.mockapi.io/tx3en1cj8ha/uw13fsu8eg4yhr";
  const [DataProduct, setDataProduct] = useState([]);
  const [Access, setAccess] = useState([]);
  const [Users, setUsers] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [showResult, setIsShowResult] = useState(false);
  const [isShowButton, setIsShowButton] = useState(false);
  const [numPage, setNumPage] = useState([]);
  /* let [input] = useState([]); */
  useEffect(() => {
    const fetchDataPro = async () => {
      const dataPro = await axios(urlProduct + "tqwu5d31kjdih2o")
      setDataProduct(dataPro.data)
    }
    fetchDataPro()
    /* fetch(urlProduct + "tqwu5d31kjdih2o")
      .then((dataProducts) => dataProducts.json())
      .then((dataProducts) => {
        setDataProduct(dataProducts);
      })
      .catch((err) => console.error(err)); */
  }, []);
  useEffect(() =>{
    const fetchDataAccess = async () => {
      const dataPro = await axios(urlProduct + "tw21n4e42mqw")
      setAccess(dataPro.data)
    }
    fetchDataAccess()
    /* fetch(urlProduct + "tw21n4e42mqw")
      .then((dataAccess) => dataAccess.json())
      .then((dataAccess) => {
        setAccess(dataAccess);
      })
      .catch((err) => console.error(err));
 */
  },[])
  useEffect(() =>{
    const fetchDataUS = async () => {
      const dataPro = await axios(urlUsers)
      setUsers(dataPro.data)
    }
    fetchDataUS()
    /* fetch(urlUsers)
      .then((dataUsers) => dataUsers.json())
      .then((dataUsers) => {
        setUsers(dataUsers);
      })
      .catch((err) => console.error(err)); */
  },[])

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
  const PaginationPage = (e) => {
    useMemo(() => {
      if (e.length > 12) {
        if (e.length % 12 === 0) {
          setIsShowButton(true);
          let arr = [];
          for (let i = 1; i <= e.length / 12; i++) {
            arr.push(i);
            setNumPage(arr);
          }
        } else {
          setIsShowButton(true);
          let arr = [];
          for (let i = 1; i <= e.length / 12 + 1; i++) {
            arr.push(i);
            setNumPage(arr);
          }
        }
      } else {
        setIsShowButton(false);
      }
    }, [e.length]);
  }
  return (
    <ApiContext.Provider
      value={{
        urlProduct,
        urlUsers,
        DataProduct,
        Access,
        Users,
        valueSearch,
        showResult,
        isShowButton,/* set show button number pagination */
        numPage,/* number pagination */
        PaginationPage,/* handle division of page count */
        handelValueSearch,
        handleSetIsShowResult,
        handleSetHideResult,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
