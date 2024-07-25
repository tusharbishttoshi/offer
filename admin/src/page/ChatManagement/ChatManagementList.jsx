import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import moment from "moment";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import CustomLoader from "../Componets/CustomLoader";

export default function ChatManagementList({ user, astro }) {
  const navigate = useNavigate();
  //   new code

  const [Chat, setChat] = useState(null);
  const [Loader, setLoader] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [selectedType, setSelectedType] = useState("");
  const [sortOrder, setsortOrder] = useState("asc");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [Search, setSearch] = useState("");
  const [chatType, setChatType] = useState("");

  const handlePageSizeChange = (event) => {
    const selectedPageSize = event.target.value;
    setPageSize(selectedPageSize);
  };

  // Function to handle change in type select
  const handleTypeChange = (event) => {
    const selectedTypeValue = event.target.value;
    setSelectedType(selectedTypeValue);
  };
  const handleChatTypeChange = (event) => {
    const selectedTypeValue = event.target.value;
    setChatType(selectedTypeValue);
  };

  const AllChatListApi = async () => {
    setLoader(true);
    try {
      const response = await axios.post(`/api/v1/chat/list`, {
        user: user,
        astro: astro,
        limit: pageSize || 10,
        type :chatType,
        fromDate: startDate,
        endDate: endDate,
        search: Search,
        sortField: selectedType,
        sortOrder: sortOrder,
      });
      let Data = response?.data?.list;
      console.log("data", response?.data);

      if (response?.data?.success) {
        setChat(Data);

        setLoader(false);
        const total = response.data.count;
        const totalPage = Math.ceil(total / 10);
        console.log({ totalPage });
        setpageCount(totalPage);
        console.log("user", response?.data);
      }
    } catch (err) { }
  };

  const [currentPage, setCurrentPage] = useState(1);

  const [pageCount, setpageCount] = useState("");

  const handlePageClick = async (data) => {
    setLoader(true);
    const selectedPage = data.selected + 1; // Page numbers start from 0, so adding 1 to match your API logic
    try {
      const response = await axios.post(`/api/v1/chat/list`, {
        page: selectedPage,
        search: Search,
        limit: pageSize,
        type: selectedType,
        fromDate: startDate,
        endDate: endDate,
        type :chatType,
        user: user,
        astro: astro,
      });
      let Data = response?.data?.list;
      if (response?.data?.success) {
        setChat(Data);
        setLoader(false);
        setCurrentPage(selectedPage);
        const total = response.data.count;
        const totalPage = Math.ceil(total / pageSize);
        console.log({ totalPage });
        setpageCount(totalPage);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  useEffect(() => {
    AllChatListApi();
  }, []);

  useEffect(() => {
    AllChatListApi();
  }, [pageSize, selectedType, sortOrder,chatType]);

  const ResetForm = async () => {
    setLoader(true);
    try {
      const response = await axios.post(`/api/v1/chat/list`, {
        user: user,
        astro: astro,
        limit: 10,
        type: "",
        fromDate: "",
        type :"",
        endDate: "",
        search: "",
      });
      let Data = response?.data?.list;
      console.log("data", response?.data);

      if (response?.data?.success) {
        setChat(Data);

        setLoader(false);
        const total = response.data.count;
        const totalPage = Math.ceil(total / 10);
        console.log({ totalPage });
        setpageCount(totalPage);
        console.log(response?.data);
        setPageSize(10);
        setStartDate("");
        setEndDate("");
        setSearch("");
        setSelectedType("");
        setChatType("");
      }
    } catch (err) { }
  };

  const formatDate = (dateTimeString) => {
    const date = dateTimeString.split("T")[0];
    const time = dateTimeString.split("T")[1].slice(0, 8);
    return `${date}, ${time}`;
  };

  return (
    <>
      <div className="container p-2">
        <ToastContainer />

        {(!user || !astro) && (
          <div className="row  m-2">
            <div className="col-md-10">
              <div className="page-title-box">
                <h4>Chat Management</h4>
                {/* <ol className="breadcrumb m-0">
                <li className="breadcrumb-item active">Chat Management</li>
              </ol> */}
              </div>
            </div>
            {!astro && !user && <div className="col-md-2 text-end">
              <Link to="#" onClick={() => navigate(-1)}>
                <button type="button" className="btn text-white btn-dark">
                  Back
                </button>
              </Link>
            </div>}
          </div>
        )}

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
              <label htmlFor="type">Chat Type</label>
              <select
                id="sortField"
                className="form-select"
                value={chatType}
                onChange={handleChatTypeChange}
              >
                <option selected>Chat Type</option>
                <option value="">All</option>
                <option value="Reject">Rejected Chat</option>
                <option value="Complete">Completed Chat</option>
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
                <option value="createdAt">Date/Time</option>
                <option value="astro_name">Astrologer</option>
                <option value="user_name">User</option>
              </select>
            </div>

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
            </div>

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

            <div className="col-md-2  mt-5 d-flex align-items-center px-0 gap-1 justify-content-around">
              <div className="input-group d-flex justify-content-around">
                <button
                  className="btn  btn-warning"
                  type="button"
                  onClick={() => AllChatListApi()}
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
                <thead className="thead-dark">
                  <tr>
                    <th>Sn.</th>
                    <th>ID</th>
                    <th>Date/Time</th>
                    <th>Astrologer</th>
                    <th>User</th>
                    <th>Duration</th>
                    <th>Ring Bell (sec)</th>
                    <th>Reason</th>
                    <th>Link</th>
                    <th className="text-center">View chat</th>
                  </tr>
                </thead>
                <tbody>
                  {Chat?.map((user, index) => (
                    <tr key={user?._id }>
                      <td className="fs-7">{index + 1}</td>
                      <td className="fs-7">{user?.id}</td>
                      <td className="fs-7">{formatDate(user?.createdAt)}</td>
                      <td>
                        <span
                          className="text-reset fs-7"
                          style={{
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}

                        // onClick={() =>
                        //   navigate(`/Astro-details`, { state: user })
                        // }

                        >
                          {user?.astro_name}
                        </span>
                      </td>
                      <td>
                        <span
                          style={{
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                          className="fs-7"
                          onClick={() => navigate(`/User-details/${user?.user}`)}
                        >
                          { user?.user_name}
                        </span>
                      </td>

                      <td>
                        <span className="fs-7" v>
                          {(
                            "0" + Math.floor((user.timeInSeconds / 60) % 60)
                          ).slice(-2)}
                          :
                        </span>
                        <span className="fs-7">
                          {("0" + Math.floor(user.timeInSeconds % 60)).slice(
                            -2
                          )}
                        </span>
                      </td>
                      <td className="fs-7">{user?.time}</td>
                      <td className="fs-7">
                        {user.review.user ? (
                          <span className="fs-7">
                            User: {user.review.comment}
                          </span>
                        ) : user.reason !== "NaN" ? (
                          <span className="fs-7"> {user.reason}</span>
                        ) : (
                          <></>
                        )}
                      </td>

                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          const url = `astro.unzziptruth.com/sessions/${user._id}`;
                          navigator.clipboard
                            .writeText(url)
                            .then(() =>
                              toast.success("URL copied to clipboard")
                            )
                            .catch((error) =>
                              toast.error("Failed to copy URL: ", error)
                            );
                        }}
                        className="fs-7"
                      >
                        <i className="fas fa-copy fs-2"></i>
                      </td>

                      <td
                        className="fs-7"
                        onClick={() =>
                          user?.timeInSeconds > 0 && navigate("/chat-history-view", { state: user })
                        }
                      >
                        {user?.timeInSeconds > 0 && (
                          <i className="fas fs-3 text-center d-block fa-comment-dots"></i>
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
          />
        </div>
      </div>
    </>
  );
}
