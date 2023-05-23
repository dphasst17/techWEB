import classNames from "classnames/bind";
import style from "./User.module.scss";
import { ApiContext } from "~/ContextApi/ContextApi";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "~/components/Loading/Loading";

const cx = classNames.bind(style);
function User() {
  const { Users, PaginationPage, isShowButton, numPage,isLoad,HandleActivePage,
    activePage,handlePost } =
    useContext(ApiContext);
  const navigate = useNavigate();
  const [editUser, setEditUser] = useState(false);
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Address, setAddress] = useState("");
  const [Slice, setSlice] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const purchase = Users.flatMap((items) => items.purchaseOrder);
  PaginationPage(purchase, 5);
  const handlePagination = (e) => {
    setSlice(5 * e);
  };
  HandleActivePage(Slice)

  return (
    <>
      <div className={cx("user")}>
        
        <div className={cx("info")}>
          <div className={cx("title")}>
            <h1>User Information</h1>
          </div>
          <div className={cx("list")}>
            <div className={cx("detail")}>
              {Users.map((user) => 
                editUser === false ? (
                  <div className={cx("inf")} key={user.fullName}>
                    <div className={cx("input")}>{user.fullName}</div>
                    <div className={cx("input")}>{user.phoneNumber}</div>
                    <div className={cx("input")}>{user.email}</div>
                    <div className={cx("input")}>{user.address}</div>
                  </div>
                ) : (
                  <div className={cx("inf")} key={user.fullName}>
                    <input
                      type="text"
                      placeholder={user.fullName}
                      value={FullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                      }}
                    />
                    <input
                      type="text"
                      placeholder={user.phoneNumber}
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
                    <input
                      type="text"
                      placeholder={user.address}
                      value={Address}
                      
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      
                    />
                  </div>
                )
              )}
            </div>
            <div className={cx("buttonUser")}>
              {editUser === false ? (
                <button
                  onClick={() => {
                    setEditUser(true);
                  }}
                >
                  Edit information
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsLoading(true)
                    handlePost(
                      {
                        "fullName":(FullName ==="") ? Users.flatMap(us => us.fullName).toString() : FullName,
                        "phoneNumber":(Phone ==="") ? Users.flatMap(us => us.phoneNumber).toString() : Phone,
                        "email":(Email ==="") ? Users.flatMap(us => us.email).toString() : Email,
                        "address":(Address ==="") ? Users.flatMap(us => us.address).toString() : Address,
                      },setIsLoading,"/user",setEditUser
                    )
                  }}
                >
                  Success
                </button>
              )}
            </div>
          </div>
        </div>
        <div className={cx("purchaseOrder")}>
          <h1>Purchase Order</h1>
          <div className={cx("listPurchase")}>
            <div className={cx("detailPurchase")}>
              {purchase.length !== 0 ? (
                purchase?.slice(Slice - 5, Slice).map((items) => (
                  <div
                    className={cx("items")}
                    key={items.id}
                    onClick={() => {
                      navigate("/detail/" + items.id + "/" + items.title);
                    }}
                  >
                    <div className={cx("image")}>
                      <img src={items.url} alt="Img Product" />
                    </div>
                    <div className={cx("infProduct")}>
                      <div className={cx("items-child")}>
                        <h4>Title: {items.title}</h4>
                        <h4>Price: {items.price} USD</h4>
                      </div>
                      <div className={cx("items-child")}>
                        <h4>Quantity: {items.quantity}</h4>
  
                        <h4>Total: {items.total} USD</h4>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className={cx("buttonPG")}>
            <div className={cx("buttonCT")}>
              {isShowButton === true ? (
                numPage.map((items, index) => (
                  <div
                    className={cx(
                      `pagination${index === activePage ? "Active" : ""}`
                    )}
                    key={items}
                  >
                    <button onClick={() => handlePagination(items)}>{items}</button>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      {isLoad === true && <Loading />}
      {isLoading === true ? <Loading />: <></>}
    </>
  );
}

export default User;
