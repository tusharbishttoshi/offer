import React, { useEffect } from "react";
import styles from "./sessions/Sessions.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getSession } from "../api/useReducer";
import { useNavigate } from "react-router-dom";
import { FaRegStar, FaStar, FaEye } from "react-icons/fa";
function Sessions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { astro, session } = useSelector((state) => state.user);
  const s = [...session].reverse();
  useEffect(() => {
    astro._id && dispatch(getSession({ id: astro._id }));
  }, [astro]);
  return (
    <div
      className={`styles.wrapper p-3`}
      // className="container"
      style={{ height: "calc(100vh - 55px)" }}
    >

<div className="row mx-1">
        <div className="col-md-10">
          <div className="page-title-box my-3">
            <h4>Reviews Management</h4>
{/* 
            <ol className="breadcrumb m-0">
              <li className="breadcrumb-item active">Reviews Management</li>
              <li className="breadcrumb-item">Reviews List</li>
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
      <div
     
        className={`table-responsive `}
      >
        <table class="table table-striped">
          <thead>
            <tr>
              <th>session id</th>
              <th>Date/Time</th>
              <th>User</th>
              <th>Type</th>
              <th>FeedBack</th>
              <th>Rating</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
            {s
              ?.filter((e) => e.review.rating || e.review.comment)
              .map((user, i) => (
                <tr key={user._id}>
                  <td>{user.id}</td>
                  <td>
                    {user.createdAt.split("T").slice(0, 1)} ,{" "}
                    {new Date(user.createdAt).getHours()}:
                    {new Date(user.createdAt).getMinutes()}
                  </td>
                  <td>{user?.user?.name} </td>

                  <td>{user.isOnline ? "Online" : "Offline"}</td>
                  <td>
                    {user.review.user ? (
                      <>
                        <p
                          style={{
                            textAlign: "center",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "3px",
                            justifyContent: "center",
                          }}
                        >
                          <span>User : </span>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "0px",
                            }}
                          >
                            {user.review.comment}
                          </div>
                        </p>
                      </>
                    ) : user.reason !== "NaN" ? (
                      <>
                        <p>
                          <span>Astro : </span>
                          <span>{user.reason}</span>
                        </p>
                      </>
                    ) : (
                      <></>
                    )}
                  </td>

                  <td> {user.review.rating}</td>
                  <td>
                    {" "}
                    <FaEye
                      size={25}
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/sessions/${user._id}`)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
  
    </div>
    </div>
  );
}
export const Star = ({ rating }) => {
  return (
    <>
      {[...Array(5)].map((e, i) => {
        return <>{i + 1 > rating ? <FaRegStar /> : <FaStar />}</>;
      })}
    </>
  );
};
export default Sessions;
