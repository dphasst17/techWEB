import { useContext, useEffect, useState } from "react";
import { addAddress, getProvincesDetail, getApiProvince } from "~/api/userApi";
import { StateContext } from "~/contexts/stateContext";
import HandleToken from "~/helper/handleToken";

const FormAddress = ({props}) => {
    const {address,setAddress} = useContext(StateContext)
    const [province,setProvince] = useState(null);
    const [idProvinces,setIdProvinces] = useState(null);
    const [district,setDistrict] = useState(null);
    const [idDistrict,setIdDistrict] = useState(null);
    const [wards,setWards] = useState(null);
    const [resultAddress,setResultAddress] = useState({provinces:'',districts:'',wards:'',details:''})
    const [submitPosts,setSubmitPosts] = useState(null);
    const handleToken = HandleToken()
    useEffect(() => {
        getApiProvince()
        .then(res => setProvince(res.results))
    },[])
    useEffect(() => {
        idProvinces !== null && getProvincesDetail('district',idProvinces).then(res => setDistrict(res.results))
    },[idProvinces])
    useEffect(() => {
        idDistrict !== null && getProvincesDetail('ward',idDistrict).then(res => setWards(res.results))
    },[idDistrict])
    useEffect(() => {
        const allFieldsChecked = Object.values(resultAddress).every(x => x !== null && x !== '');
        if(allFieldsChecked === true && submitPosts === true){
            const fetchData = async() => {
                const token = await handleToken()
                const result = `${resultAddress.details}, ${resultAddress.wards}, ${resultAddress.districts}, ${resultAddress.provinces}`
                addAddress(token,{detail:result,type:'extra'})
                .then(res => {
                    if(res.status === 500){
                        throw Error({ status: res.status, message: res.messages })
                    }else{
                        setAddress([res.data,...address])
                        props.setFormAdd(false)
                        setSubmitPosts(false)
                        alert(res.message)
                    }
                })
                .catch(err => {
                    console.log(err)
                })

            }
            fetchData()
        }
    },[resultAddress,submitPosts])

    return <div className="form-address w-screen h-screen flex items-center justify-center fixed top-0 z-50">
        <div onClick={() => {props.setFormAdd(false)}} className="form-address-overlay w-full h-full z-10 bg-black opacity-50 absolute"></div>
        <div className="form-address-detail w-full md:w-4/5 xl:w-2/5 lg:h-2/5 flex flex-wrap justify-center items-center bg-slate-500 rounded-lg z-20">
            <div className="w-full h-[15%] flex items-center justify-center text-white text-[20px] font-bold">Add new address</div>
            <select className={`w-[90%] h-[10%] rounded-lg outline-none ${idProvinces !== null && 'border-green-500 border-solid border-[2px]'}`} onChange={(e) => {if(e.target.value !== '0'){
                setIdProvinces(e.target.value)
                setResultAddress((data) => ({...data,provinces:e.target.selectedOptions[0].text}))
            }}}>
                <option value={0}>Select Your City</option>
                {province !== null && province.map(p => <option value={p.province_id}>{p.province_name}</option>)}
            </select>
            <select className={`w-[44%] h-[10%] rounded-lg outline-none mx-2 ${idDistrict !== null && 'border-green-500 border-solid border-[2px]'}`} onChange={(e) => {if(e.target.value !== '0'){
                setIdDistrict(e.target.value)
                setResultAddress((data) => ({...data,districts:e.target.selectedOptions[0].text}))
            }}}>
                <option value={0}>Select Your District</option>
                {district !== null && district.map(p => <option value={p.district_id}>{p.district_name}</option>)}
            </select>
            <select className={`w-[44%] h-[10%] rounded-lg outline-none mx-2 ${resultAddress.wards.length !== 0 && 'border-green-500 border-solid border-[2px]'}`} onChange={(e) => {
                if(e.target.value !== '0'){
                    setResultAddress((data) => ({...data,wards:e.target.selectedOptions[0].text}))   
                }else{
                    setResultAddress((data) => ({...data,wards:''}))   
                }
            }}>
                <option value={0}>Select Your Wards</option>
                {wards !== null && wards.map(p => <option value={p.ward_id}>{p.ward_name}</option>)}
            </select>
            <input className={`w-[90%] h-[15%] rounded-lg outline-none px-2 ${resultAddress.details.length !== 0 && 'border-green-500 border-solid border-[2px]'}`} type="text" 
                onChange={(e) => {setResultAddress((data) => ({...data,details:e.target.value}))}} placeholder="Address detail"/>
            <button onClick={() => {setSubmitPosts(true)}} className="btnSubmit w-[100px] h-[30px] bg-blue-900 hover:bg-blue-500 text-white font-bold text-[18px] rounded-lg transition-all">Add</button>
        </div>
    </div>
}
export default FormAddress;