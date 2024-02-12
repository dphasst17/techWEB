import { useContext } from "react";
import { BsCartXFill } from "react-icons/bs";
import { ApiContext } from "~/contexts/apiContext";
const Cart = ({props}) => {
    const {percentDiscount} = useContext(ApiContext)
    return <div className="cartDetail w-full h-4/5 flex flex-col justify-around items-center">
        {props.cartItems?.slice(0,4).map(c => <div className="w-[98%] h-1/5 flex justify-around items-center hover:bg-slate-300 text-slate-300 hover:text-slate-700 rounded-lg cursor-pointer transition-all">
            <div className="img w-1/5 h-[90%]">
                <img src={c.imgProduct} className="w-full h-full object-contain" alt="img"/>
            </div>
            <div className="name w-2/5 h-full flex flex-col">
                <span className="overflow-hidden whitespace-nowrap text-ellipsis">{c.nameProduct}</span>
                <span>
                    Price: 
                    <span className="text-slate-400 mx-2 line-through">{c.price}</span>
                    <span className="text-red-600 mx-2 font-ps2">{percentDiscount(c.discount, c.price)}</span>USD
                </span>
            </div>
            <div className="count w-1/5 h-full flex items-center text-[20px]">
                <span
                onClick={() => props.decrementItems(c.idCart)} 
                className="w-1/4 h-[90%] flex justify-center items-center cursor-pointer hover:bg-slate-700 hover:text-slate-300 rounded-lg transition-all">
                    -
                </span>
                <span className="w-2/4 flex justify-center items-center cursor-pointer">{c.count}</span>
                <span
                onClick={() => props.incrementItems(c.idCart)}  
                className="w-1/4 h-[90%] flex justify-center items-center cursor-pointer hover:bg-slate-700 hover:text-slate-300 rounded-lg transition-all">
                    +
                </span>
            </div>
            <div 
                onClick={() => props.deleteItems(c.idCart)}  
            className="remove w-[10%] h-[90%] flex items-center justify-center cursor-pointer hover:bg-slate-700 hover:text-slate-300 rounded-lg transition-all">
                <BsCartXFill className="w-[35%] h-full" />
            </div>
        </div>)}
    </div>
}
export default Cart