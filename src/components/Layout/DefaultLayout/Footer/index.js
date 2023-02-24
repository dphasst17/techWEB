import classNames from "classnames/bind";
import style from "./Footer.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons";
import {FcGoogle } from "react-icons/fc";


const cx = classNames.bind(style);

function Footer() {
    return ( 
        <div className={cx("footer")}>
            <div className={cx("items")}>
                <h3>CONTACT US</h3>
                <div className={cx("iconFooter")}>
                    <div className={cx("detail")}><FontAwesomeIcon icon={faFacebook}/><span>Facebook</span></div>
                    <div className={cx("detail")}><FontAwesomeIcon icon={faGithub}/><span>Github</span></div>
                    <div className={cx("detail")}><FcGoogle/><span>Gmail</span></div>
                </div>
            </div>
            <div className={cx("items")}>
                <div className={cx("service")}>
                    <div className={cx("serviceDetail")}>POLICIES AND SERVICES</div>
                    <div className={cx("serviceDetail")}>WARRANTY SERVICES</div>
                </div>
                <div className={cx("service")}>COPYRIGHT©D-FAST @2023</div>
            </div>
        </div>
     );
}

export default Footer;