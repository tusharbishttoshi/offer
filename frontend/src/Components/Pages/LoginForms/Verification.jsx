import React, { useState } from 'react'
import FormTemp from './FormTemp'
import { useLocation, useParams } from 'react-router-dom';
import { PopupState, VerifyEmail, resetPassword } from '../../../api/userLogInReducer';
import { useDispatch } from 'react-redux';

function Verification() {
    let { token } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const p = queryParams.get('p');
    const dispatch = useDispatch()
    const [code, setCode] = useState("")
    return (
        <>
            <FormTemp>
                <form className='otp_Form' style={{ backgroundColor: "black", }} onSubmit={(e) => e.preventDefault()}>
                    <div className='otp_Top_Text'>
                        <h1 style={{ fontSize: "27px", color: "white" }}>{p ? "Reset Account Password" : "Verify Your Account"}</h1>
                        <p style={{ fontSize: "18px", color: "gray" }}>Enter your Correct code</p>
                    </div>
                    <div className='otp_Code_Box' >
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <label htmlFor="name" style={{ fontSize: "15px", color: "white" }}>Code*</label>
                            <input name="name" id='name' value={code} onChange={(e) => setCode((prev) => e.target.value)} type="text" />
                        </div>

                        <button className='otp_btn' style={{ background: "var(--yellow)" }} onClick={() => {
                            p ? dispatch(resetPassword({ token, code, p })).then((e) => e.payload.success ? dispatch(PopupState({ status: "Success", message: "Password change Successfully Reload Website" })) : dispatch(PopupState({ status: "Error", message: e.payload.message }))) :
                                dispatch(VerifyEmail({ token, code })).then((e) => e.payload.success ? dispatch(PopupState({ status: "Success", message: "Verify Successfully Reload Website" })) : dispatch(PopupState({ status: "Error", message: e.payload.message })))
                        }}>Verify</button>
                    </div>

                </form>
            </FormTemp>
        </>
    )
}

export default Verification
