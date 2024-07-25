import React from 'react'
import { useNavigate } from 'react-router-dom'

function UserActivity() {
    const navigate = useNavigate()

    return (
        <>
            <div className='chatsdjs' style={{ height: "100%", flex: "1",  overflow: "hidden", width: "95%", margin: "auto",}}>
                <h2 style={{ width: "95%", margin: "auto", marginTop: "20px", padding: "10px 20px", }}>User Activity</h2>

                <div id='workflow' style={{ background: "var(--white)", marginTop: "20px", flexWrap: "wrap", padding: "0px 20px", gap: "2%", display: "flex", height: "auto" }} >
                    <div style={{ cursor: "pointer", flex: "1", minWidth: "200px", background: "#f7f796", display: "flex", alignItems: "center", justifyContent: "center", height: "50px", borderRadius: "10px", maxWidth: "400px" }}>User activity</div>
                </div>
            </div>
        </>
    )
}

export default UserActivity
