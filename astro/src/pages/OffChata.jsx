import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StopChat, astroGetAllOffChat, astroOffChat } from "../api/useReducer";
import axios from "axios";
// import { userGetAllOffChat, userOffChat } from '../../api/userLogInReducer'
function OffChats() {
  const dispatch = useDispatch();
  const { astro, session } = useSelector((state) => state.user);
  const [chats, setChats] = useState([]);
  const [userProfile, setUserProfile] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    astro._id &&
      dispatch(astroGetAllOffChat({ id: astro._id })).then((e) => {
        e.payload?.success && setChats(e.payload.chat);
      });
  }, [astro]);
  const [isChat, setIsChat] = useState({});
  const [j, setJ] = useState(true);
  useEffect(() => {
    setJ(true);
  }, [isChat]);

  const Offlinefinish = () => {
    axios.post(`api/v1/finishChat`, { id: isChat._id }).then((res) => {});
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "calc(100vh - 55px)",
          width: "100%",
          margin: "0px auto",
          overflow: "hidden",
          backgroundColor: "white",
          border: "1px solid black",
        }}
      >
        <div
          style={{
            paddingBottom: "20px",
            width: "350px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "scroll",
            gap: "10px",
          }}
        >
          <div
            style={{
              paddingTop: "10px",
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignItems: "center",
              gap: "10px",
              overflow: "visible",
            }}
          >
            {chats?.map((e) => {
              return (
                <div
                  key={e._id}
                  onClick={() => {
                    setIsChat(e);
                  }}
                  style={{
                    border: e.isReplied ? null : "1px solid green",
                    background: e.isReplied ? "var(--bg-white)" : "#b6ffb6",
                    cursor: "pointer",
                    alignItems: "center",
                    minHeight: "60px",
                    cursor: "pointer",
                    display: "flex",
                    gap: "10px",
                    borderRadius: "6px",
                    padding: "6px 15px",
                    width: "90%",
                  }}
                >
                  <div
                    style={{
                      height: "50px",
                      aspectRatio: "1",
                      borderRadius: "50%",
                      backgroundColor: "red",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={e.user?.avatar?.url}
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      alt=""
                    />
                  </div>
                  <div>
                    <p>{e.user.name}</p>
                    <p>
                      {e.createdAt.split("T").slice(0, 1)} ,{" "}
                      {new Date(e.createdAt).getHours()}:
                      {new Date(e.createdAt).getMinutes()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {isChat._id ? (
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
                onClick={() => setUserProfile("profile")}
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
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={isChat?.user?.avatar?.url}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div>
                  <p style={{ fontWeight: "700" }}>{isChat.user.name}</p>
                  {/* <p >{parseFloat(totalEarning.toFixed(2))}</p> */}
                </div>
              </div>
              <div
                style={{ display: "flex", gap: "20px", alignItems: "center" }}
              >
                {!isChat.isReplied && j && (
                  <div
                    onClick={() => {
                      const a = window.confirm(
                        "Do You Want To Finish The Chat"
                      );

                      a && Offlinefinish();
                      a &&
                        dispatch(
                          StopChat({
                            astroId: astro._id,
                            userId: isChat.user._id,
                            offline: true,
                            offChatId: isChat._id,
                          })
                        ).then((e) => {
                          e?.payload?.success && setChats(e.payload.offChat);
                          e?.payload?.success && setIsChat({});

                          setJ(false);
                        });
                    }}
                    style={{
                      borderRadius: "10px",
                      fontWeight: "700",
                      background: "var(--yellow)",
                      padding: "10px 20px",
                      cursor: "pointer",
                    }}
                  >
                    Finish
                  </div>
                )}
              </div>
            </div>
            <div
              style={{
                height: "calc(100% - 70px)",
                padding: "50px",
                backgroundColor: "var(--bg-white)",
                width: "100%",
                overflow: "scroll",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "var(--white)",
                  justifyContent: "flex-end",
                  gap: "3px",
                  minHeight: "100%",
                  border: "1px solid gray",
                  borderRadius: "10px",
                }}
              >
                {isChat.messages?.map((e) => (
                  <div
                    style={{
                      margin: "0px 10px",
                      gap: "2px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems:
                        astro._id === e.sender ? "flex-end" : "flex-start",
                      maxWidth: "85%",
                      alignSelf:
                        astro._id === e.sender ? "flex-end" : "flex-start",
                    }}
                  >
                    <p
                      style={{
                        backgroundColor:
                          astro._id !== e.sender ? "#ffcaca" : "#cacaff",
                        padding: "6px 15px",
                        borderRadius: "6px",
                        fontSize: "16px",
                      }}
                    >
                      {e.content}
                    </p>
                    <p style={{ color: "black", fontSize: "12px" }}>
                      {e.createdAt.split("T").slice(0, 1)}{" "}
                      {new Date(e.createdAt).getHours()}:
                      {new Date(e.createdAt).getMinutes()}
                    </p>
                  </div>
                ))}
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
                      if (content) {
                        if (e.key === "Enter") {
                          dispatch(
                            astroOffChat({
                              astroId: astro._id,
                              userId: astro._id,
                              offChatId: isChat._id,
                              content,
                            })
                          ).then((e) => {
                            if (e.payload?.success) {
                              setContent("");
                              setIsChat(e.payload.chat);
                            }
                          });
                        }
                      }
                    }}
                    onChange={(e) => setContent(e.target.value)}
                    type="text"
                    style={{
                      outline: "none",
                      width: "100%",
                      padding: "8px 10px",
                      borderRadius: "6px",
                    }}
                  />
                  <button
                    onClick={(e) => {
                      if (content) {
                        dispatch(
                          astroOffChat({
                            astroId: astro._id,
                            userId: astro._id,
                            offChatId: isChat._id,
                            content,
                          })
                        ).then((e) => {
                          if (e.payload?.success) {
                            setContent("");
                            setIsChat(e.payload.chat);
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
        ) : (
          <>
            <div
              style={{
                borderLeft: "1px solid gray",
                flex: "1",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1
                style={{
                  fontSize: "25px",
                  fontWeight: "700",
                  maxWidth: "440px",
                  width: "95%",
                  textAlign: "center",
                  color: "black",
                }}
              >
                No Chat selected if you want to see chat history then you need
                to select chat
              </h1>
            </div>
          </>
        )}
        {/* {
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
                }  */}
      </div>
    </>
  );
}

export default OffChats;
