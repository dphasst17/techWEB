import { faCartShopping, faCircleUser, faList, faMagnifyingGlass, faTrashCan, faUser, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { CartContext } from "~/Contexts/Cart";
import logo01 from "~/components/Layout/DefaultLayout/Header/img/tech-store-low-resolution-logo-black-on-transparent-background.png";
import SearchResults from "./Search";
function HeaderPc({props}) {
    return <div className="header">
    <nav ref={props.nav}>
      {props.menuNav.map((nav, index) => (
        <div className={`navItems ${index === props.activeNav ? 'active' : ''}`} key={nav.title}>
          <Link to={nav.path}>
            <div className="nav_text">
              {nav.title}
              <div className="hover_nav"></div>
            </div>
          </Link>
        </div>
      ))}
    </nav>

    <div className="logo">
      <img src={logo01} alt=""/>
    </div>
    {/* Search input */}
    <div className="search">
      <input
        placeholder="Search......"
        spellCheck="false"
        value={props.valueSearch}
        onChange={props.handelValueSearch}
        onClick={props.handleSetIsShowResult}
      />
      <button onClick={props.show} className="iconSearch">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
      {props.showResult && (
        <div className="searchResult">
          <div className="title">
            <p>Search result</p>
            <span onClick={props.handleSetHideResult}>
              <FontAwesomeIcon icon={faX} />
            </span>
          </div>
          <div className="result">
            <SearchResults />
          </div>
          <button
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
    <div className="icon">
      <div className="detail">
        
        <div className="cart_Shopping">
              <div className="show">{(props.cartItems?.length > 0)? props.cartItems.length : 0}</div>
              <FontAwesomeIcon icon={faCartShopping} />
              <div className="cart_content">
                <div className="cover">
                  {props.cartItems?.map((cartItems) => (
                    <div className="cart_detail" key={cartItems.id}>
                      <div className="item">
                        <div className="img"><img src={cartItems.url} alt="IMG-product" /></div>
                        <div className="information">
                          <h4>{cartItems.title.length > 20 ? cartItems.title.slice(0,20)+`...`: cartItems.title}</h4>
                          <h4>{cartItems.price} USD</h4>
                        </div>
                        <div className="button">
                          <CartContext.Consumer>
                            {({ decrementItems }) => (
                              <button
                                className="reduce"
                                onClick={() => decrementItems(cartItems)}
                              >
                                -
                              </button>
                            )}
                          </CartContext.Consumer>
                          <span className="quantity">
                            {cartItems.quantity}
                          </span>
                          <CartContext.Consumer>
                            {({ incrementItems }) => (
                              <button
                                className="increment"
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
                            <div className="trash">
                              <button
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
                <div className="checkout">
                  <button onClick={props.handleCheckout}>Check out</button>
                </div>
                {/* button remove all items */}
              </div>
            </div>

        {/* User*/}
        <div className="user" onClick={props.handleSetShow}>
          <FontAwesomeIcon icon={faCircleUser} />
        </div>
      </div>
      {props.isShow && (
        <div className="showItems">
          <div className="box">
            {/* User information */}
            <div className="user_information" onClick={props.handleUser}>
                <FontAwesomeIcon icon={faUser}/> User information
              <br></br>
            </div>
            {/* List order */}
            <div className="list_order">
                <FontAwesomeIcon icon={faList} /> List order
            </div>

            {/* button Login/Logout */}
            <div className="buttonLog">
              <a href="/login">
                <input
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