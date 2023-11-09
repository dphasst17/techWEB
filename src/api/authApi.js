export const login = async(dataLogin) => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/auth/login`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(dataLogin)
    })
    .then(res => {return res.json()})
}
export const register = async(dataRegis) => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/auth/register`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(dataRegis)
    })
    .then(res => {return res.json()})
}
export const getNewToken = async(token) => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/auth/new/token`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
    })
    .then(res => {return res.json()})
}