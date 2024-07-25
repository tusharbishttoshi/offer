import React, { useEffect } from "react";
import styles from "./Sessions.module.css";
import NavBar from "../../components/ProtectedRoutes/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getSession } from "../../api/useReducer";
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
    <div className="container">
      <div
        className={`styles.wrapper p-3`}
        // className="container"
        style={{ height: "calc(100vh - 55px)" }}
      >
     


     <div className="row mx-1">
          <div className="col-md-10">
            <div className="page-title-box my-3">
              <h4> Session Management</h4>

              {/* <ol className="breadcrumb m-0">
                <li className="breadcrumb-item active">Session Management</li>
                <li className="breadcrumb-item">Session List</li>
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
              <thead>
                <tr>
                  <th>Session ID</th>
                  <th>Date/Time</th>
                  <th>User</th>
                  <th>Duration</th>
                  <th>Earn</th>
                  <th>Type</th>
                  <th>View</th>
                </tr>
              </thead>

              <tbody style={{ overflow: "scroll" }}>
                {s?.map((user, i) => (
                  <tr key={user._id} style={{ cursor: "pointer" }}>
                    <td>{user.id}</td>
                    <td>
                      {user.createdAt.split("T").slice(0, 1)} ,{" "}
                      {new Date(user.createdAt).getHours()}:
                      {new Date(user.createdAt).getMinutes()}
                    </td>
                    <td>{user?.user?.name} </td>
                    <td>
                      {" "}
                      <span className="digits">
                        {(
                          "0" + Math.floor((user.timeInSeconds / 60) % 60)
                        ).slice(-2)}
                        :
                      </span>
                      <span className="digits">
                        {("0" + Math.floor(user.timeInSeconds % 60)).slice(-2)}
                      </span>
                    </td>
                    <td style={{color:user?.astroEarn >= 0 ?"#4fc9da":"#f06445"}}>
                        ${parseFloat(user?.astroEarn.toFixed(2))}
                      </td>
                      <td>
                        <div
                          className={
                            !user?.amount
                              ? user?.isOnline
                                ? "badge badge-light-success fw-bold fs-6"
                                : "badge badge-light fw-bold"
                              : ""
                          }
                        >
                          {!user?.amount
                            ? user?.isOnline
                              ? "Online"
                              : "Offline"
                            : ""}
                        </div>
                      </td>
                    <td>
                      {" "}
                      <FaEye
                        size={25}
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/sessions/${user._id}`,{state:user})}
                      />
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
