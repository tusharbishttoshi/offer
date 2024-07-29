import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import img from '../../../images/CfzenJ.jpg'
function FormTemp({ children }) {
    const { user } = useSelector((state) => state.userLog)
    const navigate = useNavigate()

    useEffect(() => {
        user._id && navigate("/")
    }, [user, navigate])
    return (
        <section className='opt_Main_Div' style={{ background: "white", height: "100%" }} >
            
            <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
                <div style={{ display: "flex", alignItems: "center", padding:"20px" }}>

                    {children}
                </div>
            </div>
        </section>
    )
}

export default FormTemp
