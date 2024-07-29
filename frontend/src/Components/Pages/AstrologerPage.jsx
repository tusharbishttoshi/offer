import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Astrologer, offlineChat } from "../../api/userLogInReducer";
import { ClientChat } from "../../api/ChatRequestReducer";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Footer } from "../..";
import Navbar from "../Component/Navbar/Navbar";
// import { NavBar } from "../Component/All";

function AstrologerPage({ socketRef }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [astro, setAstro] = useState({});
  const { user, astrologer } = useSelector((state) => state.userLog);
  const { AstroRequest } = useSelector((state) => state.astroRequest);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(Astrologer({ id }));
  }, [id]);
  const [s, sets] = useState({});
  const [m, setM] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      window.scrollTo(0, 0);
    };
  }, []);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    astrologer._id &&
      setReviews(
        astrologer?.reviews?.filter((e) => e.comment || e.rating).slice(0, 8)
      );
  }, [astrologer]);
  const [more, setMore] = useState(false);
  return (
    <>
      {/* <NavBar /> */}
      <Navbar />

      {astrologer?._id && (
        <section className="primary-bg">
          <div className="container py-2">
            <div className="row">
              {/* <div className="col-12">
             <div class="d-flex justify-content-start mb-3">
            
                 <i onClick={() => navigate(-1)}  class="fas fa-arrow-left   fs-5 me-3"></i>
            
             </div>
           </div> */}
              <div className="col-lg-4">
                <div className="rounded bg-white mb-4">
                  <div
                    className="card-body text-center"
                    style={{ pointerEvents: "none" }}
                  >
                    <div
                      className="rounded-circle img-fluid"
                      style={{
                        width: 120,
                        height: 120,
                        backgroundImage: `url(${astrologer?.avatar?.url})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        display: "inline-block",
                        // border: '2px solid white',
                        // borderRadius: '50%',
                      }}
                    />
                    <h5 className="my-3">{astrologer?.name}</h5>

                    <p className="text-muted mb-0">
                      {astrologer.isOnline === "Online"
                        ? `$${astrologer?.chargePrise}Per Min`
                        : "$7 Per Question"}
                    </p>

                    <div className="d-flex justify-content-center mb-2">
                      {/* {astrologer?.isOnline === "Online" ? (
                     <button
                       type="button"
                       className="btn btn-success btn-rounded btn-sm"
                     >
                       Online
                     </button>
                   ) : astrologer?.isOnline === "Offline" ? (
                     <button
                       type="button"
                       className="btn btn-outline-dark astro_btn btn-rounded btn-sm"
                     >
                       Offline
                     </button>
                   ) : (
                     <button
                       type="button"
                       className="btn btn-outline-danger astro_btn btn-rounded btn-sm"
                     >
                       Busy
                     </button>
                   )} */}

                      <button
                        type="button"
                        onClick={() => {
                          if (user?.balance > 3 * astrologer?.chargePrise) {
                            if (astrologer.isOnline === "Online") {
                              const x = AstroRequest.find(
                                (i) => i._id === astrologer._id
                              );
                              if (!x) {
                                socketRef.current.emit("sendRequest", {
                                  astrologerId: astrologer._id,
                                  user,
                                });
                                dispatch(ClientChat(astrologer));
                              }
                            } else {
                              sets(astrologer);
                            }
                          } else if (user._id) {
                            navigate(`/profile/${user._id}/wallet?p=addmoney`);
                          } else {
                            navigate(`/auth?login=true`);
                          }
                        }}
                        className={`btn chat-radio w-50  ${
                          astrologer.isOnline == "Online"
                            ? "btn-success"
                            : "btn-warning"
                        }`}
                      >
                        {astrologer.isOnline === "Online" ? "Chat" : "Ask"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-8">
                <div className="rounded bg-white mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Full Name</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{astrologer?.name}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Rating</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {`(${
                            astrologer?.reviews?.filter((i) => i.rating)?.length
                          })`}{" "}
                          {parseFloat(
                            (
                              astrologer.reviews
                                ?.filter((i) => i.rating)
                                ?.reduce(
                                  (accumulator, currentValue) =>
                                    accumulator + currentValue.rating,
                                  0
                                ) /
                              astrologer?.reviews?.filter((i) => i.rating)
                                ?.length
                            )?.toFixed(1)
                          ) || 0}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Experience </p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {astrologer?.experience} Years
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Consultations</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {astrologer?.consultation}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Languages</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {astrologer?.languages?.map((Item) => (
                            <Link
                              to={`/astrologer/${Item?._id}`}
                              className="mx-1 my-2"
                            >
                              {Item} ,
                            </Link>
                          ))}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="rounded bg-white mb-4 mb-md-0">
                  <div className="card-body">
                    {/* <p className="my-3 as_heading fs-5">Languages</p>
                   {astrologer?.languages?.map((Item) => (
                     <Link
                       to={`/astrologer/${Item?._id}`}
                       className="mx-1 my-2"
                     >
                       {Item} ,
                     </Link>
                   ))} */}

                    <p className="my-3 as_heading fs-5">Expert in Status</p>
                    {astrologer?.category?.map((Item) => (
                      <Link
                        to={`/astrologer/${Item?._id}`}
                        className="mx-1 my-2"
                      >
                        {Item},
                      </Link>
                    ))}

                    <p className="my-3 as_heading fs-5">Consultant for </p>
                    <div className="d-flex flex-wrap">
                      {astrologer?.spirituality?.map((Item) => (
                        <Link
                          to={`/astrologer/${Item?._id}`}
                          className="mx-1 my-2"
                        >
                          {Item},
                        </Link>
                      ))}
                    </div>
                    <p className="my-3 as_heading fs-5">Bio</p>
                    <div className="col-sm-12">
                      <p className="text-muted mb-0">{astrologer?.bio}</p>
                    </div>

                    <p className="my-4 fs-3 as_heading">Review by Clients</p>
                    {reviews?.map((e) => (
                      <>
                        <div
                          className="seconde_bg"
                          style={{
                            // background: "var(--cta-white)",
                            padding: "7px 15px",
                            borderRadius: "6px",
                            borderBottom: "1px solid white",
                          }}
                        >
                          <p
                            style={{
                              textTransform: "capitalize",
                              fontSize: "22px",
                              fontWeight: "600",
                            }}
                          >
                            {e?.user?.name}
                          </p>
                          <div>
                            <Star rating={e?.rating} />
                          </div>
                          {e?.comment}
                        </div>
                      </>
                    ))}
                    {!more && astrologer?.reviews?.length > 8 && (
                      <div
                        onClick={() => {
                          setMore(true);
                          setReviews(
                            astrologer?.reviews?.filter(
                              (e) => e.comment || e.rating
                            )
                          );
                        }}
                        style={{
                          backgroundColor: "#F8C471",
                          padding: "20px",
                          textAlign: "center",
                          cursor: "pointer",
                          color: "white",
                        }}
                      >
                        View More
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {s._id && (
        <>
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
                padding: "20px",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  fontWeight: "500",
                  fontSize: "20px",
                }}
              >
                Offline Message{" "}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontWeight: "600", fontWeight: "18px" }}>
                  {s.name}
                </span>
                <span style={{ fontWeight: "600", fontWeight: "18px" }}>
                  $7/Message
                </span>
              </div>
              <div
                style={{
                  background: "white",
                  marginTop: "5px",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <label htmlFor="m" style={{}}>
                  message
                </label>
                <textarea
                  rows={10}
                  type="text"
                  id="m"
                  style={{
                    border: "1px solid gray",
                    outline: "none",
                    height: "auto",
                    padding: "3px 10px",
                    borderRadius: "6px",
                    fontWeight: "500",
                  }}
                  value={m}
                  onChange={(e) => setM(e.target.value)}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <div
                  style={{
                    border: "2px solid var(--dark)",
                    borderRadius: "6px",
                    padding: "6px 20px",
                    cursor: "pointer",
                  }}
                  onClick={() => sets({})}
                >
                  Cancel
                </div>
                <div
                  style={{
                    background: "var(--dark)",
                    color: "var(--white)",
                    textAlign: "center",
                    borderRadius: "6px",
                    padding: "6px 20px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (user.balance > 7) {
                      dispatch(
                        offlineChat({
                          astroId: s._id,
                          myId: user._id,
                          content: m,
                        })
                      )
                        .then((e) => {
                          if (e.payload.success) {
                            setM("");
                            alert("your message send successfully");
                          }
                        })
                        .then((e) => console.log(e));
                      sets({});
                    } else {
                      navigate(`/profile/${user._id}/wallet?p=addmoney`);
                    }
                  }}
                >
                  Send
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
}
export const Star = ({ rating }) => {
  return (
    <>
      {[...Array(5)].map((e, i) => {
        return <>{i + 1 > rating ? <FaRegStar /> : <FaStar />}</>;
      })}
    </>
  );
};
export default AstrologerPage;

// {astrologer?._id && (
//   <div style={{ width: "100vw", backgroundColor: "var(--white)" }}>
//     <div className="container" style={{ padding: "0" }}>
//       <div
//         style={{
//           width: "100%",
//           display: "flex",
//           flexWrap: "wrap",
//           backgroundColor: "var(--bg-white)",
//           padding: "20px",
//           alignItems: "center",
//           gap: "5%",
//         }}
//       >
//         <div
//           style={{
//             width: "20%",
//             aspectRatio: "1",
//             borderRadius: "50%",
//             backgroundColor: "red",
//             overflow: "hidden",
//           }}
//         >
//           <img
//             src={astrologer?.avatar?.url}
//             alt=""
//             style={{ width: "100%", height: "100%", objectFit: "cover" }}
//           />
//         </div>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "5px",
//             flex: "1",
//           }}
//         >
//           <div
//             style={{
//               fontSize: "25px",
//               textTransform: "uppercase",
//               fontWeight: "500",
//             }}
//           >
//             {astrologer.name}{" "}
//             {astrologer.isOnline === "Online" ? (
//               <span
//                 style={{
//                   color: "green",
//                   textTransform: "lowercase",
//                   fontSize: "12px",
//                 }}
//               >
//                 online
//               </span>
//             ) : astrologer.isOnline === "Offline" ? (
//               <span
//                 style={{
//                   color: "gray",
//                   textTransform: "lowercase",
//                   fontSize: "12px",
//                 }}
//               >
//                 offline
//               </span>
//             ) : (
//               <span
//                 style={{
//                   color: "red",
//                   textTransform: "lowercase",
//                   fontSize: "12px",
//                 }}
//               >
//                 Busy
//               </span>
//             )}
//           </div>
//           <div
//             style={{
//               fontSize: "18px",
//               textTransform: "capitalize",
//               fontWeight: "500",
//             }}
//           >
//             Rating{" "}
//             {`(${astrologer.reviews.filter((i) => i.rating).length})`}{" "}
//             {parseFloat(
//               (
//                 astrologer.reviews
//                   .filter((i) => i.rating)
//                   .reduce(
//                     (accumulator, currentValue) =>
//                       accumulator + currentValue.rating,
//                     0
//                   ) / astrologer.reviews.filter((i) => i.rating).length
//               ).toFixed(1)
//             ) || 0}
//           </div>
//           <div
//             style={{
//               fontSize: "18px",
//               textTransform: "capitalize",
//               fontWeight: "500",
//             }}
//           >
//             Experience {astrologer.experience} years
//           </div>
//           <div
//             style={{
//               fontSize: "18px",
//               textTransform: "capitalize",
//               fontWeight: "500",
//             }}
//           >
//             consultations {astrologer.consultation}
//           </div>
//           <div
//             style={{
//               fontSize: "18px",
//               textTransform: "capitalize",
//               fontWeight: "500",
//             }}
//           >
//             {" "}
//             {astrologer.isOnline === "Online"
//               ? `$${astrologer?.chargePrise}Per Min`
//               : "$7 Per Question"}
//           </div>
//           <div
//             style={{
//               background: "var(--yellow)",
//               width: "150px",
//               textAlign: "center",
//               color: "var(--white)",
//               padding: "5px 20px",
//               borderRadius: "3px",
//               cursor: "pointer",
//               textTransform: "uppercase",
//             }}
//             onClick={() => {
//               if (user?.balance > 3 * astrologer?.chargePrise) {
//                 if (astrologer.isOnline === "Online") {
//                   const x = AstroRequest.find(
//                     (i) => i._id === astrologer._id
//                   );
//                   if (!x) {
//                     socketRef.current.emit("sendRequest", {
//                       astrologerId: astrologer._id,
//                       user,
//                     });
//                     dispatch(ClientChat(astrologer));
//                   }
//                 } else {
//                   sets(astrologer);
//                 }
//               } else {
//                 navigate(`/profile/${user._id}/wallet?p=addmoney`);
//               }
//             }}
//           >
//             {astrologer.isOnline === "Online" ? "chat" : "ask"}
//           </div>
//         </div>
//       </div>
//       <div
//         style={{
//           width: "100%",
//           backgroundColor: "var(--bg-white)",
//           padding: "20px",
//           paddingTop: "0px",
//           alignItems: "center",
//           gap: "5%",
//         }}
//       >
//         <h2 style={{ fontSize: "22px", padding: "20px" }}>Expert in </h2>
//         <div
//           style={{
//             flex: "1",
//             minWidth: "400px",
//             display: "flex",
//             gap: "10px",
//             flexWrap: "wrap",
//           }}
//         >
//           {astrologer?.category.map((e) => (
//             <Link
//               to={`/astrologer/${e._id}`}
//               style={{
//                 background: "var(--yellow)",
//                 boxShadow: "0px 0px 10px var(--gray)",
//                 padding: "5px 15px",
//                 borderRadius: "20px ",
//                 fontSize: "20px",
//               }}
//             >
//               {e}
//             </Link>
//           ))}
//         </div>
//       </div>
//       <div
//         style={{
//           width: "100%",
//           backgroundColor: "var(--bg-white)",
//           padding: "20px",
//           paddingTop: "0px",
//           alignItems: "center",
//           gap: "5%",
//         }}
//       >
//         <h2 style={{ fontSize: "22px", padding: "20px" }}>
//           Consultant for{" "}
//         </h2>
//         <div
//           style={{
//             flex: "1",
//             minWidth: "400px",
//             display: "flex",
//             gap: "10px",
//             flexWrap: "wrap",
//           }}
//         >
//           {astrologer?.spirituality.map((e) => (
//             <Link
//               to={`/astrologer/${e._id}`}
//               style={{
//                 background: "var(--yellow)",
//                 boxShadow: "0px 0px 10px var(--gray)",
//                 padding: "5px 15px",
//                 borderRadius: "20px ",
//                 fontSize: "20px",
//               }}
//             >
//               {e}
//             </Link>
//           ))}
//         </div>
//       </div>

//       <div
//         style={{
//           margin: "20px 0px",
//           backgroundColor: "var(--bg-white)",
//           padding: "10px 2%",
//           fontSize: "20px",
//           borderRadius: "6px",
//         }}
//       >
//         <h2 style={{ fontSize: "22px", padding: "10px" }}>Bio</h2>

//         {astrologer.bio}
//       </div>
//       <div
//         style={{
//           margin: "20px 0px",
//           backgroundColor: "var(--bg-white)",
//           padding: "10px 2%",
//           fontSize: "20px",
//           borderRadius: "6px",
//         }}
//       >
//         <h2 style={{ fontSize: "35px", padding: "10px" }}>
//           Review by Clients
//         </h2>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "20px",
//           }}
//         >
//           {reviews?.reverse().map((e) => (
//             <>
//               <div
//                 style={{
//                   background: "var(--cta-white)",
//                   padding: "7px 15px",
//                   borderRadius: "6px",
//                 }}
//               >
//                 <p
//                   style={{
//                     textTransform: "capitalize",
//                     fontSize: "22px",
//                     fontWeight: "600",
//                   }}
//                 >
//                   {e?.user?.name}
//                 </p>
//                 <div>
//                   <Star rating={e?.rating} />
//                 </div>
//                 {e?.comment}
//               </div>
//             </>
//           ))}
//           {!more && astrologer?.reviews.length > 8 && (
//             <div
//               onClick={() => {
//                 setMore(true);
//                 setReviews(
//                   astrologer?.reviews?.filter(
//                     (e) => e.comment || e.rating
//                   )
//                 );
//               }}
//               style={{
//                 backgroundColor: "var(--yellow)",
//                 padding: "20px",
//                 textAlign: "center",
//                 cursor: "pointer",
//               }}
//             >
//               View More
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   </div>
// )}
