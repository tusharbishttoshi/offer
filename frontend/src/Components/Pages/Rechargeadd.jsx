import React, { useEffect, useState } from 'react'
import { PaymentModel } from '../..'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { TokenLogin } from '../../api/userLogInReducer'

function Rechargeadd() {
    const [amount, setAmount] = useState(0)
    const [show, setShow] = useState(false)
    const { user } = useSelector((state) => state.userLog)
    const dispatch = useDispatch()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    useEffect(() => {
        token && dispatch(TokenLogin({ token }))
    }, [token])
    return (
        <div style={{ position: "fixed", top: "0px", left: "0px", overflowY: "scroll", height: "100vh", width: "100vw", backgroundColor: "white", padding: "10px 20px" }}>
            {
                user._id ? <>
                    <div>
                        <p>Available Balance</p>
                        <p style={{ color: "black", fontWeight: "600", fontSize: "20px" }}>${user.balance.toFixed(2)}</p>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "space-between" }}>
                        <div onClick={() => {
                            setAmount(10)
                            setShow(true)
                        }} style={{ border: "1px solid gray", display: "flex", alignItems: "center", justifyContent: "center", aspectRatio: "4/3", width: "30%", maxWidth: "200px", borderRadius: "6px", color: "green" }}>$10 </div>
                        <div onClick={() => {
                            setAmount(29)
                            setShow(true)
                        }} style={{ border: "1px solid gray", display: "flex", alignItems: "center", justifyContent: "center", aspectRatio: "4/3", width: "30%", maxWidth: "200px", borderRadius: "6px", color: "green" }}>$29</div>
                        <div onClick={() => {
                            setAmount(49)
                            setShow(true)
                        }} style={{ border: "1px solid gray", display: "flex", alignItems: "center", justifyContent: "center", aspectRatio: "4/3", width: "30%", maxWidth: "200px", borderRadius: "6px", color: "green" }}>$49</div>
                        <div onClick={() => {
                            setAmount(99)
                            setShow(true)
                        }} style={{ border: "1px solid gray", display: "flex", alignItems: "center", justifyContent: "center", aspectRatio: "4/3", width: "30%", maxWidth: "200px", borderRadius: "6px", color: "green" }}>$99</div>
                        <div onClick={() => {
                            setAmount(149)
                            setShow(true)
                        }} style={{ border: "1px solid gray", display: "flex", alignItems: "center", justifyContent: "center", aspectRatio: "4/3", width: "30%", maxWidth: "200px", borderRadius: "6px", color: "green" }}>$149</div>
                        <div onClick={() => {
                            setAmount(199)
                            setShow(true)
                        }} style={{ border: "1px solid gray", display: "flex", alignItems: "center", justifyContent: "center", aspectRatio: "4/3", width: "30%", maxWidth: "200px", borderRadius: "6px", color: "green" }}>$199</div>
                        <div onClick={() => {
                            setAmount(222)
                            setShow(true)
                        }} style={{ border: "1px solid gray", display: "flex", alignItems: "center", justifyContent: "center", aspectRatio: "4/3", width: "30%", maxWidth: "200px", borderRadius: "6px", color: "green" }}>$222</div>
                    </div>
                </> : <>

                </>
            }

            {
                show && <PaymentModel prise={amount} setShow={setShow} />
            }
        </div>
    )
}

export default Rechargeadd
