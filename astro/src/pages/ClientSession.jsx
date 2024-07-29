import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { userSession } from "../api/useReducer";
import styles from "./sessions/Sessions.module.css";
import { useState } from "react";
import { FaRegStar, FaStar, FaEye } from "react-icons/fa";
import axios from "axios";

function ClientSession() {
  const { astro } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState([]);

  useEffect(() => {
    id &&
      dispatch(userSession({ astro: astro._id, user: id })).then((e) => {
        if (e.payload.success) {
          setSession([...e.payload.sessions].reverse());
          //     setTotal(e.payload.sessions.reduce((accumulator, currentValue) => {
          //         return accumulator + currentValue.astroEarn;
          //     }, 0))
        }
      });
  }, [id]);

  const [Loader, setLoader] = useState(true);

  const [AllSessionData, setAllSessionData] = useState();

  const AllSessionApi = async () => {
    setLoader(true);
    try {
      const response = await axios.post(`/api/v1/sessions/user`, {
        astro: astro._id,
        user: id,
      });
      let Data = response?.data?.sessions;
      console.log({ Data });
      if (response?.data?.success) {
        setLoader(false);
        setAllSessionData(Data);

        // const total = response.data.count;
        // const totalPage = Math.ceil(total / 10);
        // console.log({ totalPage });
        // setpageCount(totalPage || 0);
      }
    } catch (err) {}
  };

  useEffect(() => {
    AllSessionApi();
  }, []);

  return (
    <>
      <div
        className={styles.wrapper}
        style={{
          overflow: "scroll",
          height: "calc(100vh - 55px)",
          marginTop: "1rem",
        }}
      >
        <div className="container">
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


            <div className="card p-3 ">
            <div className="col-md-12">
              <div className="row bg-white  rounded">
                <div className="col-md-3 rounded border-end ">
                  {" "}
                  <div class="card-body text-center ">
                    <img
                      src={AllSessionData?.avatar?.url || ""}
                      alt="avatar"
                      class="rounded-circle img-fluid"
                      style={{ width: "100px" }}
                    />
                    <h5 class="my-3">{AllSessionData?.name}</h5>
                    <p class="text-muted mb-1">
                      ID: {AllSessionData?.id}
                    </p>
                  </div>
                </div>
                <div className="col-md-9 ">
                  <div className="row gx-2">
                    <div className="col-md-12 border-bottom">
                      <div className="row">
                        <div className="col-md-4">
                          <p>
                            <strong>Email</strong>
                          </p>
                          <p>{AllSessionData?.email}</p>
                        </div>

                        <div className="col-md-4">
                          <p>
                            <strong>Date of birth</strong>
                          </p>
                          <p>{AllSessionData?.dob}</p>
                        </div>
                        <div className="col-md-4">
                          <p>
                            <strong> Birth Place</strong>
                          </p>
                          <p>{AllSessionData?.bp}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 border-bottom">
                      <div className="row mt-3">
                        <div className="col-md-4">
                          <p>
                            <strong>Birth Time</strong>
                          </p>
                          <p>{AllSessionData?.bt}</p>
                        </div>

                        <div className="col-md-4">
                          <p>
                            <strong>Zodiac Signs</strong>
                          </p>
                          <p>{AllSessionData?.zodiac}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="table-responsive my-3 p-0">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Session ID</th>
                    <th>Transition ID</th>
                    <th>Date/Time</th>
                    <th>User</th>
                    <th>Duration</th>
                    <th>Earn</th>
                    <th>Type</th>
                    <th>View</th>
                  </tr>
                </thead>

                <tbody style={{ overflow: "scroll" }}>
                  {AllSessionData?.session?.map((user, i) => (
                    <tr key={user._id} style={{ cursor: "pointer" }}>
                      <td>{user.id + 100000}</td>
                      <td>{user.transactionID}</td>
                      <td>
                        {user.createdAt.split("T").slice(0, 1)} ,{" "}
                        {new Date(user.createdAt).getHours()}:
                        {new Date(user.createdAt).getMinutes()}
                      </td>
                      <td>{AllSessionData?.name} </td>
                      <td>
                        {" "}
                        <span className="digits">
                          {(
                            "0" + Math.floor((user.timeInSeconds / 60) % 60)
                          ).slice(-2)}
                          :
                        </span>
                        <span className="digits">
                          {("0" + Math.floor(user.timeInSeconds % 60)).slice(
                            -2
                          )}
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
          {/* 
               
            </div> */}
        </div>
      </div>
    </>
  );
}

export default ClientSession;
