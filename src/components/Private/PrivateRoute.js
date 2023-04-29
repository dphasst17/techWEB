import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children}) => {
    const location = useLocation()
    const isLoggedIn = localStorage.getItem('isLogin') === 'true'; // Hàm kiểm tra trạng thái đăng nhập của người dùng
    sessionStorage.setItem("pathName",JSON.stringify(location.pathname));
    if (isLoggedIn) {
        return children;
    }

    return <Navigate
    to="/login"
    // Lưu đường dẫn hiện tại vào state của đối tượng location
  />;

};

export default PrivateRoute