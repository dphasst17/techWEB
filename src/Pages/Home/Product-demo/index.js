import React from 'react';
import product from '~/Pages/Product/ProductFake';
import classNames from "classnames/bind";
import style from '../Home.module.scss'
import { CartContext } from '~/Contexts/Cart';

const cx = classNames.bind(style)
const Product = () => {
  
    return (
      <div className={cx('product')}>
         {product.map((product, index)=> (
            <div className={cx('product-infor')} key={index}>
                <div className={cx('product-detail_' +`${product.id}`)}>
                    <img src={product.image} alt="Slide-show" />
                    <div className={cx('title')}><p>{product.title}</p></div>
                    <div className={cx('money')}>{product.price}</div>
                    <CartContext.Consumer>
                      {({addToCart}) => <button onClick={() =>addToCart(product)}>Add to cart</button>}
                      </CartContext.Consumer>
                </div>
            </div>
          ))} 
      </div>
    )
}


  export default Product;