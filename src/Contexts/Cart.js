
import React, { useState, useContext, useEffect } from "react";
import { StateContext } from "./stateContext";
import { cartDeleteOne, cartInsert, cartUpdateOne } from "~/api/cartApi";
import HandleToken from "~/helper/handleToken";


export const CartContext = React.createContext();

export const CartProvider = (props) => {
  const {users} = useContext(StateContext);
  const handleCheckExp = HandleToken()
  const [cartItems, setCartItems] = useState([]);
  useEffect(() =>{users !== null && setCartItems(users.flatMap(e => e.cart))},[users])
  
  
  const addToCart = (product,count) => {     
    let isLogin = localStorage.getItem('isLogin') || false
    if (isLogin === 'true') {
      if (cartItems.length !== 0) {
        const checkProductInCart = cartItems.filter((items) => items.idProduct === product.idProduct)
        if (checkProductInCart.length !== 0) {
          let postData = checkProductInCart.flatMap(e => {return {idCart: e.idCart,count:e.count + count}})[0]
          updateCount(postData.idCart,postData.count)
          updateExistingProductInCart(postData.idCart,postData.count)
        }else{
          addNewProductToCart(product,count)
        }
      } else {
        addNewProductToCart(product,count)
      }
    } else {
      sessionStorage.setItem(
        "pathName",
        JSON.stringify(window.location.pathname)
      );
      window.location.pathname = "/login"
    }
  };
  const updateCount = (idCart,count) => {
    const newData = cartItems.map(e => {
      if(e.idCart === idCart){
      return {
        ...e,
        count : count
        }
      }else{
        return {...e}
      }
    })
    setCartItems(newData)
  }
  const updateExistingProductInCart = (idCart,count) => {
    cartUpdateOne(idCart,count)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  };
  const addNewProductToCart = async(product,count) => {
    const accessToken = await handleCheckExp()
    cartInsert(accessToken,{idProduct:product.idProduct,count:count})
      .then(res => {
        const objNewCart = {idProduct:product.idProduct,count:1,idCart:res.newId[0].idCart,nameProduct:product.nameProduct,imgProduct:product.imgProduct,price:product.price}
        setCartItems([...cartItems,objNewCart])
      })
      .catch(err => console.log(err))
  };

  const deleteItems = (idCart) => {
    const newCart = cartItems.filter(e => e.idCart !== idCart)
    setCartItems(newCart);
    cartDeleteOne(idCart).then(res => console.log(res)).catch(err => console.log(err))
    
  };

  const incrementItems = (idCart) => {
      const newCount = cartItems.filter(e => e.idCart === idCart).flatMap(e => {return {idCart:e.idCart,count:e.count + 1}})[0]
      updateCount(newCount.idCart,newCount.count)
      updateExistingProductInCart(newCount.idCart,newCount.count)
  };
  const decrementItems = (idCart) => {
    const newCount = cartItems.filter(e => e.idCart === idCart).flatMap(e => {return {idCart:e.idCart,count: e.count > 1 ?  e.count - 1:e.count}})[0]
      updateCount(newCount.idCart,newCount.count)
      updateExistingProductInCart(newCount.idCart,newCount.count)
  };
  return (
    <CartContext.Provider
      value={{
        cartItems: cartItems,
        addToCart: addToCart,
        deleteItems: deleteItems,
        incrementItems: incrementItems,
        decrementItems: decrementItems
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};