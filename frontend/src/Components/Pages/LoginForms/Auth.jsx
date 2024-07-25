import styles from "./LoginForm.module.css";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FaEye } from "react-icons/fa6";
import {
  ForgetPass,
  LoginUser,
  PopupState,
  SinginUser,
  VerifyEmail,
  resetPassword,
} from "../../../api/userLogInReducer";
import Loading from "../../Component/Loading/Loading";
import { checkDateRange } from "../Profile/ProfileSideBar";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import model from "../../Component/Model/Model.module.css";
import AutoAddress from "../../Map/AutoAddress";
function Auth() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const l = queryParams.get("login");
  const s = queryParams.get("sign-up");
  const f = queryParams.get("forgot-password");
  const v = queryParams.get("verify");
  const e = queryParams.get("verify-email");
  const r = queryParams.get("reset-password");
  const t = queryParams.get("token");
  const p = queryParams.get("p");
  const [waiting, setWaiting] = useState(e || false);
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState("sinup");
  const { user } = useSelector((state) => state.userLog);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("login");

  const handleTabChange = (tab) => {
    if (tab == "login") {
      setActiveTab(tab);
      setLoginForm("login");
      navigate("/auth?login=true");
    } else {
      setActiveTab(tab);
      setLoginForm("singUp");
    }
  };

  const formClass =
    loginForm === "login"
      ? styles.login
      : loginForm === "forgotPassword"
      ? styles.forgotPassword
      : loginForm === "verify"
      ? styles.verify
      : styles.signup;
  useEffect(() => {
    if (s === "true") {
      setLoginForm("singUp");
    } else if (l === "true") {
      setLoginForm("login");
    } else if (f === "true") {
      setLoginForm("forgotPassword");
    } else if (v === "true") {
      setLoginForm("verify");
    } else if (e === "true") {
      dispatch(VerifyEmail({ token: t })).then((e) => {
        setWaiting(false);
        if (e?.payload?.success) {
          dispatch(
            PopupState({
              status: "Success",
              message: "Successfully Registered",
            })
          );
          localStorage.setItem("token", e.payload.token);
        } else {
          dispatch(
            PopupState({
              status: "Error",
              message: "Your link is expired or invalid please register again ",
            })
          );
        }
      });
    } else if (r === "true") {
      dispatch(resetPassword({ token: t, password: p })).then((e) => {
        setWaiting(false);
        if (e?.payload?.success) {
          dispatch(
            PopupState({
              status: "Success",
              message:
                "Successfully Changed your password Now you can Login with new password",
            })
          );
          localStorage.setItem("token", e.payload.token);
        } else {
          dispatch(
            PopupState({
              status: "Error",
              message: "Your link is expired please Resend your mail",
            })
          );
        }
      });
    }
  }, [l, s, f, v, e, r]);
  if (user?._id) {
    return <Navigate to={`/search`} />;
  }
  return (
    <>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center  align-items-center ">
          {/* <div
            className="col-md-6 p-0 primary-bg p-md-0 col-lg-6 col-12"
            onClick={() => navigate("/")}
          >

            <img src="/UnzipLogo1.jpeg" className="w-100 h-100" />
          </div> */}
          <div className="col-md-6 col-lg-6 col-12">
            <div className="w-100 m-md-5  d-flex justify-content-center text-center flex-wrap ">
              {/* <div className="d-flex justify-content-end mt-3 mt-sm-0 mt-md-0  w-75">
                <button className="as_btn" onClick={() => navigate("/")}>
                  <i className="fas fa-arrow-left text-white  fs-6 me-3"></i>
                  Back
                </button>
              </div> */}

              <div
                style={{ width: "400px" }}
                className="d-flex align-items-center m-5 justify-content-center bg-white maine_tap gap-2 "
              >
                <button
                  className={`TapBtn ${
                    activeTab === "login" ? "TapActiveBtn" : ""
                  }`}
                  onClick={() => handleTabChange("login")}
                >
                  Log in
                </button>
                <button
                  className={`TapBtn ${
                    activeTab === "signup" ? "TapActiveBtn" : ""
                  }`}
                  onClick={() => handleTabChange("signup")}
                >
                  Sign Up
                </button>
              </div>

              <div className={`${styles.wrapper} ${formClass}`} id="wrapper">
                <div>
                  <SingPage setLoginForm={setLoginForm} />
                  <LoginPage setLoginForm={setLoginForm} />
                  <ForgotPassword setLoginForm={setLoginForm} />
                  <VerifyPage setLoginForm={setLoginForm} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const VerifyPage = ({ setLoginForm }) => {
  const [steps, setSteps] = useState(0);
  return (
    <>
      <div className={`${styles.form_box} ${styles.verify}`}>
        <form action="#">
          <h2>Verify</h2>
        </form>
      </div>
    </>
  );
};

const SingPage = ({ setLoginForm }) => {
  const [steps, setSteps] = useState(0);
  const [Password, setPassword] = useState(true);
  const [user, setUser] = useState({
    dob: "",
    bt: "",
    bp: "",
    name: "",
    email: "",
    password: "",
    bonus: "7.53",
  });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [term, setTerm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCdkMLmt8vv54OmKcp4c174eK4t7J1Xgzk&libraries=places&v=weekly&callback=initMap`;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const InputRender = () => {
    switch (steps) {
      case 0:
        return (
          <>
            <div className={styles.input_box}>
              <input
                type="date"
                placeholder="dd-mm-yyyy"
                max="3000-12-31"
                id="dob"
                onChange={(e) => setUser({ ...user, dob: e.target.value })}
              />
              <label htmlFor="dob">Date of Birth*</label>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                const d = new Date(user.dob);
                const c = new Date();
                const p = new Date(1 - 1 - 1950);
                if (c > d && d > p) {
                  setSteps(steps + 1);
                } else {
                  dispatch(
                    PopupState({
                      status: "Error",
                      message:
                        "Enter Your Valid Date Of birth, You can enter date between 01-01-1970 to current date",
                    })
                  );
                }
              }}
              className={styles.btn}
            >
              Next
            </button>
            <div className={styles.login_register}>
              <p>
                Already have an account?{" "}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setLoginForm("login");
                    navigate("/auth?login=true");
                  }}
                  className="login-link"
                  id="login-link"
                >
                  Login now
                </span>
              </p>
            </div>
          </>
        );
        break;
      case 1:
        return (
          <>
            <div className={styles.input_box}>
              <input
                type="time"
                id="bt"
                onChange={(e) => setUser({ ...user, bt: e.target.value })}
              />
              <label htmlFor="bt">Birth Time</label>
            </div>
            <div className={styles.remember_password}>
              <label htmlFor=""> </label>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setSteps(steps + 1)}
              >
                Don't remember? Skip
              </span>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                setSteps(steps + 1);
              }}
              className={styles.btn}
            >
              Next
            </button>
            <div className={styles.login_register}>
              <p
                style={{ cursor: "pointer" }}
                onClick={() => setSteps(steps - 1)}
              >
                Previous Step
              </p>
            </div>
          </>
        );
        break;
      case 2:
        return (
          <>
            <div className={styles.input_box}>
              <span className={styles.icon}>
                <ion-icon name="location"></ion-icon>
              </span>
              {/* <input
                type="text"
                // bp
                id="searchInput"
                onChange={(e) => setUser({ ...user, bp: e.target.value })}
              /> */}

              <AutoAddress
                user={user}
                setUser={setUser}
                style={{ width: "100% !important" }}
              />
              {/* <label htmlFor="bp">Birth Place</label> */}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                setSteps(steps + 1);
              }}
              className={styles.btn}
            >
              Next
            </button>
            <div className={styles.login_register}>
              <p
                style={{ cursor: "pointer" }}
                onClick={() => setSteps(steps - 1)}
              >
                Previous Step
              </p>
            </div>
          </>
        );
        break;
      case 3:
        return (
          <>
            <div className={styles.input_box}>
              <p></p>
              <span className={styles.icon}>
                <ion-icon name="person"></ion-icon>
              </span>
              <input
                type="text"
                id="name"
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
              <label htmlFor="name">Username*</label>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                if (user.name) {
                  setSteps(steps + 1);
                } else {
                  dispatch(
                    PopupState({
                      status: "Error",
                      message: "Enter Your Valid Name",
                    })
                  );
                }
              }}
              className={styles.btn}
            >
              Next
            </button>
            <div className={styles.login_register}>
              <p
                style={{ cursor: "pointer" }}
                onClick={() => setSteps(steps - 1)}
              >
                Previous Step
              </p>
            </div>
          </>
        );
        break;
      case 4:
        return (
          <>
            <div className={styles.input_box}>
              <span className={styles.icon}>
                <ion-icon name="mail"></ion-icon>
              </span>
              <input
                type="email"
                id="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <label htmlFor="email">Email*</label>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                let emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
                if (!emailRegex.test(user.email)) {
                  dispatch(
                    PopupState({
                      status: "Error",
                      message: "Enter Your Valid Email",
                    })
                  );
                } else {
                  setSteps(steps + 1);
                }
              }}
              className={styles.btn}
            >
              Next
            </button>
            <div className={styles.login_register}>
              <p
                style={{ cursor: "pointer" }}
                onClick={() => setSteps(steps - 1)}
              >
                Previous Step
              </p>
            </div>
          </>
        );
        break;
      case 5:
        return (
          <>
            <div className={styles.input_box}>
              <span
                className={styles.icon}
                onClick={() => setPassword(!Password)}
              >
                {Password ? (
                  <ion-icon name="lock-closed"></ion-icon>
                ) : (
                  <FaEye />
                )}
              </span>
              <input
                type={Password ? "password" : "text"}
                id="password"
                value={user?.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <label htmlFor="password">Password*</label>
            </div>
            <div className={styles.remember_password}>
              <label htmlFor="">
                <input
                  type="checkbox"
                  checked={term}
                  onChange={() => setTerm(!term)}
                />
                Agree to the term & condition{" "}
              </label>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                if (term) {
                  setLoading(true);
                  const zodiac = checkDateRange(user.dob);
                  dispatch(SinginUser({ ...user, zodiac })).then((e) => {
                    setLoading(false);
                    if (e.payload?.success) {
                      setSteps(steps + 1);
                    } else {
                      dispatch(
                        PopupState({
                          status: "Error",
                          message: e?.payload?.msg
                        
                        })
                      );
                    }
                  });
                } else {
                  dispatch(
                    PopupState({
                      status: "Error",
                      message: "You need to Check term & conditions ",
                    })
                  );
                }
              }}
              className={styles.btn}
            >
              {loading ? <Loading /> : "Submit"}
            </button>
            <div className={styles.login_register}>
              <p
                style={{ cursor: "pointer" }}
                onClick={() => setSteps(steps - 1)}
              >
                Previous Step
              </p>
            </div>
          </>
        );
        break;
      case 6:
        return (
          <>
            <div className={styles.login_register}>
              <p>
                The Verification email has been sent to your email id please
                check your email
              </p>
            </div>
            <button
              style={{ marginTop: "10px" }}
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
              className={styles.btn}
            >
              Check Now
            </button>
          </>
        );
        break;
    }
  };

  return (
    <>
      <div className={`${styles.form_box} ${styles.register}`}>
        <form action="#">
          <h2>Register</h2>
          {InputRender()}
        </form>
      </div>
    </>
  );
};

const ForgotPassword = ({ setLoginForm }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ email: "", password: "", nPassword: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className={`${styles.form_box} ${styles.forgotPassword}`}>
        <h2>Forgot password</h2>
        <form action="#">
          <div className={styles.input_box}>
            <span className={styles.icon}>
              <ion-icon name="mail"></ion-icon>
            </span>
            <input
              autoComplete="false"
              autoCorrect="false"
              autoSave="false"
              type="email"
              id="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className={styles.input_box}>
            <span className={styles.icon}>
              <ion-icon name="lock-closed"></ion-icon>
            </span>
            <input
              autoComplete="false"
              autoCorrect="false"
              autoSave="false"
              type="password"
              id="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <label htmlFor="password">New Password</label>
          </div>
          <div className={styles.input_box}>
            <span className={styles.icon}>
              <ion-icon name="lock-closed"></ion-icon>
            </span>
            <input
              autoComplete="false"
              autoCorrect="false"
              autoSave="false"
              type="password"
              id="nPassword"
              onChange={(e) => setUser({ ...user, nPassword: e.target.value })}
            />
            <label htmlFor="nPassword">Retype Password</label>
          </div>
          <div className={styles.remember_password}>
            <label htmlFor=""> </label>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setLoginForm("login")}
            >
              Back to Login
            </span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setLoading(true);
              if (user.nPassword === user.password) {
                dispatch(ForgetPass({ c: user.email, p: user.password })).then(
                  (e) => {
                    setLoading(false);
                    e.payload.success
                      ? dispatch(
                          PopupState({
                            status: "Success",
                            message: `Reset password mail send successfully please check your mail`,
                          })
                        )
                      : dispatch(
                          PopupState({
                            status: "Error",
                            message: e.payload.message,
                          })
                        );
                  }
                );
              } else {
                dispatch(
                  PopupState({
                    status: "Error",
                    message: `Your password and retype `,
                  })
                );
              }
            }}
            className={styles.btn}
          >
            {loading ? <Loading /> : "Send Verification"}
          </button>
        </form>
      </div>
    </>
  );
};
const LoginPage = ({ setLoginForm }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [Password, setPassword] = useState(true);
  const navigate = useNavigate();
  return (
    <>
      <div className={`${styles.form_box} ${styles.login}`}>
        <h1 className="fs-1">Login</h1>

        <form action="#">
          <div className={styles.input_box}>
            <span className={styles.icon}>
              <ion-icon name="mail"></ion-icon>
            </span>
            <input
              autoComplete="false"
              autoCorrect="false"
              autoSave="false"
              type="email"
              id="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className={styles.input_box}>
            <span
              onClick={() => setPassword(!Password)}
              className={styles.icon}
            >
              {Password ? <ion-icon name="lock-closed"></ion-icon> : <FaEye />}
            </span>
            <input
              autoComplete="false"
              autoCorrect="false"
              autoSave="false"
              type={Password ? "password" : "text"}
              id="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className={styles.remember_password}>
            <label htmlFor="">
              {" "}
              <input type="checkbox" />
              Remember me{" "}
            </label>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                setLoginForm("forgotPassword");
                navigate("/auth?forgot-password=true");
              }}
            >
              Forgot Password
            </span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setLoading(true);
              dispatch(LoginUser({ c: user.email, p: user.password })).then(
                (e) => {
                  setLoading(false);
                  if (e?.payload?.success) {
                    dispatch(
                      PopupState({
                        status: "Success",
                        message: "Login Successfully",
                      })
                    );
                    localStorage.setItem("token", e.payload.token);
                  } else {
                    dispatch(
                      PopupState({
                        status: "Error",
                        message: e.payload.msg,
                      })
                    );
                  }
                }
              );
            }}
            className={styles.btn}
          >
            {loading ? <Loading /> : "Login"}
          </button>
          <div className={styles.login_register}>
            <p>
              Don't have an account?{" "}
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setLoginForm("singUp");
                  navigate("/auth?sign-up=true");
                }}
                className={styles.register_link}
                id="register-link"
              >
                Register now
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};
export default Auth;
