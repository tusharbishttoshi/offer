import React from "react";
import axios from "axios";
import styles from "./sessions/Sessions.module.css";
import NavBar from "../components/ProtectedRoutes/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { GetInvoice, getSession } from "../api/useReducer";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { FaRegStar, FaStar, FaEye } from "react-icons/fa";
import { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import CustomLoader from "../components/ProtectedRoutes/CustomLoader";
function Transaction() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { astro, session } = useSelector((state) => state.user);
  const [invoice, setInvoice] = useState([]);
  const [TransitionData, setTransitionData] = useState([]);
  useEffect(() => {
    astro._id && dispatch(getSession({ id: astro._id }));
    astro._id &&
      dispatch(GetInvoice({ id: astro._id })).then((e) => {
        setInvoice(e.payload.invoice);
      });
  }, [astro]);

  useEffect(() => {
    const d = [...session, ...invoice];
    const sortedArray = d.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA - dateB;
    });
    const h = [...d].reverse();
    sortedArray.length > 0 && setTransitionData(h);
  }, [session, invoice]);

  const [currentPage, setCurrentPage] = useState(1);

  const [pageCount, setpageCount] = useState("");

  const [Loader, setLoader] = useState(true);

  const [AllTransition, setAllTransition] = useState([]);

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

  const AllTransitionApi = async () => {
    setLoader(true);
    try {
      const response = await axios.post(`api/v1/astro/transactions`, {
        id: astro._id,
        limit: pageSize,
        // type: selectedType,
        fromDate: startDate,
        endDate: endDate,
      });
      let Data = response?.data?.paginatedData;
      if (response?.data?.success) {
        console.log({ Data });
        setLoader(false);
        setAllTransition(Data);

        const total = response.data.count;
        const totalPage = Math.ceil(total / 10);
        console.log({ totalPage });
        setpageCount(totalPage || 0);
      }
    } catch (err) { }
  };

  useEffect(() => {
    AllTransitionApi();
  }, []);
  useEffect(() => {
    AllTransitionApi();
  }, [pageSize, selectedType]);

  const resetForm = () => {
    setPageSize(""); // Clear page size
    // setSelectedType(""); // Clear selected type
    setStartDate(""); // Clear start date
    setEndDate(""); // Clear end date
  };

  const handlePageClick = async (data) => {
    setLoader(true);
    const selectedPage = data.selected + 1; // Page numbers start from 0, so adding 1 to match your API logic
    try {
      const response = await axios.post(`api/v1/astro/transactions`, {
        id: astro._id,
        limit: pageSize,
        // type: selectedType,
        fromDate: startDate,
        endDate: endDate,
        page: selectedPage,
      });

      let Data = response?.data?.paginatedData;
      if (response?.data?.success) {
        setLoader(false);
        setAllTransition(Data);
        setCurrentPage(selectedPage);
        const total = response.data.count;
        const totalPage = Math.ceil(total / 10);
        console.log({ totalPage });
        setpageCount(totalPage);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  return (
    <div className="container">
      <div
        className={`styles.wrapper p-3`}
        // className="container"
        style={{ height: "calc(100vh - 55px)" }}
      >
        <div className="row my-2">
          <div className="col-md-10">
            <div className="page-title-box my-3">
              <h4>User Transaction Management</h4>
              {/* 
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item active">
                  User Transaction Management
                </li>
                <li className="breadcrumb-item">User Transaction List</li>
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
                  onClick={() => AllTransitionApi()}
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

          {Loader ? (
            <CustomLoader Loader={Loader} />
          ) : (
            <div className="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Transition Id </th>
                    <th>Date/Time</th>
                    <th>User</th>
                    <th>Duration</th>
                    <th>Earn</th>
                    <th>Amount Type</th>
                    <th>Chat Type</th>
                    <th>Balance</th>
                  </tr>
                </thead>

                <tbody style={{ overflow: "scroll" }}>
                  {/* {AllTransition?.filter(user => user.astroEarn !== 0)?.map((user) => ( */}
                  {AllTransition?.map((user) => (
                    <tr key={user._id} style={{ cursor: "pointer" }}>
                      <td>{user?.transactionID}</td>
                      <td>
                        {moment(user.createdAt).format("YYYY-MM-DD, HH:mm")}
                      </td>
                      <td>{user?.user?.name || "System"}</td>
                      <td>
                        {user.timeInSeconds && (
                          <>
                            <span className="digits">
                              {(
                                "0" + Math.floor((user.timeInSeconds / 60) % 60)
                              ).slice(-2)}
                              :
                            </span>
                            <span className="digits">
                              {(
                                "0" + Math.floor(user.timeInSeconds % 60)
                              ).slice(-2)}
                            </span>
                          </>
                        )}
                      </td>
                      <td style={{ color: user?.astroEarn >= 0 ? "#4fc9da" : "#f06445" }}> $ {user?.astroEarn?.toFixed(2) || -user?.amount}</td>
                      <td>{user?.amount_type_astro}</td>
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
                        $
                        {user?.astroPrevBalance
                          ? parseFloat(user?.astroPrevBalance.toFixed(2))
                          : user?.balance}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="row">
            <div className="col-lg-12 mt-2 text-end">
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
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
              />
            </div>
          </div>
        </div>

        {/* 
           
        </div> */}
      </div>
    </div>
  );
}

export default Transaction;
