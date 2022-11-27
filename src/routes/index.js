import Home from '~/Pages/Home';
import Product from '~/Pages/Product';
import Accessory from '~/Pages/Accessory';
import User from '~/Pages/User';
import Login from '~/Pages/Login';
import CartDetail from '~/Pages/CartDetail';

	//PublicRoutes
	const publicRoutes = [
    		{path: '/', component:Home},
			{path: '/accessory', component:Accessory}, 
			{path: '/product', component:Product}, 			
    		{path: '/cartdetail', component:CartDetail},
			{path: '/user', component:User},
			{path: '/login', component:Login},	

	]
	
	const privateRoutes = [

	]

	export {publicRoutes, privateRoutes}