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
export const deleteAddress = async(listId) => {
    return fetch('http://localhost:1705/user/address',{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({list:listId})
    })
    .then(res => res.json())
}
export const getApiProvince = async() => {
    return fetch(`https://vapi.vnappmob.com/api/province`)
    .then(res => res.json())
}
export const getProvincesDetail = async(type,id) => {
    return fetch(`https://vapi.vnappmob.com/api/province/${type}/${id}`)
    .then(res => res.json())
}