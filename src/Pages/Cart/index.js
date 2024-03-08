import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "~/contexts/Cart";
import { ApiContext } from "~/contexts/apiContext";
import { StateContext } from "~/contexts/stateContext";

const Cart = () => {
  const { cartItems, incrementItems, decrementItems, deleteItems } = useContext(CartContext);
  const { paymentList, setPaymentList } = useContext(StateContext);
  const {percentDiscount} = useContext(ApiContext)
  const navigate = useNavigate();
  const handleCheckBox = (idCart) => {
    if (paymentList !== null) {
      const result = paymentList.includes(idCart) ? paymentList.filter(e => e !== idCart) : [...paymentList, idCart]
      setPaymentList(result)
    } else {
      setPaymentList([idCart])
    }
  }
  return (
    <div className="w-full h-auto min-h-[900px] bg-transparent pt-20">
      <h1 className="mb-10 text-center text-[35px] font-bold">Cart Items</h1>
      <div className="w-4/5 mx-auto justify-center px-6 xl:flex xl:space-x-6 xl:px-0">
        <div className="rounded-lg xl:w-2/3 flex flex-wrap">
          {cartItems !== null &&
            cartItems?.map((e) => (
              <div className="relative w-full 2xl:w-[48%] h-auto md:h-[100px] justify-center items-center p-2 mb-6 mx-2 rounded-lg bg-white shadow-md sm:flex sm:justify-start">
                {e.discount !== 0 && <div
                  className="absolute w-[30px] h-[30px] top-2 text-[10px] flex items-center justify-center text-white rounded-md bg-red-500">
                  -{e.discount}%
                </div>}
                <img
                  src={e.imgProduct}
                  alt="product-img"
                  className="w-full h-[100px] md:h-full object-contain rounded-lg sm:w-40"
                />
                <div className="h-auto min-h-[170px] sm:min-h-0 sm:h-full xl:ml-4 flex flex-wrap w-full justify-center lg:justify-between">
                  <div className="w-full sm:w-3/5 h-[70px] sm:h-full flex flex-col justify-between sm:mt-0 overflow-hidden whitespace-nowrap text-ellipsis">
                    <h2 style={{ color: '#111827' }} className="w-full sm:w-[200px] text-center sm:text-start text-lg font-bold text-gray-900 overflow-hidden whitespace-nowrap text-ellipsis">
                      {e.nameProduct}
                    </h2>
                    <p style={{ color: '#1f2937' }} className="mt-1 text-xs font-semibold text-gray-700">
                      Price: {e.price} USD
                    </p>
                    <div>
                      <input className="hidden" type="checkbox" id={`checkCart${e.idCart}`} onClick={() => { handleCheckBox(e.idCart) }} />
                      <label className={`w-auto h-[30xp] rounded-[5px] ${paymentList !== null && paymentList.includes(e.idCart) ? 'bg-green-600' : 'bg-blue-500'} px-2 py-1 text-white font-semibold cursor-pointer`} htmlFor={`checkCart${e.idCart}`}>Select it </label>
                    </div>
                  </div>
                  <div className="w-full sm:w-2/5 lg:w-[30%] 2xl:w-2/5 h-[70px] sm:h-full flex flex-wrap sm:flex-nowrap my-4 md:my-0 sm:flex-col justify-around">
                    <div className="w-full h-2/5 flex justify-center items-center border-gray-100">
                      <span
                        onClick={() => {
                          decrementItems(e.idCart);
                        }}
                        className="w-[40px] flex items-center justify-center text-[20px] font-bold cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      >
                        {" "}
                        -{" "}
                      </span>
                      <span className="w-auto min-w-[40px] h-10 border flex justify-center items-center bg-white text-center text-xs mx-2">
                        {e.count}
                      </span>
                      <span
                        onClick={() => {
                          incrementItems(e.idCart);
                        }}
                        className="w-[40px] flex items-center justify-center text-[20px] font-bold cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      >
                        {" "}
                        +{" "}
                      </span>
                    </div>
                    <div className="w-full h-2/5 sm:w-full flex flex-wrap justify-center items-center">
                      <p style={{ color: '#111827' }} className="w-[100px] h-[25px] flex items-center justify-center bg-slate-300 rounded-[5px] text-sm font-semibold">
                        {/* {e.count * e.price - ((e.price * e.discount))}  */}{percentDiscount(e.discount,e.count * e.price)} USD
                      </p>
                      <svg
                        onClick={() => {
                          deleteItems(e.idCart);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-10 w-20 cursor-pointer duration-150 hover:text-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="xl:w-1/3 flex flex-col">
          <div className="w-full h-[80px]  my-2 rounded-lg flex items-center px-2">
            {paymentList !== null && paymentList.length !== 0 && <button onClick={() => { setPaymentList([]) }} className="w-1/5 h-[40px] rounded-lg bg-red-500 text-white font-semibold">Delete it</button>}
          </div>
          <div className="xl:w-full mt-6 h-[100px] rounded-lg border bg-white p-6 shadow-md md:mt-0">
            <div className="flex justify-between">
              <p style={{ color: '#111827' }} className="text-lg font-bold">Total</p>
              <div className="null">
                <p style={{ color: '#111827' }} className="mb-1 text-lg text-end font-bold">
                  {paymentList !== null && paymentList.length !== 0
                    ? cartItems
                      ?.filter(e => paymentList.includes(e.idCart))
                      ?.map(e => { return e.count * e.price - ((e.price * e.discount)/100) })
                      ?.reduce((a, b) => { return a + b })
                    : '0'
                  } USD
                </p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button onClick={() => navigate("/checkout")} className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
              Check out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
