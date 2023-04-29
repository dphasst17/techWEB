import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "../Home.module.scss";
import { CartContext } from "~/Contexts/Cart";
import { ApiContext } from "~/ContextApi/ContextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faTableList } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LazyLoad from 'react-lazy-load';

const cx = classNames.bind(style);

const AccDemo = () => {
  const { Access } = useContext(ApiContext);
  const [showElement, setShowElement] = useState(false);
  const [offSet, setOffSet] = useState(0)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    window.innerWidth >=800 ? setOffSet(10) : setOffSet(0)
  },[])
  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setShowElement(currentScrollPos > 3000);
    window.innerWidth >=800 
      ?currentScrollPos > 2000  ? setShowElement(true):setShowElement(false)
      :currentScrollPos > 3000  ? setShowElement(true):setShowElement(false)
  };
  return (
    <>
      {Access.length !==0 ? <h1>OUR ACCESSORY</h1> : <></>}
      <div className={cx("Access")}>
        {Access.slice(0, 12).map((dataAcc, index) => (
          <div className={cx("accDemo")} key={index}>
            {showElement && <LazyLoad height={"auto"} offset={offSet}>
              <div className={cx("accDemo_Child")}>
                <div className={cx("image")}>
                  <img src={dataAcc.url} alt="img Access demo" loading="lazy"/>
                </div>
                <div className={cx("title")}>
                  <p>{dataAcc.title}</p>
                </div>
                <div className={cx("accessInf")}>
                  <p>Brand: {dataAcc.brand}</p>
                  <p>Type: {dataAcc.type.toUpperCase()}</p>
                </div>
                <div className={cx("items-child")}>
                  <div className={cx("price")}>Price:{dataAcc.price} USD</div>
                  <div className={cx("button")}>
                    <CartContext.Consumer>
                      {({ addToCart }) => (
                        <button onClick={() => addToCart(dataAcc)}>
                          <FontAwesomeIcon icon={faCartShopping} />
                        </button>
                      )}
                    </CartContext.Consumer>
                    <button onClick={() =>{window.location.pathname = ("/detail/" + dataAcc.id+"/"+ dataAcc.title)}}>
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
