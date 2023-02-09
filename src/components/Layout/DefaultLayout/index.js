import classNames from "classnames/bind";
import style from "./DefaultLayout.module.scss";
import Header from "~/components/Layout/DefaultLayout/Header";
import Footer from "./Footer";
import { useContext } from "react";
import { ApiContext } from "~/ContextApi/ContextApi";

const cx = classNames.bind(style);

function DefaultLayout({ children }) {
  const {handleSetHideResult} = useContext(ApiContext)
  return (
    <div className={cx("wrapper")} >
      <Header />
      <div className="mainPage" onClick={handleSetHideResult}>
        <div className="content">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
