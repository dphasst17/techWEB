import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "~/routes/index.js";
import { DefaultLayout } from "~/components/Layout";
import { Fragment } from "react";
import { CartProvider } from "./contexts/Cart";
import { ApiProvider } from "./contexts/apiContext";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import PrivateRoute from "./components/Private/PrivateRoute";
import { StateProvider } from "./contexts/stateContext";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_URL_KEY,
  authDomain: "tech-store-ca5b0.firebaseapp.com",
  projectId: "tech-store-ca5b0",
  storageBucket: "tech-store-ca5b0.appspot.com",
  messagingSenderId: "550589024496",
  appId: "1:550589024496:web:e515b287be77558f601a35",
  measurementId: "G-9ZSS1QP8WM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <StateProvider>
      <ApiProvider>
        <CartProvider>
          <Router>
            <div className="App">
              <Routes>
                {publicRoutes.map((route) => {
                  const Pages = route.component;
  
                  let Layout = DefaultLayout;
  
                  if (route.layout) {
                    Layout = route.layout;
                  } else if (route.layout === null) {
                    Layout = Fragment;
                  }
                  if (route.path === "/checkout" || route.path === "/user") {
                    return (
                      <PrivateRoute
                        key={route.path}
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
                      key={route.path}
                      path={route.path}
                      element={
                        <Layout>
                          <Pages />
                        </Layout>
                      }
                    />
                  );
                })}
  
                {privateRoutes.map((route) => {
                  const Pages = route.component;
  
                  let Layout = DefaultLayout;
  
                  if (route.layout) {
                    Layout = route.layout;
                  } else if (route.layout === null) {
                    Layout = Fragment;
                  }
  
                  return (
                    <Route
                      key={route.path}
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
    </StateProvider>
  );
}

export default App;
