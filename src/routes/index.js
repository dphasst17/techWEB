import Home from '~/Pages/Home';
import Product from '~/Pages/Product';
import Accessory from '~/Pages/Accessory';
import User from '~/Pages/User';
import Login from '~/Pages/Login';
import CartDetail from '~/Pages/CartDetail';
import News from '~/Pages/News';

	//PublicRoutes
	const publicRoutes = [
    		{path: '/', component:Home},
			{path: '/accessory', component:Accessory}, 
			{path: '/product', component:Product}, 			
    		{path: '/cartdetail', component:CartDetail},
			{path: '/user', component:User},
			{path: '/login', component:Login},
			{path: '/news', component:News},	

	]
	
	const privateRoutes = [

	]

	export {publicRoutes, privateRoutes}