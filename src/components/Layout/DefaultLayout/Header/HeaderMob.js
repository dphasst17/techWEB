import { faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faBars, faCartShopping, faCircleUser, faHardDrive, faHouse, faLaptop, faMagnifyingGlass, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { CartContext } from "~/Contexts/Cart";

function HeaderMob({props}) {
    return <div className="headerMob">
    <div className="navMob">
      <FontAwesomeIcon icon={faBars} onClick={() => {props.setIsToggleNav("translateX(-17%)")}}/>
      <div className="navDetail" style={{transform: props.isToggleNav}}>
        <div className="navClose">
          <FontAwesomeIcon icon={faX} onClick={() => {props.setIsToggleNav("translateX(-200%)")}}/>
          <Link to={props.checkLogin === true ? "/checkout" : "/login"}>
            <div className="cartMob">
              <FontAwesomeIcon icon={faCartShopping} />
              <CartContext.Consumer>{({cartItems}) => <div className="totalItems">{(cartItems?.length > 0)? cartItems.length : 0}</div>}</CartContext.Consumer>
            </div>
          </Link>
        </div>
        <div className="navContent">
          <div className="navItemsMob">
            <div className="iconNavMob"><FontAwesomeIcon icon={faHouse} /></div>
            <span>
              <Link to="/">HOME</Link>
            </span>
          </div>
          <div className="navItemsMob">
            <div className="iconNavMob"><FontAwesomeIcon icon={faLaptop} /></div>
            <span>
              <Link to="/product">PRODUCT</Link>
            </span>
          </div>
          <div className="navItemsMob">
            <div className="iconNavMob"><FontAwesomeIcon icon={faHardDrive} /></div>
            <span>
              <Link to="/accessory">ACCESSORY</Link>
            </span>
          </div>
          <div className="navItemsMob" onClick={props.handleUser}>
            <div className="iconNavMob"onClick={props.handleUser}><FontAwesomeIcon icon={faCircleUser} /></div>
            <span>
              User information
            </span>
          </div>
        </div>
        <div className="navUser">
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
        <hr></hr>
        <h2>Contact Us</h2>
        <div className="navContact">
          <div className="iconContact"><FontAwesomeIcon icon={faFacebook}/><span>Facebook</span></div>
          <div className="iconContact"><FontAwesomeIcon icon={faGithub}/><span>Github</span></div>
          <div className="iconContact"><FcGoogle /><span>Mail</span></div>
        </div>
      </div>
    </div>
    <div className="logoMob">
      <img src="" alt="" />
    </div>
    <div className="searchMob">
      <input
        placeholder="Search......"
        spellCheck="false"
        value={props.valueSearch}
        onChange={props.handelValueSearch}
        onClick={props.handleSetIsShowResult}
      />
      <button onClick={props.show} className="iconSearchMob">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  </div>;
}

export default HeaderMob;