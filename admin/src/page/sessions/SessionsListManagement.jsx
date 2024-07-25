import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import moment from "moment";
import Swal from "sweetalert2";
import CustomLoader from "../Componets/CustomLoader";

export default function SessionsListManagement() {
  const navigate = useNavigate();

  const [AllTransition, setAllTransition] = useState(null);
  const [Loader, setLoader] = useState(true);
  const [pageSize, setPageSize] = useState(""); // State for page size
  const [selectedType, setSelectedType] = useState(""); // State for selected type
  const [startDate, setStartDate] = useState(""); // State for start date
  const [endDate, setEndDate] = useState(""); // State for end date
  const [Search, setSearch] = useState(""); // State for end date

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

  const AllSessionsListApi = async () => {
    setLoader(true);
    try {
      const response = await axios.post(`/api/v1/view/sessions`, {
        // id: astro._id,
        limit: pageSize,
        type: selectedType,
        fromDate: startDate,
        endDate: endDate,
        search: Search,
      });
      let Data = response?.data?.list;
      console.log(response?.data?.success);
      if (response?.data?.success) {
        setAllTransition(Data);

        setLoader(false);
        const total = response.data.count;
        const totalPage = Math.ceil(total / 10);
        console.log({ totalPage });
        setpageCount(totalPage);
        console.log(response?.data);
      }
    } catch (err) {}
  };

  const [currentPage, setCurrentPage] = useState(1);

  const [pageCount, setpageCount] = useState("");

  const handlePageClick = async (data) => {
    setLoader(true);
    const selectedPage = data.selected + 1; // Page numbers start from 0, so adding 1 to match your API logic
    try {
      const response = await axios.post(`/api/v1/view/sessions`, {
        page: selectedPage,
        search: Search,
        limit: pageSize,
        type: selectedType,
        fromDate: startDate,
        endDate: endDate,
      });
      let Data = response?.data?.list;
      if (response?.data?.success) {
        setAllTransition(Data);
        setLoader(false);
        setCurrentPage(selectedPage);
        const total = response.data.totalCount;
        const totalPage = Math.ceil(total / 10);
        console.log({ totalPage });
        setpageCount(totalPage);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  useEffect(() => {
    AllSessionsListApi();
  }, []);

  useEffect(() => {
    AllSessionsListApi();
  }, [pageSize, selectedType]);

  const convertMinutesToHourMinute = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}:${remainingMinutes.toString().padStart(2, "0")}`;
  };






  const ResetForm = async () => {
    setLoader(true);
    try {
      const response = await axios.post(`/api/v1/view/sessions`, {
        // id: astro._id,
        limit: 10,
     
      });
      let Data = response?.data?.list;
      console.log(response?.data?.success);
      if (response?.data?.success) {
        setAllTransition(Data);

        setLoader(false);
        const total = response.data.count;
        const totalPage = Math.ceil(total / 10);
        console.log({ totalPage });
        setpageCount(totalPage);
        console.log(response?.data);
        setPageSize(""); // Clear page size
        setSelectedType(""); // Clear selected type
        setStartDate(""); // Clear start date
        setEndDate(""); // Clear end date
      }
    } catch (err) {}
  };
  
  return (
    <div className="container p-2">
      <div className="row  m-2">
        <div className="col-md-10">
          <div className="page-title-box">
            <h4>Sessions Management</h4>
            <ol className="breadcrumb m-0">
              {/* <li className="breadcrumb-item active">Sessions Management</li> */}
            </ol>
          </div>
        </div>
        <div className="col-md-2 text-end">
          <Link to="#" className="text-white" onClick={() => navigate(-1)}>
            <button type="button" className="btn  text-white btn-dark">
              Back
            </button>
          </Link>
        </div>

        <div className="bg-white p-3 rounded mt-md-3">
          <div className="row">
            <div className="col-md-2">
              <label htmlFor="pageSize">Page </label>
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
            <div className="col-md-3">
              <label htmlFor="startDate">Search</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  id="startDate"
                  className="form-control"
                  placeholder="Search by Name"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={Search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-3  d-flex align-items-center gap-1 justify-content-around">

              <div className="input-group d-flex mt-md-5 justify-content-around">
                <button
                  className="btn btn-warning"
                  type="button"
                  onClick={() => AllSessionsListApi()}
                >
                  Submit
                </button>
                <button
                  className="btn-light btn text-white"
                  onClick={ResetForm}
                  type="button"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          {Loader ? (
            <CustomLoader Loder={Loader} />
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Sessions  ID</th>
                    <th>Transaction ID</th>
                    <th>Astro Name</th>
                    <th>User Name</th>
                    <th>Chat Price</th>
                    <th>Chat Duration</th>
                    <th>Chat Date</th>
                    <th>Chat Time</th>
                    <th>Reason</th>
                    <th className="text-center">Refund Status</th>
                  </tr>
                </thead>
                <tbody>
                  {AllTransition?.map((item, i) => (
                    <tr key={i}>
                      <td className="fs-7" >{item?.id}</td>
                      <td className="fs-7" >{item.timeInSeconds >0 && item?.transactionID}</td>
                      <td className="fs-7" >{item?.astro_name}</td>
                      <td className="fs-7" >{item?.user_name}</td>
                      <td className="fs-7" >{item.userPaidPrise}</td>
                      <td className="fs-7" >
                        {convertMinutesToHourMinute(item.timeInSeconds)}
                      </td>
                      <td className="fs-7" >
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="fs-7" > 
                        {new Date(item.createdAt).toLocaleTimeString()}
                      </td>
                      <td className="fs-7" >{item?.reasons?.title||item?.reason}</td>
                      {/* <td>{item.refundStatus}</td> */}
                      <td   className="text-center fs-7 ">
                        {item.refundStatus && (
                          <button
                            type="button"
                            className={`btn btn-sm fs-7 ${
                              item.refundStatus === "refund_completed"
                                ? "btn-warning"
                                : item.refundStatus === "rejected"
                                ? "btn-danger"
                                : item.refundStatus === "completed"
                                ? "btn-warning "
                                : "btn-warning text-white"
                            }`}
                          >
                            {item.refundStatus === "refund_completed"
                              ? "Completed"
                              : item.refundStatus === "rejected"
                              ? "Rejected"
                              : item.refundStatus}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
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
  );
}
