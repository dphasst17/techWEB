import { useContext } from "react"
import { StateContext } from "~/contexts/stateContext"
import ButtonViewDetail from "../Button/viewDetail"
import { CartContext } from "~/contexts/Cart"
import { ApiContext } from "~/contexts/apiContext"
import { ButtonTextAddCart } from "../Button/addCart"
//data,slice,optionType
const ProductLayout = ({props}) => {
    const {percentDiscount} = useContext(ApiContext)
    const {isDark,type} = useContext(StateContext)
    const {addToCart} = useContext(CartContext)
    return <div className="show w-full min-h-[693px] flex flex-wrap justify-around items-start pb-[1%]">
    {props.data !== null &&
      (props.data.length > 12
        ? props.data.slice(props.Slice - 12, props.Slice)
        : props.data.slice(0)
      ).map((product) => (
        <div
          className={`product-detail  w-1/5 h-2/5 mt-[3%] ml-[4%] min-w-[150px] animateOpacity transition-all cursor-pointer`}
          key={product.id}
        >
          <div className={`detail-box w-full ${isDark ? 'bg-gray-200 hover:bg-zinc-300' : 'bg-white hover:bg-zinc-200'} flex flex-col justify-around rounded-[16px]`}>
            <div className="itemsImg relative w-full h-4/5 flex p-2 justify-between overflow-hidden">
              {product.discount !== 0 && <div className="absolute w-[50px] h-[30px] flex items-center justify-center text-white rounded-md bg-red-500">Sale</div>}
              <img
                src={product.imgProduct}
                alt="img Product Laptop"
                className="w-full h-[130px] object-contain"
              />
              {product.discount !== 0 && <div className="absolute w-[50px] h-[30px] top-20 flex items-center justify-center text-white rounded-md bg-red-500">{product.discount}%</div>}
            </div>
            <div className="title w-full h-1/5">
              <h4
                className={`text-center text-[18px] ${
                  isDark ? "text-slate-700" : "text-[#bc0c0c]"
                }  font-semibold overflow-hidden whitespace-nowrap text-ellipsis`}
              >
                {product.nameProduct}
              </h4>
            </div>

            <div className="infProduct w-full h-1/2 flex flex-col">
              {type
                ?.filter((f) => f.type === props.optionType)[0]
                ?.detail.filter((dFilter) => dFilter.displayorder <= 4)
                ?.map((e) => (
                  <span className={`text-[16px]  text-zinc-700 font-bold ml-[5%] overflow-hidden whitespace-nowrap text-ellipsis`}>
                    {e.displayname.toUpperCase()}:{" "}
                    {product.detail.map((d) => d[e.name])}
                  </span>
                ))}
            </div>

            <span className="font-semibold text-[16px] text-slate-700 ml-[5%]">
              Price: {product.discount !== 0 ? (<><span className="text-red-600 font-medium line-through">{product.price}</span> {percentDiscount(product.discount,product.price)}</>) : product.price} USD
            </span>
            <div className="button w-full h-[12%] flex justify-around mb-[5%]">
              <ButtonTextAddCart props={{addToCart,product,width:'3/5'}}/>
              <ButtonViewDetail props={{
                url:`/detail/${product.idType}/${product.nameType}/${product.idProduct}/${product.nameProduct}`,
                width:'w-3/4 lg:w-[30%]'
              }}/>
            </div>
          </div>
        </div>
      ))}
  </div>
}
export default ProductLayout