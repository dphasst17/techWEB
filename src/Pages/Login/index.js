/* eslint-disable no-undef */
/* eslint-disable no-lone-blocks */
import React from "react";
import classNames from "classnames/bind";
import style from "./Login.module.scss";
import LoginControl from "./LoginControl";
const cx = classNames.bind(style);



function Login() {

    return ( 
        <LoginControl />
     );
}

export default Login;