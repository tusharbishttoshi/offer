import React, { useState } from 'react'
import "./otp_submit.css"
import { useDispatch } from 'react-redux'
import { PopupState, SinginUser } from '../../../api/userLogInReducer'
import { Link } from 'react-router-dom'
import { HiArrowLeft } from 'react-icons/hi';
import FormTemp from './FormTemp'
import { checkDateRange } from '../Profile/ProfileSideBar'
function Singin() {

    return (
        <>
            <FormTemp>
                <SignInFrom />
            </FormTemp >
        </>
    )
}
export const SignInFrom = ({ children, pages, setPages }) => {
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [dob, setDob] = useState("")
    const [bt, setBt] = useState("")
    const [bp, setBp] = useState("")
    return (
        <>
            <form className='otp_Form' style={{ padding: "50px 30px", backgroundColor: "black", }} onSubmit={(e) => e.preventDefault()}>

                <div className='otp_Top_Text' style={{ position: "relative" }}>
                    <h1 style={{ fontSize: "27px", color: "white" }}>Sign-Up</h1>
                    <p style={{ fontSize: "18px", color: "gray" }}>Welcome to Unzzip Truth, Fill all the details for more features</p>
                    {
                        children
                    }
                </div>
                <div className='otp_Code_Box' >

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor="name" style={{ fontSize: "15px", color: "white" }}>Name*</label>
                        <input name="name" id='name' value={name} onChange={(e) => setName((prev) => e.target.value)} type="text" />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor="email" style={{ fontSize: "15px", color: "white" }}>Email* </label>
                        <input name="email" id='email' value={email} onChange={(e) => setEmail((prev) => e.target.value)} type="text" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor="password" style={{ fontSize: "15px", color: "white" }}>Password*</label>
                        <input name="password" id='password' value={password} onChange={(e) => setPassword((prev) => e.target.value)} type="text" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor="dob" style={{ fontSize: "15px", color: "white" }}>Date of Birth*</label>
                        <input name="dob" id='dob' value={dob} onChange={(e) => setDob((prev) => e.target.value)} type="date" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor="bt" style={{ fontSize: "15px", color: "white" }}>Birth time</label>
                        <input name="bt" id='bt' value={bt} onChange={(e) => setBt((prev) => e.target.value)} type="time" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor="bp" style={{ fontSize: "15px", color: "white" }}>Birth place</label>
                        <input name="bp" id='bp' value={bp} onChange={(e) => setBp((prev) => e.target.value)} type="text" />
                    </div>
                
                    <div style={{}}>
                        <hr style={{ margin: "20px 0px 10px 0px" }} />
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Link to="/login" style={{ cursor: "pointer", fontSize: "12px", color: "white" }}>All ready have account ? Login</Link>
                        </div>
                    </div>
                    <button className='otp_btn' style={{ background: "var(--yellow)", color: "var(--dark)", fontWeight: "600", cursor: "pointer" }} onClick={() => {
                        let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
                        if (name.length < 1) {
                            dispatch(PopupState({ status: "Error", message: "Name must longer then 3 words" }))
                        }
                        else if (!emailRegex.test(email)) {
                            dispatch(PopupState({ status: "Error", message: "Enter valid credential" }))
                        } else if (password.length < 8) {
                            dispatch(PopupState({ status: "Error", message: "Password must more then 8 characters" }))
                        } else if (!dob) {
                            dispatch(PopupState({ status: "Error", message: "please enter your date of birth" }))
                        }
                        else {
                            const zodiac = checkDateRange(dob)
                            dispatch(SinginUser({ name, c: email, password, dob, zodiac, bt, bp, })).then((e) => {
                                e.payload?.success ? dispatch(PopupState({ status: "Success", message: `Verification link Send on ${email} Successfully` })) : dispatch(PopupState({ status: "false", message: e.payload.message }))
                            })
                        }
                    }}>Submit</button>
                </div>

            </form>
        </>
    )
}
export default Singin
