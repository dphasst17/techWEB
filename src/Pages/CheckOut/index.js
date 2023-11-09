import { CartContext } from "~/contexts/Cart";
import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Loading from "~/components/Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import Info from "./infoCheckOut";
import { StateContext } from "~/contexts/stateContext";
import { orderInsert } from "~/api/orderApi";
import HandleToken from "~/helper/handleToken";

const CheckOut = () => {
  const { cartItems} = useContext(CartContext);
  const {address,paymentList} = useContext(StateContext);
  const [costs,setCosts] = useState(0);
  const [payMethods,setPayMethods] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [messResult, setMessResult] = useState("");
  const [defaultAddress,setDAddress] = useState(null);
  const [stateForm,setStateForm] = useState({
    listIdCart:paymentList !== null && paymentList.length !== 0 ? paymentList :[],
    info:{}
  })
  const [height, setHeight] = useState("-200%");
  const handleCheckExp = HandleToken()
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  useEffect(() => {
    cartItems !== null && paymentList !== null && paymentList.length !== 0 ? setData(cartItems.filter(e => paymentList.includes(e.idCart))) : setData([])
  },[paymentList,cartItems])
  useEffect(() => {
    address !== null && setDAddress(address.filter(e => e.typeAddress === "default"))
  },[address])
  useEffect(() => {
    const FetchData = async() => {
      const accessToken = await handleCheckExp();
      if(stateForm.listIdCart.length !== 0 && Object.keys(stateForm.info).length !== 0){
        orderInsert(accessToken,stateForm)
        .then(res => {
          if(res.message === "Insert success"){
            window.location.href = '/success'
          }
        })
        .catch(err => console.log(err))
      }
    }
    FetchData()
  },[stateForm,handleCheckExp])
  return (
    <div className="checkOut w-full h-auto mb-20 min-h-[765px]">
      {isLoading === true && <Loading />}
      <div className="c-o-container w-full h-auto flex flex-wrap justify-center ">
        <div className="cartCheckOut w-full lg:w-3/5 h-auto flex flex-col justify-start items-center">
          <h1 className="text-[30px] text-slate-600 font-semibold font-BOO">Check Out</h1>
          <div className="c-o-showProduct w-full h-auto flex flex-wrap justify-center lg:justify-between px-8">
            {data !== null && data.map(e => <div className="c-o-product w-[49%] h-[100px] flex justify-around bg-slate-300 rounded-[5px] my-4" key={e.idCart}>
              <div className="c-o-product-img w-1/5 h-full"><img className="w-full h-full object-contain" src={e.imgProduct} alt="img-product"/></div>
              <div className="c-o-info w-[75%] h-full flex justify-around items-center">
                <div className="c-o-info-name w-2/5 h-full text-[15px] flex flex-col justify-around items-start text-slate-700 font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
                  <span>Product name</span>
                  <span className="w-[95%] text-[16px] text-gray-800 overflow-hidden whitespace-nowrap text-ellipsis">{e.nameProduct}</span>
                </div>
                <div className="c-o-info-price w-[23%] h-full text-[12x] flex flex-col justify-around items-start text-slate-700 font-semibold">
                  <span>Price</span>
                  <span className="text-[16px] text-gray-800">{e.price} USD</span>
                </div>
                <div className="c-o-info-quantity w-[14%] h-full text-[12x] flex flex-col justify-around items-center text-slate-700 font-semibold">
                  <span>Count</span>
                  <span className="text-[16px] text-gray-800">{e.count}</span>
                </div>
                <div className="c-o-info-total w-[23%] h-full text-[12x] flex flex-col justify-around items-center text-slate-700 font-semibold">
                  <span>Total</span>
                  <span className="text-[16px] text-gray-800">{e.count * e.price} USD</span>
                </div>
              </div>
            </div>)}
          </div>
        </div>
        <Info props={{data,setDAddress,defaultAddress,costs,setCosts,payMethods,setPayMethods,stateForm,setStateForm}}/>
      </div>
      <div
        className="messFalse"
        style={{ transform: "translateX(" + height + ")" }}
      >
        <p>{messResult}</p>
        <div className="iClose">
          <FontAwesomeIcon
            icon={faX}
            onClick={() => {
              setHeight("-120%");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
