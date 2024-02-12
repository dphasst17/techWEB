import { useContext } from "react";
import { StateContext } from "~/contexts/stateContext";
import { useNavigate } from "react-router-dom";
import Alert from "../Alert";
const Post = () => {
    const { post,isAlert,setIsAlert } = useContext(StateContext);
    const navigate = useNavigate();
    const showMessage = () => {
        setIsAlert(!isAlert)
    }
    return <section className="flex items-center w-full h-auto min-h-[80vh]">
        <Alert props={{isAlert:isAlert,type:'success',message:'test message success'}}/>
        <div className="p-4 mx-auto w-[90%] h-auto">
            <div className="grid grid-cols-1 gap-4 lg:gap-8 sm:gap-4 sm:grid-cols-2 lg:grid-cols-2">
                {post !== null && post.map(e => <div 
                onClick={() => {navigate(`/posts/detail/${e.idPosts}/${e.title}`)}}
                className="flex flex-col flex-wrap mb-0 overflow-hidden rounded lg:flex-row dark:bg-gray-700 cursor-pointer" key={e.idPost}>
                    <div className="relative w-full overflow-hidden lg:w-2/4 h-80">
                        <img className="object-cover w-full h-full transition-all hover:scale-110"
                            src={e.banner} alt="" />
                    </div>
                    <div
                        className="relative flex self-center flex-1 p-8 ml-0 bg-white border rounded shadow dark:border-gray-700 dark:bg-gray-700 lg:items-center lg:-ml-12">
                        <div>
                            <span className="block mb-2 text-xs font-semibold text-blue-700 uppercase dark:text-blue-300">
                                {e.dateAdded}
                            </span>
                            <h2 className="mb-3 text-2xl font-bold leading-9 text-black dark:text-white">
                                {e.title}
                            </h2>
                            <span className="px-4 py-2 text-xs text-white bg-blue-500 rounded top-4 left-4">
                                {e.poster}
                            </span>
                            <span className="px-4 py-2  mx-2 text-xs text-white bg-blue-500 rounded top-4 left-4">
                                {e.type}
                            </span>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    </section>
}
export default Post;