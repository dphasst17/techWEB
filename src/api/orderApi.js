export const orderInsert = async(token,objBody) => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/api/transports/insert`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify(objBody)
    })
    .then(res => {return res.json()})
}
export const orderSelectByUser = async(token) => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/api/transports/user/get`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
    })
    .then(res => {return res.json()})
}
/* {idTrans:id,idTransDetail:[1,2,3,4]} */
export const orderDeleteProduct = async(data) => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/api/transports/delete/detail`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(data)
    })
    .then(res => {return res.json()})  
}