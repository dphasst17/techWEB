
const Comment = ({data}) => {
    return <div className="detail-comment w-full h-auto flex flex-wrap justify-between items-center">
        {data!== null && data.map(c => <div className="showComment w-[48%] h-auto flex min-h-[30px] bg-slate-500 rounded-lg mx-2 my-10 pl-10" key={`${c.idUser}-${c.dateComment}`}>
            <div className="w-[20%] h-[80px] flex flex-col">
                <img className="w-[50px] h-[50px] object-contain rounded-[50%] border-solid border-slate border-[2px] " src={c.img === "" 
                ? 'https://cdn-icons-png.flaticon.com/512/666/666201.png'
                :c.img} alt="avatar"/>
                <div className="comment-nameUser text-[18px] text-slate-200 font-semibold">{c.nameUser}</div>
            </div>
            <div className="w-3/4 h-auto flex flex-col px-2">
                <span className="font-semibold text-slate-300">{c.dateComment}</span>
                <span className="w-full h-auto font-semibold text-slate-200 border-solid border-slate-200 border-[1px] rounded-lg pl-2 py-2">{c.commentValue}</span>
            </div>
        </div>)}
    </div>
}
export default Comment;