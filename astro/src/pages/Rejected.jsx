import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { LogActive, userSession } from "../api/useReducer";
import styles from "./sessions/Sessions.module.css";
import { useState } from "react";
import { FaRegStar, FaStar, FaEye } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import axios from "axios";
import moment from "moment";
import { IoEyeSharp } from "react-icons/io5";

import CustomLoader from "../components/ProtectedRoutes/CustomLoader";
function Rejected() {
  const { astro } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [session, setSession] = useState([]);

  useEffect(() => {
    dispatch(LogActive({ id: astro._id })).then((e) => {
      if (e.payload.success) {
        setSession([...e.payload.logs]);
        console.log(e.payload.logs);
      }
    });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const [pageCount, setpageCount] = useState("");

  const [Loader, setLoader] = useState(true);

  const [AllLogActivity, setAllLogActivity] = useState(null);

  const [pageSize, setPageSize] = useState(""); // State for page size
  const [selectedType, setSelectedType] = useState(""); // State for selected type
  const [startDate, setStartDate] = useState(""); // State for start date
  const [endDate, setEndDate] = useState(""); // State for end date



  
  // Function to handle change in page size select
  const handlePageSizeChange = (event) => {
    const selectedPageSize = event.target.value;
    setPageSize(selectedPageSize);
  };

  // Function to handle change in type select
  const handleTypeChange = (event) => {
    const selectedTypeValue = event.target.value;
    setSelectedType(selectedTypeValue);
  };

  const AllLogFilter = async (e) => {
    setLoader(true);
    try {
      const response = await axios.post(`/api/v1/cancel/request`, {
        astro: astro._id,
        limit: pageSize,
        type: selectedType,
        fromDate: startDate,
        toDate: endDate,
      });
      let Data = response?.data?.list;
      if (Data) {
        setAllLogActivity(Data);
        console.log({ Data });
        setLoader(false);
        const total = response.data.count;
        const totalPage = Math.ceil(total / 10);
        console.log({ totalPage });
        setpageCount(totalPage || 0);
      }
    } catch (err) {}
  };

  useEffect(() => {
    AllLogFilter();
  }, [pageSize, selectedType]);

  const AllLogActivityApi = async () => {
    try {
      const response = await axios.post(`/api/v1/cancel/request`, { astro: astro._id });
      let Data = response?.data?.list;
      if (Data) {
        setAllLogActivity(Data);
        console.log({ Data });
        setLoader(false);
        const total = response.data.count;
        const totalPage = Math.ceil(total / 10);
        console.log({ totalPage });
        setpageCount(totalPage || 0);
      }
    } catch (err) {}
  };

  useEffect(() => {
    AllLogActivityApi();
  }, []);

  const resetForm = () => {
    setPageSize(""); // Clear page size
    setStartDate(""); // Clear start date
    setEndDate(""); // Clear end date
    AllLogActivityApi();

  };

  const handlePageClick = async (data) => {
    setLoader(true);
    const selectedPage = data.selected + 1; // Page numbers start from 0, so adding 1 to match your API logic
    try {
      const response = await axios.post(`/api/v1/cancel/request`, {
        astro: astro._id,
        limit: 10,
        page: selectedPage,
      });
      let Data = response?.data?.list;
      if (Data) {
        setAllLogActivity(Data);
        console.log({ Data });
        setLoader(false);
        const total = response.data.count;
        const totalPage = Math.ceil(total / 10);
        console.log({ totalPage });
        setpageCount(totalPage || 0);
      } else {
        setLoader(false);
      }
    } catch (err) {}
  };

  return (
    <>
      <div
        className={`styles.wrapper p-3`}
        // className="container"
        style={{ height: "calc(100vh - 55px)" }}
      >
        <div className="row mx-1">
          <div className="col-md-10">
            <div className="page-title-box my-3">
              <h4>Rejected Chat Management</h4>

              {/* <ol className="breadcrumb m-0">
                <li className="breadcrumb-item active">
                  User Activity Management
                </li>
                : <li className="breadcrumb-item">User Activity List</li>
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
        {Loader ? (
          <CustomLoader Loader={Loader} />
        ) : (
          <div>
            <div className="row my-3">
              <div className="col-md-2">
                <label htmlFor="pageSize">Page Size</label>
                <select
                  id="pageSize"
                  className="form-select"
                  value={pageSize}
                  onChange={handlePageSizeChange}
                >
                  <option selected>Page Size</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>

              {/* <div className="col-md-2">
                <label htmlFor="type">Type</label>
                <select
                  id="type"
                  className="form-select"
                  value={selectedType}
                  onChange={handleTypeChange}
                >
                  <option selected>Type</option>
                  <option value="">All</option>
                  <option value="Login">Login</option>
                  <option value="WorkTime">Work Time</option>
                </select>
              </div> */}

              <div className="col-md-2">
                <label htmlFor="startDate">Start Date</label>
                <div className="input-group mb-3">
                  <input
                    type="date"
                    id="startDate"
                    className="form-control"
                    placeholder="Start Date"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={startDate} // Set initial value for start date input
                    onChange={(e) => setStartDate(e.target.value)} // Handle change for start date
                  />
                </div>
              </div>

              <div className="col-md-2">
                <label htmlFor="endDate">End Date</label>
                <div className="input-group mb-3">
                  <input
                    type="date"
                    id="endDate"
                    className="form-control"
                    placeholder="End Date"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={endDate} // Set initial value for end date input
                    onChange={(e) => setEndDate(e.target.value)} // Handle change for end date
                  />
                </div>
              </div>

              <div className="col-md-3 offset-1 d-flex align-items-center">
                <div className="input-group">
                  <button
                    className="btn btn-primary me-2"
                    type="button"
                    onClick={() => AllLogFilter()}
                  >
                    Submit
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={resetForm}
                    type="button"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            <div
              // className={`${styles.sessions} table-responsive`}
              className={`table-responsive `}
            >
              <table class="table table-striped">
              <thead>
                  <tr>
                    <th>Sn.</th>
                    <th>User Name</th>
                    <th>Reason</th>
                    <th>Duretion(sec)</th>
                    {/* <th>System Paid</th>
                    <th>Astro Balance</th> */}
                    <th>Date</th>

                  </tr>
                </thead>
                <tbody style={{ overflow: "scroll" }}>
                  {AllLogActivity?.map((user, index) => (
                    <tr key={user?._id}>
                      <td className="fs-7">{index + 1}</td>
                      <td className="fs-7" > {user?.user_name} </td>
                      {/* <td className="fs-7" > {user?.id||"N/A"} </td> */}
                      <td className="fs-7">
                        {" "}
                       
                          {" "}
                          { user?.reason}
                        {/* </span> */}
                      </td>
                      <td className="fs-7" > {user?.time} </td>  
                      <td className="fs-7">
                        {moment(user.createdAt).format("YYYY-MM-DD, HH:mm")}
                      </td>

                      {/* <td>
                        <IoEyeSharp
                          size={25}
                          // onClick={() => setView(item)}
                          onClick={() =>
                            navigate(`/Astro-details`, { state: user?.astroData })
                          }
                          style={{ cursor: "pointer" }}
                        />
                      </td> */}
                      {/* <td>$ {user?.astro?.balance}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-lg-12 mt-2 text-end">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={1}
              onPageChange={handlePageClick}
              containerClassName={"pagination justify-content-end"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active"}
              // forcePage={1}
            />
          </div>
        </div>
        </div>

        {/* 
               
            </div> */}
      </div>
    </>
  );
}

export default Rejected;
