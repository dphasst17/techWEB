export const getCommentById = async(url) => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/api/comment/product/${url.idProduct}`).then(res => {return res.json()})
}