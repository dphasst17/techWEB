import React, { useContext, useEffect, useState } from "react";
import "~/tailwind.css";
import "../Home.scss";
import { CartContext } from "~/contexts/Cart";
import LazyLoad from "react-lazy-load";
import { AnimateScroll } from "~/helper/animateScroll";
import { StateContext } from "~/contexts/stateContext";
import { ApiContext } from "~/contexts/apiContext";
import ButtonViewDetail from "~/components/Button/viewDetail";
import { ButtonIconAddCart } from "~/components/Button/addCart";
import { ViewBrandAndType } from "~/components/Product/viewMultiBtn";
import {useNavigate} from "react-router-dom"
const Product = () => {
  const {addToCart} = useContext(CartContext)
  const {laptop} = useContext(StateContext)
  const {percentDiscount} = useContext(ApiContext)
  const [data,setData] = useState(null);
  const [inView, setInView] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    laptop !== null && setData(laptop.filter(e => e.id % 2 !== 0))
  },[laptop,setData])

  const refs = data?.map(() => React.createRef());
  AnimateScroll(refs,setInView)
  return (
    <>
      {laptop !== null && (
        <h1 className="font-han font-[30px]">OUR PRODUCT</h1>
      )}
      {laptop !== null &&  (
        <div className="h-product w-full h-auto flex flex-wrap justify-around">
          {data !== null && data.slice(0, 12).map((product,i) => (
            <div
              className="product-info w-1/5 h-auto min-h-[350px] min-w-[160px] m-[2%] rounded-[10px] cursor-pointer scale-100"
              key={product.id}
            >
              
                <LazyLoad height={"auto"} offset={50} className="p-0 m-0 flex justify-center">
                  <div ref={refs[i]} className={`product-detail w-full max-w-[300px] h-full ${inView ? 'flex' : 'hidden'} flex-col pb-[2%] rounded-[16px]`}>
                    <div style={{backgroundSize: "100% 100%"}} className="item_top w-full h-[16px] bg-no-repeat bg-[url(https://dlcdnwebimgs.asus.com/files/media/E30EF754-96D6-4A74-82E0-14AACEEABC94/v1/images/large/1x/grid/top.webp)]"></div>
                    <div
                      style={{
                        backgroundRepeat: "repeat-y",
                        backgroundSize: "100% 100%",
                      }}
                      className="item_body w-full h-[90%] pl-0 bg-auto bg-[url(https://dlcdnwebimgs.asus.com/files/media/E30EF754-96D6-4A74-82E0-14AACEEABC94/v1/images/large/1x/grid/body.webp)]"
                    >
                      <div className="image w-full h-[30%] flex justify-center">
                        <img
                          src={product.imgProduct}
                          alt="img Product Laptop"
                          loading="lazy"
                          className="w-full h-44 object-contain"
                        />
                      </div>
                      <div className="items w-full h-[70%] flex flex-col flex-wrap justify-between">
                        <div className="title w-full h-[10%]">
                          <p className="w-full h-[50px] text-[20px] text-white text-center font-BOO font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
                            {product.nameProduct}
                          </p>
                        </div>
                        <ViewBrandAndType props={{brand:product.brand,type:product.nameType,height:'2/4',navigate}}/>
                        <div className="productAccess w-full h-[36%]">
                          <div className="information pl-[3%]">
                            <p className="transition-all font-han text-[18px] font-semibold overflow-hidden whitespace-nowrap text-ellipsis text-slate-200">
                              Cpu: {product.detail.map(e => e.cpu)}
                            </p>
                            <p className="transition-all font-han text-[18px] font-semibold overflow-hidden whitespace-nowrap text-ellipsis text-slate-200">
                              Display: {product.detail.map(e => e.sizeInch.toFixed(1))} inch
                              - {product.detail.map(e => e.resolution)}
                              hz
                            </p>
                            <p className="transition-all font-han text-[18px]  font-semibold overflow-hidden whitespace-nowrap text-ellipsis text-slate-200">
                              Ram: {product.detail.map(e => e.capacity)}GB
                            </p>
                            <p className="transition-all font-han text-[18px]  font-semibold overflow-hidden whitespace-nowrap text-ellipsis text-slate-200">
                              Storage:
                              {product.detail.map(e => e.storage)}
                            </p>
                            <p className="transition-all font-han text-[18px]  font-semibold overflow-hidden whitespace-nowrap text-ellipsis text-slate-200">
                              Os: {product.detail.map(e => e.os)}
                            </p>
                          </div>
                        </div>
                        <div className="items-child w-full h-[21%] flex  flex-col justify-between  ">
                          <div className="money w-full  text-[17px] font-semibold ml-[3%] text-gray-300">
                            Price:{" "}
                            <span className="font-han text-[25px]">
                              {product.discount !== 0 ? (<><span className="text-red-600 font-medium line-through">{product.price}</span> {percentDiscount(product.discount,product.price)}</>) : product.price}
                            </span>{" "}
                            USD
                          </div>
                          <div className="button w-full  flex flex-col md:flex-row items-center justify-around">
                            <ButtonIconAddCart props={{addToCart,product,width:'w-3/4 lg:w-2/4'}} />
                            <ButtonViewDetail props={{
                              url:`/detail/${product.idType}/${product.nameType}/${product.idProduct}/${product.nameProduct}`,
                              width:'w-3/4 lg:w-[30%]'
                            }}/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{backgroundSize: "100% 100%"}} className="item_bottom w-full h-[16px] bg-no-repeat bg-cover bg-[url(https://dlcdnwebimgs.asus.com/files/media/E30EF754-96D6-4A74-82E0-14AACEEABC94/v1/images/large/1x/grid/bottom.webp)]"></div>
                  </div>
                </LazyLoad>
              
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Product;
