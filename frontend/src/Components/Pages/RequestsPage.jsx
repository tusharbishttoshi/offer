import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

function RequestsPage({ socketRef }) {
    const { ClientRequests } = useSelector((state) => state.astroRequest)
    const { user } = useSelector((state) => state.userLog)

    return (
        <>
            <div className='wapper' style={{ background: "var(--bg-yellow)", height: "100vh" }}>
                <div className='container' style={{ display: "flex", flexWrap: "wrap", padding: "50px 50px 50px 50px", gap: "20px" }}>

                    {
                        ClientRequests.length > 0 ?
                            <>
                                {
                                    ClientRequests.map((e) => (
                                        <>
                                            <div style={{ minWidth: "400px", background: "var(--white)", borderRadius: "10px", display: "flex", gap: "15px", flex: "1", alignItems: "center", padding: "5px 15px" }}>
                                                <div style={{ height: "50px", aspectRatio: "1", background: "red", borderRadius: "50%", overflow:"hidden" }}>
                                                    <img src={e.avatar.url} style={{ height: "100%",width:"100%", objectFit:"cover" }} alt="h" />
                                                </div>
                                                <div style={{ flex: "1" }}>
                                                    <p >{e?.name}</p>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px" }}>
                                                    <p style={{ cursor: "pointer", background: "red", padding: "5px 15px", fontWeight: "600", borderRadius: "100px", color: "var(--dark)" }} onClick={() => socketRef.current.emit("acceptRequest", { clientId: e._id, astro: user })}>message</p>
                                                </div>
                                            </div>
                                        </>
                                    ))
                                }
                            </>
                            :
                            <>
                                <div style={{ width: "100%", margin: "10px", backgroundColor: "var(--white)", padding: "100px", boxShadow: "0px 0px 4px gray" }}>
                                    <h3 style={{ fontSize: "40px", color: "var(--dark-blue)", textAlign: "center" }}>No result fount </h3>
                                </div>
                            </>
                    }
                </div>
            </div>
        </>
    )
}

export default RequestsPage
