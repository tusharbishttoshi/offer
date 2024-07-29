import React, { useEffect, useState } from 'react'
import "./otp_submit.css"
import { FiUserPlus } from "react-icons/fi"
import { useDispatch, useSelector } from 'react-redux'
import { ForgetPass, LoginUser, PopupState, SinginUser, VerifyEmail } from '../../../api/userLogInReducer'
import { Link, useNavigate } from 'react-router-dom'
import { Footer, NavBar } from '../../Component/All'
import { BsShieldLockFill } from 'react-icons/bs'
import FormTemp from './FormTemp'
function ForgotPass() {

    return (
        <>
            <FormTemp>
                <ForgotForm />
            </FormTemp>
        </>
    )
}
export const ForgotForm = ({ children, pages, setPages }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [number, setNumber] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    return (
        <>
            <form className='otp_Form' style={{ background: "black" }} onSubmit={(e) => {
                e.preventDefault()
                dispatch(ForgetPass({ c: number, p: password })).then((e) => {
                    e.payload.success ? dispatch(PopupState({ status: "Success", message: `Reset Pass Successfully Sended to  ${number}` })) : dispatch(PopupState({ status: "Error", message: e.payload.error }))
                })
            }}>
                <div className='otp_Top_Text' style={{ position: "relative" }}>
                    <h1 style={{ fontSize: "27px", color: "white" }}>Forgot Password</h1>
                    <p style={{ fontSize: "18px", color: "gray" }}>Enter your correct email and new password</p>
                    {
                        children
                    }
                </div>
                <div className='otp_Code_Box'>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor="number" style={{ color: "white", fontSize: "15px" }}>Enter Email </label>
                        <input name="number" id='number' value={number} onChange={(e) => setNumber(e.target.value)} type="text" />

                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor="password" style={{ color: "white", fontSize: "15px" }}>Enter New Password</label>
                        <input name="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} type="password" />

                    </div> <div style={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor="cPass" style={{ color: "white", fontSize: "15px" }}>Confirm Password</label>
                        <input name="cPass" id='cPass' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" />
                        <div style={{}}>
                            <hr style={{ margin: "20px 0px 10px 0px" }} />
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Link to="/login" style={{ cursor: "pointer", fontSize: "12px", color: "white" }}>{`<`}Back</Link>
                            </div>
                        </div>
                    </div>
                    {confirmPassword === password && <button style={{ backgroundColor: "var(--yellow)", color: "black", fontWeight: "500" }} className='otp_btn'>Verify</button>}
                </div>

            </form>
        </>
    )
}
export default ForgotPass


// import styles from './LoginForm.module.css';
// import { useEffect, useState } from 'react';
// import { FaArrowLeft } from "react-icons/fa"
// import { useDispatch, useSelector } from 'react-redux';
// import { ForgetPass, LoginUser, PopupState, SinginUser } from '../../../api/userLogInReducer';
// import Loading from '../../Loading/Loading';
// import { checkDateRange } from '../Profile/ProfileSideBar';
// import { Navigate, useLocation, useNavigate } from 'react-router-dom'
// function Auth() {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const l = queryParams.get('login');
//   const s = queryParams.get('sign-up');
//   const f = queryParams.get('forgot-password');
//   const v = queryParams.get('verify');
//   const [loginForm, setLoginForm] = useState("sinup")
//   const { user } = useSelector((state) => state.userLog)
//   const navigate = useNavigate()
//   const formClass = loginForm === 'login' ? styles.login : loginForm === 'forgotPassword' ? styles.forgotPassword : loginForm === 'verify' ? styles.verify : styles.signup;
//   useEffect(() => {
//     if (s === 'true') {
//       setLoginForm('singUp');
//     } else if (l === 'true') {
//       setLoginForm('login');
//     } else if (f === 'true') {
//       setLoginForm('forgotPassword');
//     } else if (v === 'true') {
//       setLoginForm('verify');
//     }
//   }, [l, s, f, v]);
//   if (user._id) {
//     return (
//       <Navigate to={`/search`} />
//     )
//   }
//   return (
//     <>

//       <div className={`${styles.mostOuter} `} >
//         <div className={styles.top}>
//           <div className={styles.backButton} onClick={() => navigate("/")}>
//             <FaArrowLeft size={25} />
//             <span >Back to Home</span>
//           </div>
//           <div className={styles.logo}>
//             <img src="/icon.png" alt="" onClick={() => navigate("/")} />
//           </div>
//         </div>

//         <div className={styles.text}>
//           <div>
//             <span onClick={() => navigate("/Privacy-policy")}>Privacy Policy</span> .
//             <span onClick={() => navigate("/term&condition")}>Term & Condition</span> .
//             <span onClick={() => navigate("/contact-us")}>Contact us</span>
//           </div>
//           <p>Developed by <a href="https://igeeksquadbay.com/" target='_blank'>iGeek Squad Bay Pvt Ltd</a> </p>
//         </div>
//         <div className={`${styles.wrapper} ${formClass}`} id="wrapper">
//           <ForgotPassword setLoginForm={setLoginForm} />
//           <LoginPage setLoginForm={setLoginForm} />
//           <SingPage setLoginForm={setLoginForm} />
//           <VerifyPage setLoginForm={setLoginForm} />
//         </div>
//       </div>
//     </>
//   );
// }
// const VerifyPage = ({ setLoginForm }) => {
//   const [steps, setSteps] = useState(0)

//   return (
//     <>
//       <div className={`${styles.form_box} ${styles.verify}`} >
//         <form action="#">
//           <h2>Verify</h2>



//         </form>
//       </div>
//     </>
//   )
// }
// const SingPage = ({ setLoginForm }) => {
//   const [steps, setSteps] = useState(0)
//   const [user, setUser] = useState({ dob: "", bt: "", bp: "", name: "", email: "", password: "" })
//   const dispatch = useDispatch()
//   const [loading, setLoading] = useState(false)
//   const [term, setTerm] = useState(false)
//   const navigate = useNavigate()

//   const InputRender = () => {
//     switch (steps) {
//       case 0:
//         return (<>
//           <div className={styles.input_box}>
//             <input type="date" id="dob" onChange={(e) => setUser({ ...user, "dob": e.target.value })} />
//             <label htmlFor="dob">Date of Birth*</label>
//           </div>

//           <button onClick={(e) => {
//             e.preventDefault()
//             const d = new Date(user.dob)
//             const c = new Date()
//             const p = new Date(1 - 1 - 1970)
//             if (c > d && d > p) {
//               setSteps(steps + 1)
//             }
//             else {
//               dispatch(PopupState({ status: "Error", message: "Enter Your Valid Date Of birth, You can enter date between 01-01-1970 to current date" }))
//             }
//           }} className={styles.btn}>Next</button>
//           <div className={styles.login_register}>
//             <p>Already have an account? <span style={{ cursor: "pointer" }} onClick={() => {
//               setLoginForm('login')
//               navigate("/auth?login=true")
//             }} className="login-link" id="login-link">Login now</span></p>
//           </div>
//         </>
//         )
//         break;
//       case 1:
//         return (
//           <>
//             <div className={styles.input_box}>
//               <input type="time" id="bt" onChange={(e) => setUser({ ...user, "bt": e.target.value })} />
//               <label htmlFor="bt">Birth Time</label>
//             </div>
//             <div className={styles.remember_password}>
//               <label htmlFor=""> </label>
//               <span style={{ cursor: "pointer" }} onClick={() => setSteps(steps + 1)} >Don't remember? Skip</span>
//             </div>
//             <button onClick={(e) => {
//               e.preventDefault()
//               setSteps(steps + 1)

//             }} className={styles.btn}>Next</button>
//             <div className={styles.login_register}>
//               <p style={{ cursor: "pointer" }} onClick={() => setSteps(steps - 1)} >Previous Step</p>
//             </div>
//           </>
//         )
//         break;
//       case 2:
//         return (
//           <>
//             <div className={styles.input_box}>
//               <span className={styles.icon}><ion-icon name="location"></ion-icon></span>
//               <input type="text" id="bp" onChange={(e) => setUser({ ...user, "bp": e.target.value })} />
//               <label htmlFor="bp">Birth Place</label>
//             </div>
//             <button onClick={(e) => {
//               e.preventDefault()
//               setSteps(steps + 1)

//             }} className={styles.btn}>Next</button>
//             <div className={styles.login_register}>
//               <p style={{ cursor: "pointer" }} onClick={() => setSteps(steps - 1)} >Previous Step</p>
//             </div>
//           </>
//         )
//         break;
//       case 3:
//         return (
//           <>
//             <div className={styles.input_box}>
//               <p></p>
//               <span className={styles.icon}><ion-icon name="person"></ion-icon></span>
//               <input type="text" id="name" onChange={(e) => setUser({ ...user, "name": e.target.value })} />
//               <label htmlFor="name">Username*</label>
//             </div>
//             <button onClick={(e) => {
//               e.preventDefault()
//               if (user.name) {
//                 setSteps(steps + 1)
//               }
//               else {
//                 dispatch(PopupState({ status: "Error", message: "Enter Your Valid Name" }))

//               }
//             }} className={styles.btn}>Next</button>
//             <div className={styles.login_register}>
//               <p style={{ cursor: "pointer" }} onClick={() => setSteps(steps - 1)} >Previous Step</p>
//             </div>
//           </>
//         )
//         break;
//       case 4:
//         return (
//           <>

//             <div className={styles.input_box}>
//               <span className={styles.icon}><ion-icon name="mail"></ion-icon></span>
//               <input type="email" id="email" onChange={(e) => setUser({ ...user, "email": e.target.value })} />
//               <label htmlFor="email">Email*</label>
//             </div>
//             <button onClick={(e) => {
//               e.preventDefault()
//               let emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/

//               if (!emailRegex.test(user.email)) {
//                 dispatch(PopupState({ status: "Error", message: "Enter Your Valid Email" }))
//               }
//               else {
//                 setSteps(steps + 1)
//               }
//             }} className={styles.btn}>Next</button>
//             <div className={styles.login_register}>
//               <p style={{ cursor: "pointer" }} onClick={() => setSteps(steps - 1)} >Previous Step</p>
//             </div>
//           </>
//         )
//       case 5:
//         return (
//           <>
//             <div className={styles.input_box}>
//               <span className={styles.icon}><ion-icon name="lock-closed"></ion-icon></span>
//               <input type="password" id="password" onChange={(e) => setUser({ ...user, "password": e.target.value })} />
//               <label htmlFor="password">Password*</label>
//             </div>

//             <div className={styles.remember_password}>
//               <label htmlFor=""> <input type="checkbox" checked={term} onChange={() => setTerm(!term)} />Agree to the term & condition </label>
//             </div>
//             <button onClick={(e) => {
//               e.preventDefault()
//               if (term) {
//                 setLoading(true)
//                 const zodiac = checkDateRange(user.dob)
//                 try {

//                 } catch (error) {
//                   console.log(error)
//                 }
//                 dispatch(SinginUser({ ...user, zodiac })).then((e) => {
//                   setLoading(false)

//                   if (e.payload?.success) {
//                     dispatch(PopupState({ status: "Success", message: `Your account successfully Created on Unzziptruth Platform ` }))
//                   } else {
//                     dispatch(PopupState({ status: "Error", message: e?.payload?.message || "Internal server error" }))
//                   }
//                 })
//               } else {
//                 dispatch(PopupState({
//                   status: "Error", message: "You need to Check term & conditions "
//                 }))
//               }
//             }} className={styles.btn}>{loading ? <Loading /> : "Submit"}</button>
//             <div className={styles.login_register}>
//               <p style={{ cursor: "pointer" }} onClick={() => setSteps(steps - 1)} >Previous Step</p>
//             </div>
//           </>

//         )
//         break;


//     }
//   }
//   return (
//     <>
//       <div className={`${styles.form_box} ${styles.register}`} >
//         <form action="#">
//           <h2>Register</h2>
//           {
//             InputRender()
//           }


//         </form>

//         {/* <form action="#">
//           <div  className={styles.input_box}>
//             <p></p>
//             <span className={styles.icon}><ion-icon name="person"></ion-icon></span>
//             <input type="text" name="" id="" />
//             <label htmlFor="email">Username</label>
//           </div>
         
         
//           <button onClick={() => setSteps(1)} className={styles.btn}>Next</button>
//           <div className={styles.login_register}>
//             <p>Already have an account? <span onClick={() => setLoginForm(false)} className="login-link" id="login-link">Login now</span></p>
//           </div>
//         </form> */}

//       </div>
//     </>
//   )
// }
// const ForgotPassword = ({ setLoginForm }) => {
//   const dispatch = useDispatch()
//   const [user, setUser] = useState({ email: "", password: "", nPassword: "" })
//   const [rememberMe, setRememberMe] = useState(false)
//   const [loading, setLoading] = useState(false)
//   return (
//     <>
//       <div className={`${styles.form_box} ${styles.forgotPassword}`}>
//         <h2>Forgot password</h2>
//         <form action="#">
//           <div className={styles.input_box}>
//             <span className={styles.icon}><ion-icon name="mail"></ion-icon></span>
//             <input autoComplete="false" autoCorrect='false' autoSave='false' type="email" id='email' onChange={(e) => setUser({ ...user, "email": e.target.value })} />
//             <label htmlFor="email">Email</label>
//           </div>
//           <div className={styles.input_box}>
//             <span className={styles.icon}><ion-icon name="lock-closed"></ion-icon></span>
//             <input autoComplete="false" autoCorrect='false' autoSave='false' type="password" id='password' onChange={(e) => setUser({ ...user, "password": e.target.value })} />
//             <label htmlFor="password">Password</label>
//           </div>
//           <div className={styles.input_box}>
//             <span className={styles.icon}><ion-icon name="lock-closed"></ion-icon></span>
//             <input autoComplete="false" autoCorrect='false' autoSave='false' type="password" id='nPassword' onChange={(e) => setUser({ ...user, "nPassword": e.target.value })} />
//             <label htmlFor="nPassword">New Password</label>
//           </div>
//           <div className={styles.remember_password}>
//             <label htmlFor=""> </label>
//             <span style={{ cursor: "pointer" }} onClick={() => setLoginForm("login")} >Back to Login</span>
//           </div>
//           <button onClick={(e) => {
//             e.preventDefault()
//             setLoading(true)
//             // dispatch(LoginUser({ c: user.email, p: user.password })).then((e) => {
//             //   if (e?.payload?.success) {
//             //     dispatch(PopupState({ status: "Success", message: "Login Successfully" }))
//             //     rememberMe && localStorage.setItem("token", e.payload.token)
//             //   } else {
//             //     dispatch(PopupState({ status: "Error", message: e.payload.message }))
//             //   }
//             // })
//             dispatch(ForgetPass({ c: user.email, p: user.password })).then((e) => {
//               setLoading(false)
//               console.log(e.payload)
//               e.payload.success ? dispatch(PopupState({ status: "Success", message: `` })) : dispatch(PopupState({ status: "Error", message: e.payload.message }))
//             })
//           }} className={styles.btn}>{loading ? <Loading /> : "Send OTP"}</button>

//         </form>
//       </div >
//     </>
//   )
// }
// const LoginPage = ({ setLoginForm }) => {
//   const dispatch = useDispatch()
//   const [user, setUser] = useState({ email: "", password: "" })
//   const [rememberMe, setRememberMe] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()

//   return (
//     <>
//       <div className={`${styles.form_box} ${styles.login}`}>
//         <h2>Login</h2>
//         <form action="#">
//           <div className={styles.input_box}>
//             <span className={styles.icon}><ion-icon name="mail"></ion-icon></span>
//             <input autoComplete="false" autoCorrect='false' autoSave='false' type="email" id='email' onChange={(e) => setUser({ ...user, "email": e.target.value })} />
//             <label htmlFor="email">Email</label>
//           </div>
//           <div className={styles.input_box}>
//             <span className={styles.icon}><ion-icon name="lock-closed"></ion-icon></span>
//             <input autoComplete="false" autoCorrect='false' autoSave='false' type="password" id='password' onChange={(e) => setUser({ ...user, "password": e.target.value })} />
//             <label htmlFor="password">Password</label>
//           </div>
//           <div className={styles.remember_password}>
//             <label htmlFor=""> <input type="checkbox" checked={rememberMe} onClick={() => { setRememberMe(!rememberMe) }} />Remember me </label>
//             <span style={{ cursor: "pointer" }} onClick={() => {
//               setLoginForm("forgotPassword")
//               navigate("/auth?forgot-password=true")
//             }} >Forgot Password</span>
//           </div>
//           <button onClick={(e) => {
//             e.preventDefault()
//             setLoading(true)
//             dispatch(LoginUser({ c: user.email, p: user.password })).then((e) => {
//               setLoading(false)
//               if (e?.payload?.success) {
//                 dispatch(PopupState({ status: "Success", message: "Login Successfully" }))
//                 rememberMe && localStorage.setItem("token", e.payload.token)
//               } else {
//                 dispatch(PopupState({ status: "Error", message: e.payload.message }))
//               }
//             })
//           }} className={styles.btn}>{loading ? <Loading /> : "Login"}</button>
//           <div className={styles.login_register}>
//             <p>Don't have an account? <span style={{ cursor: "pointer" }} onClick={() => {
//               setLoginForm("singUp")
//               navigate("/auth?sign-up=true")

//             }} className={styles.register_link} id="register-link">Register now</span></p>
//           </div>
//         </form>

//       </div >
//     </>
//   )
// }

// export default Auth;
