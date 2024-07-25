import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import Select from "react-select";
import CustomLoader from "../Componets/CustomLoader";
// import "react-select/dist/react-select.css"; // Import the default react-select styles

export default function UpdateBlog() {
  const navigate = useNavigate();

  const location = useLocation();
  const { _id } = useParams();
  const item = location.state;

  // Now you can access the item object and its properties
  console.log({ item }, _id);

  const [image, setImage] = useState(null);
  const [CategoryData, setCategoryData] = useState([]);
  const [SelectCategory, setSelectCategory] = useState([]);
  const [Loder, setLoder] = useState(false);
  const [Description, setDescription] = useState("");

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  useEffect(() => {
    if (item) {
      setDescription(item?.description);
      setImage(item?.banner?.url);
    }
  }, [item]);

  
  const UpdateBlogByAdmin = async (e) => {
    e.preventDefault();
    setLoder(true);
    const data = new FormData(e.target);
    const Formvlaues = Object.fromEntries(data.entries());
    Formvlaues.banner = image;
    Formvlaues.description = Description;
    Formvlaues.id = _id;
    Formvlaues.category = SelectCategory.map((item) => item.value);
    axios
      .put(`/api/v1/blog`, Formvlaues)
      .then((response) => {
        if (response.status) {
          let data = response.data;

          if (data.status) {
            toast.success(data.message);
            setLoder(true);
            setTimeout(() => {
              e.target.reset();
              navigate("/blog-page");
            }, 2000);
          } else {
            toast.error(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const AllCategoryData = () => {
    axios
      .get(`/api/v1/category`)
      .then((response) => {
        let data = response.data;
        if (response.status) {
          if (data.status) {
            let CategoryDataForMap = data?.categories?.map((item) => ({
              value: item._id,
              label: item.category,
            }));

            let CategorySelectMap = [];

            data?.categories?.forEach((categoryItem) => {
              if (item?.category?.includes(categoryItem._id)) {
                CategorySelectMap.push({
                  value: categoryItem._id,
                  label: categoryItem.category,
                });
              }
            });

            console.log({ CategorySelectMap, CategoryDataForMap });

            setSelectCategory(CategorySelectMap);

            setCategoryData(CategoryDataForMap);
          } else {
            toast.error(data.msg);
          }
        } else {
          toast.error(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    AllCategoryData();
  }, []);

  const handleChangeCategory = (selectedOptions) => {
    console.log({ selectedOptions });
    setSelectCategory(selectedOptions);
  };

  return (
    <>
      <ToastContainer position="top-right" />
      <div className="container ">
        <div className="row p-2  my-2">
          <div className="col-md-10">
            <div className="page-title-box">
              <h4>Blog Management</h4>
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item active">Blog Management</li>

                <li className="breadcrumb-item">
                  <Link to="#" className="text-dark text-decoration-none">
                    Update Blog
                  </Link>
                </li>
              </ol>
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

        {/* form create blog  */}
        <CustomLoader Loder={Loder} />

        {!Loder && (
          <div className="bg-white mx-auto rounded-1">
            <form onSubmit={(e) => UpdateBlogByAdmin(e)} className="p-5">
              <div className="row mb-3">
                <label
                  htmlFor="inputTitle3"
                  className="col-sm-2 col-form-label"
                >
                  Blog Title
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    id="inputTitle3"
                    defaultValue={item?.title}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label
                  htmlFor="inputTitle3"
                  className="col-sm-2 col-form-label"
                >
                  Blog Image
                </label>
                <div className="col-sm-10">
                  <input
                    type="file"
                    name="banner"
                    className="form-control"
                    id="inputTitle3"
                    onChange={handleImageChange}
                  />

                  {/* Display the selected image */}
                  {image && (
                    <div className="col-sm-10 my-3">
                      <img
                        src={image}
                        alt="Selected"
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <label
                  htmlFor="inputContent"
                  className="col-sm-2 col-form-label"
                >
                  Blog Content
                </label>
                <div className="col-sm-10">
                  <ReactQuill
                    className="form-control"
                    name="description"
                    value={Description}
                    style={{
                      height: "200px",
                      width: "100%",
                      marginBottom: "60px",
                      border: "none", // Remove border
                    }}
                    onChange={(content) => setDescription(content)}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label
                  htmlFor="metaDescription1"
                  className="col-sm-2 col-form-label"
                >
                  Tags
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    name="tags"
                    required
                    className="form-control"
                    id="metaDescription1"
                    defaultValue={item?.tags}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label
                  htmlFor="metaDescription1"
                  className="col-sm-2 col-form-label"
                >
                  Keywords
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    name="keywords"
                    required
                    className="form-control"
                    id="metaDescription1"
                    defaultValue={item?.keywords}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label
                  htmlFor="metaDescription1"
                  className="col-sm-2 col-form-label"
                >
                  Meta Description
                </label>
                <div className="col-sm-10">
                  <textarea
                    name="metaDescription"
                    required
                    className="form-control"
                    id="metaDescription1"
                    rows="3"
                    defaultValue={item?.metaDescription}
                  ></textarea>
                </div>
              </div>
              <div className="row mb-3">
                <label
                  htmlFor="inputContent"
                  className="col-sm-2 col-form-label"
                >
                  Select Category
                </label>
                <div className="col-sm-10">
                  <Select
                    isMulti
                    closeMenuOnSelect={false}
                    name="category"
                    options={CategoryData}
                    onChange={handleChangeCategory}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    value={SelectCategory}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-10 offset-sm-2 d-flex  align-item-center justify-content-end">
                  <button type="submit" className="btn btn-primary btn text-white text-white">
                    Update Blog
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
