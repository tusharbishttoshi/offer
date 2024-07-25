import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./ProtectedRoutes.module.css";
import {
  FaAngleDoubleLeft,
  FaPlay,
  FaAngleDoubleRight,
  FaAngleDown,
  FaAngleRight,
} from "react-icons/fa";
import { MdMessage, MdOutlineEmail } from "react-icons/md";
import { IoMdWalk } from "react-icons/io";
import { HiLogout } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import Login from "../../pages/LoginPage/Login";
import { useNavigate } from "react-router-dom";
import { ModelClose, StartWork, StopWork } from "../../api/useReducer";
import style from "../../components/ProtectedRoutes/NavBar.module.css";
import { useEffect } from "react";
import NavBar from "./NavBar";
function ProtectedRoutes({ children,socketRef }) {
  let AstroToken = localStorage.getItem("AstroToken");
  const { astro, successModel } = useSelector((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);
  const [subRoutesName, setSubRoutesName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    successModel &&
      setTimeout(() => {
        dispatch(ModelClose());
      }, 3000);
  }, [successModel]);

  if (!AstroToken) {
    return <Login />;
  }

  console.log({ successModel });

  return (
    <>
      {successModel && (
        <div
          style={{
            height: "100px",
            width: "500px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            background: "green",
            right: "0",
            left: "0",
            margin: "auto",
            borderRadius: "10px",
          }}
        >
          <p style={{ fontWeight: "700", color: "white", fontSize: "20px" }}>
            Successfully login
          </p>
        </div>
      )}

      {AstroToken && astro?._id && (
        <div className={styles.wrapper}>
          <div className={styles.sideBar}>
            
            <div className={`styles.top d-flex flex-column `} style={{height:"200px",zIndex:"2"}} >

              <div  className="d-flex align-items-baseline justify-content-around">
                <h1 style={{ fontSize: "20px" }}>WELCOME</h1>
                <div className={styles.topIcon}>
                  {isOpen ? (
                    <FaAngleDoubleRight className={styles.topIcons} />
                  ) : (
                    <FaAngleDoubleLeft className={styles.topIcons} />
                  )}
                </div>
              </div>

              <div
                onClick={() => navigate("/#profile")}
                style={{
                  color: "black",
                  textDecoration: "none",
                  width: "95%",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  borderRadius: "6px",
                  margin: "auto",
                 backgroundColor: "#f8f6f2",
                  padding: "10px",
                  borderBottom: '1px solid white'
                }}
              >
                <div
                  style={{
                    height: "50px",
                    aspectRatio: "1",
                    borderRadius: "50%",
                    background: "red",
                  }}
                >
                  <img
                    src={astro?.avatar?.url}
                    alt=""
                    style={{ width: "100%", height: "100%",  borderRadius: "50%", }}
                  />
                </div>
                <div>
                  <p  className="mb-0">{astro?.name}</p>
                  <p  className="mb-0">
                    ${parseFloat(astro?.balance?.toFixed(2))}
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.routesContainer} style={{ gap: "15px" ,height: 'calc(100% - 200px)' ,overflowY:"auto"}}>
              <div
                className="d-flex flex-column justify-content-center"
                style={{ width: "100%", gap: "1rem" }}
              >
                <div
                  onClick={() => navigate("/")}
                  style={{
                    width: "95%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: "6px",
                    margin: "auto",
                   backgroundColor: "#f8f6f2",
                    padding: "10px",
                    color: "black",
                    textDecoration: "none",
                    fontWeight: "700",
                  }}
                >
                  <span>Dashboard</span>
                  <FaAngleRight size={20} />
                </div>
                {/* {
              !astro.isOnline ? <>
                <div className={style.workButton} style={{ width: "95%", margin: "auto", backgroundColor: "green" }} onClick={() => dispatch(StartWork({ id: astro._id }))}>
                  <FaPlay color='white' />
                  <p className={style.workText}>start work</p>

                </div>
              </> : <div className={style.workButton} style={{ width: "95%", margin: "auto", }} onClick={() => dispatch(StopWork({ id: astro._id }))}><div className={style.d}  >
              </div>
                <p className={style.workText}>Stop work</p>
              </div>
            } */}
                <div
                  onClick={() => navigate("/workflow")}
                  style={{
                    width: "95%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: "6px",
                    margin: "auto",
                   backgroundColor: "#f8f6f2",
                    padding: "10px",
                    color: "black",
                    textDecoration: "none",
                    fontWeight: "700",
                  }}
                >
                  <span>Workflow</span>
                  <FaAngleRight size={20} />
                </div>
                <div
                  onClick={() => navigate("/my-client")}
                  style={{
                    width: "95%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: "6px",
                    margin: "auto",
                   backgroundColor: "#f8f6f2",
                    padding: "10px",
                    color: "black",
                    textDecoration: "none",
                    fontWeight: "700",
                  }}
                >
                  <span>My client</span>
                  <FaAngleRight size={20} />
                </div>
                <div
                  onClick={() => navigate("/Transition")}
                  style={{
                    width: "95%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: "6px",
                    margin: "auto",
                   backgroundColor: "#f8f6f2",
                    padding: "10px",
                    color: "black",
                    textDecoration: "none",
                    fontWeight: "700",
                  }}
                >
                  <span>Transaction</span>
                  <FaAngleRight size={20} />
                </div>
                <div
                  onClick={() => navigate("/rejected")}
                  style={{
                    width: "95%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: "6px",
                    margin: "auto",
                   backgroundColor: "#f8f6f2",
                    padding: "10px",
                    color: "black",
                    textDecoration: "none",
                    fontWeight: "700",
                  }}
                >
                  <span>Rejected</span>
                  <FaAngleRight size={20} />
                </div>
                <div
                  onClick={() => navigate("/review")}
                  style={{
                    width: "95%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: "6px",
                    margin: "auto",
                   backgroundColor: "#f8f6f2",
                    padding: "10px",
                    color: "black",
                    textDecoration: "none",
                    fontWeight: "700",
                  }}
                >
                  <span>Reviews</span>
                  <FaAngleRight size={20} />
                </div>
                <div
                  onClick={() => navigate("/invoice")}
                  style={{
                    width: "95%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: "6px",
                    margin: "auto",
                   backgroundColor: "#f8f6f2",
                    padding: "10px",
                    color: "black",
                    textDecoration: "none",
                    fontWeight: "700",
                  }}
                >
                  <span>invoice</span>
                  <FaAngleRight size={20} />
                </div>
                <div
                  onClick={() => navigate("/user-activity")}
                  style={{
                    width: "95%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: "6px",
                    margin: "auto",
                   backgroundColor: "#f8f6f2",
                    padding: "10px",
                    color: "black",
                    textDecoration: "none",
                    fontWeight: "700",
                  }}
                >
                  <span>User Activity</span>
                  <FaAngleRight size={20} />
                </div>
              </div>

              {/* <div onClick={() => {
              localStorage.removeItem("token")
              window.location.reload();
            }} style = {{ width: "95%", display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: "6px", margin: "auto",backgroundColor: "#f8f6f2", padding: "10px", color: "black", textDecoration: "none", fontWeight: "700" }}><span>Log Out</span>
            <IoMdWalk size={20} />
          </div> */}
            </div>

          </div>

          <div
            style={{
              width: "100%",
              // minHeight: "100%",
              background:"white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              overflowY:'auto'
            }}
          >
            <NavBar socketRef={socketRef} />
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default ProtectedRoutes;
