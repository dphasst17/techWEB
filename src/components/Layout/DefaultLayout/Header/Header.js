import { RiShoppingCartFill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { RiAccountBoxLine } from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import {useNavigate,useLocation } from 'react-router-dom';
import { useContext, useState } from "react";
import { CartContext } from "~/contexts/Cart";
import Cart from "./Cart";
import SearchResult from "./Search";
import { StateContext } from "~/contexts/stateContext";
const Header = () => {
    const {cartItems,decrementItems,incrementItems,deleteItems} = useContext(CartContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isCart,setIsCart] = useState(false)
    const [isUser,setIsUser] = useState(false)
    const [navMob,setNavMob] = useState(false)
    const [keyword,setKeyword] = useState('');
    const isLogin = JSON.parse(localStorage.getItem('isLogin') || false);
    const {isDark,setIsDark} = useContext(StateContext)
    const handleSetDarkMode = () => {
        setIsDark(!isDark)
        localStorage.setItem('dark',!isDark)
    }
    const arrNav = [
        {
            title:'Home',
            url:'/'
        },
        {
            title:'Product',
            url:'/product'
        },
        {
            title:'Post',
            url:'/post'
        },
        {
            title:'More',
            url:'/more'
        },
    ]
    const arrMore = [
        {
            title:'Account',
            url:'/user',
            icon:RiAccountBoxLine
        },
        {
            title:'Cart',
            url:'/cart',
            icon:CiBoxList
        },
    ]
    const classNav = (url,currentPath) => {
        return `w-1/5 h-4/5 hidden lg:flex items-center justify-center text-[18px] cursor-pointer rounded-lg ${currentPath === url ? 'bg-slate-300 text-slate-700':'bg-transparent text-white'} hover:text-slate-700 hover:bg-slate-300 transition-all font-bold`
    }
    const classNavMobile = `w-2/5 h-[15%] ${navMob ? 'flex':'hidden'} items-center justify-start text-[18px] text-slate-800 bg-slate-300 font-semibold rounded-lg px-2 transition-all`
    const classMore = `w-2/5 h-4/5 flex items-center justify-center rounded-lg hover:bg-slate-300 text-white hover:text-slate-700 cursor-pointer transition-all`
    const handleLogin = () => {
        if(!isLogin || isLogin === false){
            navigate('/login')
        }else{
            localStorage.clear()
            navigate('/login')
        }
    }
    return <header className="w-full h-[70px] flex justify-center items-center fixed bottom-5 !z-[100]">
        <nav className="w-[50px] sm:w-[70px] lg:w-1/4 lg:min-w-[300px] h-full flex flex-wrap justify-around items-center bg-slate-700 rounded-lg">
            <button onClick={() => {setNavMob(!navMob)}} className="w-2/5 lg:w-0  h-2/5 lg:h-0 text-slate-300">
                <FaBars className="w-full h-full"/>
            </button>
            <div className={`navMob ${navMob ? 'w-[60vw] sm:w-[40vw] h-[30vh]' : 'w-0 h-0'} fixed bottom-40 left-6 sm:left-10 lg:hidden flex flex-wrap justify-evenly content-evenly py-2 rounded-lg bg-slate-700 overflow-hidden transition-all`}>
                {arrNav.map(e => <div onClick={() => {navigate(`${e.url}`)}} className={`${classNavMobile}`} key={e.title}>
                    {e.title}
                </div>)}
                {arrMore.map(e => <div onClick={() => {navigate(`${e.url}`)}} className={`${classNavMobile}`} key={e.title}>
                    {e.title}
                </div>)}
                <button className={`${classNavMobile}`}>Dark Mode</button>
                <button className={`${classNavMobile}`}>Login</button>
            </div>
            {arrNav.map(n => <div key={n.title} onClick={() => {navigate(`${n.url}`)}} className={`${classNav(n.url,location.pathname)}`}>
                {n.title}
            </div>)}
        </nav>
        {/* Search */}
        <div className="search min-w-[60vw] md:min-w-[0vw] w-4/5 lg:w-1/4 h-full flex items-center justify-around bg-slate-700 rounded-lg mx-2">
            <input 
                type="text" 
                onChange={(e) => {setKeyword(e.target.value)}}
                className="w-3/4 h-3/4 rounded-lg outline-none px-2 text-[18px]" placeholder="Search..."/>
            <button onClick={() => {keyword !== "" && navigate(`/search/${keyword}`)}} 
            className="min-w-[60px] w-1/5 h-3/4 bg-slate-800 hover:bg-slate-300 text-white hover:text-slate-700 font-bold text-[20px] overflow-hidden whitespace-nowrap text-ellipsis rounded-lg transition-all">Search</button>
        </div>
        <div className={`result ${keyword !== '' ? 'w-[500px] h-[320px]' :'w-0 h-0'} hidden lg:flex flex-wrap overflow-hidden fixed bottom-40 ml-[15%] bg-slate-700 rounded-lg transition-all`}>
            {keyword !== '' && <SearchResult props={{keyword}}/>}
            {keyword !== '' && <div onClick={() => {keyword !== '' && navigate(`/search/${keyword}`)}} className={`btnCart w-2/4 h-1/5 flex justify-center items-center my-2 px-2 transition-all overflow-auto`}>
                <button className="w-[150px] h-[40px] rounded-lg text-[16px] font-bold text-slate-300 hover:text-slate-700 hover:bg-slate-300 transition-all">
                        View More
                </button>
            </div>}
            <div onClick={() => {setKeyword('')}} className={`btnCart w-2/4 h-1/5 flex justify-center items-center my-2 px-2 transition-all overflow-auto`}>
                <button className="w-[150px] h-[40px] rounded-lg text-[16px] font-bold text-slate-300 hover:text-slate-700 hover:bg-slate-300 transition-all">
                        Close
                </button>
            </div>
        </div>
        {/* More */}
        <div className="more w-[200px] h-full hidden lg:flex justify-around items-center bg-slate-700 rounded-lg">
            {/* Cart */}
            <div className={`${classMore}`} onClick={() => {setIsCart(!isCart); isUser === true && setIsUser(false)}}>
                <RiShoppingCartFill className="text-[25px]" />
                <div className="cartNoti w-[20px] h-[20px] flex items-center justify-center fixed text-white -mt-[33px] -mr-[3%] bg-red-500 rounded-md">{cartItems?.length}</div>
            </div>
            <div className={`cartDetail ${!isCart ? 'w-0 h-0' :'w-[600px] h-[300px]'} bg-slate-700 fixed bottom-40 right-[5vw] rounded-lg transition-all overflow-hidden`}>
                {isCart && <Cart props={{cartItems,decrementItems,incrementItems,deleteItems}} />}
                <div className="btnCart w-full h-1/5 flex items-center px-2">
                    <button onClick={() => {navigate('/cart')}} className="w-[150px] h-[40px] rounded-lg text-[16px] font-bold text-slate-300 hover:text-slate-700 hover:bg-slate-300 transition-all">
                        See All Product
                    </button>
                </div>
            </div>
            {/* User */}
            <div className={`${classMore}`} onClick={() => {setIsUser(!isUser); isCart === true && setIsCart(false)}}>
                <FaRegUser className="text-[25px]"/>
            </div>
            <div className={`userDetail ${!isUser ? 'w-0 h-0' :'w-[200px] h-[150px]'} flex flex-col justify-around items-center bg-slate-700 fixed bottom-40 mx-2 right-2 xl:right-[22vw] 2xl:right-[19vw] rounded-lg transition-all overflow-hidden`}>
                {isUser && arrMore.map(m => <div onClick={() => {navigate(`${m.url}`)}} className="w-[90%] h-1/5 bg-slate-700 hover:bg-slate-300 text-slate-300 hover:text-slate-700 flex justify-start rounded-lg cursor-pointer transition-all">
                    {< m.icon className="w-[20px] h-full mx-2 font-semibold" />}
                    <span className="w-2/4 h-full flex items-center justify-start text-[15px] font-semibold">{m.title}</span>
                </div>)}
                {isUser && <button onClick={() => {handleSetDarkMode()}} className="btnAuth w-[90%] h-[25px] bg-slate-300 text-[18px] font-bold text-slate-700 rounded-lg">{isDark === true ? 'Light':'Dark'} Mode</button>}
                {isUser && <button onClick={() => {handleLogin()}} className="btnAuth w-[90%] h-[25px] bg-slate-300 text-[18px] font-bold text-slate-700 rounded-lg">{isLogin ? 'Logout':'Login'}</button>}
            </div>
        </div>
    </header>
}
export default Header