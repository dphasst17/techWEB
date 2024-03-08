import { useContext } from "react";
import { StateContext } from "~/contexts/stateContext";

const SameType = ({props}) => {
    const {product} = useContext(StateContext);
    return <div className="product-sameType w-full h-auto flex flex-wrap justify-around items-center px-4 my-10 transition-all">
        {product !== null && product.filter(f => f.type === props.nameType)[0].data.filter(e => e.idProduct !== Number(props.idProduct))
            .slice(0,8).map(e => <div className="flex-[2_2_10%] sameDetail w-[220px] h-[250px] bg-zinc-800 rounded-lg 3xl:my-0 my-4 mx-4">
                <div className="w-full h-[30%] flex items-center justify-center">
                    <img className="w-3/5 h-full object-contain" src={e.imgProduct} alt="img-product-same-type"/>
                </div>
                <div className="w-full h-[70%] flex flex-wrap justify-around items-center">
                    <span className="w-full text-blue-700 font-semibold text-center overflow-hidden whitespace-nowrap text-ellipsis">
                        {e.nameProduct}
                    </span>
                    <span className="w-full text-slate-300 font-semibold">
                        Price: 
                        <span className="text-slate-300 font-semibold">{e.price}</span> USD
                    </span>
                    <div className="w-2/5 h-[20%] flex items-center justify-center rounded-lg bg-slate-600 text-slate-100 font-semibold  my-1 cursor-pointer px-1">
                        <span className="overflow-hidden whitespace-nowrap text-ellipsis">{e.nameType.toUpperCase()}</span>
                    </div>
                    <div className="w-2/5 h-[20%] flex items-center justify-center rounded-lg bg-slate-600 text-slate-100 font-semibold  my-1 cursor-pointer px-1">
                        <span className="overflow-hidden whitespace-nowrap text-ellipsis">{e.brand.toUpperCase()}</span>
                    </div>
                    <button className="w-4/5 h-[30px] rounded-lg bg-blue-500 text-white font-bold">Add to cart</button>
                </div>
            </div>)
        }
    </div>
}
export default SameType;