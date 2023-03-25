import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ApiContext = createContext({});

export const ApiProvider = ({ children }) => {
  const urlProduct =
    "https://63a16120a543280f77548d0f.mockapi.io/tx3en1cj8hjaw/";
  const urlUsers = process.env.REACT_APP_URL_API;
  const [DataProduct, setDataProduct] = useState([]);
  const [Access, setAccess] = useState([]);
  const [Users, setUsers] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [showResult, setIsShowResult] = useState(false);
  const [isShowButton, setIsShowButton] = useState(false);
  const [numPage, setNumPage] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [activePage, setActivePage] = useState()
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
      setIsLoad(true)
      const dataUS = await axios.get(urlUsers)
      if(dataUS.status === 200) {
        setUsers(dataUS.data);
        setIsLoad(false)
      }
      
    }
    fetchDataUS()
  },[urlUsers])

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
  const PaginationPage = (e,z) => {
    useEffect(() => {
      if (e.length > z) {
        let length = (e.length % z === 0) ? e.length / z : (e.length / z) + 1;
        setIsShowButton(true);
        
          let arr = [];
          for (let i = 1; i <= length; i++) {
            arr.push(i);
            setNumPage(arr);
          }
      } else {
        setIsShowButton(false);
      }
    }, [e.length,z]);
  };
  const HandleActivePage = (i) => {
    useEffect(() => {
      
      setActivePage(numPage.findIndex((e) => e === i / 12)) 
    })
  }
  const HandleLogin = (name,mail,path) => {
    const user = Users.filter((items) =>
            items.user.flatMap((last) => last.email).includes(mail)
          );
          if (user.length === 0) {
            setIsLoad(true);
            const option = {
              method: "POST",
              headers: { "Content-type": "application/json; charset=UTF-8" },
              body: JSON.stringify({
                username:"",
                password:"",
                user: [
                  {
                    fullName: name,
                    phoneNumber: "",
                    email:mail,
                    address: "",
                  },
                ],
                listCart: [],
                purchaseOrder: [],
                id: Users.length + 1,
              }),
            };
            fetch(urlUsers, option).then((res) => {
              if (res.status === 201) {
                setIsLoad(false);
                localStorage.setItem("isLogin", true);
                localStorage.setItem(
                  "identificationID",
                  JSON.stringify(Users.length + 1)
                );
                window.location.pathname = path;
              }
            });
          } else {
            localStorage.setItem("isLogin", true);
            localStorage.setItem(
              "identificationID",
              JSON.stringify(user.flatMap((items) => items.id))
            );
            window.location.pathname = path;
          }
        
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
        isShowButton,   /* set show button number pagination */
        numPage,
        isLoad,
        activePage,
        HandleLogin,
        HandleActivePage,
        setIsLoad,        /* number pagination */
        PaginationPage, /* handle division of page count */
        handelValueSearch,
        handleSetIsShowResult,
        handleSetHideResult,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
