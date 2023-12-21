import { createContext, useState } from "react";

export const StateContext = createContext({});
export const StateProvider = ({children}) => {
    const [users,setUsers] = useState(null);
    const [address,setAddress] = useState(null);
    const [laptop,setLaptop] = useState(null);
    const [keyboard,setKeyboard] = useState(null);
    const [mouse,setMouse] = useState(null);
    const [memory,setMemory] = useState(null);
    const [monitor,setMonitor] = useState(null);
    const [storage,setStorage] = useState(null);
    const [vga,setVga] = useState(null);
    const [type,setType] = useState(null);
    const [product,setProduct] = useState(null);
    const [listCart,setListCart] = useState([]);
    const [listOrder,setListOrder] = useState([]);
    const [valueFil, setValueFil] = useState([]);
    const [paymentList,setPaymentList] = useState(null);
    const [isDark,setIsDark] = useState(false)
    return (
        <StateContext.Provider value={{
            users,setUsers,
            address,setAddress,
            laptop,setLaptop,
            keyboard,setKeyboard,
            mouse,setMouse,
            memory,setMemory,
            monitor,setMonitor,
            storage,setStorage,
            vga,setVga,
            type,setType,
            product,setProduct,
            listCart,setListCart,
            listOrder,setListOrder,
            valueFil, setValueFil,
            paymentList,setPaymentList,
            isDark,setIsDark
        }}>
            {children}
        </StateContext.Provider>
    )
}