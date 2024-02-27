import { useContext, } from "react";
import { useNavigate } from "react-router-dom";

import { ApiContext } from "~/contexts/apiContext";
import { StateContext } from "~/contexts/stateContext";
import { RiShoppingCartFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { CartContext } from "~/contexts/Cart";
const Sale = () => {
    const {addToCart} = useContext(CartContext)
    const {isDark,saleData} = useContext(StateContext)
    const { percentDiscount } = useContext(ApiContext);
    const navigate = useNavigate();
    return <div className="h-sale w-full h-auto flex flex-wrap justify-center items-center">
        {saleData !== null && saleData?.length !== 0 && saleData?.map(s =>
            <>
                <h1 className="font-pr textEffect animate">{s.title}</h1>
                <span className="font-medium text-[40px] font-honk animate">{s.startDate} - {s.endDate}</span>
                <div className="saleDetail w-full lg:w-[90%] h-auto flex flex-wrap justify-around 2xl:justify-start items-center px-8">
                    {
                        s.detail.map(d => <div className={`items relative w-[200px] lg:w-[17%] 2xl:w-[18%] 3xl:w-[20%] min-w-[200px] h-[280px] border border-solid ${isDark ? 'border-white' : 'border-slate-700'} animate mx-7 my-4 p-2 rounded-lg cursor-pointer`} key={d.id}>
                            <div 
                                className="absolute w-[30px] h-[30px] text-[10px] flex items-center justify-center text-white rounded-md bg-red-500">
                                -{d.discount}%
                            </div>
                            <div 
                                onClick={() => addToCart(d, 1)}
                                className="absolute w-[30px] h-[30px] top-16 flex items-center justify-center text-white rounded-md bg-red-500">
                                <RiShoppingCartFill/>
                            </div>
                            <div 
                                onClick={() => {
                                    navigate(
                                      `/detail/${d.idType}/${d.type}/${d.idProduct}/${d.nameProduct}`
                                    );
                                  }}
                                className="absolute w-[30px] h-[30px] top-1/4 flex items-center justify-center text-white rounded-md bg-red-500">
                                <FaEye/>
                            </div>
                            <div className="img w-full h-2/4">
                                <img className="w-full h-full object-contain" src={d.imgProduct} alt="" />
                            </div>
                            <div className="content w-full h-2/4 flex flex-wrap justify-around items-center">
                                <span className={`w-full flex items-center justify-center text-[20px] ${isDark ? 'text-slate-200' : 'text-slate-700'} font-BOO font-semibold `}>
                                    <span className="overflow-hidden whitespace-nowrap text-ellipsis">{d.nameProduct}</span>
                                </span>
                                <span onClick={() => {navigate(`/search/${d.brand}`)}} className="w-2/5 h-[30px] flex items-center justify-center rounded-[5px] bg-gray-700 font-han text-[20px] text-gray-200 font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
                                    {d.brand.toUpperCase()}
                                </span>
                                <span onClick={() => {navigate(`/search/${d.type}`)}} className="w-2/5 h-[30px] flex items-center justify-center rounded-[5px] bg-gray-700 font-han text-[20px] text-gray-200 font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
                                    {d.type.toUpperCase()}
                                </span>
                                <span className={`w-full font-bold text-[20px] ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                                    Price: <span className="text-slate-400 mx-2 line-through">{d.price}</span>
                                    <span className="text-red-600 mx-2 font-ps2">{percentDiscount(d.discount, d.price)}</span>USD
                                </span>
                            </div>
                        </div>)
                    }
                </div>
            </>
        )}
    </div>
}
export default Sale;