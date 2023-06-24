import { faCartShopping, faCircleUser, faList, faMagnifyingGlass, faTrashCan, faUser, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { CartContext } from "~/Contexts/Cart";
import logo01 from "~/components/Layout/DefaultLayout/Header/img/tech-store-low-resolution-logo-black-on-transparent-background.png";
import SearchResults from "./Search";
import "~/tailwind.css"
import "./Header.scss"
function HeaderPc({props}) {
    return <div className="header hidden lg:flex z-40 w-[90%] h-[10%]  justify-around items-center bg-transparent mt-[1%] ml-[5%] relative">
    <nav className="w-[30%] h-[70px] bg-transparent flex justify-around" ref={props.nav}>
      {props.menuNav.map((nav, index) => (
        <div className={`navItems ${index === props.activeNav ? 'active' : ''}`} key={nav.title}>
          <Link to={nav.path}>
            <div className="nav_text h-4/5 text-[20px] text-black font-[500]">
              {nav.title}
              <div className="hover_nav"></div>
            </div>
          </Link>
        </div>
      ))}
    </nav>

    <div className="logo w-[200px] h-[70px] z-40 ml-[2%]">
      <img src={logo01} alt="logo" className="w-full h-full object-contain"/>
    </div>
    {/* Search input */}
    <div className="search w-[25%] h-[30px] bg-transparent flex ml-[4%] pl-[2%] rounded-[10px]">
      <input
        className="w-[68%] h-[90%] bg-transparent outline-none border-none"
        placeholder="Search......"
        spellCheck="false"
        value={props.valueSearch}
        onChange={props.handelValueSearch}
        onClick={props.handleSetIsShowResult}
      />
      <button onClick={props.show} className="iconSearch w-[30%] h-4/5 m-auto border-none outline-none rounded-[10px] bg-[#4675c8] cursor-pointer">
        <FontAwesomeIcon className="text-white" icon={faMagnifyingGlass} />
      </button>
      {props.showResult && (
        <div className="searchResult absolute w-[25%] h-auto min-h-[70px] bg-white rounded-[10px] my-[3%] mx-[-2%] p-[1%]">
          <div className="title h-[20px] flex">
            <p className="w-[93%] text-[15px] text-[#393939] font-bold">Search result</p>
            <span className="w-[6%] h-[15px] cursor-pointer" onClick={props.handleSetHideResult}>
              <FontAwesomeIcon icon={faX} />
            </span>
          </div>
          <div className="result w-full h-auto">
            <SearchResults />
          </div>
          <button
            className="w-1/2 h-[2em] rounded-[10px] text-white border-none bg-blue-800 hover:bg-blue-600 mt-[5%] translate-x-[50%] translate-y[-20%]"
            onClick={() => {
                props.navigate("/searchResult");
            }}
          >
            See more...
          </button>
        </div>
      )}
    </div>
    {/* Icon */}
    <div className="icon w-[10%]">
      <div className="detail w-full flex justify-between items-center">
        
        <div className="cart_Shopping w-[50%] h-full flex flex-col border-none bg-transparent cursor-pointer">
              <div className="cartIcon w-full flex flex-row-reverse">
                <div className="show w-[25px] h-[25px] bg-[#c30909] rounded-[50%] text-white text-center flex justify-center items-center">{(props.cartItems?.length > 0)? props.cartItems.length : 0}</div>
                <FontAwesomeIcon icon={faCartShopping} />
              </div>
              <div className="cart_contents  flex-col justify-around w-[34%] min-h-[300px] bg-white rounded-[10px] mt-[3%] ml-[-30%] z-50 absolute">
                <div className="cover min-h-[200px]">
                  {props.cartItems?.map((cartItems) => (
                    <div className="cartItem w-full h-auto mt-[2%] flex flex-wrap items-center" key={cartItems.id}>
                      <div className="item w-full flex">
                        <div className="img w-1/4 h-[69px] flex justify-center">
                          <img src={cartItems.url} alt="IMG-product" className="w-1/2 h-full object-contain"/>
                        </div>
                        <div className="information w-1/2">
                          <h4 className="mt-[5%] text-[15px] text-[#bc0c0c] font-semibold">{cartItems.title.length > 20 ? cartItems.title.slice(0,20)+`...`: cartItems.title}</h4>
                          <h4 className="mt-[5%] text-[15px] text-[#bc0c0c] font-semibold">{cartItems.price} USD</h4>
                        </div>
                        <div className="button w-1/4 flex justify-between items-center">
                          <CartContext.Consumer>
                            {({ decrementItems }) => (
                              <button
                                className="reduce w-2/4 h-1/2 font-medium text-[30px] flex items-center justify-center border-none outline-none bg-transparent"
                                onClick={() => decrementItems(cartItems)}
                              >
                                -
                              </button>
                            )}
                          </CartContext.Consumer>
                          <span className="quantity w-3/5 h-1/2 font-semibold text-[20px] flex items-center justify-center border-none outline-none bg-transparent">
                            {cartItems.quantity}
                          </span>
                          <CartContext.Consumer>
                            {({ incrementItems }) => (
                              <button
                                className="increment w-2/4 h-1/2 font-medium text-[30px] flex items-center justify-center border-none outline-none bg-transparent"
                                onClick={() => incrementItems(cartItems)}
                              >
                                +
                              </button>
                            )}
                          </CartContext.Consumer>
                        </div>
                        {/* button delete items */}
                        <CartContext.Consumer>
                          {({ deleteItems }) => (
                            <div className="trash w-1/5 flex justify-center items-center">
                              <button
                                className="flex justify-center items-center"
                                onClick={() => deleteItems(cartItems)}
                              >
                                <FontAwesomeIcon icon={faTrashCan} />
                              </button>
                            </div>
                          )}
                        </CartContext.Consumer>
                      </div>
                    </div>
                  ))}
                </div>
                {/* button --- checkOut */}
                <div className="checkout w-full h-[30px] flex flex-row-reverse items-center justify-center">
                  <button className="w-[30%] h-full border-none rounded-[10px] text-[16px] font-[550] text-white  bg-blue-800 hover:bg-blue-600 cursor-pointer" onClick={props.handleCheckout}>Check out</button>
                </div>
                {/* button remove all items */}
              </div>
        </div>

        {/* User*/}
        <div className="iconUser flex items-center w-[30%] h-full border-none bg-transparent cursor-pointer" onClick={props.handleSetShow}>
          <FontAwesomeIcon icon={faCircleUser} />
        </div>
      </div>
      {props.isShow && (
        <div className="showItems w-[15%] h-auto absolute mt-[1%] bg-white rounded-[10px]">
          <div className="box w-full flex flex-col flex-wrap justify-between mt-[2%] pt-[8%] pb-[7%] px-[0]">
            {/* User information */}
            <div className="user_information text-[17px] text-left text-black font-semibold ml-[5%] cursor-pointer hover:text-[#4675c8]" onClick={props.handleUser}>
                <FontAwesomeIcon icon={faUser}/> User information
              <br></br>
            </div>
            {/* List order */}
            <div className="list_order text-[17px] text-left text-black font-semibold ml-[5%] cursor-pointer hover:text-[#4675c8]">
                <FontAwesomeIcon icon={faList} /> List order
            </div>

            {/* button Login/Logout */}
            <div className="buttonLog w-[35%] h-[30px] my-0 mx-auto">
              <a href="/login">
                <input
                  className="w-full h-[30px] bg-blue-800 hover:bg-blue-600 rounded-[10px] outline-none border-none font-semibold text-white cursor-pointer"
                  type="button"
                  value={props.valueIP}
                  onClick={props.handleButtonLog}
                />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>;
}

export default HeaderPc;