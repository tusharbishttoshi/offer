import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { GetBlogById } from '../../api/BlogReducer'

function EditPage() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { oneBlog } = useSelector((state) => state.blog)
    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")
    const [blog, setBlog] = useState({})
    const [body, setBody] = useState([])
    const [newBody, setNewBody] = useState([])
    const handleChange = (event, id) => {
        const { name, value } = event.target;
        setBody((prevBody) =>
            prevBody.map((e) => (e.id === id ? { ...e, [name]: value } : e))
        );
    };
    const handleNew = (event, i) => {
        const { name, value } = event.target;
        setNewBody((prevBody) =>
            prevBody.map((e, j) => (j === i ? { ...e, [name]: value } : e))
        );
    };
    useEffect(() => {
        oneBlog._id && setBody(oneBlog.body)
        oneBlog._id && setTitle(oneBlog.title)
        oneBlog._id && setDescription(oneBlog.description)
    }, [oneBlog])
    useEffect(() => {
        dispatch(GetBlogById({ id }))
    }, [dispatch])
    return (
        <>{
            oneBlog?._id && <div style={{ width: "100vw", backgroundColor: "var(--bg-yellow)" }}>
                <div className='container' style={{ display: "flex" }}>
                    <div className='leftb' style={{ flex: "1", overflow: "scroll", backgroundColor: "white" }}>
                        <div style={{ width: "95%", margin: "auto", fontSize: "50px" }}>
                            <input style={{ width: "100%" }} type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div style={{ width: "95%", margin: "auto", fontSize: "20px" }}>
                            <textarea style={{ width: "100%", height: "200px" }} type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>

                        {
                            body?.map((e) => (<React.Fragment key={e._id}>
                                <div style={{ width: "95%", margin: "auto", fontSize: "30px", marginTop: "20px" }}>
                                    <input style={{ width: "100%" }} name='heading' type="text" value={e.heading} onChange={(event) => handleChange(event, e.id)} />

                                </div>
                                <div style={{ width: "95%", margin: "auto", fontSize: "18px", marginTop: "20px" }}>
                                    <textarea style={{ width: "100%", height: "200px" }} name='paragraph' type="text" value={e.paragraph} onChange={(event) => handleChange(event, e.id)} />

                                </div>
                            </React.Fragment>
                            ))
                        }
                        {
                            newBody?.map((e, i) => (<React.Fragment key={e._id}>
                                <div style={{ width: "95%", margin: "auto", fontSize: "30px", marginTop: "20px" }}>
                                    <input style={{ width: "100%" }} name='heading' type="text" value={e.heading} onChange={(event) => handleNew(event, i)} />

                                </div>
                                <div style={{ width: "95%", margin: "auto", fontSize: "18px", marginTop: "20px" }}>
                                    <textarea style={{ width: "100%", height: "200px" }} name='paragraph' type="text" value={e.paragraph} onChange={(event) => handleNew(event, i)} />

                                </div>
                            </React.Fragment>
                            ))
                        }
                    </div>
                    <div className='rightb' style={{ width: "300px", backgroundColor: "var(--bg-yellow)" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>

                            {
                                body?.map((e, i) => (<React.Fragment key={e._id}>
                                    <div onClick={() => {
                                        setBody((prevBody) => prevBody.filter((i) => i._id !== e._id));
                                    }} style={{ height: "80px", width: "80px", border: "1px solid gray", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px", cursor: "pointer", backgroundColor: "white" }}>{i + 1}</div>
                                </React.Fragment>
                                ))
                            }
                        </div>
                        <p>New Body</p>
                        <div onClick={() => setNewBody([...newBody, { heading: "", paragraph: "" }])}>Add new para and heading</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>

                            {
                                newBody?.map((e, i) => (<React.Fragment key={e._id}>
                                    <div onClick={() => {
                                        setNewBody((prevBody) => prevBody.filter((j, n) => n !== i));
                                    }} style={{ height: "80px", width: "80px", border: "1px solid gray", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px", cursor: "pointer", backgroundColor: "white" }}>{i + 1}</div>
                                </React.Fragment>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        }

        </>
    )
}

export default EditPage
