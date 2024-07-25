import React, { useEffect, useState } from 'react'
import "../css/rolePage.css"
import { LuSearch } from "react-icons/lu"
import { BiBookmarkAlt } from 'react-icons/bi';
import { BsArrowLeftShort } from 'react-icons/bs';
import { BiCommentEdit } from 'react-icons/bi';
import { AiFillEye } from 'react-icons/ai';
import { AddRole, DeleteRole, GetRole, UpdateRole } from '../api/Role';
import { useDispatch, useSelector } from 'react-redux'

const permission = [
    { name: "dashboard", value: ["dashboard"] },
    { name: "role create", value: ["roll create", "dashboard", "roll view"] },
    { name: "role view", value: ["roll view", "dashboard"] },
    { name: "role update", value: ["roll update", "dashboard", "roll view"] },
    { name: "role delete", value: ["roll delete", "dashboard", "roll view"] },
    { name: "category create", value: ["category create", "dashboard", "category view"] },
    { name: "category view", value: ["category view", "dashboard"] },
    { name: "category update", value: ["category update", "dashboard", "category view"] },
    { name: "category delete", value: ["category deleted", "ashboard,category view"] },

    { name: "view blog", value: ["view blog", "dashboard "] },
    { name: "blog approve", value: ["view blog", "dashboard", " blog approve"] },
    { name: "user view", value: ["user view", "dashboard"] },
    { name: "user ban", value: ["user ban", "dashboard", "user view"] },
    { name: "approve astrologer", value: ["approve astrologer", "dashboard", " view request astrologers"] },
    { name: "view astrologers", value: ["view astrologers", "dashboard"] },
    { name: "admin user create", value: ["admin user create", "dashboard"] },
    { name: "admin user view", value: ["admin user view", "dashboard"] },
    { name: "admin user update", value: ["admin user update", "dashboard"] },
    { name: "admin user delete", value: ["admin user delete", "dashboard"] },
]
function RolePage() {
    const [page, setPage] = useState("")
    const [role, setRole] = useState("")
    const [rollPermission, setRollPermission] = useState({ permissions: [] })
    const [roleObject, setRoleObject] = useState([])
    const { permissions } = rollPermission
    const [roleSearch, setRoleSearch] = useState("")
    const [viewPermission, setViewPermission] = useState("")
    const [pageValue, setPageValue] = useState(0)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     const handleKeyDown = (event) => {
    //         if (event.key === "A") {
    //             filterRoles?.forEach(element => {
    //                 console.log(element._id)
    //                 setRoleObject([...roleObject, element._id]);
    //             });
    //         }
    //     };

    //     document.addEventListener('keydown', handleKeyDown);

    //     return () => {
    //         document.removeEventListener('keydown', handleKeyDown);
    //     };
    // }, []);
    const handlePermission = (e) => {
        const { value, checked } = e.target

        if (checked) {
            setRollPermission({
                permissions: [...permissions, ...value],
            });
        }
        else {
            const resultArray = [];
            const removedItems = {};
            for (const item of permissions) {
                if (!value.includes(item) || removedItems[item]) {
                    resultArray.push(item);
                } else {
                    removedItems[item] = true;
                }
            }
            setRollPermission({ permissions: [...resultArray] });
        }
    }
    
    const handleRoleSelect = (e) => {
        const { value } = e.target
        const a = roleObject.includes(value)
        if (!a) {
            setRoleObject([...roleObject, value]);
        }
        else {
            const resultArray = [];
            const removedItems = {};
            const filteredArray = roleObject.filter(element => element !== value);
            setRoleObject([...filteredArray]);
        }
    }
    const { roles } = useSelector((state) => state.roleReducer)
    const { adminUser } = useSelector((state) => state.adminUserReducer)
    let filterRoles = roles.filter((e) => e.role.toLowerCase().includes(roleSearch.toLowerCase()))
    // const tab = Math.ceil(roles.length / 6)
    // const threeHeaders = Array.from({ length: tab }, (_, index) => {
    //     return <div style={{ border: "2px solid gray", aspectRatio: "1", width: "40px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", fontWeight: "500" }}> {index + 1}</div>;
    // });
    const [editPermissions, setEditPermissions] = useState("")
    useEffect(() => {
        dispatch(GetRole())
    }, [])
    return (
        <>
            <div className='role' style={{ height: "100vh", overflow: "hidden", display: "flex", flex: "1" }}>
                <div className='roleContainer' style={{ overflowY: "hidden" }}>
                    {
                        page === "create" ? <>
                            <div className='roleTop'>
                                <BsArrowLeftShort size={40} style={{ cursor: "pointer" }} onClick={() => setPage("s")} />
                                <div className='roleTopLeft'>Role Create</div>
                            </div>
                            <div className='roleTableContainer'>
                                <div className='roleNav create'>
                                    <div className='roleSearch'><BiBookmarkAlt size={30} /><input type="text" value={role} onChange={(e) => setRole(e.target.value)} /></div>
                                    <div className='btn roleCreateBtn' onClick={() => {
                                        const a = window.confirm("are you sure to create new role")
                                        const uniqueArray = [];
                                        if (a) {
                                            permissions.forEach((e) => {
                                                if (!uniqueArray.includes(e)) {
                                                    uniqueArray.push(e);
                                                }
                                            })
                                            dispatch(AddRole({ role, permissions: uniqueArray, userId: adminUser._id })).then((e) => {
                                                const a = []
                                                setRollPermission({ permissions: [...a] })
                                                setRole("")
                                                console.log(e.payload)
                                            })
                                        }
                                    }}>Create</div>
                                </div>
                                <div style={{ padding: "5px 20px", }}>
                                    <p style={{ margin: "10px 0px", color: "red", fontWeight: "700", fontSize: "20px" }}>Please select at-least one</p>
                                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", }}>
                                        {
                                            permission.map((p, i) => (
                                                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "center", height: "50px", width: "25%", minWidth: "200px" }}>
                                                    <input type="checkbox" onClick={handlePermission} name={p.name} id={p.name} value={p.value} />
                                                    <label style={{ fontSize: "18px" }} htmlFor={p.name}>{p.name}</label>
                                                </div>
                                            ))
                                        }

                                    </div>
                                </div>
                            </div>

                        </> : <>
                            <div className='roleTop' style={{ display: "flex", justifyContent: "space-between" }}>
                                <div className='roleTopLeft'>Role Management</div>
                                <div className='btn roleCreateBtn' onClick={() => setPage("create")}>Create Role</div>
                            </div>
                            <div className='roleTableContainer' style={{ overflow: "scroll", position: "relative" }}>
                                <div className='roleNav'>
                                    <div className='roleSearch'><LuSearch size={30} /><input type="text" value={roleSearch} onChange={(e) => setRoleSearch(e.target.value)} /></div>

                                </div>
                                <table style={{ marginBottom: "50px" }}>
                                    <thead style={{ position: "sticky", top: "0px" }}>
                                        <tr>
                                            <td style={{ width: "20px" }}><input type="checkbox" name="" id="" /></td>
                                            <td>Role</td>
                                            <td>Permission</td>
                                            <td>Created by</td>
                                            <td style={{ width: "50px" }}>Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filterRoles?.map((r) => (
                                                <tr key={r._id}>
                                                    <td><input type="checkbox" name="" id="" onClick={handleRoleSelect} value={r._id} checked={roleObject.includes(r._id)} /></td>
                                                    <td style={{ width: "150px" }}>{r.role}</td>
                                                    <td style={{ display: "flex", minWidth: "400px", height: "100%", flexWrap: "wrap", columnGap: "20px", height: "auto", overflowY: "hidden", alignItems: "center" }}>
                                                        {
                                                            r.permissions?.map((p, i) => <div key={i} style={{ display: "flex", gap: "10px", alignItems: "center", height: "50px", }}>
                                                                <label style={{ fontSize: "18px" }} htmlFor={p.name}>{p}</label>
                                                            </div>)
                                                        }

                                                        <div style={{ zIndex: "20px", backgroundColor: "var(--yellow)", right: "0", top: "50%", display: "flex", alignItems: "center", gap: "10px" }}>

                                                            <BiCommentEdit size={25} style={{ cursor: "pointer" }} onClick={() => setEditPermissions(r._id)} />
                                                            {/* <AiFillEye size={25} style={{ cursor: "pointer" }} onClick={() => setViewPermission(r._id)} /> */}
                                                            {/*  */}
                                                        </div>

                                                    </td>
                                                    <td style={{ width: "200px" }}>{r?.userId?.email}</td>
                                                    <td><img width="40" height="40" src="https://img.icons8.com/plasticine/40/filled-trash.png" alt="filled-trash" style={{ cursor: "pointer" }} onClick={() => {
                                                        const s = window.confirm(`are you sure you want to delete ${r.role}`)
                                                        s && dispatch(DeleteRole({ id: r._id })).then((e) => console.log(e.payload))
                                                    }} /></td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>


                            </div>
                        </>
                    }

                </div>
            </div>
            {
                editPermissions &&
                <div style={{ height: "100vh", width: "100vw", backgroundColor: "rgba(0, 0, 0, .5)", position: "absolute", top: "0", left: "0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "540px", backgroundColor: "var(--yellow)", padding: "20px", borderRadius: "10px" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", columnGap: "20px" }} >
                            {
                                permission.map((p, i) => <><P p={p} i={i} handlePermission={handlePermission} setRollPermission={setRollPermission} permissions={permissions} roles={filterRoles} editPermissions={editPermissions} /></>)
                            }
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", padding: "20px 10px 10px 10px" }}>
                            <div className='btn roleCreateBtn' onClick={() => setEditPermissions("")}>Cancel</div>
                            <div className='btn roleCreateBtn' style={{ backgroundColor: "var(--cta-yellow)" }} onClick={() => {
                                const a = window.confirm("permissions update")
                                const uniqueArray = [];
                                if (a) {
                                    permissions.forEach((e) => {
                                        if (!uniqueArray.includes(e)) {
                                            uniqueArray.push(e);
                                        }
                                    })
                                    dispatch(UpdateRole({ permissions: uniqueArray, Id: editPermissions })).then((e) => {
                                        const a = []
                                        setRollPermission({ permissions: [...a] })
                                        setEditPermissions("")
                                    })
                                }
                            }}>done</div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
const P = ({ p, i, handlePermission, setRollPermission, permissions, roles, editPermissions }) => {
    const checkHandle = (value) => {
        const a = roles.find((e) => e._id === editPermissions)
        let b = value.map((e) => {
            return a.permissions.includes(e)
        })
        setRollPermission({
            permissions: [...permissions, ...a.permissions],
        });
        return b
    }
    const [c, setC] = useState(false)
    useEffect(() => {
        setC(checkHandle(p.value))
    }, [checkHandle, p.value])
    return (
        <>
            <div key={i} style={{ flex: "1", display: "flex", gap: "10px", alignItems: "center", height: "50px", minWidth: "48%" }}>
                <input type="checkbox" checked={c} onClick={handlePermission} name={p.name} id={p.name} value={p.value} />
                <label style={{ fontSize: "18px" }} htmlFor={p.name}>{p.name}</label>
            </div>
        </>
    )
}
export default RolePage
