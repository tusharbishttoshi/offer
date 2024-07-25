import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import moment from "moment";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import CustomLoader from "../Componets/CustomLoader";

export default function ReasonManagementList() {
  const navigate = useNavigate();
  //   new code

  const [Reason, setReason] = useState(null);
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

  const AllReasonListApi = async () => {
    setLoader(true);
    try {
      const response = await axios.post(`/api/v1/reason/list`, {
        // id: astro._id,
        limit: pageSize || 10,
   
        fromDate: startDate,
        endDate: endDate,
        search: Search,
        sortField:selectedType,
        sortOrder:sortOrder,
      });
      let Data = response?.data?.list;
      console.log("data", response?.data);

      if (response?.data?.success) {
        setReason(Data);

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
      const response = await axios.post(`/api/v1/reason/list`, {
        page: selectedPage,
        search: Search,
        limit: pageSize,
        type: selectedType,
        fromDate: startDate,
        endDate: endDate,
      });
      let Data = response?.data?.list;
      if (response?.data?.success) {
        setReason(Data);
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
    AllReasonListApi();
  }, []);

  useEffect(() => {
    AllReasonListApi();
  }, [pageSize, selectedType, sortOrder]);

  const ResetForm = async () => {
    setLoader(true);
    try {
      const response = await axios.post(`/api/v1/reason/list`, {
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
        setReason(Data);

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

  const DeleteReason = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this Reason!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/v1/reason/delete`, { data: { id } }) // Pass id in the request body
          .then((response) => {
            let data = response.data;

            if (data.success) {
              Swal.fire("Deleted!", "Reason has been deleted.", "success");
              AllReasonListApi();
            } else {
              Swal.fire("Error!", data.msg, "error");
            }
          })
          .catch((error) => {
            console.log(error);
            Swal.fire(
              "Error!",
              "An error occurred while deleting the blog post.",
              "error"
            );
          });
      }
    });
  };

  const [isPublic, setIsPublic] = useState(true);

  const handleToggle =  async (user) => {
    console.log({ user });
    setLoader(true);
    try {
      const response =  await axios.put(`/api/v1/reason/update`, {
        id: user?._id,
        status: !user?.status,
      });
    //   console.log("data update", response?.data);
      if (response?.data?.success) {
        setLoader(false);
        AllReasonListApi();
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
        setLoader(false);
      }
    } catch (err) {}
  };

  return (
    <>
      <div className="container p-2">
        <ToastContainer />
        <div className="row  m-2">
          <div className="col-md-10">
            <div className="page-title-box">
              <h4>Reason Management</h4>
              {/* <ol className="breadcrumb m-0">
                <li className="breadcrumb-item active">Reason Management</li>
              </ol> */}
            </div>
          </div>
          <div className="col-md-2 text-end">
            <Link to="#"  className='text-white' onClick={() => navigate(-1)}>
              <button type="button" className="btn text-white btn-dark">
                Back
              </button>
            </Link>
          </div>
        </div>

        <div className="d-flex align-item-center justify-content-start">
          <button
            onClick={() => navigate("/Reason-Create")}
            type="button"
            className="btn btn-primary"
          >
            Create
          </button>
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
                <option value="title">Title</option>
                <option value="description">Description</option>
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
                  onClick={() => AllReasonListApi()}
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
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody style={{ overflow: "scroll" }}>
                  {Reason?.map((user, index) => (
                    <tr key={user?._id}>
                      <td className="fs-7">{index + 1}</td>
                      <td className="fs-7" > {user?.title} </td>
                      <td className="fs-7" >{user?.description} </td>
                      <td className="fs-7" >
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="publicToggle"
                            checked={user?.status}
                            onChange={() => handleToggle(user)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="publicToggle"
                          >
                            {user?.status ? "Active" : "Deactivate"}
                          </label>
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="d-flex align-items-center justify-content-evenly">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/Reason-Update`, {
                                state: user,
                              })
                            }
                            className="btn btn-primary mr-2"
                          >
                            <i class="fas fa-edit fs-5"></i>
                          </button>
                          <button
                            type="button"
                            onClick={() => DeleteReason(user?._id)}
                            className="btn btn-danger"
                          >
                            <i class="fas fa-trash-alt fs-5"></i>
                          </button>
                        </div>
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
