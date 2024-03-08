import { useContext } from "react";
import { FaEye } from "react-icons/fa";
import { RiShoppingCartFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom"
import { ApiContext } from "~/contexts/apiContext";
import { StateContext } from "~/contexts/stateContext";
import { ViewBrandAndType } from "./viewMultiBtn";
const ProductLayoutBasic = ({ props }) => {
    const navigate = useNavigate()
    const { addToCart } = useContext(ApiContext)
    const { isDark } = useContext(StateContext)
    const { percentDiscount } = useContext(ApiContext)
    return <div className={`items relative md:flex-[1_1_15%] w-[160px] ssm:w-[200px] lg:w-[210px] min-w-[200px] max-w-[400px] h-[280px] border border-solid ${isDark ? 'border-white' : 'border-slate-700'} animate m-4 p-2 rounded-lg cursor-pointer`} key={props.d.id}>
        {props.d.discount > 0 && <div
            className="absolute w-[30px] h-[30px] text-[10px] flex items-center justify-center text-white rounded-md bg-red-500">
            -{props.d.discount}%
        </div>}
        <div
            onClick={() => addToCart(props.product, 1)}
            className={`absolute w-[30px] h-[30px] ${props.d.discount > 0 ? 'top-16' : 'top-2'} flex items-center justify-center text-white rounded-md bg-red-500`}>
            <RiShoppingCartFill />
        </div>
        <div
            onClick={() => {
                navigate(
                    `/detail/${props.d.idType}/${props.d.type}/${props.d.idProduct}/${props.d.nameProduct}`
                );
            }}
            className={`absolute w-[30px] h-[30px] ${props.d.discount > 0 ? 'top-1/4' : 'top-[40px]'} flex items-center justify-center text-white rounded-md bg-red-500`}>
            <FaEye />
        </div>
        <div className="img w-full h-2/4">
            <img className="w-full h-full object-contain" src={props.d.imgProduct} alt="" />
        </div>
        <div className="content w-full h-2/4 flex flex-wrap justify-around items-center">
            <span className={`w-full flex items-center justify-center text-[20px] ${isDark ? 'text-slate-200' : 'text-slate-700'} font-BOO font-semibold `}>
                <span className="overflow-hidden whitespace-nowrap text-ellipsis">{props.d.nameProduct}</span>
            </span>
            <ViewBrandAndType props={{brand:props.d.brand,type:props.d.nameType,height:'2/4',navigate}}/>
            <span className={`w-full font-bold text-[20px] ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                <span className="text-slate-400 mx-2 line-through">{props.d.price}</span>
                <span className="text-red-600 mx-2 font-ps2">{percentDiscount(props.d.discount, props.d.price)}</span>$
            </span>
        </div>
    </div>
}
export default ProductLayoutBasic