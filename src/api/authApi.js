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
//{username:username,email:email}
export const forgotPass = async(data) => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/auth/forgot`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(res => {return res.json()})
}
/* {currentPass:current,newPass:new} */
export const updatePassword = async(token,data) => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/auth/update/password`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify(data)
    })
    .then(res => {return res.json()})
}