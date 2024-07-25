import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { AdminFetchChat } from "../api/useReducer";
import { FaAngleLeft } from "react-icons/fa6";
function SessionsChat() {
  const { id } = useParams();
  const location = useLocation();
  const userData = location.state;
  console.log({ userData });
  const { astro, session } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [singleSession, setSingleSession] = useState({});
  const [m, setM] = useState([]);
  const endDate = new Date(singleSession.createdAt);
  const startDate = new Date(
    endDate.getTime() - (singleSession.timeInSeconds + 10) * 1000
  );
  const fm = m.filter((e) => {
    const date = new Date(e.createdAt);
    if (date > startDate && date < endDate) {
      return e;
    } else {
      return e;
    }
  });
  console.log({ fm })
  const dispatch = useDispatch();
  useEffect(() => {
    singleSession._id &&
      dispatch(
        AdminFetchChat(
          userData?.isOnline
            ? {
              astro: singleSession.astro?._id || singleSession.astro,
              user: singleSession.user?._id || singleSession.user,
            }
            : {
              astro: singleSession.astro?._id || singleSession.astro,
              user: singleSession.user?._id || singleSession.user,
              session_id: id,
              offline: true,
            }
        )
      ).then((e) => e.payload.success && setM(e.payload.messages));
  }, [singleSession]);

  useEffect(() => {
    const sess = session.find((e) => e._id === id);

    if (sess?._id) {
      setSingleSession(sess);
    } else {
      alert("dispatch single sessions");
    }
  }, [id]);

  console.log({ singleSession });
  return (
    <div style={{ height: "calc(100vh - 55px)", overflow: "scroll" }}>
      <div
        style={{
          height: "70px",
          background: "var(--white)",
          alignItems: "center",
          padding: "0px 20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
            onClick={() => navigate(-1)}
          >
            <FaAngleLeft /> Back
          </div>
          <span
            style={{
              fontWeight: "600",
              fontSize: "20px",
              textTransform: "uppercase",
            }}
          >
            {/* {singleSession?.user?.name} */}
          </span>
        </div>
        <div>
          <span className="digits">
            {("0" + Math.floor((singleSession.timeInSeconds / 60) % 60)).slice(
              -2
            )}
            :
          </span>
          <span className="digits">
            {("0" + Math.floor(singleSession.timeInSeconds % 60)).slice(-2)}
          </span>
        </div>
        <div
          style={{
            fontWeight: "600",
            fontSize: "20px",
            textTransform: "uppercase",
          }}
        >
          {singleSession.astro?.name || astro.name}
        </div>
      </div>

      <div className="card p-3 ">
        <div className="col-md-12 mx-3">
          <div className="row bg-white p-3 rounded">
            <div className="col-md-3 ">
              {" "}
              <div class="card-body text-center">
                <img
                  src={singleSession?.user?.avatar?.url || ""}
                  alt="avatar"
                  class="rounded-circle img-fluid"
                  style={{ width: "150px" }}
                />
                <h5 class="my-3">{singleSession?.user?.name}</h5>
                <p class="text-muted mb-1">ID: {singleSession?.user?.id}</p>
              </div>
            </div>
            <div className="col-md-9">
              <div className="row">
                {/* <div className="col-md-4">
                  <p>
                    <strong>Email</strong>
                  </p>
                  <p>{singleSession?.user?.email}</p>
                </div> */}

                <div className="col-md-4">
                  <p>
                    <strong>Date of birth</strong>
                  </p>
                  <p>{singleSession?.user?.dob}</p>
                </div>
                <div className="col-md-4">
                  <p>
                    <strong> Birth Place</strong>
                  </p>
                  <p>{singleSession?.user?.bp}</p>
                </div>

                <div className="col-md-4">
                  <p>
                    <strong>Birth Time</strong>
                  </p>
                  <p>{singleSession?.user?.bt}</p>
                </div>

                <div className="col-md-4">
                  <p>
                    <strong>Zodiac Signs</strong>
                  </p>
                  <p>{singleSession?.user?.zodiac}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "3px",
            justifyContent: "flex-end",
            padding: "10px",
          }}
        >
          {fm.map((e) => (
            <div
              style={{
                gap: "2px",
                display: "flex",
                flexDirection: "column",
                alignItems: astro._id !== e.sender ? "flex-end" : "flex-start",
                maxWidth: "85%",
                alignSelf: astro._id !== e.sender ? "flex-end" : "flex-start",
              }}
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
                  style={{
                    backgroundColor:
                      astro._id === e.sender ? "#ffcaca" : "#cacaff",
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default SessionsChat;
