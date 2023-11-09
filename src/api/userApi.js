export const getUserInfo = async (token) => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/user/`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
    })
    .then(res => res.json())
}
export const changeInfo = async(token,data) => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/user/change/info`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify(data)
    })
    .then(res => res.json())
}
export const addAddress = async(token,data) => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/user/address/add`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify(data)
    })
    .then(res => res.json())
}
export const addressChangeType = async(token,data) => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/user/address/change/type`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify(data)
    }).then(res => {return res.json()})
}
export const getApiProvinceAddress = async() => {
    return fetch(`https://provinces.open-api.vn/api/?depth=2`)
    .then(res => res.json())
}
export const getApiAddressDetail = async(type,code) => {
    return fetch(`https://provinces.open-api.vn/api/${type}/${code}/?depth=2`)
    .then(res => res.json())
}