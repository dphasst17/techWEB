import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "~/contexts/Cart";
import { useGetDataByKey } from "~/hooks/useFetchData";
import * as detailInf from "~/json/inputAllDetail";
import Comment from "./detailComment";
import SameType from "./sameProductType";
import { StateContext } from "~/contexts/stateContext";
import PostComment from "./postComment";
import HandleToken from "~/helper/handleToken";
import { postComment } from "~/api/commentApi";
const ProductDetail = () => {
  const { addToCart } = useContext(CartContext);
  const { isDark,users } = useContext(StateContext)
  const { idType, nameType, productID } = useParams();
  const { data, err } = useGetDataByKey('product', 'getProductDetail', JSON.stringify({ nameType: nameType, idProduct: productID }));
  const { data: dataComment, err: errComment } = useGetDataByKey('comment', 'getCommentById', JSON.stringify({ idProduct: productID }))
  const [img, setImg] = useState("");
  const [comments, setComments] = useState(null);
  const [option,setOPtion] = useState()
  const isLogin = JSON.parse(localStorage.getItem('isLogin') || false);
  const handleToken = HandleToken();

  useEffect(() => {
    data !== null && setImg(data[0].imgProduct.filter(e => e.type === "default")[0])
    dataComment !== null && setComments(dataComment[0].detail)
  }, [data, dataComment])
  const handleChangeDataAddToCart = (product, count) => {
    const newData = [product].map(e => {
      return {
        ...e,
        imgProduct: e.imgProduct.filter(i => i.type === "default")[0].img
      }
    })
    addToCart(newData[0], count)
  }
  const PostDataComment = async(value) => {
    const token =  await handleToken()
    const currentDate = new Date().toISOString().split('T')[0]
    const objNewComment = {commentValue:value,dateComment:`${currentDate}`,idUser:`newComment-${idType}`,img: "",nameUser: users[0]?.nameUser}
    const data = {idProduct:productID,detail:{value:value,date:currentDate}}
    
    postComment(token,data).then(res => {
      if(res.status === 201){
        setComments([objNewComment,...comments])
      }else{
        alert(res.message)
      }
    })
  }
  return (
    <>
      <section className="w-full h-auto min-h-[80vh] py-12 sm:py-16">
        <div className="container w-full mx-auto px-4">
          {data?.map(e => <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16" key={e.idProduct}>
            <div className="lg:col-span-3 lg:row-end-1">
              <div className="flex flex-col lg:flex-row items-center">
                <div className="w-4/5 flex justify-center items-center lg:order-2 lg:ml-5">
                  {/* img default */}
                  <div className="w-full flex justify-center items-center overflow-hidden rounded-lg">
                    <img className="h-[300px] w-full object-contain" src={img.img} alt="" />
                  </div>
                </div>
                {/* all Img */}
                <div className="mt-2 w-full lg:order-1 lg:w-1/5 lg:flex-shrink-0">
                  <div className="h-full flex flex-wrap flex-row  justify-around">
                    {data !== null && e.imgProduct.map((e, i) => <button type="button" className="flex-0 aspect-square mb-3 h-28 mx-2 overflow-hidden rounded-lg border-2 border-gray-900 text-center" key={`${e.type}-${i}`} onClick={() => { setImg(e) }}>
                      <img className="h-full w-full object-contain" src={e.img} alt="" />
                    </button>)}


                  </div>
                
                </div>
              </div>
              <div className="w-full flex flex-col justify-center items-center">
              <hr className="w-full h-[1px] bg-black mt-4 mx-auto" />
                <h1 className="mt-8 text-[18px] font-bold text-gray-900">Description</h1>
                <h2 className="mt-8 text-[18px] font-bold text-gray-900">{e.des}</h2>

              </div>
            </div>

            <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
              {/* Title */}
              <h1 className="text-center text-[25px] font-bold text-gray-900 cursor-pointer">{e.nameProduct}</h1>


              
              <hr className="w-full h-[1px] bg-black mt-2 mb-8 mx-auto" />
              <div className="mt-3 flex select-none flex-wrap items-center gap-1">
                {detailInf[e.nameType].map((df, i) =>
                  <span className={`w-full ${isDark ? ' text-slate-200' : 'text-slate-800'} flex flex-wrap items-center rounded-lg  px-6 py-2 font-bold`} key={`${df}-${i}`}>
                    {df.keyword.toUpperCase()}: {e.detail.map(d => d[df.keyword].map(c => 
                      <span className={` ${isDark ? 'border-white text-slate-200' : 'border-black text-slate-800'} mx-2 rounded-lg border hover:bg-zinc-900 hover:text-white transition-all  px-6 py-2 font-bold`}>
                        {typeof c === "number" ? c.toFixed(1): c}
                      </span>))}
                  </span>
                )}

              </div>

              <div className={`mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b border-solid ${isDark ? 'border-white':'border-black'} py-4 sm:flex-row sm:space-y-0`}>
                <div className="flex flex-col items-start">
                  <h1 className="text-3xl font-bold">Discount : {e.discount}%</h1>
                  <h1 className="text-3xl font-bold">Price: {e.price} USD</h1>
                </div>

                <button 
                  onClick={() => handleChangeDataAddToCart(e, 1)}
                  className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Add to cart
                </button>
              </div>

              <ul className="mt-8 space-y-2">
                <li className={`flex items-center text-left text-sm font-medium ${isDark ? 'text-gray-200' :'text-gray-600'} `}>
                  <svg className={`mr-2 block h-5 w-5 align-middle ${isDark ? 'text-gray-100' :'text-gray-500'} `} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className=""></path>
                  </svg>
                  Free shipping worldwide
                </li>

                <li className={`flex items-center text-left text-sm font-medium ${isDark ? 'text-gray-200' :'text-gray-600'} `}>
                  <svg className={`mr-2 block h-5 w-5 align-middle ${isDark ? 'text-gray-100' :'text-gray-500'} `} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" className=""></path>
                  </svg>
                  Cancel Anytime
                </li>
              </ul>
            </div>
          </div>)}

        </div>
        {isLogin === true && <PostComment props={{PostDataComment}} />}
        <hr className="w-[90%] h-[1px] bg-black mt-2 mb-8 mx-auto"></hr>
        <Comment data={comments} />
      </section>
      <div className="detailPage w-full h-auto min-h-[100px] flex flex-col justify-between">
        <h1 className="text-center text-[30px] text-slate-600 font-bold">The products of the same type</h1>
        <SameType props={{ idType, idProduct: productID,nameType }} />
      </div>
    </>
  );
}

export default ProductDetail;
