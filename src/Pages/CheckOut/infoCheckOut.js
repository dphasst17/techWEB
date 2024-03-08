import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { StateContext } from "~/contexts/stateContext";
import {HiPencilAlt} from "react-icons/hi"
import Payment from "./payment";
import cardCreditIcon from "./paymentIcon/card.png"
import deliveryIcon from "./paymentIcon/delivery.png"
const Info = ({props}) => {
    const {users,address} = useContext(StateContext);
    const { register, handleSubmit,formState: { errors: err } } = useForm();
    const [showAll,setShowAll] = useState(false)
    const [isPending,setIsPending] = useState(false)
    const handleSubmitData =  () => {
        setIsPending(true)
        handleSubmit(onSubmit)()
    }
    const onSubmit = (data) => {
        console.log(Object.keys(data))
       if(props.costs !== 0 && props.payMethods !== ''){
           props.setStateForm(prevState => ({...prevState,info:{...data,'costs':props.costs,'method':props.payMethods}}))
           setIsPending(false)
       }
       props.costs === 0 && alert('Select shipping methods')
       props.payMethods === '' && alert('Select payment methods')
    }
    return <div className="c-o-info w-full md:w-4/5 lg:w-2/5 h-auto min-h-[70vh] flex flex-col justify-start items-center ">
        <h1 className="text-[30px] text-slate-600 font-semibold font-BOO">Shipping Information</h1>
        <div className="c-o-info-user w-4/5 h-[250px] bg-slate-100 my-6 rounded-[5px] shadow-md">
            {users !== null && users?.map(e => <form className=" w-full h-full flex flex-wrap justify-around items-center py-4" key={e.nameUser}>
                <input className={`w-[95%] h-[40px] outline-none ${err.name ? 'border-red-500' : 'border-green-300'} border-solid border-[2px] bg-slate-400 rounded-[5px] text-white font-semibold pl-2`}
                    type="text"  {...register("name", { required: "This is not required" })} 
                    defaultValue={e.nameUser}/>
                <input className={`w-[45%] h-[40px] outline-none ${err.phone ? 'border-red-500' : 'border-green-300'} border-solid border-[2px] bg-slate-400 rounded-[5px] text-white font-semibold pl-2`}
                    type="text" {...register("phone", { required: "This is not required" })}
                    defaultValue={e.phone}/>
                <input className="w-[45%] h-[40px] outline-none bg-slate-400 rounded-[5px] text-white font-semibold pl-2" type="text" defaultValue={e.email}/>
                {props.defaultAddress !== null && props.defaultAddress.map(e => 
                    <input className={`w-[85%] h-[40px] outline-none ${err.address ? 'border-red-500' : 'border-green-300'} border-solid border-[2px] bg-slate-400 rounded-[5px] text-white font-semibold pl-2`}
                        type="text" {...register("address", { required: "This is not required" })}
                        value={e.detail}/>
                )}
                < HiPencilAlt className="w-[5%] h-[30px] hover:text-blue-600 transition-all cursor-pointer" onClick={() => {setShowAll(true)}} />
            </form>)}
        </div>
        {showAll === true && <div className="w-4/5 h-auto flex flex-wrap items-center justify-center bg-slate-100 my-6 rounded-[5px] shadow-md">
            {address.map(e => <div className="w-[90%] h-[40px] my-2 rounded-lg cursor-pointer">
                    <input className="hidden" type="checkbox" id={`address-${e.idAddress}`}/>
                    <label htmlFor={`address-${e.idAddress}`} className={`w-full h-full  font-semibold flex items-center hover:text-white ${e.detail === props.defaultAddress[0].detail ? 'bg-slate-700 text-white' :'bg-slate-400' } hover:bg-slate-700 px-2 rounded-lg cursor-pointer transition-all`} 
                        onClick={(e) => {props.setDAddress([{idAddress:e.idAddress,detail:e.target.innerText}])}}>{e.detail}</label>
                    
                </div>)}
                <button className="w-[150px] h-[30px] bg-blue-500 my-2 rounded-lg text-white text-[18px] font-semibold" onClick={() => {setShowAll(false)}}>Save</button>
        </div>}
        <div className="c-o-product w-4/5 h-auto flex flex-col justify-start bg-slate-100 my-6 rounded-[5px] shadow-md p-2">
            {props.data !== null &&
                <div className="calculationProduct w-full h-full flex flex-col">
                    <div className="w-full h-[10%] flex justify-between text-[15px] font-semibold">
                        <span>The number of product:</span>
                        <span>{props.data.length} product</span>
                    </div>
                    <div className="w-full h-[10%] flex justify-between text-[15px] font-semibold">
                        <span>Total quantity of product:</span>
                        <span>{props.data.length!== 0 ? props.data.map(e => e.count).reduce((a,b) => a + b) :'0'}</span>
                    </div>
                    <div className="w-full h-[10%] flex justify-between text-[15px] font-semibold">
                        <span>Total amount:</span>
                        <span>{props.data.length !== 0 ? props.data.map(e => e.count * e.price).reduce((a,b) => a + b) : '0'} USD</span>
                    </div>
                    <span className="text-[15px] font-semibold mb-2">Shipping method*</span>
                    <div className="w-full h-[130px] min-h-[100px] flex justify-around text-[15px] font-semibold mb-2">
                        <label className={`w-2/5 h-full flex flex-col justify-around pl-2 cursor-pointer ${props.costs === 1.25 && 'border-solid border-blue-500 border-[2px]'} bg-white rounded-lg`}>
                            <input className="hidden" type="checkbox" onClick={() => {props.setCosts(1.25)}}/>
                            <p style={{color:'#111827'}}>Fast Shipping</p>
                            <p style={{color:'#111827'}}>2-5 day business days</p>
                            <p style={{color:'#111827'}}>Fee: 1.25 USD</p>
                        </label>
                        <label className={`w-2/5 h-full flex flex-col justify-around pl-2 cursor-pointer ${props.costs === 0.85 && 'border-solid border-blue-500 border-[2px]'} bg-white rounded-lg`}>
                            <input className="hidden" type="checkbox" onClick={() => {props.setCosts(0.85)}}/>
                            <p style={{color:'#111827'}}>Economical Shipping</p>
                            <p style={{color:'#111827'}}>4-10 day business days</p>
                            <p style={{color:'#111827'}}>Fee: 0.85 USD</p>
                        </label>
                    </div>
                    <span className="text-[15px] font-semibold my-2">Payment method*</span>
                    <div className="w-full h-[50px] min-h-[50px] flex justify-around text-[15px] font-semibold mb-2">
                        <label className={`w-2/5 h-full flex justify-around items-center pl-2 cursor-pointer ${props.payMethods === "Payments on delivery" && 'border-solid border-blue-500 border-[2px]'} bg-white rounded-lg`}>
                            <input className="hidden" type="checkbox" onClick={() => {props.setPayMethods("Payments on delivery")}}/>
                            <img src={deliveryIcon} className="w-[20px] h-[20px]" alt=""/>
                            <p style={{color:'#111827'}}>Payments on delivery</p>
                        </label>
                        <label className={`w-2/5 h-full flex justify-around items-center pl-2 cursor-pointer ${props.payMethods === "Payment through bank" && 'border-solid border-blue-500 border-[2px]'} bg-white rounded-lg`}>
                            <input className="hidden" type="checkbox" onClick={() => {props.setPayMethods("Payment through bank");handleSubmitData()}}/>
                            <img src={cardCreditIcon} className="w-[20px] h-[20px]" alt=""/>
                            <p style={{color:'#111827'}}>Payment through bank</p>
                        </label>
                    </div>

                    
                    <div className="w-full h-[10%] flex justify-between items-center text-[20px] font-semibold mt-6">
                        <span>The total amount payable:</span>
                        <span>{props.data.length !== 0 ? (props.data.map(e => e.count * e.price - ((e.price * e.discount)/100)).reduce((a,b) => a + b) + (props.costs !==0 && props.costs)).toFixed(2) :'0'} USD</span>
                    </div>
                    {props.payMethods === "Payment through bank" && isPending && <button className="w-[100px] h-[30px] bg-blue-500 rounded-lg mx-auto text-white font-semibold" onClick={() => {handleSubmitData()}}>Check form</button>}
                    {props.payMethods === "Payment through bank" 
                        ? !isPending && <Payment props={{handleSubmitData,isPending,costs:props.costs,stateForm:props.stateForm,setStateForm:props.setStateForm,setIsFetch:props.setIsFetchData}} /> 
                        : <button 
                            onClick={(e) => {handleSubmitData(e)}}
                            className="w-[250px] h-[40px] rounded-[5px] mx-auto my-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[20px] transition-all">
                            Payments
                        </button>
                    }
                    
                </div>
            }
        </div>
    </div>
}
export default Info;