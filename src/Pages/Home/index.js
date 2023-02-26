import classNames from "classnames/bind";
import style from "./Home.module.scss";
import Slideshow from "./SlideShow";
import Product from "./Product-demo";
import AccDemo from "./Accessory-demo";
import ListItems from "./List/List";
import FeaturedProduct from "./FeaturedProduct";
import NewsProduct from "./NewsProduct";

const cx = classNames.bind(style);

function Home() {
  return (
    <div className={cx("home")}>
      <Slideshow />
      <ListItems />
      <FeaturedProduct />
      <NewsProduct />
      <Product />
      <AccDemo />
      
    </div>
  );
}

export default Home;
