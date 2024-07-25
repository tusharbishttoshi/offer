import React, { useEffect, useState } from 'react'
import { LuSearch } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import { AddCategory, DeleteCategory, GetCategory } from '../api/Category'

function CategoryPage() {
    const [isModel, setIsModel] = useState(false)
    const [category, setCategory] = useState("")
    const [categorySearch, setCategorySearch] = useState("")
    const dispatch = useDispatch()
    const { categories } = useSelector((state) => state.categoryReducer)
    const filterCategories = categories.filter((e) => e.category.toLowerCase().includes(categorySearch.toLocaleLowerCase()))
    useEffect(() => {
        dispatch(GetCategory())
    }, [])
    return (
        <>
            <div className='role' style={{ flex: "1", display: "flex" }}>
                <div className='roleContainer' style={{overflowY:"scroll", overflowX:"hidden", height:"calc(100vh - 95px)"}}>
                    <div className='roleTop'>
                        <div className='roleTopLeft'>Category Management</div>
                    </div>
                    <div className='roleTableContainer'>
                        <div className='roleNav'>

                            <div className='roleSearch'><LuSearch size={30} /><input type="text" value={categorySearch} onChange={(e) => setCategorySearch(e.target.value)} /></div>
                            <div className='btn roleCreateBtn' onClick={() => setIsModel(true)}>Add Category</div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <td>S.N.</td>
                                    <td>Category</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody >
                                {filterCategories?.map((e, i) => (
                                    <tr key={e._id}>
                                        <td>{i+1}.</td>
                                        <td>{e.category}</td>
                                        <td><img width="40" height="40" src="https://img.icons8.com/plasticine/40/filled-trash.png" alt="filled-trash" onClick={() => {
                                            const a = window.confirm(`delete ${e.category}`)
                                            a && dispatch(DeleteCategory({ id: e._id }))
                                        }} /></td>
                                    </tr>
                                ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {
                isModel && <>
                    <div style={{ height: "100vh", width: "100vw", backgroundColor: "rgba(0, 0, 0, .5)", position: "absolute", top: "0", left: "0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: "440px", backgroundColor: "var(--yellow)", padding: "20px", borderRadius: "10px" }}>
                            <div className='roleSearch' style={{ marginTop: "15px" }}><LuSearch size={30} /><input type="text" style={{ width: "100%" }} value={category} onChange={(e) => setCategory(e.target.value)} /></div>
                            <div style={{ display: "flex", justifyContent: "space-between", padding: "20px 10px 10px 10px" }}>
                                <div className='btn roleCreateBtn' onClick={() => setIsModel(false)}>Cancel</div>
                                <div className='btn roleCreateBtn' style={{ backgroundColor: "var(--cta-yellow)" }} onClick={() => dispatch(AddCategory({ category })).then((e) => {
                                    e.payload?.success && setIsModel(false)
                                    setCategory("")
                                })}>done</div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default CategoryPage
