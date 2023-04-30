import classNames from "classnames/bind";
import style from "./Home.module.scss";
import Slideshow from "./SlideShow";
import FeaturedProduct from "./FeaturedProduct";
import NewsProduct from "./NewsProduct";

import React, { Suspense, useContext } from "react";
import { ApiContext } from "~/ContextApi/ContextApi";
import Loading from "~/components/Loading/Loading";


const cx = classNames.bind(style);
const Product = React.lazy(() => import('./Product-demo'));
const AccDemo = React.lazy(() => import('./Accessory-demo'));
const Contact = React.lazy(() => import('./Contact'));
function Home() {
  const {isLoad} = useContext(ApiContext)
  return (
    <>
      <div className={cx("home")}>
        <Slideshow />
        <FeaturedProduct />
        <NewsProduct />
        
        <Suspense fallback={<div>LOADING...</div>}><Product /></Suspense>
        <Suspense fallback={<div>LOADING...</div>}><AccDemo /></Suspense>
        
        <Suspense fallback={<div>LOADING...</div>}><Contact /></Suspense>
      </div>
      {/* {isLoad === true && <Loading />} */}
    </>
  );
}

export default Home;
