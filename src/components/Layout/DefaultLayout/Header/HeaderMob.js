import { faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faBars, faCartShopping, faCircleUser, faHardDrive, faHouse, faLaptop, faMagnifyingGlass, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { CartContext } from "~/contexts/Cart";
import "./Header.scss";
function HeaderMob({props}) {
    return <div className="headerMob flex lg:hidden w-[90%] h-[6rem] m-auto">
    <div className="navMob w-2/5 h-full flex">
      <FontAwesomeIcon className="h-1/2 mx-[5%] my-auto"icon={faBars} onClick={() => {props.setIsToggleNav("translateX(-17%)")}}/>
      <div className="navDetail w-[70%] h-full fixed flex flex-col justify-evenly bg-white z-40 pl-[10%] pr-[1%]" style={{transform: props.isToggleNav}}>
        <div className="navClose w-full h-[5%] flex flex-row-reverse justify-between">
          <FontAwesomeIcon icon={faX} onClick={() => {props.setIsToggleNav("translateX(-200%)")}}/>
          <Link to={props.checkLogin === true ? "/checkout" : "/login"} className="w-[10%] h-full no-underline text-black flex ml-[4%]">
            <div className="cartMob flex justify-center">
              <FontAwesomeIcon icon={faCartShopping} />
              <CartContext.Consumer>
                {({cartItems}) => 
                  <div className="totalItems w-[20px] h-[20px] flex justify-center items-center bg-[#c30909] text-white rounded-[50%] mt-[-5%]">
                    {(cartItems?.length > 0)? cartItems.length : 0}
                  </div>
                }
              </CartContext.Consumer>
            </div>
          </Link>
        </div>
        <div className="navContent w-full h-1/5 flex flex-col justify-between">
          <div className="navItemsMob w-full h-[33%] flex flex-row justify-start">
            <div className="iconNavMob w-1/5 h-full"><FontAwesomeIcon icon={faHouse} /></div>
            <span>
              <Link className="text-[16px] no-underline text-black font-semibold" to="/">HOME</Link>
            </span>
          </div>
          <div className="navItemsMob w-full h-[33%] flex flex-row justify-start">
            <div className="iconNavMob w-1/5 h-full"><FontAwesomeIcon icon={faLaptop} /></div>
            <span>
              <Link className="text-[16px] no-underline text-black font-semibold" to="/product">PRODUCT</Link>
            </span>
          </div>
          <div className="navItemsMob w-full h-[33%] flex flex-row justify-start">
            <div className="iconNavMob w-1/5 h-full"><FontAwesomeIcon icon={faHardDrive} /></div>
            <span>
              <Link className="text-[16px] no-underline text-black font-semibold" to="/accessory">ACCESSORY</Link>
            </span>
          </div>
          <div className="navItemsMob w-full h-[33%] flex flex-row justify-start" onClick={props.handleUser}>
            <div className="iconNavMob w-1/5 h-full"onClick={props.handleUser}><FontAwesomeIcon icon={faCircleUser} /></div>
            <span>
              <Link className="text-[16px] no-underline text-black font-semibold" to="/user">User information</Link>
            </span>
          </div>
        </div>
        <div className="navUser w-full h-[10%] flex flex-col justify-between">
          <div className="buttonLog w-full h-[30px] mx-[-2%] my-0">
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
        <div className="navContact w-full h-[25%]">
          <div className="iconContact h-[30%] flex flex-row flex-wrap items-center text-[18px] font-[550] cursor-pointer text-[#1e1194]"><FontAwesomeIcon className="w-1/5 h-[44%] m-0" icon={faFacebook}/><span className="flex items-center">Facebook</span></div>
          <div className="iconContact h-[30%] flex flex-row flex-wrap items-center text-[18px] font-[550] cursor-pointer"><FontAwesomeIcon className="w-1/5 h-[44%] m-0" icon={faGithub}/><span className="flex items-center">Github</span></div>
          <div className="iconContact h-[30%] flex flex-row flex-wrap items-center text-[18px] font-[550] cursor-pointer"><FcGoogle className="w-1/5 h-[44%] m-0" /><span className="flex items-center">Mail</span></div>
        </div>
      </div>
    </div>
    <div className="logoMob">
      <img src="" alt="" />
    </div>
    <div className="searchMob w-2/5 h-1/2 flex m-auto rounded-[10px] border border-solid bg-transparent pl-[2%]">
      <input
        className="w-[68%] h-[90%] bg-transparent outline-none border-none"
        placeholder="Search......"
        spellCheck="false"
        value={props.valueSearch}
        onChange={props.handelValueSearch}
        onClick={props.handleSetIsShowResult}
      />
      <button onClick={props.show} className="iconSearchMob w-[30%] h-4/5 m-auto border-none outline-none rounded-[10px] bg-[#4675c8] cursor-pointer">
        <FontAwesomeIcon className="h-3/5 m-auto fill-current text-white" icon={faMagnifyingGlass} />
      </button>
    </div>
  </div>;
}

export default HeaderMob;