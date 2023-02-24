import Home from "~/Pages/Home";
import Product from "~/Pages/Product";
import Accessory from "~/Pages/Accessory";
import User from "~/Pages/User";
import Login from "~/Pages/Login";
import SignUp from "~/Pages/SignUp";
import CheckOut from "~/Pages/CheckOut";
import SearchResult from "~/Pages/SearchResult/SearchResult";
import ProductDetail from "~/Pages/ProductDetail";
import Success from "~/Pages/Success";

//PublicRoutes
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/accessory", component: Accessory },
  { path: "/product", component: Product },
  { path: "/detail/:productID", component: ProductDetail },
  { path: "/checkout", component: CheckOut },
  { path: "/success", component: Success },
  { path: "/searchResult", component: SearchResult },
  { path: "/user", component: User },
  { path: "/login", component: Login },
  { path: "/signup", component: SignUp },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
