import iconLogin from "./ImageLogin/icon_login.png";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Forgot from "./forgotPass";

function FormLogin({ props }) {
  return (
    <section className="w-full h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3">
        <img src={iconLogin} alt="Login icon" />
      </div>
      <div className="w-3/4 md:w-1/3 lg:w-[30%] flex flex-col justify-center items-center">
        <div className="w-[200px] flex flex-col items-center justify-center text-center md:text-left">
          <label className="mr-1 text-[20px] font-semibold text-slate-500">
            Sign in with
          </label>
          <span
            className="loginFace w-full h-[30px] flex flex-row items-center bg-[#3b5998] rounded-[5px] mt-2 pl-1 cursor-pointer"
            onClick={props.HandleFacebookLogin}
          >
            <FaFacebook className="w-[10%] h-full my-auto mx-[0] text-white" />
            <span className="h-full flex items-center ml-2 text-white text-[10px] font-semibold">
              FACEBOOK
            </span>
          </span>
          <span
            className="loginGoogle w-full h-[30px] flex flex-row items-center bg-google-linear rounded-[5px] mt-2 pl-1 cursor-pointer"
            onClick={props.signIn}
          >
            <FcGoogle className="w-[10%] h-full my-auto mx-[0]" />
            <span className="h-full flex items-center ml-2 text-white text-[10px] font-semibold">
              GOOGLE MAIL
            </span>
          </span>
          <span className="loginGit w-full h-[30px] flex flex-row items-center bg-[#24292e] rounded-[5px] mt-2 pl-1 cursor-pointer">
            <FaGithub className="w-[10%] h-full my-auto mx-[0] text-white" />
            <span className="h-full flex items-center ml-2 text-white text-[10px] font-semibold">
              GITHUB
            </span>
          </span>
        </div>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
            Or
          </p>
        </div>
        {props.formForgot === false ? (props.isLog === true ? (
          <form className="loginForm w-full">
            <input
              className={`text-sm w-full px-4 py-2 border-[1px] border-solid ${props.errLogin.loginUsername ? 'border-red-500' : 'border-gray-300'} outline-none rounded`}
              type="text"
              {...props.registerLogin("loginUsername", { required: true })}
              placeholder="Enter your username"
            />
            <div className={`text-sm w-full flex flex-row justify-around bg-white p-2 border border-solid ${props.errLogin.loginPassword ? 'border-red-500' : 'border-gray-300'} rounded mt-4`}>
              <input
                className="text-sm w-[90%] border-none rounded outline-none"
                type={props.type}
                {...props.registerLogin("loginPassword", { required: true })}
                placeholder="Enter your password"
              />
              <div className="eyeSlash w-[5%] h-full cursor-pointer">
                <FontAwesomeIcon
                  className="w-[20px] h-[20px]"
                  icon={props.showPass === true ? faEyeSlash : faEye}
                  onClick={() => {
                    if (props.showPass === true) {
                      props.setType("text");
                      props.setShowPass(false);
                    } else {
                      props.setType("password");
                      props.setShowPass(true);
                    }
                  }}
                />
              </div>
            </div>
          </form>
        ) : (
          <form className="registerForm w-full">
            <input
              className={`outline-none text-sm w-full px-4 py-2 border-[1px] border-solid ${props.errCreate.regisUsername ? 'border-red-500' : 'border-gray-300'} rounded`}
              type="text"
              {...props.registerCreate("regisUsername", { required: true })}
              placeholder="Username"
            />
            <input
              className={`outline-none text-sm w-full px-4 py-2 border-[1px] border-solid ${props.errCreate.regisEmail ? 'border-red-500' : 'border-gray-300'} rounded mt-4`}
              type="email"
              {...props.registerCreate("regisEmail", { required: true })}
              placeholder="Email"
            />
            <div className="passRegis w-full flex flex-col">
              <input
                className={`w-full outline-none text-sm px-4 py-2 border-[1px] border-solid ${props.errCreate.regisPassword ? 'border-red-500' : 'border-gray-300'} rounded mt-4`}
                type={props.type}
                {...props.registerCreate("regisPassword", { required: true })}
                placeholder="Password"
              />
              <input
                className={`w-full outline-none text-sm  px-4 py-2 border-[1px] border-solid ${props.errCreate.regisConfirm ? 'border-red-500' : 'border-gray-300'} rounded mt-4`}
                type={props.type}
                {...props.registerCreate("regisConfirm", { required: true })}
                placeholder="Confirm password"
              />
              <div
                className="w-[200px] flex items-center cursor-pointer text-blue-600 hover:text-blue-700 font-semibold mt-4"
                onClick={() => {
                  if (props.showPass === true) {
                    props.setType("text");
                    props.setShowPass(false);
                  } else {
                    props.setType("password");
                    props.setShowPass(true);
                  }
                }}
              >
                <FontAwesomeIcon
                  className="w-[15px] h-[15px] mr-2"
                  icon={props.showPass === true ? faEye : faEyeSlash}
                />
                {props.showPass === true ? "Show password" : "Hide password"}
              </div>
            </div>
            
          </form>
        )): <Forgot state={props.setFormForgot} handle={props.handleForgotPass} />}
        {props.formForgot === false && props.isLog === true && (
          <div className="w-full mt-4 flex justify-between font-semibold text-sm cursor-pointer">
            <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer ">
              <input className="mr-2" type="checkbox" />
              <span>Remember Me</span>
            </label>
            <p onClick={() => {props.setFormForgot(true)}} className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4 cursor-pointer">
              Forgot Password?
            </p>
          </div>
        )}
        <div className="text-center md:text-left">
          {props.isLog === true ? (props.formForgot === false &&
            <button
              className="my-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              type="button"
              onClick={(e) => { e.preventDefault(); props.submitLogin(props.onSubmitLogin)();}}
            >
              Login
            </button>
          ) : (
            <button
              className="my-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              type="button"
              onClick={(e) => { e.preventDefault(); props.submitCreate(props.onSubmitCreate)();}}
            >
              Register
            </button>
          )}
        </div>
        {props.isLog === true ? ( props.formForgot === false &&
          <div className="w-full flex flex-start mt-4 font-semibold text-sm text-slate-500 text-center md:text-left cursor-pointer">
            Don't have an account?{" "}
            <p
              onClick={() => {props.setIsLog(false)}}
              className="text-red-600 hover:underline hover:underline-offset-4 cursor-pointer"
            >
              Register
            </p>
          </div>
        ) : (
          <p
            className=" font-semibold text-red-600 hover:underline hover:underline-offset-4 cursor-pointer"
            onClick={() => {props.setIsLog(true)}}
          >
            You have an account?
          </p>
        )}
      </div>
    </section>
  );
}

export default FormLogin;
