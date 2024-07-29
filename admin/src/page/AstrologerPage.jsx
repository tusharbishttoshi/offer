import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import Swal from "sweetalert2";
import CustomLoader from "./Componets/CustomLoader";
import { IoEyeSharp } from "react-icons/io5";
import { TbFileInvoice } from "react-icons/tb";
import { ViewMore } from "./AstroRequest";
import { GetAstrologers, invoiceg } from "../api/User";
import { useDispatch, useSelector } from "react-redux";
import { FaXmark } from "react-icons/fa6";

export default function AstrologerPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { astrologers } = useSelector((state) => state.userReducer);
  const [Search, setSearch] = useState("");

  // const filterRoles = astrologers?.filter((e) =>
  //   e.name?.toLowerCase()?.includes(Search?.toLowerCase())
  // );

  const [view, setView] = useState({});
  const [invoice, setInvoice] = useState({});
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    dispatch(GetAstrologers());
  }, []);

  const [AllTransition, setAllTransition] = useState(null);
  const [Loader, setLoader] = useState(true);
  const [pageSize, setPageSize] = useState(10); // State for page size
  const [selectedType, setSelectedType] = useState(""); // State for selected type
  const [sortOrder, setsortOrder] = useState(""); // State for selected type
  const [startDate, setStartDate] = useState(""); // State for start date
  const [endDate, setEndDate] = useState("");
  const [statusModal, setStatusModal] = useState(false);
  const [selectedAstrologer, setSelectedAstrologer] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [reason, setReason] = useState(""); // State for end date
  // State for end date

  // Function to handle change in page size select
  const handlePageSizeChange = (event) => {
    const selectedPageSize = event.target.value;
    setPageSize(selectedPageSize);
  };

  const statusStyles = {
    verified: { color: 'green' },
    pending: { color: '#8B8000' },
    rejected: { color: 'red' }
  };

  // Function to handle change in type select
  const handleTypeChange = (event) => {
    const selectedTypeValue = event.target.value;
    setSelectedType(selectedTypeValue);
  };

  const AllAstrologerListApi = async () => {
    setLoader(true);
    try {
      const response = await axios.post(`/api/v1/astrologer/list`, {
        search: Search,
        limit: pageSize,
        sortField: selectedType,
        sortOrder: sortOrder,
        fromDate: startDate,
        endDate: endDate,
      });
      let Data = response?.data?.list;
      console.log(response?.data?.success);
      if (response?.data?.success) {
        setAllTransition(Data);

        setLoader(false);
        const total = response.data.count;
        const totalPage = Math.ceil(total / pageSize);
        console.log({ totalPage });
        setpageCount(totalPage);
        console.log(response?.data);
      }
    } catch (err) { }
  };

  const [currentPage, setCurrentPage] = useState(1);

  const [pageCount, setpageCount] = useState("");

  const handlePageClick = async (data) => {
    setLoader(true);
    const selectedPage = data.selected + 1; // Page numbers start from 0, so adding 1 to match your API logic
    try {
      const response = await axios.post(`/api/v1/astrologer/list`, {
        page: selectedPage,
        search: Search,
        limit: pageSize,
        sortField: selectedType,
        sortOrder: sortOrder,
        fromDate: startDate,
        endDate: endDate,
      });

      let Data = response?.data?.list;
      console.log(response?.data?.success);
      if (response?.data?.success) {
        setAllTransition(Data);
        setLoader(false);
        const total = response.data.count;
        const totalPage = Math.ceil(total / pageSize);
        console.log({ totalPage });
        setpageCount(totalPage);
        console.log(response?.data);
      }
    } catch (error) {
      setLoader(false);
    }
  };



  useEffect(() => {
    AllAstrologerListApi();
  }, []);

  useEffect(() => {
    AllAstrologerListApi();
  }, [pageSize, selectedType, sortOrder, invoice]);

  const ResetForm = async () => {
    setLoader(true);
    try {
      const response = await axios.post(`/api/v1/astrologer/list`, {
        limit: 10,
      });
      let Data = response?.data?.list;
      console.log(response?.data?.success);
      if (response?.data?.success) {
        setAllTransition(Data);

        setLoader(false);
        const total = response.data.count;
        const totalPage = Math.ceil(total / pageSize);
        console.log({ totalPage });
        setpageCount(totalPage);
        console.log(response?.data);
        setPageSize(10); // Clear page size
        setSelectedType(""); // Clear selected type
        setStartDate(""); // Clear start date
        setEndDate(""); // Clear end date
        setsortOrder(""); // Clear end date
        setSearch(""); // Clear end date
      }
    } catch (err) { }
  };

  const handleStatusUpdate = (astro) => {
    setSelectedAstrologer(astro);
    setStatusModal(true);
  };

  // Add this function to handle the status update submission
  const submitStatusUpdate = async () => {
    if (newStatus === "rejected" && !reason) {
      alert("Please provide a reason for rejection.");
      return;
    }

    const payload = {
      astroId: selectedAstrologer,
      status: newStatus,
      reason: newStatus === "rejected" ? reason : undefined,
    };

    try {
      const response = await axios.post(`/api/v1/verify/astro`, payload);
      if (response.data.success) {
        toast.success("Status updated successfully");
        setStatusModal(false);
        setSelectedAstrologer(null);
        setNewStatus("");
        setReason("");
        AllAstrologerListApi(); // Refresh list
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  }

  return (
    <div className="container p-2">
      <ToastContainer />
      <div className="row  m-2">
        <div className="col-md-10">
          <div className="page-title-box">
            <h4>Astrologer Management</h4>
            {/* <ol className="breadcrumb m-0">
              <li className="breadcrumb-item active">Astrologer Management</li>
              <li className="breadcrumb-item active">Astrologer List</li>
            </ol> */}
          </div>
        </div>
        <div className="col-md-2 text-end">
          <Link to="#" onClick={() => navigate(-1)}>
            <button type="button" className="btn btn-dark btn text-white">
              Back
            </button>
          </Link>
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
                <option value="name">Name</option>
                <option value="email">Email</option>
                <option value="number">Number</option>
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

            <div className="col-md-2 d-flex align-items-center  mt-5 px-0 gap-1 justify-content-around">
              <div className="input-group d-flex justify-content-around">
                <button
                  className="btn  btn-warning"
                  type="button"
                  onClick={() => AllAstrologerListApi()}
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
                    <td>S.N.</td>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Phone</td>
                    <td>Status</td>
                    <td>View</td>
                    <td>Invoice</td>
                  </tr>
                </thead>
                <tbody>
                  {AllTransition?.map((item, i) => (
                    <tr key={i}>
                      <td className="fs-7">{i + 1}</td>
                      <td className="fs-7">{item?.name}</td>
                      <td className="fs-7">{item?.email}</td>
                      <td className="fs-7">{item?.number}</td>
                      <tr key={item?._id}>
  <td>
    {item?.status === 'pending' ? (
      <button
        className="btn btn-sm"
        style={statusStyles.pending}
        onClick={() => handleStatusUpdate(item?._id)}
      >
        Pending
      </button>
    ) : item?.status === 'verified' ? (
      <button
        className="btn btn-sm"
        style={statusStyles.verified}
        disabled
      >
        Verified
      </button>
    ) : item?.status === 'rejected' ? (
      <button
        className="btn btn-sm"
        style={statusStyles.rejected}
        disabled
      >
        Rejected
      </button>
    ) : (
      item?.status // Show status text in default case if needed
    )}
  </td>

  {/* Display action button only if status is not 'pending' */}
  {/* {item?.status !== 'pending' && (
    <td>
      <Link to="#">
        <button
          className={`btn ${item?.status === 'rejected' ? 'btn-danger' : 'btn-dark'} btn-sm`}
          onClick={() => handleStatusUpdate(item?._id)}
          disabled={item?.status === 'rejected'} // Disable button for rejected status
        >
          {item?.status === 'rejected' ? 'Reject' : 'Verify'}
        </button>
      </Link>
    </td>
  )} */}
</tr>
                      <td>
                        <IoEyeSharp
                          size={25}
                          // onClick={() => setView(item)}
                          onClick={() =>
                            navigate(`/Astro-details`, { state: item })
                          }
                          style={{ cursor: "pointer" }}
                        />
                      </td>
                      <td>
                        <TbFileInvoice
                          size={25}
                          onClick={() => setInvoice(item)}
                          style={{ cursor: "pointer" }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {statusModal && (
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Update Status</h5>
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={() => setStatusModal(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <label htmlFor="status">Select Status:</label>
                  <select
                    id="status"
                    className="form-control"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="verified">Verified</option>
                    <option value="rejected">Rejected</option>
                  </select>

                  {newStatus === "rejected" && (
                    <div className="mt-3">
                      <label htmlFor="reason">Reason for rejection:</label>
                      <textarea
                        id="reason"
                        className="form-control"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                      />
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setStatusModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={submitStatusUpdate}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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

      {view._id && <ViewMore view={view} setView={setView} />}

      {invoice._id && (
        <>
          <div
            style={{
              height: "100vh",
              width: "100vw",
              position: "fixed",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              top: "0px",
              left: "0px",
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: "1000",
            }}
          >
            <div
              style={{
                gap: "4px",
                padding: "10px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                maxWidth: "440px",
                width: "95%",
                background: "white",
                borderRadius: "10px",
              }}
            >
              <FaXmark
                onClick={() => setInvoice({})}
                size={25}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                }}
              />
              <p
                style={{
                  fontWeight: "600",
                  fontSize: "20px",
                  textTransform: "capitalize",
                }}
              >
                {invoice.name}
              </p>
              <p
                style={{
                  fontWeight: "600",
                  fontSize: "20px",
                  textTransform: "capitalize",
                }}
              >
                {invoice?.balance?.toFixed(2)}
              </p>
              <label
                style={{
                  fontWeight: "500",
                  fontSize: "18px",
                  textTransform: "capitalize",
                }}
                htmlFor="amount"
              >
                Amount
              </label>
              <input
                style={{ border: "2px solid black" }}
                type="number"
                min={1}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div
                onClick={() => {
                  if (amount <= invoice.balance) {
                    dispatch(invoiceg({ id: invoice._id, amount })).then(
                      (e) => e.payload?.success && setInvoice({})
                    );
                  } else {
                    alert("you can not send more the balance");
                  }
                }}
                style={{
                  background: "var(--dark)",
                  textAlign: "center",
                  padding: "7px",
                  cursor: "pointer",
                  color: "white",
                  fontWeight: "500",
                  fontSize: "18px",
                  borderRadius: "10px",
                }}
              >
                Submit
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
