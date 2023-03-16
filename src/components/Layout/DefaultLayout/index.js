import Header from "~/components/Layout/DefaultLayout/Header";
import Footer from "./Footer";
import { useContext } from "react";
import { ApiContext } from "~/ContextApi/ContextApi";
import ScrollToTop from "./ScrollToTop";



function DefaultLayout({ children }) {
  const {handleSetHideResult} = useContext(ApiContext)
  return (
    <div className="wrapper">
      <Header />
      <div className="mainPage" onClick={handleSetHideResult}>
        <div className="content">{children}</div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default DefaultLayout;
