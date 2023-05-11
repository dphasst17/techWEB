import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useEffect, useRef, useState } from "react";

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
  const [activePage, setActivePage] = useState();
  const [isIntersecting, setIsIntersecting] = useState(false);
  let expirationTime = localStorage.getItem("expirationTime");
  let accss = localStorage.getItem("accessTK");
  let cookie = Cookies.get("RFTokens");
  let observer;
  useEffect(() => {
    const fetchDataPro = async () => {
      try {
        const dataPro = await axios(urlProduct + "tqwu5d31kjdih2o");
        setDataProduct(dataPro.data);
      } catch (error) {
        // Handle error here
        console.error(error);
      }
    };
    fetchDataPro();
  }, []);

  useEffect(() => {
    const fetchDataAccess = async () => {
      try{
        const dataPro = await axios(urlProduct + "tw21n4e42mqw");
        setAccess(dataPro.data);
      } catch (error) {
        // Handle error here
        console.error(error);
      }
    };
    fetchDataAccess();
  }, []);
  

  //ANIMATION AND HANDLE CLICK BUTTON FOR SLIDE IN FEATURED PRODUCT AND NEW PRODUCT
  

  useEffect(() => {
    const GetDataUs = () =>{
      let fetchData = (token) => {
        const option = {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        };
        fetch(process.env.REACT_APP_URL_US2, option)
          .then((res) => res.json())
          .then((json) => {
            setUsers([json.dataUser]);
            setIsLoad(false);
          })
          .catch((e) => {console.log(e)})
      };
      if (window.location.pathname !== "/login" && accss && accss !== "undefined" ) {
        setIsLoad(true);
        let token;
        if (expirationTime && Date.now() > expirationTime - 10 * 60 * 100) {
          fetch(process.env.REACT_APP_URL_REFRESH, {
            method: "POST",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({ refreshToken: Cookies.get("RFTokens") }),
          })
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              token = res.newAccessToken;
              const expirationTime = new Date().getTime() + 600 * 1000;
              localStorage.setItem("accessTK", res.newAccessToken);
              localStorage.setItem("expirationTime", expirationTime);
              fetchData(token);
            })
            .catch((e) => {console.log(e)})
        } else {
          token = localStorage.getItem("accessTK");
          fetchData(token);
        }
      } else if (accss === "undefined") {
        let token;
        fetch(process.env.REACT_APP_URL_REFRESH, {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({ refreshToken: Cookies.get("RFTokens") }),
        })
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            token = res.newAccessToken;
            const expirationTime = new Date().getTime() + 600 * 1000;
            localStorage.setItem("accessTK", res.newAccessToken);
            localStorage.setItem("expirationTime", expirationTime);
            fetchData(token);
          })
          .catch((e) => {console.log(e)})
      }
    }
    if (!cookie) {
      localStorage.setItem("isLogin", false);
      localStorage.removeItem("accessTK");
      localStorage.removeItem("expirationTime");
    } else {
      GetDataUs()
    }
  }, [cookie,accss,expirationTime]);

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

  const PaginationPage = (e, z) => {
    useEffect(() => {
      if (e.length > z) {
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
    }, [e.length, z]);
  };

  const HandleActivePage = (i) => {
    useEffect(() => {
      setActivePage(numPage.findIndex((e) => e === i / 12));
    });
  };

  const HandleLogin = (name, mail, path) => {
    setIsLoad(true);
    const option = {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        fullName: name,
        email: mail,
      }),
    };
    fetch(process.env.REACT_APP_URL_LOGIN, option)
      .then((res) => res.json())
      .then((res) => {
        setIsLoad(false);
        localStorage.setItem("accessTK", res.accessToken);
        localStorage.setItem("expirationTime", new Date().getTime() + 600 * 1000);
        Cookies.set("RFTokens", res.refreshToken, { expires: 5, path: "/" });
        localStorage.setItem("isLogin", true);
        window.location.pathname = path ? (path === "/login" ? "/" : path) : "/";
      })
      .catch((e) => {console.log(e)})
  };

  const valuePice = [
    {
      content: "Low to Hight",
      inputValue: "1",
      inputID: "low",
    },
    {
      content: "Hight to Low",
      inputValue: "2",
      inputID: "hight",
    },
  ];

  const ref = useRef();

  const Intersecting = () => {
    useEffect(() => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            observer.disconnect();
          }
        },
        { threshold: 0.5 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        observer.disconnect();
      };
    }, []);
  };

  const handlePost = (items, e, z, y) => {
    let token;
    const handleResponse = (res) => {
      if (e) {
        if (res.status === 200) {
          e(false);
          window.location.pathname = z;
          if (y) {
            y(false);
          }
        }
      } else {
        res.json();
      }
    };
    const postChangeUser = (token) => {
      const option = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(items),
      };
      fetch(process.env.REACT_APP_URL_CHANGE, option).then(
        handleResponse
      )
      .catch((e) => {console.log(e)})
    };
    if (
      expirationTime &&
      new Date().getTime() - expirationTime > 480000
    ) {
      fetch(process.env.REACT_APP_URL_REFRESH, {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          refreshToken: Cookies.get("RFTokens"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("accessTK", data.accessToken);
          postChangeUser(data.accessToken);
        })
        .catch((e) => {console.log(e)})
    } else {
      token = localStorage.getItem("accessTK");
      postChangeUser(token);
    }
  };

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
        isShowButton /* set show button number pagination */,
        numPage,
        isLoad,
        activePage,
        valuePice,
        ref,
        isIntersecting,
        handlePost,
        Intersecting,
        HandleLogin,
        HandleActivePage,
        setIsLoad /* number pagination */,
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
