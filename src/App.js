import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "~/routes/index.js";
import { DefaultLayout } from "~/components/Layout";
import { Fragment } from "react";
import { CartProvider } from "./Contexts/Cart";
import { ApiProvider } from "./ContextApi/ContextApi";



function App() {


  return (
    <CartProvider>
      <ApiProvider>
        <Router>
          <div className="App">
            <Routes>
              {publicRoutes.map((route, index) => {
                const Page = route.component;
  
                let Layout = DefaultLayout;
  
                if (route.layout) {
                  Layout = route.layout;
                } else if (route.layout === null) {
                  Layout = Fragment;
                }
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                );
              })}
            </Routes>
          </div>
        </Router>
      </ApiProvider>
    </CartProvider>
  );
}

export default App;
