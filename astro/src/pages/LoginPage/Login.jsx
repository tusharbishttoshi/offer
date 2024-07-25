import React from 'react';
import styles from './Login.module.css';  // Corrected file extension
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { LoginAstro, Model } from '../../api/useReducer';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom"



function Login() {
    const [astroD, setAstro] = useState({ email: "", password: "" })

    const dispatch = useDispatch()
    const { astro } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const [showError, setShowError] = useState(false)
    
    useEffect(() => {
        if (astro?._id) {
            console.log(astro)
            navigate(-1)
        }
    }, [astro])
    return (
        <div className={styles.wrapper}>
            <div className={styles.form} style={{ border: showError ? "1px solid red" : "1px ", boxShadow: showError ? "1px 1px 10px 1px red" : null }}>
                <h1 className={styles.heading}>

                    Welcome Astrologers
                </h1>
                <div className={styles.inputContainer}>
                    <label htmlFor="email">Email</label>
                    <input type="text" name='email' onChange={(e) => setAstro({ ...astroD, "email": e.target.value })} id='email' placeholder='Email' />
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' id='password' placeholder='Password' onChange={(e) => setAstro({ ...astroD, "password": e.target.value })} />
                </div>
                <div className={styles.btn} onClick={() => dispatch(LoginAstro(astroD)).then((e) => {

                    if (!e.payload.success) {
                        setShowError(true)
                        setTimeout(() => {
                            setShowError(false)
                        }, 3000);
                    }
                    else {
                        dispatch(Model())
                    }
                })}>
                    Login
                </div>
                {
                    showError &&
                    <p style={{ textAlign: "center", fontWeight: "700", color: "red" }}>Invalid Credentials</p>
                }

            </div>
        </div>
    );
}

export default Login
