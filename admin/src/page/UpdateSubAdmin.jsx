import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import Select from "react-select";
import CustomLoader from "./Componets/CustomLoader";
// import "react-select/dist/react-select.css"; // Import the default react-select styles

export default function CreateSubadmin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { _id } = useParams();
  const item = location.state;
  const [image, setImage] = useState(null);
  const [CategoryData, setCategoryData] = useState([]);
  const [SelectCategory, setSelectCategory] = useState([]);
  const [Description, setDescription] = useState("");
  const [Loder, setLoder] = useState(false);
  const options = [
    { value: 'UserManagement', label: 'UserManagement' },
    { value: 'DashboardManagement', label: 'DashboardManagement' },
    { value: 'SessionManagement', label: 'SessionManagement' },
    { value: 'ReportManagement', label: 'ReportManagement' },
    { value: 'ArticlesManagement', label: 'ArticlesManagement' },
    { value: 'CategoryManagement', label: 'CategoryManagement' },
    { value: 'RefundManagement', label: 'RefundManagement' },
    { value: 'SessionManagement', label: 'SessionManagement' },
    { value: 'ReasonManagement', label: 'ReasonManagement' },
  ]

  
  const [Role, setRole] = useState([]);
  useEffect(() => {

    let RoleDefinded = item?.role?.map((item, index) => ({ value: item, label: item }))
 
    setRole(RoleDefinded)

  }, [item?.role])





  const handleChange = (Role) => {
 
    setRole(Role)
    // setRole(Role.map((role) => role.value))
  
  }


  const CreatedBlogByAdmin = async (e) => {
    setLoder(true);
    e.preventDefault();

    const data = new FormData(e.target);
    const Formvlaues = Object.fromEntries(data.entries());
    Formvlaues.role = Role?.map((role) => role.value);
    Formvlaues.id = item?._id

    axios
      .put(`/api/v1/update/sub-admin`, Formvlaues)
      .then((response) => {
        if (response) {
          let data = response.data;

          if (data.success == true) {
            setTimeout(() => {
              setLoder(false);
              e.target.reset();
              navigate("/admin-users");

            }, 1000);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  useEffect(() => {
  }, []);

  // const handleChangeCategory = (selectedOptions) => {
  //     console.log({ selectedOptions });
  //     setSelectCategory(selectedOptions);
  // };

  return (
    <>
      <ToastContainer position="top-right" />
      <div className="container ">
        <div className="row p-2  my-2">
          <div className="col-md-10">
            <div className="page-title-box">
              <h4>Sub-Admin Management</h4>
            </div>
          </div>
          <div className="col-md-2 text-end">
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="btn btn-dark btn text-white text-white "
            >
              {" "}
              <i className="fas fa-chevron-left"></i> Back
            </button>
          </div>
        </div>
        <CustomLoader Loder={Loder} />
        {/* form create blog  */}

        {!Loder && (
          <div className="bg-white mx-auto rounded-1 ">
            <form onSubmit={(e) => CreatedBlogByAdmin(e)} className="p-2">
              <div className="row mb-3">
                <label
                  htmlFor="inputTitle3"
                  className="col-sm-1 col-form-label"
                >
                  Name
                </label>
                <div className="col-sm-4">
                  <input
                    type="text"
                    name="name"
                    required
                    className="form-control"
                    id="inputTitle3"
                    placeholder="Name"
                    defaultValue={item?.name}

                  />
                </div>
              </div>

              <div className="row mb-3">
                <label
                  htmlFor="inputTitle3"
                  className="col-sm-1 col-form-label"
                >
                  Email
                </label>
                <div className="col-sm-4">
                  <input
                    type="text"
                    name="email"
                    required
                    className="form-control"
                    id="inputTitle3"
                    placeholder="Email"
                    defaultValue={item?.email}


                  />
                </div>
              </div>
              <div className="row mb-3">
                <label
                  htmlFor="inputTitle3"
                  className="col-sm-1 col-form-label"
                >
                  Phone Number
                </label>
                <div className="col-sm-4">
                  <input
                    type="text"
                    name="number"
                    required
                    className="form-control"
                    id="inputTitle3"
                    placeholder="Number"
                    defaultValue={item?.number}

                  />
                </div>
              </div>
              <div className="row mb-3">
                <label
                  htmlFor="inputTitle3"
                  className="col-sm-1 col-form-label"
                >
                  Gender
                </label>
                <div className="col-sm-4 d-flex">
                  <div className="d-flex gap-7">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="gender"
                      value="Male"
                      id="male"

                    />
                    <label htmlFor="male" className="form-check-label">
                      Male
                    </label>
                  </div>
                  <div className="d-flex gap-7">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="gender"
                      value="Female"
                      id="female"
                    />
                    <label htmlFor="female" className="form-check-label">
                      Female
                    </label>
                  </div>
                  <div className="d-flex gap-7">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="gender"
                      value="other"
                      id="other"
                    />
                    <label htmlFor="other" className="form-check-label">
                      Other
                    </label>
                  </div>
                </div>
              </div>
              {/* <div className="row mb-3">
                                <label
                                    htmlFor="inputTitle3"
                                    className="col-sm-1 col-form-label"
                                >
                                    Password
                                </label>
                                <div className="col-sm-4">
                                    <input
                                        type="text"
                                        name="password"
                                        required
                                        className="form-control"
                                        id="inputTitle3"
                                        placeholder="Password"
                                        defaultValue={item?.password}

                                    />
                                </div>
                            </div> */}
              <div className="row mb-3">
                <label
                  htmlFor="inputTitle3"
                  className="col-sm-1 col-form-label"
                >
                  Role
                </label>
                <div className="col-sm-4">
                  <Select
                    // options={options}
                    // onChange={handleChange}
                    // isMulti={true}
                    isMulti
                    closeMenuOnSelect={false}
                    name="role"
                    options={options}
                    onChange={handleChange}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  value={Role}
                
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 offset-sm-2 d-flex  align-item-center justify-content-end">
                  <button type="submit" className="btn btn-primary btn text-white text-white">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
