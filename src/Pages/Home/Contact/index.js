import classNames from "classnames/bind";
import style from "../Home.module.scss";
import { FaFacebook, FaGithub} from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";

const cx = classNames.bind(style);


function Contact() {
  return (
    <>
      <div className={cx("contact")}>
        <div className={cx("content")}>
          <div className={cx("items")}>
            <h2>Any question please contact</h2>
            <div className={cx("contactIcon")}>
              <div className={cx("contactChild")} onClick={() =>{window.location = "https://www.facebook.com/dfasst5"}}>
                  <FaFacebook/><span>FACEBOOK</span>
              </div>
              <div className={cx("contactChild")} onClick={() => {window.location = "https://github.com/dphasst17"}}>
                  <FaGithub/><span>GITHUB</span>
              </div>
              <div className={cx("contactChild")}>
                  <FcGoogle/><span>GOOGLE MAIL</span>
              </div>
            </div>
          </div>
          <div className={cx("items")}>
            <h2>You have a question</h2>
            <div className={cx("contactIP")}>
              <label for="username3">Email</label>
              <input
                
                type="text"
                id="username3"
                placeholder="Enter your username"
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
