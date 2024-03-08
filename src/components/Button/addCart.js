import { RiShoppingCartFill } from "react-icons/ri"

export const ButtonTextAddCart = ({props}) => {
    return <button
    className={`w-${props.width} h-[30px] px-[2%] text-[16px] font-bold text-white rounded-[5px] bg-slate-900 hover:bg-gray-100 hover:border border-solid border-slate-900 hover:text-slate-700 transition-all cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis`}
    onClick={() => props.addToCart(props.product, 1)}
  >
    ADD TO CART
  </button>
}
export const ButtonIconAddCart = ({props}) => {
    return <button
    className={`${props.width} h-[30px] flex items-center justify-center px-[2%] text-[16px] font-bold text-white rounded-[5px] bg-slate-900 hover:bg-gray-100 hover:border border-solid border-slate-900 hover:text-slate-700 transition-all cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis`}
    onClick={() => props.addToCart(props.product, 1)}
  >
   <RiShoppingCartFill className="text-[20px]"/>
  </button>
}
