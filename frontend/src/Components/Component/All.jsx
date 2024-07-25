import React, { useEffect } from "react";
import "./nav.css";
import android from "../../images/download/GooglePlay.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  BsInstagram,
  BsLinkedin,
  BsThreeDotsVertical,
  BsYoutube,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { FaXmark, FaBars } from "react-icons/fa6";
import { RemoveRequest, cancelRequest } from "../../api/ChatRequestReducer";
export const NavBar = () => {
  const { user } = useSelector((state) => state.userLog);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflowY = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isOpen]);
  return (
    <>
      <header
        className="fullWidth"
        style={{
          backgroundColor: "#F5B041",
          position: "sticky",
          top: "0px",
          zIndex: "9999",
        }}
      >
        <nav className="container nav">
          <div style={{ height: "70px" }}>
            <Link to="/search" className="navLogo">
              <div
                className="logoXR"
                // style={{ height: "70px", overflow: "hidden" }}
              >
                <img
                  src="/UnzipLogo.jpeg"
                  className="img-fluid rounded-circle"
                  alt="Your Image"
                  style={{
                    width: "60px",
                    height: "50px",
                    marginLeft: "-28%",
                    marginTop: '13px',
                  }}
                />
              </div>
            </Link>
          </div>

          <div className={isOpen ? "navCenter open" : "navCenter close"}>
            <div
              className={isOpen ? "navLeft open" : "navLeft close"}
              style={{
                justifyContent: "space-between",
                display: "flex",
                width: "100%",
              }}
            >
              <div style={{ height: "50px", overflow: "hidden" }}>
                <img
                  src="/UnzipLogo.jpeg"
                  style={{ height: "100%", width: "auto" }}
                  alt=""
                />
              </div>
              <FaXmark
                size={30}
                className="barIcon"
                onClick={() => setIsOpen(false)}
              />
            </div>
            {!user?._id && (
              <div>
                <div
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/");
                  }}
                  style={{
                    color: "#212f3d",
                    fontSize: "1.3rem",
                    fontWeight: "500",
                  }}
                >
                  Home
                </div>
              </div>
            )}
            <div>
              <div
                onClick={() => {
                  setIsOpen(false);
                  navigate(
                    user?._id ? `/profile/${user?._id}` : "/auth?login=true"
                  );
                }}
                style={{
                  color: "#212f3d",
                  fontSize: "1.3rem",
                  fontWeight: "500",
                }}
              >
                Profile
              </div>
            </div>

            <div>
              <div
                onClick={() => {
                  setIsOpen(false);
                  navigate(user?._id ? "/search" : "/auth?login=true");
                }}
                style={{
                  color: "#212f3d",
                  fontSize: "1.3rem",
                  fontWeight: "500",
                }}
              >
                Chat with Astrologer
              </div>
            </div>
            {user?._id && (
              <div>
                <div
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/horoscopy");
                  }}
                  style={{
                    color: "#212f3d",
                    fontSize: "1.3rem",
                    fontWeight: "500",
                  }}
                >
                  My Horoscope
                </div>
              </div>
            )}
          </div>
          {isOpen && (
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                height: "100vh",
                width: "100vw",
                background: "#212f3d4f",
                zIndex: "20",
              }}
            ></div>
          )}
          <div
            className="navBtnBox"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div className="navCenter right" style={{ gap: "25px" }}>
              {!user?._id && (
                <div>
                  <div
                    onClick={() => {
                      navigate("/");
                    }}
                    style={{
                      color: "#212f3d",
                      fontSize: "1.3rem",
                      fontWeight: "500",
                    }}
                  >
                    Home
                  </div>
                </div>
              )}
              <div>
                <div
                  onClick={() => {
                    navigate(user?._id ? "/search" : "/auth?login=true");
                  }}
                  style={{
                    color: "#212f3d",
                    fontSize: "1.3rem",
                    fontWeight: "500",
                  }}
                >
                  Chat with Astrologer{" "}
                </div>
              </div>
              {user?._id && (
                <div>
                  <div
                    onClick={() => {
                      navigate("/horoscopy");
                    }}
                    style={{
                      color: "#212f3d",
                      fontSize: "1.3rem",
                      fontWeight: "500",
                    }}
                  >
                    My Horoscope
                  </div>
                </div>
              )}
              {user?._id && (
                <div>
                  <div
                    onClick={() => {
                      navigate(`/profile/${user?._id}`);
                    }}
                    style={{
                      color: "#212f3d",
                      fontSize: "1.3rem",
                      fontWeight: "500",
                    }}
                  >
                    profile
                  </div>
                </div>
              )}
            </div>

            {user?._id ? (
              <>
                {/* <div ><NavLink to={`/profile/${user?._id}`} style={{ color: "white", fontSize: "1.3rem", fontWeight: "500" }} >Profile</NavLink></div> */}
                <FaBars
                  size={30}
                  className="barIcon"
                  onClick={() => setIsOpen(true)}
                />
              </>
            ) : (
              ""
              // <>
              //   <div className="navBtn navLogin">
              //     <NavLink
              //       style={{
              //         color: "white",
              //         fontSize: "1.3rem",
              //         fontWeight: "500",
              //       }}
              //       to="/auth?login=true"
              //     >
              //       Login
              //     </NavLink>
              //   </div>
              //   <FaBars
              //     size={30}
              //     className="barIcon"
              //     onClick={() => setIsOpen(true)}
              //   />
              //   <div className="navBtn navSingin">
              //     <NavLink
              //       style={{
              //         color: "var(--white)",
              //         fontSize: "1.3rem",
              //         fontWeight: "500",
              //         background: "var(--dark)",
              //         borderRadius: "10px",
              //       }}
              //       to="/astro-form"
              //     >
              //       Work with Us
              //     </NavLink>
              //   </div>
              // </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export const RequestForAstrologer = ({ socketRef }) => {
  const dispatch = useDispatch();
  const { AstroRequest } = useSelector((state) => state.astroRequest);
  const { user } = useSelector((state) => state.userLog);

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval;

    if (AstroRequest?.length > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setSeconds(0); // Reset the timer when AstroRequest becomes empty
    }

    return () => clearInterval(interval);
  }, [AstroRequest]);

  return (
    <>
      {AstroRequest?.length > 0 && (
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
            position: "fixed",
            top: "0px",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: "8",
          }}
        >
          <div
            style={{
              maxWidth: "460px",
              width: "96%",
              background: "var(--yellow)",
              borderRadius: "10px",
            }}
          >
            {AstroRequest.map((e) => (
              <div
                key={e._id}
                style={{
                  cursor: "pointer",
                  position: "relative",
                  width: "100%",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  padding: "10px 20px",
                }}
              >
                <div
                  style={{
                    height: "100px",
                    aspectRatio: "1",
                    background: "blue",
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={e?.avatar?.url}
                    style={{ width: "100%", height: "100%" }}
                    alt=""
                  />
                </div>
                <div>
                  <p
                    style={{
                      textTransform: "capitalize",
                      fontSize: "2rem",
                      fontWeight: "500",
                    }}
                  >
                    {e?.name}
                  </p>
                  <p
                    style={{ textTransform: "capitalize", fontSize: "1.2rem" }}
                  >
                    Wait for astrologer response....
                  </p>
                </div>
                <div
                  onClick={() => {
                    socketRef.current?.emit("cancelRequest", {
                      astrologer: e._id,
                      user: user?._id,
                      reason: "User Reject chat ",
                    });
                    dispatch(RemoveRequest(e._id));
                    dispatch(
                      cancelRequest({
                        astrologer: e._id,
                        user: user?._id,
                        reason: "User Reject chat ",
                        time: seconds,
                      })
                    );
                  }}
                  style={{
                    position: "absolute",
                    right: "20px",
                    background: "var(--yellow)",
                    borderRadius: "50%",
                    aspectRatio: "1",
                    height: "30px",
                    padding: "2px 0px 0px 3px ",
                  }}
                >
                  <FaXmark size={25} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export const Footer = () => {
  return (
    <>
      <div className="wapper" style={{ backgroundColor: "var(--dark-blue)" }}>
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            padding: "40px 20px",
          }}
        >
          <div
            className="navLeft"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1 className="navLogo">couPens</h1>
            <p style={{ color: "var(--white)" }}>CopyRight © 2023 Coupens</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <p
              style={{
                fontSize: "22px",
                fontWeight: "900",
                color: "var(--red)",
              }}
            >
              COMPANY
            </p>
            <ul
              style={{
                padding: "20px 0",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <li style={{ cursor: "pointer", color: "var(--white)" }}>
                About
              </li>
              <li style={{ cursor: "pointer", color: "var(--white)" }}>
                Career
              </li>
              <li style={{ cursor: "pointer", color: "var(--white)" }}>Blog</li>
              <li style={{ cursor: "pointer", color: "var(--white)" }}>
                Privacy Policy
              </li>
            </ul>
          </div>
          <div>
            <p
              style={{
                fontSize: "22px",
                fontWeight: "900",
                color: "var(--red)",
              }}
            >
              Discover
            </p>
            <ul
              style={{
                padding: "20px 0",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <li style={{ cursor: "pointer", color: "var(--white)" }}>
                Become a Worker
              </li>
              <li style={{ cursor: "pointer", color: "var(--white)" }}>
                All Services
              </li>
              <li style={{ cursor: "pointer", color: "var(--white)" }}>
                Elite Worker
              </li>
              <li style={{ cursor: "pointer", color: "var(--white)" }}>Help</li>
            </ul>
          </div>
          <div>
            <p
              style={{
                fontSize: "22px",
                fontWeight: "900",
                color: "var(--red)",
              }}
            >
              Follow Us
            </p>
            <div style={{ display: "flex", gap: "30px", padding: "20px 0" }}>
              <BsYoutube
                size={30}
                style={{ color: "var(--white)", cursor: "pointer" }}
              />
              <BsLinkedin
                size={30}
                style={{ color: "var(--white)", cursor: "pointer" }}
              />
              <BsInstagram
                size={30}
                style={{ color: "var(--white)", cursor: "pointer" }}
              />
            </div>
          </div>
          <div>
            <p
              style={{
                fontSize: "22px",
                fontWeight: "900",
                color: "var(--red)",
              }}
            >
              Download Our App
            </p>
            <div
              style={{
                display: "flex",
                gap: "0px",
                padding: "20px 0",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Link to="/">
                {" "}
                <img style={{ width: "180px" }} src={android} alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
// export const ReportToll = ({ name, id }) => {
//     const [reportPage, setReportPage] = useState(false)
//     const [report, setReport] = useState("")
//     const dispatch = useDispatch()
//     return (
//         <>
//             <BsThreeDotsVertical size={23} style={{ marginTop: "10px", cursor: "pointer" }} onClick={() => setReportPage(true)} />
//             {
//                 reportPage &&
//                 <div style={{ position: "absolute", top: "0px", left: "0px", height: "100vh", width: "100vw", backgroundColor: "#212f3d4f", display: "flex", alignItems: "center", justifyContent: "center", }}>
//                     <div style={{ position: "relative", backgroundColor: "var(--red)", width: "600px", borderRadius: "4px", padding: '40px 30px', display: "flex", flexDirection: "column" }}>
//                         <h3 style={{ fontWeight: "500", fontSize: '25px', color: "var(--dark-blue)" }}>Speak Up, Report {name}, Foster a Safer Community.</h3>
//                         <label htmlFor="Reason" style={{ margin: "15px 0px" }}>Why You Report?</label>
//                         <input type="text" name="report" value={report} onChange={(e) => setReport(e.target.value)} id="Reason" style={{ outline: "none", border: "none", padding: "8px 15px", fontSize: "18px", borderRadius: "3px" }} />
//                         <div style={{ display: "flex", justifyContent: "flex-end", gap: "20px", marginTop: "20px" }}>
//                             <button style={{ cursor: "pointer", outline: "none", border: "none", padding: "8px 15px", fontSize: "18px", backgroundColor: "var(--white)", borderRadius: "3px" }} onClick={() => setReportPage(false)}>Cancel</button>
//                             <button style={{ cursor: "pointer", outline: "none", border: "none", padding: "8px 15px", fontSize: "18px", backgroundColor: "var(--dark-blue)", color: "var(--white)", borderRadius: "3px" }} onClick={(e) => {
//                                 e.preventDefault()
//                                 if (report.length > 10) {
//                                     dispatch(reportUser({ id, report, name })).then((e) => {
//                                         alert("Report Successfully submitted")
//                                         setReport("")
//                                         setReportPage(false)
//                                     }).catch((e) => alert("e"))
//                                 }
//                             }}>Report</button>
//                         </div>
//                     </div>
//                 </div>
//             }
//         </>
//     )
// }
