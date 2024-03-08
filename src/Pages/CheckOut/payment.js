import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "~/contexts/Cart";
import { StateContext } from "~/contexts/stateContext";

const Payment = ({props}) => {
    const {paymentList} = useContext(StateContext)
    const {cartItems} = useContext(CartContext)
    const [list,setList] = useState("")
    const handleApprove = (data, actions) => {
        return actions.order.capture().then((details) => {
            setList("")
            props.setStateForm(prevState => ({...prevState,'isPayment':true}))
            props.setIsFetch(true)
        });
    };
    useEffect(() => {
        setList(cartItems?.filter(f => paymentList.includes(f.idCart)))
    },[paymentList])
    useEffect(() => { console.log({...props.stateForm,isPayment:true})},[props.stateForm])
    return (
        <div className="w-[300px] mx-auto my-2 z-30">
            <PayPalScriptProvider options={{ "client-id": `${process.env.REACT_APP_URL_PAY}` }}>
                <PayPalButtons 
                className="!z-40"
                    createOrder={async(data, actions) => {
                        await props.handleSubmitData()
                        return !props.isPending && actions.order.create({
                            purchase_units: [{
                                description: 'LIST PRODUCT', // Mô tả đơn hàng
                                amount: {
                                    value: `${list !== "" && list.map(a => (a.price * a.count) - ((a.price * a.discount)/100))?.reduce((a,b) => a + b) + props.costs}`, // Tổng số tiền cần thanh toán (bao gồm phí ship)
                                    breakdown: {
                                        item_total: {
                                            currency_code: 'USD',
                                            value: `${list !== "" && list.map(a => (a.price * a.count) - ((a.price * a.discount)/100))?.reduce((a,b) => a + b)}` // Tổng giá sản phẩm sau khi đã trừ discount
                                        },
                                        shipping: {
                                            currency_code: 'USD',
                                            value: `${props.costs}` // Phí ship
                                        }
                                    }
                                },
                                items: list !== "" && list.map(e => {
                                    return {
                                        name:e.nameProduct.toUpperCase(),
                                        quantity:e.count.toString(),
                                        unit_amount: {
                                            currency_code: 'USD',
                                            value: (e.price * e.count - ((e.price * e.discount)/100)).toString(), // Giá mỗi sản phẩm sau khi đã trừ discount
                                        }
                                    }
                                })
                            }]
                        });
                    }}
                    onApprove={handleApprove} 
                />
            </PayPalScriptProvider>
        </div>
    );
}
export default Payment;
