import "../Home.scss";
import { FaFacebook, FaGithub} from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";



function Contact() {
  return (
    <>
      <div className="contact">
        <div className="content">
          <div className="items">
            <h2>Any question please contact</h2>
            <div className="contactIcon">
              <div className="contactChild" onClick={() =>{window.location = "https://www.facebook.com/dfasst5"}}>
                  <FaFacebook/><span>FACEBOOK</span>
              </div>
              <div className="contactChild" onClick={() => {window.location = "https://github.com/dphasst17"}}>
                  <FaGithub/><span>GITHUB</span>
              </div>
              <div className="contactChild">
                  <FcGoogle/><span>GOOGLE MAIL</span>
              </div>
            </div>
          </div>
          <div className="items">
            <h2>You have a question</h2>
            <div className="contactIP">
              <label htmlFor="username3">Email</label>
              <input
                
                type="text"
                id="username3"
                placeholder="Enter your email"
              />
              <textarea
                rows="4"
                cols="50"
                name="comment"
                form="usrform"
                placeholder="Enter your message  here..."
              />
              <button type="submit">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
