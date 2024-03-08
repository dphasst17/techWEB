import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableList } from "@fortawesome/free-solid-svg-icons";
const ButtonViewDetail = ({props}) => {
    const navigate = useNavigate()
    return <button
    className={`${props.width} h-[30px] text-[16px] font-[550] my-1 lg:my-0 text-white rounded-[5px] bg-slate-900 hover:bg-slate-300 hover:border border-solid border-slate-900 hover:text-slate-700 cursor-pointer transition-all`}
    onClick={() => {
      navigate(props.url);
    }}
  >
    <FontAwesomeIcon icon={faTableList} />
  </button>
}
export default ButtonViewDetail