import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogActive, getUserSession } from "../api/User";
import { ChatView, SessionTable, Star } from "./ChatReport";

function AstroPage() {
  const [page, setPage] = useState("session");
  const { id } = useParams();
  const dispatch = useDispatch();
  const [sessions, setSessions] = useState([]);
  const [h, setH] = useState({});
  const [log, setLog] = useState([]);
  useEffect(() => {
    id &&
      dispatch(getUserSession({ id: id, a: "shf" })).then((e) => {
        // setReviews(e.payload.sessions[0].astro.reviews)
        setSessions(e.payload.sessions);
      });
  }, [id]);
  useEffect(() => {
    page === "LogDetails" &&
      dispatch(LogActive({ id })).then(
        (e) => e.payload?.success && setLog([...e.payload.logs].reverse())
      );
  }, [page]);
  return (
    <>
      <div style={{ height: "calc(100vh - 70px)", overflowY: "scroll" }}>
        <div
          style={{
            display: "flex",
            gap: "20px",
            position: "sticky",
            top: "0px",
            padding: "20px",
            background: "var(--bg-yellow)",
          }}
        >
          <div
            onClick={() => setPage("session")}
            style={{
              background: "var(--yellow)",
              padding: "6px 20px",
              cursor: "pointer",
              fontWeight: "500",
              textTransform: "capitalize",
              fontSize: "20px",
              borderRadius: "6px",
            }}
          >
            {" "}
            sessions
          </div>
          {/* <div style={{ background: "var(--yellow)", padding: "6px 20px", cursor: "pointer", fontWeight: "500", textTransform: "capitalize", fontSize: "20px", borderRadius: "6px" }}>
                        invoice
                    </div> */}
          <div
            onClick={() => setPage("reviews")}
            style={{
              background: "var(--yellow)",
              padding: "6px 20px",
              cursor: "pointer",
              fontWeight: "500",
              textTransform: "capitalize",
              fontSize: "20px",
              borderRadius: "6px",
            }}
          >
            Reviews
          </div>
          <div
            onClick={() => setPage("LogDetails")}
            style={{
              background: "var(--yellow)",
              padding: "6px 20px",
              cursor: "pointer",
              fontWeight: "500",
              textTransform: "capitalize",
              fontSize: "20px",
              borderRadius: "6px",
            }}
          >
            Log Details
          </div>
        </div>
        {page === "session" && (
          <div style={{ padding: "20px", paddingTop: "0px" }}>
            <div
              style={{
                fontWeight: "500",
                paddingBottom: "20px",
                fontSize: "20px",
              }}
            >
              Astrologer Session
            </div>
            {sessions.length > 0 && <SessionTable f={sessions} setH={setH} />}
          </div>
        )}
        {page === "reviews" && (
          <div style={{ padding: "20px", paddingTop: "0px" }}>
            <div
              style={{
                fontWeight: "500",
                paddingBottom: "20px",
                fontSize: "20px",
              }}
            >
              Astrologer Reviews
            </div>

            <Reviews f={sessions} />
          </div>
        )}
        {page === "LogDetails" && (
          <div style={{ padding: "20px", paddingTop: "0px" }}>
                 <div
              style={{
                fontWeight: "500",
                paddingBottom: "20px",
                fontSize: "20px",
              }}
            >
              Log Details
            </div>
            <div className="table-responsive card">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Date/Time</th>
                    <th>Activity</th>
                  </tr>
                </thead>

                <tbody>
                  {log?.map((user, index) => (
                    <tr key={user._id}>
                      <td className="fs-7">
                        {user.createdAt.split("T").slice(0, 1)} ,{" "}
                        {new Date(user.createdAt).getHours()}:
                        {new Date(user.createdAt).getMinutes()}
                      </td>
                      {/* <td ><span  onClick={() => navigate(`/astro/${user.astro._id}`)}>{user.astro.name} </span></td> */}
                      <td>
                        <span className="fs-7">{user.isLogin ? "Login" : "LogOut"} </span>
                      </td>
                      {/* <td > <span className="digits">
                                    {("0" + Math.floor((user.timeInSeconds / 60) % 60)).slice(-2)}:
                                </span>
                                    <span className="digits">
                                        {("0" + Math.floor((user.timeInSeconds) % 60)).slice(-2)}
                                    </span></td> */}
                      {/* <td style={{}}>{user.review.user ?
                                    <>
                                        <p style={{ textAlign: "center", display: "flex", alignItems: "flex-start", gap: "3px", justifyContent: "center" }}>
                                            <span style={{ fontWeight: "700" }}>User : </span>
                                            <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
                                                <div>
                                                    <Star rating={user.review.rating} />
                                                </div>
                                                {user.review.comment}
                                            </div>
                                        </p>
                                    </>
                                    : user.reason !== "NaN" ?
                                        <>
                                            <p >
                                                <span style={{ fontWeight: "700" }}>Astro : </span>
                                                <span>{user.reason}</span>
                                            </p>
                                        </>
                                        :
                                        <></>}</td> */}
                      {/* <td style={{ textAlign: "center", padding: "0px", width: "60px" }}> <A id={user._id} /></td> */}
                      {/* <td > <FaEye size={25}  onClick={() => setH(user)} /></td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {h._id && <ChatView h={h} setH={setH} />}
      </div>
    </>
  );
}

const Reviews = ({ f }) => {
  return (
    <>
      <div className="table-responsive card">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Date/Time</th>
              <th>User</th>
              <th>comment</th>
              <th>Rating</th>
            </tr>
          </thead>

          <tbody>
            {f
              ?.filter((e) => e.review.comment || e.review.rating > 0)
              .map((user, index) => (
                <tr key={user._id}>
                  <td className="fs-7" >
                    {user.createdAt.split("T").slice(0, 1)} ,{" "}
                    {new Date(user.createdAt).getHours()}:
                    {new Date(user.createdAt).getMinutes()}
                  </td>
                  {/* <td ><span  onClick={() => navigate(`/astro/${user.astro._id}`)}>{user.astro.name} </span></td> */}
                  <td className="fs-7" >
                    <span className="fs-7" >{user?.user?.name} </span>
                  </td>
                  <td className="fs-7" >
                    <span className="fs-7" >{user?.review?.comment} </span>
                  </td>
                  <td>
                    <span className="fs-7" >
                      <Star rating={user.review.rating} />{" "}
                    </span>
                  </td>
                  {/* <td > <span className="digits">
                                    {("0" + Math.floor((user.timeInSeconds / 60) % 60)).slice(-2)}:
                                </span>
                                    <span className="digits">
                                        {("0" + Math.floor((user.timeInSeconds) % 60)).slice(-2)}
                                    </span></td> */}
                  {/* <td style={{}}>{user.review.user ?
                                    <>
                                        <p style={{ textAlign: "center", display: "flex", alignItems: "flex-start", gap: "3px", justifyContent: "center" }}>
                                            <span style={{ fontWeight: "700" }}>User : </span>
                                            <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
                                                <div>
                                                    <Star rating={user.review.rating} />
                                                </div>
                                                {user.review.comment}
                                            </div>
                                        </p>
                                    </>
                                    : user.reason !== "NaN" ?
                                        <>
                                            <p >
                                                <span style={{ fontWeight: "700" }}>Astro : </span>
                                                <span>{user.reason}</span>
                                            </p>
                                        </>
                                        :
                                        <></>}</td> */}
                  {/* <td style={{ textAlign: "center", padding: "0px", width: "60px" }}> <A id={user._id} /></td> */}
                  {/* <td > <FaEye size={25}  onClick={() => setH(user)} /></td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AstroPage;
