import classNames from "classnames/bind";
import style from "./Home.module.scss";
import Slideshow from "./SlideShow";
import Product from "./Product-demo";
import AccDemo from "./Accessory-demo";
import ListItems from "./List/List";

const cx = classNames.bind(style);

function Home() {
  return (
    <div className={cx("home")}>
      <Slideshow />
      <ListItems />
      <Product />
      <AccDemo />
      
    </div>
  );
}

export default Home;
