import React from "react";
import styles from "./sessions/Sessions.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { FetchChat, getSession, userSession } from "../api/useReducer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MyClient() {
  const { astro } = useSelector((state) => state.user);
  const { chats, allMessages, UserSession } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const [session, setSession] = useState([]);
  const s = [...session].reverse();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // dispatch(FetchChat({ _id: astro._id }))
  }, []);
  // console.log(users)
  useEffect(() => {
    const b = () => {
      var a = [];
      session.forEach((e, i) => {
        if (i === 0) {
          a = [e.user];
        } else {
          if (e?.user) {
            // Check if the user is not already in the 'a' array
            const userNotInArray = a.every((j) => e.user._id !== j._id);
            if (userNotInArray) {
              a = [...a, e.user];
            }
          }
        }
      });
      setUsers(a);
    };

    // Only call b() if users.length is 0
    if (users.length === 0) {
      b();
    }
  }, [session, users]);
  useEffect(() => {
    astro._id &&
      dispatch(getSession({ id: astro?._id })).then((e) => {
        setSession(e.payload?.sessions);
      });
  }, [astro]);
  return (
    <div className="container">
      <div
        className={`styles.wrapper p-3`}
        // className="container"
        style={{ height: "calc(100vh - 55px)" }}
      >
        <div className="row mx-1">
          <div className="col-md-10">
            <div className="page-title-box my-3">
              <h4> Client Management</h4>

              {/* <ol className="breadcrumb m-0">
                <li className="breadcrumb-item active">Client Management</li>
                <li className="breadcrumb-item">Client List</li>
              </ol> */}
            </div>
          </div>
          <div className="col-md-2 d-flex align-items-center justify-content-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-success"
            >
              Back
            </button>
          </div>
        </div>
        <div className="card p-3 ">
          <div className="table-responsive my-3 p-0">
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>User ID</th>
                  <th>User Name</th>
                  <th>Zodiac</th>
                  <th>Birth Place</th>
                  <th>Birth Time</th>
                  <th>Total Earning</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={user?._id}>
                    <td>
                      <span
                        onClick={() => navigate(`/my-client/${user._id}`)}
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        {user?.id}
                      </span>
                    </td>

                    <td>
                      <span onClick={() => navigate(`/my-client/${user._id}`)}>
                        {user?.name}
                      </span>
                    </td>
                    <td>{user?.zodiac}</td>
                    <td>{user?.bp}</td>
                    <td>{user?.bt}</td>
                    <td>
                      <TotalEarning user={user} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* 
           
        </div> */}
    </div>
  );
}
const TotalEarning = ({ user }) => {
  const { astro } = useSelector((state) => state.user);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userSession({ astro: astro?._id, user: user?._id })).then((e) => {
      if (e.payload.success) {
        setTotal(
          e.payload.sessions.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.astroEarn;
          }, 0)
        );
      }
    });
  }, []);
  return (
    <>
      <span style={{color:total >= 0 ?"#4fc9da":"#f06445"}}>
        $ {parseFloat(total.toFixed(2))}
      </span>
    </>
  );
};
export default MyClient;
