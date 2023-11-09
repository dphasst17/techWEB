import   "./User.scss";
import { ApiContext } from "~/contexts/apiContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "~/components/Loading/Loading";
import Pagination from "~/components/PaginationView/Pagination";
import { StateContext } from "~/contexts/stateContext";
import Address from "./lisAddress";
import HandleToken from "~/helper/handleToken";
import {FaUserEdit} from "react-icons/fa"
import Order from "./listOrder";
import { changeInfo } from "~/api/userApi";
import FormAddress from "./formAddress";
function User() {
  const { PaginationPage, isShowButton, numPage,HandleActivePage,
    activePage} = useContext(ApiContext);
  const {users,isDark} = useContext(StateContext)
  const navigate = useNavigate();
  const [order,setOrder] = useState(null)
  const [editUser, setEditUser] = useState(false);
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Slice, setSlice] = useState(5);
  const [formAdd,setFormAdd] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const handleToken = HandleToken()
  useEffect(() => {
    users !== null && setOrder(users.flatMap((items) => items.order))
  },[users])
  PaginationPage(order, 5);
  const HandlePagination = (e) => {
    setSlice(5 * e);
  };
  HandleActivePage(Slice,5)
  const handlePost = async (data) => {
    const token = await handleToken()
    if(token !== undefined){
      changeInfo(token,data)
      .then(res => {
        if(res.status === 5000){throw res.message}
        res.status === 200 && window.location.reload()
      })
      .catch(err => console.log(err))
    }
    
  }
  return (
    <>
      <div className="user">
        <div className="info">
          <div className="title">
            <h1 className="text-[25px] font-extrabold text-slate-600 cursor-pointer">User Information</h1>
          </div>
          <div className="list">
            <div className="detail">
              {users !== null &&  users.map((user) => 
                editUser === false ? (
                  <div className="inf" key={user.nameUser}>
                    <div className={`input ${isDark ? 'text-white':'text-slate-700'}`}>{user.nameUser}</div>
                    <div className={`input ${isDark ? 'text-white':'text-slate-700'}`}>{user.phone}</div>
                    <div className={`input ${isDark ? 'text-white':'text-slate-700'}`}>{user.email}</div>
                  </div>
                ) : (
                  <div className="inf" key={user.nameUser}>
                    <input
                      type="text"
                      placeholder={user.nameUser}
                      value={FullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                      }}
                    />
                    <input
                      type="text"
                      placeholder={user.phone}
                      value={Phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                    <input
                      type="text"
                      placeholder={user.email}
                      value={Email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                )
              )}
            </div>
            <div className="buttonUser">
              {editUser === false ? (
                <button
                  onClick={() => {
                    setEditUser(true);
                  }}
                  className="font-bold flex items-center justify-center"
                >
                  <FaUserEdit className="w-1/5 h-2/4"/>
                  Edit information
                </button>
              ) : (
                <button
                  onClick={() => {
                    handlePost(
                      {
                        "name":(FullName ==="") ? users.flatMap(us => us.nameUser).toString() : FullName,
                        "phone":(Phone ==="") ? users.flatMap(us => us.phone).toString() : Phone,
                        "email":(Email ==="") ? users.flatMap(us => us.email).toString() : Email,
                      }
                    );
                  }}
                >
                  Success
                </button>
              )}
            </div>
          </div>
          <Address props={{setFormAdd,setIsLoading}}/>
        </div>
        <div className="purchaseOrder">
          <h1 className="text-[25px] font-extrabold text-slate-600 cursor-pointer">Purchase Order</h1>
          <div className="listPurchase">
            <div className="detailPurchase min-h-[200px] sm:min-h-[350px] lg:min-h-[750px]">
              {order !== null ? (
                order?.slice(Slice-5,Slice).map((items) => (
                  <div
                    className="items"
                    key={`${items.idBill}-${items.idProduct}`}
                    onClick={() => {
                      navigate("/detail/" + items.id + "/" + items.title);
                    }}
                  >
                    <div className="image">
                      <img src={items.imgProduct} alt="Img Product" />
                    </div>
                    <div className="infProduct">
                      <div className={`items-child ${isDark ? 'text-slate-100':'text-slate-800'} font-semibold`}>
                        <h4>Title: <span className={`font-bold ${isDark ? 'text-slate-100' : 'text-slate-700'}`}>{items.nameProduct}</span></h4>
                        <h4>Price: <span className={`font-semibold ${isDark ? 'text-slate-100' : 'text-slate-700'}`}>{items.price}</span> USD</h4>
                      </div>
                      <div className={`items-child ${isDark ? 'text-slate-100':'text-slate-800'} font-semibold`}>
                        <h4>Quantity: <span className={`font-semibold ${isDark ? 'text-slate-100' : 'text-slate-700'}`}>{items.count}</span></h4>
  
                        <h4>Total: <span className={`font-semibold ${isDark ? 'text-slate-100' : 'text-slate-700'}`}>{items.totalProduct}</span> USD</h4>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
          {isShowButton === true && (
            <Pagination props={{numPage,activePage,HandlePagination}}/>
          )}
        </div>
      </div>
      <Order />
      {formAdd === true && <FormAddress props={{setFormAdd}}/>}
      {isLoading === true && <Loading />}
    </>
  );
}

export default User;
