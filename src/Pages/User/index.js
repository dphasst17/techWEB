import classNames from "classnames/bind";
import style from "./User.module.scss";

const cx = classNames.bind(style);
function User() {
  let userINF = JSON.parse(localStorage.getItem("login") || "[]");
  return (
    <div className={cx("user")}>
      <div className={cx("title")}>
        <h1>User Information</h1>
      </div>
      <div className={cx("list")}>
        <div className={cx("detail")}>
          {userINF.map((user) => {
            return user.user.map((user, index) => (
              <div className={cx("inf")} key={index}>
                <div className={cx("input")}>{user.name}</div>
                <div className={cx("input")}>{user.phone}</div>
                <div className={cx("input")}>{user.address}</div>
              </div>
            ));
          })}
        </div>
      </div>
    </div>
  );
}

export default User;
