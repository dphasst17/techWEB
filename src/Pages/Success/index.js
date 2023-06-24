import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Success.scss";
import { faCheckToSlot, faHouse } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Success() {
    return <div className="successContainer w-full h-[585px]">
        <div className="iconSuccess w-full h-[30%] flex justify-center items-center">
            <FontAwesomeIcon icon={faCheckToSlot}/>
            <h2 className="ml-[2%] font-semibold text-[18px] cursor-pointer">SUCCESSFULLY PURCHASE</h2>
        </div>
        <div className="checkItems w-full h-auto flex justify-center">
            <Link onClick={() => {window.location.pathname = "/user"}}>CHECK PRODUCT IN USER INFORMATION</Link>
        </div>
        <div className="back w-full h-auto flex justify-center mt-[2%]">
            <Link to="/">
                <FontAwesomeIcon icon={faHouse}/><span>Go to Home</span>
            </Link>
        </div>
    </div>;
}

export default Success;