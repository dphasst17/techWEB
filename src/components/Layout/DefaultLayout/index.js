import Header from "~/components/Layout/DefaultLayout/Header";
import Footer from "./Footer";
import { useContext } from "react";
import { ApiContext } from "~/ContextApi/ContextApi";
import ScrollToTop from "./ScrollToTop";
import { useLocation } from "react-router-dom";
import Login from "~/Pages/Login";



function DefaultLayout({ children }) {
  const location = useLocation()
  const {handleSetHideResult} = useContext(ApiContext)
  return (
    <div className="wrapper">
      {location.pathname !== '/login' ? <>
      <Header />
      <div className="mainPage" onClick={handleSetHideResult}>
        <div className="content">{children}</div>
      </div>
      <Footer />
      <ScrollToTop />
      </>
      :<>
      <Login />
      </>
    }
    </div>
  );
}

export default DefaultLayout;
