import React, { Component } from "react";
/* import {withErrorBoundary} from "react-error-boundary" */

const urlBase =
  "https://63d4daaa0e7ae91a00a3604b.mockapi.io/tx3en1cj8ha/uw13fsu8eg4yhr";
const useID = JSON.parse(localStorage.getItem("identificationID") || "[]");
export const CartContext = React.createContext();
export class CartProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { cartItems: [] };
    /*Get API listCart  */
    fetch(urlBase + `/` + useID)
      .then((res) => res.json())
      .then((json) =>
        this.setState({
          cartItems: json.listCart,
        })
      )
      .catch((err) => console.log(err));

    this.addToCart = this.addToCart.bind(this);
    this.deleteItems = this.deleteItems.bind(this);
    this.incrementItems = this.incrementItems.bind(this);
    this.decrementItems = this.decrementItems.bind(this);
    this.setState = this.setState.bind(this)
  }
  addToCart(product) {
    
    let checkLogin = JSON.parse(localStorage.getItem("isLogin"));
    let listCart = this.state.cartItems;
      let y = listCart.map(items => items.id)
      let x = y.includes(product.id);
      if(!checkLogin || checkLogin === false){
        window.location.pathname="/login"
      }else{
        if(listCart){
          if (listCart.length !== 0) {
            /* if product exists in list cart */
            if (x === true) {
              /* Check id , if product.id === items .id  */
              let checkID = listCart.map((items) => {
                if (product.id === items.id) {
                  return {
                    id: items.id,
                    url: items.url,
                    title: items.title,
                    price: items.price,
                    quantity: items.quantity + 1,
                    total: items.price * (items.quantity + 1),
                    detail: items.detail,
                  };
                } else {
                  return { ...items };
                }
              });
              this.setState({cartItems:checkID})
              const option = {
                method: "PUT",
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({
                  listCart: checkID,
                }),
              };
              fetch(urlBase + "/" + useID, option)
                .then((response) => response.json())
                /* .then((json) =>
                  this.setState({
                    cartItems: json.listCart,
                  })
                ); */
            } else {
              /* If product doesn't exists in list cart */
              this.setState({
                cartItems: this.state.cartItems.concat(product),
              });
              listCart.push(product);
              /* Put Data----------------*/
              const option = {
                method: "PUT",
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({
                  listCart: listCart,
                }),
              };
              fetch(urlBase + "/" + useID, option)
                .then((response) => response.json())
                /* .then((json) =>
                  this.setState({
                    cartItems: json.listCart,
                  })
                ); */
              /* ====================== */
            }
            
          } else {
            this.setState({
              cartItems: this.state.cartItems.concat(product),
            });
            listCart.push(product);
            const option = {
              method: "PUT",
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
              body: JSON.stringify({
                listCart: [product],
              }),
            };
            fetch(urlBase + "/" + useID, option)
              .then((response) => response.json())
              /* .then((json) =>
                this.setState({
                  cartItems: json.listCart,
                })
              ); */
          }
        }
      }
  }
  /* Delete an item */
  deleteItems(product) {
    let currentItems = this.state.cartItems;
    currentItems = currentItems.filter((items) => items.id !== product.id);
    this.setState({cartItems:currentItems})
    const option = {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        listCart: currentItems,
      }),
    };
    fetch(urlBase + "/" + useID, option)
      .then((response) => response.json())
      /* .then((json) => this.setState({
        cartItems: json.listCart,
      })); */
    
  }
  /* Increment an items in localStorage */
  incrementItems(product) {
    let increment = this.state.cartItems;
    increment = increment.map((items) => {
      if (items.id === product.id) {
        return {
          id: items.id,
          url: items.url,
          title: items.title,
          price: items.price,
          quantity: items.quantity + 1,
          total: items.price * (items.quantity + 1),
        };
      } else {
        return {
          ...items,
        };
      }
    });
    this.setState({cartItems:increment})
    const option = {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        listCart: increment,
      }),
    };
    fetch(urlBase + "/" + useID, option)
      .then((response) => response.json())
      /* .then((json) =>
        this.setState({
          cartItems: json.listCart,
        })
      ); */
  }
  /* Decrement an item in localStorage */
  decrementItems(product) {
    let decrement = this.state.cartItems;
    decrement = decrement.map((items) => {
      if (items.id === product.id && items.quantity > 1) {
        return {
          id: items.id,
          url: items.url,
          title: items.title,
          price: items.price,
          quantity: items.quantity - 1,
          total: items.price * (items.quantity - 1),
        };
      } else {
        return {
          ...items,
        };
      }
    });
    this.setState({cartItems:decrement})
    const option = {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        listCart: decrement,
      }),
    };
    fetch(urlBase + "/" + useID, option)
      .then((response) => response.json())
      /* .then((json) =>
        this.setState({
          cartItems: json.listCart,
        })
      ); */
  }
  checkOut(){
    const option = {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        purchaseOrder:this.state.cartItems,
        listCart: [],
      }),
    };
    fetch(urlBase + "/" + useID, option)
      .then((response) => response.json())
  }
  render() {
    return (
      <CartContext.Provider
        value={{
          cartItems: this.state.cartItems,
          addToCart: this.addToCart,
          deleteItems: this.deleteItems,
          incrementItems: this.incrementItems,
          decrementItems: this.decrementItems,
          setState:this.setState
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
} /* export default withErrorBoundary(this.state.cartItems) */
