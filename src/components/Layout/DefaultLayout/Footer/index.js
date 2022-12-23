import classNames from "classnames/bind";
import style from "./Footer.module.scss"

const cx = classNames.bind(style);

function Footer() {
    return ( 
        <div className={cx("footer")}>
            This is Footer
        </div>
     );
}

export default Footer;