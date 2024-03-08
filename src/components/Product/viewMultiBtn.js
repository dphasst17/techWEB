export const ViewBrandAndType = ({ props }) => {
    return <div className={`w-full h-${props.height} flex flex-wrap justify-around items-center`}>
        <span onClick={() => { props.navigate(`/search/${props.brand}`) }} className="w-4/5 sm:w-[45%] my-1 h-[30px] flex items-center justify-center rounded-[5px] bg-gray-700 font-han text-[20px] text-gray-200 font-semibold">
            <span className="overflow-hidden whitespace-nowrap text-ellipsis">{props.brand.toUpperCase()}</span>
        </span>
        <span onClick={() => { props.navigate(`/search/${props.type}`) }} className="w-4/5 sm:w-[45%] my-1 h-[30px] flex items-center justify-center rounded-[5px] bg-gray-700 font-han text-[20px] text-gray-200 font-semibold">
            <span className="overflow-hidden whitespace-nowrap text-ellipsis">{props.type.toUpperCase()}</span>
        </span>
    </div>
}
//class:'',arr:[{content:'',isClick:'',handleName:''}]
export const ViewMultiButton = ({props}) => {
    return <div className={`w-full ${props.class} flex flex-wrap items-center`}>
        {props.arr.map(e => <span onClick={e.isClick && e.handleName}
            className={`w-4/5 sm:w-[48%] my-1 h-[40px] flex items-center justify-center rounded-[5px] bg-gray-700 font-han text-[20px] text-gray-200 font-semibold`}
        >{e.content}</span>)}
    </div>
}
