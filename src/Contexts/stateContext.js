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
    const [newData,setNewData] = useState(null);
    const [selling,setSelling] = useState(null);
    const [saleData,setSaleData] = useState(null);
    const [post,setPost] = useState(null);
    const [viewData,setViewData] = useState(null);
    const [bank,setBank] = useState(null);
    const [listCart,setListCart] = useState([]);
    const [listOrder,setListOrder] = useState([]);
    const [valueFil, setValueFil] = useState([]);
    const [paymentList,setPaymentList] = useState(null);
    const [isDark,setIsDark] = useState(false);
    const [isAlert,setIsAlert] = useState(false);
    const [dataAlert,setDataAlert] = useState({});
    const [fetchOrder,setFetchOrder] = useState(true)
    const [fetchUser,setFetchUser] = useState(true)
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
            bank,setBank,
            product,setProduct,
            newData,setNewData,
            selling,setSelling,
            saleData,setSaleData,
            post,setPost,
            viewData,setViewData,
            listCart,setListCart,
            listOrder,setListOrder,
            valueFil, setValueFil,
            paymentList,setPaymentList,
            isDark,setIsDark,
            isAlert,setIsAlert,
            dataAlert,setDataAlert,
            fetchOrder,setFetchOrder,
            fetchUser,setFetchUser
        }}>
            {children}
        </StateContext.Provider>
    )
}