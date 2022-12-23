import classNames from "classnames/bind";
import style from "./Home.module.scss";
import Slideshow from "./SlideShow";
import Product from "./Product-demo";
import AccDemo from "./Accessory-demo";

const cx = classNames.bind(style);

function Home() {
  return (
    <div className={cx("home")}>
      <Slideshow />
      <Product />

      <button className={cx("more")}>
        <a href="/product">Load more...</a>
      </button>
      <AccDemo />
      <button className={cx("more")}>
        <a href="/accessory">Load more...</a>
      </button>
    </div>
  );
}

export default Home;
