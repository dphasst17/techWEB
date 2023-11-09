import { useContext, useEffect, useMemo } from "react";
import { StateContext } from "~/contexts/stateContext";

const SameType = ({props}) => {
    const {
        laptop,
        keyboard,
        monitor,
        vga,
        memory,
        storage,
        mouse,
      } = useContext(StateContext);
    const type = useMemo(() => ({
        '1': laptop,
        '2': keyboard,
        '3': monitor,
        '4': vga,
        '5': memory,
        '6': storage,
        '7': mouse,
    }),[laptop, keyboard, monitor, vga, memory, storage, mouse])
    return <div className="product-sameType w-full h-auto flex flex-wrap justify-between items-center px-4 my-10">
        {type[props.idType] !== null && 
            type[props.idType].filter(e => e.idProduct !== Number(props.idProduct))
            .slice(0,8).map(e => <div className="sameDetail w-[200px] h-[280px] bg-slate-300 rounded-lg">
                <div className="w-full h-1/4 flex items-center justify-center">
                    <img className="w-3/5 h-full object-contain" src={e.imgProduct} alt="img-product-same-type"/>
                </div>
                <div className="w-full h-2/4 flex flex-col justify-center">
                    <span className="text-blue-700 font-semibold text-center overflow-hidden whitespace-nowrap text-ellipsis">{e.nameProduct}</span>
                    <span className="text-slate-700 font-semibold">
                        Price: 
                        <span className="text-blue-700 font-semibold">{e.price}</span> USD
                    </span>
                    <div className="detailInfo w-full h-3/5 flex flex-wrap justify-center">
                        <div className="w-4/5 h-[35%] flex items-center justify-center rounded-lg bg-slate-600 text-slate-100 font-semibold cursor-pointer">{e.nameType.toUpperCase()}</div>
                        <div className="w-4/5 h-[35%] flex items-center justify-center rounded-lg bg-slate-600 text-slate-100 font-semibold cursor-pointer">{e.brand.toUpperCase()}</div>
                    </div>
                </div>
                <div className="btnDetail w-full h-1/4 flex items-center justify-center">
                    <button className="w-4/5 h-3/5 rounded-lg bg-blue-500 text-white font-bold">Add to cart</button>
                </div>
            </div>)
        }
    </div>
}
export default SameType;