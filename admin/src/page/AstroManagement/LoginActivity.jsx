import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { LogActive, userSession } from "../../api/User";
// import styles from "./sessions/Sessions.module.css";
import { useState } from "react";
import { FaRegStar, FaStar, FaEye } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import axios from "axios";
// import CustomLoader from "../components/ProtectedRoutes/CustomLoader";
import CustomLoader from "../Componets/CustomLoader";

function ClientSession({ id }) {
  //  id  = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [session, setSession] = useState([]);

  useEffect(() => {
    dispatch(LogActive({ id: id })).then((e) => {
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
      const response = await axios.post(`/api/v1/astro/log`, {
        id: id,
        limit: pageSize,
        type: selectedType,
        fromDate: startDate,
        endDate: endDate,
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
    } catch (err) { }
  };

  useEffect(() => {
    AllLogFilter();
  }, [pageSize, selectedType]);

  const AllLogActivityApi = async () => {
    try {
      const response = await axios.post(`/api/v1/astro/log`, { id: id });
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
    } catch (err) { }
  };

  useEffect(() => {
    AllLogActivityApi();
  }, []);

  const resetForm = () => {
    setPageSize(""); // Clear page size
    setSelectedType(""); // Clear selected type
    setStartDate(""); // Clear start date
    setEndDate(""); // Clear end date
  };

  const handlePageClick = async (data) => {
    setLoader(true);
    const selectedPage = data.selected + 1; // Page numbers start from 0, so adding 1 to match your API logic
    try {
      const response = await axios.post(`/api/v1/astro/log`, {
        id: id,
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
    } catch (err) { }
  };

  return (
    <>
      <div className="container p-2">
        <div className="row m-2">
          <div className="col-md-10">
            <div className="page-title-box">
              <h4>Astro Activity</h4>
            </div>
          </div>
        {!id &&  <div className="col-md-2 text-end">
            <Link to="#" onClick={() => navigate(-1)}>
              <button type="button" className="btn text-white btn-dark">
                Back
              </button>
            </Link>
          </div>}
        </div>
        <div className="bg-white p-3 rounded mt-md-3">
        <div className="row justify-content-start">
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

            <div className="col-md-2">
              <label htmlFor="type">Sort By</label>
              <select
                id="sortField"
                className="form-select"
                value={selectedType}
                onChange={handleTypeChange}
              >
                <option selected>Type</option>
                <option value="">All</option>
                <option value="Login">Login</option>
                <option value="WorkTime">WorkTime</option>
              </select>
            </div>
{/* 
            <div className="col-md-2">
              <label htmlFor="sortField">Sort Order</label>
              <select
                id="sortField"
                className="form-select"
                value={sortOrder}
                onChange={(e) => setsortOrder(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div> */}

            <div className="col-md-3">
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

            <div className="col-md-3">
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
            {/* <div className="col-md-3">
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
            </div> */}

            <div className="col-md-2  mt-5 d-flex align-items-center px-0 gap-1 justify-content-around">
              <div className="input-group d-flex justify-content-around">
                <button
                  className="btn  btn-warning"
                  type="button"
                  onClick={() => AllLogActivityApi()}
                >
                  Submit
                </button>
                <button
                  className="btn-light btn text-white"
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
              <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>Sn.</th>
                    <th>Type</th>
                    <th>Duretion(min)</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                  </tr>
                </thead>
                <tbody>
                  {AllLogActivity?.map((user, index) => (
                    <tr key={user?._id}>
                      <td className="fs-7">{index + 1}</td>
                      <td className="fs-7">{user?.type}</td>
                      <td className="fs-7">{user?.type == "WorkTime" ? user?.work_time : 0}</td>
                      <td className="fs-7">
                        {user.createdAt.split("T").slice(0, 1)} ,{" "}
                        {new Date(user.createdAt).getHours()}:
                        {new Date(user.createdAt).getMinutes()}:
                        {new Date(user.createdAt).getSeconds()}
                      </td>
                      <td className="fs-7">
                        {user?.endAt && user.endAt.split("T").slice(0, 1)}
                        {user?.endAt ? " " : " "}

                        {user?.endAt ? new Date(user?.endAt).getHours() : ""}
                        {user?.endAt ? ":" : " "}
                        {user?.endAt ? new Date(user?.endAt).getMinutes() : ""}
                        {user?.endAt ? ":" : " "}
                        {user?.endAt ? new Date(user?.endAt).getSeconds() : ""}
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

    </>
  );
}

export default ClientSession;
