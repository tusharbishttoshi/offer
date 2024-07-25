import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userGetAllOffChat, userOffChat } from "../../api/userLogInReducer";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { NavBar } from "../Component/All";

function OffChats() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userLog);
  const [chats, setChats] = useState([]);
  const [userProfile, setUserProfile] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    user._id &&
      dispatch(userGetAllOffChat({ userId: user._id })).then((e) => {
        e.payload?.success && setChats(e.payload.chat);
      });
  }, [user]);
  const [isChat, setIsChat] = useState({});
  const scrollableDivRef = useRef(null);

  useEffect(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop =
        scrollableDivRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <>
      <NavBar />

      <div
        className="container-fluid p-5"
        style={{
          height: "100vh",
          backgroundColor: "var(--bg-white)",
          overflow: "hidden",
          borderRadius: "10px",
        }}
      >
        <div className="row g-3">
          <div className="col-md-3 col-lg-3 col-12  border rounded d-flex flex-column align-items-center overflow-scroll pb-3">
            <div className="w-100 pt-3 d-flex flex-column align-items-center gap-2">
              <div
                onClick={() => navigate(-1)}
                className="d-flex align-items-center gap-2 bg-warning rounded px-3 py-2 w-100 cursor-pointer"
                style={{ cursor: "pointer" }}
              >
                <FaArrowLeft color="#fff" size={30} />
                <div className="fw-bold text-white fs-4">Back</div>
              </div>
              {chats?.map((e) => (
                <div
                  key={e._id}
                  onClick={() => setIsChat(e)}
                  className="d-flex align-items-center gap-2 bg-white rounded px-3 py-2 w-100 cursor-pointer"
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className="bg-danger rounded-circle overflow-hidden"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <img
                      src={e.astro?.avatar?.url}
                      // className="img-fluid"
                      alt={e.astro.name}
                    />
                  </div>
                  <div>
                    <p>{e.astro.name}</p>
                    <p>
                      <span>{new Date(e.createdAt).getDate()}</span>-
                      <span>{new Date(e.createdAt).getMonth() + 1}</span>-
                      <span>{new Date(e.createdAt).getFullYear()}</span>,{" "}
                      <span>{new Date(e.createdAt).getHours()}</span>:
                      <span>{new Date(e.createdAt).getMinutes()}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-9 col-lg-9 col-12 border rounded">
            {isChat._id ? (
              <div
                className="h-100 d-flex flex-column"
                style={{
                  overflow: "hidden",
                }}
              >
                <div
                  className="d-flex justify-content-between align-items-center p-3 sticky-top"
                  style={{ backgroundColor: "var(--cta-white)", zIndex: 1 }}
                >
                  <div
                    onClick={() => setUserProfile("profile")}
                    className="d-flex align-items-center gap-3 cursor-pointer"
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className="bg-danger rounded-circle overflow-hidden"
                      style={{ width: "50px", height: "50px" }}
                    >
                      <img
                        src={isChat?.astro?.avatar?.url}
                        alt={isChat.astro.name}
                        // className="img-fluid"
                      />
                    </div>
                    <div>
                      <p className="fw-bold">{isChat.astro.name}</p>
                    </div>
                  </div>
                </div>
                <div
                  ref={scrollableDivRef}
                  className="flex-grow-1"
                >
                  <div className="d-flex flex-column justify-content-end gap-2 p-3">
                    <div style={{ height: "350px", overflowY: "auto" }}>
                      {isChat.messages?.map((e) => (
                        <div
                          key={e._id}
                          className={`d-flex flex-column align-items-${
                            user._id === e.sender ? "end" : "start"
                          }  align-self-${
                            user._id === e.sender ? "end" : "start"
                          } gap-1`}
                        >
                          <p
                            className={`bg-${
                              user._id !== e.sender ? "warning" : "primary"
                            } text-white rounded px-3 py-2 fs-6`}
                          >
                            {e.content}
                          </p>
                          <p className="text-dark fs-6">
                            {e.createdAt.split("T")[0]}{" "}
                            {new Date(e.createdAt).getHours()}:
                            {new Date(e.createdAt).getMinutes()}:
                            {new Date(e.createdAt).getSeconds()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className="d-flex gap-2 p-3"
                    style={{ backgroundColor: "var(--bg-white)" }}
                  >
                    <input
                      value={content}
                      placeholder="$7/message"
                      onKeyDown={(e) => {
                        if (content && e.key === "Enter") {
                          if (user.balance > 7) {
                            dispatch(
                              userOffChat({
                                astroId: isChat.astro._id,
                                userId: user._id,
                                offChatId: isChat._id,
                                content,
                              })
                            ).then((e) => {
                              if (e.payload?.success) {
                                setIsChat(e.payload.chat);
                                alert("Your message sent successfully");
                              }
                              setContent("");
                            });
                          } else {
                            navigate(`/profile/${user._id}/wallet?p=addmoney`);
                          }
                        }
                      }}
                      onChange={(e) => setContent(e.target.value)}
                      type="text"
                      className="form-control rounded"
                    />
                    <button
                      onClick={() => {
                        if (content) {
                          if (user.balance > 7) {
                            dispatch(
                              userOffChat({
                                astroId: isChat.astro._id,
                                userId: user._id,
                                offChatId: isChat._id,
                                content,
                              })
                            ).then((e) => {
                              if (e.payload?.success) {
                                setIsChat(e.payload.chat);
                                alert("Your message sent successfully");
                              }
                              setContent("");
                            });
                          } else {
                            navigate(`/profile/${user._id}/wallet?p=addmoney`);
                          }
                        }
                      }}
                      className="btn btn-warning text-white"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="d-flex align-items-center justify-content-center h-100">
                <h1
                  className="text-center fw-bold fs-3 text-dark w-95"
                  style={{ maxWidth: "440px" }}
                >
                  No Chat selected if you want to see chat history then you need
                  to select chat
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default OffChats;
