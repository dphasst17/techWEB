export const getPosts = async() => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/api/posts/`).then(res => {return res.json()})
}
export const getDetailPosts = async(idPosts) => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/api/posts/get/${idPosts}`).then(res => {return res.json()})
}