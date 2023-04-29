
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "~/routes/index.js";
import { DefaultLayout } from "~/components/Layout";
import { Fragment } from "react";
import { CartProvider } from "./Contexts/Cart";
import { ApiProvider } from "./ContextApi/ContextApi";


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import PrivateRoute from "./components/Private/PrivateRoute";

const firebaseConfig = {
  apiKey: "AIzaSyCXRWsJ6358VWxdjWYcgLRAZRU1VQZx03w",
  authDomain: "tech-store-ca5b0.firebaseapp.com",
  projectId: "tech-store-ca5b0",
  storageBucket: "tech-store-ca5b0.appspot.com",
  messagingSenderId: "550589024496",
  appId: "1:550589024496:web:e515b287be77558f601a35",
  measurementId: "G-9ZSS1QP8WM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {

  return (
    <ApiProvider>
      <CartProvider>
          
            <Router>
              <div className="App">
                <Routes>
                  {publicRoutes.map((route, index) => {
                    const Pages = route.component;
      
                    let Layout = DefaultLayout;
      
                    if (route.layout) {
                      Layout = route.layout;
                    } else if (route.layout === null) {
                      Layout = Fragment;
                    }
                    if (route.path === '/checkout' || route.path === '/user') {
                      return (
                        <PrivateRoute
                          key={index}
                          path={route.path}
                          element={
                            <Layout>
                              <Pages />
                            </Layout>
                          }
                        />
                      );
                    }
                    return (
                      <Route
                        key={index}
                        path={route.path}
                        element={
                          <Layout>
                            <Pages/>
                          </Layout>
                        }
                      />
                    );
                  })}
                  
                  {privateRoutes.map((route, index) => {
                const Pages = route.component;

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
                      <PrivateRoute>
                        <Layout>
                          <Pages />
                        </Layout>
                      </PrivateRoute>
                    }
                  />
                );
              })}
                </Routes>
              </div>
            </Router>
          
        </CartProvider>
    </ApiProvider>
  );
}

export default App;
