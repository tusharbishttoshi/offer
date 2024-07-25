import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import Select from "react-select";
import CustomLoader from "../Componets/CustomLoader";

// import "react-select/dist/react-select.css"; // Import the default react-select styles

export default function CreateNotification() {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [CategoryData, setCategoryData] = useState([]);
  const [SelectCategory, setSelectCategory] = useState([]);
  const [Description, setDescription] = useState("");
  const [Loder, setLoder] = useState(false);
  const options = [
    { value: "UserManagement", label: "UserManagement" },
    { value: "DashboardManagement", label: "DashboardManagement" },
    { value: "SessionManagement", label: "SessionManagement" },
    { value: "ReportManagement", label: "ReportManagement" },
    { value: "ArticlesManagement", label: "ArticlesManagement" },
    { value: "CategoryManagement", label: "CategoryManagement" },
    { value: "RefundManagement", label: "RefundManagement" },
    { value: "SessionManagement", label: "SessionManagement" },
    { value: "ReasonManagement", label: "ReasonManagement" },
  ];

  const [Role, setRole] = useState([]);

  const handleChange = (Role) => {
    setRole(Role?.map((role) => role.value));
    console.log("skills", Role);
  };

  const CreatedNotification = async (e) => {
    setLoder(true);
    e.preventDefault();

    const data = new FormData(e.target);
    const Formvlaues = Object.fromEntries(data.entries());
    Formvlaues.role = Role;

    axios
      .post(`/api/v1/send/notification`, Formvlaues)
      .then((response) => {
        if (response.data.status) {
          toast.success("Notification sent successfully");
          e.target.reset(); // Reset the form after successful submission
          setLoder(false);
        } else {
          toast.error(response.data.msg || "Failed to send notification");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {}, []);

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
              <h4>Create Notification</h4>
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
          <div className="bg-white mx-auto rounded-1 row d-flex justify-content-center align-items-center">
            <form
              onSubmit={(e) => CreatedNotification(e)}
              className="p-5 col-md-8"
            >
              <div className="row mb-3">
                <label
                  htmlFor="inputTitle3"
                  className="col-sm-4 col-form-label"
                >
                  Title
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="title"
                    required
                    className="form-control"
                    placeholder="title"
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label
                  htmlFor="inputTitle3"
                  className="col-sm-4 col-form-label"
                >
                  Message
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="msg"
                    required
                    className="form-control"
                    placeholder="Enter Message"
                  />
                </div>
              </div>

              {/* <div className="row mb-3">
                <label
                  htmlFor="inputTitle3"
                  className="col-sm-4 col-form-label"
                >
                  Select Users
                </label>
                <div className="col-sm-8">
                  <Select
                    options={options}
                    onChange={handleChange}
                    isMulti={true}
                    // value={Role.values}
                  />
                </div>
              </div> */}

              <div className="row mb-3">
                <div className="d-flex  align-item-center justify-content-end">
                  <button
                    type="submit"
                    className="btn btn-primary btn text-white text-white"
                  >
                    Create
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
