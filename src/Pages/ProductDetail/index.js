import React, { useContext, useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import { CartContext } from "~/contexts/Cart";
import { useGetDataByKey} from "~/hooks/useFetchData";
import * as detailInf from "~/json/inputAllDetail";
import Comment from "./detailComment";
import SameType from "./sameProductType";
import { StateContext } from "~/contexts/stateContext";
import PostComment from "./postComment";
const ProductDetail = () => {
  const {addToCart} = useContext(CartContext);
  const {isDark} = useContext(StateContext)
  const {idType,nameType,productID} = useParams();
  const {data,err} = useGetDataByKey('product','getProductDetail',JSON.stringify({nameType:nameType,idProduct:productID}));
  const {data:dataComment,err:errComment} = useGetDataByKey('comment','getCommentById',JSON.stringify({idProduct:productID}))
  const [img,setImg] = useState("");
  const [comments,setComments] = useState(null);
  const isLogin = JSON.parse(localStorage.getItem('isLogin') || false)
  useEffect(() => {
    console.log(isLogin === true)
  },[isLogin])
  useEffect(() => {
    data !== null && setImg(data[0].imgProduct.filter(e => e.type === "default")[0])
    dataComment !== null && setComments(dataComment[0].detail)
  },[data,dataComment])
  const handleChangeDataAddToCart = (product,count) => {
    const newData = [product].map(e => {
      return {
        ...e,
        imgProduct:e.imgProduct.filter(i => i.type === "default")[0].img
      }
    })
    addToCart(newData[0],count)
  }
  return (
    <div className="detailPage w-full h-auto min-h-[810px] flex flex-col justify-between">
      <div className="items w-full min-h-[350px] h-auto my-[4%]">
        {data?.map((items) => {return <div className="itemsChild w-full h-auto flex flex-wrap flex-row justify-center" key={items.idProduct}>
              <div className="image w-full md:w-2/5 flex flex-col items-center justify-center">
                <img src={img.img} alt="img Product" className="w-[300px] h-[300px] object-contain"/>
                <div className="listAllImg w-full h-auto flex flex-wrap justify-evenly md:justify-between items-center">
                  {data !== null && items.imgProduct.map((e,i) => <img key={`${e.type}-${i}`} onClick={() => {setImg(e)}} className={`w-1/5 md:w-[150px] h-[50px] md:h-[100px] object-contain ${img.img === e.img && 'border-solid border-[2px] border-blue-500 rounded-lg'}`} src={e.img} alt="imgProduct"/>)}
                </div>
              </div>
              <div className="itemsContent w-full md:w-2/4 h-auto flex flex-col">
                <div className="title w-full flex items-center justify-center">
                  <h1 className="text-[30px] font-bold text-slate-600">{items.nameProduct}</h1>
                </div>
                <hr></hr>
                <div className="price w-full h-auto">
                  <h1 className="text-[20px] font-semibold text-slate-500">Price: <span className="text-[25px] font-bold text-blue-500">{items.price}</span> USD</h1>
                </div>
                <div className={`des w-full h-auto text-[20px] font-semibold ${isDark ? 'text-slate-300': 'text-slate-500'} my-4`}>
                  DESCRIPTION : <span className={`font-bold ${isDark ? 'text-slate-300': 'text-slate-600'} `}>{items.des}</span>
                </div>
                <div className="detail w-full h-auto flex flex-col justify-center my-4">
                  {detailInf[items.nameType].map((e,i) => 
                    <span className={`w-full h-auto ${isDark ? 'text-slate-300': 'text-slate-500'} text-[18px] font-semibold`} key={`${e}-${i}`}>
                      {e.keyword.toUpperCase()}:
                      <span className="text-[20px] font-bold text-blue-500">
                        {items.detail.map(d => typeof(d[e.keyword]) === 'number' ? d[e.keyword].toFixed(1):d[e.keyword])}
                      </span>
                    </span>
                  )}
                </div>
                <div className="button w-full h-auto flex items-center justify-center">
                  <button className="w-[200px] h-[40px] rounded-lg bg-blue-800 text-white font-semibold m-2" onClick={() => handleChangeDataAddToCart(items,1)}>
                    Add to Cart
                  </button>
                  <button className="w-[200px] h-[40px] rounded-lg bg-red-800 text-white font-semibold m-2">Add to favorites</button>
                </div>
              </div>
            </div>}
            
          )}
      </div>
      {isLogin === true && <PostComment />}
      <h1 className="text-center text-[30px] text-slate-600 font-bold">Comment</h1>
      <Comment data={comments} />
      <h1 className="text-center text-[30px] text-slate-600 font-bold">The products of the same type</h1>
      <SameType props={{idType,idProduct:productID}}/>
    </div>
  );
}

export default ProductDetail;
