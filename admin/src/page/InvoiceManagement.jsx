import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import CustomLoader from "./Componets/CustomLoader";
import moment from "moment";
import { IoEyeSharp } from "react-icons/io5";

export default function InvoiceManagement() {
  const navigate = useNavigate();
  //   new code

  const [Transaction, setTransaction] = useState(null);
  const [Loader, setLoader] = useState(true);
  const [pageSize, setPageSize] = useState(10); // State for page size
  const [selectedType, setSelectedType] = useState(""); // State for selected type
  // const [sortOrder, setsortOrder] = useState("asc"); // State for selected type
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

  const AllTransactionListApi = async () => {
    setLoader(true);
    try {
      const response = await axios.post(`/api/v1/invoice/list`, {
        // id: astro._id,
        limit: pageSize || 10,
        // type: selectedType,
        fromDate: startDate,
        toDate: endDate,
        search: Search,
      });
      let Data = response?.data?.list;
      console.log("data", response?.data);

      if (response?.data?.success) {
        setTransaction(Data);

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
      const response = await axios.post(`/api/v1/invoice/list`, {
        page: selectedPage,
        search: Search,
        limit: pageSize,
        // type: selectedType,
        fromDate: startDate,
        toDate: endDate,
        // sortField:selectedType,
        // sortOrder:sortOrder,
      });
      let Data = response?.data?.list;
      if (response?.data?.success) {
        setTransaction(Data);
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
    AllTransactionListApi();
  }, []);

  useEffect(() => {
    AllTransactionListApi();
  }, [pageSize, ]);

  const ResetForm = async () => {
    setLoader(true);
    try {
      const response = await axios.post(`/api/v1/invoice/list`, {
        // id: astro._id,
        limit: 10,
        type: "",
        fromDate: "",
        toDate: "",
        search: "",
      });
      let Data = response?.data?.list;
      console.log("data", response?.data);

      if (response?.data?.success) {
        setTransaction(Data);

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
    } catch (err) {}
  };

  return (
    <>
      <div className="container p-2">
        <div className="row  m-2">
          <div className="col-md-10">
            <div className="page-title-box">
              <h4>Invoice Management</h4>
              {/* <ol className="breadcrumb m-0">
                <li className="breadcrumb-item active">
                  Transaction Management
                </li>
              </ol> */}
            </div>
          </div>
          <div className="col-md-2 text-end">
            <Link to="#" className="text-white" onClick={() => navigate(-1)}>
              <button
                type="button"
                className="btn btn-dark btn text-white"
              >
                Back
              </button>
            </Link>
          </div>
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
{/* 
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
                <option value="transactionID">Transaction Amount</option>
                <option value="balance">Balance</option>
              </select>
            </div> */}

            {/* <div className="col-md-2">
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
              <label htmlFor="toDate">End Date</label>
              <div className="input-group mb-3">
                <input
                  type="date"
                  id="toDate"
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

            <div className="col-md-3  mt-5 d-flex align-items-center px-0 gap-1 justify-content-around">
              <div className="input-group d-flex justify-content-around">
                <button
                  className="btn  btn-warning"
                  type="button"
                  onClick={() => AllTransactionListApi()}
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
            <div className="table-responsive mt-3">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Sn.</th>
                    <th>Transaction ID</th>
                    <th>System</th>
                    <th>Astrologer</th>
                    <th>System Paid</th>
                    <th>Astro Balance</th>
                    <th>Date</th>
                    <th>View</th>

                  </tr>
                </thead>
                <tbody style={{ overflow: "scroll" }}>
                  {Transaction?.map((user, index) => (
                    <tr key={user?._id}>
                      <td className="fs-7">{index + 1}</td>
                      <td className="fs-7" > {user?.timeInSeconds!=0 && user?.transactionID} </td>
                      {/* <td className="fs-7" > {user?.id||"N/A"} </td> */}
                      <td className="fs-7">
                        {" "}
                       
                          {" "}
                          {user?.adminEarn  !==0? user?.system || "System" :""}
                        {/* </span> */}
                      </td>
                      <td className="fs-7" > {user?.astroData?.name} </td>

                      <td className="fs-7"  style={{color:user?.adminEarn >= 0 ?"#5CFF5C":"#f06445"}}> $ {user?.adminEarn?.toFixed(2) || -user?.amount }</td>
                      <td className="fs-7"  style={{color:user?.balance >= 0 ?"#5CFF5C":"#f06445"}}> {user?.balance && "$" } {user?.balance?.toFixed(2)}</td>
                    
                   
                      <td className="fs-7">
                        {moment(user.createdAt).format("YYYY-MM-DD, HH:mm")}
                      </td>

                      <td>
                        <IoEyeSharp
                          size={25}
                          // onClick={() => setView(item)}
                          onClick={() =>
                            navigate(`/Astro-details`, { state: user?.astroData })
                          }
                          style={{ cursor: "pointer" }}
                        />
                      </td>
                      {/* <td>$ {user?.astro?.balance}</td> */}
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
