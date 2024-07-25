import React from "react";
import styles from "./NavBar.module.css";
import { IoIosLogIn } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { FaPlay } from "react-icons/fa";
import {
  StartWork,
  StopWork,
  AstroStartWork,
  AstroStopWork,
  busy,
  TokenLogin,
} from "../../api/useReducer";
import { FaBell } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
function NavBar({ socketRef }) {
  const token = localStorage.getItem("AstroToken");
  // const baseUrl = "193.203.162.221:8000";
  const baseUrl = "https://api.unzziptruth.com/";
  const dispatch = useDispatch();
  // const socketRef = useRef();
  const { ClientRequests, astro, s } = useSelector((state) => state.user);

  const [isOnline, setIsOnline] = useState(
    astro.isOnline === "Online" ? true : false
  );

  const [AllLogActivity, setAllLogActivity] = useState(null);

  const AllLogFilter = async (e) => {
    try {
      const response = await axios.post(`/api/v1/astro/workId`, {
        id: astro._id,
      });
      let Data = response?.data?.workId;
      if (Data) {
        setAllLogActivity(Data);
        console.log({ Data });
      }
    } catch (err) {}
  };

  useEffect(() => {
    AllLogFilter();
  }, [astro._id]);

  socketRef.current?.on("offline", ({ id }) => {
    console.log("liveAstro", { id });
    if (token) {
      // dispatch(TokenLogin({ token }));
    }
  });

  // useEffect(() => {
  //   if (astro?._id) {
  //     // Establish socket connection
  //     socketRef.current = io(baseUrl, {
  //       auth: {
  //         id: astro._id,
  //         user: "astro",
  //         astroOnline,
  //       },
  //     });

  //     // Emit 'setup' event with astro._id as payload
  //     socketRef.current.emit("setup", astro._id);

  //     // Listen for connection and disconnection events
  //     socketRef.current.on("connect", () => {
  //       console.log("Socket connected");
  //     });

  //     socketRef.current.on("disconnect", () => {
  //       console.log("Socket disconnected");
  //     });

  //     socketRef.current.on("connect_error", (error) => {
  //       console.log("Socket connection error:", error);
  //     });
  //   }

  //   // Cleanup function to disconnect the socket when component unmounts
  //   return () => {
  //     if (socketRef.current) {
  //       socketRef.current.disconnect();
  //       console.log("Socket disconnected");
  //     }
  //   };
  // }, [astro, baseUrl]);

  // const [Model, setModel] = useState("")

  // useEffect(() => {
  //   if (!isOnline) {
  //     socketRef.current?.on("endTime", () => {
  //       dispatch(
  //         AstroStopWork({
  //           id: astro._id,
  //           workId: s._id || AllLogActivity?._id,
  //         })
  //       );
  //     });
  //   }
  //   socketRef.current?.on("startTime", () => {
  //     dispatch(
  //       AstroStartWork({
  //         id: astro._id,
  //         workId: s._id || AllLogActivity?._id,
  //       })
  //     );
  //   });

  // });
  useEffect(() => {
    console.log({ astro });
    setIsOnline(astro.isOnline === "Online" ? true : false);
  }, [astro]);
  return (
    <>
      <div className={styles.top}>
        <div className={styles.left}></div>
        <div className={styles.right}>
          {isOnline ? (
            <>
              <div
                className={styles.workButton}
                onClick={async () => {
                  try {
                    socketRef.current.emit("endTime", {
                      id: astro._id,
                    });

                    const stopWorkAction = await dispatch(
                      StopWork({
                        id: astro._id,
                        workId: s._id || AllLogActivity?._id,
                      })
                    );
                    setIsOnline(false);
                    localStorage.removeItem("astroOnline");
                  } catch (error) {
                    console.error("Error:", error);
                  }
                }}
              >
                <div className={styles.d}></div>
                <p className={styles.workText} style={{ display: "contents" }}>
                  Stop work
                </p>
              </div>
            </>
          ) : (
            <>
              <div
                className={styles.workButton}
                style={{ backgroundColor: "green" }}
                onClick={async () => {
                  socketRef.current.emit(
                    "startTime",
                    { id: astro._id },
                    (data) => {
                      console.log({ data });
                    }
                  );

                  try {
                    const startWorkAction = await dispatch(
                      StartWork({ id: astro._id })
                    );
                    setIsOnline(true);

                    let astroOnline = localStorage.setItem("astroOnline", true);
                  } catch (error) {
                    console.error("Error:", error);
                  }
                }}
              >
                <FaPlay color="white" />
                <p className={styles.workText} style={{ display: "contents" }}>
                  start work
                </p>
              </div>
            </>
          )}
          <div
            className={styles.icon}
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            <IoIosLogIn size={30} className={styles.icons} />
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
