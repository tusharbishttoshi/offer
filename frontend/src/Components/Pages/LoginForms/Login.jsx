import React, { useState } from 'react'
import "./otp_submit.css"
import { useDispatch } from 'react-redux'
import { LoginUser, PopupState } from '../../../api/userLogInReducer'
import { Link } from 'react-router-dom'
import FormTemp from './FormTemp'
import { type } from '@testing-library/user-event/dist/type'
import Loading from '../../Loading/Loading'
function Login() {


    return (
        <>
            <FormTemp>
                <LoginForm />
            </FormTemp>
        </>
    )
}
export const LoginForm = ({ children, pages, setPages }) => {
    const dispatch = useDispatch()

    const [r, s] = useState({ email: "", password: "" })
    const h = (e) => {
        s({ ...r, [e.target.name]: e.target.value })

    }
    return (
        <>
            <form className='otp_Form' style={{ padding: "50px 30px", backgroundColor: "black" }} onSubmit={(e) => {
                e.preventDefault()
                dispatch(LoginUser({ c: r.email, p: r.password })).then((e) => {
                    e.payload.success ? dispatch(PopupState({ status: "Success", message: "Login Successfully" })) : dispatch(PopupState({ status: "Error", message: e.payload.message }))
                })
            }}>
                <div className='otp_Top_Text' style={{ position: "relative" }}>
                    <h1 style={{ fontSize: "27px", color: "white" }}>Login</h1>
                    <p style={{ fontSize: "18px", color: "gray" }}>Welcome back, Please login with your account</p>
                    {children}
                </div>
                <div className='otp_Code_Box' >


                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor="email" style={{ fontSize: "15px", color: "white" }}>Email*</label>
                        <input name="email" id='email' value={r.email} onChange={h} type="text" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor="password" style={{ fontSize: "15px", color: "white" }}>Password</label>
                        <input name="password" id='password' value={r.password} onChange={h} type="text" />


                    </div>
                    <div style={{}}>
                        <hr style={{ margin: "20px 0px 10px 0px" }} />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Link to="/forgot-password" style={{ cursor: "pointer", fontSize: "12px", color: "white" }}> Forgot Password?</Link>
                            <Link to="/sign-up" style={{ cursor: "pointer", fontSize: "12px", color: "white" }}>you have't account? Sign-up</Link>
                        </div>
                    </div>
                    <button className='otp_btn' style={{ background: "var(--yellow)", color: "var(--dark)", fontWeight: "600" }}><Loading /> </button>
                </div>

            </form >
        </>
    )
}


export default Login
