export const getAllData = async() => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/api/product`).then(res => res.json())
}
export const getProductNew = async () => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/api/product/new`).then(res => res.json())
}
export const getProductByType = async (urlDetail) => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/api/product/type/${urlDetail.type}`).then(res => res.json())
}
export const getProductDetail = async (urlDetail) => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/api/product/detail/get/${urlDetail.nameType}/${urlDetail.idProduct}`).then(res => res.json())
}
export const getProductByKeyword = async (urlDetail) => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/api/product/search/${urlDetail.keyword}`).then(res => res.json())
}
export const getProductByView = async() => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/api/statistical/view`).then(res => res.json())
}
export const getProductSold = async() => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/api/statistical/bestselling`).then(res => res.json())
}
export const getType = async() => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/api/product/info/type`).then(res => res.json())
}
export const getProductOnSale = async() => {
    return fetch(`${process.env.REACT_APP_URL_SERVER}/api/product/sale`).then(res => res.json())
}