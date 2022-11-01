import Home from '~/Pages/Home';
import Contact from '~/Pages/Contact';
import Product from '~/Pages/Product';
import Accessory from '~/Pages/Accessory';

	//PublicRoutes
	const publicRoutes = [
    		{path: '/', component:Home},
			{path: '/accessory', component:Accessory}, 
			{path: '/product', component:Product}, 			
    		{path: '/contact', component:Contact},		

	]
	const privateRoutes = [

	]

	export {publicRoutes, privateRoutes}