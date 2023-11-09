import "../Home.scss";
import { FaFacebook, FaGithub} from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";



function Contact() {
  return (
    <>
      <div className="contact w-full min-h-[250px] h-auto md:h-[250px] flex  justify-center mt-[2%] md:mt-0">
        <div className="content w-full md:w-4/5 h-full flex flex-col md:flex-row">
          <div className="items w-full md:w-[35%] h-1/2 md:h-full flex flex-col items-center justify-around">
            <h2 className="w-full text-center text-[18px] text-blue-800 font-semibold">Any question please contact</h2>
            <div className="contactIcon w-full h-4/5">
              <div className="contactChild w-3/5 h-[30px] flex flex-wrap items-center rounded-[10px] mx-auto my-[3%] pl-[2%] cursor-pointer hover:scale-110 transition-all bg-[#3b5998]" onClick={() =>{window.location = "https://www.facebook.com/dfasst5"}}>
                  <FaFacebook className="w-[10%] h-full my-auto mx-[0] text-white"/><span className="my-auto mx-[2%] text-white font-semibold">FACEBOOK</span>
              </div>
              <div className="contactChild w-3/5 h-[30px] flex flex-wrap items-center rounded-[10px] mx-auto my-[3%] pl-[2%] cursor-pointer hover:scale-110 transition-all bg-[#24292e]" onClick={() => {window.location = "https://github.com/dphasst17"}}>
                  <FaGithub className="w-[10%] h-full my-auto mx-[0] text-white"/><span className="my-auto mx-[2%] text-white font-semibold">GITHUB</span>
              </div>
              <div className="contactChild w-3/5 h-[30px] flex flex-wrap items-center rounded-[10px] mx-auto my-[3%] pl-[2%] cursor-pointer hover:scale-110 transition-all bg-google-linear">
                  <FcGoogle className="w-[10%] h-full my-auto mx-[0]"/><span className="my-auto mx-[2%] text-white font-semibold">GOOGLE MAIL</span>
              </div>
            </div>
          </div>
          <div className="items w-full md:w-[65%] h-1/2 md:h-full flex flex-col items-center justify-around">
            <h2 className="w-full text-center text-[18px] text-blue-800 font-semibold">You have a question</h2>
            <div className="contactIP w-4/5 h-4/5 flex flex-col mx-auto my-[0] relative">
              <input
                className="w-full h-auto min-h-[50px] flex justify-center pl-[2%] text-[16px] text-black font-medium outline-none rounded-[5px] border border-blue-700"
                type="text"
                id="username3"
                placeholder="Enter your email"
              />
              <textarea
                className="w-full outline-none pl-[2.5%] mt-[4%] rounded-[5px] border border-blue-700"
                rows="4"
                cols="50"
                name="comment"
                form="usrform"
                placeholder="Enter your message  here..."
              />
              <button className="w-[120px] h-[30px] mx-auto my-[2%] rounded-[10px] outline-none border-none text-white text-[20px] font-semibold cursor-pointer bg-blue-800 hover:bg-blue-600 transition-all" type="submit">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
