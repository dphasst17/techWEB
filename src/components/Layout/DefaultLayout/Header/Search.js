import { useContext, useEffect, useState } from "react"
import { StateContext } from "~/contexts/stateContext"

const SearchResult = ({props}) => {
  const {product} = useContext(StateContext);
  const [result,setResult] = useState(null)
  useEffect(() => {product !== null && props.keyword !== '' && 
    setResult(
      product.flatMap(e => e.data)
      .filter(f => 
        f.nameProduct.toLowerCase().includes(props.keyword.toLowerCase())
      )
    )},[product,props.keyword])
  return  <div className="search-result w-full h-auto min-h-[200px] flex flex-col justify-around items-center py-2">
    {result !== null && result.slice(0,5).map(e => <div className="w-[95%] h-[50px] flex justify-around items-center hover:bg-slate-300 text-slate-300 hover:text-slate-700 rounded-lg cursor-pointer transition-all" key={`search-result-${e.idProduct}`}>
      <div className="img w-1/5 h-[90%]">
        <img src={e.imgProduct} className="w-full h-full object-contain" alt="img"/>
      </div>
      <div className="name w-2/4 h-full flex flex-col">
        <span className="font-bold overflow-hidden whitespace-nowrap text-ellipsis">{e.nameProduct}</span>
        <span className="font-bold overflow-hidden whitespace-nowrap text-ellipsis">{e.price} USD</span>
      </div>
      <div className="name w-1/5 h-[95%] flex flex-col">
        <span className="font-bold text-center hover:bg-slate-700 hover:text-slate-300 rounded overflow-hidden whitespace-nowrap text-ellipsis">{e.brand.toUpperCase()}</span>
        <span className="font-bold text-center hover:bg-slate-700 hover:text-slate-300 rounded overflow-hidden whitespace-nowrap text-ellipsis">{e.nameType.toUpperCase()}</span>
      </div>
    </div>)}
  </div>
}
export default SearchResult