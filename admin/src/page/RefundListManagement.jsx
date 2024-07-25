import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import moment from "moment";
import Swal from "sweetalert2";
import CustomLoader from "./Componets/CustomLoader";
export default function RefundListManagement({ user }) {
  const navigate = useNavigate();

  const [AllTransition, setAllTransition] = useState(null);
  const [Loader, setLoader] = useState(true);
  const [selectedValue, setSelectedValue] = useState();
  const AllRefundRequest = async () => {
    setLoader(true);
    try {
      const response = await axios.post(`/api/v1/viewRefundRequest`, {
        refundStatus: selectedValue,
        user,
      });
      let Data = response?.data?.refundRequest;
      if (Data) {
        setAllTransition(Data);
        setLoader(false);
        const total = response.data.totalCount;
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
      const response = await axios.post(`/api/v1/viewRefundRequest`, {
        page: selectedPage,
        limit: 10,
        refundStatus: selectedValue,
        user,
      });
      const sessions = response?.data?.refundRequest;
      if (sessions) {
        setAllTransition(sessions);
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

  const handleSelect = (value) => {
    setSelectedValue(value);
    // You can perform further actions based on the selected value here
  };

  useEffect(() => {
    AllRefundRequest();
  }, []);

  useEffect(() => {
    AllRefundRequest();
  }, [selectedValue]);

  const convertMinutesToHourMinute = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}:${remainingMinutes.toString().padStart(2, "0")}`;
  };

  const handleRefund = async (_id) => {
    const result = await Swal.fire({
      title: "Are you sure you want to refund this amount?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, refund it!",
    });

    if (result.isConfirmed) {
      try {
        // Hit your API to perform refund
        await axios
          .post(`/api/v1/refundMoney`, { sessionId: _id, status: "1", user })
          .then((res) => {
            let Data = res.data;
            console.log("Amount", { Data });

            if (Data.status || Data.success) {
              AllRefundRequest();
              Swal.fire(
                "Refunded!",
                "The amount has been refunded successfully.",
                "success"
              );
            } else {
              Swal.fire("Error!", `${Data.msg}`, "error");
            }
          });
      } catch (error) {
        Swal.fire(
          "Error!",
          "Failed to refund the amount. Please try again later.",
          "error"
        );
      }
    } else {
      try {
        // Hit your API to perform refund
        await axios
          .post(`/api/v1/refundMoney`, { sessionId: _id, status: "0", user })
          .then((res) => {
            let Data = res.data;
            console.log("Amount", { Data });

            if (Data.status || Data.success) {
              AllRefundRequest();
              //   Swal.fire(
              //     "Refunded!",
              //     "The amount has been refunded successfully.",
              //     "success"
              //   );

              Swal.fire(
                "Cancelled",
                "Refund action has been cancelled.",
                "info"
              );
            } else {
              Swal.fire("Error!", `${Data.msg}`, "error");
            }
          });
      } catch (error) {
        Swal.fire(
          "Error!",
          "Failed to refund the amount. Please try again later.",
          "error"
        );
      }
    }
  };

  return (
    <div className="container p-2">
      <div className="row  m-2">
        {!user && (
          <>
            <div className="col-md-10">
              <div className="page-title-box">
                <h4>Refund Management</h4>
                {/* <ol className="breadcrumb m-0">
              <li className="breadcrumb-item active">Refund Management</li>
            </ol> */}
              </div>
            </div>
            <div className="col-md-2 text-end">
              <Link to="#" className="text-white" onClick={() => navigate(-1)}>
                <button type="button" className="btn text-white btn-dark">
                  Back
                </button>
              </Link>
            </div>
          </>
        )}

        <div className="d-flex align-item-center mt-2 justify-content-end">
          <div className="dropdown">
            <button
              className="btn  btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {selectedValue == "refund_completed"
                ? "Completed"
                : selectedValue == "rejected"
                ? "Rejected"
                : selectedValue || "Filter"}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleSelect()}
                >
                  All
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleSelect("pending")}
                >
                  Pending
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleSelect("rejected")}
                >
                  Rejected
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleSelect("refund_completed")}
                >
                  Completed
                </a>
              </li>
            </ul>
          </div>
        </div>
        {Loader ? (
          <CustomLoader Loder={Loader} />
        ) : (
          <div className="table-responsive">
            <table className="table table-striped m-3 table-bordered">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Session ID</th>
                  <th>Transaction ID</th>
                  <th>Refund Transaction ID</th>
                  <th>Chat Price</th>
                  <th>Chat Duration</th>
                  <th>Chat Date</th>
                  <th>Chat Time</th>
                  <th>Reason</th>
                  <th>View Chat</th>
                  <th className="text-center">Refund Status</th>
                </tr>
              </thead>
              <tbody>
                {AllTransition?.map((item, i) => (
                  <tr key={i}>
                    <td className="fs-7">{item?.userinfo?.name}</td>
                    <td className="fs-7">{item?.userPaid  <= 0 && item?.id}</td>
                    <td className="fs-7">{item?.transactionID}</td>
                    <td className="fs-7">{item?.refund?.transactionID}</td>
                    <td className="fs-7">{item?.userPaidPrise}</td>
                    <td className="fs-7">
                      {convertMinutesToHourMinute(item.timeInSeconds)}
                    </td>
                    <td className="fs-7">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="fs-7">
                      {new Date(item.createdAt).toLocaleTimeString()}
                    </td>
                    <td className="fs-7">{item?.reasons?.title ?item?.reasons?.title :item?.reason   }</td>{" "}
                    <td
                      onClick={() =>
                        navigate("/chat-history-view", { state: item })
                      }
                    >
                      {" "}
                      <i className="fas fs-3 text-center d-block fa-comment-dots"></i>
                    </td>
                    <td className="text-center">
                      {item.refundStatus !== "pending" ? (
                        <button
                          type="button"
                          disabled
                          className={`btn btn-sm fs-7 ${
                            item.refundStatus === "refund_completed"
                              ? "btn-primary"
                              : item.refundStatus === "rejected"
                              ? "btn-danger"
                              : item.refundStatus === "completed"
                              ? "btn-primary"
                              : ""
                          }`}
                        >
                          {item.refundStatus === "refund_completed"
                            ? "Completed"
                            : item.refundStatus === "rejected"
                            ? "Rejected"
                            : item.refundStatus}
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-sm btn-warning fs-7 text-white"
                          onClick={() => handleRefund(item._id)}
                        >
                          {item.refundStatus}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
    </div>
  );
}
