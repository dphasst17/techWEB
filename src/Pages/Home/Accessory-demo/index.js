import React, { useContext, useEffect, useState } from "react";
import "../Home.scss";
/* import "~/tailwind.css" */
import { CartContext } from "~/Contexts/Cart";
import { ApiContext } from "~/ContextApi/ContextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faTableList } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LazyLoad from 'react-lazy-load';


const AccDemo = () => {
  const { Access } = useContext(ApiContext);
  const [showElement, setShowElement] = useState(false);
  const [offSet, setOffSet] = useState(0)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    window.innerWidth >= 800 ? setOffSet(10) : setOffSet(0)
  },[])
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    let showElement;
    if (window.innerWidth >= 800) {
      showElement = currentScrollPos > 2100 ? true : false;
    } else {
      showElement = currentScrollPos > 2000 ? true : false;
    }
    setShowElement(showElement);
  };
  return (
    <>
      {Access.length !==0 ? <h1>OUR ACCESSORY</h1> : <></>}
      <div className="h-access w-full h-auto flex flex-row flex-wrap content-start justify-around">
        {Access.slice(0, 12).map((dataAcc) => (
          <div className="accDemo" key={dataAcc.id}>
            {showElement && <LazyLoad height={"auto"} offset={offSet}>
              <div className="accDemo_Child w-full flex flex-col">
                <div className="image">
                  <img src={dataAcc.url} alt="img Access demo" loading="lazy"/>
                </div>
                <div className="title">
                  <p className="w-full text-center font-semibold overflow-hidden whitespace-nowrap text-ellipsis">{dataAcc.title}</p>
                </div>
                <div className="accessInf">
                  <p>Brand: {dataAcc.brand}</p>
                  <p>Type: {dataAcc.type.toUpperCase()}</p>
                </div>
                <div className="items-child w-full flex lg:flex-row flex-col justify-between">
                  <div className="price w-full lg:w-2/4 font-medium overflow-hidden whitespace-nowrap text-ellipsis">Price:{dataAcc.price} USD</div>
                  <div className="button w-full lg:w-2/5 flex flex-row justify-between">
                    <CartContext.Consumer>
                      {({ addToCart }) => (
                        <button className="w-3/4 lg:w-4/6 bg-blue-800 hover:bg-blue-600" onClick={() => addToCart(dataAcc)}>
                          <FontAwesomeIcon icon={faCartShopping} />
                        </button>
                      )}
                    </CartContext.Consumer>
                    <button className="w-1/5 lg:w-1/4 bg-blue-800 hover:bg-blue-600" onClick={() =>{window.location.pathname = ("/detail/" + dataAcc.id+"/"+ dataAcc.title)}}>
                      <Link to={`/detail/${dataAcc.id}/${dataAcc.title}`}>
                        <FontAwesomeIcon icon={faTableList} />
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </LazyLoad>}
          </div>
        ))}
      </div>
    </>
  );
};

export default AccDemo;
