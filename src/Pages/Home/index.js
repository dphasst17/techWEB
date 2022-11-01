import classNames from "classnames/bind";
import style from './Home.module.scss';
import Slideshow from './SlideShow';
import Product from './Product-demo'

const cx = classNames.bind(style)

function Home() {
    return <div className={cx('home')}>
        <Slideshow></Slideshow>
        <Product></Product>
        <button className={cx('more')}><a href="/product">Xem thêm...</a></button>
    </div>;
}

export default Home;