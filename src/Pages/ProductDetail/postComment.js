import { FaFileUpload } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import { RiFileGifFill } from "react-icons/ri";
import { MdEmojiEmotions } from "react-icons/md";
const PostComment = () => {
    return <div className="postComment lg:w-3/5 h-auto lg:min-h-[150px] mx-auto bg-slate-500 p-2 rounded-lg">
        <textarea
            className="w-full h-auto min-h-[100px] rounded-lg outline-none p-2"
            rows="4"
            cols="50"
            name="comment"
            form="usrform"
            placeholder="Enter your message  here..."
        />
        <div className="subComment w-full h-auto flex justify-between items-center min-h-[50px] bg-slate-500 rounded-lg px-10">
            <div className="icon w-2/5 h-2/4 flex justify-start">
                <RiFileGifFill className="w-[8%] h-2/4 text-slate-900 cursor-pointer hover:text-slate-100 transition-all mx-2"/>
                <MdEmojiEmotions className="w-[8%] h-2/4 text-slate-900 cursor-pointer hover:text-slate-100 transition-all mx-2"/>
                <FaFileUpload className="w-[8%] h-2/4 text-slate-900 cursor-pointer hover:text-slate-100 transition-all mx-2"/>
                <IoIosLink className="w-[8%] h-2/4 text-slate-900 cursor-pointer hover:text-slate-100 transition-all mx-2"/>
            </div>
            <button className="w-[150px] h-[40px] bg-[#1E429F] hover:bg-blue-700 rounded-lg text-[18px] text-white font-bold transition-all">Submit</button>
        </div>
    </div>
}
export default PostComment