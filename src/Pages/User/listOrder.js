import { useContext } from "react"
import { StateContext } from "~/contexts/stateContext"
const Order = () => {
    const {listOrder} = useContext(StateContext);
    return <div className="user-address w-[90%] h-auto flex flex-wrap justify-center my-20 mx-auto">
        <h1 className="text-center text-[30px] font-bold text-slate-700 my-2">List order</h1>
        <div className="listOrder w-full h-auto flex flex-wrap justify-center 2xl:justify-between items-center py-2  cursor-pointer">
            {listOrder !== null && listOrder.length !== 0 && listOrder.map(e => <div className="listOrderDetail w-[95%] lg:w-3/4 xl:w-2/5 flex flex-wrap justify-center items-center h-auto min-h-[200px] rounded-lg bg-slate-700 p-2" key={e.idTrans}>
                <h2 className="w-full text-center text-[20px] font-semibold text-blue-300 my-2">Info</h2>
                <div className="infoOrder w-full h-2/5 flex flex-wrap">
                    <span className="w-full text-slate-100 font-bold my-1">Order - {e.idTrans}</span>
                    <span className="w-full text-slate-100 font-bold my-1">Name: {e.fullName}</span>
                    <span className="w-full text-slate-100 font-bold my-1">Phone: {e.phone}</span>
                    <span className="w-full text-slate-100 font-bold my-1">Address: {e.address}</span>
                    <span className="w-full text-slate-100 font-bold my-1">Shipping methods: {e.costs === 1.25 ? 'Fast Shipping' :'Economical Shipping'}</span>
                </div>
                <h2 className="w-full text-center text-[20px] font-semibold text-blue-300 my-2">Product</h2>
                {e.detail.map(d => <div className="productOrder w-full lg:w-[48%] h-[80px] flex flex-wrap bg-slate-300 rounded-lg mx-1 my-4" key={e.idTransDetail}>
                    <span className="w-full text-slate-700 font-semibold text-center">{d.name}</span>
                    <span className="w-2/4 text-slate-700 font-semibold text-center">Count: {d.count}</span>
                    <span className="w-2/4 text-slate-700 font-semibold text-center">Price: {d.price} USD</span>
                    <span className="w-full md:w-3/4 text-slate-700 font-semibold text-center">Status: {d.status}</span>
                </div>)}
                <div className="infoPay w-full h-auto min-h-[30px] flex flex-wrap">
                    <span className="w-full text-slate-100 text-[18px] font-semibold">Costs:{e.costs}</span>
                    <span className="w-full text-slate-100 text-[18px] font-semibold">Payment method:{e.method}</span>
                    <span className="w-full text-slate-100 text-[18px] font-semibold">
                        Total: {e.detail.map(d => d.price*d.count).reduce((a,b) => a + b) + e.costs} USD
                    </span>
                </div>
            </div>)}
        </div>
    </div>
}
export default Order