import Home from "~/Pages/Home";
import Product from "~/Pages/Product";
import More from "~/Pages/More";
import User from "~/Pages/User";
import Login from "~/Pages/Login";
import CheckOut from "~/Pages/CheckOut";
import SearchResult from "~/Pages/SearchResult";
import ProductDetail from "~/Pages/ProductDetail/index";
import Success from "~/Pages/Success";
import Cart from "~/Pages/Cart";
import PageErr from "~/Pages/Error";
import PostsDetail from "~/Pages/Posts";

//PublicRoutes
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/more", component: More },
  { path: "/product", component: Product },
  { path: "/detail/:idType/:nameType/:productID/:productTitle", component: ProductDetail },
  { path: "/posts/detail/:idPosts/:postsTitle", component: PostsDetail },
  { path: "/cart", component: Cart },
  { path: "/search/:keyword", component: SearchResult },
  { path: "/login", component: Login },
  { path: "/*", component: PageErr } 
];

const privateRoutes = [
  { path: "/user", component: User },
  { path: "/checkout", component: CheckOut },
  { path: "/success", component: Success },
];
export { publicRoutes, privateRoutes};
