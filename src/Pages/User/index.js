import classNames from "classnames/bind";
import style from "./User.module.scss";
import { ApiContext } from "~/ContextApi/ContextApi";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(style);
function User() {
  const { Users } = useContext(ApiContext);
  const navigate = useNavigate()
  let userID = JSON.parse(localStorage.getItem("identificationID") || "[]");
  let dataUser = Users.filter((items) => userID.includes(items.id));
  const purchase = Users.map(items => items.purchaseOrder);
  return (
    <div className={cx("user")}>
      <div className={cx("info")}>
        <div className={cx("title")}>
          <h1>User Information</h1>
        </div>
        <div className={cx("list")}>
          <div className={cx("detail")}>
            {dataUser.map((user) => {
              return user.user.map((user, index) => (
                <div className={cx("inf")} key={index}>
                  <div className={cx("input")}>{user.fullName}</div>
                  <div className={cx("input")}>{user.phoneNumber}</div>
                  <div className={cx("input")}>{user.address}</div>
                </div>
              ));
            })}
          </div>
          <div className={cx("buttonUser")}>
            <button>Edit information</button>
          </div>
        </div>
      </div>
      <div className={cx("purchaseOrder")}>
        <h1>Purchase Order</h1>
        <div className={cx("listPurchase")}>
          <div className={cx("detailPurchase")}>
            {(purchase.length!== 0) ?
              dataUser.map((item) =>
                item.purchaseOrder.map((items, index) => (
                  <div className={cx("items")} key={index} onClick={() =>{navigate("/detail/" + items.id)}}>
                    <div className={cx("image")}>
                      <img src={items.url} alt="Img Product" />
                    </div>
                    <div className={cx("infProduct")}>
                      <div className={cx("items-child")}>
                        <h4>Title: {items.title.length > 20 ? items.title.slice(0,20)+`...` : items.title}</h4>
                        <h4>Quantity: {items.quantity}</h4>
                      </div>
                      <div className={cx("items-child")}>
                        <h4>Price: {items.price} USD</h4>
                        <h4>Total: {items.total} USD</h4>
                      </div>
                    </div>
                  </div>
                ))
              )
             :<></>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
