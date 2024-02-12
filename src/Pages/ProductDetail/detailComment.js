
const Comment = ({ data }) => {
    return <div className="detail-comment w-[80vw] lg:w-full h-auto flex flex-wrap justify-start items-center mx-auto">
        {data !== null && data.map(c => <div className="w-full lg:w-[48%] xl:w-[24%] h-auto my-2 mx-4 py-6 bg-white rounded-md shadow dark:bg-gray-900" key={`${c.idUser}-${c.dateComment}`}>
            <div className="w-full flex flex-wrap items-center justify-between pb-4 mb-6 space-x-2 border-b dark:border-gray-700">
                <div className="flex items-center px-6 mb-2 md:mb-0 ">
                    <div className="flex mr-2 rounded-full">
                        <img src={c.img === ""
                    ? 'https://cdn-icons-png.flaticon.com/512/666/666201.png'
                    : c.img} alt="avatar"
                            className="object-cover w-12 h-12 rounded-full bg-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-300">{c.nameUser}</h2>
                    </div>
                </div>
                <p className="px-6 text-base font-medium text-gray-600 dark:text-gray-400"> {new Date(c.dateComment).toLocaleDateString()}
                </p>
            </div>
            <p className="px-6 mb-6 text-[16px] text-gray-500 dark:text-gray-400">
                {c.commentValue}
            </p>
        </div>)}
    </div>
}
export default Comment;