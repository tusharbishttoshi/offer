import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";
import moment from "moment";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import CustomLoader from "../Componets/CustomLoader";

import { AdminFetchChat, getSession } from "../../api/User";

import { useDispatch } from "react-redux";
import { FaAngleLeft } from "react-icons/fa";
export default function ChatViewReport() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [Loader, setLoader] = useState(true);
  console.log({ state });
  useEffect(() => {
    const fetchMessages = async () => {
      if (!state?._id) return;
      const response = await dispatch(
        AdminFetchChat({ astro: state?.astro, user: state?.user })
      );
      if (response.payload.success) {
        console.log(response.payload);
        setLoader(false);
        setMessages(response.payload.messages);
      }
    };
    fetchMessages();
  }, [state, dispatch]);
  return (
    <div className="container p-2">
      <ToastContainer />
      <div className="row  m-2">
        <div className="col-md-10">
          <div className="page-title-box">
            <h4>Chat History</h4>
            {/* <ol className="breadcrumb m-0">
              <li className="breadcrumb-item active">Chat Management</li>
              <li className="breadcrumb-item active">Chat History</li>
            </ol> */}
          </div>
        </div>
        <div className="col-md-2 text-end">
          <Link className="text-white" to="#">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn text-white btn-dark"
            >
              Back
            </button>
          </Link>
        </div>
      </div>

      {Loader ? (
        <CustomLoader Loder={Loader} />
      ) : (
        <div className="card">
          <div className="d-flex bg-white flex-row  card justify-content-between align-items-center p-3">
            <p className="fs-2 font-weight-bold m-0">{state?.astro_name || state?.
astro?.name}</p>

            <p className="fs-2 font-weight-bold m-0">
              <span className="digits">
                {("0" + Math.floor((state?.timeInSeconds / 60) % 60)).slice(-2)}
                :
              </span>
              <span className="digits">
                {("0" + Math.floor(state?.timeInSeconds % 60)).slice(-2)}
              </span>
            </p>
            <p className="fs-2 font-weight-bold m-0">
              {state?.user_name || state?.userinfo?.name}
            </p>
          </div>

          <div className="flex-grow-1  py-3 px-5">
            {messages.map((message) => (
              <div
                key={message._id}
                className={`d-flex flex-column ${
                  state?.user !== message.sender
                    ? "align-items-end"
                    : "align-items-start"
                }`}
              >
                <p
                  className="rounded px-3 py-2 fs-6 mb-1"
                  style={{
                    backgroundColor:
                      state?.user  === message.sender ? "#ffcaca" : "#cacaff",
                  }}
                >
                  {message.content}
                </p>
                <p className="text-black-50 fs-7 mb-0">
                  {message.createdAt.split("T").slice(0, 1)}{" "}
                  {new Date(message.createdAt).getHours()}:
                  {new Date(message.createdAt).getMinutes()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
