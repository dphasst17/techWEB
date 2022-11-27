import dataAcc from'./dataAcc';
import React from 'react';
import classNames from "classnames/bind";
import style from '../Home.module.scss'
import { CartContext } from '~/Contexts/Cart';

const cx = classNames.bind(style)

const AccDemo = () =>{
    return(
        <div className={cx("Access")}>
            {dataAcc.map((dataAcc, index) =>(
                <div className={cx("accDemo")} key={index}> 
                    <div className={cx("accDemo_Child")}>
                        <img src={dataAcc.image} alt="" />
                        <p>{dataAcc.title}</p>
                        <button className={cx("price")}>{dataAcc.price}</button>
                        <CartContext.Consumer>
                            {({addToCart}) => <button onClick={() => addToCart(dataAcc)} className={cx("addToCard")}>Add to cart</button>}
                            
                        </CartContext.Consumer>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AccDemo;