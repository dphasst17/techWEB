import Footer from "./Footer";
import { useContext } from "react";
import { ApiContext } from "~/contexts/apiContext";
import ScrollToTop from "./ScrollToTop";
import { useLocation } from "react-router-dom";
import Login from "~/Pages/Login";
import Header from "./Header/Header";



function DefaultLayout({ children }) {
  const location = useLocation()
  const {handleSetHideResult} = useContext(ApiContext)
  return (
    <div className="wrapper">
      {location.pathname !== '/login' ? <>
      <Header />
      <div className="mainPage my-8" onClick={handleSetHideResult}>
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
