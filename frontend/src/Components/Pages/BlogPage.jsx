import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetBlog } from '../../api/BlogReducer'
import { useNavigate } from 'react-router-dom'
import "./a.css"
function BlogPage() {
    const dispatch = useDispatch()
    const { blogs } = useSelector((state) => state.blog)
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(GetBlog())
    }, [])
    return (
        <>
            <div style={{ width: "100vw", height: "100vh", backgroundColor: "var(--bg-yellow)" }}>
                <div className='container blogpage' style={{ height: "100%", display: "flex", gap: "20px" }}>
                    <div className='left' style={{ flex: "1", display: "flex", flexDirection: "column", gap: "10px", height: "100%", overflow: "scroll" }}>
                        {
                            blogs.map((e) => (
                                <div key={e._id} className='blogCon' onClick={() => navigate(`/blog/${e._id}`)} style={{ display: "flex", gap: "20px", background: "var(--yellow)", borderRadius: "10px", alignItems: "center", overflow: "hidden", height: "150px" }}>
                                    <div className='blogImage' style={{ height: "100%", aspectRatio: "16 / 9", background: "red", }}>
                                        <img src={e?.banner?.url} alt="" style={{ width: "100%", height: "100%" }} />
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "5px", justifyContent: "center" }}>
                                        <div style={{ fontSize: "22px", textTransform: "capitalize" }}>{e.title}</div>
                                        <div style={{ fontSize: "14px", color: "gray", fontWeight: "300", maxHeight: "40px", overflow: "hidden" }}>{e.description}</div>
                                        <div style={{ fontSize: "14px", fontWeight: "400", maxHeight: "32px", overflow: "hidden", background: "black", color: "white", padding: "3px 8px", borderRadius: "5px", width: "90px", textAlign: "center" }}>1/12/2024</div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                    <div className='right' style={{ width: "350px", display: "flex", flexDirection: "column" }}>
                        <div className='rightC'>

                            <div style={{ backgroundColor: "black", color: "white", padding: "12px 15px", fontSize: "20px" }}>Latest Blog</div>
                            {
                                blogs.map((e) => (
                                    <div key={e._id} onClick={() => navigate(`/blog/${e._id}`)} style={{ background: "white", padding: "5px 15px", display: "flex", alignItems: "center", cursor: "pointer", borderBottom: "1px solid gray", paddingBottom: "8px" }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: "18px", textTransform: "capitalize" }}>{e.title}</div>
                                            <div style={{ fontSize: "14px", color: "gray", fontWeight: "300", maxHeight: "40px", overflow: "hidden" }}>{e.description}</div>
                                        </div>
                                        <div className='blogImage' style={{ background: "red", height: "50px", aspectRatio: "16 / 9", borderRadius: "3px", overflow: "hidden" }}>
                                            <img src={e.banner?.url} alt="" style={{ height: "100%" }} />
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                        <div className='rightC' style={{ marginTop: "20px" }}>

                            <div style={{ backgroundColor: "black", color: "white", padding: "12px 15px", fontSize: "20px" }}>Related Blog</div>
                            {
                                blogs.map((e) => (
                                    <div key={e._id} onClick={() => navigate(`/blog/${e._id}`)} style={{ background: "white", padding: "5px 15px", display: "flex", alignItems: "center", cursor: "pointer", borderBottom: "1px solid gray", paddingBottom: "8px" }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: "18px", textTransform: "capitalize" }}>{e.title}</div>
                                            <div style={{ fontSize: "14px", color: "gray", fontWeight: "300", maxHeight: "40px", overflow: "hidden" }}>{e.description}</div>
                                        </div>
                                        <div style={{ background: "red", height: "50px", aspectRatio: "16 / 9", borderRadius: "3px", overflow: "hidden" }}>
                                            <img src={e.banner?.url} alt="" style={{ height: "100%" }} />
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                        <div className='rightC' style={{ marginTop: "20px" }}>
                            <div style={{ backgroundColor: "black", color: "white", padding: "12px 15px", fontSize: "20px" }}>Top Categories</div>
                            <div style={{ display: "flex", flexWrap: "wrap", backgroundColor: "white", padding: "20px", gap: "20px" }}>
                                <span>
                                    love relationship (1)
                                </span> <span>
                                    margie (1)
                                </span> <span>
                                    carrier (1)
                                </span> <span>
                                    horoscopy (1)
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogPage
