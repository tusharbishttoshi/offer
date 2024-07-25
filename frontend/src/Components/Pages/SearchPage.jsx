import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAstrologers,
  GetCategory,
  SearchAstro,
  offlineChat,
} from "../../api/userLogInReducer";
import { ClientChat } from "../../api/ChatRequestReducer";
import { NavBar } from "../Component/All";
import { Footer } from "../..";
import { FaXmark } from "react-icons/fa6";
import CustomLoader from "../Component/CustomLoder";

function SearchPage({ socketRef }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { astrologers } = useSelector((state) => state.userLog);
  const { AstroRequest } = useSelector((state) => state.astroRequest);
  const [s, sets] = useState({});
  const [m, setM] = useState("");
  const { user } = useSelector((state) => state.userLog);
  const [Loder, setLoder] = useState(true);
  useEffect(() => {
    // !user?._id && navigate("/");
  }, [user]);

  useEffect(() => {
    dispatch(GetAstrologers());
  }, []);

  useEffect(() => {
    socketRef.current?.on("liveAstro", ({ id }) => {
      console.log("liveAstro", { id });
      dispatch(GetAstrologers());
    });

    socketRef.current?.on("endWork", ({ id }) => {
      console.log("endWork", { id });
      dispatch(GetAstrologers());
    });

    socketRef.current?.on("offline", ({ id }) => {
      console.log("offline", { id });
      dispatch(GetAstrologers());
    });
  });

  const [category, setCategory] = useState([]);
  const [filterCategory, setFilterCategory] = useState([]);
  console.log({ filterCategory });
  const [e, setE] = useState(false);
  const filterObjectsByCategory = (arrayA, arrayB) => {
    if (arrayA.length <= 0) {
      return arrayB;
    } else {
      return arrayB.filter((obj) =>
        obj.category.some((cat) => arrayA.includes(cat))
      );
    }
  };

  useEffect(() => {
    dispatch(GetCategory()).then(
      (e) => setCategory(e.payload.categories),
      setLoder(false)
    );
  }, []);

  const [socketAstro, setsocketAstro] = useState([]);

  useEffect(() => {
    const results = filterObjectsByCategory(filterCategory, astrologers);
    // First, sort by isOnline status, then by name

    const sortedResults = [...results].sort((a, b) => {
      if (a.isOnline === "Online" && b.isOnline !== "Online") {
        return -1; // a comes before b
      } else if (a.isOnline !== "Online" && b.isOnline === "Online") {
        return 1; // b comes before a
      } else {
        return a.name.localeCompare(b.name); // both are either online or offline, so sort by name
      }
    });
    setsocketAstro(sortedResults);
  }, [astrologers, filterCategory]);
  return (
    <>
      <NavBar socketRef={socketRef} />
      {Loder ? (
        <CustomLoader Loder={Loder} />
      ) : (
        <div className="wapper seconde_bg">
          <div className="container d-flex flex-wrap align-items-baseline justify-content-between">
            {/* <form style={{
            display: "flex", justifyContent: "center", width: "100%", maxWidth: "500px",
          }}>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} name="search" id="search" style={{ border: "2px solid black", margin: "10px 0px", outline: "none", padding: "10px 20px", borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px", borderRight: "0px", width: "100%", fontSize: "16px" }} />
            <button style={{ margin: "10px 0px", padding: "0px 10px", fontSize: "20px", cursor: "pointer", border: "2px solid black", borderTopRightRadius: "5px", borderBottomRightRadius: "5px", backgroundColor: "var(--yellow)", color: "var(--dark)" }} onClick={(e) => {
              e.preventDefault()
              navigate(`/search?q=${search}`)
            }}>Search</button>
          </form> */}
          </div>

          <div
            className="container"
          // style={{
          //   display: "flex",
          //   flexWrap: "wrap",
          //   padding: "0 50px 50px 50px",
          // }}
          >
            <div className="row">
              <div className="col-md-9">
                <h3
                  className="astroListHeading as_heading"
                  style={{ margin: "25px 25px" }}
                >
                  Our Psychic Masters
                </h3>
              </div>
              <div className="col-md-3">
                <div
                  style={{
                    marginBottom: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    width: "100%",
                  }}
                >
                  <label
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "500",
                      textTransform: "uppercase",
                      marginLeft: "2%",
                      marginTop: "1%",
                    }}
                  >
                    Categories
                  </label>
                  <select
                    name="category"
                    className="form-control"
                    onChange={(e) => setFilterCategory([e.target.value])}
                  >
                    <option default>Select Category</option>
                    {category.map((item) => (
                      <option value={item.category}>{item.category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="row  gy-3">
              <>
                {socketAstro?.map((item) => (
                  <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 display-grid">
                    <div className="astrologers_box">
                      <div className="box-upper-details">
                        <div className="astrologer_details">
                          <div className="img_astrolgers_rating">
                            <div className="img_astrologer normal_border">
                              <img
                                src={item?.avatar?.url}
                                alt="Generic placeholder image"
                                style={{
                                  width: 70,
                                  height: 70,
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                            <div className="star_rate">
                              {" "}
                              <ul
                                className="mb-0 list-unstyled d-flex flex-row"
                                style={{ color: "#1B7B2C" }}
                              >
                                {[...Array(item.rating)].map((_, index) => (
                                  <li key={index}>
                                    <div>
                                      <i className="fas fa-star fa-xs" />
                                      {`(${item.reviews.filter((i) => i.rating)
                                        .length
                                        })`}{" "}
                                      {` `}
                                      {parseFloat(
                                        (
                                          item.reviews
                                            .filter((i) => i.rating)
                                            .reduce(
                                              (accumulator, currentValue) =>
                                                accumulator +
                                                currentValue.rating,
                                              0
                                            ) /
                                          item.reviews.filter((i) => i.rating)
                                            .length
                                        ).toFixed(1)
                                      ) || 0}{" "}
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="astrologers_experence light_clr">
                              {item?.consultation} Orders
                            </div>
                          </div>

                          <div className="astrologer_bio">
                            <div
                              className="astrologers_name"
                              onClick={() =>
                                navigate(`/astrologer-details/${item._id}`)
                              }
                            >
                              {item.name}
                            </div>
                            <div className="astrologers_designation light_clr">
                              {item?.category?.slice(0, 3).map((itemCate) => (
                                <>
                                  {" "}
                                  <span>{itemCate} </span>,
                                </>
                              ))}
                            </div>
                            <div className="astrologers_language light_clr">
                              {item?.languages?.slice(0, 3).map((itemCate) => (
                                <>
                                  {" "}
                                  <span>{itemCate} </span>,
                                </>
                              ))}
                            </div>
                            <div className="astrologers_experence light_clr">
                              Exp: {item?.experience} years
                            </div>

                            <div className="astrologers_experence light_clr">
                              {item.isOnline == "Online"
                                ? "$2.51Per Min"
                                : "$7 Per Question"}
                            </div>
                          </div>
                        </div>
                        <div className="chat_btn_astrologer">
                          <div className="active_tick single-tick">
                            <span class="mat-tooltip-trigger tick_icon ng-star-inserted">
                              <img
                                height="512"
                                width="512"
                                alt="Verified Astrologer"
                                src="https://d1gcna0o0ldu5v.cloudfront.net/fit-in/24x24/assets/images/Chat_with_astrologers/webp/tick_icon.webp"
                              />
                            </span>
                          </div>
                          <div className="chat_button">
                            <button
                              type="button"
                              className={`btn chat-radio w-100  ${item.isOnline == "Online"
                                ? "btn-success"
                                : item.isOnline == "Offline"
                                  ? "btn-warning"
                                  : "btn-danger"
                                }`}
                              onClick={() => {
                                if (parseFloat(user?.bonus) >= 2.51) {
                                  if (item.isOnline === "Online") {
                                    const x = AstroRequest.find(
                                      (i) => i._id === item._id
                                    );
                                    if (!x) {
                                      socketRef.current.emit("sendRequest", {
                                        astrologerId: item._id,
                                        user,
                                      });
                                      dispatch(ClientChat(item));
                                    }
                                  } else {
                                    sets(item);
                                  }
                                } else if (parseFloat(user?.balance) >= 2.51) {
                                  if (item.isOnline === "Online") {
                                    const x = AstroRequest.find(
                                      (i) => i._id === item._id
                                    );
                                    if (!x) {
                                      socketRef.current.emit("sendRequest", {
                                        astrologerId: item._id,
                                        user,
                                      });
                                      dispatch(ClientChat(item));
                                    }
                                  } else {
                                    sets(item);
                                  }
                                } else {
                                  alert("Your Balance is low please recharge");
                                  navigate(
                                    `/profile/${user._id}/wallet?p=addmoney`
                                  );
                                }
                              }}
                            >
                              {item.isOnline == "Online"
                                ? "Chat"
                                : item.isOnline == "Offline"
                                  ? "Ask"
                                  : "Busy"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            </div>

            {/* {result.length > 0 ? (
            <>
              <div
                className="d d-flex flex-wrap justify-content-around"
                // style={{
                //   width: "100%",
                //   display: "flex",
                //   flexWrap: "wrap",
                //   justifyContent: "space-evenly",
                //   background: "var(--bg-white)",
                //   gap: "30px",
                //   margin: "10px",
                //   backgroundColor: "var(--white)",
                //   padding: "50px",
                //   boxShadow: "0px 0px 4px gray",
                // }}
              >
                {result.map((e) => (
                  <div
                    key={e._id}
                    className="card1 my-3"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "15px",
                      overflow: "hidden",
                      width: "31%",
                      minWidth: "300px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "white",
                        flex: "1",
                        display: "flex",
                        flexDirection: "column",
                        padding: "20px 15px 15px 15px",
                        gap: "8px",
                        paddingBottom: "20px",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "5%",
                          alignItems: "flex-start",
                        }}
                      >
                        <div
                          style={{
                            height: "100px",
                            minWidth: "100px",
                            position: "relative",
                            maxWidth: "100px",
                            backgroundColor: "red",
                            borderRadius: "50%",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={e?.avatar?.url}
                            alt=""
                            style={{
                              height: "100%",
                              width: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "5px",
                            alignItems: "flex-start",
                          }}
                        >
                          <Link
                            to={`/astrologer-details/${e._id}`}
                            style={{
                              fontSize: "20px",
                              fontWeight: "700",
                              textTransform: "uppercase",
                            }}
                          >
                            {e.name}
                          </Link>

                          <div style={{ color: "green" }} className="a-star">
                            <p>
                              {`(${e.reviews.filter((i) => i.rating).length})`}{" "}
                              {` `}
                              {parseFloat(
                                (
                                  e.reviews
                                    .filter((i) => i.rating)
                                    .reduce(
                                      (accumulator, currentValue) =>
                                        accumulator + currentValue.rating,
                                      0
                                    ) / e.reviews.filter((i) => i.rating).length
                                ).toFixed(1)
                              ) || 0}{" "}
                            </p>

                            <i class="fas fa-star fa-xs g-star"></i>
                          </div>
                          <div class="d-flex align-items-center justify-content-center gap-2">
                            {e.isOnline === "Online" ? (
                              <p
                                className="d-flex align-items-center justify-content-center gap-2"
                                style={{
                                  boxShadow: "0px 0px 10px var(--gray)",
                                  padding: "5px 15px",
                                  borderRadius: "6px ",
                                  border: "1px solid #6c1000",
                                  height: "30px",
                                  paddingTop: "0%",
                                  color: "#6c1000",
                                }}
                              >
                                <div
                                  style={{
                                    height: "10px",
                                    aspectRatio: "1",
                                    background: "green",
                                    borderRadius: "50%",
                                  }}
                                ></div>
                                <span>Online</span>
                              </p>
                            ) : e.isOnline === "Offline" ? (
                              <p
                                className="d-flex align-items-center justify-content-center gap-2"
                                style={{
                                  boxShadow: "0px 0px 10px var(--gray)",
                                  padding: "5px 15px",
                                  borderRadius: "6px ",
                                  border: "1px solid #6c1000",
                                  height: "30px",
                                  paddingTop: "0%",
                                  color: "#6c1000",
                                }}
                              >
                                <div
                                  style={{
                                    height: "10px",
                                    aspectRatio: "1",
                                    background: "gray",
                                    borderRadius: "50%",
                                    border: "1px solid #6c1000",
                                  }}
                                ></div>
                                <span>Offline</span>
                              </p>
                            ) : (
                              <p
                                className="d-flex align-items-center justify-content-center gap-2"
                                style={{
                                  boxShadow: "0px 0px 10px var(--gray)",
                                  padding: "5px 15px",
                                  borderRadius: "6px ",
                                  border: "1px solid #6c1000",
                                  height: "30px",
                                  paddingTop: "0%",
                                  color: "#6c1000",
                                }}
                              >
                                <div
                                  style={{
                                    height: "10px",
                                    aspectRatio: "1",
                                    background: "red",
                                    borderRadius: "50%",
                                    border: "1px solid #6c1000",
                                  }}
                                ></div>
                                <span>Busy</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          margin: "10px 0px",
                          flexWrap: "wrap",
                        }}
                      >
                        {e?.category?.length > 0 ? (
                          <>
                            {e?.category?.slice(0, 4).map((e) => (
                              <>
                                <p
                                  style={{
                                    // background: "var(--yellow)",
                                    boxShadow: "0px 0px 10px var(--gray)",
                                    padding: "5px 15px",
                                    borderRadius: "6px ",
                                    border: "1px solid #6c1000",
                                    height: "30px",
                                    paddingTop: "0%",
                                    color: "#6c1000",
                                  }}
                                >
                                  {e}
                                </p>
                              </>
                            ))}
                          </>
                        ) : (
                          <>
                            <p
                              style={{
                                // background: "var(--yellow)",
                                boxShadow: "0px 0px 10px var(--gray)",
                                padding: "5px 15px",
                                borderRadius: "6px ",
                                border: "1px solid",
                              }}
                            >
                              Astrologer
                            </p>
                          </>
                        )}
                        <p
                          onClick={() =>
                            navigate(`/astrologer-details/${e._id}`)
                          }
                          style={{
                            background: "#6c1000",
                            boxShadow: "0px 0px 10px var(--gray)",
                            padding: "5px 15px",
                            borderRadius: "20px ",
                            color: "white",
                          }}
                        >
                          More...
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "3px",
                        }}
                      >
                        <p>
                          {e.experience} years <span>Experience</span>
                        </p>
                        <p>
                          {e.consultation}{" "}
                          <span style={{ fontWeight: "400" }}>
                            consultations done
                          </span>
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        backgroundColor: "#d51e00",
                        padding: "10px 20px",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "1rem",
                          fontWeight: "600",
                        }}
                        className="text-white"
                      >
                        {e.isOnline === "Online"
                          ? `$${e?.chargePrise}Per Min`
                          : "$7 Per Question"}
                      </div>
                      <div
                        style={{
                          background: "var(--dark)",
                          color: "var(--white)",
                          padding: "5px 20px",
                          borderRadius: "3px",
                          cursor: "pointer",
                          textTransform: "uppercase",
                        }}
                        onClick={() => {
                          if (user?.balance >= 2.51) {
                            if (e.isOnline === "Online") {
                              const x = AstroRequest.find(
                                (i) => i._id === e._id
                              );
                              if (!x) {
                                socketRef.current.emit("sendRequest", {
                                  astrologerId: e._id,
                                  user,
                                });
                                dispatch(ClientChat(e));
                              }
                            } else {
                              sets(e);
                            }
                          } else {
                            alert("Your Balance is low please recharge");
                            navigate(`/profile/${user._id}/wallet?p=addmoney`);
                          }
                        }}
                      >
                        {e.isOnline === "Online" ? "chat" : "ask"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  width: "100%",
                  margin: "10px",
                  backgroundColor: "var(--white)",
                  padding: "100px",
                  boxShadow: "0px 0px 4px gray",
                }}
              >
                <h3
                  style={{
                    fontSize: "40px",
                    color: "var(--dark-blue)",
                    textAlign: "center",
                  }}
                >
                  Loading astrologer profiles
                </h3>
              </div>
            </>
          )} */}
          </div>
        </div>
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
              zIndex: "100",
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
                      ).then((e) => {
                        if (e.payload.success) {
                          sets({});
                          alert("Your message send successfully");
                        }
                      });
                      setM("");
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
export const searchAstrologers = () => { };
export default SearchPage;
