import * as apiProduct from "~/api/productApi.js"
import * as apiUser from "~/api/userApi.js"
import * as apiTrans from "~/api/orderApi.js"
import * as apiComment from "~/api/commentApi.js"
import * as apiPosts from "~/api/postsApi.js"
import {useEffect, useState } from "react"
const handleCheckTypeGet = (type,fName,key) => {
    let url;
    switch (type){
        case 'product':
            url = !key ?  apiProduct[fName] :apiProduct[fName](key)
            break;
        case 'user':
            url = !key ? apiUser[fName] :apiUser[fName](key)
            break;
        case 'transports':
            url = !key ? apiTrans[fName] :apiTrans[fName](key)
            break;
        case 'comment':
            url = !key ? apiComment[fName] :apiComment[fName](key)
            break;
        case 'posts':
                url = !key ? apiPosts[fName] :apiPosts[fName](key)
                break;
        default:
            console.log(false);
            break;       
    }
    return url;
}

export const useGetData = (type,fName) => {
    const [data ,setData] = useState(null);
    const [err,setErr] = useState(null)
    let url = handleCheckTypeGet(type,fName);
    useEffect(() => {
        
        url().then(res => {
            if(res.status === 500){
                throw Error({status:res.status,message:res.messages})
            }
            setData(res)
        })
        .catch(err => {
            setErr(err)
        })
    },[url])
    return {data,err};
}
export const useGetDataByKey = (type,fName,key) => {
    const [data ,setData] = useState(null);
    const [err,setErr] = useState(null);
    useEffect(() => {
        let url = handleCheckTypeGet(type,fName,JSON.parse(key))
        url.then(res => {
            if(res.status === 500){
                throw Error({status:res.status,message:res.messages})
            }
            setData(res)
        })
        .catch(err => {
            setErr(err)
        })
      }, [type,fName,key]);
    return {data,err};
}
export const usePostData = (type,name) => {
    const [data,setData] = useState(null);
    const [err,setErr] = useState(null);
    let url = handleCheckTypeGet(type,name)
    useEffect(() => {
        url().then(res => {
            if(res.status === 500){
                throw Error({status:res.status,message:res.messages})
            }
            setData(res)
        })
        .catch(err => setErr(err))
    },[url])
    return {data,err}
}