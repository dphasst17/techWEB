import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Success.scss";
import { faCheckToSlot, faHouse } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Success() {
    return <div className="successContainer">
        <div className="iconSuccess">
            <FontAwesomeIcon icon={faCheckToSlot}/>
            <h2>SUCCESSFULLY PURCHASE</h2>
        </div>
        <div className="checkItems">
            <Link onClick={() => {window.location.pathname = "/user"}}>CHECK PRODUCT IN USER INFORMATION</Link>
        </div>
        <div className="back">
            <Link to="/">
                <FontAwesomeIcon icon={faHouse}/><span>Go to Home</span>
            </Link>
        </div>
    </div>;
}

export default Success;