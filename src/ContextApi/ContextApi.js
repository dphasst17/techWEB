import { createContext, useEffect, useState } from "react";

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
  /* let [input] = useState([]); */
  useEffect(() => {
    fetch(urlProduct + "tqwu5d31kjdih2o")
      .then((dataProducts) => dataProducts.json())
      .then((dataProducts) => {
        setDataProduct(dataProducts);
      })
      .catch((err) => console.error(err));

    fetch(urlProduct + "tw21n4e42mqw")
      .then((dataAccess) => dataAccess.json())
      .then((dataAccess) => {
        setAccess(dataAccess);
      })
      .catch((err) => console.error(err));

    fetch(urlUsers)
      .then((dataUsers) => dataUsers.json())
      .then((dataUsers) => {
        setUsers(dataUsers);
      })
      .catch((err) => console.error(err));
  }, []);



  const handelValueSearch = (valueSearch) => {
    setValueSearch(valueSearch.target.value);
    if(valueSearch.target.value.length > 0){setIsShowResult(true)}else{setIsShowResult(false)}
  };
  const handleSetIsShowResult = () => {
    if(valueSearch.length > 0){setIsShowResult(true)}else{setIsShowResult(false)}
  }
  const handleSetHideResult = () => {
    if(showResult === true){
      setIsShowResult(false);
    }
  };

  return (
    <ApiContext.Provider
      value={{
        DataProduct,
        Access,
        Users,
        valueSearch,
        showResult,
        /* input, */
        handelValueSearch,
        handleSetIsShowResult,
        handleSetHideResult
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
