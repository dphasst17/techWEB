export const cartInsert = async(token,bodyData) => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/api/cart/add`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify(bodyData)
    })
    .then(res => {return res.json()})
}
export const getCartByUser = async (token) => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/api/cart`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
    })
    .then(res => {return res.json()})
}
export const cartUpdateOne = async(idCart,count) => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/api/cart/update`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({idCart:`${idCart}`,count:`${count}`})
    })
    .then(res => {return res.json()})
}
export const cartDeleteOne = async(idCart) => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/api/cart/delete/${idCart}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
        }
    })
    .then(res => {return res.json()})
}
export const cartDeleteList = async(arrIdCart) => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/api/cart/list/delete`,{
        method:'DELETE',
        header:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({list:arrIdCart})
    })
    .then(res => {return res.json()})
}