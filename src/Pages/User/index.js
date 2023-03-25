import classNames from "classnames/bind";
import style from "./User.module.scss";
import { ApiContext } from "~/ContextApi/ContextApi";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "~/components/Loading/Loading";

const cx = classNames.bind(style);
function User() {
  const { Users, PaginationPage, isShowButton, numPage, urlUsers,isLoad } =
    useContext(ApiContext);
  const navigate = useNavigate();
  const [editUser, setEditUser] = useState(false);
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Address, setAddress] = useState("");
  const [Slice, setSlice] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  let userID = JSON.parse(localStorage.getItem("identificationID") || "[]");
  let dataUser = Users.filter((items) => items.id.includes(userID));
  const purchase = dataUser.flatMap((items) => items.purchaseOrder);
  PaginationPage(purchase, 5);
  const handlePagi = (e) => {
    setSlice(5 * e);
  };
  const activePage = numPage.findIndex((e) => e === Slice / 5);

  return (
    <>
      {/* <button onClick={() => {console.log(dataUser)}}>check</button> */}
      <div className={cx("user")}>
        {/* <button onClick={() => {console.log("us" + (Users.length+1))}}>Check</button> */}
        <div className={cx("info")}>
          <div className={cx("title")}>
            <h1>User Information</h1>
          </div>
          <div className={cx("list")}>
            <div className={cx("detail")}>
              {dataUser.map((user) => {
                return user.user.map((user, index) =>
                  editUser === false ? (
                    <div className={cx("inf")} key={index}>
                      <div className={cx("input")}>{user.fullName}</div>
                      <div className={cx("input")}>{user.phoneNumber}</div>
                      <div className={cx("input")}>{user.email}</div>
                      <div className={cx("input")}>{user.address}</div>
                    </div>
                  ) : (
                    <div className={cx("inf")} key={index}>
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
                );
              })}
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
                    const option = {
                      method: "PUT",
                      headers: {
                        "Content-type": "application/json; charset=UTF-8",
                      },
                      body: JSON.stringify({
                        user: [{
                          "fullName":(FullName ==="") ? dataUser.flatMap(us => us.user.flatMap(items => items.fullName)).toString() : FullName,
                          "phoneNumber":(Phone ==="") ? dataUser.flatMap(us => us.user.flatMap(items => items.phoneNumber)).toString() : Phone,
                          "email":(Email ==="") ? dataUser.flatMap(us => us.user.flatMap(items => items.email)).toString() : Email,
                          "address":(Address ==="") ? dataUser.flatMap(us => us.user.flatMap(items => items.address)).toString() : Address,
                        }]
                      }),
                    }
                    fetch(urlUsers + "/" + userID, option)
                    .then((response) =>{if(response.status === 200){
                      setIsLoading(false)
                      window.location.pathname = "/user";
                      setEditUser(false)
                    }})
                    
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
                purchase.slice(Slice - 5, Slice).map((items, index) => (
                  <div
                    className={cx("items")}
                    key={index}
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
                    key={index}
                  >
                    <button onClick={() => handlePagi(items)}>{items}</button>
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
      {isLoading === true ? <div className={cx("loading")}>
        <div className={cx("overlay")}></div>
        <div className={cx("loadingCT")}> 
          <p>Loading ...</p>
          <div className={cx("last")}></div>
        </div>
      </div> : <></>}
    </>
  );
}

export default User;
