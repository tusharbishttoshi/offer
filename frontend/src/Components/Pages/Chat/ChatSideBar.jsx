import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowLeft, FaBars, FaSearch } from "react-icons/fa";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CreateChat, FetchChat, FetchMessage } from "../../../api/chatReducer";
import { NavBar } from "../../Component/All";

function ChatSideBar({ children }) {
  const scrollableDivRef = useRef(null);

  const [chats, setChats] = useState([]);
  const { allMessages } = useSelector((state) => state?.chat);
  useEffect(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop =
        scrollableDivRef.current.scrollHeight;
    }
  }, [allMessages]);

  const { user } = useSelector((state) => state?.userLog);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isChat, setIsChat] = useState({});
  useEffect(() => {
    isChat._id && dispatch(FetchMessage({ id: isChat._id }));
  }, [isChat]);
  useEffect(() => {
    // !user._id && navigate("/auth?login=true");
    user?._id &&
      dispatch(FetchChat({ _id: user._id })).then((e) => {
        const a = [...e?.payload.chats];
        setChats(
          a.sort((a, b) => {
            if (a?.latestMessage?.createdAt && b?.latestMessage?.createdAt) {
              return (
                new Date(b?.latestMessage?.createdAt) -
                new Date(a?.latestMessage?.createdAt)
              );
            } else {
              return new Date(b?.createdAt) - new Date(a?.createdAt);
            }
          })
        );
      });
  }, [user]);
  useEffect(() => {
    setIsChat({});
  }, []);
  return (
    <>
      <NavBar />
      <div className="container  rounded p-3 bg-white vh-100 overflow-hidden">
        <div className="row g-3">
          <div
            className="col-md-2 col-lg-2 p-2 col-12 d-flex flex-column align-items-center border overflow-auto"
            // style={{ height: "500px", paddingBottom: "20px" }}
          >
            <div className="w-100 d-flex flex-column align-items-center gap-3 ">
              <div
                onClick={() => navigate(-1)}
                className="d-flex align-items-center gap-3 bg-warning text-white p-2 rounded w-90 cursor-pointer w-100"
              >
                <FaArrowLeft size={22} />
                <div className="fw-bold fs-5">Back</div>
              </div>
              {chats?.map((e) => (
                <div
                  key={e?._id}
                  onClick={() => setIsChat(e)}
                  className="d-flex align-items-center gap-3 bg-warning text-white p-2 rounded w-100 cursor-pointer"
                >
                  <div
                    className="rounded-circle bg-danger overflow-hidden"
                    style={{ height: "50px", width: "50px" }}
                  >
                    <img
                      src={e?.astro?.avatar?.url}
                      className="w-100 h-100 object-fit-cover"
                      alt=""
                    />
                  </div>
                  <div className="flex-grow-1 overflow-hidden">
                    <p className="mb-1">{e?.astro?.name}</p>
                    <p className="text-truncate">{e?.latestMessage?.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-10 col-lg-10 col-12 border rounded">
            {isChat._id ? (
              <>
                <div className="d-flex justify-content-between align-items-center bg-light p-3 sticky-top">
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="rounded-circle bg-danger overflow-hidden"
                      style={{ height: "50px", width: "50px" }}
                    >
                      <img
                        src={isChat?.astro?.avatar?.url}
                        className="w-100 h-100 object-fit-cover"
                        alt=""
                      />
                    </div>
                    <div>
                      <p className="fw-bold">{isChat?.astro?.name}</p>
                    </div>
                  </div>
                </div>
                <div
                  ref={scrollableDivRef}
                  className="d-flex flex-column justify-content-end p-3 gap-2"
                  style={{ height: "calc(100% - 120px)" }}
                >
                  <div style={{height: "500px" , overflowY: "auto" }}>
                    {allMessages?.map((e) => (
                      <div
                        key={e._id}
                        className={`d-flex flex-column align-items-${
                          user._id === e?.sender ? "end" : "start"
                        }`}
                      >
                        {e?.avatar?.url && (
                          <img
                            src={e?.avatar?.url}
                            alt="image"
                            className="img-fluid"
                            style={{ width: "100px", height: "100px" }}
                          />
                        )}
                        {e.content && (
                          <p
                            className={`p-2 rounded ${
                              user._id !== e.sender
                                ? "bg-warning"
                                : "bg-primary text-white"
                            }`}
                          >
                            {e.content}
                          </p>
                        )}
                        <p className="small text-muted">
                          {new Date(e?.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="d-flex align-items-center justify-content-center position-relative">
                <h1
                  className="text-center fw-bold"
                  style={{ fontSize: "25px", maxWidth: "440px" }}
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

export default ChatSideBar;
