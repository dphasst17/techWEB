export const getAllData = async() => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/api/product`).then(res => {return res.json()})
}
export const getProductNew = async () => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/api/product/new`).then(res => {return res.json()})
}
export const getProductByType = async (urlDetail) => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/api/product/type/${urlDetail.type}`).then(res => {return res.json()})
}
export const getProductDetail = async (urlDetail) => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/api/product/detail/get/${urlDetail.idType}/${urlDetail.idProduct}`).then(res => {return res.json()})
}
export const getProductByKeyword = async (urlDetail) => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/api/product/search/${urlDetail.keyword}`).then(res => {return res.json()})
}
export const getProductByView = async() => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/api/statistical/view`).then(res => {return res.json()})
}
export const getProductSold = async() => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/api/statistical/bestselling`).then(res => {return res.json()})
}