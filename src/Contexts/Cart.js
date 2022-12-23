import React, { Component } from "react";

export const CartContext = React.createContext();

export class CartProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: JSON.parse(localStorage.getItem("listCart") || "[]"),
    };

    this.addToCart = this.addToCart.bind(this);
    this.removedAllItems = this.removedAllItems.bind(this);
    this.deleteItems = this.deleteItems.bind(this);
    this.incrementItems = this.incrementItems.bind(this);
    this.decrementItems = this.decrementItems.bind(this);
  }

  addToCart(product) {
    let listCart = JSON.parse(localStorage.getItem("listCart") || "[]");

    //add item to cart and save in localStorage
    this.setState({
      cartItems: this.state.cartItems.concat(product),
    });
    if (listCart) {
      listCart.push(product)
      localStorage.setItem(
        "listCart",
        JSON.stringify(
          listCart.map((items) => ({
            id: items.id,
            image: items.image,
            title: items.title,
            price: items.price,
            count: items.count,
            total: items.price * items.count,
          }))
        )
      );
      
    } else {
      listCart.unshift(product);
      localStorage.setItem("listCart", JSON.stringify(listCart));
    }
  }
  /* Remove all */
  removedAllItems() {
    this.setState({
      cartItems: JSON.parse(localStorage.removeItem("listCart") || "[]"),
    });
  }
  /* Delete an item */
  deleteItems(product) {
    let currentItems = this.state.cartItems;
    currentItems = currentItems.filter((items) => items.id !== product.id);
    localStorage.setItem("listCart", JSON.stringify(currentItems));
    console.log(currentItems);
    this.setState({
      cartItems: JSON.parse(localStorage.getItem("listCart")),
    });
  }
  /* Increment an items in localStorage */
  incrementItems(product) {
    let increment = this.state.cartItems;
    increment = increment.map((items) => {
      if (items.id === product.id) {
        return {
          id: items.id,
          image: items.image,
          title: items.title,
          price: items.price,
          count: items.count + 1,
        };
      } else {
        return {
          id: items.id,
          image: items.image,
          title: items.title,
          price: items.price,
          count: items.count,
        };
      }
    });
    localStorage.setItem(
      "listCart",
      JSON.stringify(
        increment.map((items) => ({
          id: items.id,
          image: items.image,
          title: items.title,
          price: items.price,
          count: items.count,
          total: items.price * items.count,
        }))
      )
    );

    this.setState({
      cartItems: JSON.parse(localStorage.getItem("listCart")),
    });
  }
  /* Decrement an item in localStorage */
  decrementItems(product) {
    let decrement = this.state.cartItems;
    decrement = decrement.map((items) => {
      if (items.id === product.id && items.count > 1) {
        
        return {
          id: items.id,
          image: items.image,
          title: items.title,
          price: items.price,
          count: items.count - 1,
        };
      } else {
        return {
          id: items.id,
          image: items.image,
          title: items.title,
          price: items.price,
          count: items.count,
        };
      }
    });
    localStorage.setItem(
          "listCart",
          JSON.stringify(
            decrement.map((items) => ({
              id: items.id,
              image: items.image,
              title: items.title,
              price: items.price,
              count: items.count,
              total: items.price * items.count,
            }))
          )
        );

    this.setState({
      cartItems: JSON.parse(localStorage.getItem("listCart")),
    });
  }
  render() {
    return (
      <CartContext.Provider
        value={{
          cartItems: this.state.cartItems,
          addToCart: this.addToCart,
          removedAllItems: this.removedAllItems,
          deleteItems: this.deleteItems,
          incrementItems: this.incrementItems,
          decrementItems: this.decrementItems,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
