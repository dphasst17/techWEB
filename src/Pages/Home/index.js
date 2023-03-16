import classNames from "classnames/bind";
import style from "./Home.module.scss";
import Slideshow from "./SlideShow";
/* import Product from "./Product-demo"; */
/* import AccDemo from "./Accessory-demo"; */
/* import ListItems from "./List/List"; */
import FeaturedProduct from "./FeaturedProduct";
import NewsProduct from "./NewsProduct";
import React, { Suspense } from "react";

const cx = classNames.bind(style);
const Product = React.lazy(() => import('./Product-demo'));
const AccDemo = React.lazy(() => import('./Accessory-demo'));
function Home() {
  return (
    <div className={cx("home")}>
      <Slideshow />
{/*       <ListItems /> */}
      <FeaturedProduct />
      <NewsProduct />
      
      <Suspense fallback={<div>LOADING...</div>}><Product /></Suspense>
      <Suspense fallback={<div>LOADING...</div>}><AccDemo /></Suspense>
      
    </div>
  );
}

export default Home;
