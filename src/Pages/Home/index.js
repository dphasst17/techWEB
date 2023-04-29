import classNames from "classnames/bind";
import style from "./Home.module.scss";
import Slideshow from "./SlideShow";
import FeaturedProduct from "./FeaturedProduct";
import NewsProduct from "./NewsProduct";

import React, { Suspense } from "react";


const cx = classNames.bind(style);
const Product = React.lazy(() => import('./Product-demo'));
const AccDemo = React.lazy(() => import('./Accessory-demo'));
const Contact = React.lazy(() => import('./Contact'));
function Home() {
  return (
    <div className={cx("home")}>
      <Slideshow />
      <FeaturedProduct />
      <NewsProduct />
      
      <Suspense fallback={<div>LOADING...</div>}><Product /></Suspense>
      <Suspense fallback={<div>LOADING...</div>}><AccDemo /></Suspense>
      
      <Suspense fallback={<div>LOADING...</div>}><Contact /></Suspense>
    </div>
  );
}

export default Home;
