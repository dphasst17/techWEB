import "./Home.scss";
import Slideshow from "./SlideShow";
import NewsProduct from "./NewsProduct";
import React, { Suspense, useContext} from "react";
import { ApiContext } from "~/contexts/apiContext";
import Loading from "~/components/Loading/Loading";
import Selling from "./Selling";
import ProductView from "./ProductView";
import GetPosts from "./Posts";
import Sale from "./Sale";
import Alert from "../Alert";
import { StateContext } from "~/contexts/stateContext";


const Product = React.lazy(() => import('./Product-demo'));
const Contact = React.lazy(() => import('./Contact'));
function Home() {
  const {isLoad} = useContext(ApiContext)
  const {isAlert} = useContext(StateContext)
  return (
    <>
      <div className="home">
        
        <Slideshow />
        <Sale />
        <NewsProduct />
        <Selling />
        <ProductView />
        <Suspense fallback={<div>LOADING...</div>}><Product /></Suspense>
        <Suspense fallback={<div>LOADING...</div>}><GetPosts /></Suspense>
        <Suspense fallback={<div>LOADING...</div>}><Contact /></Suspense>
      </div>
      {isLoad === true && <Loading />}
      {isAlert && <Alert />}
    </>
  );
}

export default Home;
