import { faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faBars,
  faCartShopping,
  faCircleUser,
  faHardDrive,
  faHouse,
  faLaptop,
  faMagnifyingGlass,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "~/contexts/Cart";
import { useContext } from "react";
import { StateContext } from "~/contexts/stateContext";
function HeaderMob({ props }) {
  const { isDark, setIsDark } = useContext(StateContext);
  const navigate = useNavigate();
  let getPath = window.location.pathname;
  const handleSetDarkMode = () => {
    setIsDark(!isDark);
    localStorage.setItem("dark", !isDark);
  };
  const navData = [
    {
      name: "Home",
      icon: faHouse,
      link: "/",
    },
    {
      name: "Product",
      icon: faLaptop,
      link: "/product",
    },
    {
      name: "More",
      icon: faHardDrive,
      link: "/more",
    },
    {
      name: "User",
      icon: faCircleUser,
      link: "/user",
    },
  ];
  return (
    <div className="headerMob flex items-center justify-center lg:hidden w-[90vw] h-[6rem] m-auto">
      <div className="navMob w-2/5 h-4/5 flex">
        <FontAwesomeIcon
          className={`h-1/2 ${isDark ? 'text-slate-100':'text-slate-800'} mx-[5%] my-auto`}
          icon={faBars}
          onClick={() => {
            props.setIsToggleNav("translateX(-10%)");
          }}
        />
        <div
          className={`navDetail w-[80vw] ssm:w-[60vw] md:w-[40vw] h-screen fixed flex flex-col justify-evenly top-0 z-50 ${
            isDark ? "bg-slate-600" : "bg-slate-200"
          } z-40`}
          style={{ transform: props.isToggleNav }}
        >
          <div className="navClose w-full h-[5%] flex flex-row-reverse justify-between px-10">
            <FontAwesomeIcon
              icon={faX}
              className={`${isDark ? 'text-slate-100':'text-slate-800'}`}
              onClick={() => {
                props.setIsToggleNav("translateX(-200%)");
              }}
            />
            <Link
              to={props.checkLogin === true ? "/cart" : "/login"}
              className="w-[10%] h-full no-underline text-black flex"
            >
              <div className="cartMob flex justify-center">
                <FontAwesomeIcon icon={faCartShopping} />
                <CartContext.Consumer>
                  {({ cartItems }) => (
                    <div className="totalItems w-[20px] h-[20px] flex justify-center items-center bg-[#c30909] text-white rounded-[50%] mt-[-5%]">
                      {cartItems?.length > 0 ? cartItems.length : 0}
                    </div>
                  )}
                </CartContext.Consumer>
              </div>
            </Link>
          </div>
          <div className="navContent w-full h-1/5 flex flex-col justify-between px-10">
            {navData.map((n) => (
              <div
                onClick={() => {
                  navigate(n.link);
                }}
                className={`navItemsMob w-full h-[33%] ${
                  getPath === n.link ? "bg-slate-500" : ""
                } rounded-lg flex flex-row justify-start`}
              >
                <div className="iconNavMob w-1/5 h-full flex items-center justify-center">
                  <FontAwesomeIcon
                    className={`${
                      isDark ? "text-slate-100" : ""
                    } ${getPath === n.link ? "text-slate-100" : ""}`}
                    icon={n.icon}
                  />
                </div>
                <span
                  className={`text-[16px] ${
                    isDark ? "text-slate-100" : ""
                  } ${getPath === n.link ? "text-slate-100" : ""} flex items-center justify-center no-underline text-black font-semibold`}
                >
                  {n.name.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
          <div className="navUser w-full h-[10%] flex flex-col justify-between items-center px-10">
            <div
              onClick={() => {
                handleSetDarkMode();
              }}
              className="btnDarkMod w-full h-[30px] bg-slate-500 rounded-lg flex items-center justify-center cursor-pointer text-[15px] text-slate-100 font-bold select-none"
            >
              {isDark === true ? "Light" : "Dark"}
            </div>
            <div className="buttonLog w-full h-[30px] my-0">
              <a href="/login" className="text-white font-[550] no-underline">
                <input
                  className="w-full h-[30px] rounded-[10px] bg-blue-800 hover:bg-blue-600 outline-none border-none font-semibold text-white cursor-pointer"
                  type="button"
                  value={props.valueIP}
                  onClick={props.handleButtonLog}
                />
              </a>
            </div>
          </div>
          <h2 className="w-full h-[20px] text-center">Contact Us</h2>
          <div className="navContact w-full h-[25%] px-10">
            <div className="iconContact h-[30%] flex flex-row flex-wrap items-center text-[18px] font-[550] cursor-pointer text-[#1e1194]">
              <FontAwesomeIcon
                className="w-1/5 h-[44%] m-0"
                icon={faFacebook}
              />
              <span className="flex items-center">Facebook</span>
            </div>
            <div className="iconContact h-[30%] flex flex-row flex-wrap items-center text-[18px] font-[550] cursor-pointer">
              <FontAwesomeIcon className="w-1/5 h-[44%] m-0" icon={faGithub} />
              <span className="flex items-center">Github</span>
            </div>
            <div className="iconContact h-[30%] flex flex-row flex-wrap items-center text-[18px] font-[550] cursor-pointer">
              <FcGoogle className="w-1/5 h-[44%] m-0" />
              <span className="flex items-center">Mail</span>
            </div>
          </div>
        </div>
      </div>
      <div className="searchMob w-full h-3/5 flex m-auto rounded-lg border-solid border-slate-900 border-[1px] bg-transparent pl-[2%]">
        <input
          className="w-[68%] h-[90%] bg-transparent outline-none border-none"
          placeholder="Search......"
          spellCheck="false"
          value={props.valueSearch}
          onChange={props.handelValueSearch}
          onClick={props.handleSetIsShowResult}
        />
        <button
          onClick={props.show}
          className="iconSearchMob w-[30%] h-4/5 m-auto border-none outline-none rounded-lg bg-[#4675c8] cursor-pointer"
        >
          <FontAwesomeIcon
            className="h-3/5 m-auto fill-current text-white"
            icon={faMagnifyingGlass}
          />
        </button>
      </div>
    </div>
  );
}

export default HeaderMob;
