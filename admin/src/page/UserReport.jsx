import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GetUsers, getUserSession } from "../api/User";
import { BiCalendarAlt } from "react-icons/bi";
import { FaFilter, FaXmark } from "react-icons/fa6";
import DatePicker from "react-date-picker";
import { Link, useNavigate } from "react-router-dom";
import { ChatView, SessionTable } from "./ChatReport";
import ReactPaginate from "react-paginate";
import CustomLoader from "./Componets/CustomLoader";
const month = [
  { label: "Jan" },
  { label: "Feb" },
  { label: "Mar" },
  { label: "Apr" },
  { label: "May" },
  { label: "Jun" },
  { label: "Jul" },
  { label: "Aug" },
  { label: "Sep" },
  { label: "Oct" },
  { label: "Nov" },
  { label: "Dec" },
];
export const ArrayFilter = (data, filter) => {
  const today = new Date();

  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);
  const oneDayAgo = new Date(today);
  oneDayAgo.setDate(today.getDate() - 1);
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(today.getMonth() - 1);
  const f = data.filter((e) => {
    const s = new Date(e.createdAt);
    if (filter === "Yearly") {
      if (s > oneYearAgo) {
        return e;
      }
    } else if (filter === "Monthly") {
      if (s > oneMonthAgo) {
        return e;
      }
    } else if (filter === "Weekly") {
      if (s > oneWeekAgo) {
        return e;
      }
    } else if (filter === "Daily") {
      if (s > oneDayAgo) {
        return e;
      }
    }
  });
  return f;
};
function UserReport() {
  const { users } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [t, setT] = useState({});
  const navigate = useNavigate();

  const [a, setA] = useState("Monthly");
  const f = ArrayFilter(users, a);
  useEffect(() => {
    dispatch(GetUsers());
  }, []);

  //   new code

  const [Report, setReport] = useState(null);
  const [Loader, setLoader] = useState(true);
  const [pageSize, setPageSize] = useState(10); // State for page size
  const [selectedType, setSelectedType] = useState(""); // State for selected type
  const [sortOrder, setsortOrder] = useState("asc"); // State for selected type
  const [startDate, setStartDate] = useState(""); // State for start date
  const [endDate, setEndDate] = useState(""); // State for end date
  const [Search, setSearch] = useState("");
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

  const AllReportListApi = async () => {
    setLoader(true);
    try {
      const response = await axios.post(`/api/v1/user/list`, {
        // id: astro._id,
        limit: pageSize || 10,
        // type: selectedType,
        sortField: selectedType,
        sortOrder: sortOrder,
        fromDate: startDate,
        endDate: endDate,
        search: Search,
      });
      let Data = response?.data?.list;
      console.log("data", response?.data);

      if (response?.data?.success) {
        setReport(Data);

        setLoader(false);
        const total = response.data.count;
        const totalPage = Math.ceil(total / 10);
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
      const response = await axios.post(`/api/v1/user/list`, {
        page: selectedPage,
        search: Search,
        limit: pageSize,
        // type: selectedType,
        sortField: selectedType,
        sortOrder: sortOrder,
        fromDate: startDate,
        endDate: endDate,
      });
      let Data = response?.data?.list;
      if (response?.data?.success) {
        setReport(Data);
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
    AllReportListApi();
  }, []);

  useEffect(() => {
    AllReportListApi();
  }, [pageSize, selectedType, sortOrder,]);

  const ResetForm = async () => {
    setLoader(true);
    try {
      const response = await axios.post(`/api/v1/user/list`, {
        // id: astro._id,
        limit: 10,
        type: "",
        fromDate: "",
        endDate: "",
        search: "",
      });
      let Data = response?.data?.list;
      console.log("data", response?.data);

      if (response?.data?.success) {
        setReport(Data);

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
      }
    } catch (err) { }
  };

  return (
    <>
      <div className="container p-2">
        <div className="row  m-2">
          <div className="col-md-10">
            <div className="page-title-box">
              <h4>User Management</h4>
              {/* <ol className="breadcrumb m-0">
                <li className="breadcrumb-item active">User Management</li>
              </ol> */}
            </div>
          </div>
          <div className="col-md-2 text-end">
            <Link to="#"  className='text-white' onClick={() => navigate(-1)}>
              <button
                type="button"
                className="btn text-white btn-dark"
              >
                Back
              </button>
            </Link>
          </div>
        </div>

        {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
                    <h3 style={{ fontSize: "30px" }}>New user registration "{f.length}"</h3>
                    <div style={{ display: "flex", gap: "20px", padding: "20px 0px", }}>
                        <button onMouseOver={() => setT("first")} onMouseLeave={() => setT("")} style={{ position: "relative", border: "none", outline: "none", background: "var(--white)", padding: "10px 20px", borderRadius: "5px", boxShadow: "0px 0px 5px rgba(0, 0, 0, .5)", fontWeight: "500", }}><span style={{ display: "flex", alignItems: "center", gap: "10px" }}><BiCalendarAlt size={25} />{a}</span>
                            <ul style={{ display: t === "first" ? "block" : "none", borderRadius: "5px", boxShadow: "0px 0px 5px rgba(0, 0, 0, .5)", position: "absolute", right: "0px", top: "45px", background: "white", width: "100%" }}>
                                <li onClick={() => {
                                    setA("Yearly")
                                    setT("")
                                }} style={{ listStyle: "none", padding: "10px ", cursor: "pointer" }}>Yearly</li>
                                <li onClick={() => {
                                    setA("Monthly")
                                    setT("")
                                }} style={{ listStyle: "none", padding: "10px ", cursor: "pointer" }}>Monthly</li>
                                <li onClick={() => {
                                    setA("Weekly")
                                    setT("")
                                }} style={{ listStyle: "none", padding: "10px ", cursor: "pointer" }}>Weekly</li>
                                <li onClick={() => {
                                    setA("Daily")
                                    setT("")
                                }} style={{ listStyle: "none", padding: "10px ", cursor: "pointer" }}>Daily</li>
                            </ul>
                        </button>
                    </div>
                </div> */}
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
                <option value="balance">Balance</option>
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
                  onClick={() => AllReportListApi()}
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
                    <th>Sn.</th>
                    <th>Unique id</th>
                    <th>User Image</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Balance</th>
                    <th>Registration Date</th>
                  </tr>
                </thead>
                <tbody style={{ overflow: "scroll" }}>
                  {Report?.map((user, index) => (
                    <tr key={user?._id}>
                      <td    className="fs-7" >{index + 1}</td>
                      <td className="fs-7">
                        <span
                          // onClick={() => setT(user)}
                          onClick={()=>navigate(`/User-details/${user?._id}`)}
                          style={{
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                          className="fs-7"
                        >
                          {user?.id}
                        </span>{" "}
                      </td>
                      <td>
                        <img
                          style={{ width: "50px", height: "50px", }}
                          alt="no image"
                          className="rounded-circle fs-7"
                          src={user?.avatar?.url}

                        />
                      </td>
               
                      <td className="fs-7" >
                        <span
                          // onClick={() => setT(user)}
                          onClick={()=>navigate(`/User-details/${user?._id}`)}
                          style={{
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                          className="fs-7"
                        >
                          {user?.name}
                        </span>{" "}
                      </td>

                      <td className="fs-7" >{user?.email}</td>
                      <td  className="fs-7" >${user?.balance > 0 ? user?.balance.toFixed(2) : user?.balance}</td>
                      <td className="fs-7" >
                        {user?.createdAt.split("T").slice(0, 1)} ,{" "}
                        {new Date(user?.createdAt).getHours()}:
                        {new Date(user?.createdAt).getMinutes()}
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

        {t._id && <UserDetails t={t} setT={setT} />}
      </div>
    </>
  );
}

export const UserDetails = ({ t, setT }) => {
  const [d, setd] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const [sessions, setSessions] = useState([]);
  const [h, setH] = useState({});
  useEffect(() => {
    t?._id &&
      dispatch(getUserSession({ id: t?._id })).then((e) => {
        setSessions(e.payload.sessions);
      });
  }, [t]);
  return (
    <>
      <div
        style={{
          height: "100vh",
          overflow: "scroll",
          width: "100%",
          position: "fixed",
          top: "0px",
          right: "0px",
          background: "white",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "grid",
            padding: "15px 2%",
            gridTemplateColumns: `repeat(auto-fit, minmax(${d > 450 ? "300px" : "100%"
              }, 1fr))`,
            paddingBottom: "20px",
            gridGap: "20px",
            color: "var(--dark)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              width: "100%",
            }}
          >
            <label
              style={{
                fontSize: "1.2rem",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
            >
              name
            </label>
            <p
              style={{
                border: "1px solid gray",
                outline: "none",
                padding: "3px 10px",
                borderRadius: "6px",
                fontWeight: "500",
              }}
            >
              {" "}
              {t.name}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              width: "100%",
            }}
          >
            <label
              style={{
                fontSize: "1.2rem",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
            >
              email
            </label>
            <p
              style={{
                border: "1px solid gray",
                outline: "none",
                padding: "3px 10px",
                borderRadius: "6px",
                fontWeight: "500",
              }}
            >
              {" "}
              {t.email}
            </p>
          </div>{" "}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              width: "100%",
            }}
          >
            <label
              style={{
                fontSize: "1.2rem",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
            >
              Country
            </label>
            <p
              style={{
                border: "1px solid gray",
                outline: "none",
                padding: "3px 10px",
                borderRadius: "6px",
                fontWeight: "500",
              }}
            >
              {" "}
              {t.country || "Not Provided"}
            </p>
          </div>{" "}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              width: "100%",
            }}
          >
            <label
              style={{
                fontSize: "1.2rem",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
            >
              Date of Birth
            </label>
            <p
              style={{
                border: "1px solid gray",
                outline: "none",
                padding: "3px 10px",
                borderRadius: "6px",
                fontWeight: "500",
              }}
            >
              {" "}
              {t.dob || "Not Provided"}
            </p>
          </div>{" "}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              width: "100%",
            }}
          >
            <label
              style={{
                fontSize: "1.2rem",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
            >
              Birth Time
            </label>
            <p
              style={{
                border: "1px solid gray",
                outline: "none",
                padding: "3px 10px",
                borderRadius: "6px",
                fontWeight: "500",
              }}
            >
              {" "}
              {t.bt || "Not Provided"}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              width: "100%",
            }}
          >
            <label
              style={{
                fontSize: "1.2rem",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
            >
              Birth Place
            </label>
            <p
              style={{
                border: "1px solid gray",
                outline: "none",
                padding: "3px 10px",
                borderRadius: "6px",
                fontWeight: "500",
              }}
            >
              {" "}
              {t.bp || "Not Provided"}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              width: "100%",
            }}
          >
            <label
              style={{
                fontSize: "1.2rem",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
            >
              zodiac
            </label>
            <p
              style={{
                border: "1px solid gray",
                outline: "none",
                padding: "3px 10px",
                borderRadius: "6px",
                fontWeight: "500",
              }}
            >
              {" "}
              {t.zodiac || "Not Provided"}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <p
              onClick={() => setT({})}
              style={{
                border: "1px solid gray",
                outline: "none",
                backgroundColor: "var(--yellow)",
                textAlign: "center",
                padding: "3px 10px",
                borderRadius: "6px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Close
            </p>
          </div>
        </div>







        {sessions.length > 0 && (
          <SessionTable f={sessions} setH={setH} userName={t?.name} />
        )}
        {h._id && <ChatView h={h} setH={setH} />}
      </div>
    </>
  );
};

export const UserProfile = () => {
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "white",
          position: "absolute",
          top: "0px",
          right: "0px",
        }}
      ></div>
    </>
  );
};

export default UserReport;
