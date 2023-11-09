import { useParams } from "react-router-dom"
import { useGetDataByKey } from "~/hooks/useFetchData"
import 'react-quill/dist/quill.snow.css';// import styles
import "highlight.js/styles/monokai-sublime.min.css"; 
import { useContext } from "react";
import { StateContext } from "~/contexts/stateContext";
const PostsDetail = () => {
    const {isDark} = useContext(StateContext)
    const{idPosts} = useParams()
    const {data,err} = useGetDataByKey('posts','getDetailPosts',idPosts)
    return <div className="PostsDetail w-4/5 h-auto mx-auto my-20">
        {data !== null && data.map(e => <div className="ql-snow" key={e.idPosts}>
            <div className={`ql-editor ${isDark ? 'text-slate-100':'text-slate-700'} bg-transparent`} dangerouslySetInnerHTML={{ __html: e.valuesPosts }} />
        </div>)}
    </div>

}
export default PostsDetail