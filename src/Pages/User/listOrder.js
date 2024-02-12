import { useContext } from "react"
import { orderDeleteProduct } from "~/api/orderApi";
import { StateContext } from "~/contexts/stateContext"
const Order = () => {
    const {listOrder,setListOrder} = useContext(StateContext);

    const deleteProductOrder = (idTrans,idTransDetail) => {
        const result = {idTrans:idTrans,idTransDetail:[idTransDetail]}
        const length = listOrder.filter(e => e.idTrans === idTrans).flatMap(e => e.detail).length
        orderDeleteProduct(result).then(res => {
            if(res.status === 200){
                setListOrder(length > 1 ? listOrder.map(e => {
                    return {
                        ...e,
                        detail:e.idTrans !== idTrans ? e.detail : e.detail.filter(f => f.idTransDetail !== idTransDetail) 
                    }
                }) : listOrder.filter(e => e.idTrans !== idTrans)
                )
            }
        })
    }
    return <div className="user-address w-[90%] h-auto flex flex-wrap justify-center my-20 mx-auto">
        <h1 className="text-center text-[30px] font-bold text-slate-700 my-2">List order</h1>
        <div className="listOrder w-full h-auto flex flex-wrap justify-center 2xl:justify-between items-start py-2  cursor-pointer">
            {listOrder !== null && listOrder.length !== 0 && listOrder.map(e => <div className="listOrderDetail w-[95%] lg:w-3/4 xl:w-2/5 flex flex-wrap justify-center items-center h-auto min-h-[200px] rounded-lg bg-slate-700 p-2" key={e.idTrans}>
                <div className="infoOrder w-full h-2/5 flex flex-wrap">
                    <h2 className="w-full text-center text-[20px] font-semibold text-blue-300 my-2">#{e.idTrans}</h2>
                    <span className="w-full text-slate-100 font-bold my-1">Order - {e.idTrans}</span>
                    <span className="w-full text-slate-100 font-bold my-1">Name: {e.fullName}</span>
                    <span className="w-full text-slate-100 font-bold my-1">Phone: {e.phone}</span>
                    <span className="w-full text-slate-100 font-bold my-1">Address: {e.address}</span>
                    <span className="w-full text-slate-100 font-bold my-1">Shipping methods: {e.costs === 1.25 ? 'Fast Shipping' :'Economical Shipping'}</span>
                </div>
                <h2 className="w-full text-center text-[20px] font-semibold text-blue-300 my-2">Product</h2>
                <div className="tableProduct w-full h-auto flex flex-wrap">
                    <div className="productOrder w-full h-[50px] flex flex-wrap items-center rounded-sm mx-1 my-1">
                        <span className="w-[30%] text-slate-100 border-l-[1px] border-y-[1px] border-solid border-white font-semibold text-center">Name product</span>
                        <span className="w-[15%] text-slate-100 border-l-[1px] border-y-[1px] border-solid border-white font-semibold text-center">Quantity</span>
                        <span className="w-[15%] text-slate-100 border-l-[1px] border-y-[1px] border-solid border-white font-semibold text-center">Price</span>
                        <span className="w-1/5 text-slate-100 border-l-[1px] border-y-[1px] border-solid border-white font-semibold text-center">Status</span>
                        <span className="w-1/5 text-slate-100 border-x-[1px] border-y-[1px] border-solid border-white font-semibold text-center">Action</span>
                    </div>
                    {e.detail.map(d => <div className="productOrder w-full h-[50px] flex flex-wrap items-center border-[1px] border-solid border-white rounded-sm mx-1 my-1" key={e.idTransDetail}>
                        <span className="w-[30%] text-slate-100 font-semibold text-center overflow-hidden whitespace-nowrap text-ellipsis"><span className="overflow-hidden whitespace-nowrap text-ellipsis">{d.name}</span></span>
                        <span className="w-[15%] text-slate-100 font-semibold text-center">{d.count}</span>
                        <span className="w-[15%] text-slate-100 font-semibold text-center">{d.price}</span>
                        <span className="w-1/5 text-slate-100 font-semibold text-center">{d.status}</span>
                        <span className="w-1/5 text-slate-100 font-semibold text-center">{d.status === "Chờ xác nhận" && <button onClick={() => {deleteProductOrder(e.idTrans,d.idTransDetail)}} className="w-[95%] lg:h-4/5 h-full bg-red-500 rounded-md">Cancel order</button>}</span>
                    </div>)}
                </div>
                <div className="infoPay w-full h-auto min-h-[30px] flex flex-wrap">
                    <span className="w-full text-slate-100 text-[18px] font-semibold">Costs: {e.costs} USD</span>
                    <span className="w-full text-slate-100 text-[18px] font-semibold">Payment method: {e.method}</span>
                    <span className="w-full text-slate-100 text-[18px] font-semibold">Estimated delivery date: {new Date(e.edd).toLocaleDateString('en-GB')}</span>
                    <span className="w-full text-slate-100 text-[18px] font-semibold">Shipper: {e.shipper}</span>
                    <span className="w-full text-slate-100 text-[18px] font-semibold">
                        Total: {e.detail.map(d => d.price*d.count).reduce((a,b) => a + b) + e.costs} USD
                    </span>
                </div>
            </div>)}
        </div>
    </div>
}
export default Order