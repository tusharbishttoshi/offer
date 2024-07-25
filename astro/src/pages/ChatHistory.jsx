import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { FetchChat, FetchMessage, SendMessage, userSession } from '../api/useReducer';
import { useRef } from 'react';

function ChatHistory() {
    const [user, setUser] = useState({})
    const { astro, allMessages, UserSession } = useSelector((state) => state.user)
    const [chats, setX] = useState([])
    const [isChat, setIsChat] = useState("")
    const [content, setContent] = useState("")
    const dispatch = useDispatch()
    // useEffect(() => {
    //     chats.length > 0 && setX(chats?.sort((a, b) => {
    //         return new Date(b.latestMessage.createdAt) - new Date(a.latestMessage.createdAt);
    //     }))

    // }, [chats])
    const [userProfile, setUserProfile] = useState("")
    useEffect(() => {
        dispatch(FetchChat({ _id: astro._id })).then((e) => {
            if (e?.payload?.success && e.payload?.chats.length > 0) {
                const a = [...e.payload.chats]
                setX(a.sort((a, b) => {
                    return new Date(b.latestMessage?.createdAt) - new Date(a.latestMessage?.createdAt);
                }))
            }
        })
    }, [])
    const scrollableDivRef = useRef(null);
    useEffect(() => {
        if (scrollableDivRef.current) { scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight }
    }, [allMessages]);
    useEffect(() => {
        isChat && dispatch(FetchMessage({ id: isChat }))
    }, [isChat])
    return (
        <>
            <div style={{ display: "flex", height: "calc(100vh - 55px)", overflow: "hidden", backgroundColor: "white", border: "1px solid black" }}>
                <div style={{ paddingBottom: "20px", width: "350px", display: "flex", flexDirection: "column", alignItems: "center", overflow: "scroll", gap: "10px" }} >

                    <div style={{ paddingTop: "10px", display: "flex", flexDirection: "column", width: "100%", alignItems: "center", gap: "10px", overflow: "visible" }}>
                        {
                            chats.map((e) => (
                                <div key={e._id} onClick={() => {
                                    setUser(e)
                                    setIsChat((p) => {
                                        return e._id
                                    })
                                }} style={{ alignItems: "center", minHeight: "60px", cursor: "pointer", display: "flex", gap: "10px", backgroundColor: "var(--bg-white)", borderRadius: "6px", padding: "6px 15px", width: "90%" }}>
                                    <div style={{ height: "50px", aspectRatio: "1", borderRadius: "50%", backgroundColor: "red" }}>
                                        <img src={e.user?.avatar?.url} style={{ height: "100%", width: "100%", objectFit: "cover" }} alt="" />
                                    </div>
                                    <div>
                                        <p>{e.user.name}</p>
                                        <p>{e.latestMessage?.content}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>


                </div>
                {isChat ?
                    <div style={{ borderLeft: "1px solid gray", height: "100%", width: "100%", }}>
                        <div style={{ width: "100%", height: "70px", display: "flex", position: "sticky", top: "0px", justifyContent: "space-between", padding: "0px 20px", backgroundColor: "var(--cta-white)", textTransform: "capitalize" }}>
                            <div onClick={() => setUserProfile("profile")} style={{ cursor: "pointer", color: "black", display: "flex", alignItems: "center", gap: "20px" }}>
                                <div style={{ height: "50px", aspectRatio: "1", borderRadius: "50%", background: "red" }}>
                                    <img src={chats.find((e) => e._id == isChat)?.user?.avatar?.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                </div>
                                <div>
                                    <p >{chats.find((e) => e._id == isChat)?.user?.name}</p>
                                    {/* <p >{parseFloat(totalEarning.toFixed(2))}</p> */}
                                </div>
                            </div>
                            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                                {/* <div onClick={() => setUserProfile("session")} style={{ background: "var(--yellow)", padding: "10px 20px", cursor: "pointer" }}>
                                    View Transitions
                                </div> */}
                                <div >
                                    {/* <p style={{ fontWeight: "700" }}>Total Earning</p> */}
                                    {/* <p style={{ textAlign: "center" }}>{parseFloat(totalEarning.toFixed(2))}</p> */}
                                </div>
                            </div>
                        </div>
                        <div ref={scrollableDivRef} style={{ height: "calc(100% - 70px)", padding: "30px", background: "var(--bg-white)", width: "100%", overflow: "scroll", }}>
                            <div style={{ display: "flex", flexDirection: "column", background: "white", borderRadius: "10px", justifyContent: "flex-end", gap: "3px", minHeight: "100%", padding: "10px", border: "1px solid gray" }}>
                                {allMessages?.map((e) => (
                                    <div style={{ gap: "2px", display: "flex", flexDirection: "column", alignItems: astro._id === e.sender ? "flex-end" : "flex-start", maxWidth: "85%", alignSelf: astro._id === e.sender ? "flex-end" : "flex-start", }}
                                    >
                                        {e?.avatar?.url && (
                                            <img
                                                src={e?.avatar?.url}
                                                alt="image"
                                                className="img-fluid"
                                                style={{ width: "100px", height: "100px" }}
                                            />
                                        )}
                                        {e.content && (
                                            <p style={{ backgroundColor: astro._id !== e.sender ? "#ffcaca" : "#cacaff", padding: "6px 15px", borderRadius: "6px", fontSize: "16px" }}>
                                                {e.content}
                                            </p>
                                        )}
                                        <p style={{ color: "black", fontSize: "12px" }}>{e?.createdAt.split("T").slice(0, 1)}  {new Date(e?.createdAt).getHours()}:{new Date(e?.createdAt).getMinutes()}</p>
                                    </div>

                                ))}
                                <div style={{ width: "100%", display: "flex", padding: "10px 20px", gap: "10px", backgroundColor: "var(--bg-white)", textTransform: "capitalize" }}>
                                    <input value={content}
                                        onKeyDown={(e) => {
                                            if (content) {
                                                if (e.key === "Enter" && astro._id) {
                                                    dispatch(SendMessage({ content, myId: astro._id, userId: user.user._id, chatId: isChat })).then((e) => {
                                                        if (e.payload?.success) {
                                                            setContent("")
                                                        }
                                                    })
                                                }
                                            }
                                        }}
                                        onChange={(e) => setContent(e.target.value)} type="text" style={{ border: "none", outline: "none", width: "100%", padding: "8px 10px", borderRadius: "6px" }} name="" id="" />
                                    <button onClick={(e) => {
                                        if (astro._id) {
                                            dispatch(SendMessage({ content, myId: astro._id, userId: user.user._id, chatId: isChat })).then((e) => {
                                                if (e.payload?.success) {
                                                    setContent("")
                                                }
                                            })
                                        }
                                    }} style={{ border: "none", outline: "none", backgroundColor: "var(--yellow)", padding: "6px 15px", borderRadius: "6px", cursor: "pointer" }}>Send</button>
                                </div>
                            </div>

                            {/* <div style={{ display: "flex", flexDirection: "column", gap: "8px", justifyContent: "flex-end", }}>
                                
                            </div> */}

                        </div>

                    </div>
                    : <>
                        <div style={{ borderLeft: "1px solid gray", flex: "1", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <h1 style={{ fontSize: "25px", fontWeight: "700", maxWidth: "440px", width: "95%", textAlign: "center", color: "black" }}>No Chat selected if you want to see chat history then you need to select chat</h1>
                        </div>
                    </>
                }
                {
                    userProfile === "profile" &&
                    <div style={{ padding: "10px", width: "350px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", overflow: "scroll", gap: "10px" }} >
                        <div style={{ width: "90%", margin: "0px auto", aspectRatio: "1", background: "red", borderRadius: "50%", overflow: "hidden" }}>
                            <img src={chats.find((e) => e._id == isChat)?.user?.avatar?.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <div style={{ width: "98%", backgroundColor: "var(--cta-white)", borderRadius: "6px", padding: "20px", marginTop: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>
                            <div><strong>Name: </strong>{chats.find((e) => e._id == isChat)?.user?.name}</div>
                            <div><strong>DOB: </strong>{chats.find((e) => e._id == isChat)?.user?.dob}</div>
                            <div><strong>Gender: </strong>{chats.find((e) => e._id == isChat)?.user?.gender}</div>
                            <div><strong>Zodiac: </strong>{chats.find((e) => e._id == isChat)?.user?.zodiac}</div>
                            <div><strong>Birth Place: </strong>{chats.find((e) => e._id == isChat)?.user?.bp}</div>
                            <div><strong>Birth Time: </strong>{chats.find((e) => e._id == isChat)?.user?.bt}</div>
                            <div><strong>Country: </strong>{chats.find((e) => e._id == isChat)?.user?.country}</div>
                        </div>
                    </div>
                }


            </div>

        </>
    )
}

export default ChatHistory
