import { useCallback } from "react";
import Cookies from "js-cookie";
const getNewToken = async (token) => {
  const response = await fetch(`${process.env.REACT_APP_URL_SERVER}/auth/new/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    },
  });
  const res = await response.json();
  Cookies.set("access", res.accessToken, {
    expires: new Date(res.expAccess * 1000),
    path: "/",
  });
  localStorage.setItem("expAccess", res.expAccess);
  return res.accessToken;
};


const HandleToken = () => {
    const checkToken = useCallback(async() => {
        const expAccess = localStorage.getItem('expAccess')
        const expRefresh = localStorage.getItem('expRefresh')
        if(expAccess !== 'undefined' && new Date().getTime() < new Date(expAccess * 1000).getTime()){
            const token = Cookies.get("access");
            return token
        }else{
            if(expRefresh !== 'undefined' && new Date().getTime() < new Date(expRefresh * 1000).getTime()){
                const refresh = Cookies.get("refresh")
                const newToken = await getNewToken(refresh);
                return newToken;
            }else{
                localStorage.removeItem('isLogin')
                return false;
            }
        }
    },[])
    return checkToken
}
export default HandleToken;