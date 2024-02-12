import { useContext, useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { StateContext } from "~/contexts/stateContext";
function Alert() {
    const {isAlert,setIsAlert,dataAlert} = useContext(StateContext)
    const [transform,setTransform] = useState(`-200%`)
    useEffect(() => {
        isAlert === true ? setTransform(`0%`) : setTransform(`-200%`)
        if (isAlert === true) {
            const timeoutId = setTimeout(() => {
                setIsAlert(false);
            }, 5000);
            return () => clearTimeout(timeoutId);
        }
        console.log(isAlert)
    },[isAlert])

    return <div className={`absolute top-2 flex-1 w-[300px] md:w-[400px] h-[90px] px-4 py-4 mx-auto lg:py-10 translate-x-[${transform}] transition-all`}>
            <div className={`relative w-full h-full text-blue-700 border-l-4 ${dataAlert.type === "success" ? 'border-green-500' : 'border-red-500'}  bg-gray-800`}>
                <div className="w-[90%] h-full flex px-2">
                    <div className="w-full h-full flex items-center justify-start">
                        <p className="mb-1 text-lg font-bold dark:text-gray-300">{dataAlert.message}</p>
                    </div>
                </div>
                <span className="absolute flex justify-end w-[10%] h-full top-0 right-0">
                    < IoCloseCircleOutline onClick={() => {setIsAlert(false)}} className="w-4/5 h-2/4 text-white"/>
                </span>
            </div>
        </div>;
}

export default Alert;