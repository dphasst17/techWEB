import { useState } from "react";

const Payment = () => {
    const [name, setName] = useState('')
    const [number, setNumber] = useState('');
    const [expire, setExpire] = useState('');
    const [cvv, setCvv] = useState('');
    const HandleChange = (setState, input) => {
        setState(input.target.value)
    }
    return (
        <>
            <div className="flex flex-wrap w-full h-[220px]">
                <label className="relative w-full flex flex-col">
                    <span className="font-bold mb-3 text-slate-800">Name</span>
                    <input
                        className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-500 text-black outline-none"
                        type="text"
                        name="card_number"
                        placeholder="Enter your name"
                        onChange={(e) => {HandleChange(setName,e)}}
                    />
                
                </label>
                <label className="relative w-full flex flex-col">
                    <span className="font-bold mb-3 text-slate-800">Card number</span>
                    <input
                        className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-500 text-black outline-none"
                        type="text"
                        name="card_number"
                        placeholder="0000 0000 0000"
                        onChange={(e) => {HandleChange(setNumber,e)}}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-900 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                    </svg>
                </label>

                <label className="relative w-2/5 mx-2 flex-1 flex flex-col">
                    <span className="font-bold mb-3 text-slate-800">Expire date</span>
                    <input
                        className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-500 text-black outline-none"
                        type="text"
                        name="expire_date"
                        placeholder="MM/YY"
                        onChange={(e) => {HandleChange(setExpire,e)}}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                </label>

                <label className="relative w-2/5 mx-2 flex-1 flex flex-col">
                    <span className="font-bold flex items-center gap-3 mb-3 text-slate-800">
                        CVC/CVV
                        <span className="relative group">
                            <span className="hidden group-hover:flex justify-center items-center px-2 py-1 text-xs absolute -right-2 transform translate-x-full -translate-y-1/2 w-max top-1/2 bg-black text-white">
                                {" "}
                                Hey ceci est une infobulle !
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </span>
                    </span>
                    <input
                        className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-500 text-black outline-none"
                        type="text"
                        name="card_cvc"
                        placeholder="&bull;&bull;&bull;"
                        onChange={(e) => {HandleChange(setCvv,e)}}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>
                </label>
            </div>
            <div className="w-full h-[200px] flex flex-wrap justify-center items-center my-4">
                <div className="w-full h-full">
                    <div className="w-4/5 h-full m-auto bg-red-100 rounded-xl relative text-white shadow-2xl">
                        <img
                            className="relative object-cover w-full h-full rounded-xl"
                            src="https://i.imgur.com/kGkSg1v.png"
                            alt=""
                        />
                        <div className="w-full h-full px-8 absolute top-8">
                            <div className="flex justify-between">
                                <div className="">
                                    <p className="font-light">Name</p>
                                    <p className="font-medium min-h-[15px] tracking-widest">{name.toUpperCase()}</p>
                                </div>
                                <img
                                    className="w-14 h-14"
                                    src="https://i.imgur.com/bbPHJVe.png"
                                    alt=""
                                />
                            </div>
                            <div className="pt-1">
                                <p className="font-light">Card Number</p>
                                <p className=" min-h-[15px] font-medium tracking-more-wider">
                                    {number}
                                </p>
                            </div>
                            <div className="w-full h-2/4 pt-6 pr-6">
                                <div className="w-full h-3/5 flex justify-between">
                                    <div className="w-2/5 flex flex-col justify-around">
                                        <p className="font-light text-xs">Expiry</p>
                                        <p className="font-medium tracking-wider text-sm">{expire}</p>
                                    </div>

                                    <div className="w-2/5 flex flex-col justify-around">
                                        <p className="font-light text-xs">CVV</p>
                                        <p className="font-bold tracking-more-wider text-sm">{cvv}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Payment;
