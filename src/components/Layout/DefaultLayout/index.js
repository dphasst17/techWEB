import Header from "~/components/Layout/DefaultLayout/Header";
import Footer from "./Footer";
import { useContext } from "react";
import { ApiContext } from "~/ContextApi/ContextApi";



function DefaultLayout({ children }) {
  const {handleSetHideResult,setIsToggleNav} = useContext(ApiContext)
  return (
    <div className="wrapper">
      <Header />
      <div className="mainPage" onClick={handleSetHideResult}>
        <div className="content"onClick={() => {setIsToggleNav(false)}}>{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
