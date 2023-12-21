import { useContext} from "react"
import { StateContext } from "~/contexts/stateContext"
import { MdDeleteSweep } from "react-icons/md";
import HandleToken from "~/helper/handleToken";
import { addressChangeType } from "~/api/userApi";
const Address = ({props}) => {
    const {address,setAddress} = useContext(StateContext);
    const handleToken = HandleToken();
    const handleChangeType = (idAddress,currentType) => {
        const fetchData = async () => {
            let token = await handleToken();
            addressChangeType(token,{idAddress:idAddress,type:currentType === 'default' ? 'extra' :'default'})
            .then(res => {
                props.setIsLoading(false)
                if(res.status === 500){
                    throw Error({ status: res.status, message: res.messages })
                }
                res.status === 200 && setAddress(address.map(e => {
                    if(e.idAddress === idAddress){
                        return {
                            ...e,
                            typeAddress:currentType === 'default' ? 'extra':'default'
                        }
                    }else{
                        return {
                            ...e,
                            typeAddress: e.typeAddress === 'default' ? 'extra' : e.typeAddress
                        }
                    }
                }))
            })
            .catch(err => console.log(err))
        }
        fetchData()
    }
    return <div className="user-address w-[90%] h-auto flex flex-wrap justify-center m-auto">
        <h1 className="text-center text-[30px] font-bold text-slate-700 my-2">List address</h1>
        <div className="listAddress w-full h-auto flex flex-wrap justify-center 2xl:justify-between items-center py-2  cursor-pointer">
            {address !== null && address.map(e => <div className="addressDetail w-full h-auto flex flex-wrap justify-center items-center">
                <div className={`showAddress w-full lg:w-3/5 flex items-center justify-center h-auto min-h-[40px] my-2 ${e.typeAddress === "default" ? 'bg-slate-700' :'bg-slate-500'} hover:bg-slate-700 transition-al text-white font-semibold rounded-[5px] px-2`} key={e.idAddress}>
                    {e.detail}
                </div>
                <span className={`w-[12%] min-w-[80px] h-[30px] flex items-center justify-center text-white font-bold ${e.typeAddress === "default" ?'bg-red-700':'bg-blue-600'} ml-2 px-3 py-1 rounded-[5px]`}>
                    {e.typeAddress === "default" ?'Default':'Extra'}
                </span>
                    <button onClick={() => {handleChangeType(e.idAddress,e.typeAddress)}} className="w-[150px] h-[30px] mx-2 my-2 ssm:my-0 bg-blue-500 hover:bg-blue-700 rounded-lg text-white text-[15px] font-semibold transition-all">{e.typeAddress === "default" ? 'Set to extra' :'Set to default'}</button>
                <div className="btnAddress w-auto min-w-[60px] h-[50px] flex justify-evenly items-center">
                    <MdDeleteSweep className="w-2/4 h-3/5 text-red-600 hover:text-red-400 transition-all"/>
                </div>
            </div>)}
        </div>
        <div onClick={() => {props.setFormAdd(true)}} className="addAddress w-[150px] h-[30px] rounded-[5px] flex justify-center items-center bg-slate-400 hover:bg-slate-600 transition-all text-black hover:text-white font-semibold cursor-pointer">Add new address</div>
    </div>
}
export default Address