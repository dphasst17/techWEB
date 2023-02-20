import { faComputerMouse, faDisplay, faHardDrive, faKeyboard, faLaptop, faMemory } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import style from "~/Pages/Home/Home.module.scss"

const cx = classNames.bind(style)
const list =[
    {
        "title":"Laptop",
        "value":"laptop",
        "icon":faLaptop
    },
    {
        "title":"Mice",
        "value":"mice",
        "icon":faComputerMouse
    },
    {
        "title":"Display",
        "value":"screen",
        "icon":faDisplay
    },
    {
        "title":"Memory",
        "value":"ram",
        "icon":faMemory
    },
    {
        "title":"Keyboard",
        "value":"keyboard",
        "icon":faKeyboard
    },
    {
        "title":"SSD",
        "value":"hard drive",
        "icon":faHardDrive
    },
] 
function ListItems() {
    return ( <div className={cx("list")}>
        {list.map((items,index) => 
            <div className={cx("listDetail")} key={index}>
                <input type="checkbox" name="" value={items.value} id={items.value} />
                <div className={cx("items")}>
                    <label htmlFor={items.value}><FontAwesomeIcon icon={items.icon}/></label>
                    <p>{items.title}</p>
                </div >
            </div>
        )}
    </div> );
}

export default ListItems;