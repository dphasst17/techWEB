
import React, { useState, useContext, useEffect } from "react";
import { ApiContext } from "~/ContextApi/ContextApi";


export const CartContext = React.createContext();

export const CartProvider = (props) => {
  const {Users,handlePost} = useContext(ApiContext)
  const [cartItems, setCartItems] = useState([]);
  useEffect(() =>{setCartItems(Users.flatMap(e => e.listCart))},[Users])
  
  
  const addToCart = (product) => {
    let checkLogin = JSON.parse(localStorage.getItem("isLogin"));
    if (checkLogin === true) {
      if (cartItems.length !== 0) {
        let y = cartItems.filter((items) => items.id === product.id);
        if (y.length !== 0) {
          updateExistingProductInCart(cartItems, product);
        } else {
          addNewProductToCart(cartItems, product);
        }
      } else {
        addNewProductToCart(cartItems, product);
      }
    } else {
      sessionStorage.setItem(
        "pathName",
        JSON.stringify(window.location.pathname)
      );
      window.location.pathname = "/login"
    }
  };
  
  const updateExistingProductInCart = (listCart, product) => {
    let checkID = listCart.map((items) => {
      if (product.id === items.id) {
        return {
          ...items,
          detail: [],
          quantity: items.quantity + 1,
          total: items.price * (items.quantity + 1),
        };
      } else {
        return { ...items, detail: [] };
      }
    });
    setCartItems(checkID);
    handlePost({ listCart: checkID });
  };
  
  const addNewProductToCart = (listCart, product) => {
    setCartItems(cartItems.concat({ ...product,total:product.quantity * product.price, detail: [] }));
    listCart.push({ ...product,total:product.quantity * product.price, detail: [] });
    handlePost({ listCart: listCart });
  };

  const deleteItems = (product) => {
    let currentItems = cartItems;
    currentItems = currentItems.filter((items) => items.id !== product.id);
    setCartItems(currentItems);
    handlePost({listCart:currentItems});
    
  };

  const incrementItems = (product) => {
    let increment = cartItems;
    increment = increment.map((items) => {
      if (items.id === product.id) {
        return {
          ...items,
          quantity: items.quantity + 1,
          total: items.price * (items.quantity + 1),
        };
      } else {
        return {
          ...items,
        };
      }
    });
    setCartItems(increment);
    handlePost({listCart:increment});
  };
  const decrementItems = (product) => {
    let decrement = cartItems;
    decrement = decrement.map((items) => {
      if (items.id === product.id && items.quantity > 1) {
        return {
          ...items,
          quantity: items.quantity - 1,
          total: items.price * (items.quantity - 1),
        };
      } else {
        return {
          ...items,
        };
      }
    });
    setCartItems(decrement);
    handlePost({listCart:decrement});
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