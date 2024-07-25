import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CreateChat } from '../../api/chatReducer'
import { useNavigate } from 'react-router-dom'
import { RemoveRequest } from '../../api/ChatRequestReducer'

function CallModel({ astro, setCallFromAstro, socketRef }) {
    const { user } = useSelector((state) => state.userLog)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        document.body.style.overflowY = !astro._id ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, [astro]);
    return (
        <>
            <div style={{ display: "flex", zIndex: "100", justifyContent: "center", alignItems: "center", height: "100vh", width: "100vw", position: "fixed", top: "0px", left: "0px", background: "var(--bg-yellow)" }}>
                <div style={{ width: "440px", background: "var(--white)", padding: "40px 0px", borderRadius: "10px", gap: "30px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: "30%", aspectRatio: "1", borderRadius: "50%", background: "red", overflow: "hidden" }}>
                        <img src={astro?.avatar?.url} alt="" style={{ height: "100%", width: "100%" }} />
                    </div>
                    <h3>{astro.name}</h3>
                    <div style={{ width: "100%", display: "flex", justifyContent: "space-around" }}>
                        <button style={{ border: "none", outline: "none", cursor: "pointer", padding: "5px 15px", borderRadius: "4px", fontWeight: "600", color: "white", background: "red" }} onClick={() => {
                            setCallFromAstro(false)
                            socketRef.current?.emit("cancelRequest", { astro: astro._id, user: user._id })
                            dispatch(RemoveRequest(astro._id))
                        }

                        }>Cancel</button>

                        <button style={{ border: "none", outline: "none", cursor: "pointer", padding: "5px 15px", borderRadius: "4px", fontWeight: "600", background: "lightgreen" }} onClick={() => {
                            dispatch(CreateChat({ astroId: astro._id, myId: user._id })).then((e) => {
                                if (e.payload.success) {
                                    setCallFromAstro(false)
                                    navigate(`/ChatPage/${e.payload.chat._id}`)
                                }
                                socketRef.current.emit("charRedirect", { path: e.payload.chat._id, astroId: astro._id, user })
                            })
                        }}>Chat</button>
                    </div>
                </div>
            </div >
        </>
    )
}

export default CallModel
