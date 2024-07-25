import React, { useEffect, useState } from 'react'
import { BiCalendarAlt } from 'react-icons/bi';
import { FaAngleLeft, FaFilter } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AdminFetchChat, getSession } from '../api/User';
import { ArrayFilter, UserDetails } from './UserReport';
import copy from "copy-to-clipboard";
import { FaEye } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaStar, FaCopy } from "react-icons/fa";
function ChatReport() {
    const dispatch = useDispatch()
    const { sessions } = useSelector((state) => state.userReducer)
    const [t, setT] = useState("");
    const [a, setA] = useState("Monthly")
    const f = ArrayFilter(sessions, a)
    const [h, setH] = useState({})
    useEffect(() => {
        dispatch(getSession()).then((e) => console.log(e.payload))
    }, [])

    return (
        <>
            <div style={{ width: "95%", margin: "auto", height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
                    <h3 style={{ fontSize: "30px" }}>Chat details "{f.length}"</h3>
                    <div style={{ display: "flex", gap: "20px", padding: "20px 0px", }}>
                        <button onMouseOver={() => setT("first")} onMouseLeave={() => setT("")} style={{ position: "relative", border: "none", outline: "none", background: "var(--white)", padding: "10px 20px", borderRadius: "5px", boxShadow: "0px 0px 5px rgba(0, 0, 0, .5)", fontWeight: "500", }}><span style={{ display: "flex", alignItems: "center", gap: "10px" }}><BiCalendarAlt size={25} />{a}</span>
                            <ul style={{ display: t === "first" ? "block" : "none", borderRadius: "5px", boxShadow: "0px 0px 5px rgba(0, 0, 0, .5)", position: "absolute", right: "0px", top: "45px", background: "white", width: "100%" }}>
                                <li onClick={() => {
                                    setA("Yearly")
                                    setT("")
                                }} style={{ listStyle: "none", padding: "10px ", cursor: "pointer" }}>Yearly</li>
                                <li onClick={() => {
                                    setA("Monthly")
                                    setT("")
                                }} style={{ listStyle: "none", padding: "10px ", cursor: "pointer" }}>Monthly</li>
                                <li onClick={() => {
                                    setA("Weekly")
                                    setT("")
                                }} style={{ listStyle: "none", padding: "10px ", cursor: "pointer" }}>Weekly</li>
                                <li onClick={() => {
                                    setA("Daily")
                                    setT("")
                                }} style={{ listStyle: "none", padding: "10px ", cursor: "pointer" }}>Daily</li>
                            </ul>
                        </button>
                    </div>
                </div>
                <SessionTable f={f} setH={setH} />

            </div>
            {
                h._id && <ChatView h={h} setH={setH} />

            }

        </>
    )
}
export const SessionTable = ({ f, setH, userName = "" }) => {
    const [t, setT] = useState({})
    const a = [...f].reverse()
    const navigate = useNavigate()
    return (
        <>
        <div className="table-responsive card">
              <table className="table table-striped table-bordered">
                <thead >
                    <tr>
                        <th >ID</th>
                        <th >Date/Time</th>
                        <th >Astrologer</th>
                        <th >User</th>
                        <th >Duration</th>
                        <th >FeedBack</th>
                        <th >Link</th>
                        <th >View chat</th>
                    </tr>
                </thead>

                <tbody style={{ overflow: "visible" }}>
                    {
                        a?.map((user, index) => (

                            <tr key={user._id} >
                                <td  className="fs-7" >{user.id}</td>
                                <td className="fs-7" >{user.createdAt.split("T").slice(0, 1)} , {new Date(user.createdAt).getHours()}:{new Date(user.createdAt).getMinutes()}:{new Date(user.createdAt).getSeconds()}</td>
                                <td  className="fs-7" ><span  className="fs-7" onClick={() => navigate(`/astro/${user.astro._id}`)}>{user?.astro?.name} </span></td>
                                <td className="fs-7" ><span className="fs-7"  onClick={() => {
                                    setT(user.user)
                                }} >{user?.user?.name ? user?.user?.name : ''} </span></td>
                                <td className="fs-7" > <span className="digits fs-7">
                                    {("0" + Math.floor((user.timeInSeconds / 60) % 60)).slice(-2)}:
                                </span>
                                    <span className="digits fs-7">
                                        {("0" + Math.floor((user.timeInSeconds) % 60)).slice(-2)}
                                    </span></td>
                                <td className="fs-7"  style={{}}>{user.review.user ?
                                    <>
                                        <p  className="fs-7"style={{ textAlign: "center", display: "flex", alignItems: "flex-start", gap: "3px", justifyContent: "center" }}>
                                            <div className="fs-7" style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
                                                <span className="fs-7" style={{ fontWeight: "700" }}>User </span>
                                                <div>
                                                    <Star rating={user.review.rating} />
                                                </div>
                                                {user.review.comment}
                                            </div>
                                        </p>
                                    </>
                                    : user.reason !== "NaN" ?
                                        <>
                                            <p className="fs-7" >
                                                <span  className="fs-7" style={{ fontWeight: "700" }}>Astro : </span>
                                                <span className="fs-7">{user.reason}</span>
                                            </p>
                                        </>
                                        :
                                        <></>}</td>
                                <td  className="fs-7" style={{ textAlign: "center", padding: "0px", width: "60px" }}> <A id={user._id} /></td>
                                {/* <td > <FaEye size={25}  onClick={()=>navigate("/chat-history-view",{state:user})}/></td> */}
                                <td  className="fs-7"> <FaEye size={25}  onClick={() => setH(user)} /></td>
                            </tr>

                        ))
                    }
                </tbody >
            </table >
            </div>
            {
                t._id && <UserDetails t={t} setT={setT} />

            }
        </>
    )
}
const A = ({ id }) => {
    const [ok, setOk] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setOk(false)
        }, 2000);
    }, [ok])
    return (
        <>
            <FaCopy onClick={() => {
                copy(`astro.unzziptruth.com/sessions/${id}`)
                setOk(true)
            }} size={25}  />
            <div style={{ height: "10px" }}>

                {
                    ok &&
                    <p style={{ fontSize: "10px" }}>Link Copied</p>
                }
            </div>
        </>
    )
}
export const Star = ({ rating }) => {

    return (
        <>
            {[...Array(5)].map((e, i) => {
                return (
                    <>
                        {(i + 1) > rating ? <FaRegStar /> : <FaStar />}
                    </>
                )
            })}
        </>
    )
}

export const ChatView = ({ h, setH }) => {
    const dispatch = useDispatch()
    const [m, setM] = useState([])
    const endDate = new Date(h.createdAt)
    const startDate = new Date(endDate.getTime() - h.timeInSeconds * 1000)
    const fm = m.filter((e) => {
        const date = new Date(e.createdAt)
        if (date > startDate && date < endDate) {
            return e
        }
    })
    useEffect(() => {
        h._id && dispatch(AdminFetchChat({ astro: h.astro._id, user: h.user._id || h.user })).then((e) => e.payload.success && setM(e.payload.messages))
    }, [h])
    return (
        <>
            <div style={{ width: "100%", position: "fixed", overflowX: "hidden", height: "100vh", bottom: "0px", right: "0px", background: "white", zIndex: "1000" }}>
                <div style={{ width: "100%", height: "70px", padding: "0px 20px", display: "flex", alignItems: "center" }}>
                    <FaAngleLeft onClick={() => setH({})} size={30}  />
                    <div style={{ display: "flex", padding: "0px 20px", width: "100%", justifyContent: "space-between" }}>
                        <p style={{ fontSize: "20px", fontWeight: "500" }}>{h?.astro?.name}</p>
                        <p style={{ fontSize: "20px", fontWeight: "500" }}><span className="digits">
                            {("0" + Math.floor((h.timeInSeconds / 60) % 60)).slice(-2)}:
                        </span>
                            <span className="digits">
                                {("0" + Math.floor((h.timeInSeconds) % 60)).slice(-2)}
                            </span></p>
                        <p style={{ fontSize: "20px", fontWeight: "500" }}>{h?.user?.name}</p>
                    </div>
                </div>
                <div style={{ width: "100%", height: "calc(100%  - 70px)", backgroundColor: "var(--bg-white)", borderTop: "1px solid gray", overflow: "scroll", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "10px", padding: "10px 20px" }}>
                    {
                        fm.map((e) => (<div style={{ gap: "2px", display: "flex", flexDirection: "column", alignItems: h.astro._id !== e.sender ? "flex-end" : "flex-start", maxWidth: "85%", alignSelf: h.astro._id !== e.sender ? "flex-end" : "flex-start", }}
                        >

                            <p style={{ backgroundColor: h.astro._id === e.sender ? "#ffcaca" : "#cacaff", padding: "6px 15px", borderRadius: "6px", fontSize: "16px" }}>
                                {e.content}
                            </p>
                            <p style={{ color: "black", fontSize: "12px" }}>{e.createdAt.split("T").slice(0, 1)}  {new Date(e.createdAt).getHours()}:{new Date(e.createdAt).getMinutes()}</p>
                        </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}
export default ChatReport
