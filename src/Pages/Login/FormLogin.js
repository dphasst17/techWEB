import classNames from "classnames/bind";
import style from "./Login.module.scss";
import { faEye, faEyeSlash, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
const cx = classNames.bind(style);

function FormLogin({props}) {
    return <div className={cx("login_container")}>
    <div className={cx("form")}>
      <div className={cx("backHome")}>
        <a href="/">
          <FontAwesomeIcon icon={faRightToBracket} />
        </a>
      </div>
      <form>
        <div className={cx("itemsForm")}>
          {props.isLog === true ? (
            <>
              <h2>Log In form</h2>
              <div className={cx("detail")}>
                <div
                  className={cx("input")}
                  style={{
                    borderColor:
                    props.username.length > 0
                        ? "rgb(70, 117, 200)"
                        : "rgb(195, 9, 9)",
                  }}
                >
                  <input
                    type="username"
                    placeholder="Enter your username"
                    onChange={props.handleUserNameChange}
                    value={props.username}
                    required
                  />
                </div>
                <div
                  className={cx("input")}
                  style={{
                    borderColor:
                    props.pass.length > 0
                        ? "rgb(70, 117, 200)"
                        : "rgb(195, 9, 9)",
                  }}
                >
                  <input
                    type={props.type}
                    autoComplete="Password"
                    placeholder="Enter your Password"
                    onChange={props.handlePassChange}
                    value={props.pass}
                    required
                  />
                  <div className={cx("eyeSlash")}>
                    {props.showPass === true ? (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        onClick={() => {
                            props.setType("text");
                            props.setShowPass(false);
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEye}
                        onClick={() => {
                            props.setType("password");
                            props.setShowPass(true);
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className={cx("forgotPass")}>
                  <p>Forgot Password? </p>
                </div>
                <button type="button" onClick={props.handleClick}>
                  Login
                </button>
                <div className={cx("navigation")}>
                  <p onClick={() => props.setIsLog(false)}>Create account</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2>Create account From</h2>
              <div className={cx("detail")}>
                <div
                  className={cx("input")}
                  style={{
                    borderColor:
                    props.username.length > 0
                        ? "rgb(70, 117, 200)"
                        : "rgb(195, 9, 9)",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Enter your username"
                    id="username"
                    value={props.username}
                    onChange={props.handleUserNameChange}
                    required
                  />
                </div>

                <div
                  className={cx("input")}
                  style={{
                    borderColor:
                    props.pass.length > 0
                        ? "rgb(70, 117, 200)"
                        : "rgb(195, 9, 9)",
                  }}
                >
                  <input
                    type="password"
                    autoComplete="Password"
                    placeholder="Enter your password"
                    id={cx("pass")}
                    value={props.pass}
                    onChange={props.handlePassChange}
                    required
                  />
                </div>
                <div
                  className={cx("input")}
                  style={{
                    borderColor:
                    props.confirmPass.length > 0
                        ? "rgb(70, 117, 200)"
                        : "rgb(195, 9, 9)",
                  }}
                >
                  <input
                    type="password"
                    autoComplete="Confirm Password"
                    placeholder="Confirm your password"
                    id={cx("confirmPass")}
                    value={props.confirmPass}
                    onChange={props.handleConfirmChange}
                    required
                  />
                </div>
                <button type="button" onClick={props.handleClickCreate}>
                  Create account
                </button>
                <div className={cx("navigation")}>
                  <p onClick={() => props.setIsLog(true)}>
                    You have an account ?
                  </p>
                </div>
              </div>
            </>
          )}
          <span className={cx("loginIcon")}>
            <span className={cx("Icon")} onClick={props.HandleFacebookLogin}>
              <FaFacebook />
              <span>FACEBOOK</span>
            </span>
            <span className={cx("Icon")} onClick={props.signIn}>
              <FcGoogle />
              <span>GOOGLE MAIL</span>
            </span>
            <span className={cx("Icon")}>
              <FaGithub />
              <span>GITHUB</span>
            </span>
          </span>
        </div>
      </form>
    </div>
  </div>;
}

export default FormLogin;