import React from "react";
import styles from "./Chats.module.css";
import NavBar from "../../components/ProtectedRoutes/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { CiChat1 } from "react-icons/ci";
import { useState } from "react";
import { HiXMark } from "react-icons/hi2";
import {
  ClientRequestsRemove,
  FetchChat,
  FetchMessage,
  MessageHandler,
  SendMessage,
  StopChat,
  busy,
} from "../../api/useReducer";
import { IoSearchOutline } from "react-icons/io5";
import { useEffect } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
function Chats({ socketRef, chat, setChat }) {
  const Navigation = useNavigate();

  const { astro, allMessages, UserSession } = useSelector(
    (state) => state.user
  );
  console.log({ chat });
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [d, setd] = useState(false);
  const [to, setTo] = useState(0);
  const [ab, seta] = useState(
    chat?.user?.bonus > 0
      ? chat?.user?.bonus - chat?.user?.balance
      : chat?.user?.balance
  );
  const [bb, setbb] = useState(chat?.user?.bonus > 0 ? chat?.user?.bonus : 0);
  useEffect(() => {
    chat._id && dispatch(FetchMessage({ id: chat._id }));
    if (!chat._id) {
      setTime(0);
      setModel(false);
      setEarn(0);
      setd(true);

      setTimeout(() => {
        setd(false);
        // window.location.href = "/Dashboard";
        Navigation("/Dashboard");
      }, 3000);
    }
  }, [chat]);
  useEffect(() => {
    if (astro?._id) {
      socketRef.current?.on("message received", (newMessageReceived) => {
        setTo(0);
        dispatch(MessageHandler(newMessageReceived));
      });
      socketRef.current?.on("scopedTime", (newMessageReceived) => {
        setStop(true);
      });
    }
  });
  const a = [
    "Technical issues at client side",
    "Client is not Responding",
    "Technical issues at Astrologer side",
    "Client is abusive",
    "Client does not trust my work",
  ];
  const [time, setTime] = useState(0);
  const [stop, setStop] = useState(false);
  const [earn, setEarn] = useState(0);
  const [model, setModel] = useState(false);
  const [send, setSend] = useState(true);
  useEffect(() => {
    let interval = null;
    if (!stop && chat._id) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          let a = Math.ceil(prevTime / 60) * astro.earnPrise;

          // switch (Math.ceil(prevTime / 60)) {
          //     case 1:
          //         if (bb > 0) {
          //             setbb(bb - 2.51)
          //         }
          //         else (
          //             seta(ab - 2.51)
          //         )
          //         break;
          //     case 2:
          //         if (bb > 0) {
          //             setbb(bb - 2.51)
          //         }
          //         else (
          //             seta(ab - 2.51)
          //         )
          //         break;
          //     case 3:
          //         if (bb > 0) {
          //             setbb(bb - 2.51)
          //         }
          //         else (
          //             seta(ab - 2.51)
          //         )
          //         break;
          //     case 4:
          //         if (bb > 0) {
          //             setbb(bb - 2.51)
          //         }
          //         else (
          //             seta(ab - 2.51)
          //         )
          //         break;
          //     case 5:
          //         seta(ab - 2.51);
          //         break;
          //     case 6:
          //         seta(ab - 2.51);
          //         break;
          //     case 7:
          //         seta(ab - 2.51);
          //         break;
          //     case 8:
          //         seta(ab - 2.51);
          //         break;
          //     case 9:
          //         seta(ab - 2.51);
          //         break;
          //     case 10:
          //         seta(ab - 2.51);
          //         break;
          //     case 11:
          //         seta(ab - 2.51);
          //         break;
          //     case 12:
          //         seta(ab - 2.51);
          //         break;
          //     case 13:
          //         seta(ab - 2.51);
          //         break;
          //     case 14:
          //         seta(ab - 2.51);
          //         break;
          //     case 15:
          //         seta(ab - 2.51);
          //         break;
          //     case 16:
          //         seta(ab - 2.51);
          //         break;
          //     case 17:
          //         seta(ab - 2.51);
          //         break;
          //     case 18:
          //         seta(ab - 2.51);
          //         break;
          //     case 19:
          //         seta(ab - 2.51);
          //         break;
          //     case 20:
          //         seta(ab - 2.51);
          //         break;
          //     case 21:
          //         seta(ab - 2.51);
          //         break;
          //     case 22:
          //         seta(ab - 2.51);
          //         break;
          //     case 23:
          //         seta(ab - 2.51);
          //         break;
          //     case 24:
          //         seta(ab - 2.51);
          //         break;
          //     case 25:
          //         seta(ab - 2.51);
          //         break;
          //     case 26:
          //         seta(ab - 2.51);
          //         break;
          //     case 27:
          //         seta(ab - 2.51);
          //         break;
          //     case 28:
          //         seta(ab - 2.51);
          //         break;
          //     case 29:
          //         seta(ab - 2.51);
          //         break;
          //     case 30:
          //         seta(ab - 2.51);
          //         break;
          //     case 31:
          //         seta(ab - 2.51);
          //         break;
          //     case 32:
          //         seta(ab - 2.51);
          //         break;
          //     case 33:
          //         seta(ab - 2.51);
          //         break;
          //     case 34:
          //         seta(ab - 2.51);
          //         break;
          //     case 35:
          //         seta(ab - 2.51);
          //         break;
          //     case 36:
          //         seta(ab - 2.51);
          //         break;
          //     case 37:
          //         seta(ab - 2.51);
          //         break;
          //     case 38:
          //         seta(ab - 2.51);
          //         break;
          //     case 39:
          //         seta(ab - 2.51);
          //         break;
          //     case 40:
          //         seta(ab - 2.51);
          //         break;
          //     case 41:
          //         seta(ab - 2.51);
          //         break;
          //     case 42:
          //         seta(ab - 2.51);
          //         break;
          //     case 43:
          //         seta(ab - 2.51);
          //         break;
          //     case 44:
          //         seta(ab - 2.51);
          //         break;
          //     case 45:
          //         seta(ab - 2.51);
          //         break;
          //     case 46:
          //         seta(ab - 2.51);
          //         break;
          //     case 47:
          //         seta(ab - 2.51);
          //         break;
          //     case 48:
          //         seta(ab - 2.51);
          //         break;
          //     case 49:
          //         seta(ab - 2.51);
          //         break;
          //     case 50:
          //         seta(ab - 2.51);
          //         break;
          //     case 51:
          //         seta(ab - 2.51);
          //         break;
          //     case 52:
          //         seta(ab - 2.51);
          //         break;
          //     case 53:
          //         seta(ab - 2.51);
          //         break;
          //     case 54:
          //         seta(ab - 2.51);
          //         break;
          //     case 55:
          //         seta(ab - 2.51);
          //         break;
          //     case 56:
          //         seta(ab - 2.51);
          //         break;
          //     case 57:
          //         seta(ab - 2.51);
          //         break;
          //     case 58:
          //         seta(ab - 2.51);
          //         break;
          //     case 59:
          //         seta(ab - 2.51);
          //         break;
          //     case 60:
          //         seta(ab - 2.51);
          //         break;
          //     case 61:
          //         seta(ab - 2.51);
          //         break;
          //     case 62:
          //         seta(ab - 2.51);
          //         break;
          //     case 63:
          //         seta(ab - 2.51);
          //         break;
          //     case 64:
          //         seta(ab - 2.51);
          //         break;
          //     case 65:
          //         seta(ab - 2.51);
          //         break;
          //     case 66:
          //         seta(ab - 2.51);
          //         break;
          //     case 67:
          //         seta(ab - 2.51);
          //         break;
          //     case 68:
          //         seta(ab - 2.51);
          //         break;
          //     case 69:
          //         seta(ab - 2.51);
          //         break;
          //     case 70:
          //         seta(ab - 2.51);
          //         break;
          //     case 71:
          //         seta(ab - 2.51);
          //         break;
          //     case 72:
          //         seta(ab - 2.51);
          //         break;
          //     case 73:
          //         seta(ab - 2.51);
          //         break;
          //     case 74:
          //         seta(ab - 2.51);
          //         break;
          //     case 75:
          //         seta(ab - 2.51);
          //         break;
          //     case 76:
          //         seta(ab - 2.51);
          //         break;
          //     case 77:
          //         seta(ab - 2.51);
          //         break;
          //     case 78:
          //         seta(ab - 2.51);
          //         break;
          //     case 79:
          //         seta(ab - 2.51);
          //         break;
          //     case 80:
          //         seta(ab - 2.51);
          //         break;
          //     case 81:
          //         seta(ab - 2.51);
          //         break;
          //     case 82:
          //         seta(ab - 2.51);
          //         break;
          //     case 83:
          //         seta(ab - 2.51);
          //         break;
          //     case 84:
          //         seta(ab - 2.51);
          //         break;
          //     case 85:
          //         seta(ab - 2.51);
          //         break;
          //     case 86:
          //         seta(ab - 2.51);
          //         break;
          //     case 87:
          //         seta(ab - 2.51);
          //         break;
          //     case 88:
          //         seta(ab - 2.51);
          //         break;
          //     case 89:
          //         seta(ab - 2.51);
          //         break;
          //     case 90:
          //         seta(ab - 2.51);
          //         break;
          //     case 91:
          //         seta(ab - 2.51);
          //         break;
          //     case 92:
          //         seta(ab - 2.51);
          //         break;
          //     case 93:
          //         seta(ab - 2.51);
          //         break;
          //     case 94:
          //         seta(ab - 2.51);
          //         break;
          //     case 95:
          //         seta(ab - 2.51);
          //         break;
          //     case 96:
          //         seta(ab - 2.51);
          //         break;
          //     case 97:
          //         seta(ab - 2.51);
          //         break;
          //     case 98:
          //         seta(ab - 2.51);
          //         break;
          //     case 99:
          //         seta(ab - 2.51);
          //         break;
          //     case 100:
          //         seta(ab - 2.51);
          //         break;
          //     case 101:
          //         seta(ab - 2.51);
          //         break;
          //     case 102:
          //         seta(ab - 2.51);
          //         break;
          //     case 103:
          //         seta(ab - 2.51);
          //         break;
          //     case 104:
          //         seta(ab - 2.51);
          //         break;
          //     case 105:
          //         seta(ab - 2.51);
          //         break;
          //     case 106:
          //         seta(ab - 2.51);
          //         break;
          //     case 107:
          //         seta(ab - 2.51);
          //         break;
          //     case 108:
          //         seta(ab - 2.51);
          //         break;
          //     case 109:
          //         seta(ab - 2.51);
          //         break;
          //     case 110:
          //         seta(ab - 2.51);
          //         break;
          //     case 111:
          //         seta(ab - 2.51);
          //         break;
          //     case 112:
          //         seta(ab - 2.51);
          //         break;
          //     case 113:
          //         seta(ab - 2.51);
          //         break;
          //     case 114:
          //         seta(ab - 2.51);
          //         break;
          //     case 115:
          //         seta(ab - 2.51);
          //         break;
          //     case 116:
          //         seta(ab - 2.51);
          //         break;
          //     case 117:
          //         seta(ab - 2.51);
          //         break;
          //     case 118:
          //         seta(ab - 2.51);
          //         break;
          //     case 119:
          //         seta(ab - 2.51);
          //         break;
          //     case 120:
          //         seta(ab - 2.51);
          //         break;

          // }
          setEarn(a.toFixed(2));
          return prevTime + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [stop, chat]);
  const [value, setValue] = useState("");
  const [userProfile, setUserProfile] = useState(false);
  useEffect(() => {
    chat?._id &&
      setInterval(() => {
        setTo((prevTime) => {
          return prevTime + 1;
        });
      }, 1000);
  }, [chat]);
  useEffect(() => {
    if (to === 60) {
      setStop(true);
      socketRef.current.emit("stopChat", { id: chat.user?._id });

      dispatch(busy({ id: astro._id, work: "Online" }));
      dispatch(
        StopChat({
          astroId: astro._id,
          value: "Time Out",
          userId: chat?.user?._id,
          time,
          price: astro.chargePrise,
        })
      ).then((e) => {
        if (e?.payload?.success) {
          setChat({});
          // window.location.href = "/Dashboard";
          Navigation("/Dashboard");
        }
      });
    }
  }, [to]);
  const scrollableDivRef = useRef(null);
  useEffect(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop =
        scrollableDivRef.current.scrollHeight;
    }
  }, [allMessages]);
  const stopChatFun = () => {
    socketRef.current.emit("stopChat", { id: chat.user._id });

    dispatch(busy({ id: astro._id, work: "Online" }));

    dispatch(
      StopChat({
        astroId: astro._id,
        value,
        userId: chat.user._id,
        time,
        price: astro.chargePrise,
        rating: 0,
      })
    ).then((e) => {
      if (e?.payload?.success) {
        // window.location.href = "/Dashboard";
        Navigation("/Dashboard");
        setChat({});
      }
    });
  };

  // send image

  const [image, setImage] = useState(null);

  const handleClick = () => {
    // Trigger the file input when the icon is clicked
    document.getElementById("imageInput").click();
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      // Set the image preview
      setImage(reader.result);
    };
    reader.readAsDataURL(selectedImage);
  };

  return (
    <>
      {model && (
        <>
          <div
            style={{
              height: "100vh",
              width: "100vw",
              position: "fixed",
              top: "0px",
              zIndex: "9999",
              backgroundColor: "rgba(0, 0,0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                background: "white",
                height: "auto",
                gap: "15px",
                maxWidth: "440px",
                width: "90%",
                margin: "auto",
                borderRadius: "10px",
                padding: "15px 10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h2 style={{ fontSize: "22px" }}>Stop chat</h2>
              <p style={{ color: "black", fontSize: "16px" }}>Reason</p>
              <div
                style={{
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {a.map((e) => (
                  <p
                    onClick={() => setValue(e)}
                    style={{
                      borderRadius: "100px",
                      border: "1px solid gray",
                      padding: "6px 20px",
                      cursor: "pointer",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      background: value === e && "green",
                      color: value === e ? "white" : "black ",
                    }}
                  >
                    {e}
                  </p>
                ))}
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  onClick={() => setModel(false)}
                  style={{
                    padding: "6px 15px",
                    cursor: "pointer",
                    borderRadius: "6px",
                    fontWeight: "500",
                    backgroundColor: "gray",
                    color: "white",
                  }}
                >
                  Cancel
                </div>
                <div
                  onClick={() => {
                    setModel(false);
                    if (value) {
                      setStop(true);
                      stopChatFun();
                      // socketRef.current?.emit("stopChat", { id: chat.user._id, value })
                      setChat({});
                    }
                  }}
                  style={{
                    padding: "6px 15px",
                    cursor: "pointer",
                    borderRadius: "6px",
                    background: "red",
                    fontWeight: "500",
                    color: "white",
                  }}
                >
                  Stop
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div
        style={{
          height: "calc(100vh - 55px)",
          backgroundColor: "white",
          display: "flex",
        }}
      >
        {
          chat._id && (
            <>
              <div
                style={{
                  borderLeft: "1px solid gray",
                  height: "100%",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "70px",
                    display: "flex",
                    position: "sticky",
                    top: "0px",
                    justifyContent: "space-between",
                    padding: "0px 20px",
                    backgroundColor: "var(--cta-white)",
                    textTransform: "capitalize",
                  }}
                >
                  <div
                    onClick={() =>
                      userProfile
                        ? setUserProfile("")
                        : setUserProfile("profile")
                    }
                    style={{
                      cursor: "pointer",
                      color: "black",
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
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
                        src={chat?.user?.avatar?.url}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div>
                      <p>{chat?.user?.name}</p>
                      {/* <p><bold>Available Balance : </bold> ${ab}</p> */}
                      {/* <p style={{ fontSize: "12px" }}> Bonus Balance ${bb}</p> */}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
                    }}
                  >
                    <div
                      onClick={() => {
                        setModel(true);
                      }}
                      style={{
                        borderRadius: "10px",
                        background: "var(--bg-dark)",
                        color: "white",
                        padding: "10px 20px",
                        cursor: "pointer",
                      }}
                    >
                      Stop
                    </div>

                    <div
                      style={{
                        borderRadius: "10px",
                        background: "var(--yellow)",
                        padding: "10px 20px",
                        cursor: "pointer",
                      }}
                    >
                      <span className="digits">
                        {("0" + Math.floor((time / 60) % 60)).slice(-2)}:
                      </span>
                      <span className="digits">
                        {("0" + Math.floor(time % 60)).slice(-2)}
                      </span>
                    </div>
                    {/* <div>
                                        <p style={{ fontWeight: "700" }}>You Earn</p>
                                        <p style={{ textAlign: "center" }}>${earn}</p>
                                    </div> */}
                  </div>
                </div>
                <div
                  ref={scrollableDivRef}
                  style={{
                    height: "calc(100% - 70px)",
                    width: "100%",
                    backgroundColor: "var(--white)",
                    overflow: "scroll",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      padding: "50px",
                      background: "var(--bg-white)",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      gap: "3px",
                      minHeight: "100%",
                      border: "1px solid gray",
                      borderRadius: "10px",
                    }}
                  >
                    {image ? (
                      <section className="w-100 px-4 py-5">
                        <div className="row d-flex justify-content-center">
                          <div className="col col-md-9 col-lg-7 col-xl-6 d-flex align-items-center justify-content-center">
                            <div className="border p-3 rounded d-flex align-items-end justify-content-start flex-column">
                              <i
                                onClick={() => setImage(null)}
                                className="fas fa-times fs-1 cursor-pointer"
                              ></i>
                              <img
                                src={image}
                                alt="Generic placeholder image"
                                style={{ width: "200px", height: "200px" }}
                              />
                            </div>
                          </div>
                        </div>
                      </section>
                    ) : (
                      allMessages?.map((e) => (
                        <div
                          style={{
                            margin: "0px 10px",
                            gap: "2px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems:
                              astro._id === e.sender
                                ? "flex-end"
                                : "flex-start",
                            maxWidth: "85%",
                            alignSelf:
                              astro._id === e.sender
                                ? "flex-end"
                                : "flex-start",
                          }}
                        >
                          {e?.avatar?.url && (
                            <img
                              src={e?.avatar?.url}
                              alt="image"
                              style={{ width: "100px", height: "100px" }}
                            />
                          )}
                          {e.content && (
                            <p
                              style={{
                                backgroundColor:
                                  astro._id !== e.sender
                                    ? "#ffcaca"
                                    : "#cacaff",
                                padding: "6px 15px",
                                borderRadius: "6px",
                                fontSize: "16px",
                              }}
                            >
                              {e.content}
                            </p>
                          )}
                          <p style={{ color: "black", fontSize: "12px" }}>
                            {e.createdAt.split("T").slice(0, 1)}{" "}
                            {new Date(e.createdAt).getHours()}:
                            {new Date(e.createdAt).getMinutes()}
                          </p>
                        </div>
                      ))
                    )}

                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        padding: "10px 20px",
                        gap: "10px",
                        backgroundColor: "var(--bg-white)",
                        textTransform: "capitalize",
                      }}
                    >
                      <input
                        value={content}
                        onKeyDown={(e) => {
                          if (content || image) {
                            if (e.key === "Enter" && astro._id && send) {
                              setSend(false);
                              dispatch(
                                SendMessage({
                                  content,
                                  myId: astro._id,
                                  userId: chat.user._id,
                                  chatId: chat._id,
                                  image,
                                })
                              ).then((e) => {
                                setSend(true);
                                if (e.payload?.success) {
                                  setContent("");
                                  setImage(null);
                                  setTo(0);
                                  socketRef.current.emit(
                                    "new message",
                                    e.payload.message
                                  );
                                }
                              });
                            }
                          }
                        }}
                        onChange={(e) => setContent(e.target.value)}
                        type="text"
                        style={{
                          // border: "none",
                          outline: "none",
                          width: "100%",
                          padding: "8px 10px",
                          borderRadius: "6px",
                        }}
                        name=""
                        id=""
                      />

                      <div className="p-2 m-2">
                        <input
                          type="file"
                          id="imageInput"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={handleImageChange}
                        />
                        <i
                          onClick={handleClick}
                          className="fas fa-images fs-1"
                        ></i>
                      </div>

                      <button
                        onClick={(e) => {
                          if (astro._id && send) {
                            setSend(false);
                            dispatch(
                              SendMessage({
                                content,
                                myId: astro._id,
                                userId: chat.user._id,
                                chatId: chat._id,
                                image,
                              })
                            ).then((e) => {
                              setSend(true);

                              if (e.payload?.success) {
                                setContent("");
                                setImage(null);
                                setTo(0);
                                socketRef.current.emit(
                                  "new message",
                                  e.payload.message
                                );
                              }
                            });
                          }
                        }}
                        style={{
                          border: "none",
                          outline: "none",
                          backgroundColor: "var(--yellow)",
                          padding: "6px 15px",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {userProfile && (
                <div
                  style={{
                    padding: "20px",
                    width: "350px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    overflow: "scroll",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "90%",
                      margin: "0px auto",
                      aspectRatio: "1",
                      background: "red",
                      borderRadius: "50%",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={chat?.user?.avatar?.url}
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      alt=""
                    />
                  </div>
                  <div
                    style={{
                      width: "98%",
                      backgroundColor: "var(--cta-white)",
                      borderRadius: "6px",
                      padding: "20px",
                      marginTop: "10px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <div>
                      <strong>Name: </strong>
                      {chat?.user?.name}
                    </div>
                    <div>
                      <strong>DOB: </strong>
                      {chat?.user?.dob}
                    </div>
                    <div>
                      <strong>Gender: </strong>
                      {chat?.user?.gender}
                    </div>
                    <div>
                      <strong>Zodiac: </strong>
                      {chat?.user?.zodiac}
                    </div>
                    <div>
                      <strong>Birth Place: </strong>
                      {chat?.user?.bp}
                    </div>
                    <div>
                      <strong>Birth Time: </strong>
                      {chat?.user?.bt}
                    </div>
                    <div>
                      <strong>Country: </strong>
                      {chat?.user?.country}
                    </div>
                  </div>
                </div>
              )}
            </>
          )
          //   (
          //   <>
          //     <div
          //       style={{
          //         display: "flex",
          //         alignItems: "center",
          //         width: "100%",
          //         justifyContent: "center",
          //       }}
          //     >
          //       <h1 style={{ fontSize: "20px", textAlign: "center" }}>
          //         You have No chat started now <br />
          //         Please wait for chat request <br />
          //         and please check your are Online
          //       </h1>
          //     </div>
          //   </>
          // )
        }
      </div>

      {d && (
        <div
          style={{
            position: "absolute",
            width: "500px",
            backgroundColor: "#d3dfe3",
            top: "10px",
            right: "0px",
            left: "0px",
            margin: "auto",
            borderRadius: "10px",
            padding: "25px 10px",
            zIndex: "100px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              flex: "1",
            }}
          >
            <div
              style={{
                height: "100px",
                width: "100px",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            ></div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div style={{ textAlign: "center" }}>
              The chat has been ended from client side, works done after this
              will be not paid. you can reply to this chat on chat history
            </div>
            <div
              onClick={() => {}}
              style={{
                background: "var(--dark)",
                width: "100px",
                margin: "auto",
                color: "var(--white)",
                textAlign: "center",
                borderRadius: "6px",
                padding: "6px 20px",
                cursor: "pointer",
              }}
            >
              okay
            </div>
          </div>
        </div>
      )}
    </>
  );
}
const ChatRequest = ({ socketRef }) => {
  const { ClientRequests, astro } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <>
      <div
        style={{
          flex: "1",
          backgroundColor: "white",
          width: "95%",
          margin: "auto",
          borderRadius: "10px",
        }}
      >
        <div style={{ padding: "30px 20px" }}>
          <button
            style={{
              border: "2px solid var(--dark)",
              borderRadius: "10px",
              padding: "5px 15px",
              cursor: "pointer",
              background: "var(--bg-white)",
            }}
          >
            {" "}
            Sort By
          </button>
        </div>
        <div className={styles.listCon} style={{}}>
          <div
            style={{
              height: "50px",
              width: "100%",
              backgroundColor: "var(--yellow)",
              display: "flex",
              gap: "20px",
              alignItems: "center",
              padding: "0px 20px",
            }}
          >
            <div style={{ width: "30px", fontWeight: "700" }}>S.N.</div>
            <div style={{ width: "100px", fontWeight: "700" }}>User</div>
            <div style={{ fontWeight: "700" }}>Action</div>
          </div>
          {ClientRequests.map((e, i) => (
            <div
              key={i}
              style={{
                height: "50px",
                width: "100%",
                display: "flex",
                gap: "20px",
                alignItems: "center",
                padding: "0px 20px",
              }}
            >
              <div style={{ width: "30px", fontWeight: "500" }}>{i + 1}.</div>
              <div style={{ width: "100px" }}>{e.name}</div>
              <div style={{ display: "flex", gap: "10px" }}>
                <CiChat1
                  size={25}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    socketRef.current.emit("acceptRequest", {
                      clientId: e._id,
                      astro,
                    })
                  }
                />
                <HiXMark
                  size={25}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    dispatch(ClientRequestsRemove(e._id));
                    socketRef.current.emit("rejectRequest", {
                      clientId: e._id,
                      astro: astro._id,
                    });
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Chats;
