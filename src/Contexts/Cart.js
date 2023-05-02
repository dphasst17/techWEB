
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
      let listCart = cartItems;
      if (listCart) {
        if (listCart.length !== 0) {
          let y = listCart.map((items) => items.id);
          let x = y.includes(product.id);
          if (x === true) {
            updateExistingProductInCart(listCart, product);
          } else {
            addNewProductToCart(listCart, product);
          }
        } else {
          addNewProductToCart(listCart, product);
        }
      }
    } else {
      sessionStorage.setItem(
        "pathName",
        JSON.stringify(window.location.pathname)
      );
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
    setCartItems(cartItems.concat({ ...product, detail: [] }));
    listCart.push({ ...product, detail: [] });
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