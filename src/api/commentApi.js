export const getCommentById = async(url) => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/api/comment/product/${url.idProduct}`).then(res => {return res.json()})
}
export const postComment = async(token,data) => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/api/comment/insert/${data.idProduct}`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify(data.detail)
    }).then(res => {return res.json()})
}