// wallet code
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { PaymentModel } from "../../..";
import { useDispatch, useSelector } from "react-redux";
import { getSession } from "../../../api/chatReducer";
import { RechargeHistory } from "../../../api/userLogInReducer";
import CustomLoader from "../../Component/CustomLoder";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Wallet = () => {
  const { user } = useSelector((state) => state.userLog);
  const navigate = useNavigate();
  const location = useLocation();

  const url = location.pathname;
  const id = url.split("/")[2];
  const queryParams = new URLSearchParams(location.search);
  const pValue = queryParams.get("p");

  const [recharge, setRecharge] = useState([]);

  const [prise, setAmount] = useState(0);
  const [userBalance, setUserBalance] = useState("");
  const [show, setShow] = useState(false);
  const [page, setPage] = useState("transition");

  const convertMinutesToHourMinute = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}:${remainingMinutes.toString().padStart(2, "0")}`;
  };

  const [AllTransition, setAllTransition] = useState(null);
  const [Loader, setLoader] = useState(true);

  const AllTransitionApi = async () => {
    try {
      const response = await axios.post(`api/v1/session/list?id=${id}`);
      let Data = response?.data?.sessions;
      if (Data) {
        setAllTransition(Data);
        setLoader(false);
        const total = response.data.totalCount;
        const totalPage = Math.ceil(total / 10);
        console.log({ totalPage });
        setpageCount(totalPage);
        console.log(response?.data);
      }
    } catch (err) { }
  };

  const [Reason, setReason] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const AllReasonApi = async () => {
    try {
      const response = await axios.post(`/api/v1/reason/dropdown`);
      let Data = response?.data?.reason;
      console.log({ response });
      if (Data) {
        let reasons = Data?.map((item) => ({
          value: item?._id,
          label: item?.title,
        }));
        setReason(reasons);
      }
    } catch (err) {
      console.error("Error fetching reasons:", err);
    }
  };

  
  const [currentPage, setCurrentPage] = useState(1);

  const [pageCount, setpageCount] = useState("");
  const handlePageClick = async (data) => {
    // setLoader(true);
    const selectedPage = data.selected + 1; // Page numbers start from 0, so adding 1 to match your API logic
    try {
      const response = await axios.post(`api/v1/session/list?id=${id}`, {
        page: selectedPage,
        limit: 10,
      });
      const sessions = response?.data?.sessions;
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

  const AllRechargeApi = async () => {
    try {
      const response = await axios.get(`api/v1/recharge?userID=${id}`);
      let Data = response?.data?.rechargeHistory;
      if (Data) {
        setRecharge(Data);
        setLoader(false);
        const total = response.data.totalCount;
        const totalPage = Math.ceil(total / 10);
        console.log({ totalPage });
        setpageCount(totalPage || 0);
      }
    } catch (err) { }
  };

  useEffect(() => {
    AllRechargeApi();
    AllTransitionApi();
    AllReasonApi();
    userProfile();
  }, []);

  useEffect(() => {
    userProfile();
  }, [id]);

  const [Modalshow, setModalshow] = useState(false);

  const handleClose = () => setModalshow(false);

  const handleShow = (item) => {
    console.log({ item });
    setFormData({
      title: "",
      description: "",
      userId: item?.user?._id,
      sessionId: item?._id,
    });
    setModalshow(true);
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    userId: "",
    sessionId: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRefund = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/v1/user/refundRequest`, {
        userId: formData?.userId,
        sessionId: formData?.sessionId,
        reason: selectedOption == "Other" ? null : selectedOption,
        title: formData.title,
        description: formData.description,
      });
      const data = response.data;
      if (data?.success) {
        handleClose();
        AllTransitionApi();
        toast.success("Refund request sent successfully.");
        setSelectedOption("");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error("Failed to send refund request:", error);
      handleClose();
      toast.error("Failed to send refund request. Please try again later.");
    }
  };




  const userProfile = async () => {
    try {
      const response = await axios.get(`api/v1/user/GetProfile/${id}`);
      let Data = response?.data?.user;
      if (Data) {
        setUserBalance(Data)
      console.log("userDetails",Data);
       
      }
    } catch (err) { }
  };


  return (
    <>
      <div
        style={{
          flex: "1",
          height: "100%",
          overflow: "hidden",
          margin: "20px 0px",
          display: "flex",
          flexDirection: "column",
          padding: "15px",
          // backgroundColor: "var(--yellow)",
          borderRadius: "8px",
        }}
        className="seconde_bg"
      >
        <ToastContainer />
        <div className="d-flex justify-content-between flex-wrap">
          <p className="h4">Wallet</p>
          <div className="d-flex gap-2">
            <div className="bg-white d-flex align-items-center p-2 rounded">
              USD {userBalance?.balance > 0 ? userBalance?.balance?.toFixed(2) : 0}
            </div>
            <div className="bg-white d-flex align-items-center p-2 rounded">
              Bonus Balance {userBalance?.bonus > 0 ? userBalance.bonus?.toFixed(2) : 0}
            </div>
            <div
              className="bg-warning text-white border border-warning d-flex align-items-center p-2 rounded"
              onClick={() =>
                pValue === "addmoney"
                  ? navigate(`/profile/${user._id}/wallet`)
                  : navigate(`/profile/${user._id}/wallet?p=addmoney`)
              }
            >
              {pValue === "addmoney" ? "wallet history" : "add money"}
            </div>
          </div>
        </div>

        {pValue === "addmoney" ? (
          <>
            <div className="container mt-4 text-white">
              <div className="row">
                <div className="col-12">
                  <div className="row g-2 justify-content-between">
                    <div className="col-4 col-md-2">
                      <div
                        onClick={() => {
                          setAmount(10);
                          setShow(true);
                        }}
                        className="d-flex align-items-center justify-content-center border rounded bg-white text-success"
                        style={{ aspectRatio: "4/3", cursor: "pointer" }}
                      >
                        $10
                      </div>
                    </div>
                    <div className="col-4 col-md-2">
                      <div
                        onClick={() => {
                          setAmount(29);
                          setShow(true);
                        }}
                        className="d-flex align-items-center justify-content-center border rounded bg-white text-success"
                        style={{ aspectRatio: "4/3", cursor: "pointer" }}
                      >
                        $29
                      </div>
                    </div>
                    <div className="col-4 col-md-2">
                      <div
                        onClick={() => {
                          setAmount(49);
                          setShow(true);
                        }}
                        className="d-flex align-items-center justify-content-center border rounded bg-white text-success"
                        style={{ aspectRatio: "4/3", cursor: "pointer" }}
                      >
                        $49
                      </div>
                    </div>
                    <div className="col-4 col-md-2">
                      <div
                        onClick={() => {
                          setAmount(99);
                          setShow(true);
                        }}
                        className="d-flex align-items-center justify-content-center border rounded bg-white text-success"
                        style={{ aspectRatio: "4/3", cursor: "pointer" }}
                      >
                        $99
                      </div>
                    </div>
                    <div className="col-4 col-md-2">
                      <div
                        onClick={() => {
                          setAmount(149);
                          setShow(true);
                        }}
                        className="d-flex align-items-center justify-content-center border rounded bg-white text-success"
                        style={{ aspectRatio: "4/3", cursor: "pointer" }}
                      >
                        $149
                      </div>
                    </div>
                    <div className="col-4 col-md-2">
                      <div
                        onClick={() => {
                          setAmount(199);
                          setShow(true);
                        }}
                        className="d-flex align-items-center justify-content-center border rounded bg-white text-success"
                        style={{ aspectRatio: "4/3", cursor: "pointer" }}
                      >
                        $199
                      </div>
                    </div>
                    <div className="col-4 col-md-2">
                      <div
                        onClick={() => {
                          setAmount(222);
                          setShow(true);
                        }}
                        className="d-flex align-items-center justify-content-center border rounded bg-white text-success"
                        style={{ aspectRatio: "4/3", cursor: "pointer" }}
                      >
                        $222
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                width: "100%",
                marginTop: "20px",
                display: "flex",
                gap: "1px",
                backgroundColor: "var(--dark)",
              }}
            >
              <div
                onClick={() => setPage("transition")}
                style={{
                  flex: "1",
                  textAlign: "center",
                  backgroundColor: page == "transition" ? "#F8C471" : "",
                  padding: "10px",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "white",
                }}
              >
                all Transaction
              </div>
              <div
                onClick={() => setPage("recharge")}
                style={{
                  flex: "1",
                  textAlign: "center",
                  backgroundColor: page == "recharge" ? "#F8C471" : "",
                  padding: "10px",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "white",
                }}
              >
                Recharge history
              </div>
            </div>
            {Loader ? (
              <CustomLoader Loder={true} />
            ) : (
              <>
                {page === "transition" && (
                  <>
                    <div
                      className="table-responsive"
                      style={{
                        width: "100%",
                        display: "flex",
                        flexWrap: "wrap",
                        borderTop: "1px solid var(--dark)",
                        gap: "1px",
                      }}
                    >
                      <table className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>Transaction ID</th>
                            <th>Astro Name</th>
                            <th>User Paid</th>
                            <th>Amount Type </th>
                            <th>Chat Price</th>
                            <th>Ring Bell(sec)</th>
                            <th>Chat Durations</th>
                            <th>Chat Time</th>
                            <th>Chat Date</th>

                            <th className="text-center">Refund Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {AllTransition?.map((item, i) => (
                            <tr key={i}>
                              <td>{item?.transactionID}</td>
                              <td>{item?.astro?.name}</td>
                              <td style={{ color: item?.userPaid > 0 ? "#5CFF5C" : "#f06445" }}>
                                {/* {item?.amount_type_user === "credit"
                                  ? `$${parseFloat(item?.userPaid?.toFixed(2))}`
                                  :item?.amount_type_user === "debit"? `-$${Math.abs(
                                      parseFloat(item?.userPaid?.toFixed(2))
                                    )}`:`$${Math.abs(
                                      parseFloat(item?.userPaid?.toFixed(2))
                                    )}`} */}
                                ${item?.userPaid}
                              </td>

                              <td>{item?.amount_type_user}</td>
                              <td>{item?.userPaidPrise}</td>
                              <td>{item?.time}</td>
                              <td>
                                {convertMinutesToHourMinute(
                                  item?.timeInSeconds
                                )}
                              </td>
                              <td>
                                <span>
                                  {new Date(item?.createdAt)?.getHours()}
                                </span>
                                :
                                <span>
                                  {new Date(item?.createdAt)?.getMinutes()}
                                </span>
                                :
                                <span>
                                  {new Date(item?.createdAt)?.getSeconds()}
                                </span>
                              </td>
                              <td>
                                <span>
                                  {new Date(item?.createdAt)?.getDate()}
                                </span>
                                -
                                <span>
                                  {new Date(item?.createdAt)?.getMonth() + 1}
                                </span>
                                -
                                <span>
                                  {new Date(item?.createdAt)?.getFullYear()}
                                </span>
                              </td>

                              <td className="text-center">
                                {!item?.refundId &&
                                  (item?.refundStatus ? (
                                    <button
                                      disabled
                                      type="button"
                                      className={
                                        item?.refundStatus == "refund_completed"
                                          ? "btn btn-primary btn-sm"
                                          : item?.refundStatus == "pending"
                                            ? "btn btn-warning text-white btn-sm"
                                            : item?.refundStatus == "rejected"
                                              ? "btn btn-danger btn-sm"
                                              : "btn btn-primary btn-sm" // Default button style if status is neither completed, pending, nor rejected
                                      }
                                    >
                                      {item?.refundStatus == "refund_completed"
                                        ? "Completed"
                                        : item?.refundStatus == "pending"
                                          ? "Pending"
                                          : item?.refundStatus == "rejected"
                                            ? "Rejected"
                                            : item?.refundStatus
                                              ? item?.refundStatus
                                              : "Completed"}
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      className="btn btn-primary btn-sm"
                                      onClick={() => handleShow(item)}
                                    >
                                      Request
                                    </button>
                                  ))}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
                  </>
                )}

                {page === "recharge" && (
                  <>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexWrap: "wrap",
                        borderTop: "1px solid var(--dark)",
                        gap: "1px",
                      }}
                    >
                      {recharge?.map((e, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flex: "1",
                            minWidth: "50%",
                            backgroundColor: "var(--bg-white)",
                            alignItems: "center",
                            padding: "10px 20px",
                          }}
                        >
                          <div
                            style={{
                              flex: "1",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            +{e.amount}
                          </div>
                          <div
                            style={{
                              flex: "1",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <span>{new Date(e.createdAt).getHours()}</span>:
                            <span>{new Date(e.createdAt).getMinutes()}</span>
                          </div>
                          <div
                            style={{
                              flex: "1",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <span>{new Date(e.createdAt).getDate()}</span>-
                            <span>{new Date(e.createdAt).getMonth() + 1}</span>-
                            <span>{new Date(e.createdAt).getFullYear()}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* <div className="col-lg-12 mt-2 text-end">
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
                    </div> */}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>

      {show && <PaymentModel prise={prise} setShow={setShow} />}

      <Modal show={Modalshow} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Reason</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleRefund}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
              <Form.Label>Select a Reason</Form.Label>
              <Form.Select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value="">Choose...</option>
                {[...Reason, { value: "Other", label: "Other" }]?.map(
                  (option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  )
                )}
              </Form.Select>
            </Form.Group>
            {selectedOption == "Other" && (
              <>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter title"
                    value={formData.title}
                    onChange={handleInputChange}
                    autoFocus
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    placeholder="Enter description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary" onClick={handleClose}>
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
