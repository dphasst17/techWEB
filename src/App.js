
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "~/routes/index.js";
import { DefaultLayout } from "~/components/Layout";
import { Fragment } from "react";
import { CartProvider } from "./Contexts/Cart";
import { ApiProvider } from "./ContextApi/ContextApi";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
    <CartProvider>
      <ApiProvider>
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
            </Routes>
          </div>
        </Router>
      </ApiProvider>
    </CartProvider>
  );
}

export default App;
