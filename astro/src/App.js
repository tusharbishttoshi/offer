import React, { useEffect, useRef, useState } from "react";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";
import Login from "./pages/LoginPage/Login";
import { useSyncExternalStore } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  TokenLogin,
  ClientRequestsAdd,
  ClientRequestsRemove,
  CreateChat,
  busy,
  Cancel,
} from "./api/useReducer";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import Dashboard from "./pages/DashBoard/Dashboard";
import Chats from "./pages/chat/Chats";
import Sessions from "./pages/sessions/Sessions";
import io from "socket.io-client";
import ChatHistory from "./pages/ChatHistory";
import Workflow from "./pages/Workflow";
import Salary from "./pages/Salary";
import UserActivity from "./pages/UserActivity";
import ring from "./one.mpeg";
import useSound from "use-sound";
import SessionsChat from "./pages/SessionsChat";
import Review from "./pages/Review";
import OffChats from "./pages/OffChata";
import Transition from "./pages/Transition";
import MyClient from "./pages/MyClient";
import ClientSession from "./pages/ClientSession";
import LoginActivity from "./pages/LoginActivity";
import Rejected from "./pages/Rejected";
import Invoice from "./pages/Invoice";

// const baseUrl = "http://localhost:8000/"
// const baseUrl = "http://193.203.162.221:8000/"
const baseUrl = "https://api.unzziptruth.com/";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const a = async () => {
      const token = await localStorage.getItem("AstroToken");
      if (token) {
        dispatch(TokenLogin({ token }));
      }
    };
    a();
  }, []);

  const { astro } = useSelector((state) => state.user);
  const socketRef = useRef();
  const [userRequest, setUserRequest] = useState({});
  const [chat, setChat] = useState({});

  const [playActive, { stop }] = useSound(ring, { volume: 0.25 });
  let astroOnline = localStorage.getItem("astroOnline");

  
  useEffect(() => {
    if (astro?._id) {
      // Establish socket connection
      socketRef.current = io(baseUrl, {
        auth: {
          id: astro._id,
          user:"astro",
          astroOnline
        },
      });

      // Emit 'setup' event with astro._id as payload
      socketRef.current.emit("setup", astro._id);

      // Listen for connection and disconnection events
      socketRef.current.on("connect", () => {
        // console.log("Socket connected");
      });

      socketRef.current.on("disconnect", () => {
        // console.log("Socket disconnected");
      });

      socketRef.current.on("connect_error", (error) => {
        console.log("Socket connection error:", error);
      });
    }

    // Cleanup function to disconnect the socket when component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log("Socket disconnected");
      }
    };
  }, [astro, baseUrl]);

  useEffect(() => {
    if (astro?._id) {
      socketRef.current?.on("receiveRequest", ({ user }) => {
        !chat._id && setUserRequest(user);
        !userRequest._id && playActive();
        console.log("receiveRequest");
      });

      socketRef.current?.on("stoppedChat", () => {
        dispatch(busy({ id: astro._id, work: "Online" })).then(
          () => window.location.reload(),
          console.log("stop chat")
        );

        setChat({});
      });
      socketRef.current?.on("withdrawRequest", () => {
        setUserRequest({});
      });
    }
  });

  useEffect(() => {
    if (!userRequest._id) {
      stop();
    }
  }, [userRequest._id, stop]);


  return (
    <>
      {userRequest._id && (
        <Model
          stop={stop}
          setUserRequest={setUserRequest}
          setChat={setChat}
          astro={astro}
          userRequest={userRequest}
          socketRef={socketRef}
        />
      )}

      <Routes>
        <Route
          exact
          path="/*"
          element={
            <ProtectedRoutes socketRef={socketRef}>
              <Routes>
                <Route exact path="/" element={<Dashboard />} />
                <Route exact path="/Dashboard" element={<Dashboard />} />

                <Route exact path="/chat-history" element={<ChatHistory />} />
                <Route exact path="/offline-request" element={<OffChats />} />
                <Route exact path="/review" element={<Review />} />
                <Route exact path="/sessions" element={<Sessions />} />
                <Route exact path="/sessions/:id" element={<SessionsChat />} />
                <Route exact path="/workflow" element={<Workflow />} />
                <Route exact path="/transaction" element={<Salary />} />
                <Route
                  exact
                  path="/user-activity"
                  element={<LoginActivity />}
                />
                <Route exact path="/Transition" element={<Transition />} />
                <Route exact path="/my-client" element={<MyClient />} />
                <Route
                  exact
                  path="/my-client/:id"
                  element={<ClientSession />}
                />
                <Route exact path="/rejected" element={<Rejected />} />
                <Route exact path="/invoice" element={<Invoice />} />
                {/* {/ <Route exact path='/user-activity' element={<UserActivity />} /> /} */}
                <Route exact path="/*" element={<Error />} />
              </Routes>
            </ProtectedRoutes>
          }
        />
        <Route
          exact
          path="/current-chat"
          element={
            <Chats socketRef={socketRef} setChat={setChat} chat={chat} />
          }
        />
      </Routes>
    </>
  );
}

const Model = ({
  stop,
  setUserRequest,
  userRequest,
  socketRef,
  astro,
  setChat,
}) => {
  const [timer, setTimer] = useState(59);

  const dispatch = useDispatch();
  if (timer === 0) {
    stop();
    dispatch(
      Cancel({
        astro: astro._id,
        user: userRequest._id,
        reason: "Astro Time Out",
      })
    );
    socketRef.current.emit("rejectRequest", {
      clientId: userRequest._id,
      astro: astro._id,
    });
    setUserRequest({});
  }
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
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
          zIndex: "10000",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div
          style={{
            height: "100px",
            width: "100px",
            borderRadius: "50%",
            border: `10px solid ${
              timer > 30 ? "#27ccb3" : timer > 15 ? "#2688eb" : "#eb2626"
            }`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ fontSize: "28px", color: "var(--dark)" }}>{timer}</p>
        </div>
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
          >
            <img
              src={userRequest?.avatar?.url}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div>{userRequest.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div
            onClick={() => {
              setUserRequest({});
              stop();
              dispatch(
                Cancel({
                  astro: astro._id,
                  user: userRequest._id,
                  reason: "Astro Reject chat",

                  time: 60 - timer,
                })
              );

              socketRef.current.emit("rejectRequest", {
                clientId: userRequest._id,
                astro: astro._id,
              });
            }}
            style={{
              border: "2px solid var(--dark)",
              borderRadius: "6px",
              padding: "6px 20px",
              cursor: "pointer",
            }}
          >
            Cancel
          </div>
          <div
            onClick={() => {
              dispatch(busy({ id: astro._id }));
              dispatch(
                CreateChat({ astroId: astro._id, myId: userRequest._id })
              ).then((e) => {
                if (e.payload.success) {
                  navigate(`/current-chat`);
                  setChat(e.payload.chat);
                  setUserRequest({});
                  console.log("created cat", e.payload.chat);
                  stop();
                  socketRef.current.emit("rejectRequest", {
                    clientId: userRequest._id,
                    astro: astro._id,
                  });
                  socketRef.current.emit("charRedirect", {
                    path: e.payload.chat._id,
                    astro: astro,
                    userId: userRequest._id,
                  });
                }
              });
            }}
            style={{
              background: "var(--dark)",
              color: "var(--white)",
              textAlign: "center",
              borderRadius: "6px",
              padding: "6px 20px",
              cursor: "pointer",
            }}
          >
            Chat
          </div>
        </div>
      </div>
    </>
  );
};

const Error = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      <h1 style={{ fontSize: "5rem" }}>404</h1>
      <h6 style={{ fontSize: "3rem" }}>page Not Found</h6>
    </div>
  );
};

export default App;
