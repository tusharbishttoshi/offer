import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";
import moment from "moment";
import Swal from "sweetalert2";
import CustomLoader from "../Componets/CustomLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateReason() {
  const navigate = useNavigate();
  //   const {_id} = useParams();
  const location = useLocation();
  const { state } = location;
  console.log({ state });
  //   new code

  const [Loader, setLoader] = useState(false);

  const UpdateReason = async (e) => {
    setLoader(true);
    e.preventDefault();
    const data = new FormData(e.target);
    const formValues = Object.fromEntries(data.entries());

    try {
      const response = await axios.put(`/api/v1/reason/update`, formValues);
      console.log("data", response?.data);

      if (response?.data?.success) {
        setLoader(false);

        toast.success("Reason Update successfully");
        setTimeout(() => {
          navigate("/Reason-Management-list");
        }, 1000);
      } else {
        toast.error(response?.data?.message);
        setLoader(false);
      }
    } catch (err) {
      // Handle error
      toast.error("Failed to Update reason");
    }
  };

  return (
    <>
      <div className="container p-2">
        <ToastContainer />
        <div className="row  m-2">
          <div className="col-md-10">
            <div className="page-title-box">
              <h4>Reason Management</h4>
              {/* <ol className="breadcrumb m-0">
                <li className="breadcrumb-item active">Reason Management</li>
                <li className="breadcrumb-item active">Reason Update</li>
              </ol> */}
            </div>
          </div>
          <div className="col-md-2 text-end">
            <Link to="#" onClick={() => navigate(-1)}>
              <button type="button" className="btn-dark btn text-white">
                Back
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-white p-3 rounded mt-md-3">
          {Loader ? (
            <CustomLoader Loder={Loader} />
          ) : (
            <form onSubmit={UpdateReason} className="p-md-5 m-md-5">
              <div class="mb-3">
                <label for="exampleInputtitle1" class="form-label">
                  Title
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputtitle1"
                  placeholder="Enter the Title"
                  name="title"
                  defaultValue={state?.title}
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Description
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter the Description"
                  name="description"
                  defaultValue={state?.description}
                />
                <input
                  type="hidden"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter the Description"
                  name="id"
                  defaultValue={state?._id}
                />
              </div>

              <button type="submit" class="btn btn-warning ">
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
